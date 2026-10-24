# ติวสอบ Web Programming — ข้อเขียน 9 ข้อ + ปฏิบัติ 2 ข้อ

> **ข้อสอบทั้งหมดวนอยู่รอบเรื่องเดียว:** Browser ส่ง request → Server (Node.js/Express) ประมวลผล → ดึงข้อมูลจาก DB หรือ API → ใส่ลง Template (EJS) → ส่ง HTML กลับ

---

## I. ข้อเขียน

### 1. Web Service Architecture (เติม 6 ช่อง)

ยังไม่เห็นรูปจริงในข้อสอบ ช่องอาจเรียงต่างไปบ้าง แต่ส่วนประกอบมักเป็นชุดนี้

1. **Client / Web Browser** — ฝั่งผู้ใช้ เป็นคนเริ่มขอข้อมูล
2. **HTTP Request** — คำขอที่ส่งไป (GET, POST, PUT, DELETE + URL)
3. **Web Server** — รับ request เช่น Express, Apache, Nginx
4. **Server-Side Script / Application** — ประมวลผล logic เช่น Node.js, PHP
5. **Database** — เก็บและคืนข้อมูล เช่น SQLite, MySQL
6. **HTTP Response** — ผลลัพธ์ที่ส่งกลับ (HTML / JSON / XML) พร้อม status code เช่น 200, 404

### 2. คุณลักษณะของ Server-Side Script (4–5 ข้อ)

- ทำงาน (execute) บนเครื่องเซิร์ฟเวอร์ ไม่ใช่บน browser
- ผู้ใช้มองไม่เห็นซอร์สโค้ด เห็นแค่ผลลัพธ์ที่เป็น HTML จึงปลอดภัยกว่า
- เชื่อมต่อฐานข้อมูลและอ่าน/เขียนไฟล์บนเซิร์ฟเวอร์ได้
- สร้างหน้าเว็บแบบ dynamic เปลี่ยนเนื้อหาตาม request หรือผู้ใช้แต่ละคน
- ไม่ขึ้นกับ browser ของผู้ใช้ เพราะส่งกลับเป็น HTML มาตรฐาน
- ตัวอย่างภาษา: Node.js, PHP, Python, ASP.NET, Java (JSP)

### 3. เกี่ยวกับ Database

- **Database** คือที่เก็บข้อมูลอย่างเป็นระบบ ค้นหาและจัดการได้ง่าย
- **DBMS** คือซอฟต์แวร์จัดการฐานข้อมูล เช่น SQLite, MySQL, PostgreSQL
- **Table / Row (Record) / Column (Field)** — ตาราง แถว คอลัมน์
- **Primary Key** คีย์ที่ไม่ซ้ำ ใช้ระบุแต่ละแถว · **Foreign Key** คีย์ที่อ้างถึงตารางอื่น
- **SQL** แบ่งเป็น DDL (โครงสร้าง), DML (แก้ข้อมูล), DQL (ค้นข้อมูล), DCL (สิทธิ์ เช่น GRANT/REVOKE)

### 4. DQL (Data Query Language)

ใช้ "ดึง/ค้น" ข้อมูลออกมาดู ไม่เปลี่ยนข้อมูลในตาราง คำสั่งหลักคือ `SELECT`

```sql
SELECT * FROM products;                      -- ทุกคอลัมน์ ทุกแถว
SELECT name, price FROM products
WHERE price > 100                            -- กรองเงื่อนไข
ORDER BY price DESC;                         -- เรียงจากมากไปน้อย
SELECT SUM(price * sold) AS total FROM products;   -- ฟังก์ชันรวม
```

### 5. DML (Data Manipulation Language)

ใช้ "เพิ่ม/แก้/ลบ" ข้อมูลในตาราง โครงสร้างตารางไม่เปลี่ยน

```sql
INSERT INTO products (name, price, sold) VALUES ('ปากกา', 15, 40);
UPDATE products SET price = 20, sold = 50 WHERE id = 1;
DELETE FROM products WHERE id = 3;
```

> ลืม `WHERE` ใน UPDATE/DELETE = แก้หรือลบทุกแถว

### 6. DDL (Data Definition Language)

ใช้ "สร้าง/แก้/ลบ โครงสร้าง" ของฐานข้อมูล เช่น ตาราง คอลัมน์

```sql
CREATE TABLE products (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  price REAL,
  sold  INTEGER
);
ALTER TABLE products ADD COLUMN category TEXT;
DROP TABLE products;
```

### 7. Cookie vs Session (อย่างละ 3 ข้อ)

