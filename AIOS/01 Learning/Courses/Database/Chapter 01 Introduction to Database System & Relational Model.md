# Database - Chapter 01: Introduction to Database System & Relational Model

> **วิชา:** 06066300 Database System Concept | **สถาบัน:** KMITL, Faculty of Information Technology
> **Source:** `Resources/Books/Database/Database_Concept_01.pdf` (54 slides)

---

## Part 1: Macro Architecture & Overview

บทที่ 1 ครอบคลุม 2 หัวข้อหลัก:
1. **1.1 Introduction to Database System** — ระบบฐานข้อมูลคืออะไร ทำงานอย่างไร และเกี่ยวข้องกับใครบ้าง
2. **1.2 Relational Model** — แนวคิดและข้อบังคับของแบบจำลองเชิงสัมพันธ์

```
Source Material (PDF/Slides)
        ↓
Database Concepts (Definitions)
        ↓
Database Approach (Why DB?)
        ↓
Data Models (ER, Relational, etc.)
        ↓
Relational Model Constraints
        ↓
SQL Operations & Transactions
```

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Data, Database, and DBMS (หัวข้อที่ 1.1)

> 💡 **Intuition:** ลองนึกเหมือนห้องสมุด — **ข้อมูล (Data)** คือข้อเท็จจริงแต่ละชิ้น เช่น ชื่อหนังสือ ผู้แต่ง ผู้ยืม, **ฐานข้อมูล (Database)** คือบัญชีรายการหนังสือทั้งห้องสมุดที่จัดเรียงเป็นระบบ (ตามชื่อผู้แต่ง สาขาวิชา), และ **DBMS** คือเจ้าหน้าที่ห้องสมุดที่ช่วยค้นหา ยืม คืน บันทึกการยืม ตั้งกฎการใช้ห้อง — หากปราศจาก DBMS หนังสือจะหาย ไม่รู้ว่าเล่มใดอยู่ไหน และไม่รู้ว่าใครยืมไปแล้วยังไม่คืน
> [Source: generated — not verified against original document]

#### ความหมายหลัก

| คำศัพท์ | ความหมาย |
| :--- | :--- |
| **Data (ข้อมูล)** | ข้อเท็จจริง (fact) ต่างๆ เช่น ชื่อนักศึกษา หมายเลขโทรศัพท์ ที่อยู่ วิชา การลงทะเบียน เกรด |
| **Database (ฐานข้อมูล)** | ชุดของข้อมูลที่เกี่ยวข้องกัน ออกแบบและเก็บข้อมูลเพื่อวัตถุประสงค์ที่กำหนด เช่น ฐานข้อมูลนักศึกษา |
| **DBMS** | ชุดของโปรแกรมที่ใช้สร้างและบำรุงรักษาฐานข้อมูล ทำหน้าที่เป็นซอฟต์แวร์ตัวกลาง |

#### หน้าที่หลักของ DBMS

* **Defining** — นิยามโครงสร้างของข้อมูลที่จะจัดเก็บ, ความสัมพันธ์และข้อจำกัด
* **Constructing** — สร้าง/จัดเก็บข้อมูลในฐานข้อมูล
* **Manipulating** — เข้าถึงและปรับปรุงข้อมูล (CRUD)
* **Sharing** — ทำให้ผู้ใช้งานหลายคนสามารถใช้ข้อมูลร่วมกันได้

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "นิยามโครงสร้างของข้อมูล" (Defining) → บอก DBMS ว่าจะเก็บข้อมูลแบบไหน มีฟิลด์อะไรบ้าง ประเภทข้อมูลเป็นอย่างไร
- "เข้าถึงและปรับปรุงข้อมูล" (Manipulating) → ไม่ใช่แค่อ่านหนังสือจากชั้น แต่ยังเพิ่มหนังสือใหม่ แก้ไขข้อมูลในการยืม ลบหนังสือเก่า

**ตัวอย่าง:**
- ✅ ระบบลงทะเบียนเรียนที่ใช้ DBMS ใช้ทั้ง Constructing (บันทึกการลงทะเบียนลงดิสก์) และ Sharing (นักศึกษาหลายคนลงทะเบียนพร้อมกันได้)
- ❌ ระบบไฟล์ธรรมดา (ไม่มี DBMS) ไม่สามารถ Sharing อย่างปลอดภัย — เพราะถ้าคนสองคนเปิด Excel ไฟล์เดียวกันพร้อมกัน การเปลี่ยนแปลงของคนแรกอาจหายไป
- **ต่างกันตรง:** DBMS ควบคุมการเข้าถึงอย่างเป็นระบบ ป้องกันการชนกัน

**อย่าสับสน:** "Database" หมายถึง (ชุดข้อมูลที่เกี่ยวข้องกันซึ่งถูกจัดเก็บไว้) ไม่ได้หมายถึง (โปรแกรมที่จัดการข้อมูล — นั่นคือ DBMS); Database + DBMS + Application Programs รวมกันจึงเรียกว่า Database System

