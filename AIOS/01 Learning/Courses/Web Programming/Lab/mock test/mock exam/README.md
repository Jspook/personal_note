# Web Programming — Final Mock Exam (Lab 7–12)

| ข้อ | หัวข้อ | Lab ที่ใช้ | Port | เวลา | คะแนน |
|---|---|---|---|---|---|
| [1](1/README.md) | API → grid card panda | 7, 8 (EJS), 9 (partials), 10 | 3000 | 45 นาที | 20 |
| [2](2/README.md) | CRUD add / edit / delete | 8 (SQL), 9, 10, 11 (POST, CORS) | 3002 | 60 นาที | 25 |
| [3](3/README.md) | Login + cookie + session | 7, 9, 10, 11, 12 | 3003 | 60 นาที | 25 |
| [4](4/README.md) | ตารางยอดขาย + แถบ Ratio + แก้ไข (แนว final68 ปฏิบัติ 1) | 8, 9, 11 | 3004 | 45 นาที | 20 |
| [5](5/README.md) | รายการอาหาร → ตะกร้า → สั่งซื้อ → ชำระเงิน (แนว final68 ปฏิบัติ 2) | 7–12 | 3005 | 60 นาที | 25 |
| [6](6/README.md) | ข้อเขียน 6 ข้อ พร้อมเฉลย (แนว final68) | Unit 07–12 | — | 30 นาที | 30 |

`mock-api/` คือ REST API จำลอง (port 4000) ใช้ในข้อ 1, 3 และ 5 — เปิดค้างไว้ ห้ามแก้

## Coverage matrix
| Lab | หัวข้อ | ข้อที่ฝึก |
|---|---|---|
| 7 | Express routing, static files, `sendFile`, middleware | 1, 3, 5 |
| 8 | EJS template / SQL query (MySQL ใช้ `conn.query` ต่างจาก SQLite แค่ driver) | 1, 2, 4, 5, 6 |
| 9 | SQLite, EJS partials (`include`) | 1, 2, 3, 4, 5, 6 |
| 10 | REST API, `fetch`, JSON, error handling | 1, 2, 3, 5 |
| 11 | POST form, redirect, update/delete, CORS | 2, 3, 4, 5 |
| 12 | cookie, session, login flow, cart | 3, 5, 6 |

## วิธีฝึก
1. จับเวลาตามตาราง เปิดดูได้เฉพาะโค้ดใน lab 7–12 (จำลองข้อสอบจริง)
2. เติมทุก `TODO` ใน skeleton (หาไฟล์ที่มี TODO ด้วย `grep -rn TODO . --exclude-dir=node_modules`)
3. ตรวจด้วย Checklist ท้าย README แต่ละข้อ
4. แก้แล้วยังไม่ผ่านให้ย้อนอ่าน Unit note ที่ตรงกัน เช่น Unit 10 (REST API), Unit 11 (HTTP Methods + CORS), Unit 12 (Session + Cookie)

## เตรียมเครื่องครั้งแรก
```bash
cd mock-api && npm install
cd ../1 && npm install
cd ../2 && npm install && npm run init
cd ../3 && npm install && npm run init
```
