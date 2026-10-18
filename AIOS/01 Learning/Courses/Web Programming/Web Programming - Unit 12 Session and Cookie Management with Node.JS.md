# Web Programming - Unit 12: Session and Cookie Management with Node.JS

## Part 1: Macro Architecture & Technology Overview

เนื่องจากโปรโตคอล **HTTP มีธรรมชาติเป็น Stateless Protocol** (เซิร์ฟเวอร์ไม่จดจำการเชื่อมต่อหรือตัวตนของไคลเอ็นต์ระหว่างคำขอ) จึงเกิดกลไก **HTTP State Management Mechanism (RFC 6265)** ผ่านการทำงานร่วมกันระหว่าง **Cookies** และ **Sessions** เพื่อสร้างสถานะการเชื่อมต่อแบบต่อเนื่อง (Stateful Connection) สำหรับระบบลงชื่อเข้าใช้ (Authentication) และตะกร้าสินค้า

```mermaid
sequenceDiagram
    autonumber
    actor Browser as Client Browser
    participant Server as Web Server & Session Store
    
    Browser->>Server: POST /login (username, password)
    Note over Server: ตรวจสอบข้อมูล & สร้าง Session Object (SID = xyz123)
    Server-->>Browser: 200 OK + Set-Cookie: connect.sid=xyz123; HttpOnly
    
    Browser->>Server: GET /dashboard (Cookie: connect.sid=xyz123)
    Note over Server: ค้นหา SID ใน Session Store ➔ พบข้อมูลผู้ใช้
    Server-->>Browser: 200 OK (Render Dashboard HTML พร้อมข้อมูลส่วนตัว)
```

### ตารางเปรียบเทียบสถาปัตยกรรม: Cookies vs Sessions (Master Comparison Matrix)

| คุณสมบัติ (Feature) | Cookies | Sessions |
| :--- | :--- | :--- |
| **สถานที่จัดเก็บ (Location)** | ฝั่งไคลเอ็นต์ (**Client-Side Browser**) | ฝั่งเซิร์ฟเวอร์ (**Server-Side Memory / Database / Redis**) |
| **ขนาดความจุ (Capacity)** | จำกัดเพียง **~4 KB** ต่อคุกกี้ / โดเมน | ไม่จำกัดขนาด (ขึ้นอยู่กับหน่วยความจำของ Server/DB) |
| **ตัวระบุตัวตน (Identifier)** | คู่ Key-Value สตริงข้อความทั่วไป | **Session ID (SID)** สตริงสุ่มความปลอดภัยสูงผูกกับ Cookie |
| **ความปลอดภัย (Security)** | ต่ำกว่า (มีความเสี่ยงโดนแก้ไขหรือ XSS/CSRF หากตั้งค่าไม่ดี) | สูงกว่า (ข้อมูลความลับ สิทธิ์ และบทบาทถูกเก็บรักษาบน Server) |
| **ภาระเซิร์ฟเวอร์ (Server Load)** | ต่ำมาก (ไคลเอ็นต์เป็นผู้เก็บรักษาข้อมูล) | สูงขึ้น (ต้องใช้ RAM/Database ในการค้นหาและจัดเก็บ SID) |
| **กรณีใช้งานที่เหมาะสม (Use Cases)** | สไตล์ธีม, ภาษาที่เลือก, ค่าปรับแต่ง UI | สถานะ Authentication, สิทธิ์การใช้งาน, ตะกร้าสินค้า |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 มโนทัศน์สำคัญและการรักษาความปลอดภัย (Security Flags)

#### Cookie vs Session

> 💡 **Intuition:** นึกถึง Cookie เหมือน "บัตรเก็บของ" ที่เซิร์ฟเวอร์ให้คุณเก็บไว้บ้าน — สิ่งที่เขียนบนบัตร "ชื่อ: Jack" คุณแก้ไขได้ (ไม่ปลอดภัย) ส่วน Session เหมือน "ตั๋วเลขที่ 5" — บัตรบอก "ตั๋วที่ 5" แค่นั้น ส่วนความจริง "Jack" ถูกเก็บบนเคาน์เตอร์ (Server) — ใช้ Session ID คือ "ตั๋วที่ 5" ไปขอข้อมูล (ตั๋วจริงเป็นสตริงสุ่มยาวที่เดาไม่ได้ ไม่ใช่เลขเรียง) — Cookie = Data ชิ้นเล็กเก็บฝั่ง Client ส่วน Session = Data เก็บบน Server โดยมี Session ID ใน Cookie เป็นตัวชี้
> [Source: generated — not verified against original document]