**เช็คความเข้าใจ:** ถ้านักศึกษา 100 คนต้องบันทึกวิชาที่ลงทะเบียนพร้อมกัน (ในช่วงเวลาเดียวกัน) เหตุใดระบบไฟล์ Excel ธรรมดาจึงไม่เหมาะ แต่ DBMS เหมาะสม?
<details><summary>เฉลย</summary>

ระบบไฟล์ธรรมดาไม่เหมาะ เพราะ:
1. **ไม่รองรับ Concurrency Control** — ถ้านักศึกษา A และ B บันทึกการลงทะเบียนพร้อมกัน การบันทึกของคนหนึ่งจะหายไป (เหลือเฉพาะของคนที่ save ทีหลังสุด)
2. **ไม่มีการ Locking** — ไม่รู้ว่าใครกำลังแก้ไข ข้อมูลจึงถูกเขียนทับกันได้

DBMS เหมาะสม เพราะมีฟังก์ชัน:
- **Sharing** — ให้คนหลายคนเข้าถึงพร้อมกัน
- **Multiuser Access Control** — DBMS มี Concurrency Control (เช่น lock ระดับเรคอร์ด) จึงรู้ว่าใครกำลังแก้ไขเรคอร์ดใด การบันทึกจึงไม่ทับกัน

</details>

#### องค์ประกอบของ Database System

```
Database System
├── DBMS (Software)
├── Database
│   ├── Stored Database (User Data)
│   └── Meta-Data / Data Dictionary (Database Definition)
└── Application Programs
```

> **Meta-Data** = ข้อมูลที่ใช้อธิบายโครงสร้างของข้อมูลอื่น เช่น Schema, Data Types, Constraints

---

### 2.2 Database Approach — ทำไมต้องใช้ Database?

> 💡 **Intuition:** เมื่อหลายหน่วยงานต้องใช้ข้อมูลเดียวกัน การเก็บแบบ "ไฟล์แยกต่างหาก" ทำให้เกิดปัญหา — ถ้าร้านสาขา A เก็บข้อมูลลูกค้าไว้เอง และสาขา B ก็เก็บไว้เอง ลูกค้าคนเดียวกันจะมีข้อมูลซ้ำสองชุด พอลูกค้าเปลี่ยนเบอร์โทร สาขา A อัปเดตแต่สาขา B ลืม สุดท้ายข้อมูลสองชุดขัดกัน ระบบ Database จึงเก็บข้อมูลลูกค้าไว้ที่เดียว ทุกสาขาเข้าถึงชุดเดียวกัน อัปเดตที่เดียวเห็นทุกสาขา
> [Source: generated — not verified against original document]

#### ปัญหาของ File Processing System (แบบเดิม)

| ปัญหา | คำอธิบาย |
| :--- | :--- |
| **Data Isolation** | มีไฟล์จำนวนมากและหลากหลายรูปแบบ |
| **Data Redundancy** | เก็บข้อมูลซ้ำซ้อน สิ้นเปลืองพื้นที่ |
| **Update Anomaly** | อาจเกิดความผิดพลาดในการปรับปรุงข้อมูล |
| **Data Inconsistency** | ข้อมูลไม่สอดคล้องกันระหว่างไฟล์ต่างๆ |
| **Lack of Security** | การควบคุมสิทธิ์ทำได้จำกัด |
| **Extensive Programming** | ต้องเขียนโค้ดซ้ำๆ มาก |

#### ข้อดีของ Database Approach

ระบบฐานข้อมูลจะจัดเก็บข้อมูลที่เกี่ยวข้องกันเป็นฐานข้อมูลเดียว มีการกำหนดรายละเอียดเกี่ยวกับข้อมูล (นิยามข้อมูล) เพียงครั้งเดียว และสามารถใช้งานข้อมูลดังกล่าวร่วมกันหลายๆ คน โดยมี DBMS เป็นซอฟต์แวร์ตัวกลางในการเข้าถึงข้อมูลในฐานข้อมูล

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "จัดเก็บข้อมูลที่เกี่ยวข้องกันเป็นฐานข้อมูลเดียว" → ไม่กระจาย ไม่ซ้ำซ้อน ที่เดียวจริง
- "นิยามข้อมูล (เพียงครั้งเดียว)" → ไม่ต้องบอกว่า "เบอร์โทรเป็นตัวเลข 10 หลัก" ซ้ำๆ ในแต่ละไฟล์

**ตัวอย่าง:**
- ✅ DBMS - มหาวิทยาลัยเก็บข้อมูลนักศึกษาไว้ในฐานข้อมูลเดียว Registrar, IT Department, Finance ต่างเข้าถึงข้อมูลชุดเดียวกัน แก้ GPA ที่เดียวเห็นทั้งระบบ
- ❌ ไฟล์กระจาย - Registrar เก็บ Excel ข้อมูลเดิม, IT Department เก็บ Excel อีกชุด, Finance เก็บ Database เก่า เมื่อนักศึกษา GPA เพิ่มขึ้น ต้องแก้ 3 ที่ ถ้าแก้ไม่ครบทุกที่ ข้อมูลจะขัดกัน
- **ต่างกันตรง:** Database เป็น "single source of truth" (แหล่งความจริงแหล่งเดียว) ไฟล์กระจายมีหลายสำเนาที่อาจขัดกัน (Data Inconsistency)

