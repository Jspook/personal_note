# Database - Project 1: End-to-End Data Platform (E-commerce)

> **วิชา:** 06066300 Database System Concept | **สถาบัน:** (ระบุสถาบันของคุณ)
> **Source:** `AIOS/03 Projects/Data Projects/01-end-to-end-data-platform/.vibe-wise/` (3 ไฟล์: `profile.md`, `progress.md`, `project-map.md`)

---

## Part 1: Macro Architecture & Overview

โปรเจกต์นี้คือ **Data Platform** สำหรับ e-commerce ที่ใช้ **Medallion Architecture** แบ่งข้อมูลเป็น 3 ชั้น คือ Bronze (ข้อมูลดิบ เก็บประวัติครบ), Silver (ข้อมูลที่ทำความสะอาดแล้ว) และ Gold (Star Schema พร้อมให้ BI ใช้) โดยมี **Apache Airflow** เป็นตัวสั่งงาน, **dbt** แปลงข้อมูลด้วย SQL, **MinIO** เป็นที่เก็บไฟล์แบบ S3 และ **Metabase** แสดง Dashboard ทั้งหมดรันบน Docker Compose ตอนนี้ฝั่ง Ingestion (Bronze) เริ่มมีโค้ดแล้ว ส่วน Airflow, dbt, data quality และ Metabase ยังไม่เริ่ม

### 1.1 Pipeline ภาพรวม

```mermaid
flowchart LR
    A[Source Data<br/>CSV initial + incremental] -->|Ingestion Python| B[(MinIO<br/>Bronze files)]
    B -->|Airflow + loader| C[(PostgreSQL<br/>Bronze tables)]
    C -->|dbt| D[(Silver<br/>1 แถวต่อ order)]
    D -->|dbt| E[(Gold<br/>Star Schema)]
    E -->|SQL| F[Metabase Dashboard]
```

### 1.2 Star Schema (Gold layer)

```mermaid
erDiagram
    fact_sales }o--|| dim_customer : customer_key
    fact_sales }o--|| dim_product : product_key
    fact_sales }o--|| dim_store : store_key
    fact_sales }o--|| dim_date : date_key
    fact_sales {
        int order_id
        int quantity
        decimal unit_price
        decimal discount
        decimal revenue
        decimal cost
        decimal profit
    }
```

### ตารางเปรียบเทียบ Medallion Layers

| Layer | เก็บอะไร | รูปแบบ | ใช้ทำอะไร |
| :--- | :--- | :--- | :--- |
| **Bronze** | ข้อมูลดิบทุก batch ไม่แก้ไข | ไฟล์ใน MinIO + ตาราง Postgres (append) | ต้นทางความจริง ย้อนตรวจสอบได้ |
| **Silver** | ข้อมูลสะอาด 1 แถวต่อ order | ตาราง dbt model | ฐานให้ชั้น Gold |
| **Gold** | Fact + Dimension | Star Schema | Query จาก BI เร็ว |

### ตารางเทคโนโลยีและสถานะ

| ส่วน | เทคโนโลยี | สถานะ |
| :--- | :--- | :--- |
| Container | Docker Compose | ✅ ตั้งแล้ว |
| Storage | MinIO, PostgreSQL | ✅ ตั้งแล้ว |
| Ingestion | Python (Bronze loader) | 🔄 มีโค้ด ยังไม่ยืนยันด้วยการรัน |
| Orchestration | Airflow | ❌ ยังไม่เริ่ม |
| Transformation | dbt (Silver/Gold) | ❌ ยังไม่เริ่ม |
| Data quality / BI / CI-CD | dbt tests, Metabase | ❌ ยังไม่เริ่ม |

---

## Part 2: Module-by-Module Deep Dive

### 2.0 คำศัพท์พื้นฐาน (อ่านก่อน Part 2)

> ส่วนนี้ตอบคำถามที่เคยติดไว้ทั้งหมด เรียงตามลำดับที่ศัพท์ปรากฏในเนื้อหา แต่ละหัวข้อมี 5 ขั้น: analogy → นิยาม → ทำไมสำคัญในโปรเจกต์นี้ → ตัวอย่างถูก/ผิด → คำถามเช็ค

#### 2.0.1 Container vs Volume