| | Cookie | Session |
|---|---|---|
| เก็บที่ไหน | ฝั่ง Client (browser) | ฝั่ง Server (client ถือแค่ session ID) |
| ความปลอดภัย | ต่ำกว่า ผู้ใช้เปิดดู/แก้ไขได้ | สูงกว่า ผู้ใช้เข้าถึงข้อมูลจริงไม่ได้ |
| ขนาด/อายุ | จำกัดราว 4KB · ตั้งวันหมดอายุให้อยู่ยาวได้ | เก็บได้มากกว่า · หมดเมื่อปิด browser หรือ timeout |

### 8. Template Engine

เครื่องมือที่รวม "ข้อมูลจาก server" เข้ากับ "แม่แบบ HTML" แล้วสร้างเป็นหน้าเว็บสำเร็จรูปส่งให้ผู้ใช้ ทำให้ไม่ต้องต่อ string HTML เองในโค้ด และแยกส่วนแสดงผลออกจาก logic (ตัวอย่าง: EJS, Pug, Handlebars)

```
<%= name %>     แสดงค่า (escape HTML ให้)
<%- html %>     แสดงค่าแบบดิบ ไม่ escape
<% if(x){ %>    เขียน logic เช่น if / for
```

ใน Express ใช้ `app.set('view engine','ejs')` แล้ว `res.render('index', { rows })`

### 9. คุณลักษณะของ SQLite (4–5 ข้อ)

- **Serverless** ไม่ต้องติดตั้งหรือรันเซิร์ฟเวอร์ฐานข้อมูลแยก
- **ทั้งฐานข้อมูลอยู่ในไฟล์เดียว** (เช่น saleamount.db) ย้าย/คัดลอกง่าย
- **Zero-configuration** ไม่ต้องตั้งค่าใดๆ ก่อนใช้
- **เล็กและเบา** เหมาะกับแอปขนาดเล็ก มือถือ อุปกรณ์ฝังตัว
- รองรับ **SQL มาตรฐาน และ ACID transaction** · ข้ามแพลตฟอร์ม · ใช้ฟรี (public domain)
- ข้อจำกัด: เขียนพร้อมกันหลายคนได้ไม่ดี ไม่เหมาะกับระบบผู้ใช้จำนวนมาก

---

## II. ปฏิบัติข้อ 1: ตารางสินค้าจาก saleamount.db

### 0. เช็กชื่อตารางก่อน

โค้ดด้านล่างสมมติว่าเป็นตาราง `products` คอลัมน์ `id, name, price, sold` ตอนสอบให้รันคำสั่งนี้ก่อนแล้วแก้ชื่อให้ตรง

```js
db.all("SELECT name FROM sqlite_master WHERE type='table'", (e, r) => console.log(r));
db.all("PRAGMA table_info(products)", (e, r) => console.log(r));
```

เปิด `package.json` ดูด้วยว่าใน dependencies มี `express`, `ejs`, `sqlite3` ไหม

### 1. app.js

```js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('saleamount.db');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));   // อ่านค่าจาก form

// หน้าตาราง
app.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.send(err.message);
    let grand = 0;
    rows.forEach(r => { r.total = r.price * r.sold; grand += r.total; });
    rows.forEach(r => { r.ratio = grand ? (r.total / grand) * 100 : 0; });
    res.render('index', { rows, grand });
  });
});

// หน้าแก้ไข (กดที่ name แล้วมาที่นี่)
app.get('/edit/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    res.render('edit', { p: row });
  });
});

// กด "ยืนยัน"
app.post('/edit/:id', (req, res) => {
  const { price, sold } = req.body;
  db.run('UPDATE products SET price = ?, sold = ? WHERE id = ?',
    [price, sold, req.params.id], () => res.redirect('/'));
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

### 2. views/index.ejs

```html
<table border="1">
  <tr><th>id</th><th>name</th><th>price</th><th>item sold</th><th>total</th><th>Ratio</th></tr>
  <% rows.forEach(r => { %>
  <tr>
    <td><%= r.id %></td>
    <td><a href="/edit/<%= r.id %>"><%= r.name %></a></td>
    <td><%= r.price %></td>
    <td><%= r.sold %></td>
    <td><%= r.total %></td>
    <td>
      <div style="width:200px;background:#ddd">
        <div style="width:<%= r.ratio %>%;background:#4caf50;color:#fff">
          <%= r.ratio.toFixed(2) %>%
        </div>
      </div>
    </td>
  </tr>
  <% }) %>
  <tr><td colspan="4">ราคารวมทั้งหมด</td><td colspan="2"><%= grand %></td></tr>
