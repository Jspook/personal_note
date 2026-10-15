# BrowserSkill — Verification Report (Phase 4 + Phase 6)

> **ผลรวม: ✅ PASS ครบทุกเกณฑ์ — ติดตั้ง + first-use verification สำเร็จ**
> **วันที่:** 2026-10-12 | **Verified by:** `bsk doctor` + `bsk status --json` + session lifecycle จริง (ไม่ใช่การคาดเดา)

---

## 1. `bsk doctor` — ผลดิบ

| # | Check | ผล | หมายเหตุ |
|---|---|---|---|
| 1 | `bsk home writable` | ✅ ok | `C:\Users\sirav\.bsk` |
| 2 | `agent skill matches bundled CLI` | ✅ ok | bundled v0.3.2 = installed; harness `hermes` |
| 3 | `daemon running` | ✅ ok | pid 23048 @ `ws://127.0.0.1:52800` |
| 4 | `daemon local process identity` | ✅ ok | IPC peer PID ตรงกับ daemon |
| 5 | `protocol compatible` | ✅ ok | protocol 1.3 (app 0.3.2) |
| 6 | `auto-update` | ✅ ok | ไม่มี update attempt |
| 7 | `extension connected` | ✅ **ok** | **1 browser(s) connected** |
| 8 | `browser protocol compatible` | ✅ **ok** | 1 online browser compatible |

**สรุป: 8/8 ok · 0 fail · 0 N/A** — exit code 0

> ก่อนหน้า (Phase 4, ยังไม่ติดตั้ง extension): 6 ok / 1 N/A / 1 fail — fail เดียวคือ extension ซึ่งเป็น manual step ของ user ตาม gate #4 ไม่ใช่ defect ของการติดตั้ง

### Browser ที่เชื่อม

```
INSTANCE  BROWSER           EXT    LABEL  SESSIONS
ab6633a1  chrome 155.0.0.0  0.3.2  Work   0
```
`extension_protocol_version: 1.3` · `version_skew: false` · `unresponsive: false`

---

## 2. Phase 6 — First-use Verification (หลักฐานดิบ)

| ขั้น | คำสั่ง | ผล |
|---|---|---|
| 1 | `bsk session start --no-focus --json` | ✅ exit 0 → `session_id: pjnh`, `agent_window_id: 24485401`, `browser_instance_id: ab6633a1` |
| 2 | `bsk navigate "https://example.com" --session pjnh` | ✅ exit 0 → `tab=24485402 reached=load url=https://example.com/` |
| 3 | `bsk observe --session pjnh` | ✅ exit 0 → AX tree ครบ: `RootWebArea "Example Domain"` + paragraphs + **`@e1 link "Learn more" [→ iana.org]`** |
| 4 | `bsk session stop pjnh` | ✅ exit 0 → `stopped pjnh` |
| 5 | `bsk session list` | ✅ `(no active sessions)` — cleanup สมบูรณ์ |
| 6 | daemon ยังรัน | ✅ `pid 23048`, `sessions: []` (shared daemon ไม่ถูก kill) |

**เกณฑ์ PASS:** navigate + observe อ่านเนื้อหน้าได้จริง + stop สำเร็จ → **ผ่านครบ**

Capability ที่ยืนยันได้: `observe` คืน **element ref (`@e1`)** พร้อม interactable + viewport (`@view 1331x784`) + layer (`@layers 1 focus=L1`) → เพียงพอสำหรับ click/type ในการทำ QA ของ `crwn.st` ต่อไป

---

## 3. สิ่งที่พิสูจน์แล้ว (Verified Facts)

- ✅ `bsk` v0.3.2 รันได้จริง — `bsk --version` exit 0
- ✅ skill `browser-skill` ไปอยู่ที่ Hermes **profile root จริง**: `C:\Users\sirav\AppData\Local\hermes\skills\browser-skill\` — **ตรงกับ source-verified path** ไม่ใช่ path เดา
- ✅ **ติดตั้งเฉพาะ hermes** — codex/claude-code/cursor `installed:false` ยืนยันด้วย `--list --json`
- ✅ daemon ↔ extension ↔ browser ทำงานครบ loop: IPC named pipe + WebSocket 52800 + extension protocol 1.3
- ✅ session lifecycle ปิดสะอาด ไม่มี session ค้าง
- ✅ ไม่มีไฟล์ config/skill เดิมถูกเขียนทับ (`installed:false` ทุกตัวก่อนติดตั้ง → clean add)
- ✅ `--force` ไม่ถูกใช้เลย
- ✅ `crwn.st` ไม่ถูกแตะ — vault `check-ignore` ยืนยัน `AIOS/03 Projects/.gitignore:3:crwn.st/`

## 4. Assumptions (ยังไม่ยืนยัน)

- Label `"Work"` เป็นค่าที่ user ตั้งไว้ใน extension popup (ใช้แยก profile ได้ในอนาคต ถ้าเชื่อมหลาย browser)
- Port 52800 ไม่ชนกับแอปอื่นในระยะยาว (daemon เลือก port อัตโนมัติ)

## 5. Open Blockers

**— ไม่มี —** การติดตั้งและ verify เสร็จสมบูรณ์

---

## 6. Runtime Recipe (ใช้ซ้ำทุกครั้ง)

```bash
# 1) daemon — ต้องรันใน managed background task (persist) เท่านั้น
#    auto/detached ล้มเหลวเพราะ Hermes terminal อยู่ใน Windows Job Object
BSK_AUTO_START=0 bsk daemon start --foreground     # background=true, persist_on_release=true

# 2) ทุก client call ต้องมี BSK_AUTO_START=0
BSK_AUTO_START=0 bsk status --json                 # ต้องได้ pid + browsers[]

# 3) session → action → stop  (action แยก tool call)
BSK_AUTO_START=0 bsk session start --no-focus --json
BSK_AUTO_START=0 bsk navigate <url> --session <id>
BSK_AUTO_START=0 bsk observe --session <id>
BSK_AUTO_START=0 bsk session stop <id>
```

⚠️ **ห้าม** `nohup` / `setsid` / `Start-Process` / trailing `&` แทน managed background task — `--foreground` เดี่ยวๆ ไม่พอ

**Phase 5 (user ติดตั้ง extension) — ✅ เสร็จแล้ว:** Chrome `hhcmgoofomhgciiibhipgmgkgnoenaoi` → popup connected

---

## 7. ขั้นถัดไป — Phase 7: `crwn.st` QA

Pre-condition ครบแล้ว (`http://localhost:3000`) — ยัง**ไม่เริ่ม** จนกว่าจะได้รับคำสั่ง
ขอบเขตที่จะทำ: UX/UI inspection · workflow testing · console/network debugging · responsive check
**ไม่แตะ:** application source code, project config, production data · ไม่ submit order/ชำระเงิน/replay API

---

## เอกสารเชื่อมโยง

- [[2026-10-12 Installation Log]] · [[2026-10-12 Compatibility Audit]] · [[2026-10-12 Installation Plan]] · [[2026-10-12 Backup Manifest]]