**อย่าสับสน:** "ใช้งานข้อมูลร่วมกัน" หมายถึง (หลายคน/หลายโปรแกรมเข้าถึงข้อมูลชุดเดียวกันผ่าน DBMS ซึ่งคุมสิทธิ์และการเข้าถึงพร้อมกัน) ไม่ได้หมายถึง (ทุกคนแก้ไขได้อย่างอิสระโดยไม่มีการควบคุม)

**เช็คความเข้าใจ:** ธนาคาร XYZ มีเทลเลอร์ 50 คน และบัญชีลูกค้า 1,000 บัญชี ถ้าใช้ไฟล์กระจาย (แต่ละเทลเลอร์เก็บสำเนา) อะไรจะเกิดขึ้นเมื่อลูกค้าฝากเงิน 10,000 บาท?
<details><summary>เฉลย</summary>

ปัญหาเกิดได้หลายประการ:
1. **Data Inconsistency** — สำเนาของเทลเลอร์ A แสดงยอดที่เพิ่ม 10,000 บาทแล้ว แต่สำเนาของเทลเลอร์ B ยังเป็นยอดเดิม (ยังไม่ได้อัปเดต)
2. **Update Anomaly** — การฝากครั้งเดียวต้องอัปเดตครบทั้ง 50 สำเนา ถ้าพลาดบางสำเนา ยอดเงินในสำเนานั้นจะผิด
3. **Data Redundancy** — 1,000 บัญชี × 50 สำเนา = 50,000 เรคอร์ด ทั้งที่ข้อมูลจริงมีแค่ 1,000 เรคอร์ด เปลืองพื้นที่

ระบบ Database เก็บบัญชีไว้ที่เดียว อัปเดตครั้งเดียว ทั้ง 50 เทลเลอร์เห็นยอดใหม่ทันที และถ้าเทลเลอร์ A กับ B ทำรายการกับบัญชีเดียวกันพร้อมกัน DBMS ใช้ Concurrency Control (เช่น Lock) ให้ B รอจน A ทำเสร็จ

</details>

---

### 2.3 Database System Environment (หัวข้อที่ 3)

องค์ประกอบ 5 ส่วนของสภาพแวดล้อมระบบฐานข้อมูล:

1. **Hardware** — คอมพิวเตอร์ อุปกรณ์จัดเก็บข้อมูล เครื่องพิมพ์ อุปกรณ์เครือข่าย
2. **Software** — ระบบปฏิบัติการ (OS), Application Programs, Utility Software
3. **People** — บุคลากรที่เกี่ยวข้อง:
   * **Database Administrator (DBA)** — กำหนดสิทธิ์การเข้าถึง ประสานงาน ควบคุมประสิทธิภาพ
   * **Database Designer** — กำหนดโครงสร้างและข้อจำกัดของข้อมูล
   * **System Analyst & Programmer** — วิเคราะห์และพัฒนาระบบ
   * **End Users** — ผู้ใช้งานทั่วไป
4. **Procedures** — ข้อกำหนดและกฎเกณฑ์การออกแบบและใช้งาน
5. **Data** — ข้อมูลที่ต้องการจัดเก็บ

---

### 2.4 Data Models (หัวข้อที่ 4)

> 💡 **Intuition:** ลองนึกถึงการออกแบบอาคาร — ก่อนลงมือสร้างต้อง **วาดแบบ 3 ระดับ** (1) แปลนภาพรวม (Conceptual - มีห้องอะไรบ้าง ห้องไหนเชื่อมกับห้องไหน), (2) แบบรายละเอียด (Implementation - แต่ละห้องกว้างกี่ตารางเมตร ตามมาตรฐานที่ผู้รับเหมาใช้ได้), (3) แบบก่อสร้างให้ช่าง (Physical - วัสดุ วิธีทำผนัง) การออกแบบ Database ก็เหมือนกัน แต่ละระดับมีรายละเอียดต่างกันและเหมาะกับคนอ่านต่างกลุ่ม
> [Source: generated — not verified against original document]

#### นิยาม

> **Data Model** คือกลุ่มของแนวคิดที่ใช้อธิบายโครงสร้างของฐานข้อมูล ซึ่งรวมถึง Elements, Data Types, Relationships, Constraints และ CRUD Operations

#### ประเภทของ Data Model

