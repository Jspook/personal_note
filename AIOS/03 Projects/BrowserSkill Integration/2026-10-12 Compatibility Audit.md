# BrowserSkill — Compatibility Audit (Phase 1)

> **สถานะ:** ✅ เสร็จ (read-only ทั้งหมด — ไม่มีการติดตั้ง/แก้ไขไฟล์ใด ๆ)
> **วันที่:** 2026-10-12 | **Harness:** Hermes Agent (profile `default`)
> **เป้าหมาย:** Tencent BrowserSkill (`bsk`) — browser automation ผ่าน browser ที่ login แล้วจริง

---

## 1. Audit Deviation (ข้อเบี่ยงเบนที่ต้องบันทึก)

| ประเด็น | รายละเอียด |
|---|---|
| README/สเปกเดิม | **ไม่ถูกแนบมาในงานนี้** — มีเฉพาะ handoff `.txt` |
| วิธีชดเชย | ดึง upstream doc จาก official repo `github.com/Tencent/BrowserSkill` โดยตรง (`README.md`, `AGENT_INSTALL.md`, `install.ps1`, `crates/bsk-cli/skill/SKILL.md`) |
| สถานะ | ระบุเป็น **Assumption** — ทุกข้อสรุปอิงไฟล์ upstream เวอร์ชัน `main` ณ 2026-10-12 |

---

## 2. Environment Compatibility

| Component | ตรวจพบ | สถานะ |
|---|---|---|
| OS | Windows 11, build **10.0.26200.9550**, AMD64/x64 | ✅ |
| Shell (Hermes) | git-bash (MSYS_NT-10.0-26200) | ✅ |
| PowerShell | **5.1.26100.9549** (Desktop) — `#Requires -Version 5.1` ผ่าน | ✅ |
| Chrome | **154.0.8037.99** (ต้องการ Chromium ≥125) | ✅ |
| Edge | **155.0.4283.45** | ✅ |
| Node / npm | v26.7.0 / 11.19.0 (Hermes-bundled) | ✅ |
| Hermes Agent | **v0.21.6+636.gd4d2ab7** (2026.9.24, `stable`, git install) | ✅ |
| `bsk` CLI | **ไม่มี** (`which bsk` ล้มเหลว), ไม่มี `~/.bsk`, ไม่มี `browserskill*` dirs | ⚪ clean slate |
| Port 9222 / 9223 | ไม่มี listener | ⚪ n/a |
| Rust toolchain | **ไม่ต้องใช้** — `bsk` แจก prebuilt Windows x64 binary | ✅ n/a |
| Antigravity IDE | อยู่บน PATH (`…/Programs/Antigravity IDE/bin`) | ⚠️ coexistence risk → gate #3 |

**สรุป:** hard requirement ผ่านทั้งหมด → **GO (conditional)**

---

## 3. Hermes Skill Discovery (verified จาก source)

Root ที่ Hermes สแกน — **2 ที่**:

```
1. base    = <install>/skills          → C:\Users\sirav\AppData\Local\hermes\hermes-agent\skills
2. profile = get_hermes_home()/skills  → C:\Users\sirav\AppData\Local\hermes\skills   ← ใช้เป็นหลัก
```

หลักฐาน: `agent/learning_graph.py:221`, `agent/curator_backup.py:63`
รูปแบบ path: `<root>/<category>/<name>/SKILL.md` (เช่น `note-taking/obsidian`)

`bsk install-skill` ประกาศรองรับ **"Hermes Agent"** เป็น harness ทางการ — แต่ **path variant ยัง Unknown** จนกว่าจะรัน `bsk install-skill --list --json` (หลังติดตั้ง CLI)

---

## 4. Overlap Analysis (ตรวจว่าไปทับ skill เดิมไหม)

| Skill เดิม | ที่อยู่ | ความสัมพันธ์ |
|---|---|---|
| `browser-qa` | `hermes/skills/ecc-imports/02-testing-qa/` | **Complementary** — คนละ engine (Playwright/Puppeteer MCP) |
| `dogfood`, `e2e-testing` | ECC imports | **Complementary** — คนละ engine |
| AIOS `.agents/skills/*` (6 ตัว) | `My_Vault/.agents/skills/` | **ไม่มี collision** — ไม่มี entry ใดเป็น browser QA |

**ผลลัพธ์:** ไม่ซ้ำ ไม่แทนที่; ชื่อ skill `browser-skill` ไม่ชนกับ `browser-qa`
**Conflict check (รันจริง):** `find` ทั้ง 2 root + `.agents` ด้วย `*browser*` → เจอแค่ `browser-qa` และ `hyperframes-cli/references/doctor-browser.md` → **ไม่มี `browser-skill` อยู่ก่อน**

---

## 5. Missing Dependencies

1. **`bsk` CLI + local daemon** — ยังไม่ติดตั้ง (Phase 3)
2. **BrowserSkill browser extension** — **user ต้องติดตั้งเอง** จาก Chrome Web Store / Edge Add-ons (agent ทำแทนไม่ได้)

นอกจากนี้ไม่มี dependency อื่น

---

## 6. Existing-file Conflicts

**None detected** — `bsk` absent, ไม่มี skill dir `browser-skill`, ไม่มี `~/.bsk`, ไม่มี debug port
→ **`--force` ไม่จำเป็น และห้ามใช้** (กฎข้อ 3)

---

## 7. Go / No-Go = **GO (conditional)** — 6 Gates

| # | Gate |
|---|---|
| 1 | **Inspect `install.ps1` ก่อนรัน** — completed ✅ (อ่านครบ 11,197 bytes; ไม่ blind-pipe `iex`) |
| 2 | **ยืนยัน `bsk install-skill --list --json`** resolve Hermes path จริง — ยัง Unknown จนติดตั้ง CLI |
| 3 | **ติดตั้งเข้า Hermes เท่านั้น** — ต้องระบุ `--harness <id>` ชัดเจน ห้ามใช้ `--yes` เปล่า (จะลงทุก harness) |
| 4 | **Extension = manual step ของ user** — agent ทำไม่ได้ |
| 5 | `crwn.st` มี `.git/` ของตัวเอง (nested repo) → backup ต้องระวัง; ต้อง start dev server ก่อน QA |
| 6 | **Confirm deliverable location** ก่อนเขียน `.md` ใด ๆ |

---

## เอกสารเชื่อมโยง

- [[2026-10-12 Backup Manifest]] — สิ่งที่ backup ไว้ + rollback
- [[2026-10-12 Installation Plan]] — แผนติดตั้งแบบลงรายละเอียด
- Source: `Resources/` (handoff spec), `github.com/Tencent/BrowserSkill`
