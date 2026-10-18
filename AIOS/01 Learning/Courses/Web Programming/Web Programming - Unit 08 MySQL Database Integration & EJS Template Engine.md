# Web Programming - Unit 08: MySQL Database Integration & EJS Template Engine

## Part 1: Macro Architecture & Technology Overview

ในสถาปัตยกรรมเว็บแอปพลิเคชันแบบ **3-Tier Architecture** การประมวลผลถูกแบ่งออกเป็น 3 ระดับชั้นชัดเจน:
1. **Client Tier (Presentation):** เว็บเบราว์เซอร์แสดงผล HTML/CSS/JS
2. **Middle Tier (Application / Logic):** Node.js & Express.js รับส่งคำขอ ประมวลผล Business Logic และเชื่อมต่อฐานข้อมูล
3. **Database Tier (Data Persistence):** ระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (RDBMS) เช่น MySQL เก็บรักษาข้อมูลถาวร

```mermaid
flowchart LR
    Client["Client Tier<br>(Web Browser)"] ---|HTTP (HTML / JSON)| App["Application Tier<br>(Node.js + Express)"]
    App ---|SQL Queries / Connection Pool| DB[("Database Tier<br>(MySQL RDBMS)")]
```

เมื่อใช้ร่วมกับ **Server-Side Rendering (SSR)** ผ่าน **Template Engine (EJS)** เซิร์ฟเวอร์จะนำข้อมูลจาก MySQL มารวมกับไฟล์ HTML Template แล้วส่งไฟล์ HTML ที่ประกอบสำเร็จแล้วไปแสดงผลที่หน้าจอของ Client

### ตารางเปรียบเทียบประเภทแท็กภาษา EJS (EJS Tag Syntax Cheat Sheet)

| ประเภทแท็ก (Tag Syntax) | ชื่อเรียกว่า (Tag Name) | พฤติกรรมและการใช้งาน (Behavior & Output) | ตัวอย่างการใช้งาน (Example) |
| :--- | :--- | :--- | :--- |
| `<% ... %>` | **Scriptlet Tag** | ประมวลผลคำสั่ง JS (`if`, `for`, การประกาศตัวแปร) **โดยไม่แสดงผลลัพธ์ออกหน้าเว็บ** | `<% if (user) { %>` |
| `<%= ... %>` | **Escaped Output Tag** | แสดงผลลัพธ์ของนิพจน์ โดย **Escapes HTML** (แปลงเป็น HTML Entities) เพื่อป้องกัน **XSS Attack** | `<h3>Hello, <%= name %></h3>` |
| `<%- ... %>` | **Unescaped Output Tag** | แสดงผลลัพธ์ HTML ดิบโดยไม่ Escapes (ใช้สำหรับดึง Partials / Layout) | `<%- include('header') %>` |
| `<%# ... %>` | **Comment Tag** | ข้อความคอมเมนต์ในไฟล์ Template โดยจะไม่ถูกประมวลผลและไม่แสดงใน Source Code | `<%# This is a comment %>` |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 มโนทัศน์ฐานข้อมูลเชิงสัมพันธ์ (RDBMS & SQL Categories)
* **Database Schema:** โครงสร้างหรือพิมพ์เขียวของฐานข้อมูล (ตาราง, คอลัมน์, ประเภทข้อมูล, และข้อจำกัด Constraints)
* **Metadata / Data Dictionary:** ข้อมูลที่ใช้อธิบายข้อมูล (Data about Data) เช่น รายชื่อตาราง นิยามคอลัมน์
* **Primary Key (PK):** คอลัมน์ที่ใช้วิเคราะห์เพื่อระบุแถวข้อมูล (Tuple) อย่างเป็นเอกลักษณ์ ห้ามมีค่าซ้ำหรือเป็น Null
* **Foreign Key (FK):** คอลัมน์ที่อ้างอิงไปยัง Primary Key ของอีกตารางเพื่อสร้างความสัมพันธ์ (Relationship)

