# extraction-report: Database_Concept_07(2).pdf

- **ไฟล์:** `Resources/Books/Database/Database_Concept_07(2).pdf` — 52 หน้า, PowerPoint for Microsoft 365 export, metadata title "Database System Concepts" (ชื่อบทจริงในสไลด์ p.1: Chapter 7 Introduction to Transaction and Recovery)
- **เครื่องมือ:** PyMuPDF ผ่าน `extract_pdf.py` (text layer มี) + อ่านภาพหน้าที่ติดธงด้วยตา (contact sheet 4 หน้า/แผ่น 75 dpi ทั้ง 8 แผ่น, ขยาย p.35 ที่ 110 dpi)
- **Thai PUA glyph:** remap ปกติ; พบ U+F097 หนึ่งตัวที่ p.18 = สัญลักษณ์ bullet ของฟอนต์ (ตัดทิ้ง)
- **หน้าที่ติดธง 32 หน้า:** 1, 2, 3, 9, 12, 13, 16, 17, 19, 20, 21, 22, 23, 24, 26, 28, 29, 31-37, 40, 43-46, 48, 49, 52 — อ่านภาพครบทุกหน้า สถานะ `extracted+visually-checked`
- **หน้าข้อความล้วน:** 4-8, 10, 11, 14, 15, 18, 25, 27, 30, 38, 39, 41, 42, 47, 50, 51 — สถานะ `extracted`

## ปัญหาที่พบ / ที่ต้องรู้
1. **ข้อความในรูป/ตารางไม่อยู่ใน text layer:** p.3 (แผนภาพโมดูล DBMS), p.9, p.12, p.13, p.16, p.21-24, p.26, p.28-29, p.31-35 (ตาราง schedule), p.36-37 (ตาราง), p.40, p.43-46, p.49 — อ่านจากภาพและถอดเป็นตาราง/Mermaid
2. **text layer ของ p.17-19 สระ/วรรณยุกต์เพี้ยน** (เช่น "กว้า", "ก้อน", "อินเทอร้ลิฟวิ่ง") ภาพสไลด์ถูกต้อง — โน้ตใช้ตัวสะกดตามภาพและระบุใน Pitfalls; สระ "ำ" ในหลายหน้าถูกแยกเป็นช่องว่าง ("ด าเนิน") ฟื้นให้ถูก
3. **เลขท้ายสไลด์ข้าม:** p.1-39 ตรงกับเลขหน้า, p.40→42 … p.51→53, p.52→64
4. **ชื่อ Schedule ซ้ำ:** Schedule 1/2/3 (p.22-24) vs Schedule 1/2 (p.32), Schedule 1/3 (p.33), Schedule 3/6 (p.28), Schedule 5/6 (p.34)
5. **p.17** อ้าง "ภาพ Schedule C" ไม่มีรูปในสไลด์
6. **p.14** ทิ้งคำถาม "(why?)" ไม่เฉลย; **p.4** หัวข้อ "แฟ้มที่เก็บรายการการเปลี่ยนแปลง" ไม่มีคำอธิบาย
7. **p.8** ประโยคลงท้าย "สมัยก่อน" ความหมายไม่ชัด
8. **ตัวสะกดผิดในต้นฉบับ:** "Automicity" (p.11), "Commited" (p.16, ในรูปด้วย), "buffre" (p.9, ในรูป)
9. **ตำแหน่งลูกศรใน p.3, p.9, p.46** อ่านจากภาพ อาจไม่ตรงทุกเส้น — ระบุในคำบรรยายใต้แผนภาพ

## ไฟล์ในโฟลเดอร์นี้
`raw-content.md`, `page-inventory.json`, `pages/pNN.png` (60 dpi), `sheets/` (contact sheet), `complete-notes.md`, `HW-Database-02.md`
