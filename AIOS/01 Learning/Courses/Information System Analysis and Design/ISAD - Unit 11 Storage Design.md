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

```text
Storage Design — 4-Step Design Approach:
────────────────────────────────────────────────────────────────
  Step 1: Selecting Storage Format
          (File vs. Database vs. NoSQL vs. Object Storage)
                    |
                    v
  Step 2: Mapping Problem-Domain Objects to Persistence Format
          (Class Diagram -> Table Schema / Document Schema)
                    |
                    v
  Step 3: Optimizing the Persistence Format
          (Normalization / De-normalization / Indexing / Clustering)
                    |
                    v
  Step 4: Designing Data Access & Manipulation
          (Data Access Layer / CRUD / Transaction / Concurrency)
────────────────────────────────────────────────────────────────
```

### ความสัมพันธ์กับ Unit ก่อนหน้า
- **[[ISAD - Unit 10 Software Design]]:** Unit 10 ออกแบบ Software Architecture และ Class Design ส่วน Unit 11 นำ Class เหล่านั้นมา Map ลงใน Storage Format ที่เหมาะสม
- **Persistent Classes** จาก Unit 10 (OrderRepository, UserDAO) คือจุดเชื่อมต่อโดยตรงกับ Storage Design ใน Unit นี้

---

## Part 2: Core Concepts

### 2.1 Storage in Computer Systems

**Storage Device** คืออุปกรณ์ Hardware สำหรับจัดเก็บข้อมูล มีหลายประเภทตาม Use Case:

#### ประเภทของ Storage (ตาม Hardware)

| ประเภท | ตัวอย่าง | ลักษณะเด่น |
|---|---|---|
| **Primary Storage (RAM)** | DDR5, LPDDR5 | Volatile (ดับแล้วข้อมูลหาย), เร็วมาก, เข้าถึง Random |
| **Secondary Storage** | HDD, SSD | Non-volatile (ข้อมูลคงอยู่), ช้ากว่า RAM |
| **External Storage** | External HDD, USB Drive, Optical | พกพาได้, ขยาย Capacity |
| **Cloud Storage** | AWS S3, Google Drive, Azure Blob | Scalable ไม่จำกัด, จัดการโดย Hosting Company |

**หน่วยวัด Digital Storage:** MB → GB → TB → PB → EB

#### Primary Storage Categories (ระดับ Software/Database)

```text
Modern Storage Architecture Layers:
┌─────────────────────────────────────────────────────────┐
│  Application Layer                                      │
├─────────────────────────────────────────────────────────┤
│  In-Memory Cache (Redis, Memcached)  ← microsecond      │
├─────────────────────────────────────────────────────────┤
│  Relational DB (MySQL, PostgreSQL)   ← millisecond      │
├─────────────────────────────────────────────────────────┤
│  NoSQL DB (MongoDB, Cassandra)       ← millisecond      │
├─────────────────────────────────────────────────────────┤
│  Object/Blob Storage (S3, GCS)       ← second           │
└─────────────────────────────────────────────────────────┘
```

| ประเภท | คำอธิบาย | Use Case |
|---|---|---|
| **Relational DB (SQL)** | ตาราง Schema ชัดเจน, ACID Compliance, รองรับ Complex Queries | ระบบการเงิน, ERP, ระบบที่ต้องการ Consistency สูง |
| **NoSQL DB** | Schema ยืดหยุ่น, Horizontal Scalable, 4 Sub-types: Key-Value, Document, Wide-Column, Graph | Social Media, Real-time Analytics, Big Data |
| **In-Memory Cache** | เก็บข้อมูลที่เข้าถึงบ่อยใน RAM → Read/Write ระดับ Microsecond | Session Storage, Hot Data, Leaderboard |
| **Object/Blob Storage** | เก็บ "Object" ใน Flat Namespace (ไม่ใช่ Folder Hierarchy) → Scalable และถูก | รูปภาพ, วิดีโอ, Backup Files, Static Assets |

---

### 2.2 Data Storage Technology — RAID

