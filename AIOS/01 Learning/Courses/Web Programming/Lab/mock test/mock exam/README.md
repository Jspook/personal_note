# Web Programming — Final Mock Exam (Lab 7–12)

| ข้อ | หัวข้อ | Lab ที่ใช้ | Port | เวลา | คะแนน |
|---|---|---|---|---|---|
| [1](1/README.md) | API → grid card panda | 7, 8 (EJS), 9 (partials), 10 | 3000 | 45 นาที | 20 |
| [2](2/README.md) | CRUD add / edit / delete | 8 (SQL), 9, 10, 11 (POST, CORS) | 3002 | 60 นาที | 25 |
| [3](3/README.md) | Login + cookie + session | 7, 9, 10, 11, 12 | 3003 | 60 นาที | 25 |

`mock-api/` คือ REST API จำลอง (port 4000) ใช้ในข้อ 1 และ 3 — เปิดค้างไว้ ห้ามแก้

## Coverage matrix
| Lab | หัวข้อ | ข้อที่ฝึก |
|---|---|---|
| 7 | Express routing, static files, `sendFile`, middleware | 1, 3 |
| 8 | EJS template / SQL query (MySQL ใช้ `conn.query` ต่างจาก SQLite แค่ driver) | 1, 2 |
| 9 | SQLite, EJS partials (`include`) | 1, 2, 3 |
| 10 | REST API, `fetch`, JSON, error handling | 1, 2, 3 |
| 11 | POST form, redirect, update/delete, CORS | 2, 3 |
| 12 | cookie, session, login flow, cart | 3 |

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