* **Cookie:** ข้อความ Key-Value ขนาดเล็กที่เซิร์ฟเวอร์สร้างและสั่งให้เบราว์เซอร์จัดเก็บผ่าน Response Header `Set-Cookie` และเบราว์เซอร์จะแนบส่งกลับมาใน Request Header `Cookie` ทุกครั้งโดยอัตโนมัติ
* **Session & Session ID (SID):** ข้อมูลสถานะของผู้ใช้ที่เก็บอยู่บนเซิร์ฟเวอร์ โดยส่งเพียงสตริงสุ่ม SID สั้นๆ ไปเก็บไว้ในคุกกี้ฝั่งเบราว์เซอร์เพื่อใช้อ้างอิง
* **Session Store:** โครงสร้างข้อมูลจัดเก็บเซสชัน บนสภาพแวดล้อม Production **ห้ามใช้ MemoryStore (In-Memory)** เนื่องจากเกิด Memory Leak และไม่สามารถขยายระบบแบบ Multi-server ได้ ให้เปลี่ยนไปใช้ **Redis** หรือ **Database (MySQL/MongoDB)** แทน

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Cookie" → ข้อมูลชิ้นเล็ก (name=value + Attribute เช่น Expires, HttpOnly) ที่ Browser เก็บไว้ และแนบกลับไปกับทุก Request ไปยัง Domain นั้น
- "Session ID (SID)" → Pointer เล็กๆ ชี้ไปที่ข้อมูลที่เก็บบน Server

**ตัวอย่าง:**
```javascript
// ❌ ใช้ Cookie เก็บข้อมูลความลับโดยตรง
res.cookie('user_role', 'admin'); // ข้อมูล "admin" ไปที่ Client
// Client สามารถแก้ไข: document.cookie = 'user_role=superadmin'

// ✅ ใช้ Session + Cookie (SID)
// Server: Session Store = { "sid_12345": { role: "admin", username: "jack" } }
// Cookie: connect.sid = "sid_12345" (ถ้า Client แก้ SID → ไม่ตรงกับ Session ใดใน Store และ express-session ยัง Sign SID ไว้ จึงตรวจจับการแก้ได้)
```

| ด้าน | Cookie | Session |
| :--- | :--- | :--- |
| จัดเก็บ | Client Browser | Server |
| ขนาด | ~4 KB ต่อ Cookie | ไม่ติดลิมิต 4 KB (ขึ้นกับ Session Store) |
| ปลอดภัย | ต่ำ (Client แก้ได้) | สูง (Server รักษา) |
| ความเร็ว | เร็ว (ไม่ต้องค้นหา) | ช้าลง (ค้นหา Server) |
| ใช้สำหรับ | ธีม, ภาษา, ปรับแต่ง UI | Login, สิทธิ์, รายละเอียด |

- **ต่างกันตรง:** Cookie = Data ที่เก็บสิ่งจริง Session = Pointer ชี้ไปที่ข้อมูล

**อย่าสับสน:** Session ไม่ได้มาแทน Cookie — Session ส่วนใหญ่ยังต้องใช้ Cookie เพื่อพก Session ID (SID) ไปกับทุก Request — จำไว้: Cookie = ภาชนะฝั่ง Client, Session = ข้อมูลฝั่ง Server, SID ใน Cookie = ตัวเชื่อมสองฝั่ง

**เช็คความเข้าใจ:** ถ้าเก็บ `{ username: "jack", role: "admin" }` ใน Cookie โดยตรง vs ใช้ Session — อันตรายต่างกันอย่างไร?
<details><summary>เฉลย</summary>

Cookie โดยตรง: Client ดูและแก้ไข Cookie ได้ (DevTools หรือ `document.cookie` ถ้าไม่ได้ตั้ง HttpOnly) — ถ้าเก็บ `role: "user"` ผู้ใช้แก้เป็น `role: "admin"` แล้วส่งกลับไป — ถ้า Server เชื่อค่าใน Cookie ผู้ใช้คนนั้นได้สิทธิ์ admin ทันที → อันตราย

