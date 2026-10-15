# BrowserSkill — Backup Manifest (Phase 2)

> **สถานะ:** ✅ เสร็จ — backup ครบ + verified ก่อนแตะระบบ
> **วันที่:** 2026-10-12
> **Backup dir:** `C:\Users\sirav\AppData\Local\hermes\backups\2026-10-12-browserskill-install\`

---

## 1. Backup Inventory (verified)

| File | ขนาด | SHA-256 (16 ตัวแรก) | หมายเหตุ |
|---|---|---|---|
| `config.yaml.bak` | 8,617 B | `97fdf87206affb7b` | ✅ hash **ตรงกับต้นฉบับ** ก่อน backup |
| `auth.json.bak` | 12,038 B | `b0a8139cad75535c` | ✅ hash ตรง; **มี credential — ห้ามเปิด/พิมพ์** |
| `user-PATH.bak.txt` | 767 B | — | snapshot ของ **User PATH** (registry) ก่อน installer prepend |
| `hermes-profile-skills.bak.tar.gz` | 10,868,147 B | `724b32cec4a0bb2b` | ทั้ง tree `hermes/skills` (17 MB, 22 categories) |
| `aios-dotagents.bak.tar.gz` | 38,410 B | `6698eb7193f9301c` | ทั้ง tree `My_Vault/.agents` (AIOS-native skills) |

**Note:** `~/.bashrc` **ไม่มีอยู่ก่อน** → ไม่มี backup; installer จะ **สร้างไฟล์ใหม่** (บันทึกเป็น side effect ที่รู้ล่วงหน้า)

---

## 2. State Snapshot ก่อนติดตั้ง (baseline)

| รายการ | สถานะก่อนติดตั้ง |
|---|---|
| `bsk` บน PATH | ❌ absent |
| `~/.bsk` (BSK_HOME) | ❌ ไม่มี |
| listener :9222 / :9223 | ❌ ไม่มี |
| `~/.local/bin` | ✅ มีอยู่ (`python3.14.exe`, `uv.exe`, `uvx.exe`, `uvw.exe`) — **อยู่ใน PATH แล้ว** |
| skill ชื่อ `browser-skill` | ❌ ไม่มี (ทั้ง 2 root + `.agents`) |
| Hermes `config.yaml` | ✅ ไม่ถูกแตะโดย installer |

---

## 3. Rollback Plan (ถ้าต้องถอย)

```bash
BK="/c/Users/sirav/AppData/Local/hermes/backups/2026-10-12-browserskill-install"
H="/c/Users/sirav/AppData/Local/hermes"

# 1) คืน config (ถ้าถูกแตะ)
cp -p "$BK/config.yaml.bak" "$H/config.yaml"

# 2) คืน skills tree
tar -xzf "$BK/hermes-profile-skills.bak.tar.gz" -C "$H"

# 3) คืน AIOS .agents
tar -xzf "$BK/aios-dotagents.bak.tar.gz" -C "/c/Users/sirav/Code/Note/My_Vault"

# 4) ลบ CLI ที่ติดตั้ง
rm -f "$HOME/.local/bin/bsk.exe"

# 5) คืน User PATH จาก snapshot (manual: เทียบกับ user-PATH.bak.txt)
#    และลบ ~/.bashrc ถ้า installer สร้างใหม่ (ตรวจว่าเดิมไม่มี)

# 6) ลบ daemon home
rm -rf "$HOME/.bsk"
```

**เกณฑ์ตัดสิน rollback:** `bsk doctor` รายงาน `fail` ที่แก้ไม่ได้, หรือ `bsk` ไปทับคำสั่ง/แก้ PATH จน shell อื่นเสีย

---

## เอกสารเชื่อมโยง

- [[2026-10-12 Compatibility Audit]]
- [[2026-10-12 Installation Plan]]
