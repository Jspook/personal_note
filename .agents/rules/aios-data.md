---
trigger: always_on
---

# AIOS Data Processing & Coding Rules

## 1. Web Clipping & Batch Processing Protocol
1. **One-Pass Deep Inspection:** ตรวจสอบตารางซ้อน, แท็กรูปภาพ (`<img>`), โค้ดบล็อก และข้อความ Error ตั้งแต่แรก ห้ามล้างแท็กแบบหยาบ (`<[^>]+>`)
2. **Plan & Confirm First:** สรุปรายการรูปภาพ/โครงสร้างและวางแผนร่วมกับผู้ใช้ก่อนลงมือทำเสมอ
3. **No Silent Background Loops:** ห้ามรันสคริปต์ย่อยวนซ้ำในเบื้องหลังโดยไม่แจ้งสถานะ
4. **Data Completeness:** ผลลัพธ์ต้องไม่มีเนื้อหาหลุดหาย รูปภาพต้องแสดงผลได้ทั้งบน PC และ iPad

## 2. Writing to the Vault & Attachments
- Persistent writing occurs when explicitly requested or required by a Skill: `Plan → Confirm → Write → Verify`.
- **Git Sync Awareness:** โฟลเดอร์ `Resources/` ถูกละเว้นโดย `.gitignore` ดังนั้นไฟล์ Assets/รูปภาพที่โน้ตใน `AIOS/` จำเป็นต้องใช้อ้างอิง ต้องจัดเก็บไว้ในโฟลเดอร์ `attachments/` ภายใต้โฟลเดอร์ของโน้ตนั้นๆ ใน `AIOS/` เสมอ

## 3. Coding Rules
- Preserve existing structure unless changes requested.
- Respect constraints (e.g., if `innerHTML` is prohibited, use DOM methods).
- Explain root cause of errors. Syntax-only requests must not add unsolicited abstractions.

## 4. External Research
- Use external research only when: explicitly asked, current/external info is necessary, or verifying external facts. Distinguish `AIOS Source` vs. `External Research`.