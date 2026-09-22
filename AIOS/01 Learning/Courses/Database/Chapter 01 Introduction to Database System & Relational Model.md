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

#### นิยาม

> **Data Model** คือกลุ่มของแนวคิดที่ใช้อธิบายโครงสร้างของฐานข้อมูล ซึ่งรวมถึง Elements, Data Types, Relationships, Constraints และ CRUD Operations

#### ประเภทของ Data Model

| ประเภท | คำอธิบาย | ตัวอย่าง |
| :--- | :--- | :--- |
| **1. Conceptual Data Model** | ระดับแนวคิด ใกล้เคียงกับมุมมองของผูใช้ | ER Model (Entity-Relationship) |
| **2. Implementation Data Model** | ระดับ Logical สำหรับใช้กับ DBMS จริง | Relational Model (ตาราง) |
| **3. Physical Data Model** | อธิบาย Record Format, Record Order, Access Path | DDL Scripts, File Structures |

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

#### ตารางเปรียบเทียบ Terminology

| ศัพท์วิชาการ | ศัพท์ทั่วไป | คำอธิบาย |
| :--- | :--- | :--- |
| **Relation** | Table | ตารางข้อมูล |
| **Tuple** | Row / Record | แถวข้อมูล 1 รายการ |
| **Attribute** | Column / Field | คอลัมน์ในตาราง |
| **Domain** | Data Type | ชุดของค่าที่เป็นไปได้ของ Attribute (Atomic) |

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

| คำศัพท์ | ความหมาย | เปลี่ยนแปลง |
| :--- | :--- | :--- |
| **Schema** | คำอธิบายโครงสร้างของฐานข้อมูล กำหนดในช่วงออกแบบ (Design View) | นานๆ ครั้ง |
| **Instance** | ข้อมูลที่อยู่ในฐานข้อมูล ณ ขณะนั้น (Table Instance / Tuple Instance) | ตลอดเวลา |
| **Database State** | สภาพข้อมูลของฐานข้อมูล ณ เวลาหนึ่ง | ตลอดเวลา |

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