**RAID (Redundant Array of Independent Disks)** คือเทคโนโลยีที่รวม Physical Disk หลายลูกเป็น Logical Unit เดียว เพื่อ **Redundancy** และ/หรือ **Performance**

#### เทคนิคพื้นฐาน 2 อย่าง

| เทคนิค | วิธีการ | ข้อดี | ข้อเสีย |
|---|---|---|---|
| **Striping** | แบ่งข้อมูลออกเป็นชิ้นๆ กระจายเขียนพร้อมกันหลาย Disk | Read/Write เร็ว (Parallel) | ไม่มี Redundancy — Disk แตก 1 ลูก = ข้อมูลหายทั้งหมด |
| **Mirroring** | เขียนสำเนา Exact Copy ไปหลาย Disk พร้อมกัน | Redundancy สูง — Disk แตกยังมีสำเนา | เสีย Capacity ครึ่งหนึ่ง |

#### RAID Levels

| RAID Level | เทคนิค | Disk ขั้นต่ำ | ข้อดี | ข้อเสีย | Use Case |
|---|---|---|---|---|---|
| **RAID 0** | Striping เท่านั้น | 2 | เร็วสุด | ไม่มี Redundancy เลย | Gaming, Video Editing (ข้อมูลชั่วคราว) |
| **RAID 1** | Mirroring เท่านั้น | 2 | Redundancy ดีมาก | เสียพื้นที่ 50% | OS Drive, Critical Data |
| **RAID 5** | Striping + Parity | 3 | Speed + Redundancy + ประหยัด Capacity | ทนได้แค่ 1 Disk ล้มเหลว | File Servers, NAS |
| **RAID 6** | Striping + Double Parity | 4 | ทนได้ 2 Disk ล้มเหลวพร้อมกัน | เขียนช้ากว่า RAID 5 | Mission-Critical Servers |
| **RAID 10** | Mirroring + Striping | 4 | เร็วเหมือน RAID 0 + Redundancy เหมือน RAID 1 | ราคาแพง เสียพื้นที่ 50% | High-Traffic DB Servers |

```text
แนวคิด RAID โดยสังเขป:

RAID 0:  [A1][A2] + [B1][B2]  → Speed, No Safety
RAID 1:  [A1][A1]             → Mirror = Safety, 50% Space Lost
RAID 5:  [A1][A2][P]          → Parity ช่วย Rebuild ถ้า 1 Disk ล้ม
RAID 10: [A1][A1] + [B1][B1]  → 2 คู่ Mirror แล้ว Stripe ข้ามคู่
```

> **ตัวอย่างจริง:** Production Database Server ที่มีข้อมูลธุรกรรมทางการเงิน มักใช้ RAID 10 เพราะต้องการทั้ง Speed (รองรับ IOPS สูง) และ Redundancy (ข้อมูลห้ามหาย) แม้จะแพงกว่าก็ตาม

---

### 2.3 Data Storage Formats

**2 รูปแบบหลักในการจัดเก็บข้อมูล:**

#### A. Files (ไฟล์)
**File** คือลำดับ Byte ที่จัดระเบียบเป็น Block ที่เครื่องเข้าใจได้ — เก็บข้อมูลที่เกี่ยวข้องกันใน Secondary Storage

**2 วิธีการเข้าถึงไฟล์:**

| วิธี | กลไก | เหมาะกับ | ไม่เหมาะกับ |
|---|---|---|---|
| **Sequential Access** | อ่าน/เขียนตามลำดับ เริ่มต้นจากหัวไฟล์ทุกครั้ง | Report Writing, Backup, Log Processing | การค้นหาหรืออัปเดต Record เฉพาะ |
| **Random Access (Direct Access)** | เข้าถึง Record ใดก็ได้โดยตรงผ่าน Index | Search, Update เฉพาะ Record | Report Writing (อ่านทั้งหมด) |