| ประเภท | คำอธิบาย | ตัวอย่าง |
| :--- | :--- | :--- |
| **1. Conceptual Data Model** | ระดับแนวคิด ใกล้เคียงกับมุมมองของผูใช้ | ER Model (Entity-Relationship) |
| **2. Implementation Data Model** | ระดับ Logical สำหรับใช้กับ DBMS จริง | Relational Model (ตาราง) |
| **3. Physical Data Model** | อธิบาย Record Format, Record Order, Access Path | DDL Scripts, File Structures |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Conceptual" → สิ่งที่ผู้ใช้คิด ไม่ยุ่งเรื่องเทคนิค (สิ่งที่ user มองเห็น/เข้าใจ)
- "Implementation (Logical)" → แปลงแนวคิดของผู้ใช้ให้เป็นโครงสร้างที่ DBMS เข้าใจ เช่น ตารางใน Relational Model (ใช้กับ Oracle, MySQL)
- "Physical" → วิธีที่ DBMS จริงๆ เก็บในดิสก์ (index, file structure, hash)

**ตัวอย่าง:**
- ✅ Conceptual: "Student มี Enrollment หลายตัว, Course มี Enrollment หลายตัว" (diagram ER)
- ✅ Implementation: ตาราง STUDENT(id, name) และ ENROLLMENT(student_id, course_id) พร้อม Primary Key / Foreign Key (Relational Model)
- ✅ Physical: ไฟล์ของตาราง Student เก็บเป็น block ละ 8 KB เรียงตาม student_id และมี B-tree Index บน student_id เป็น Access Path
- **ต่างกันตรง:** ทั้ง 3 ระดับอธิบายข้อมูลเดียวกัน แต่มุมมองและคนอ่านต่าง (Business analyst อ่านแค่ Conceptual, Programmer อ่าน Implementation, DBA ดู Physical)

**อย่าสับสน:** "Implementation Data Model" หมายถึง (โครงสร้างที่เตรียมให้ DBMS specific ใช้ได้ เช่น Relational, Hierarchical) ไม่ได้หมายถึง (ไป implement / เขียนโค้ด)

**เช็คความเข้าใจ:** ถ้าวิศวกร Data Engineer ต้องการตรวจสอบว่า "Student Table" อ่านได้เร็วไหม ต้องดูที่ระดับใด (Conceptual / Implementation / Physical)?
<details><summary>เฉลย</summary>

ต้องดูที่ระดับ **Physical** เพราะ:
- Conceptual ไม่บอกรายละเอียดเทคนิค (แค่ว่ามี Student ก็พอ)
- Implementation ไม่บอกว่าจัดเก็บในดิสก์แบบไหน (เป็นเรื่องของ DBMS นั่นเอง)
- Physical เท่านั้นที่บอก: "index ใช้ B-tree หรือ Hash?", "block size กี่ KB?", "access path คืออะไร?"

DBA ดู block size, ชนิด index และโครงสร้างไฟล์ที่ระดับ Physical (`db_block_size` เป็นพารามิเตอร์เฉพาะของ Oracle) เพื่อแก้ performance

</details>

#### ER Model — Conceptual Data Model

องค์ประกอบหลักของ ER Model:
* **Entity** — สิ่งที่สนใจเก็บข้อมูล (รูปธรรม: พนักงาน, รถยนต์ / นามธรรม: การลงทะเบียน)
* **Attribute** — คุณสมบัติของ Entity (เช่น ตำแหน่งงาน, ชื่อนักศึกษา, สีรถ)
* **Relationship** — ความสัมพันธ์ระหว่าง Entity

#### ประวัติ Data Models อื่นๆ

* **4.1 Hierarchical Data Model** — แสดงข้อมูลแบบต้นไม้ (Parent-Child)
* **4.2 Network Data Model** — ขยายจาก Hierarchical อนุญาตให้ Node มีหลาย Parent
* **4.3 Relational Data Model** — นำเสนอข้อมูลในรูปแบบตาราง (ปัจจุบันนิยมที่สุด)

---

### 2.5 Relational Database: Basic Structure (หัวข้อที่ 5)

ในปี ค.ศ. 1970 **E.F. Codd** ได้นำเสนอ Relational Model ซึ่งเก็บข้อมูลเชิงตรรกในรูปแบบตาราง (Table) ที่มีความสัมพันธ์กัน

> 💡 **Intuition:** ลองนึกถึงสมุดทะเบียนของสตูดิโอถ่ายภาพ — แต่ละตาราง (Table) เก็บเรื่องเดียว เช่น ลูกค้า, รูปถ่าย, ผลงาน แต่ละแถว (Row / Tuple) คือลูกค้า 1 คน หรือรูปถ่าย 1 รูป คอลัมน์ (Column / Attribute) คือคุณสมบัติ เช่น รหัสลูกค้า, ชื่อ, เบอร์โทร, ที่อยู่ และเซตของค่าที่คอลัมน์หนึ่งรับได้ (เช่น รหัสลูกค้าต้องเป็นตัวเลข 4 หลัก) คือ Domain
> [Source: generated — not verified against original document]

#### ตารางเปรียบเทียบ Terminology

