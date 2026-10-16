# extraction-report: Les03  -  Compatibility Mode.pdf

- **ไฟล์:** `Resources/Books/Database/Les03  -  Compatibility Mode.pdf` (ชื่อไฟล์มีช่องว่างสองช่องรอบ `-`) — 66 หน้า, สไลด์ Oracle "Single-Row Functions" (Oracle Corporation, 2001), ภาษาอังกฤษ
- **เครื่องมือ:** PyMuPDF ผ่าน `extract_pdf.py` + อ่านภาพหน้าที่ติดธงด้วยตา (46 หน้า ผ่าน contact sheet s01-s12)
- **PUA glyph:** ไม่พบ (ไฟล์ภาษาอังกฤษ)

## ปัญหาที่พบ
1. p.33, p.35 และ p.60-66 เป็นสไลด์ว่าง (มีแต่ส่วนท้าย) — ตรวจพิกเซลโดยผู้ตรวจแล้ว; Practice 3 (p.24, 59) จึงไม่มีโจทย์ในไฟล์
2. p.28-30 เหมือนกันทุกพิกเซล; p.39 = p.40; p.8 ข้อความเหมือน p.7
3. ผลลัพธ์คิวรีอยู่ในภาพ ไม่อยู่ใน text layer — ถอดจากภาพ
4. p.34 `AM` แสดง `PM`; p.58 Summary พูดถึง "groups of rows" ที่บทไม่ครอบคลุม — คงไว้และแจ้งใน Pitfalls
5. p.57 ไม่มีตารางผลลัพธ์

## ไฟล์ในโฟลเดอร์
`raw-content.md`, `page-inventory.json`, `pages/`, `sheets/`, `complete-notes.md`, `HW-Database-04.md`
