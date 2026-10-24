# Mock Exam 3 — Panda Adoption (Login, Cookie, Session)

**Lab ที่ครอบคลุม:** 7 (routing, middleware) · 9 (SQLite) · 10 (fetch REST API) · 11 (POST form) · 12 (cookie, session — เหมือน lab 12/2)
**เวลาแนะนำ:** 60 นาที · **คะแนนเต็ม:** 25

## เตรียมเครื่อง
```bash
# terminal 1 — API จำลอง (ห้ามแก้)
cd "../mock-api" && npm install && npm start      # http://localhost:4000
# terminal 2 — ข้อสอบ
cd "3" && npm install && npm run init && npm start   # http://localhost:3003
```
บัญชีทดสอบ (ตาราง `users`): `admin / admin123` (role admin) · `jackpot / panda123` · `guest / guest123` (role member)

## โจทย์
`index.js` ตั้งค่า `cookie-parser`, `express-session`, EJS และต่อ `users.db` ให้แล้ว เติม `// TODO` ใน `index.js` และ `views/*.ejs`

1. **(3) หน้า Login** — `GET /login` แสดงฟอร์ม username / password / checkbox "Remember me"
   - ถ้ามี cookie `remember_username` ให้เติมค่าใน username และติ๊ก checkbox ให้อัตโนมัติ
2. **(6) ตรวจสอบ Login** — `POST /login` ค้นหา user จาก DB ด้วย placeholder `?`
   - ถูก: เก็บ `{ id, username, display_name, role }` ลง `req.session.user`, redirect `/dashboard`
   - ผิด: ตอบ **401** render `login` พร้อมข้อความ "Invalid username or password" (ห้ามบอกว่าผิดที่ช่องไหน)
   - ผิดครบ 3 ครั้งติดต่อกัน (นับใน session) → ตอบ **429** "Too many attempts" และไม่ query DB อีก
3. **(4) Remember me** — ถ้า login สำเร็จและติ๊ก checkbox → `res.cookie('remember_username', username, { maxAge: 7 วัน, httpOnly: true })`; ถ้าไม่ติ๊ก → ลบ cookie นี้ด้วย `clearCookie`
   - ทุกครั้งที่ login สำเร็จ ตั้ง cookie `last_login` เป็นเวลาปัจจุบัน (ISO string)
4. **(3) Middleware** — เขียน `requireLogin`: ไม่มี `req.session.user` → redirect `/login`
5. **(4) Dashboard** — `GET /dashboard` (ใช้ `requireLogin`) แสดง `display_name`, `role`, ค่า `last_login` **ก่อนหน้า** จาก cookie (อ่านก่อนเขียนค่าใหม่) และจำนวนครั้งที่เปิดหน้านี้ใน session (`visits`)
6. **(4) Adopt (ตะกร้า เหมือน lab 12/2)** — ต้อง login ทั้งหมด
   - `GET /adopt/:id` เรียก `GET http://localhost:4000/panda/:id`, push `{ id, name, species, weight_kg }` ลง `req.session.adopted` (ห้ามซ้ำ id), redirect `/adopt`; API 404 → redirect `/adopt` โดยไม่เพิ่ม
   - `GET /adopt` แสดงรายการ + น้ำหนักรวม (`reduce`) + ปุ่ม Confirm
   - `POST /adopt/confirm` ล้างรายการ แล้ว redirect `/adopt?confirmed=1` และหน้าแสดงข้อความสำเร็จ
7. **(1) Logout** — `GET /logout` ทำลาย session และลบ cookie `connect.sid` แล้ว redirect `/login` (cookie `remember_username` ต้องยังอยู่)

## Checklist ตรวจตัวเอง
- [ ] ยังไม่ login แล้วเปิด `/dashboard` `/adopt` → เด้งไป `/login`
- [ ] ติ๊ก Remember me → ปิดแท็บเปิดใหม่ username ยังอยู่ (ดูใน DevTools → Application → Cookies)
- [ ] ใส่รหัสผิด 3 ครั้ง → 429
- [ ] เพิ่ม panda ตัวเดิมซ้ำ → ไม่ซ้ำในรายการ
- [ ] logout แล้วกด Back ไป `/dashboard` → ถูกเด้ง