Session + SID: Cookie มีแค่ `sid_12345` ส่วน `role` อยู่ใน Session Store บน Server ที่ Client แตะไม่ได้ — ถ้าแก้ SID เป็น `sid_99999` Server หาไม่เจอ (หรือ Signature ไม่ตรง) → ไม่มีสิทธิ์ — ความเสี่ยงที่เหลือคือ SID ถูกขโมย (Session Hijacking) จึงควรตั้ง Cookie เป็น HttpOnly, Secure และ SameSite
</details>

#### แฟล็กความปลอดภัยของคุกกี้ที่ไม่ควรพลาดในข้อสอบ (Cookie Security Flags):

> 💡 **Intuition:** นึกถึง Cookie เหมือน "บัตรผ่านประตูที่ Browser พกไว้" และ Flags คือ "กฎการใช้บัตร" — `HttpOnly` คือ "ห้ามให้ใครอ่านข้อมูลบนบัตรจากภายนอก (รวมถึง JavaScript)" — `Secure` คือ "ใช้บัตรได้เฉพาะเมื่อส่งผ่านท่อปิดผนึก (HTTPS)" — `SameSite` คือ "บัตรนี้ใช้ได้เฉพาะคำขอจากบ้านเดียวกัน" ซึ่งกันคนนอกหลอกให้ Browser กดส่งคำขอ — จุดที่ Analogy ไม่ตรง: Flags จำกัด "การอ่านและการส่ง" ของ Browser เท่านั้น ไม่ได้เข้ารหัสค่าใน Cookie และไม่ได้แทนการตรวจสอบ Session ที่ Server
> [Source: generated — not verified against original document]

1. **`HttpOnly`:** ป้องกันไม่ให้สคริปต์ JavaScript ฝั่งไคลเอ็นต์ (`document.cookie`) อ่านหรือแก้ไขคุกกี้ได้ ช่วยป้องกันการโจมตีแบบ **Cross-Site Scripting (XSS)**
2. **`Secure`:** บังคับให้เบราว์เซอร์ส่งคุกกี้กลับมาเฉพาะการเชื่อมต่อแบบเข้ารหัส **HTTPS** เท่านั้น
3. **`SameSite`:** ควบคุมการส่งคุกกี้เมื่อมีการเรียกข้ามโดเมน เพื่อป้องกันการโจมตีแบบ **Cross-Site Request Forgery (CSRF)**
   * `Strict`: ไม่ส่งคุกกี้เลยหากมาจากลิงก์ภายนอก
   * `Lax`: ส่งคุกกี้เฉพาะกรณีการนำทางระดับ Top-level (เช่น คลิก Link)
   * `None`: ส่งคุกกี้ทุกกรณี (ต้องใช้ร่วมกับ `Secure: true`)

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "HttpOnly" → Cookie ยังถูกส่งอัตโนมัติพร้อม Request แต่ `document.cookie` มองไม่เห็นค่านั้น
- "Secure" → Browser จะไม่ส่ง Cookie นี้บนการเชื่อมต่อ `http://` เลย
- "SameSite=Lax" → ส่ง Cookie เมื่อผู้ใช้เปิดลิงก์จากเว็บอื่นได้ แต่ไม่ส่งกับ `POST` ข้ามโดเมน หรือการโหลด Resource ฉากหลัง เช่น `<img>` และ `<iframe>`

**ตัวอย่าง:**
```javascript
// ✅ ตั้ง flag ครบ (Production บน HTTPS)
res.cookie('sid', token, { httpOnly: true, secure: true, sameSite: 'lax' });
```
```javascript
// ❌ SameSite=None โดยไม่มี Secure — Browser ปฏิเสธ Cookie นี้
res.cookie('sid', token, { sameSite: 'none' });
```
- ✅ `httpOnly: true` → `document.cookie` ไม่เห็น `sid` แต่ Cookie ยังถูกส่งไปยัง Server ตามปกติ
- ❌ คิดว่า `httpOnly` กัน CSRF — ไม่ใช่ มันกันเฉพาะการอ่านค่าด้วย JavaScript
- **ต่างกันตรง:** `HttpOnly` ควบคุม "ใครอ่านค่าได้" / `SameSite` ควบคุม "คำขอมาจากที่ไหนแล้วจึงแนบ Cookie" / `Secure` ควบคุม "ส่งผ่านช่องทางไหนได้"