* **Container** คือกล่องที่รัน process อยู่ เปิดแล้วปิดได้
* **Volume** คือที่เก็บข้อมูลที่แยกออกจาก container เก็บข้อมูลต่อให้ container ถูกลบ
* `docker compose down` หยุดและลบ container แต่ **ไม่ลบ** volume
* `docker compose down -v` หยุดและลบ **ทั้ง volume** ข้อมูลในนั้นหายหมด

**ทำไมสำคัญ:** Postgres และ MinIO เก็บข้อมูลไว้ใน volume ถ้า `down -v` ข้อมูลที่โหลดไว้จะหาย ต้องรัน loader ใหม่

**คำถามเช็ค:** ถ้าสั่ง `docker compose down` แล้ว `up -d` ตามมา ข้อมูลใน Postgres ยังอยู่ไหม? แล้วถ้าเป็น `down -v` ล่ะ?

#### 2.0.2 Object Storage

**Analogy:** ตู้ล็อกเกอร์ทุกช่องมีป้ายชื่อของตัวเอง เราไม่ต้องรู้ว่าช่องอยู่ชั้นไหน ขอแค่ป้ายชื่อก็หยิบของได้

**นิยาม:** ระบบเก็บไฟล์ที่ไม่มีโครงสร้างโฟลเดอร์จริง ทุกไฟล์เรียกว่า **object** เก็บใน **bucket** และระบุตำแหน่งด้วย **key** ซึ่งเป็นข้อความยาว ๆ ตัวเดียว MinIO ทำงานแบบ S3 หรือ S3-compatible

**ความจริงเรื่อง `/`:** key อย่าง `batch_date=2026-10-16/orders.csv` คือข้อความทั้งก้อน `/` เป็นแค่อักขระตัวหนึ่ง ไม่ได้สร้างโฟลเดอร์จริง หน้าจอ MinIO แสดงเป็นโฟลเดอร์เพื่อความสะดวกเท่านั้น

**ทำไมสำคัญ:** ไฟล์ CSV ที่ loader อ่านเข้ามาอยู่ใน MinIO เป็น object และ key คือสิ่งที่ loader ใช้อ้างอิงไฟล์

| ตัวอย่าง | ถูก/ผิด | เหตุผล |
| :--- | :--- | :--- |
| ค้นหาด้วย key `batch_date=2026-10-16/orders.csv` | ✅ ถูก | key ตรงทั้งก้อน |
| สร้าง "โฟลเดอร์" ก่อนแล้วค่อยใส่ไฟล์ | ❌ ผิด | ไม่มีโฟลเดอร์จริงให้สร้าง ใส่ key ตรง ๆ ได้เลย |

**คำถามเช็ค:** ถ้าไฟล์ชื่อ `a/b/c.csv` แต่ไม่มีโฟลเดอร์ `a/` อยู่จริง ทำไมยังเปิดไฟล์ได้?

#### 2.0.3 Orchestrator และ DAG

**Orchestrator** คือตัวจัดลำดับและสั่งงาน มันไม่ประมวลผลข้อมูลเอง

**Analogy:** วาทยากร (conductor) บอกให้เครื่องดนตรีแต่ละชิ้นเล่นเมื่อถึงคิว แต่ตัววาทยากรไม่ได้เป่าแตร

**DAG** (Directed Acyclic Graph) คือกราฟที่แต่ละ task เป็นจุด และลูกศรบอก dependency ว่า task ไหนต้องจบก่อน
* *Directed* = ลูกศรมีทิศทาง
* *Acyclic* = ไม่มีวงวน ไม่กลับไปจุดเดิม

**ทำไมสำคัญ:** Airflow ใช้ DAG เป็นแผนงาน `a >> b` หมายถึง b เริ่มก็ต่อเมื่อ a สำเร็จ

| ตัวอย่าง | ถูก/ผิด | เหตุผล |
| :--- | :--- | :--- |
| ให้ Airflow รัน `SELECT ... FROM orders` เอง | ❌ ผิด | Airflow สั่งงาน ไม่ประมวลผล งานนี้ควรอยู่ใน loader หรือ dbt |
| `validate >> load` | ✅ ถูก | Airflow รับผิดชอบลำดับ ไม่ได้ทำงานเอง |

