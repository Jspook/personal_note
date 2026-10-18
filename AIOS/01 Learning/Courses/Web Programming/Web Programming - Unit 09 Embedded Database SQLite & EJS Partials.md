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

#### SQLite: Embedded vs Client-Server Database

> 💡 **Intuition:** นึกถึง SQLite เหมือน "สมุดบัญชีที่พกติดตัว" (ไม่ต้องไปสำนักงานส่วนกลาง) ส่วน MySQL เหมือน "ธนาคารจริง" — ต้องไปสาขา/เชื่อมต่อผ่าน Network — SQLite ใช้งานบน Laptop ได้ทันทีเพราะ Database ทั้งก้อนเป็นไฟล์เดียว ไม่ต้องมี Server — ข้อจำกัด: ถ้า 100 คนเขียนพร้อมกัน MySQL (InnoDB) ล็อกระดับ Row ทำให้หลายคนเขียนคนละแถวได้พร้อมกัน แต่ SQLite ให้เขียนได้ทีละ 1 Writer ต่อทั้งไฟล์ คนอื่นต้องรอคิว
> [Source: generated — not verified against original document]

* **Serverless & Zero Configuration:** ไม่ต้องติดตั้งหรือรันเซิร์ฟเวอร์แยก เพียงสร้างหรือเปิดไฟล์ก็เริ่มใช้งานได้ทันที
* **Single Cross-Platform File:** เก็บข้อมูลทั้งหมด (Tables, Indexes, Triggers) ในไฟล์ดิสก์เดี่ยวที่ย้ายข้ามระบบปฏิบัติการได้สะดวก
* **Full ACID Compliance:** รองรับธุรกรรมที่การันตีความถูกต้องครบถ้วน (Atomic, Consistent, Isolated, Durable)
* **In-Memory Database (`:memory:`):** ความสามารถในการสร้างฐานข้อมูลชั่วคราวบน RAM เพื่อการทดสอบความเร็วสูง
* **ข้อจำกัด (Limitations):**
  * ไม่เหมาะกับเว็บที่มีทราฟฟิกการเขียนข้อมูล (Write Volume) พร้อมกันมากๆ
  * การแก้ไขโครงสร้าง DDL บางประเภท (เช่น ลบคอลัมน์หรือเปลี่ยนชื่อคอลัมน์ในรุ่นเก่า) ทำได้จำกัด

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Serverless" → ไม่ต้องรัน Server Daemon — Database อยู่ "ในโปรแกรม" ไม่เป็นกระบวนการภายนอก
- "Single File" → ทั้ง Schema, Data, Indexes อยู่ไฟล์ `.db` เดียว

**ตัวอย่าง:**
```javascript
// ✅ SQLite — เปิดได้เลย
const db = new sqlite3.Database('app.db'); // ไม่ต้อง Host/Port/Password
// ถ้ายังไม่มีไฟล์ app.db จะถูกสร้างให้อัตโนมัติ → ใช้งานได้เลย

// ❌ MySQL — ต้องเซิร์ฟเวอร์รัน
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'secret'
    // ถ้า MySQL Daemon หยุดทำงาน → Connection fail
});
```

- **ต่างกันตรง:** SQLite = ไฟล์ + Library ในโปรแกรม MySQL = Server ภายนอก + Network Socket

**อย่าสับสน:** "Embedded" ไม่ได้หมายถึง "ถูกฝังในหน้าเว็บหรือในอุปกรณ์ Embedded System" — หมายถึง "Database Library ถูกโหลด IN-PROCESS ในโปรแกรม" ไม่ใช่ "ติดต่อผ่าน Network"

**เช็คความเข้าใจ:** ถ้าพัฒนา Todo App บน iPad Offline — ทำไม SQLite เหมาะมากกว่า MySQL?
<details><summary>เฉลย</summary>

เพราะ MySQL ต้องมี Server Process แยกให้เชื่อมต่อ (ปกติอยู่บนเครื่องอื่น ถ้าไม่มี Network ก็ใช้ไม่ได้) — SQLite ทำงาน Standalone เพราะ Database อยู่ในตัวโปรแกรมและไฟล์บน Disk (local) ไม่ต้อง Network — iPad Offline ก็ใช้ได้ และสามารถ Sync ข้อมูลไปเซิร์ฟเวอร์ได้ทีหลัง
</details>

---

### 2.2 โครงสร้าง EJS Partial Templates

#### EJS Partials (Code Reuse & Modularity)

> 💡 **Intuition:** นึกถึง EJS Partials เหมือน "บทเพลงที่มีท่อน Chorus ซ้ำหลายครั้ง" — แทนที่จะเขียนเนื้อ Chorus ซ้ำทุกท่อน ให้เขียน "Chorus เดียว" แล้ว "เรียกใช้" ทุกครั้ง เช่นเดียวกับ Header/Footer ของเว็บ — แทนจะเขียน `<header>...<nav>...</nav></header>` ทุกหน้า ให้เก็บไฟล์ `partials/header.ejs` แล้วเรียก `include()` — ได้ประโยชน์: แก้ไข Header เพียงครั้งเดียว → ทุกหน้าเปลี่ยน (DRY Principle)
> [Source: generated — not verified against original document]

