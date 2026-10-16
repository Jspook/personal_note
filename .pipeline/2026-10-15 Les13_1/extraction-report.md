# extraction-report: Les13_1.pdf

- **ไฟล์:** `Resources/Books/Database/Les13_1.pdf` — 20 หน้า, สไลด์ Oracle "Controlling User Access" (Oracle Corporation, 2001), ภาษาอังกฤษ
- **เครื่องมือ:** PyMuPDF ผ่าน `extract_pdf.py` + อ่านภาพทั้ง 20 หน้า (contact sheet s01-s05; ติดธง 9 หน้า: 1, 3, 9, 10, 12, 14, 15, 16, 19)
- **PUA glyph:** U+F0D6 (15 ตัว) ใน p.12 = เครื่องหมาย √ ในตาราง object privileges ถอดตามภาพ

## ปัญหาที่พบ
1. วัตถุประสงค์ p.2 "Create and access database links" ไม่มีสไลด์สอนในไฟล์
2. เลขท้ายสไลด์: p.19 = 13-21, p.20 = 13-22 (ข้าม 13-19, 13-20); p.1 ไม่มีเลข
3. p.14 มี "7" ติดหลัง `Grant succeeded.`
4. p.19 "access the your objects" (พิมพ์ผิดในต้นฉบับ)
5. p.20 Practice 13 มีแค่หน้าภาพรวม ไม่มีโจทย์
6. ตาราง p.12 และรูป p.3, p.9 อยู่ในภาพ ถอดจากภาพ

## ไฟล์ในโฟลเดอร์
`raw-content.md`, `page-inventory.json`, `pages/`, `sheets/`, `complete-notes.md`, `HW-Database-05.md`