**คำถามเช็ค:** ถ้า `A >> B` และ `B >> A` อยู่ในไฟล์เดียวกัน DAG นี้ผิดในแง่ไหน?

#### 2.0.4 Loader

**Loader** คือโปรแกรมที่ย้ายข้อมูลจากต้นทางเข้าปลายทาง ในโปรเจกต์นี้คือ Python ที่อ่าน CSV แล้วส่งเข้า MinIO และ Postgres Bronze

**ทำไมสำคัญ:** loader เป็นตัวที่เขียนข้อมูลและ ledger ดังนั้นความปลอดภัยเมื่อรันซ้ำจึงขึ้นกับ loader โดยตรง (ดู 2.0.5 ถึง 2.0.7)

**คำถามเช็ค:** ในสถาปัตยกรรมนี้ ใครเป็นคนเขียน CSV เข้า MinIO: Airflow หรือ loader?

#### 2.0.5 Ledger

**Ledger** คือตารางบันทึกว่า batch ไหนโหลดแล้วบ้าง

**Analogy:** สมุดเช็คชื่อหน้าห้อง ก่อนโหลด batch ให้เปิดสมุดดูก่อนว่าชื่อนี้เคยถูกโหลดหรือยัง ถ้าเคยแล้วก็ข้าม ถ้ายังไม่เคยก็โหลดแล้วจดชื่อลงสมุด

**ตัวอย่าง:** ตาราง `bronze.load_ledger` ใน 2.2 เก็บ `batch_key`, `source_file`, `row_count`, `loaded_at`

| ตัวอย่าง | ถูก/ผิด | เหตุผล |
| :--- | :--- | :--- |
| เปิด ledger เห็นว่า batch `2026-10-16` มีแล้ว แล้วข้ามไป | ✅ ถูก | นี่คือการกันโหลดซ้ำ |
| โหลดทุกครั้งโดยไม่เปิด ledger | ❌ ผิด | ได้แถวซ้ำทุกครั้งที่รัน |

**คำถามเช็ค:** ถ้า ledger บอกว่า batch 2 โหลดแล้ว แต่ข้อมูลของ batch 2 ไม่อยู่ในตาราง Bronze เลย จะเกิดอะไรขึ้นตอนรันซ้ำ?

#### 2.0.6 Idempotency

**Idempotency** คือคุณสมบัติที่รันกี่ครั้งผลลัพธ์ก็เหมือนรันครั้งเดียว

**Analogy:** กดปุ่มชั้น 5 ของลิฟต์หลายครั้ง ลิฟต์ก็ไปชั้น 5 เท่าเดิม นี่คือ idempotent

| ตัวอย่าง | ถูก/ผิด | เหตุผล |
| :--- | :--- | :--- |
| `DELETE` แล้ว `INSERT` ข้อมูลชุดเดิมซ้ำ | ✅ idempotent | ผลสุดท้ายเหมือนเดิมทุกรอบ |
| `INSERT` ข้อมูลชุดเดิมซ้ำโดยไม่เช็ค | ❌ ไม่ idempotent | ได้แถวซ้ำเพิ่มทุกรอบ |
| ปุ่ม "เพิ่ม 1 ชั้น" กดสองครั้ง | ❌ ไม่ idempotent | เลขชั้นเปลี่ยนทุกครั้งที่กด |

**ทำไมสำคัญ:** Airflow retry task ที่ล้มได้ ถ้า task ไม่ idempotent การ retry จะทำให้ข้อมูลเสีย

**คำถามเช็ค:** ทำไมการ `INSERT` ธรรมดาไม่ idempotent แต่ `INSERT ... ON CONFLICT DO NOTHING` ที่มี primary key ถึง idempotent?

#### 2.0.7 Incremental (Load)

**Incremental** คือการโหลดเฉพาะข้อมูลที่ใหม่หรือเปลี่ยนไป ไม่โหลดทั้งชุดซ้ำทุกครั้ง

**ตรงข้ามกับ:** Full load ที่โหลดทั้งชุดทุกครั้ง

**ในโปรเจกต์นี้:** มี `orders.csv` สองชุด ชุดแรกคือ initial ชุดที่สองคือ incremental ที่มีข้อมูลใหม่มาเพิ่ม