**อย่าสับสน:** `Secure` กับ `HttpOnly` — `Secure` คือช่องทางการส่ง (ต้อง HTTPS) ส่วน `HttpOnly` คือใครอ่านได้ (JavaScript หรือไม่)

**เช็คความเข้าใจ:** ถ้าเว็บมีช่องโหว่ XSS และ Cookie `sid` ตั้ง `HttpOnly` Script ที่ถูกฉีดเข้ามาจะขโมยค่า Session ได้หรือไม่ และยังทำอะไรได้อีกบ้าง?
<details><summary>เฉลย</summary>

ขโมยค่า `sid` ผ่าน `document.cookie` ไม่ได้ แต่ Script ที่ฉีดเข้ามายังส่ง Request ไปยัง Server จากหน้าเว็บนั้นได้ และ Browser จะแนบ Cookie ให้เองอัตโนมัติ ดังนั้น `HttpOnly` ลดความเสี่ยงแต่ไม่ได้ป้องกัน XSS โดยสมบูรณ์ ต้องแก้ช่องโหว่ XSS ที่ต้นเหตุด้วย
</details>

---

### 2.2 คำสั่งตั้งค่าสภาพแวดล้อม (Environment & Setup Commands)

```bash
# 1. ติดตั้ง Express, cookie-parser และ express-session
npm install express cookie-parser express-session

# 2. ติดตั้ง nodemon สำหรับสภาพแวดล้อมการพัฒนา
npm install -g nodemon
```

---

### 2.3 โค้ดตัวอย่างการใช้งานจริง (Implementation Code)

#### 1. การจัดการ Cookies ใน Express.js (`cookie-parser`)

```javascript
// server_cookies.js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// ใช้งาน cookie-parser middleware (พร้อมกำหนด Secret Key สำหรับ Signed Cookies)
app.use(cookieParser('my-secret-key-123'));

// 1. SET COOKIE: กำหนดคุกกี้พร้อมระบุ Security Flags
app.get('/set-pref', (req, res) => {
    // ตั้งค่าคุกกี้ทั่วไปสำหรับเก็บธีม
    res.cookie('theme', 'dark', {
        maxAge: 900000, // มีอายุ 15 นาที (มิลลิวินาที)
        httpOnly: true, // ป้องกัน XSS
        secure: false,  # กำหนดเป็น true บน HTTPS Production
        sameSite: 'lax' // ป้องกัน CSRF
    });

    res.send('บันทึกค่าคุกกี้ธีมเรียบร้อยแล้ว');
});

// 2. READ COOKIE: อ่านค่าคุกกี้จาก Request
app.get('/get-pref', (req, res) => {
    const userTheme = req.cookies.theme || 'light (default)';
    res.send(`ธีมปัจจุบันของคุณคือ: ${userTheme}`);
});

// 3. CLEAR COOKIE: ลบ คุกกี้ออก
app.get('/clear-pref', (req, res) => {
    res.clearCookie('theme');
    res.send('ลบคุกกี้ธีมเรียบร้อยแล้ว');
});

app.listen(PORT, () => console.log(`Cookie Server running on port ${PORT}`));
```

#### 2. การจัดการ Sessions และระบบ Authentication ใน Express.js (`express-session`)

