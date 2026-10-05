# Web Programming - Unit 09: Embedded Database SQLite & EJS Partials

## Part 1: Macro Architecture & Technology Overview

สถาปัตยกรรมฐานข้อมูลฝั่งหลังบ้านสามารถแบ่งออกเป็น 2 รูปแบบหลัก:
1. **Client-Server RDBMS (เช่น MySQL, PostgreSQL):** ทำงานเป็นกระบวนการภายนอก (Separate Process) เหมาะกับระบบขนาดใหญ่ รองรับการเขียนพร้อมกันจำนวนมากผ่านเครือข่าย
2. **Embedded Database (เช่น SQLite):** ทำงานเป็นไลบรารีที่ฝังรวมอยู่ภายในแอปพลิเคชัน (In-Process) อ่านเขียนข้อมูลตรงลงใน **ไฟล์ดิสก์เดี่ยว (Single File)** โดยไม่ต้องติดตั้งเซิร์ฟเวอร์แยก

```mermaid
flowchart TD
    subgraph Traditional["Traditional Client-Server RDBMS (MySQL)"]
        direction LR
        App1["Express App"] ---|Network Socket (Port 3306)| Server1[("MySQL Server Daemon")]
    end
    
    subgraph Embedded["Embedded Database (SQLite)"]
        direction LR
        App2["Express App (In-Process Library)"] ---|Direct File I/O| File1[("app.db File (On Disk)")]
    end
```

ร่วมกับการใช้ **EJS Partial Templates** ในการสร้างมอดูลส่วนประกอบของหน้าเว็บแบบใช้ซ้ำ (Modular UI Components) เช่น Header, Footer, และ Navigation Bar ตามหลักการ DRY (Don't Repeat Yourself)

### ตารางเปรียบเทียบฐานข้อมูล: SQLite vs MySQL vs PostgreSQL

| คุณสมบัติ (Feature) | SQLite | MySQL | PostgreSQL |
| :--- | :--- | :--- | :--- |
| **สถาปัตยกรรม (Architecture)** | Embedded / Serverless | Client-Server | Client-Server |
| **การติดตั้ง (Configuration)** | Zero Configuration (ไฟล์เดียว) | ต้องตั้งค่า Daemon, Port, Users | ต้องตั้งค่า Daemon, Port, Users |
| **การรองรับ Concurrency** | อ่านพร้อมกันได้ดี / **จำกัดการเขียนคิว** | สูงมาก (Row-level Locking) | สูงมาก (MVCC Concurrency) |
| **พื้นที่จัดเก็บ (Storage)** | ไฟล์เดี่ยวบน Disk (สูงสุด 140 TB) | หลายไฟล์ตามตารางและอินเดกซ์ | หลายไฟล์ตามโครงสร้างเซิร์ฟเวอร์ |
| **กรณีใช้งานที่เหมาะสม (Use Cases)** | IoT, Mobile Apps, Prototypes, Medium Sites | Web Applications, E-Commerce | Enterprise, Complex Data/GIS |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 คุณลักษณะเด่นและข้อจำกัดของ SQLite
* **Serverless & Zero Configuration:** ไม่ต้องติดตั้งหรือรันเซิร์ฟเวอร์แยก เพียงสร้างหรือเปิดไฟล์ก็เริ่มใช้งานได้ทันที
* **Single Cross-Platform File:** เก็บข้อมูลทั้งหมด (Tables, Indexes, Triggers) ในไฟล์ดิสก์เดี่ยวที่ย้ายข้ามระบบปฏิบัติการได้สะดวก
* **Full ACID Compliance:** รองรับธุรกรรมที่การันตีความถูกต้องครบถ้วน (Atomic, Consistent, Isolated, Durable)
* **In-Memory Database (`:memory:`):** ความสามารถในการสร้างฐานข้อมูลชั่วคราวบน RAM เพื่อการทดสอบความเร็วสูง
* **ข้อจำกัด (Limitations):**
  * ไม่เหมาะกับเว็บที่มีทราฟฟิกการเขียนข้อมูล (Write Volume) พร้อมกันมากๆ
  * การแก้ไขโครงสร้าง DDL บางประเภท (เช่น ลบคอลัมน์หรือเปลี่ยนชื่อคอลัมน์ในรุ่นเก่า) ทำได้จำกัด

---

### 2.2 โครงสร้าง EJS Partial Templates
* **Partials:** เทคนิคการแยกโค้ด HTML ส่วนย่อยที่ใช้งานซ้ำในหลายๆ หน้าออกเป็นไฟล์แม่แบบย่อย
* **ไวยากรณ์การดึง Partials:**
  `<%- include('partials/header') %>`
  *(ต้องใช้แท็ก `<%-` แบบ Unescaped Output เพื่อให้เบราว์เซอร์ตีความโครงสร้างโค้ด HTML ดิบ)*

---

### 2.3 คำสั่งตั้งค่าสภาพแวดล้อม (Environment & Setup Commands)

```bash
# 1. ติดตั้ง Express, SQLite3 Driver, และ EJS
npm install express sqlite3 ejs

# 2. ติดตั้ง nodemon สำหรับสภาพแวดล้อมการพัฒนา
npm install -g nodemon
```

---

### 2.4 โค้ดตัวอย่างการใช้งานจริง (Implementation Code)

#### 1. การจัดการฐานข้อมูล SQLite และ CRUD Operations (`db.js` & `app.js`)

```javascript
// db.js - โมดูลสร้างและเชื่อมต่อ SQLite Database
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// กำหนดที่อยู่ไฟล์ฐานข้อมูล (หรือใช้ ':memory:' สำหรับ In-memory DB)
const dbPath = path.join(__dirname, 'database.db');

// เปิดการเชื่อมต่อแบบ READWRITE และ CREATE ไฟล์ให้อัตโนมัติหากยังไม่มี
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database successfully.');
    }
});

// สร้างตารางข้อมูลตั้งต้น (DDL)
db.run(`
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;
```

```javascript
// app.js - แอปพลิเคชัน Express ร่วมกับ SQLite3 และ EJS
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --------------------------------------------------
// READ ALL (DQL): db.all() คืนค่าทุกแถวในรูปแบบ Array
// --------------------------------------------------
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM articles ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Database Read Error');
        }
        res.render('index', { articles: rows, pageTitle: 'หน้าบทความทั้งหมด' });
    });
});

