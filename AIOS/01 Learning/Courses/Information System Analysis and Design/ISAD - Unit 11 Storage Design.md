# ISAD - Unit 11: Storage Design

> **วิชา:** 06066304 Information System Analysis and Design | **สถาบัน:** KMITL (King Mongkut's Institute of Technology Ladkrabang)
> **อาจารย์:** Asst. Prof. Manop Phankokkruad, Ph.D.
> **Source:** `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT11-StorageDesign-v2.pdf` (32 slides)
> **Additional Context:** เสริมทฤษฎี Database Normalization, CAP Theorem, และ Modern Storage Architecture (DAS/NAS/SAN/Cloud)

---

## Part 1: Macro Architecture & Overview

**Storage Design** คือขั้นตอนใน Design Phase ที่ออกแบบว่าข้อมูลในระบบจะถูก **จัดเก็บ เข้าถึง และจัดการ** อย่างไร เป็นส่วนที่เชื่อมระหว่าง Business Logic (ที่ออกแบบใน Unit 10) กับ Physical Data บนดิสก์หรือ Cloud

**Data Management Layer ประกอบด้วย 2 ส่วนหลัก:**
- **Data Access and Manipulation Logic:** Logic สำหรับ CRUD Operations
- **Storage Design:** การออกแบบโครงสร้างที่จัดเก็บข้อมูล

```mermaid
flowchart TD
    S1["Step 1: Selecting Storage Format<br>(File vs RDBMS vs NoSQL vs Object Storage)"] --> S2["Step 2: Mapping Problem-Domain Objects<br>(Class Diagram ➔ Table / Document Schema)"]
    S2 --> S3["Step 3: Optimizing Persistence Format<br>(Normalization / Indexing / Partitioning)"]
    S3 --> S4["Step 4: Designing Data Access & Logic<br>(DAL, CRUD, Transactions & Concurrency)"]
```mermaid
flowchart TD
    subgraph IndexMemory["Index File (Memory / Fast SSD)"]
        direction TB
        I1["CustomerID = 101 ➔ Pointer: Block 5, Offset 0"]
        I2["CustomerID = 102 ➔ Pointer: Block 5, Offset 64"]
        I3["CustomerID = 103 ➔ Pointer: Block 7, Offset 0"]
    end
    
    IndexMemory -->|Disk Pointer Direct Read| DiskData
    
    subgraph DiskData["Physical Disk Storage (Block 5)"]
        direction TB
        D1["[Record: CustID=101, Name='Alice', ...]"]
        D2["[Record: CustID=102, Name='Bob', ...]"]
    end
```

> **ข้อควรระวัง:** Index เพิ่ม Read Speed แต่ **ลด Write Speed** (ต้อง Update Index ทุกครั้ง) และกิน Storage — อย่า Index ทุก Column

**4. Estimating Data Storage Size**
- ใช้ **Volumetrics** ประมาณ Raw Data + Overhead (Index, Log, Temp Files)
- ช่วยกำหนด Hardware Capacity ที่ต้องการ

```text
ตัวอย่าง Estimation:
  1,000,000 Orders/year × 256 bytes/row = 256 MB raw data
  + 30% Index Overhead                  = ~78 MB
  + 20% Log & Temp                      = ~51 MB
  Total Year 1:                         ≈ 385 MB
  5-Year Projection:                    ≈ 2 GB (ไม่รวม Data Growth)
```

---

### 3.2 Designing Data Access — Data Access Layer

**Data Access Layer (DAL)** คือชั้น Software ที่รับผิดชอบการเชื่อมต่อกับ Database และดำเนินการ CRUD ทั้งหมด

**บทบาทของ DAL:**
- เป็น **ตัวกลาง** ระหว่าง Business Logic Layer และ Physical Storage
- Encapsulate โค้ดการเชื่อมต่อ Database ทั้งหมด
- ทำให้ Business Logic ไม่ต้องรู้จักรายละเอียดของ Database

**Features ที่ DAL ต้องมี:**

| Feature | คำอธิบาย |
|---|---|
| **Connect to Database** | สร้างและจัดการ Connection (Connection Pooling) |
| **Open/Close Connections** | เปิด-ปิด Connection อย่างมีระเบียบ |
| **CRUD Operations** | Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) |
| **Transaction Management** | รับประกัน Atomicity — ทำครบทุก Step หรือ Rollback ทั้งหมด |
| **Concurrency Management** | จัดการ Locking เพื่อป้องกัน Race Condition เมื่อหลาย User เข้าพร้อมกัน |

```text
System Architecture with DAL:

┌─────────────────────────────────────────────┐
│           Presentation Layer (UI)            │
├─────────────────────────────────────────────┤
│         Business Logic Layer (BLL)           │
│   (คำนวณ, Validation, Business Rules)       │
├─────────────────────────────────────────────┤
│       Data Access Layer (DAL)                │
│   (CRUD, Connection, Transaction, Concurrency)│
├─────────────────────────────────────────────┤
│         Database / Storage                   │
│   (MySQL, PostgreSQL, MongoDB, S3, ...)     │
└─────────────────────────────────────────────┘
```

> **ตัวอย่างจริง — Repository Pattern (DAL ที่นิยมใช้ใน OOP):**
> ```python
> class OrderRepository:
>     def __init__(self, db_connection):
>         self.db = db_connection       # Encapsulate Connection
>
>     def find_by_id(self, order_id):  # Read
>         return self.db.query(
>             "SELECT * FROM orders WHERE id = %s", [order_id]
>         )
>
>     def save(self, order):           # Create / Update
>         with self.db.transaction():  # Transaction Management
>             self.db.execute(
>                 "INSERT INTO orders (customer_id, total) VALUES (%s, %s)",
>                 [order.customer_id, order.total]
>             )
>
>     def delete(self, order_id):      # Delete
>         self.db.execute(
>             "DELETE FROM orders WHERE id = %s", [order_id]
>         )
> # Business Logic ไม่รู้ว่า DB ข้างล่างเป็น MySQL หรือ PostgreSQL
> ```

---

## Part 4: Common Pitfalls & Exam Points

### ❌ ข้อผิดพลาดที่พบบ่อย

| ข้อผิดพลาด | คำอธิบาย | วิธีแก้ |
|---|---|---|
| **Over-Normalization** | Normalize จนมี JOIN มากเกินไป ทำให้ Query ช้า | De-normalize เฉพาะ Critical Query ที่ทำบ่อย |
| **Over-Indexing** | ทำ Index ทุก Column เพราะคิดว่าจะทำให้เร็ว | Index เฉพาะ Column ที่ใช้ค้นหาบ่อย ระวัง Write Performance |
| **สับสน RAID 0 กับ RAID 1** | คิดว่า RAID 0 มี Redundancy | RAID 0 = Speed Only, No Redundancy! |
| **เลือก Storage แบบ One-size-fits-all** | ใช้ Relational DB กับทุกอย่าง | วิเคราะห์ Data Type และ Access Pattern ก่อนเลือก |
| **ไม่วางแผน Storage Growth** | ไม่ทำ Capacity Estimation | ใช้ Volumetrics ประมาณการล่วงหน้า 3-5 ปี |

### 📌 สรุปสำหรับสอบ

| หัวข้อ | Key Points |
|---|---|
| **RAID 0** | Striping, Speed, No Redundancy |
| **RAID 1** | Mirroring, Redundancy, 50% Space Lost |
| **RAID 5** | Striping + Parity, ทน 1 Disk ล้ม, ≥3 Disks |
| **RAID 6** | Striping + Double Parity, ทน 2 Disk ล้ม, ≥4 Disks |
| **RAID 10** | Mirror + Stripe, Best Speed+Redundancy, ≥4 Disks |
| **Sequential Access** | อ่านตามลำดับ, ดีสำหรับ Report |
| **Random Access** | เข้าถึงโดยตรงผ่าน Index, ดีสำหรับ Search/Update |
| **Normalization** | ลด Redundancy → Storage Efficiency |
| **De-normalization** | เพิ่ม Redundancy บางส่วน → Access Speed |
| **Indexing** | Small Index File + Pointer → Fast Lookup |
| **DAL** | CRUD + Transaction + Concurrency Management |
| **DAS/NAS/SAN** | Direct/Network File-level/Network Block-level |

### เปรียบเทียบ Relational vs. NoSQL

| เกณฑ์ | Relational (SQL) | NoSQL |
|---|---|---|
| Schema | ชัดเจน (Strict) | ยืดหยุ่น (Flexible) |
| Query | SQL มาตรฐาน | Depends on DB (API, MQL, CQL) |
| Scaling | Vertical (ขยาย Spec) | Horizontal (เพิ่ม Server) |
| ACID | รองรับเต็มรูปแบบ | บางส่วน (Eventual Consistency) |
| Big Data | ยาก | ออกแบบมาสำหรับ Big Data |
| ตัวอย่าง | MySQL, PostgreSQL, Oracle | MongoDB, Redis, Cassandra, Neo4j |

---

## Backlinks

- [[ISAD - Unit 10 Software Design]] — Unit ก่อนหน้า: Persistent Classes และ Design Architecture
- [[ISAD - Unit 09 User Interface Design]] — UI ที่ส่ง Data Request มาสู่ Storage Layer
- [[ISAD - Vault Map]] — แผนที่รวมทุก Unit ของวิชา ISAD