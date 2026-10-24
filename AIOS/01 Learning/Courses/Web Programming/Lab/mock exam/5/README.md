# Mock Exam 5 — Food Order (API + Session cart + Orders)

แนวข้อสอบ: final68 ข้อปฏิบัติ 2 · **Lab:** 7 · 8 (EJS) · 9 (partials) · 10 (fetch) · 11 (POST) · 12 (session)
**เวลาแนะนำ:** 60 นาที · **คะแนนเต็ม:** 25

## เตรียมเครื่อง
```bash
# terminal 1 — API จำลอง (ห้ามแก้)
cd "../mock-api" && npm install && npm start      # http://localhost:4000
# terminal 2 — ข้อสอบ
cd "5" && npm install && npm start                # http://localhost:3005
```
API ที่ใช้ (รูปแบบเดียวกับ `my-json-server.typicode.com/bemalykuma/mockDB`)

| Method | URL | ผลลัพธ์ |
|---|---|---|
| GET | `http://localhost:4000/foods` | array ของอาหารทั้งหมด `{ id, name, description, price, image }` |
| GET | `http://localhost:4000/foods/:id` | อาหาร 1 รายการ (ไม่พบ → 404) |

ข้อสอบจริงใช้ URL typicode เปลี่ยนแค่ค่า `API` ใน `index.js` เป็น `https://my-json-server.typicode.com/bemalykuma/mockDB`

## โจทย์
เติม `// TODO` ใน `index.js` และ `views/*.ejs` (`public/style.css` ให้มาแล้ว)
`index.js` ตั้งค่า `express-session` ให้แล้ว เก็บข้อมูลใน `req.session.cart` (ตะกร้า) และ `req.session.orders` (รายการสั่งซื้อ)

1. **(3) Nav bar + partial** — `views/partials/nav.ejs` มีลิงก์ รายการอาหาร (`/`), ตะกร้าสินค้า (`/cart`), รายการสั่งซื้อ (`/orders`) และแสดงจำนวนชิ้นในตะกร้าเป็น badge ทุกหน้า (ส่งผ่าน `res.locals`)
2. **(4) รายการอาหาร** — `GET /` เรียก `GET /foods` แสดงเป็น grid card (รูป, ชื่อ, คำอธิบาย, ราคา `฿`, ปุ่ม "+ เพิ่ม")
   - API ล่ม → แสดงข้อความ error ไม่ crash
3. **(5) เพิ่มลงตะกร้า** — ปุ่ม "+ เพิ่ม" เป็น `<form method="POST" action="/cart/add/:id">`
   server เรียก `GET /foods/:id` แล้วเก็บ `{ id, name, price, qty }` ลง `req.session.cart` แล้ว redirect `/`
   - อาหารซ้ำ → เพิ่ม `qty` ไม่เพิ่มแถวใหม่
   - id ไม่มีใน API (404) → ไม่เพิ่ม
4. **(4) ตะกร้า** — `GET /cart` แสดงตาราง ID, Name, จำนวน, ราคา และ "ราคารวม" (`price × qty` รวมทุกแถว) + ปุ่ม "ยืนยันการสั่งซื้อ"; ตะกร้าว่าง → "ตะกร้าว่าง" และซ่อนปุ่ม
5. **(4) ยืนยันการสั่งซื้อ** — `POST /cart/confirm` ย้ายของในตะกร้าไปต่อท้าย `req.session.orders` (รวม qty ถ้าซ้ำ) **ล้างตะกร้า** แล้ว redirect `/`
6. **(3) รายการสั่งซื้อ** — `GET /orders` แสดงตารางเหมือนตะกร้า + ราคารวม + ปุ่ม "ชำระเงิน"; ว่าง → "ยังไม่มีรายการสั่งซื้อ"
7. **(2) ชำระเงิน** — `POST /orders/pay` ล้าง `orders` แล้ว redirect `/`

## Checklist ตรวจตัวเอง
- [ ] เพิ่ม Pizza 2 ครั้ง → ตะกร้า 1 แถว qty = 2, badge ใน nav = 2
- [ ] ยืนยัน → ตะกร้าว่าง, ไป `/orders` เห็นของที่สั่ง
- [ ] ยืนยันรอบสอง → รายการใน orders สะสม
- [ ] ชำระเงิน → orders ว่าง
- [ ] ปิด mock-api แล้วเปิด `/` ไม่ crash