// --------------------------------------------------
// READ ONE (DQL): db.get() คืนค่าแถวแรกที่พบเพียง Object เดียว
// --------------------------------------------------
app.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM articles WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err || !row) {
            return res.status(404).send('ไม่พบบทความที่ต้องการ');
        }
        res.render('article_detail', { article: row, pageTitle: row.title });
    });
});

// --------------------------------------------------
// CREATE (DML): db.run() ใช้สำหรับ INSERT / UPDATE / DELETE
// --------------------------------------------------
app.post('/articles/add', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO articles (title, content) VALUES (?, ?)';
    
    // ใน db.run callback สามารถเรียกใช้ this.lastID เพื่อดู ID ล่าสุดที่สร้างได้
    db.run(sql, [title, content], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Cannot insert article');
        }
        console.log(`Inserted row with ID: ${this.lastID}`);
        res.redirect('/');
    });
});

// --------------------------------------------------
// DELETE (DML): db.run() พร้อมการตรวจสอบจำนวนแถวที่เปลี่ยนด้วย this.changes
// --------------------------------------------------
app.post('/articles/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM articles WHERE id = ?';
    
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).send('Delete Error');
        }
        console.log(`Deleted rows count: ${this.changes}`);
        res.redirect('/');
    });
});

app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
```

#### 2. การสร้างแม่แบบ EJS ร่วมกับ Partial Templates

```html
<!-- views/partials/header.ejs -->
<head>
    <meta charset="UTF-8">
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<nav>
    <a href="/">หน้าหลัก</a> | 
    <a href="/about">เกี่ยวกับเรา</a>
</nav>
<hr>
```

```html
<!-- views/partials/footer.ejs -->
<hr>
<footer>
    <p>&copy; 2026 Web Programming Course - All Rights Reserved.</p>