| ตัวอย่าง | ถูก/ผิด | เหตุผล |
| :--- | :--- | :--- |
| โหลดเฉพาะ `orders.csv` ชุดที่มีข้อมูลใหม่ | ✅ incremental | โหลดเฉพาะส่วนที่ต่างจากที่มีอยู่ |
| โหลด initial กับ incremental ซ้ำทั้งชุดทุกครั้ง | ❌ full load | ใช้เวลามากขึ้นและอาจได้แถวซ้ำ |

**คำถามเช็ค:** ถ้า ledger ใช้ชื่อไฟล์เป็น key แล้ว incremental ถูกข้ามไป เป็นเพราะ incremental ทำงานผิดหรือ key ผิด?

#### 2.0.8 Batch Key

**Batch key** คือค่าที่แยกแต่ละชุดข้อมูล (batch) ออกจากกัน ต้องต่างกันจริงระหว่าง batch

**ทำไมชื่อไฟล์ใช้ไม่ได้:** initial กับ incremental ชื่อ `orders.csv` เหมือนกัน ledger จะเห็นว่าเคยโหลดแล้วและข้าม batch ใหม่ไป (ดู 2.2)

#### 2.0.9 Hash

**Hash** คือฟังก์ชันที่รับข้อมูลเข้าไปแล้วให้ค่าสั้นและคงที่ออกมา เช่น `sha256(file)`

**Analogy:** ลายนิ้วมือของไฟล์ ไฟล์เดียวกันได้ลายนิ้วมือเดียวกันเสมอ

* ไฟล์เดิมทุกไบต์ → hash เดิม
* แก้แค่ 1 ตัวอักษร → hash เปลี่ยนทั้งหมด

**ทำไมสำคัญ:** hash ใช้เป็น batch key ได้ แต่แลกมาด้วยข้อจำกัดว่าไฟล์เดิมที่ถูกแก้ไขนิดเดียวจะถูกมองเป็น batch ใหม่

**คำถามเช็ค:** ถ้า `orders.csv` ถูกเปิดแล้วบันทึกใหม่โดยแค่เปลี่ยนลำดับบรรทัด hash จะเปลี่ยนไหม?

#### 2.0.10 Run ID และ Logical Date (Airflow)

* **Run ID** คือ ID เฉพาะของการรัน DAG หนึ่งครั้ง รันใหม่ก็ได้ ID ใหม่
* **Logical date** (`ds`) คือค่าเวลาที่ Airflow กำหนดให้ run นั้น ซึ่งมักใช้แทน "ช่วงข้อมูลที่ run นี้ต้องประมวลผล" ไม่ใช่เวลาที่กดรันจริง

**ทำไมสำคัญ:** ทั้งสองค่าผูกกับ scheduler ของ Airflow ถ้า batch key ผูกกับค่านี้ การ backfill หรือรันด้วยมือจะให้ค่าต่างจากที่คาด

**คำถามเช็ค:** ถ้า DAG รันวันที่ 2026-10-20 แต่ logical date เป็น 2026-10-19 ข้อมูลที่ถูกประมวลผลควรเป็นของวันไหน?

---

### 2.1 สิ่งที่เข้าใจแล้ว

* **Container vs Volume:** รายละเอียดอยู่ใน 2.0.1
* **Object storage:** รายละเอียดอยู่ใน 2.0.2
* **Airflow:** เป็น **Orchestrator** ไม่ประมวลผลข้อมูลเอง รายละเอียดอยู่ใน 2.0.3
* **เหตุผลแยก task:** รู้จุดล้มเหลว รันซ้ำเฉพาะขั้นนั้นได้ ขั้นนั้นต้องรันซ้ำได้อย่างปลอดภัย
	* **Replace vs Ledger:** replace รันซ้ำปลอดภัยแต่ไม่เก็บประวัติ ซึ่งขัดกับเป้าหมาย Bronze ส่วน **ledger** ใช้กันโหลดซ้ำได้ (ดู 2.0.5)

| เคยคิด                                   | ความจริง                                             |
| :--------------------------------------- | :--------------------------------------------------- |
| `up -d` หลัง `down -v` โหลดข้อมูลกลับเอง | สร้างแค่ container + volume ว่าง ต้องรัน loader ใหม่ |
| มี CSV แล้วไม่ต้องรัน loader             | CSV เป็นข้อมูลนำเข้า ไม่ใช่ตัวทำงาน                  |
| PROJECT_INSTRUCTION มีโค้ดครบแล้ว        | `validate_raw_data` ยังไม่มีโค้ด                     |