#### ประเภทของคำสั่ง SQL (5 Categories of SQL):

> 💡 **Intuition:** นึกถึงร้านค้า — DDL คือการ "สร้างหรือรื้อชั้นวางและป้ายหมวดสินค้า" (โครงสร้าง) ส่วน DML คือการ "หยิบ ใส่ หรือแก้ของบนชั้น" (ค่าในแถว) DQL คือการ "ถามพนักงานว่ามีของอะไรบ้าง" (อ่านอย่างเดียว) DCL คือการ "ออกบัตรพนักงานว่าใครเข้าห้องไหนได้" และ TCL คือการ "กดยืนยันการขาย (COMMIT)" หรือ "ยกเลิกทั้งบิล (ROLLBACK)" — จุดที่ Analogy ไม่ตรง: DDL ในระบบส่วนใหญ่ (เช่น Oracle, MySQL) มัก Auto-commit ทันที จึงย้อนกลับไม่ได้เหมือน DML
> [Source: generated — not verified against original document]

1. **DDL (Data Definition Language):** คำสั่งนิยามโครงสร้างตาราง $\rightarrow$ `CREATE`, `ALTER`, `DROP`
2. **DML (Data Manipulation Language):** คำสั่งจัดการข้อมูลภายในตาราง $\rightarrow$ `INSERT`, `UPDATE`, `DELETE`
3. **DQL (Data Query Language):** คำสั่งเรียกดูข้อมูล $\rightarrow$ `SELECT`
4. **DCL (Data Control Language):** คำสั่งจัดการสิทธิ์ผู้ใช้ $\rightarrow$ `GRANT`, `REVOKE`
5. **TCL (Transaction Control Language):** คำสั่งควบคุมธุรกรรม $\rightarrow$ `COMMIT`, `ROLLBACK`

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "DDL (Data Definition)" → เปลี่ยน "รูปร่าง" ของ Schema เช่น สร้าง ตัด หรือแก้ตาราง
- "DML (Data Manipulation)" → เปลี่ยน "ค่า" ภายในแถวของตาราง
- "DQL (Data Query)" → อ่านอย่างเดียว ไม่เปลี่ยนข้อมูล (บางตำราจัด `SELECT` รวมอยู่ในหมวด DML)
- "TCL (Transaction Control)" → ควบคุมว่าการเปลี่ยนค่าจาก DML จะ "ถาวร" (`COMMIT`) หรือ "ยกเลิก" (`ROLLBACK`)

**ตัวอย่าง:**
- ✅ `UPDATE employees SET salary = 30000 WHERE employee_id = 100;` แล้วสั่ง `ROLLBACK;` ก่อน `COMMIT` (ต้องปิด Autocommit ก่อน เช่น Oracle SQL*Plus ที่ค่าเริ่มต้นไม่ Auto-commit) — ค่าเงินเดือนกลับเป็นค่าเดิม เพราะ DML ย้อนได้ก่อน Commit
- ❌ คิดว่า `DROP TABLE` ย้อนกลับได้เหมือน `UPDATE` — DDL ส่วนใหญ่ Auto-commit ทันที จึงย้อนไม่ได้
- **ต่างกันตรง:** DML เปลี่ยน "ข้อมูลในตาราง" (ย้อนได้จนกว่าจะ COMMIT) / DDL เปลี่ยน "โครงสร้างตาราง" (มักถาวรทันที)

**อย่าสับสน:** `SELECT` (DQL) ไม่ได้เปลี่ยนข้อมูลเลย — การ "เรียกดู" กับการ "แก้ไข" เป็นคนละหมวดกัน แม้ทั้งคู่ใช้ตารางเดียวกัน

**เช็คความเข้าใจ:** จัดหมวดคำสั่งต่อไปนี้: `GRANT SELECT ON employees TO user1;`, `ALTER TABLE employees ADD phone VARCHAR2(20);`, `COMMIT;`
<details><summary>เฉลย</summary>