* **Partials:** เทคนิคการแยกโค้ด HTML ส่วนย่อยที่ใช้งานซ้ำในหลายๆ หน้าออกเป็นไฟล์แม่แบบย่อย
* **ไวยากรณ์การดึง Partials:**
  `<%- include('partials/header') %>`
  *(ต้องใช้แท็ก `<%-` แบบ Unescaped Output เพื่อให้เบราว์เซอร์ตีความโครงสร้างโค้ด HTML ดิบ)*

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Partial" → หน้า "บางส่วน" (ไม่ใช่ Full HTML) เช่น Header, Footer, Navigation
- "DRY (Don't Repeat Yourself)" → เขียนโค้ด 1 ครั้ง ใช้หลายที่

**ตัวอย่าง:**
```html
<!-- ❌ ไม่ใช้ Partials — ซ้ำโค้ด -->
<!-- views/page1.ejs -->
<header>
    <h1>My Website</h1>
    <nav><a href="/">Home</a></nav>
</header>
<h2>Page 1</h2>

<!-- views/page2.ejs -->
<header>
    <h1>My Website</h1>
    <nav><a href="/">Home</a></nav>
</header>
<h2>Page 2</h2>
<!-- ซ้ำเลย → แก้ไข Header ต้องแก้ 2 ไฟล์ -->

<!-- ✅ ใช้ Partials — DRY -->
<!-- views/partials/header.ejs -->
<header>
    <h1>My Website</h1>
    <nav><a href="/">Home</a></nav>
</header>

<!-- views/page1.ejs -->
<%- include('partials/header') %>
<h2>Page 1</h2>

<!-- views/page2.ejs -->
<%- include('partials/header') %>
<h2>Page 2</h2>
<!-- แก้ไข header.ejs เพียงครั้งเดียว → ทั้ง page1 & page2 เปลี่ยน -->
```

- **ต่างกันตรง:** ซ้ำโค้ด = maintenance หลายตำแหน่ง Partials = แก้ที่เดียว

**อย่าสับสน:** `include()` ไม่ใช่ "การคัดลอก" — คือ "การโหลดและแทรก" Partial ขณะ Render — ถ้า Partial เปลี่ยน ทั้งหน้าที่เรียกจะเปลี่ยน

**เช็คความเข้าใจ:** ทำไมต้องใช้ `<%- include('partials/header') %>` และ **ไม่ได้ใช้** `<%= include('partials/header') %>`?
<details><summary>เฉลย</summary>

เพราะ `<%- %>` คือ Unescaped — โหลด HTML และแสดงดิบ (เบราว์เซอร์ตีความ `<header>` เป็น HTML) ส่วน `<%= %>` คือ Escaped — จะแสดง HTML Source เป็นข้อความ (`&lt;header&gt;`) ที่เบราว์เซอร์ไม่ตีความ แล้วเว็บจะแสดง Code แทน HTML จริง
</details>

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

#### 💡 เสริม: `db.run()` vs `db.get()` vs `db.all()`

> 💡 **Intuition:** นึกถึงการขอของจากคลังสินค้า — `db.run()` คือ "สั่งให้ทำงานแล้วไม่ต้องการของกลับ" (เช่น บันทึกหรือลบ) ได้เพียงใบรายงานผล (`lastID`, `changes`) — `db.get()` คือ "ขอของชิ้นแรกที่ตรงเงื่อนไข" ได้เป็น Object เดียว — `db.all()` คือ "ขอของทุกชิ้นที่ตรงเงื่อนไข" ได้เป็น Array — จุดที่ Analogy ไม่ตรง: ถ้า `db.get()` ไม่พบแถว sqlite3 จะคืน `undefined` ไม่ใช่ Error และ `db.get()` ไม่ได้รับประกันว่าแถวนั้นเป็นแถวเดียวในตาราง มันคืนแถวแรกตามลำดับที่ Query ให้มา
> [Source: generated — not verified against original document]

ทั้งสามเมธอดทำงานแบบ Async ผลลัพธ์จะมาใน Callback เท่านั้น ไม่ได้ `return` ค่ากลับมาให้ตัวแปรโดยตรง

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "db.run" → รันคำสั่งที่ไม่ต้องการแถวผลลัพธ์ (DDL/DML) Callback ได้ `this.lastID` และ `this.changes`
- "db.get" → คืน "แถวแรก" เป็น Object หรือ `undefined` ถ้าไม่พบ
- "db.all" → คืน "ทุกแถว" เป็น Array of Objects ถ้าไม่พบจะได้ `[]`