**Decisions ที่ตัดสินแล้ว:** ADR 008 Regenerate over Backup (ข้อมูลสร้างซ้ำได้ จึงไม่ backup ออกนอกเครื่อง, ยังไม่ commit), Bronze เปลี่ยนจาก replace เป็นแบบเก็บประวัติ, Idempotency ด้วย ledger (ดู 2.0.5 และ 2.0.6)

---

### 2.2 Open #1: Batch key แยก `orders.csv` initial กับ incremental

> ไฟล์ชื่อเหมือนกัน ledger จึงใช้ชื่อไฟล์เป็นกุญแจไม่ได้ ไม่งั้น incremental จะถูกมองว่า "เคยโหลดแล้ว" แล้วถูกข้าม

**แนวคิด:** batch key ต้องเป็น "ค่าที่ต่างกันจริงระหว่างสองชุด" ตัวเลือก:

| ตัวเลือก | ตัวอย่าง | จุดอ่อน |
| :--- | :--- | :--- |
| Prefix/โฟลเดอร์ใน MinIO | `batch_date=2026-10-16/orders.csv` | ต้องวางไฟล์ให้ถูกที่เอง |
| ช่วงเวลาข้อมูล | min/max `order_date` | batch ซ้อนช่วงกันได้ |
| Hash ของเนื้อไฟล์ | `sha256(file)` | ไฟล์เดียวกันแก้นิดเดียว hash เปลี่ยน |
| Run id / logical date ของ Airflow | `ds` | ผูกกับ scheduler |

```sql
-- ตัวอย่าง ledger: batch_key ต้องไม่ซ้ำ (กันโหลดซ้ำด้วย constraint)
CREATE TABLE bronze.load_ledger (
    batch_key   TEXT PRIMARY KEY,   -- ค่าที่แยก batch ได้จริง
    source_file TEXT NOT NULL,
    row_count   INT  NOT NULL,
    loaded_at   TIMESTAMP DEFAULT now()
);
```

**ลองตอบ:** เปิด `orders.csv` ทั้งสองชุด เทียบ min/max `order_date` และจำนวนแถว แล้วเลือก 1 ตัวพร้อมบอกว่ากรณีไหนที่ตัวเลือกนั้นพัง

> 💡 **Hint:**
> - ลองเปิดไฟล์ทั้งสองแล้วดูว่า min/max `order_date` ของชุดไหนซ้อนกันบ้าง
> - ตัวเลือกแต่ละตัวพังเมื่อไร ดูคอลัมน์ "จุดอ่อน" ในตาราง แล้วคิดว่าสถานการณ์ไหนทำให้จุดอ่อนนั้นเกิดขึ้นจริง
> - ตัวเลือกที่ต้องพึ่งคนวางไฟล์ให้ถูกที่ จะพังเมื่อคนวางผิดหรือไม่ได้วาง

---

### 2.3 Open #2: ลำดับเขียนข้อมูลกับ ledger เมื่อล้มกลางทาง

> ต้องเขียน 2 อย่าง (ข้อมูล + ledger) ถ้าล้มระหว่างกลาง สถานะจะไม่ตรงกัน

```mermaid
sequenceDiagram
    participant L as Loader
    participant B as Bronze table
    participant G as Ledger
    Note over L,G: ลำดับ A: เขียนข้อมูลก่อน
    L->>B: INSERT batch 2
    Note over L: 💥 ล้ม
    L--xG: ไม่ได้บันทึก ledger
    Note over B,G: รันซ้ำ: ledger ว่าง จึงโหลดอีก ⇒ แถวซ้ำ
```

```mermaid
sequenceDiagram
    participant L as Loader
    participant B as Bronze table
    participant G as Ledger
    Note over L,G: ลำดับ B: บันทึก ledger ก่อน
    L->>G: INSERT batch 2
    Note over L: 💥 ล้ม
    L--xB: ไม่ได้เขียนข้อมูล
    Note over B,G: รันซ้ำ: ledger บอกว่าโหลดแล้ว จึงข้าม ⇒ ข้อมูลหาย
```