| ศัพท์วิชาการ | ศัพท์ทั่วไป | คำอธิบาย |
| :--- | :--- | :--- |
| **Relation** | Table | ตารางข้อมูล |
| **Tuple** | Row / Record | แถวข้อมูล 1 รายการ |
| **Attribute** | Column / Field | คอลัมน์ในตาราง |
| **Domain** | Data Type | ชุดของค่าที่เป็นไปได้ของ Attribute (Atomic) |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Relation" → คำนี้มาจากคณิตศาสตร์ (ทฤษฎีเซต: relation คือเซตของ tuple ที่เป็นสับเซตของ Cartesian product ของ Domain ต่างๆ) ในทางปฏิบัติ Relation = Table ไม่ได้แปลว่า "ความสัมพันธ์ระหว่างตาราง"
- "Atomic" → ค่าในช่องหนึ่งเป็นค่าเดียว แบ่งย่อยไม่ได้ในมุมของ Relational Model (เช่น ค่า DATE '2566-01-15' นับเป็น 1 ค่า; แต่การใส่ {'Python', 'SQL'} ไว้ในช่องเดียวเป็น multivalued ไม่ Atomic)
- "Domain" → เซตของค่าที่ Attribute รับได้ เช่น ถ้า Domain ของ Student_id คือตัวเลข 8 หลัก ค่า "เมธา" ก็ใส่ไม่ได้

**ตัวอย่าง:**
- ✅ Relation STUDENT, Tuple = ข้อมูลนักศึกษา 1 คน (เมธา, 60601234, IT), Attribute = Name, Student_id, Major, Domain ของ Student_id = {00000001...99999999}
- ❌ Attribute Address เก็บ "บ้านเลขที่ 15 ซ.เจริญนคร แขวง..." รวมไว้ในช่องเดียว ทั้งที่ระบบต้องค้นหา/แยกใช้ทีละส่วน → เป็น Composite Attribute ควรแยกเป็น Attribute ย่อย (House_no, Soi, District) ให้แต่ละช่องเป็น Atomic
- **ต่างกันตรง:** Relation เป็น "คอลเลกชัน" ของ Tuple ทั้งหมด, Tuple คือ 1 เรคอร์ด

**อย่าสับสน:** "Relation" ในวิชา Database หมายถึง (Table หรือ Set ของ Tuple ที่สัมพันธ์กัน) ไม่ได้หมายถึง (ความสัมพันธ์ส่วนตัว หรือ Relationship in ER Model นั้นเป็นคนละเรื่อง)

**เช็คความเข้าใจ:** ตาราง STUDENT(ID, Name, GPA) มี Domain ของ GPA = {0.00, 0.25, 0.50, 0.75, ..., 4.00} ผู้ใช้ลองใส่ GPA = 5.00 ของนักศึกษา ID 60601234 ระบบจะปฏิเสธ เหตุใด?
<details><summary>เฉลย</summary>

ระบบปฏิเสธเพราะ:
- **Constraint ของ Domain** — ค่า 5.00 ไม่อยู่ในชุด {0.00, 0.25, ..., 4.00} ที่กำหนดไว้
- **DBMS ต้องตรวจสอบ** — ก่อนสั่งเก็บข้อมูล DBMS ดูว่า GPA = 5.00 อยู่ใน Domain หรือไม่ ถ้าไม่ ก็ปฏิเสธ INSERT/UPDATE

นี่คือ **Domain Constraint** ซึ่งเป็น Constraint พื้นฐานที่สุดของ Relational Model

</details>

#### Relation Schema

```
Notation: R(A1, A2, ..., An)

ตัวอย่าง:
STUDENT(Student_id, Name, Major, Home_Phone, Age, Gpa)

Relation State: r(R) = {t1, t2, ..., tn}
โดย ti แต่ละ tuple คือข้อมูลของนักศึกษา 1 คน
```

---

### 2.6 Database Schemas, Instances, and State (หัวข้อที่ 6)

> 💡 **Intuition:** ลองนึกถึงแบบฟอร์มจดหมาย — **Schema** คือ "แบบฟอร์มเปล่า" (มีช่องชื่อผู้รับ, ที่อยู่, เนื้อความ) ที่ออกแบบไว้แล้วและแทบไม่เปลี่ยน **Instance** หรือ **State** คือ "ข้อมูลที่กรอกลงฟอร์มทั้งหมด ณ ขณะนั้น" (เช่น ผู้รับ เมธา ที่อยู่ 123/45) ทุกครั้งที่เพิ่มหรือแก้จดหมาย State จะเปลี่ยน แต่แบบฟอร์มยังเหมือนเดิม
> [Source: generated — not verified against original document]