**ตัวอย่าง:**
```javascript
db.get('SELECT * FROM articles WHERE id = ?', [1], (err, row) => {
  // row = { id: 1, title: '...', ... } หรือ undefined ถ้าไม่มี id = 1
});

db.all('SELECT * FROM articles', [], (err, rows) => {
  // rows = [{...}, {...}] — ไม่มีแถวเลย ได้ []
});
```
- ✅ `db.all(sql, [], cb)` ไม่พบข้อมูล → `rows` เป็น `[]` จึงเช็ค `rows.length === 0` ได้ชัดเจน
- ❌ ใช้ `db.get` กับ Query ที่คืนหลายแถวแล้วคิดว่าได้ครบทั้งหมด — ได้เฉพาะแถวแรก
- ❌ คิดว่า `db.all` ให้ `lastID` หลัง `INSERT` — ค่า `lastID` และ `changes` อ่านได้จาก `db.run` (ดูหัวข้อถัดไป)
- **ต่างกันตรง:** ต้องการ 0-1 แถว → `get` / หลายแถว → `all` / ไม่ต้องการแถวกลับแต่ต้องการผลการแก้ไข → `run`

**อย่าสับสน:** `db.run` ไม่ได้ "คืนค่า" ผ่าน `return` — ผลลัพธ์ทั้งหมดต้องดึงจาก Callback เสมอ

**เช็คความเข้าใจ:** `db.get('SELECT * FROM articles WHERE id = ?', [999], cb)` จะได้ `row` เป็นอะไร และถ้าเขียน `row.title` ต่อทันทีจะเกิดอะไร?
<details><summary>เฉลย</summary>

`row` = `undefined` (ไม่มี Error ตอนไม่พบแถว) ถ้าเขียน `row.title` ต่อทันทีจะเกิด `TypeError` ทำให้โปรแกรมพัง ต้องเช็ค `if (!row)` ก่อนใช้งานและตอบ `404` ถ้าไม่พบ
</details>

#### 💡 เสริม: `this.lastID` / `this.changes` ต้องใช้ `function` ไม่ใช่ Arrow

> 💡 **Intuition:** นึกถึง `this` ใน Callback ของ `db.run()` เหมือน "ป้ายชื่อที่ sqlite3 แปะบนกล่องผลลัพธ์ของคำสั่งนั้น" — ถ้าเขียนเป็น Arrow function มันจะไม่รับป้ายนี้ (Arrow ไม่มี `this` ของตัวเอง และไปใช้ `this` ของ Scope ภายนอกแทน) จึงอ่าน `lastID` ไม่ได้ — จุดที่ Analogy ไม่ตรง: ป้ายนี้มีเฉพาะ Callback ของ `db.run()` ไม่ได้แปะให้ทุก Callback
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "this.lastID" → `id` ของแถวที่เพิ่งถูก `INSERT` (ใช้ได้เมื่อ Primary Key เป็น `INTEGER PRIMARY KEY`)
- "this.changes" → จำนวนแถวที่ถูกกระทบจาก `UPDATE` หรือ `DELETE`
- "Arrow function" → ไม่มี `this` ของตัวเอง จึงใช้ `this` จาก Scope ภายนอก ไม่ใช่ผลของ sqlite3

**ตัวอย่าง:**
```javascript
// ✅ function keyword: sqlite3 ตั้ง this ให้เป็นผลลัพธ์ของคำสั่ง
app.post('/articles', (req, res) => {
  db.run('INSERT INTO articles (title, content) VALUES (?, ?)',
    [req.body.title, req.body.content],
    function (err) {
      if (err) return res.status(500).send('Insert Error');
      res.redirect('/articles/' + this.lastID); // id ของแถวที่เพิ่งเพิ่ม
    });
});
```
```javascript
// ❌ Arrow function: this ไม่ใช่ผลลัพธ์ของ sqlite3
db.run('INSERT INTO articles (title) VALUES (?)', ['x'], (err) => {
  console.log(this.lastID); // ไม่ได้ค่า lastID (ได้ undefined ในกรณีนี้)
});
```
- ✅ `function (err) { this.lastID }` → ได้ `id` ของแถวที่เพิ่งเพิ่ม
- ❌ `(err) => { this.lastID }` → อ่านค่าไม่ได้
- **ต่างกันตรง:** ต้องการ `this` ของ sqlite3 ใช้ `function` / Callback ที่ไม่ต้องใช้ `this` ใช้ Arrow ได้

**อย่าสับสน:** `this.lastID` ไม่ได้เป็นตัวแปร Global — มีอยู่เฉพาะใน `this` ของ Callback นั้นเท่านั้น

**เช็คความเข้าใจ:** หลัง `db.run('UPDATE articles SET title = ? WHERE id = ?', ['ใหม่', 999], function (err) {...})` ซึ่งไม่มี id = 999 อยู่ในตาราง `this.changes` จะเป็นค่าอะไร และควรตอบ Client อย่างไร?
<details><summary>เฉลย</summary>

`this.changes` = `0` เพราะ `WHERE` ไม่ตรงกับแถวใดเลย แต่ไม่ได้เป็น Error — ควรตรวจค่านี้แล้วตอบ `404 Not Found` เมื่อเป็น `0` ไม่ใช่ตอบ `200 OK` ทันที
</details>

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