</table>
```

### 3. views/edit.ejs

```html
<h2>แก้ไข <%= p.name %></h2>
<form method="POST" action="/edit/<%= p.id %>">
  ราคา: <input name="price" type="number" value="<%= p.price %>">
  จำนวนที่ขาย: <input name="sold" type="number" value="<%= p.sold %>">
  <button type="submit">ยืนยัน</button>
</form>
```

> ชื่อ `name="..."` ใน input ต้องตรงกับ `req.body.price` / `req.body.sold`

---

## III. ปฏิบัติข้อ 2: ร้านอาหาร + ตะกร้า + รายการสั่งซื้อ

### 1. แนวคิด

เก็บ `cart` และ `orders` เป็น array ในหน่วยความจำ server ไม่ต้องใช้ DB เพราะโจทย์ให้ข้อมูลอาหารมาจาก API

- เพิ่มลงตะกร้า → push เข้า `cart`
- ยืนยันการสั่งซื้อ → ย้าย `cart` ไปต่อท้าย `orders` แล้วล้าง cart → กลับหน้าแรก
- ชำระเงิน → ล้าง `orders` → กลับหน้าแรก
- เปิด API ดูก่อนว่าฟิลด์ชื่ออะไร (โค้ดสมมติว่ามี `id, name, price, img`)

### 2. app.js

```js
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const API = 'https://my-json-server.typicode.com/bemalykuma/mockDB/foods';
let cart = [];
let orders = [];

app.get('/', async (req, res) => {
  const foods = await (await fetch(API)).json();
  res.render('foods', { foods });
});

app.post('/add/:id', async (req, res) => {
  const food = await (await fetch(API + '/' + req.params.id)).json();
  cart.push(food);
  res.redirect('/cart');
});

app.get('/cart', (req, res) => res.render('cart', { cart }));

app.post('/confirm', (req, res) => {
  orders = orders.concat(cart);
  cart = [];
  res.redirect('/');
});

app.get('/orders', (req, res) => {
  const sum = orders.reduce((s, f) => s + f.price, 0);
  res.render('orders', { orders, sum });
});

app.post('/pay', (req, res) => {
  orders = [];
  res.redirect('/');
});

app.listen(3000);
```

> ใช้ `fetch` ที่มีใน Node 18+ ถ้า package.json มี axios ใช้ axios แทนได้

### 3. views (nav + 3 หน้า)

```html
<!-- views/nav.ejs -->
<nav>
  <a href="/">รายการอาหาร</a> |
  <a href="/cart">ตะกร้าสินค้า</a> |
  <a href="/orders">รายการสั่งซื้อทั้งหมด</a>
</nav>

<!-- views/foods.ejs -->
<%- include('nav') %>
<% foods.forEach(f => { %>
  <div>
    <img src="<%= f.img %>" width="150">
    <h3><%= f.name %></h3> <p><%= f.price %> บาท</p>
    <form method="POST" action="/add/<%= f.id %>">
      <button>เพิ่มสินค้าลงตะกร้า</button>
    </form>
  </div>
<% }) %>

<!-- views/cart.ejs -->
<%- include('nav') %>
<% cart.forEach(f => { %> <p><%= f.name %> - <%= f.price %></p> <% }) %>
<form method="POST" action="/confirm"><button>ยืนยันการสั่งซื้อ</button></form>

<!-- views/orders.ejs -->
<%- include('nav') %>
<% orders.forEach(f => { %> <p><%= f.name %> - <%= f.price %></p> <% }) %>
<p>รวม <%= sum %> บาท</p>
<form method="POST" action="/pay"><button>ชำระเงิน</button></form>
```

### 4. จุดที่พลาดบ่อย

- ไฟล์ .ejs ต้องอยู่ในโฟลเดอร์ชื่อ `views` เท่านั้น
- ปุ่มที่เปลี่ยนข้อมูลใช้ `method="POST"` ให้ตรงกับ `app.post`
- ใช้ `await` ต้องอยู่ในฟังก์ชัน `async`
- รันด้วย `node app.js` แล้วเปิด `localhost:3000`
- ถ้าโจทย์อยากให้ตะกร้าแยกต่อผู้ใช้ ให้ใช้ `express-session` เก็บใน `req.session.cart` แทน array กลาง (ใช้ตอบข้อ 7 ได้ด้วย)


## เกณฑ์ประเมินตัวเอง
- ตอบตรงประเด็นและยกตัวอย่างได้ครบ = เต็ม
- ข้อ 3 ต้องมี **ตัวอย่างคำสั่ง** และอธิบายว่าใช้อย่างไร ไม่ใช่แค่ชื่อเต็ม
- ข้อ 4 ต้องตอบ **ครบจำนวนที่โจทย์กำหนด** (3 + 3)