```text
Sequential Access:
Record1 → Record2 → Record3 → ... → RecordN
(ต้องผ่านทุก Record จนถึงตัวที่ต้องการ)

Random Access (with Index):
Index: RecordID=42 → Disk Block 7, Offset 512
Direct Jump → Record42
(ข้ามไปได้เลยโดยไม่ต้องอ่านทั้งหมด)
```

> **ตัวอย่างจริง:** ไฟล์ Log ของ Web Server เหมาะกับ Sequential Access (อ่านทีเดียวทั้งหมดเพื่อ Analysis) ส่วน File ที่ต้องการ Look up ตาม ID เหมาะกับ Random Access

#### B. Database (ฐานข้อมูล)
**Database** คือกลุ่มข้อมูลที่มีความสัมพันธ์กัน จัดการโดย **DBMS (Database Management System)**

**Relational Database:**
- เก็บข้อมูลในรูปแบบ **ตาราง (Table)**
- **Primary Key:** ระบุ Row ได้ไม่ซ้ำกัน
- **Foreign Key:** สร้างความสัมพันธ์ระหว่าง Table
- รองรับ **Referential Integrity**
- ใช้ **SQL** ในการเข้าถึงข้อมูล
- สามารถ **JOIN** ตารางเพื่อดึงข้อมูลที่ตรงกัน

**NoSQL Database:**
- ออกแบบสำหรับ Unstructured / Semi-structured Data
- Schema ยืดหยุ่น
- Horizontal Scalability สูง
- **ข้อดี:** Elastic Scaling, รองรับ Big Data, ใช้ Commodity Servers ราคาถูก
- เรียกอีกชื่อว่า "**Not Only SQL**"

---

### 2.4 Selecting Persistence Format

ไม่มี Format ใดดีที่สุดในทุกสถานการณ์ — ทีมมักเลือกใช้ **หลาย Format** ร่วมกัน

**ปัจจัยในการเลือก:**
1. **Data Types** — ข้อมูลเป็น Structured, Semi-structured, หรือ Unstructured?
2. **Type of Application** — OLTP, OLAP, Real-time, Batch?
3. **Existing Storage Formats** — มีระบบเดิมที่ต้องรองรับอยู่ไหม?
4. **Future Needs** — Data จะโตแค่ไหน? ต้องการ Scalability แบบไหน?

**ประเภทของ Physical Storage Network:**

| ประเภท | ย่อว่า | ลักษณะ | เหมาะกับ |
|---|---|---|---|
| **Direct-Attached Storage** | DAS | ต่อตรงกับเครื่อง Server | Single Server, Low Cost |
| **Network-Attached Storage** | NAS | ต่อผ่าน Network (File-level) | File Sharing, SMB/NFS |
| **Storage Area Network** | SAN | Network ความเร็วสูงเฉพาะสำหรับ Storage (Block-level) | High-Performance DB, Enterprise |

**เกณฑ์เลือก Physical Storage:**

| เกณฑ์ | คำถาม |
|---|---|
| Capacity | ต้องเก็บข้อมูลระดับ GB, TB, PB? File-level หรือ Block-level? |
| Performance | I/O Operations per Second (IOPS) และ Throughput ที่ต้องการ? |
| Scalability | Data จะโตแค่ไหนในอีก 3-5 ปี? |
| Availability & Reliability | Mission-Critical แค่ไหน? ยอมรับ Downtime ได้ไหม? |
| Data Protection | Backup/Recovery Plan เป็นอย่างไร? RTO/RPO คืออะไร? |
| Resource Availability | มีทีม IT ดูแลได้ไหม? |
| Budget | งบประมาณเท่าไหร่? CapEx vs. OpEx? |

---

## Part 3: Applied Techniques

### 3.1 Optimizing Data Storage

หลังจากเลือก Storage Format แล้ว ต้อง **Optimize** ใน 2 มิติหลัก:

#### A. Optimizing Storage Efficiency (ประสิทธิภาพการเก็บ)

**Normalization** คือกระบวนการลด **Redundant Data** และ **NULL Values** ให้เหลือน้อยที่สุด โดยแบ่งตารางออกตามหลักการ Dependency