**ทางออก:**
* **Transaction (atomicity):** ทำสองอย่างใน transaction เดียวของ PostgreSQL ล้มแล้ว rollback ทั้งคู่ (เชื่อม Chapter 07)
* ledger มีสถานะ `started` / `completed` แล้วรันซ้ำล้าง batch ที่ค้าง `started` ก่อน
* โหลดลง staging แล้ว insert + บันทึก ledger ใน transaction เดียว

```sql
-- ข้อมูลกับ ledger อยู่ใน Postgres เดียวกัน จึงทำ atomic ได้
BEGIN;
  INSERT INTO bronze.orders SELECT * FROM staging.orders;   -- เขียนข้อมูล
  INSERT INTO bronze.load_ledger (batch_key, source_file, row_count)
  VALUES ('2026-10-16', 'orders.csv', 1000);                -- บันทึก ledger
COMMIT;  -- ล้มกลางทาง = ROLLBACK ทั้งสองอย่าง
```

**ลองตอบ:** ถ้าข้อมูลอยู่ใน MinIO แต่ ledger อยู่ใน Postgres ทำไมถึงทำ atomic ยากกว่า?

> 💡 **Hint:**
> - คำสั่ง `BEGIN ... COMMIT` ของ Postgres ควบคุมได้เฉพาะสิ่งที่อยู่ใน Postgres
> - ลองนึกว่า loader เขียนไฟล์เข้า MinIO สำเร็จแล้ว แต่ INSERT ลง Postgres ล้ม คำสั่ง ROLLBACK จะย้อนไฟล์ใน MinIO ได้ไหม
> - ดูคำว่า "ระบบภายนอก" ในหลักตัดสินจุดแบ่ง task ข้อ 2.4 ด้วย

---

### 2.4 Open #3: จุดแบ่ง Airflow task

> เลือกแล้วว่าแยก task แต่ยังไม่ระบุจุดแบ่ง

```mermaid
flowchart LR
    V[validate_raw_data] --> M[load_to_minio] --> P[load_to_postgres_bronze]
    P --> D[dbt_run_silver] --> T[dbt_test] --> G[dbt_run_gold]
```
*(ข้อเสนอเริ่มต้น ไม่ใช่คำตอบตายตัว)*

**หลักตัดสินจุดแบ่ง:** (1) task รันซ้ำได้ผลเดิม (idempotent) (2) ล้มแล้วรู้ชัดว่าที่ไหน (3) แยกตามระบบภายนอกที่ถูกเปลี่ยน (MinIO กับ Postgres)

```python
# ตัวอย่าง DAG แบบย่อ: แต่ละ task ทำสิ่งเดียวและรันซ้ำได้
with DAG("bronze_to_gold", schedule="@daily") as dag:
    validate = PythonOperator(task_id="validate_raw_data", python_callable=validate_raw_data)
    to_minio = PythonOperator(task_id="load_to_minio", python_callable=load_to_minio)
    to_pg    = PythonOperator(task_id="load_to_postgres_bronze", python_callable=load_bronze)
    validate >> to_minio >> to_pg   # >> คือ dependency (ต้องจบก่อนถึงเริ่ม)
```

**`validate_raw_data` ควรตรวจอะไร (ระบุให้เจาะจง):** จำนวนแถว, คอลัมน์ที่ต้องมีครบ, key ซ้ำ, ค่าว่างในคอลัมน์สำคัญ

**ลองตอบ:** ถ้า `load_to_postgres_bronze` ล้ม แล้ว retry ทำไมไม่ควรไปโหลด MinIO ซ้ำ?

> 💡 **Hint:**
> - ตอนล้มแล้ว retry Airflow รันเฉพาะ task ที่ล้ม หรือรันทั้ง DAG ใหม่ตั้งแต่ต้น
> - ถ้า `load_to_minio` ถูกรันซ้ำ ผลที่ได้ใน MinIO จะเหมือนเดิมหรือเปลี่ยน (ดูข้อ (1) ในหลักตัดสิน)
> - ถ้า task นั้นไม่จำเป็นต้องรันซ้ำ เหตุผลนั้นคืออะไร และการแยก task ช่วยเรื่องนี้อย่างไร

---

