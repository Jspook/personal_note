# BrowserSkill — Installation Log (Phase 3–4)

> **สถานะ:** ✅ CLI + daemon + skill ติดตั้งเสร็จ | ⏸️ extension รอ user
> **วันที่:** 2026-10-12 | **bsk version:** `0.3.2` (`cli-v0.3.2`)

---

## 1. คำสั่งที่รันจริง (verbatim)

### Phase 3 — ติดตั้ง CLI
```bash
powershell.exe -NoProfile -ExecutionPolicy Bypass -File \
  "C:/Users/sirav/AppData/Local/hermes/cache/scratch/browserskill-audit/install.ps1"
```
รันจาก **ไฟล์ที่ inspect แล้ว** (ไม่ใช้ `irm | iex` — gate #1)

**ผล:** checksum verify ผ่าน, ติดตั้ง `bsk.exe` → `~/.local/bin/`, `bsk --version` → `0.3.2`

### Phase 3b — ติดตั้ง skill (harness = hermes เท่านั้น)
```bash
bsk install-skill --list --json                    # resolve harness id
bsk install-skill --harness hermes --yes --json    # ⚠️ ระบุ --harness ชัดเจน
```
**ไม่ใช้** `--all` (จะลง codex + claude-code ด้วย) และ **ไม่ใช้** `--force` (กฎข้อ 3)

**ผล:**
```json
{"success": true, "exit_code": 0,
 "results": [{"harness": "hermes",
   "path": "C:\\Users\\sirav\\AppData\\Local\\hermes\\skills\\browser-skill\\SKILL.md",
   "status": "installed"}],
 "errors": []}
```
**ยืนยันด้วย `--list --json`:** `installed:true` **เฉพาะ hermes** — codex / claude-code / cursor = `false` ✓ (gate #3 ผ่าน)

### Phase 4 — daemon startup (มี blocker → แก้ตาม reference)
```bash
# ❌ ล้มเหลว (auto-start):
#   cannot start an independent Windows daemon; host may prohibit Job Object breakaway
#   → terminal tool รันคำสั่งใน Job Object → daemon detached ออกไม่ได้

# ✅ วิธีที่ reference กำหนด (managed background task):
BSK_AUTO_START=0 bsk daemon start --foreground      # background=true, persist_on_release=true

# verify ใน SEPARATE tool call:
BSK_AUTO_START=0 bsk status --json
```

---

## 2. การเปลี่ยนแปลงต่อระบบ (จริง vs คาดการณ์)

| # | รายการ | คาดการณ์ | จริง | หมายเหตุ |
|---|---|---|---|---|
| 1 | `~/.local/bin/bsk.exe` | สร้าง | ✅ | version 0.3.2 |
| 2 | User PATH prepend | prepend | ✅ | `~/.local/bin` อยู่ต้นแล้ว |
| 3 | `~/.bashrc` | สร้างใหม่ | ✅ **60 B** | content: `export PATH='/c/Users/sirav/.local/bin':"$PATH"  # bsk CLI` |
| 4 | `~/.bsk/` | สร้าง | ✅ | daemon home |
| 5 | `hermes/skills/browser-skill/` | สร้าง | ✅ | SKILL.md 6,986 B + `.bsk-source`, `.bsk.lock`, `references/` 7 ไฟล์ |
| 6 | `hermes/config.yaml` | ไม่แตะ | ✅ ไม่แตะ | |
| 7 | Antigravity / crwn.st | ไม่แตะ | ✅ ไม่แตะ | |

**Skill files ที่ติดตั้ง:**
```
browser-skill/
├── SKILL.md                        (6,986 B)
├── .bsk-source                     (source marker)
├── .bsk.lock                       (lock)
└── references/
    ├── debugging.md
    ├── environment.md
    ├── files.md
    ├── help-and-recovery.md
    ├── interaction-details.md
    ├── screenshots-and-canvas.md
    └── tabs-and-profiles.md
```

---

## 3. Daemon Runtime State (verified)

```json
{
  "daemon_version": "0.3.2",
  "protocol_version": "1.3",
  "pid": 23048,
  "ws_port": 52800,
  "sock_path": "\\\\.\\pipe\\bsk-daemon-a33b9f94c412b906",
  "browsers": [],
  "sessions": []
}
```
Hermes background task ID (daemon): `proc_c0a6e17cdef0` — **คงรันไว้ ไม่ kill** (shared daemon)

---

## Phase 6 — Extension + First-use Verification (2026-10-12 · ต่อจาก Phase 4)

User ติดตั้ง extension เอง (Chrome `hhcmgoofomhgciiibhipgmgkgnoenaoi`) แล้วเปิด popup → **connected**

- `bsk doctor` → **8/8 ok** (เดิม 6 ok / 1 N/A / 1 fail = extension)
- `bsk browsers` → `ab6633a1 · chrome 155.0.0.0 · ext 0.3.2 · label "Work" · protocol 1.3`
- session `pjnh`: `session start --no-focus --json` → `navigate https://example.com` → `observe` (ได้ `@e1 link "Learn more"`) → `session stop` — **exit 0 ทุกขั้น**
- `bsk session list` → `(no active sessions)`; daemon ยังรัน `pid 23048` (shared, ไม่ถูก kill)

ตารางหลักฐานเต็ม → [[2026-10-12 Verification Report]]

---

## เอกสารเชื่อมโยง

- [[2026-10-12 Installation Plan]] · [[2026-10-12 Backup Manifest]] · [[2026-10-12 Verification Report]]
