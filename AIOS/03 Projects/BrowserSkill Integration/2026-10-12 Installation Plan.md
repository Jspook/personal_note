# BrowserSkill — Installation Plan (Phase 2)

> **สถานะ:** 📋 แผนพร้อมรัน — **รอไฟเขียว Phase 3**
> **วันที่:** 2026-10-12 | **Target version:** `bsk` **v0.3.2** (`cli-v0.3.2`, released 2026-09-30)

---

## 1. Artifact ที่จะติดตั้ง

| รายการ | ค่า |
|---|---|
| Asset | `bsk-v0.3.2-x86_64-pc-windows-msvc.zip` |
| SHA-256 | `b773c443275b8581af29b314baa799e1ec599464379998edcf1dbc7eb07a7eab` |
| ปลายทาง binary | `C:\Users\sirav\.local\bin\bsk.exe` |
| Checksum verify | ✅ มีใน `version.json` → installer verify ให้อัตโนมัติ |
| `--force` | ❌ **ไม่ใช้** (ไม่มี conflict + ห้ามตามกฎข้อ 3) |

---

## 2. ผลกระทบต่อระบบ (จาการอ่าน `install.ps1` ทั้งไฟล์ — 11,197 bytes)

| # | สิ่งที่ installer ทำ | ระดับความเสี่ยง | ย้อนกลับได้ด้วย |
|---|---|---|---|
| 1 | เขียน `bsk.exe` → `~/.local/bin/` | ต่ำ (เพิ่มไฟล์ใหม่) | `rm bsk.exe` |
| 2 | **Prepend `~/.local/bin` เข้า User PATH (registry)** | กลาง (แก้ persistent env) | `user-PATH.bak.txt` |
| 3 | **สร้าง/ต่อท้าย `~/.bashrc`** (บรรทัด `export PATH=…`) | กลาง (ไฟล์เดิมไม่มี → สร้างใหม่) | ลบไฟล์ / ลบบรรทัด |
| 4 | เรียก `bsk daemon stop` ก่อนวางไฟล์ (fail-closed) | ต่ำ (ไม่มี daemon รันอยู่) | — |
| 5 | ครั้งแรกที่รัน → สร้าง `~/.bsk/` (daemon home) | ต่ำ | `rm -rf ~/.bsk` |

**ไม่แตะ:** `hermes/config.yaml`, skill ใด ๆ, Antigravity, `crwn.st`

---

## 3. ขั้นตอน (Phases 3 → 7)

### Phase 3 — ติดตั้ง CLI
```bash
# รันจากไฟล์ที่ inspect แล้ว (ไม่ blind-pipe iex) — ตรงตาม gate #1
powershell -NoProfile -ExecutionPolicy Bypass -File "$SCR/browserskill-audit/install.ps1"
# แล้วยืนยัน
~/.local/bin/bsk.exe --version      # คาดหวัง: 0.3.2
```

### Phase 3b — ติดตั้ง skill เข้า Hermes harness
```bash
bsk install-skill --list --json                     # ดู ID + path จริง (แก้ Unknown ของ gate #2)
bsk install-skill --harness <hermes-id> --json      # ⚠️ ต้องระบุ --harness ชัดเจน
# ❌ ห้ามใช้: bsk install-skill --yes   (จะลงทุก harness ที่ detect เจอ)
# ❌ ห้ามใช้: --force                  (ไม่จำเป็น + ผิดกฎข้อ 3)
```
ตรวจผล: skill `browser-skill` ต้องไปโผล่ใต้ profile root `C:\Users\sirav\AppData\Local\hermes\skills\`

### Phase 4 — `bsk doctor`
```bash
bsk doctor
```
เกณฑ์ผ่าน: **ไม่มีแถว `fail`** (แถว `extension connected` ยัง fail ได้ = ปกติสำหรับ fresh install)

### Phase 5 — ต่อ browser extension — 🔴 **USER ต้องทำเอง**
- Chrome / Chromium: `https://chromewebstore.google.com/detail/hhcmgoofomhgciiibhipgmgkgnoenaoi`
- Edge: `https://microsoftedge.microsoft.com/addons/detail/browserskill/emacgiaaaiojkkpkddmmdfhmokgmnikg`
- จากนั้นเปิด popup → enable connection → ยืนยัน port ตรงกับ local daemon → รอสถานะ connected
- แล้วรัน `bsk doctor` ซ้ำ

### Phase 6 — First-use verification
```bash
bsk session start --no-focus --json      # เก็บ session ID
bsk open https://example.com --session <id>
bsk session stop <id>                    # ต้อง cleanup ทุกกรณี
```
รายงาน **PASS** เฉพาะเมื่ออ่านหน้าได้จริง + stop session สำเร็จ

### Phase 7 — Verification Report
สรุป PASS/PARTIAL/FAIL + warnings ที่เหลือ + rollback status

---

## 4. ยัง Unknown (ต้อง resolve ระหว่าง Phase 3)

| # | Unknown | วิธี resolve |
|---|---|---|
| 1 | Harness ID ของ Hermes ใน `bsk install-skill --list` | รัน `--list --json` |
| 2 | Path ที่ `install-skill` จะเขียนจริง | ดูจาก `--json` output |
| 3 | Extension port ที่ daemon เลือก | ดูจาก `bsk doctor` |

---

## 5. Gate ก่อนไป Phase 3 — ต้องการจากผู้ใช้

1. **ไฟเขียวรัน `install.ps1`** — เพราะจะแก้ **persistent User PATH** + **สร้าง `~/.bashrc`** (backup แล้ว)
2. ยืนยันว่า **User PATH ถูก prepend ได้** (หรือให้เปลี่ยน `BSK_INSTALL_DIR` เป็นที่อื่น)

---

## เอกสารเชื่อมโยง

- [[2026-10-12 Compatibility Audit]]
- [[2026-10-12 Backup Manifest]]