- `GRANT ...` = DCL (จัดการสิทธิ์)
- `ALTER TABLE ...` = DDL (เปลี่ยนโครงสร้างตาราง)
- `COMMIT;` = TCL (ยืนยันธุรกรรม)
</details>

---

### 2.2 คำสั่งตั้งค่าสภาพแวดล้อม (Environment & Setup Commands)

```bash
# 1. ติดตั้ง Express, MySQL Driver (mysql2), และ EJS Template Engine
npm install express mysql2 ejs

# 2. ติดตั้ง nodemon สำหรับใช้ในการพัฒนา
npm install -g nodemon
```

---

### 2.3 โค้ดตัวอย่างการใช้งานจริง (Implementation Code)

#### 1. การเชื่อมต่อฐานข้อมูล MySQL และการทำ CRUD Operations (Express + `mysql2`)

#### Connection Pool

> 💡 **Intuition:** นึกถึง Connection Pool เหมือน "ร้านอาหารที่มี 10 คนเสิร์ฟ" — แทนที่จะ "จ้างคนเสิร์ฟใหม่" ทุกครั้งที่มีลูกค้า (Request) เข้ามา (ช้า เปลืองทรัพยากร) ร้าน "เตรียมคนเสิร์ฟไว้สูงสุด 10 คน" — ลูกค้าเข้ามาก็ "ยืม" คนเสิร์ฟที่ว่างไปใช้ ใช้เสร็จก็คืนกลับมา ลูกค้าคนต่อไปใช้คนเสิร์ฟคนเดิมได้ (Reuse) — ประหยัดและเร็ว เพราะไม่ต้องสร้าง Connection ใหม่ทุกครั้ง
> [Source: generated — not verified against original document]

```javascript
// db.js - โมดูลการเชื่อมต่อ MySQL Connection Pool
const mysql = require('mysql2');

// สร้าง Connection Pool เพื่อรองรับการทำ Concurrent Queries ได้อย่างมีประสิทธิภาพ
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password123',
    database: 'web_store',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ส่งออกในรูปแบบ Promise-based เพื่อใช้ async/await
module.exports = pool.promise();
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Connection Pool" → กลุ่มการเชื่อมต่อ Database ที่เตรียมไว้ — ใช้ใหม่ (Reuse) แทนสร้างใหม่
- "connectionLimit: 10" → เตรียม Connection ได้สูงสุด 10 ตัว

**ตัวอย่าง:**
```javascript
// ❌ ไม่ใช้ Pool — สร้าง Connection ใหม่ทุกครั้ง (ช้า)
app.get('/users/:id', async (req, res) => {
    const conn = await mysql.createConnection({...}); // mysql2/promise — สร้างใหม่ (overhead)
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    await conn.end(); // ปิด (เสียเวลา)
    res.json(rows);
});

// ✅ ใช้ Pool — ดึง Connection ที่เตรียมไว้ (เร็ว)
app.get('/users/:id', async (req, res) => {
    // pool มี Connection ตัวไหนว่าง ก็เอา แบบนี้ไม่ต้อง createConnection
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    // pool.query() คืน Connection กลับ Pool ให้อัตโนมัติ เพื่อใช้กับ Request ต่อไป
    res.json(rows);
});
```

- **ต่างกันตรง:** ไม่ใช้ Pool = สร้าง/ปิด Connection ใหม่ทุก Request (เสียเวลาและทรัพยากร) ใช้ Pool = Reuse Connection ที่เปิดค้างไว้

**อย่าสับสน:** "Connection" ไม่ใช่ "การส่งคำสั่ง SQL" — คือ "ท่อหรือเส้นทาง" ที่ใช้ส่งคำสั่ง หากไม่ Pool จะสร้าง/ปิดท่อบ่อย = ช้า

**เช็คความเข้าใจ:** ถ้า 1000 Request มาพร้อมกัน และ Pool มี connectionLimit 10 — อะไรเกิดขึ้น?
<details><summary>เฉลย</summary>

1. Query 10 ตัวแรกได้ Connection คนละตัว (ครบ `connectionLimit: 10`) และรันได้ทันที
2. Query ตัวที่ 11 ขึ้นไปต้องรอใน Queue เพราะ `waitForConnections: true` — เมื่อ Query ใดเสร็จและคืน Connection กลับ Pool ตัวถัดไปใน Queue จะได้ใช้
3. `queueLimit: 0` = ไม่จำกัดความยาว Queue จึงไม่มี Request ไหนถูกปฏิเสธ แค่รอนานขึ้น
4. ถ้าตั้ง `waitForConnections: false` Query ที่หา Connection ว่างไม่ได้จะได้ Error ทันทีแทนการรอ
</details>

```javascript
// app.js - แอปพลิเคชันหลัก Express.js ร่วมกับ MySQL และ EJS
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