### 2.5 Open #4: Silver เลือกค่าล่าสุดของ order ที่มีหลายแถว

> Bronze เก็บประวัติ order เดียวจึงมีหลายแถว Silver ต้องเหลือ 1 แถวต่อ order

```mermaid
flowchart TB
    subgraph Bronze
      R1["order 101 / pending / batch 1"]
      R2["order 101 / shipped / batch 2"]
    end
    Bronze -->|"ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY ... DESC) = 1"| S["Silver: order 101 / shipped"]
```

```sql
-- เลือกแถวล่าสุดต่อ order_id (dedup)
SELECT * FROM (
  SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY order_id        -- กลุ่มเดียวกัน = order เดียวกัน
           ORDER BY loaded_at DESC      -- หรือ updated_at: เลือกให้ตรงเจตนา
         ) AS rn
  FROM bronze.orders
) t
WHERE rn = 1;
```

**ข้อควรระวัง:** `loaded_at` (เวลาโหลด) กับ `updated_at` (เวลาแก้จริงจากต้นทาง) ให้ผลต่างกันเมื่อข้อมูลมา **out-of-order / late-arriving** และถ้า timestamp เท่ากันต้องมี tie-breaker ใน dbt ใช้ incremental model + `unique_key` (upsert/merge) ได้

**ลองตอบ:** batch 2 โหลดทีหลังแต่มี `updated_at` เก่ากว่า batch 1 จะเลือกแถวไหน เพราะอะไร

> 💡 **Hint:**
> - ลองไล่ค่า `loaded_at` กับ `updated_at` ของทั้งสองแถวทีละค่า
> - ถ้า `ORDER BY loaded_at DESC` จะได้แถวไหนขึ้นก่อน และ `ORDER BY updated_at DESC` จะได้แถวไหนขึ้นก่อน
> - "ล่าสุด" ในโจทย์หมายถึงล่าสุดตามเวลาโหลด หรือล่าสุดตามเวลาที่แก้จริงจากต้นทาง

---

### 2.6 ศัพท์ที่ต้องรู้ต่อ (Terminology)

| หัวข้อ | Term | ความหมาย |
| :--- | :--- | :--- |
| Pipeline | **Idempotency** | รันกี่ครั้งผลก็เหมือนรันครั้งเดียว (ดู 2.0.6) |
| Pipeline | **Watermark** | ค่าที่จำว่าประมวลผลถึงไหนแล้ว (เช่น max `updated_at`) |
| Pipeline | **Upsert/Merge** | มีแล้วอัปเดต ไม่มีก็เพิ่ม |
| Pipeline | **Backfill** | รัน pipeline ย้อนหลังตามช่วงเวลา |
| Pipeline | **Late-arriving data** | ข้อมูลอดีตที่มาถึงช้า |
| Modeling | **Grain** | 1 แถวของตารางหมายถึงอะไร |
| Modeling | **Surrogate key** | key ที่ระบบสร้างเอง (ต่างจาก natural key ของธุรกิจ) |
| Modeling | **Fact / Dimension** | ตัวเลขที่วัด vs บริบทที่ใช้ slice |
| Quality | **Quality gate** | เกณฑ์ที่ต้องผ่านก่อนไปชั้นถัดไป |
| Quality | **dbt tests** | unique, not_null, accepted_values, relationships |
| Ops | **Regenerate vs Restore** | สร้างใหม่จาก seed vs กู้จาก backup |

**เชื่อมกับบทเรียนที่มี:** Chapter 07 (Transaction → ข้อ 2.3), Chapter 08 (DW/Star Schema → Gold), LAB 8-9 และ LAB 6-7 (SQL สำหรับ Silver/Gold), Les03 (ฟังก์ชันทำความสะอาดข้อมูล)

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญ
* [ ] **Medallion:** Bronze เก็บดิบ+ประวัติ, Silver สะอาด 1 แถวต่อ order, Gold Star Schema
* [ ] **Batch key:** ต้องเป็นค่าที่ต่างกันจริงระหว่าง batch ไม่ใช่ชื่อไฟล์
* [ ] **Ledger + ข้อมูล:** ต้อง atomic (transaction) ไม่งั้นเสี่ยงซ้ำหรือหาย
* [ ] **Airflow task:** แยกตามระบบที่เปลี่ยนสถานะ และแต่ละ task idempotent
* [ ] **Silver dedup:** `ROW_NUMBER() ... = 1` เลือก timestamp ให้ตรงเจตนา
* [ ] **Grain ของ `fact_sales`:** ตอบเป็นประโยคเดียวได้
* [ ] **`down -v`:** ลบ volume แล้วต้องรัน loader ใหม่

