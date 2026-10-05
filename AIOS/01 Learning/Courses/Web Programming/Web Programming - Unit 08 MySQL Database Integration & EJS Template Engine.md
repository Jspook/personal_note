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
1. **DDL (Data Definition Language):** คำสั่งนิยามโครงสร้างตาราง $\rightarrow$ `CREATE`, `ALTER`, `DROP`
2. **DML (Data Manipulation Language):** คำสั่งจัดการข้อมูลภายในตาราง $\rightarrow$ `INSERT`, `UPDATE`, `DELETE`
3. **DQL (Data Query Language):** คำสั่งเรียกดูข้อมูล $\rightarrow$ `SELECT`
4. **DCL (Data Control Language):** คำสั่งจัดการสิทธิ์ผู้ใช้ $\rightarrow$ `GRANT`, `REVOKE`
5. **TCL (Transaction Control Language):** คำสั่งควบคุมธุรกรรม $\rightarrow$ `COMMIT`, `ROLLBACK`

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

#### 2. ไฟล์แม่แบบ EJS Template (`views/product_list.ejs`)

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