</footer>
```

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="th">
<!-- ดึง Partial Header -->
<%- include('partials/header') %>

<body>
    <h1><%= pageTitle %></h1>

    <!-- ฟอร์มเพิ่มบทความ -->
    <form action="/articles/add" method="POST">
        <input type="text" name="title" placeholder="หัวข้อบทความ" required><br><br>
        <textarea name="content" placeholder="เนื้อหาบทความ" rows="4" required></textarea><br><br>
        <button type="submit">บันทึกบทความ</button>
    </form>

    <h2>รายการบทความ</h2>
    <% articles.forEach(article => { %>
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
            <h3><a href="/articles/<%= article.id %>"><%= article.title %></a></h3>
            <p><%= article.content %></p>
            <small>สร้างเมื่อ: <%= article.created_at %></small>
            <form action="/articles/delete/<%= article.id %>" method="POST" style="margin-top:5px;">
                <button type="submit">ลบบทความ</button>
            </form>
        </div>
    <% }); %>

<!-- ดึง Partial Footer -->
<%- include('partials/footer') %>
</body>
</html>
```

---

### 2.5 การวิเคราะห์โจทย์ตัวอย่าง (Assignment Case Analysis)

**โจทย์:** จงเปรียบเทียบความแตกต่างในการใช้งานเมธอด `db.run()`, `db.get()`, และ `db.all()` ของไดรเวอร์ `sqlite3` ใน Node.js

**การวิเคราะห์และการเลือกใช้งาน (Analysis & Best Practices):**
* **`db.run(sql, params, callback)`:** ใช้กับคำสั่งที่ไม่ต้องการคืนค่าชุดข้อมูล เช่น `CREATE TABLE`, `INSERT`, `UPDATE`, `DELETE` โดยภายใน Callback จะสามารถอ่านค่า `this.lastID` (ID แถวล่าสุด) และ `this.changes` (จำนวนแถวที่ได้รับผลกระทบ) ได้
* **`db.get(sql, params, callback)`:** ใช้กับคำสั่ง `SELECT` ที่คาดหวังผลลัพธ์เพียง **1 แถว** (เช่น ค้นหาด้วย Primary Key `WHERE id = ?`) โดยผลลัพธ์จะถูกส่งมาเป็น **JavaScript Object เดียว**
* **`db.all(sql, params, callback)`:** ใช้กับคำสั่ง `SELECT` ที่ต้องการดึงผลลัพธ์ **ทุกแถว** ที่ตรงตามเงื่อนไข โดยผลลัพธ์จะถูกส่งมาเป็น **Array of Objects**

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ
* [ ] **SQLite Methods Cheat Sheet:**
  * `db.run()` $\rightarrow$ สำหรับ DDL/DML (`INSERT`, `UPDATE`, `DELETE`), อ่าน `this.lastID` / `this.changes`
  * `db.get()` $\rightarrow$ ดึงแถวเดียวคืนค่าเป็น **Object**
  * `db.all()` $\rightarrow$ ดึงหลายแถวคืนค่าเป็น **Array of Objects**
* [ ] **SQLite Modes:** `OPEN_READONLY`, `OPEN_READWRITE`, `OPEN_CREATE`
* [ ] **In-Memory Database:** ใช้ `:memory:` เป็นชื่อไฟล์เมื่อต้องการสร้าง DB ชั่วคราวบน RAM
* [ ] **EJS Partials Include Syntax:** ต้องใช้ `<%- include('path/to/file') %>` (**ห้ามใช้ `<%=`** เพราะจะทำให้ HTML Tags ถูก Escape กลายเป็นข้อความธรรมดา)

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Web Programming - Unit 08 MySQL Database Integration & EJS Template Engine]] (การเปรียบเทียบ SQLite กับ MySQL และไวยากรณ์ EJS)
  * [[Web Programming - Unit 07 Back-end Web Development with Node.JS & Express.JS]] (สถาปัตยกรรม Express.js)
  * [[Database Normalization Summary]] (การออกแบบโครงสร้างตารางและคีย์สำหรับ RDBMS)
  * [[Data & AI Engineer Skill Matrix]] (ทักษะด้าน Embedded Databases และ Local Data Persistence)
