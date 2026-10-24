# Mock Exam 2 — Panda Keepers (CRUD + SQLite + CORS)

**Lab ที่ครอบคลุม:** 8 (SQL + EJS) · 9 (SQLite) · 10 (JSON API) · 11 (HTTP methods, form POST, CORS)
**เวลาแนะนำ:** 60 นาที · **คะแนนเต็ม:** 25

## เตรียมเครื่อง
```bash
cd "2" && npm install && npm run init && npm start    # http://localhost:3002
```
`npm run init` สร้าง `keepers.db` (ตาราง `keepers`: id, name, zoo, role, salary) พร้อมข้อมูล 5 แถว

> ข้อสอบจริงอาจใช้ MySQL (lab 8) แทน SQLite — logic เหมือนเดิม ต่างที่ `conn.query(sql, [params], callback)` แทน `db.all/db.run` และ id ของแถวที่ INSERT อยู่ที่ `result.insertId` แทน `this.lastID`

## โจทย์
เติม `// TODO` ใน `index.js`, `views/index.ejs`, `views/add.ejs`, `views/edit.ejs`

1. **(3) Read** — `GET /` ดึงทุกแถวจากตาราง `keepers` เรียงตามชื่อ แสดงเป็นตาราง (id, name, zoo, role, salary) + ปุ่ม Edit/Delete ท้ายแถว + ลิงก์ไป `/add`
   - แสดง "Total salary: N" โดยใช้ `SUM` ใน SQL ไม่ใช่ loop
2. **(5) Create** — `GET /add` แสดงฟอร์ม (name, zoo, role, salary) → `POST /add` INSERT แล้ว `redirect('/')`
   - ใช้ placeholder `?` ห้ามต่อ string (SQL injection)
   - validate: name ว่าง หรือ salary ไม่ใช่ตัวเลข / ติดลบ → ตอบ **400** พร้อมแสดง error ในฟอร์มเดิม และไม่ INSERT
3. **(6) Update** — `GET /edit/:id` แสดงฟอร์มที่เติมค่าเดิม (ไม่พบ id → 404) → `POST /edit/:id` UPDATE แล้ว redirect
4. **(4) Delete** — `POST /delete/:id` DELETE แล้ว redirect; ปุ่มใน `index.ejs` เป็น `<form method="POST">` และมี `confirm()` ก่อนลบ
5. **(4) JSON API + CORS** — `GET /api/keepers` ตอบ JSON ทุกแถว, `GET /api/keepers/:id` ตอบ 1 แถว (ไม่พบ → 404 JSON)
   - เปิด CORS ด้วยแพ็กเกจ `cors` เฉพาะ route `/api/*`
   - ทดสอบด้วย `client/index.html` (เปิดด้วย Live Server พอร์ต 5500 หรือ double-click ไฟล์) ต้องเห็นตาราง keepers
6. **(3) Filter** — `GET /?zoo=Chiang Mai Zoo` กรองด้วย `WHERE zoo = ?` และมี `<select>` เลือก zoo จากค่า `DISTINCT` ใน DB

## Checklist ตรวจตัวเอง
- [ ] Add → ปรากฏในตาราง, Edit → ค่าเปลี่ยน, Delete → หาย, refresh แล้วข้อมูลยังอยู่
- [ ] POST name ว่าง → 400 ไม่เพิ่มแถว
- [ ] `client/index.html` ไม่ติด CORS error ใน console
- [ ] `/edit/999` → 404