**Normal Forms (จาก Unnormalized → สมบูรณ์ที่สุด):**

| Normal Form | หลักการหลัก | ปัญหาที่แก้ |
|---|---|---|
| **UNF** | ยังไม่ได้ Normalize | ข้อมูลซ้ำซ้อนมาก |
| **1NF** | ทุก Cell มีค่าเดียว (Atomic), มี Primary Key | Repeating Groups |
| **2NF** | ผ่าน 1NF + ทุก Non-Key Attribute ขึ้นกับ Primary Key ทั้งหมด | Partial Dependency |
| **3NF** | ผ่าน 2NF + Non-Key Attribute ไม่ขึ้นกับ Non-Key Attribute อื่น | Transitive Dependency |
| **BCNF** | ทุก Determinant ต้องเป็น Candidate Key | รูปแบบพิเศษของ 3NF |
| **4NF+** | จัดการ Multi-valued Dependencies และ Join Dependencies | ความซับซ้อนสูง |

> **ตัวอย่างการ Normalize:**
> ```
> UNF Table: Orders (OrderID, CustomerName, CustomerEmail, Product1, Product2, Product3)
>
> 1NF: Orders (OrderID, CustomerName, CustomerEmail, ProductID)
>      → แยก Product ออกเป็นแถวๆ
>
> 2NF: Orders (OrderID, CustomerID)
>      Customers (CustomerID, CustomerName, CustomerEmail)
>      OrderItems (OrderID, ProductID)
>      → แยก Customer Info ออก ไม่ให้ขึ้นกับแค่ OrderID บางส่วน
>
> 3NF: เพิ่ม Products (ProductID, ProductName, Price)
>      → ไม่ให้ ProductName ขึ้นกับ ProductID แบบ Transitive
> ```

#### B. Optimizing Data Access Speed (ความเร็วในการเข้าถึง)

**3 เทคนิคหลัก:**

**1. De-normalization (การยกเลิก Normalize บางส่วน)**
- Table JOIN ต้องใช้ Processing สูง
- เพิ่ม Redundant Data บางส่วนในตารางเพื่อลดจำนวน JOIN ที่จำเป็น
- ใช้ **อย่างระมัดระวัง** เพราะสร้าง Redundancy — เหมาะสำหรับ Read-heavy Systems

> **ตัวอย่าง:** เพิ่ม `customer_name` ลงใน `orders` table แทนที่จะ JOIN กับ `customers` ทุกครั้ง — เหมาะถ้า Query นี้ทำบ่อยมาก แต่ต้องดูแล Consistency เอง

**2. Clustering (การจัดกลุ่มข้อมูล)**
- จัดวาง Record ที่เกี่ยวข้องกันให้อยู่ใกล้กันบน Disk (ใน Physical Block เดียวกัน)
- ลดจำนวน Disk I/O ที่ต้องทำในแต่ละ Query
- เช่น Clustered Index ใน SQL Server / MySQL InnoDB

**3. Indexing (การทำ Index)**
- **Index** คือไฟล์เล็กๆ ที่เก็บ `(Attribute Value → Pointer ไปยัง Record บน Disk)`
- ค้นหา Index ใน Memory (เร็ว) แทนการ Scan ทั้ง Disk (ช้า)
- เหมาะสำหรับ Column ที่ใช้ใน WHERE, JOIN, ORDER BY บ่อย

```text
Index Structure (B-Tree ตัวอย่าง):

Column: CustomerID
┌──────────────────────────────────┐
│ Index File (ใน Memory/SSD)        │
│  CustomerID=101 → Block 5, Off 0 │
│  CustomerID=102 → Block 5, Off 64│
│  CustomerID=103 → Block 7, Off 0 │
└──────────────────────────────────┘
         ↓ Pointer
┌──────────────────────────────────┐
│ Disk: Block 5                    │
│  [Record: CustID=101, ...]       │
│  [Record: CustID=102, ...]       │
└──────────────────────────────────┘
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