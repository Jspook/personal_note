# Web Programming - Unit 12: Session and Cookie Management with Node.JS

## Part 1: Macro Architecture & Technology Overview

เนื่องจากโปรโตคอล **HTTP มีธรรมชาติเป็น Stateless Protocol** (เซิร์ฟเวอร์ไม่จดจำการเชื่อมต่อหรือตัวตนของไคลเอ็นต์ระหว่างคำขอ) จึงเกิดกลไก **HTTP State Management Mechanism (RFC 6265)** ผ่านการทำงานร่วมกันระหว่าง **Cookies** และ **Sessions** เพื่อสร้างสถานะการเชื่อมต่อแบบต่อเนื่อง (Stateful Connection) สำหรับระบบลงชื่อเข้าใช้ (Authentication) และตะกร้าสินค้า

```
[ Client Browser ]                                            [ Web Server ]
       │                                                             │
       │ ── 1. POST /login (Credentials: user/pass) ───────────────> │ 2. Verify Credentials
       │                                                             │ 3. Create Session Object in Store
       │ <── 4. Response Header: Set-Cookie: connect.sid=xyz123 ──── │    (e.g., SID = "xyz123")
       │                                                             │
       │ ── 5. GET /dashboard (Cookie: connect.sid=xyz123) ────────> │ 6. Look up SID "xyz123" in Store
       │ <── 7. Render Personal Dashboard HTML ──────────────────── │ 7. Authenticated! Return User Data
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
* **Cookie:** ข้อความ Key-Value ขนาดเล็กที่เซิร์ฟเวอร์สร้างและสั่งให้เบราว์เซอร์จัดเก็บผ่าน Response Header `Set-Cookie` และเบราว์เซอร์จะแนบส่งกลับมาใน Request Header `Cookie` ทุกครั้งโดยอัตโนมัติ
* **Session & Session ID (SID):** ข้อมูลสถานะของผู้ใช้ที่เก็บอยู่บนเซิร์ฟเวอร์ โดยส่งเพียงสตริงสุ่ม SID สั้นๆ ไปเก็บไว้ในคุกกี้ฝั่งเบราว์เซอร์เพื่อใช้อ้างอิง
* **Session Store:** โครงสร้างข้อมูลจัดเก็บเซสชัน บนสภาพแวดล้อม Production **ห้ามใช้ MemoryStore (In-Memory)** เนื่องจากเกิด Memory Leak และไม่สามารถขยายระบบแบบ Multi-server ได้ ให้เปลี่ยนไปใช้ **Redis** หรือ **Database (MySQL/MongoDB)** แทน

#### แฟล็กความปลอดภัยของคุกกี้ที่ไม่ควรพลาดในข้อสอบ (Cookie Security Flags):
1. **`HttpOnly`:** ป้องกันไม่ให้สคริปต์ JavaScript ฝั่งไคลเอ็นต์ (`document.cookie`) อ่านหรือแก้ไขคุกกี้ได้ ช่วยป้องกันการโจมตีแบบ **Cross-Site Scripting (XSS)**
2. **`Secure`:** บังคับให้เบราว์เซอร์ส่งคุกกี้กลับมาเฉพาะการเชื่อมต่อแบบเข้ารหัส **HTTPS** เท่านั้น
3. **`SameSite`:** ควบคุมการส่งคุกกี้เมื่อมีการเรียกข้ามโดเมน เพื่อป้องกันการโจมตีแบบ **Cross-Site Request Forgery (CSRF)**
   * `Strict`: ไม่ส่งคุกกี้เลยหากมาจากลิงก์ภายนอก
   * `Lax`: ส่งคุกกี้เฉพาะกรณีการนำทางระดับ Top-level (เช่น คลิก Link)
   * `None`: ส่งคุกกี้ทุกกรณี (ต้องใช้ร่วมกับ `Secure: true`)

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