| คำศัพท์ | ความหมาย | เปลี่ยนแปลง |
| :--- | :--- | :--- |
| **Schema** | คำอธิบายโครงสร้างของฐานข้อมูล กำหนดในช่วงออกแบบ (Design View) | นานๆ ครั้ง |
| **Instance** | ข้อมูลที่อยู่ในฐานข้อมูล ณ ขณะนั้น (Table Instance / Tuple Instance) | ตลอดเวลา |
| **Database State** | สภาพข้อมูลของฐานข้อมูล ณ เวลาหนึ่ง | ตลอดเวลา |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Schema" → "โครงสร้าง" ไม่ใช่ "ข้อมูล" (ถ้า Schema บอกว่า Name = VARCHAR(100) ก็หมายถึง "ชื่อต้องเป็นตัวหนังสือ ยาวไม่เกิน 100 ตัว" ไม่ได้หมายถึง "ชื่อจริงคือเมธา")
- "Instance" และ "Database State" แก่นเดียวกัน คือข้อมูลที่มีอยู่ ณ เวลาหนึ่ง (Snapshot) ต่างกันแค่ขอบเขต: State มักพูดถึงทั้งฐานข้อมูล ส่วน Instance ใช้ได้ทั้งระดับตารางหรือ tuple

**ตัวอย่าง:**
- ✅ Schema: `STUDENT(ID INT, Name VARCHAR(100), Major VARCHAR(50))` — กำหนดไว้ก่อน สร้างตาราง
- ✅ Instance/State เวลา 9.00 AM: `(601, "เมธา", "IT")` และ `(602, "สมใจ", "Engineering")` — ข้อมูล 2 นักศึกษา
- ✅ Instance/State เวลา 10.00 AM: เพิ่มนักศึกษา `(603, "ชาลี", "Business")` — มี 3 แถว
- **ต่างกันตรง:** Schema อธิบาย "รูปร่าง" Instance/State อธิบาย "เนื้อหา + เวลา"

**อย่าสับสน:** "Instance" หมายถึง (ข้อมูลที่มีอยู่จริง ณ เวลาหนึ่ง) ไม่ได้หมายถึง (สำเนา/Copy ของฐานข้อมูล)

**เช็คความเข้าใจ:** ถ้าผู้ดูแล Database แก้ Schema จาก `STUDENT(ID INT, Name VARCHAR(100), Major VARCHAR(50))` เป็น `STUDENT(ID INT, Name VARCHAR(100), Major VARCHAR(50), GPA REAL)` นี่เป็นการเปลี่ยน Schema หรือ Instance/State?
<details><summary>เฉลย</summary>

เป็นการเปลี่ยน **Schema**:
- ก่อน: Schema มี 3 Attribute (ID, Name, Major)
- หลัง: Schema มี 4 Attribute (ID, Name, Major, GPA)

ค่าเดิมยังอยู่ ("เมธา" ยังเป็น "เมธา") แต่ State ก็เปลี่ยนตามด้วย เพราะทุก tuple ได้ค่าในคอลัมน์ GPA ใหม่:
- ข้อมูลเก่าที่ไม่มี GPA จะมี NULL ในฟิลด์ GPA ใหม่
- หรือ DBA ให้ค่า default เช่น GPA = 0.00

นี่คือ **Schema Evolution** ในความเป็นจริง

</details>

> **Meta-data / Data Dictionary** = DBMS จะจัดเก็บรายละเอียดของ Schema และข้อจำกัดของฐานข้อมูล

ตัวอย่าง Schema:
```
Student (Name, Student_number, Class, Major)
Course (Course_number, Course_name, Credit_hours)
Section (Section_number, Course_number, Semester, Year, Instructor)
```

---

### 2.7 Database Languages (หัวข้อที่ 7)

| ภาษา | ย่อ | วัตถุประสงค์ |
| :--- | :--- | :--- |
| **Data Definition Language** | DDL | นิยามโครงสร้าง Schema, ใช้ DDL Compiler สร้าง Meta-data ใน DBMS Catalog |
| **Data Manipulation Language** | DML | จัดการข้อมูล: INSERT, SELECT, UPDATE, DELETE |
| **Structured Query Language** | SQL | ภาษามาตรฐาน ครอบคลุมทั้ง DDL และ DML สำหรับ RDBMS (Non-procedural) |

---

### 2.8 Types of Database (หัวข้อที่ 8)

#### จำแนกตามจำนวนผู้ใช้งาน
* **Single-user Database** — ใช้งานคนเดียว
* **Multi-user Database** — ใช้งานหลายคน แบ่งเป็น:
  * Workgroup Database (เฉพาะส่วนงาน)
  * Enterprise Database (ทั้งองค์กร)

#### จำแนกตามสถานที่ตั้ง
* **Centralized Database** — ฐานข้อมูลเดียวที่ส่วนกลาง
* **Distributed Database** — ฐานข้อมูลกระจายอยู่หลายที่

#### จำแนกตามวัตถุประสงค์
* **Operational Database** — สนับสนุนการปฏิบัติงานประจำวัน (Day-to-day operations)
* **Data Warehouse** — สนับสนุนการตัดสินใจระดับกลยุทธ์ ประมวลมาจาก Historical Data

#### RDBMS ที่นิยมใช้
* **Commercial:** SQL Server, Oracle, DB2, SYBASE, INFORMIX
* **Open Source:** MySQL, PostgreSQL