// ตั้งค่า EJS เป็น View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware อ่านข้อมูล Form และ JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------------------------------------------------
// READ (DQL): ดึงรายการสินค้าทั้งหมดมาแสดงใน EJS Template
// --------------------------------------------------
app.get('/products', async (req, res) => {
    try {
        // ใช้ Parametrized Query ป้องกัน SQL Injection
        const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
        res.render('product_list', { products: rows, pageTitle: 'รายการสินค้าทั้งหมด' });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล');
    }
});

// --------------------------------------------------
// CREATE (DML): บันทึกสินค้าใหม่ลงใน MySQL
// --------------------------------------------------
app.post('/products/add', async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const sql = 'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)';
        await db.query(sql, [name, price, stock]);
        res.redirect('/products'); // เมื่อบันทึกเสร็จให้ Redirect กลับไปหน้าเดิม
    } catch (err) {
        console.error('Insert Error:', err);
        res.status(500).send('ไม่สามารถเพิ่มข้อมูลสินค้าได้');
    }
});

// --------------------------------------------------
// UPDATE (DML): อัปเดตราคาสินค้า
// --------------------------------------------------
app.post('/products/update/:id', async (req, res) => {
    const productId = req.params.id;
    const { price } = req.body;
    try {
        const sql = 'UPDATE products SET price = ? WHERE id = ?';
        await db.query(sql, [price, productId]);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('ไม่สามารถแก้ไขข้อมูลได้');
    }
});

// --------------------------------------------------
// DELETE (DML): ลบรายการสินค้า
// --------------------------------------------------
app.post('/products/delete/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const sql = 'DELETE FROM products WHERE id = ?';
        await db.query(sql, [productId]);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('ไม่สามารถลบข้อมูลสินค้าได้');
    }
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
```

#### SQL Injection & Parameterized Queries

> 💡 **Intuition:** นึกถึง SQL Injection เหมือน "แบบฟอร์มธนาคารที่มีช่องให้กรอกชื่อ" แต่คนร้ายกรอกว่า `สมชาย แล้วโอนเงินทั้งหมดให้ผม` — ถ้าพนักงานอ่านทั้งบรรทัดเป็น "คำสั่ง" ก็จะทำตาม (นี่คือการเชื่อม String เข้ากับ SQL ตรงๆ) — Parameterized Query คือการแยกให้ชัดว่า "ส่วนไหนเป็นคำสั่ง ส่วนไหนเป็นข้อมูล" ข้อความในช่องชื่อจึงถูกมองเป็น "ชื่อแปลกๆ" (ข้อมูล) ไม่ใช่ "คำสั่ง SQL"
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "SQL Injection" → การแทรก SQL Command ผิดกฎเข้าไป โดยใช้ Input ที่ควบคุมได้
- "Parameterized Query / Prepared Statement" → การแยกระหว่าง "โครงสร้าง SQL" กับ "ข้อมูล"

**ตัวอย่าง:**
```javascript
// ❌ SQL Injection — อันตราย
const username = req.body.username; // ผู้ใช้ใส่: admin' OR '1'='1
const sql = "SELECT * FROM users WHERE username = '" + username + "'";
// SQL ที่ส่งไป: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
// '1'='1' เป็น True เสมอ → WHERE เป็นจริงทุกแถว → ดึงข้อมูลผู้ใช้ทั้งหมด