```javascript
// server_session.js
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ตั้งค่า express-session middleware
app.use(session({
    name: 'connect.sid',          // ชื่อคุกกี้ที่ใช้เก็บ Session ID
    secret: 'super-secret-key',  // รหัสลับใช้ในการ Sign คุกกี้ SID
    resave: false,               // ไม่บันทึก session ซ้ำหากไม่มีการเปลี่ยนแปลง
    saveUninitialized: false,    // ไม่สร้าง session จนกว่าจะมีข้อมูลบันทึก
    cookie: {
        httpOnly: true,          // ป้องกัน XSS
        secure: false,           // true ถ้าใช้ HTTPS
        maxAge: 1000 * 60 * 30   // เซสชันหมดอายุใน 30 นาที
    }
}));

// --------------------------------------------------
// 1. LOGIN ROUTE: บันทึกข้อมูลเข้า Session & Regenerate SID
// --------------------------------------------------
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // สมมติตรวจสอบรหัสผ่านถูกต้อง
    if (username === 'admin' && password === '1234') {
        
        // ป้องกัน Session Fixation Attack ด้วยการสร้าง Session ID ใหม่หลัง Login สำเร็จ
        req.session.regenerate((err) => {
            if (err) return res.status(500).send('Session Regenerate Error');

            // บันทึกข้อมูลผู้ใช้ลงในเซสชันฝั่ง Server
            req.session.user = {
                username: 'admin',
                role: 'Administrator',
                loginTime: new Date()
            };

            res.json({ message: "เข้าสู่ระบบสำเร็จ", user: req.session.user });
        });
    } else {
        res.status(401).json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
});

// --------------------------------------------------
// 2. AUTHENTICATED ROUTE: ตรวจสอบสิทธิ์ผ่าน Session
// --------------------------------------------------
app.get('/dashboard', (req, res) => {
    // ตรวจสอบว่ามีข้อมูล session.user อยู่หรือไม่
    if (req.session && req.session.user) {
        res.send(`<h1>ยินดีต้อนรับคุณ ${req.session.user.username} (${req.session.user.role})</h1>`);
    } else {
        res.status(401).send('<h1>401 Unauthorized - กรุณาเข้าสู่ระบบก่อน</h1>');
    }
});

// --------------------------------------------------
// 3. LOGOUT ROUTE: ทำลาย Session บน Server & ลบคุกกี้
// --------------------------------------------------
app.post('/logout', (req, res) => {
    if (req.session) {
        // ลบข้อมูล Session Object ออกจาก Server Store
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('ไม่สามารถออกจากระบบได้');
            }
            res.clearCookie('connect.sid'); // ลบคุกกี้ฝั่ง Client
            res.json({ message: "ออกจากระบบเรียบร้อยแล้ว" });
        });
    } else {
        res.json({ message: "ไม่ได้อยู่ในระบบ" });
    }
});

app.listen(PORT, () => console.log(`Session Server running on port ${PORT}`));
```

---

### 2.4 การวิเคราะห์โจทย์ตัวอย่าง (Assignment Case Analysis)

**โจทย์:** จงวิเคราะห์ภัยคุกคาม **Session Hijacking** และ **Session Fixation** พร้อมระบุมาตรการป้องกันที่ต้องปฏิบัติใน Express.js Application

**การวิเคราะห์และการป้องกัน (Vulnerability & Mitigation Analysis):**
1. **Session Hijacking (การขโมยเซสชัน):**
   * **สาเหตุ:** ผู้โจมตีแอบขโมยคุกกี้ Session ID (`connect.sid`) ผ่านสคริปต์ XSS หรือจับแพ็กเก็ตบนเครือข่ายที่ไม่เข้ารหัส
   * **การป้องกัน:**
     * ตั้งค่า `httpOnly: true` บนคุกกี้ เพื่อไม่ให้สคริปต์ XSS ดึงคุกกี้ได้
     * ตั้งค่า `secure: true` บังคับวิ่งเฉพาะ HTTPS
2. **Session Fixation (การตรึงเซสชัน):**
   * **สาเหตุ:** ผู้โจมตีกำหนด Session ID ให้เหยื่อใช้ก่อนเข้าสู่ระบบ เมื่อเหยื่อล็อกอินสำเร็จ ผู้โจมตีจึงสามารถใช้ Session ID เดิมเข้าถึงบัญชีเหยื่อได้
   * **การป้องกัน:**
     * ต้องสั่ง **`req.session.regenerate()`** เพื่อสร้าง Session ID ชุดใหม่ทันทีที่ผู้ใช้ล็อกอินหรือเปลี่ยนระดับสิทธิ์ (Privilege Escalation)

#### 💡 เสริม: Session Fixation และ `req.session.regenerate()`