---

### 2.9 DBMS Functions

| Function | คำอธิบาย |
| :--- | :--- |
| **Data Dictionary Management** | เก็บ Definition ของ Data Elements และ Relationships |
| **Data Storage Management** | Performance Tuning — ประสิทธิภาพในการจัดเก็บและเข้าถึงข้อมูล |
| **Data Transformation & Presentation** | แปลงข้อมูลที่รับเข้าให้ตรงกับโครงสร้างที่กำหนด |
| **Security Management** | บังคับใช้ User Security และ Data Privacy |
| **Multiuser Access Control** | อนุญาตให้หลาย User ใช้งานพร้อมกันโดยไม่กระทบ Integrity |
| **Backup & Recovery Management** | กู้คืนฐานข้อมูลเมื่อเกิดความเสียหาย |
| **Data Integrity Management** | ลด Redundancy และเพิ่ม Consistency |
| **Database Access Languages & API** | Query Language (SQL) และ Communication Interfaces |

#### เมื่อไหรไม่ควรใช้ DBMS
* Real-time requirements ที่ DBMS overhead ทำให้ไม่ทัน (เช่น ระบบโทรศัพท์)
* ข้อมูลมีความซับซ้อนเกินกว่า DBMS Modeling จะรับได้ (เช่น Genome databases)
* ผู้ใช้ต้องการ Operations ที่ DBMS ไม่รองรับ (เช่น GIS)

---

## Part 3: Chapter 1.2 — Relational Model

### 3.1 Relational Model Concepts (แนวคิดแบบจำลองเชิงสัมพันธ์)

แบบจำลองเชิงสัมพันธ์นำเสนอฐานข้อมูลในลักษณะชุดของ **Relation** แต่ละ Relation ประกอบด้วย:
* **Tuple** = Row (แถว) — ข้อมูล 1 รายการที่เกี่ยวข้องกัน
* **Attribute** = Column (คอลัมน์)
* **Domain** = ชุดของค่าที่เป็น Atomic (ไม่สามารถแบ่งย่อยได้) กำหนดโดย Data Type

```
ตัวอย่าง:
STUDENT(Student_id, Name, Major, Home_Phone, Age, Gpa)

r(STUDENT) = {t1, t2, ...}
โดยแต่ละ ti = ข้อมูลนักศึกษา 1 คน
```

---

### 3.2 Relational Model Constraints (เงื่อนไขบังคับ)

มี 3 ระดับ:

1. **Inherent / Implicit Constraints** — เงื่อนไขจากตัว Model เอง เช่น รีเลชันห้ามมี Tuple ที่ซ้ำกัน (Set Theory)
2. **Schema-based / Explicit Constraints** — กำหนดใน Schema ของฐานข้อมูล
3. **Application-based / Business Rules** — ตรวจสอบผ่าน Application Program เท่านั้น

---

### 3.3 Schema-based Constraints (เงื่อนไขระดับ Schema)

#### 1) Domain Constraints
ค่าในแต่ละ Attribute ต้องเป็น Atomic และอยู่ใน Domain (Data Type) ของ Attribute นั้น

#### 2) Key Constraints
รีเลชันต้องไม่มี Tuple ที่ซ้ำกัน โดยต้องมี Key ที่มีคุณสมบัติ:
* **Uniqueness** — ไม่ซ้ำกัน
* **Minimality** — มีแอตทริบิวต์น้อยที่สุด

ประเภทของ Key:

| ประเภท | คำอธิบาย |
| :--- | :--- |
| **Candidate Key** | Key ทุกตัวที่มีคุณสมบัติ Uniqueness และ Minimality |
| **Primary Key (PK)** | Candidate Key ที่ถูกเลือกให้เป็นคีย์หลัก (นิยมเลือกที่มี Attribute เดียว) |

#### 3) Constraints on Null Values
Attribute อาจมีค่า (NOT NULL) หรือไม่มีค่า (NULL) ก็ได้ ขึ้นกับการกำหนด

#### 4) Entity Integrity Constraints
**Primary Key จะต้องไม่เป็น NULL** เพราะ PK ใช้ในการเข้าถึง Tuple ในรีเลชัน

#### 5) Referential Integrity Constraints
ความสอดคล้องกันระหว่างสองรีเลชัน (R1, R2):

```
Foreign Key (FK) ใน R1 → Primary Key (PK) ใน R2

กฎ:
1. FK ใน R1 ต้องมี Domain (Data Type) เดียวกับ PK ใน R2
2. ค่าของ FK ใน tuple t1 ต้องปรากฏเป็น PK ที่มีอยู่จริงใน R2
   หรือต้องเป็นค่า NULL
```

#### 6) Functional Dependency (FD) Constraints
ความสัมพันธ์ระหว่างสองชุด Attribute x → y:
> "ถ้ากำหนดค่าใน x ได้ จะกำหนดค่าของ y ได้"