// ✅ Parameterized Query — ปลอดภัย
const username = req.body.username; // ผู้ใช้ใส่: admin' OR '1'='1
const sql = "SELECT * FROM users WHERE username = ?";
db.query(sql, [username]);
// Driver แทน `?` ด้วย username ในฐานะ "ข้อมูล" ไม่ใช่ "โค้ด"
// SQL ที่ส่งไป: SELECT * FROM users WHERE username = 'admin\' OR \'1\'=\'1'
// Escape Quotes → OR '1'='1 กลายเป็นข้อความธรรมดา ไม่เป็น SQL Operator
```

```javascript
// ❌ ไม่มี Parameterization
const price = req.body.price; // "10; DROP TABLE products; --"
const sql = "UPDATE products SET price = " + price + " WHERE id = 1";
// SQL ที่ส่งไป: UPDATE products SET price = 10; DROP TABLE products; --
// ถ้า Driver เปิด multipleStatements จะรัน DROP TABLE → ตาราง products หายทั้งตาราง!
// (mysql2 ปิด multipleStatements เป็นค่า Default แต่ Injection แบบ ' OR '1'='1 ยังทำได้อยู่ดี)

// ✅ มี Parameterization
const sql = "UPDATE products SET price = ? WHERE id = ?";
db.query(sql, [price, 1]);
// `?` ได้รับข้อมูลที่ Escape แล้ว → "10; DROP TABLE ..." เป็นแค่ String ไม่ถูกประมวลผลเป็นคำสั่ง
```

- **ต่างกันตรง:** บวก String = SQL กับ User Input ผสมเป็นข้อความเดียว Parameterized = ส่ง SQL กับ User Input แยกกัน

**อย่าสับสน:** "Parameterized Query" ไม่ได้ "ลบ" User Input — คือ "บอก Driver/Database ว่าส่วนนี้เป็นข้อมูล ไม่ใช่โค้ด" แล้วให้ Driver Escape ให้อัตโนมัติ (หรือส่งแยกแบบ Prepared Statement เมื่อใช้ `execute()`)

**เช็คความเข้าใจ:** ทำไมต้องใช้ `?` (Placeholder) และไม่ได้แค่ทำ `username.replace("'", "\\'")` (เอง)?
<details><summary>เฉลย</summary>

เพราะการ Escape เองพลาดได้ง่าย:
1. `String.replace("'", ...)` ใน JavaScript แทนที่แค่ตัวแรกที่เจอ — Input ที่มี `'` หลายตัว ตัวที่เหลือยังหลุดเข้า SQL
2. ไม่ได้จัดการตัวอักษรพิเศษอื่น เช่น Backslash (`\`) — ผู้โจมตีส่ง `\'` มา ผลลัพธ์กลายเป็น `\\'` ซึ่ง `\\` คือ Backslash ธรรมดา แล้ว `'` ปิด String ได้อีก
3. กฎ Escape ต่างกันตาม Database และ Character Set (เช่น Multi-byte Charset บางชนิด) — เขียนเองให้ครบทุกกรณียาก
4. Placeholder `?` ให้ Driver จัดการตามกฎของ Database นั้นจริงๆ จึงเป็นวิธีมาตรฐานที่ปลอดภัยกว่า
</details>

#### 2. ไฟล์แม่แบบ EJS Template (`views/product_list.ejs`)

#### EJS Templating & Partials

> 💡 **Intuition:** นึกถึง EJS Template เหมือน "จดหมายแบบฟอร์มที่เว้นช่อง [ชื่อ] [วันที่] ไว้ให้เติม" — `<%= name %>` คือ "เติมชื่อลงช่อง" `<% for(...) %>` คือ "วนลูป เพื่อแสดงรายการแต่ละอัน" `<%- include() %>` คือ "เอาจดหมายส่วนอื่น (Header) มารวม" — Server ส่งตัวแปรเข้า Template (`res.render()`) → EJS Render ออกมาเป็น HTML สำเร็จรูปส่งให้ Browser
> [Source: generated — not verified against original document]

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title><%= pageTitle %></title>
</head>
<body>
    <!-- รวมไฟล์ Partial Header -->
    <%- include('partials/header') %>

    <h1><%= pageTitle %></h1>

    <!-- ฟอร์มเพิ่มสินค้าใหม่ -->
    <form action="/products/add" method="POST">
        <input type="text" name="name" placeholder="ชื่อสินค้า" required>
        <input type="number" name="price" placeholder="ราคา" required>
        <input type="number" name="stock" placeholder="จำนวนคงเหลือ" required>
        <button type="submit">เพิ่มสินค้า</button>
    </form>

    <hr>

    <!-- ตารางแสดงรายการสินค้าแบบ Dynamic ด้วย EJS Loop -->
    <table border="1" cellpadding="8">
        <thead>
            <tr>
                <th>ID</th>
                <th>ชื่อสินค้า</th>
                <th>ราคา (บาท)</th>
                <th>คงเหลือ</th>
                <th>จัดการ</th>
            </tr>
        </thead>
        <tbody>
            <% if (products.length === 0) { %>
                <tr><td colspan="5">ไม่มีข้อมูลสินค้าในระบบ</td></tr>
            <% } else { %>
                <% products.forEach(product => { %>
                    <tr>
                        <td><%= product.id %></td>
                        <td><%= product.name %></td>
                        <td><%= product.price %></td>
                        <td><%= product.stock %></td>
                        <td>
                            <form action="/products/delete/<%= product.id %>" method="POST" style="display:inline;">
                                <button type="submit" onclick="return confirm('ยืนยันการลบ?')">ลบ</button>
                            </form>
                        </td>
                    </tr>
                <% }); %>
            <% } %>
        </tbody>
    </table>
</body>
</html>
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "`<%= ... %>`" → Escaped Output — แสดงค่าแต่ Escape HTML (ปลอดภัยจาก XSS)
- "`<% ... %>`" → Scriptlet — ประมวลผล JS (if/for) ไม่แสดงผล
- "`<%- ... %>`" → Unescaped Output — แสดง HTML ดิบ (เช่น include, partials)

**ตัวอย่าง:**
```html
<!-- ✅ ใช้ <%= %> — ปลอดภัย XSS -->
<h1><%= userName %></h1>
<!-- ถ้า userName = "<script>alert('hack')</script>" → แสดง "<script>alert('hack')</script>" เป็นข้อความ ไม่รัน -->

<!-- ❌ ใช้ <%- %> — เสี่ยง XSS -->
<h1><%- userName %></h1>
<!-- ถ้า userName = "<script>alert('hack')</script>" → Browser ได้ Tag script จริงและรัน → alert เด้งขึ้น (XSS) -->

<!-- ✅ Loop ด้วย Scriptlet -->
<% products.forEach(p => { %>
    <tr>
        <td><%= p.name %></td>
        <td><%= p.price %></td>
    </tr>
<% }); %>

<!-- ✅ Include Partial (Unescaped) -->
<%- include('partials/header') %>
<!-- เพราะ Partial เป็น HTML ที่เตรียมไว้แล้ว ต้อง Unescaped -->
```

- **ต่างกันตรง:** `<%= %>` Escapes (ปลอดภัย) `<%- %>` ไม่ Escape (แสดง HTML ดิบ)

**อย่าสับสน:** "`<%- include()`" อยู่ใน Unescaped Tag — ไม่ใช่ว่า include() "เสี่ยง" หรือ "ปลอดภัย" — Partial ควร "เขียนเอง" ไม่ใช่ "จาก User Input" เพราะ Partial คือโค้ด HTML ที่เราเขียน ไม่ใช่ข้อมูล

**เช็คความเข้าใจ:** ถ้า `userName` มาจาก URL Parameter `?userName=<img src=x onerror="alert('xss')">` — จะต่างกันไหม ระหว่าง `<%= userName %>` กับ `<%- userName %>`?
<details><summary>เฉลย</summary>

แตกต่างมาก:
- `<%= userName %>` → EJS แปลง `<` `>` `"` `'` เป็น HTML Entity (`&lt;img src=x onerror=&#34;alert(&#39;xss&#39;)&#34;&gt;`) → Browser แสดงเป็นข้อความ ไม่สร้าง Tag `<img>` ไม่รัน JavaScript
- `<%- userName %>` → ส่ง `<img src=x onerror="alert('xss')">` ออกไปตรงๆ (Unescaped) → Browser สร้าง Tag `<img>` → โหลดรูป `x` ไม่สำเร็จ → รัน `onerror` → popup ปรากฏ

ดังนั้น **GOLDEN RULE: ใช้ `<%= %>` เสมอ สำหรับข้อมูลจาก User/Database หากต้องแสดง HTML ดิบให้ใช้ `<%- %>` แต่ต้องแน่ใจว่ามาจาก Source ที่เชื่อถือได้เท่านั้น**
</details>


---

### 2.4 การวิเคราะห์โจทย์ตัวอย่าง (Assignment Case Analysis)

**โจทย์:** จงวิเคราะห์ว่าโค้ดบรรทัดใดเสี่ยงต่อภัยคุกคาม **SQL Injection** และเขียนแก้ไขให้อยู่ในรูปแบบที่ปลอดภัย

```javascript
// โค้ดที่อันตราย (Vulnerable Code)
const userInput = req.body.username;
const sql = "SELECT * FROM users WHERE username = '" + userInput + "'";
db.query(sql);
```

**การวิเคราะห์และการแก้ไข (Analysis & Remediation):**
* **สาเหตุ:** การนำ String ของ User Input มาเชื่อมต่อ (`+`) ใน SQL Command โดยตรง เปิดช่องทางให้ผู้ไม่หวังดีส่งคำสั่งเช่น `' OR '1'='1` เข้ามาเพื่อบายพาสการตรวจสอบ
* **การแก้ไข:** ใช้ **Parametrized Query / Prepared Statements** โดยแทนที่ตัวแปรด้วยเครื่องหมายปรัศนี `?` เพื่อให้ MySQL Driver ทำการ Escaping ข้อมูลโดยอัตโนมัติ

```javascript
// โค้ดที่ปลอดภัย (Safe Code)
const userInput = req.body.username;
const sql = "SELECT * FROM users WHERE username = ?";
db.query(sql, [userInput]);
```

#### 💡 เสริม: `<%=` vs `<%-` (Escaped vs Unescaped Output)

> 💡 **Intuition:** นึกถึง `<%=` เหมือนการส่งจดหมายแบบ "พิมพ์ข้อความธรรมดา" — ถ้าผู้ใช้พิมพ์ `<script>` มาในชื่อ Browser จะแสดงเป็นตัวอักษรเฉยๆ ไม่ทำงาน ส่วน `<%-` เหมือน "ยัดของจริงเข้าไปในกล่อง" ที่ Browser จะตีความเป็น HTML ทันที — จุดที่ Analogy ไม่ตรง: `<%-` ไม่ได้แปลว่า "อันตรายเสมอ" เพราะใช้ได้ปลอดภัยกับ HTML ที่เราเขียนและควบคุมเอง เช่น Partial ของ Header
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Escapes HTML" → แปลงอักขระพิเศษ เช่น `<` เป็น `&lt;` และ `>` เป็น `&gt;` ให้ Browser แสดงเป็นตัวอักษรแทนการตีความเป็น Tag
- "Unescaped" → ส่งค่าตามที่ได้รับโดยไม่แปลง ทำให้ Browser ตีความเป็น HTML จริง

**ตัวอย่าง:**
```html
<!-- ✅ ข้อมูลมาจากผู้ใช้ ใช้ <%= -->
<p><%= comment %></p>
<!-- comment = "<b>Hi</b>" → แสดงข้อความ <b>Hi</b> ตรงๆ ไม่ทำให้หนา -->

<!-- ✅ Partial ที่เราเขียนเอง ใช้ <%- -->
<%- include('partials/header') %>
```
- ✅ `<p><%= comment %></p>` เมื่อ `comment` = `"<b>Hi</b>"` — Browser แสดงข้อความ `<b>Hi</b>` ตามตัวอักษร ปลอดภัยจาก XSS
- ❌ `<p><%- comment %></p>` เมื่อ `comment` มาจากผู้ใช้เป็น `<script>...</script>` — Script ถูกรันบนหน้าเว็บ (XSS)
- **ต่างกันตรง:** `<%=` ให้ผลเป็น "ข้อความ" / `<%-` ให้ผลเป็น "HTML จริง" จึงใช้ `<%-` เฉพาะกับ HTML ที่เราควบคุม

**อย่าสับสน:** `<%-` ไม่ได้หมายถึง "ลบ" หรือ "คอมเมนต์" — คอมเมนต์ของ EJS คือ `<%#` ส่วน `<%-` หมายถึง "Unescaped" (แสดงค่าดิบ)

**เช็คความเข้าใจ:** ค่า `title` มาจากฟอร์มที่ผู้ใช้กรอกเอง ควรใช้ `<%=` หรือ `<%-` ในหัวข้อหน้าเว็บ และเพราะอะไร?
<details><summary>เฉลย</summary>

ใช้ `<%=` เพราะข้อมูลมาจากผู้ใช้ ถ้าใช้ `<%-` ข้อความที่มี `<script>` จะถูกแทรกเป็น HTML แล้วรันบนหน้าเว็บ (XSS) การใช้ `<%=` ทำให้ข้อความถูก Escape และแสดงเป็นตัวอักษร
</details>

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ
* [ ] **5 SQL Categories:**
  * DDL = `CREATE`, `ALTER`, `DROP`
  * DML = `INSERT`, `UPDATE`, `DELETE`
  * DQL = `SELECT`
  * DCL = `GRANT`, `REVOKE`
  * TCL = `COMMIT`, `ROLLBACK`
* [ ] **EJS Tag Rules:**
  * `<% %>` = วนลูป/เช็กเงื่อนไข (ไม่มี Output ออกหน้าจอ)
  * `<%= %>` = พิมพ์ค่าออกหน้าจอ + **Escapes HTML (ป้องกัน XSS)**
  * `<%- %>` = พิมพ์ค่า HTML ดิบออกหน้าจอ / ดึง `include()`
* [ ] **SQL Injection Prevention:** ใช้ `?` (Placeholders) ใน `db.query(sql, [params])` เสมอ ห้ามบวก String
* [ ] **View Engine Setup in Express:**
  * `app.set('view engine', 'ejs');`
  * Render แม่แบบด้วย `res.render('view_name', { key: value });`

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Database Normalization Summary]] (สรุปหลักการออกแบบตารางและการทำ Normalization 1NF, 2NF, 3NF สำหรับ RDBMS)
  * [[Web Programming - Unit 07 Back-end Web Development with Node.JS & Express.JS]] (การสร้างระบบ Express Server และจัดการ Middleware)
  * [[Web Programming - Unit 06 Web Data with JSON and Local Storage]] (การสื่อสารข้อมูลแบบ JSON จากฐานข้อมูลไปยัง Client)
  * [[Data & AI Engineer Skill Matrix]] (ทักษะด้าน RDBMS, Relational Data Modeling, และ SQL Queries)