> 💡 **Intuition:** นึกถึง "ตั๋วแข็งที่คนร้ายเตรียมไว้ล่วงหน้า" — คนร้ายได้เลข Session ID มาก่อน (เช่น ยัดให้เหยื่อผ่าน URL หรือ Cookie) แล้วรอให้เหยื่อ Login โดยเลขนั้นยังเหมือนเดิม เมื่อ Login สำเร็จเลขนั้นก็กลายเป็น "ตั๋วที่ผ่านการยืนยันแล้ว" และคนร้ายใช้ได้ทันที วิธีแก้คือ "เปลี่ยนเลขใหม่ทุกครั้งที่สิทธิ์เปลี่ยน" — จุดที่ Analogy ไม่ตรง: ตั๋วกระดาษเปลี่ยนสถานะเองไม่ได้ แต่ Session บน Server เปลี่ยนสถานะจาก Guest เป็น Logged-in ได้ ทำให้ ID เดิมมีค่ามากขึ้นหลัง Login
> [Source: generated — not verified against original document]

* **ขั้นตอนที่ถูกต้อง:** Login สำเร็จ → เรียก `req.session.regenerate()` เพื่อได้ Session ID ใหม่ → ใส่ข้อมูลผู้ใช้ลงใน Session ใหม่

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Session Fixation" → คนร้ายรู้หรือกำหนด Session ID ของเหยื่อก่อนเหยื่อ Login แล้วใช้ ID เดิมนั้นหลังเหยื่อ Login สำเร็จ
- "regenerate()" → สร้าง Session ID ใหม่และทิ้งข้อมูล Session เดิม จึงต้องใส่ข้อมูล Login กลับเข้าไปหลังเรียกเสมอ

**ตัวอย่าง:**
```javascript
// ✅ เปลี่ยน SID หลัง Login แล้วค่อยใส่ข้อมูลผู้ใช้
app.post('/login', (req, res, next) => {
  // ... ตรวจ username/password แล้ว
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.user = { username: 'admin' };
    res.redirect('/dashboard');
  });
});
```
```javascript
// ❌ เก็บผู้ใช้ลงใน Session เดิมโดยไม่เปลี่ยน SID
app.post('/login', (req, res) => {
  // ... ตรวจ username/password แล้ว
  req.session.user = { username: 'admin' }; // SID ยังเป็นเลขเดิมที่คนร้ายอาจรู้
  res.redirect('/dashboard');
});
```
- ✅ เปลี่ยน SID ตรงจุดที่สิทธิ์เปลี่ยน (Login) → SID เดิมที่คนร้ายรู้ใช้ไม่ได้อีก
- ❌ ไม่เปลี่ยน SID → SID ที่คนร้ายตั้งไว้ก่อนหน้ากลายเป็น Session ที่ Login แล้ว
- **ต่างกันตรง:** ✅ มี `regenerate()` ก่อนผูกสิทธิ์ / ❌ ผูกสิทธิ์กับ ID เดิมโดยตรง

**อย่าสับสน:** `regenerate()` ไม่ใช่ `destroy()` — `regenerate()` เปลี่ยน ID ให้ผู้ใช้ยังคงอยู่ในระบบ ส่วน `destroy()` ลบ Session ทิ้งเมื่อ Logout

**เช็คความเข้าใจ:** ถ้า Login แล้วไม่เรียก `regenerate()` คนร้ายที่รู้ SID เดิมจะใช้ Session นั้นได้หรือไม่? และถ้าเรียกแล้ว SID เดิมยังมีผลไหม?
<details><summary>เฉลย</summary>

ใช้ได้ เพราะ SID เดิมยังผูกอยู่กับ Session ที่เพิ่ง Login สำเร็จ ส่วนหลังเรียก `regenerate()` SID เดิมจะไม่ผูกกับ Session ที่ Login แล้วอีก คนร้ายใช้ ID นั้นเข้าระบบไม่ได้
</details>

#### 💡 เสริม: MemoryStore ใน Production

> 💡 **Intuition:** นึกถึง MemoryStore เหมือน "สมุดจดที่วางบนโต๊ะทำงานของพนักงานคนเดียว" — เร็วและง่ายตอนพัฒนา แต่ถ้าพนักงานกลับบ้าน (Restart Server) สมุดหายหมด และถ้ามีพนักงานหลายคนคนละโต๊ะ (หลาย Instance) ข้อมูลในสมุดแต่ละโต๊ะก็ไม่ตรงกัน — จุดที่ Analogy ไม่ตรง: สมุดบนโต๊ะไม่กินพื้นที่โต๊ะเพิ่มเรื่อยๆ แต่ MemoryStore จะกินหน่วยความจำเพิ่มขึ้นตามจำนวน Session ที่ยังไม่หมดอายุ
> [Source: generated — not verified against original document]

