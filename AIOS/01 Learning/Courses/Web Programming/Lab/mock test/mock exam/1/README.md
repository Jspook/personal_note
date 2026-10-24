# Mock Exam 1 — Panda Gallery (REST API + EJS)

**Lab ที่ครอบคลุม:** 7 (Express routing, static) · 8 (EJS) · 9 (EJS partials) · 10 (REST API / fetch)
**เวลาแนะนำ:** 45 นาที · **คะแนนเต็ม:** 20

## เตรียมเครื่อง
```bash
# terminal 1 — API จำลอง (ห้ามแก้)
cd "../mock-api" && npm install && npm start      # http://localhost:4000
# terminal 2 — ข้อสอบ
cd "1" && npm install && npm start                # http://localhost:3000
```

## API ที่ใช้
| Method | URL | ผลลัพธ์ |
|---|---|---|
| GET | `http://localhost:4000/pandas` | array ของ panda ทั้งหมด |
| GET | `http://localhost:4000/pandas?species=Giant` | กรองตาม species (`Giant` / `Red`) |
| GET | `http://localhost:4000/panda/:id` | panda 1 ตัว หรือ 404 `{"error": "Panda not found"}` |

Field: `id, name, species, age, weight_kg, zoo, diet, description, image_url`

## โจทย์
ไฟล์ที่ให้มาแล้ว: `public/style.css` (class `.grid`, `.card`, `.badge`, `.badge.red`, `.filters`, `.error`), `public/about.html`
ให้เติมตรง `// TODO` / `<%# TODO %>` ใน `index.js`, `views/index.ejs`, `views/detail.ejs`, `views/partials/*.ejs`

1. **(2) Static + route** — เปิด `/about` แล้วส่งไฟล์ `public/about.html` ด้วย `res.sendFile` และให้ `/style.css` โหลดได้ด้วย `express.static`
2. **(2) Partials** — สร้าง `header.ejs` (nav: Home / About) และ `footer.ejs` แล้ว `include` ในทุกหน้า
3. **(5) Grid card** — `/` เรียก `GET /pandas` ด้วย `fetch` แล้วแสดงเป็น grid card ตัวละ 1 ใบ:
   รูป, ชื่อ, species (badge), อายุ, ลิงก์ "View" ไปหน้า detail
   - species `Red` ต้องใช้ `class="badge red"` (ใช้ `if` ใน EJS)
   - ถ้าไม่มีข้อมูล แสดง "No pandas found"
4. **(3) Filter** — ปุ่ม All / Giant / Red ส่ง query string `/?species=Giant` และ server ส่งต่อให้ API
5. **(4) Detail** — `/panda/:id` เรียก `GET /panda/:id` แล้วแสดงทุก field
   - API ตอบ 404 → ตอบกลับหน้าเว็บ status 404 พร้อมข้อความ "Panda not found" และลิงก์กลับหน้าแรก
6. **(2) Error handling** — API ล่ม (`fetch` throw) → render หน้าแรกด้วย `error` ให้แสดงกล่อง `.error` แทน grid ห้าม server crash
7. **(2) Stats** — แสดงบนหน้าแรก "Total: N pandas · Average age: X.X" คำนวณฝั่ง server ด้วย `reduce`

## Checklist ตรวจตัวเอง
- [ ] `/` ขึ้น 8 card, `/?species=Red` ขึ้น 3 card
- [ ] `/panda/4` แสดง Rusty, `/panda/99` ได้ 404
- [ ] ปิด mock-api แล้วเปิด `/` ไม่ crash
- [ ] header/footer มาจาก partial ไม่ได้ copy ซ้ำ