```
สัญลักษณ์: x → y

ตัวอย่าง:
FD1: Student_id → Student_Name
FD2: Curriculum_id → Faculty_id
```

> FD ใช้สำหรับตรวจสอบคุณภาพการออกแบบฐานข้อมูล → **Normalization**

---

### 3.4 Operations and Transaction Concepts (หัวข้อที่ 4)

#### Operations — 2 ประเภท

| ประเภท | ภาษา | ลักษณะ |
| :--- | :--- | :--- |
| **Relational Algebra** | ต้องกำหนดลำดับ | Procedural Language |
| **Relational Calculus** | ไม่ต้องกำหนดลำดับ | Non-procedural Language |

การปรับปรุงข้อมูล: **INSERT**, **DELETE**, **MODIFY**

#### Transactions
การประมวลผลข้อมูลที่เกี่ยวกับการอาน เพิ่ม ลบ และปรับปรุงข้อมูล โดยต้องคงสถานะ **Consistent State** ของฐานข้อมูล

```
ตัวอย่าง: การโอนเงิน
Transaction = {ถอนจากบัญชี A} + {ฝากเข้าบัญชี B}
ต้องสำเร็จทั้งคู่หรือล้มเหลวทั้งคู่ (Atomicity)
```

แนวคิดในการประมวลผล:
* **Concurrent Execution** — ประมวลผลหลาย Transaction พร้อมกัน
* **Recovery** — กู้คืนเมื่อเกิดความผิดพลาด

---

### 3.5 SQL และ Relational Algebra

SQL สำหรับ RDBMS มาจากฐานทฤษฎี 2 ส่วน:

1. **Relational Algebra** — เป็นพื้นฐานของ Operations และ Functions (มาจาก Mathematical Set Theory + Relational-specific operations เช่น JOIN)
2. **Relational Calculus** — สำหรับ Query ข้อมูลแบบ Declarative

```sql
-- ตัวอย่าง Relational Calculus:
{t | EMPLOYEE(t) AND t.Salary > 50000}
```

---

## Part 4: Key Concepts Summary

### Concept Map

```text
Database System
├── Data → Database → DBMS
│
├── File System Problems
│   └── Redundancy, Inconsistency, Isolation, No Security
│
├── Data Models
│   ├── Conceptual (ER Model)
│   ├── Implementation (Relational)
│   └── Physical (File Structures)
│
├── Relational Concepts
│   ├── Relation = Table
│   ├── Tuple = Row
│   ├── Attribute = Column
│   └── Domain = Data Type (Atomic)
│
└── Constraints (Schema-based)
    ├── Domain Constraints
    ├── Key Constraints (PK, Candidate Key)
    ├── Null Constraints
    ├── Entity Integrity (PK ≠ NULL)
    ├── Referential Integrity (FK → PK)
    └── Functional Dependency (x → y) → Normalization
```

### สรุปสูตร / Notation ที่สำคัญ

| Notation | ความหมาย |
| :--- | :--- |
| `R(A1, A2, ..., An)` | Relation Schema ชื่อ R มี Attribute A1...An |
| `r(R)` | Relation State r ของ Schema R (ชุดของ Tuples) |
| `r = {t1, t2, ..., tn}` | r คือ Set ของ Tuples |
| `x → y` | Functional Dependency: x กำหนด y |
| `FK → PK` | Foreign Key อ้างอิงไปยัง Primary Key |

---

## ⚠️ Common Pitfalls & Exam Traps

* **Relation ≠ Table อย่างเต็ม:** Relation เป็น Mathematical Set (ห้าม Duplicate Tuples, ไม่มี Order), ส่วน Table ในทาง Practical อาจมี Duplicate rows ได้
* **NULL ≠ 0 ≠ "":** NULL หมายถึง "ไม่รู้ค่า" ไม่ใช่ Zero หรือ Empty String
* **Primary Key ต้องไม่เป็น NULL (Entity Integrity):** แต่ Non-key Attribute อาจเป็น NULL ได้
* **Foreign Key อาจเป็น NULL ได้:** ถ้า Relationship ไม่ Mandatory (Optional)
* **FD เป็น Basis ของ Normalization:** การออกแบบที่ดีต้องไม่มี Partial/Transitive Dependencies

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Database - Chapter 02]] (Relational Algebra & Operations เชิงลึก)
  * [[Database - Chapter 03]] (SQL — DDL & DML)
  * [[Database - Chapter 05]] (Database Design & Functional Dependencies / Normalization)
  * [[Data & AI Engineer Skill Matrix]] (Database Design และ SQL เป็น Core Skill ของ Data Engineer)
  * [[Discrete Mathematics - Week 10 Relations]] (ทฤษฎีเซต และ Mathematical Relations ที่เป็นรากฐานของ Relational Model)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/Database/Database_Concept_01.pdf` (54 slides, KMITL)
  * Reference: Elmasri & Navathe (2016) — *Fundamentals of Database Systems*
  * Reference: Rob & Coronel (2009) — Database Design