### ลำดับงานก่อนโค้ดขั้นต่อไป
* [ ] commit ADR 008
* [ ] ตัดสิน batch key และเขียนใน ADR
* [ ] ตัดสินลำดับ ledger / transaction
* [ ] ระบุจุดแบ่ง Airflow task ครบ
* [ ] ตัดสินกติกา dedup ของ Silver
* [ ] รัน Bronze loader จริงและบันทึกผล

### สรุป Notation / SQL สำคัญ

| Pattern | ความหมาย |
| :--- | :--- |
| `ROW_NUMBER() OVER (PARTITION BY k ORDER BY t DESC) = 1` | เลือกแถวล่าสุดต่อ key |
| `BEGIN; ... COMMIT;` | ทำหลายคำสั่งแบบ atomic |
| `a >> b` (Airflow) | b รันหลัง a สำเร็จ |

### Concept Map

```mermaid
flowchart LR
    ROOT[End-to-End Data Platform] --> ST[Storage<br/>MinIO / PostgreSQL]
    ROOT --> LS[Load strategy]
    ROOT --> OR[Orchestration<br/>Airflow DAG]
    ROOT --> TR[Transformation<br/>dbt]
    LS --> BK[Batch key]
    LS --> LG[Ledger + Transaction]
    LS --> ID[Idempotency]
    TR --> SV[Silver dedup latest]
    TR --> GD[Gold Star Schema]
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **"`up -d` หลัง `down -v` ข้อมูลจะกลับมาเอง":** ผิด สร้างแค่ container และ volume ว่าง ต้องรัน loader โหลดใหม่
* **"ใช้ชื่อไฟล์เป็น batch key":** ผิดเมื่อ initial กับ incremental ชื่อเหมือนกัน ledger จะข้าม incremental
* **"เขียน ledger ก่อนข้อมูลแล้วปลอดภัย":** ไม่ปลอดภัย ล้มกลางทางแล้ว ledger บอกว่าโหลดแล้วทั้งที่ข้อมูลไม่มา (ข้อมูลหาย) ต้องใช้ transaction
* **"Replace ดีเพราะรันซ้ำปลอดภัย":** รันซ้ำปลอดภัยจริง แต่ทับประวัติ ขัดเป้าหมาย Bronze
* **"Airflow ประมวลผลข้อมูลเอง":** ผิด Airflow เป็น orchestrator สั่งงานเท่านั้น
* **"`loaded_at` กับ `updated_at` ใช้แทนกันได้":** ไม่ได้เมื่อข้อมูลมาช้า/สลับลำดับ เลือกผิดจะได้ค่า "ล่าสุด" ผิดตัว
* **"ตอบว่า 'ตรวจความสมบูรณ์' ก็พอ":** กว้างเกินไป ต้องระบุว่าตรวจอะไร (จำนวนแถว คอลัมน์ key ซ้ำ ค่าว่าง)

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 07 Introduction to Transaction and Recovery]] (atomicity, rollback ใช้ตอบลำดับ ledger กับข้อมูลในข้อ 2.3)
  * [[Chapter 08 Introduction to Business Intelligence and Data Warehouse]] (Star Schema, Fact/Dimension, ETL ของชั้น Gold)
  * [[LAB 8 - SQL GROUP BY and Aggregate Functions]] (aggregate สำหรับ query ใน Gold/Metabase)
  * [[LAB 9 - SQL Subqueries]] (subquery ที่ใช้ในการ dedup Silver)
  * [[LAB 6 - SQL JOIN (Inner, Cross, Natural, Self)]] (join fact กับ dimension)
  * [[Les03 Single-Row Functions]] (ฟังก์ชันทำความสะอาดข้อมูลใน Silver)

* **แหล่งข้อมูล:**
  * Source: `AIOS/03 Projects/Data Projects/01-end-to-end-data-platform/.vibe-wise/` (3 ไฟล์)
