# extraction-report: Database_Concept_08(1).pdf

- **ไฟล์:** `Resources/Books/Database/Database_Concept_08(1).pdf` — 54 หน้า, PowerPoint for Microsoft 365, metadata title "Database System Concepts" (ชื่อบทใน p.1: Chapter 8 Introduction to Business Intelligence and Data Warehouse)
- **เครื่องมือ:** PyMuPDF ผ่าน `extract_pdf.py` + อ่านภาพหน้าที่ติดธงด้วยตา (44 หน้า: p.3-25 คู่ละแผ่น 100 dpi, หน้าที่เหลือ 4 หน้า/แผ่น 75 dpi, ขยายที่ 150-170 dpi: p.23, 24, 25, 52)
- **PUA glyph:** ไม่พบตัวที่ map ไม่ได้
- **หน้าข้อความล้วน (ไม่ติดธง):** 11, 28, 29, 30, 33, 34, 35, 36, 41, 53 (สถานะ `extracted`); หน้าที่ติดธงทั้ง 44 หน้าอ่านภาพแล้วครบ สถานะ `extracted+visually-checked`

## ปัญหาที่พบ
1. **ภาษาไทย p.6-25 วรรณยุกต์/สระบนล่างหายหรือเลื่อน** ทั้งใน text layer และภาพ (ฟอนต์/การ export) ผู้เขียนโน้ตสร้างตัวสะกดคืนจากบริบทและเทียบภาพ — ระบุใน Pitfalls
2. **ข้อความใน diagram/ตาราง/รูปไม่อยู่ใน text layer:** p.5 (cube), p.9 (BI components), p.13 (ETL), p.15 (ETL functions), p.16/19/20/21 (star/snowflake schema), p.23-25 (OLAP ตาราง), p.39 (sharded cluster), p.42-47 (ชนิด NoSQL), p.48 (RDBMS vs MongoDB), p.49-51 (popular software), p.52 (flowchart ลายมือ) — ถอดจากภาพ
3. **เลขท้ายสไลด์ข้าม:** ตรงกับลำดับถึง p.41; p.43→44 … p.54→57; p.37-38, p.40 ไม่มีเลข
4. **p.14** มีกล่อง `!=` ไม่มีคำอธิบาย
5. **p.21** รูป Category มี SubCategory ซ้ำกับ ProductDimension
6. **p.22 vs p.23** ตัวอย่างข้อความกับรูปคนละชุด
7. **p.32** "Not Only Structure Query Language" และประโยคอ่านติด
8. **p.24** ใช้คำ "Glossary" (น่าจะ Grocery) คงไว้
9. **ตัวเลข OLAP (p.23-25)** ตรวจผลรวมสอดคล้องกัน

## ไฟล์ในโฟลเดอร์
`raw-content.md`, `page-inventory.json`, `pages/pNN.png`, `sheets/`, `complete-notes.md`, `HW-Database-03.md`