* **MemoryStore** เป็น Store เริ่มต้นของ `express-session` ที่เก็บ Session Data ใน RAM ของ Process นั้น
* ข้อจำกัด: Restart Server แล้ว Session หาย และหลาย Instance ไม่แชร์ Session กัน

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "MemoryStore" → Store เริ่มต้นที่เก็บข้อมูล Session ในหน่วยความจำของ Process เดียว
- "Session Store" → ที่เก็บข้อมูล Session จริงฝั่ง Server (เช่น Redis หรือ RDBMS) ซึ่งทุก Instance อ่านจากจุดเดียวกันได้
- "Session ID" กับ "Session Data" → SID อยู่ในคุกกี้ของ Client ส่วนข้อมูลจริงอยู่ใน Store ฝั่ง Server (MemoryStore เก็บข้อมูลนี้ใน RAM)

**ตัวอย่าง:**
- ✅ Dev รัน `node server.js` บนเครื่องเดียว ใช้ MemoryStore เพื่อทดสอบ Login ได้เร็ว
- ❌ Production รัน 3 Instance หลัง Load Balancer ด้วย MemoryStore — Login ที่ Instance A แล้ว Request ถัดไปไปตกที่ Instance B ซึ่งไม่มี Session นั้น ผู้ใช้จึงถูกให้ Login ใหม่
- **ต่างกันตรง:** เครื่องเดียว/ทดสอบ = MemoryStore ใช้ได้ / หลายเครื่องหรือต้องคงอยู่ข้าม Restart = ใช้ Store กลาง เช่น Redis หรือ RDBMS

**อย่าสับสน:** Session ID ที่อยู่ในคุกกี้กับ Session Data ที่อยู่ใน Store เป็นคนละส่วนกัน — การเปลี่ยน Store ไม่ได้เปลี่ยน Cookie ที่ Client เก็บไว้

**เช็คความเข้าใจ:** ทำไมการใช้ Redis เป็น Session Store แก้ปัญหาหลาย Instance ได้ ทั้งที่โค้ด `express-session` ยังเหมือนเดิม?
<details><summary>เฉลย</summary>

เพราะทุก Instance อ่านและเขียน Session Data จาก Redis ตัวเดียวกัน เมื่อ Login ที่ Instance A แล้ว Instance B ก็เห็น Session เดียวกันผ่าน SID เดียวกัน นอกจากนี้การ Restart Instance ไม่ทำให้ Session หาย ตราบใดที่ Redis ยังทำงานอยู่ สิ่งที่เปลี่ยนคือ `store` option ไม่ใช่โค้ดส่วนที่ใช้ `req.session`
</details>

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ
* [ ] **Cookie Security Flags Cheat Sheet:**
  * `HttpOnly` = ป้องกัน JavaScript อ่านคุกกี้ (กัน **XSS**)
  * `Secure` = ส่งคุกกี้เฉพาะบน **HTTPS** เท่านั้น
  * `SameSite` = ป้องกันการส่งคุกกี้ข้ามเว็บไซต์ (กัน **CSRF**)
* [ ] **Session ID (SID):** ถูกเก็บในคุกกี้ฝั่ง Client แต่ข้อมูลสิทธิ์และตัวแปรจริงเก็บอยู่บน Server
* [ ] **`req.session.regenerate()`:** ต้องเรียกใช้หลัง Login สำเร็จเพื่อกัน **Session Fixation**
* [ ] **`req.session.destroy()`:** ใช้เมื่อ Logout เพื่อลบข้อมูลเซสชันบน Server Store
* [ ] **Production Session Store:** ห้ามใช้ `MemoryStore` บน Production ให้ใช้ **Redis** หรือ **RDBMS**

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Web Programming - Unit 11 Web Data Transfer through HTTP Methods and CORS]] (สถาปัตยกรรม HTTP Stateless Protocol และ Security Headers)
  * [[Web Programming - Unit 07 Back-end Web Development with Node.JS & Express.JS]] (การใช้งาน Express Middleware)
  * [[Web Programming - Unit 06 Web Data with JSON and Local Storage]] (เปรียบเทียบ Local Storage กับ Cookie Management)
  * [[Data & AI Engineer Skill Matrix]] (ทักษะด้าน Web Security, State Persistence, และ Session Caching)
