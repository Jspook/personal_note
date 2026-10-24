# Mock Exam 4 — Sales Report (SQLite + Ratio bar + Edit)

แนวข้อสอบ: final68 ข้อปฏิบัติ 1 · **Lab:** 8 (EJS) · 9 (SQLite) · 11 (POST, redirect)
**เวลาแนะนำ:** 45 นาที · **คะแนนเต็ม:** 20

## เตรียมเครื่อง
```bash
cd "4" && npm install && npm run init && npm start    # http://localhost:3004
```
`npm run init` สร้าง `saleamount.db` (ตาราง `products`: id, name, price, items_sold) 12 แถว
(ข้อสอบจริงอาจแจก `.db` ให้เลย ให้ใช้ไฟล์ที่แจกแทน แล้วดู schema ก่อนด้วย `PRAGMA table_info(products)`)

## โจทย์
เติม `// TODO` ใน `index.js`, `views/index.ejs`, `views/edit.ejs` (`public/style.css` ให้มาแล้ว มี class `.bar`, `.bar-fill`)

1. **(4) ตาราง** — `GET /` อ่านสินค้าทั้งหมดจาก DB แสดงเป็นตารางคอลัมน์: **ID, Name, Price, Items Sold, Total, Ratio**
   - `Total = price × items_sold` (คำนวณฝั่ง server)
2. **(3) ราคารวมทั้งหมด** — ใต้ตารางแสดง "ยอดรวมทั้งหมด" = ผลรวมของ Total ทุกแถว (คั่นหลักพัน เช่น `118,805.00` ด้วย `toLocaleString`)
3. **(5) Ratio** — `Ratio = Total / ยอดรวมทั้งหมด × 100` ทศนิยม 2 ตำแหน่ง
   - แสดงเป็นแถบ (`.bar-fill`) ที่ **ความกว้างเท่ากับ %** ใช้ `style="width: <%= ratio %>%"` และมีตัวเลข `%` อยู่ในแถบ
   - ตรวจกรณียอดรวม = 0 ต้องไม่เกิด `NaN`
4. **(4) แก้ไข** — คลิกชื่อสินค้าในตาราง (`<a>`) ไป `GET /edit/:id` แสดงฟอร์มเติมค่าเดิม **เฉพาะ Price และ Items sold** (ชื่อแก้ไม่ได้) ปุ่ม "ยืนยัน"
   - `POST /edit/:id` UPDATE ด้วย placeholder `?` แล้ว `redirect('/')` ตารางต้องแสดงค่าใหม่ และ Ratio ของทุกแถวถูกคำนวณใหม่
   - ไม่พบ id → 404
5. **(2) Validate** — price / items_sold ต้องเป็นจำนวนเต็ม ≥ 0 ไม่เช่นนั้นตอบ 400 และไม่ UPDATE
6. **(2) เรียงลำดับ** — รองรับ `/?sort=total` เรียงตาม Total มากไปน้อย (ไม่ส่ง sort → เรียงตาม id)

## Checklist ตรวจตัวเอง
- [ ] ผลรวม Ratio ทุกแถว ≈ 100%
- [ ] แถบ Ratio กว้างตาม % จริง (ลอง 35% ต้องยาวกว่า 2%)
- [ ] แก้ราคา Americano เป็น 100 → Total, ยอดรวม และ Ratio เปลี่ยน
- [ ] `/edit/999` → 404
