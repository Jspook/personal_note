# Data Engineer - Chapter 01: Data Collection

> **วิชา:** Road to Data Engineer 3.0 (R2DE 3.0) | **ผู้สอน:** DataTH
> **Source:** `Resources/Books/DataEngineer/1_Data_Collection.pdf` (39 slides)
> **หมายเหตุ:** ส่วนที่ติดป้าย `[เสริมนอกสไลด์]` คือความรู้ที่ผู้เขียนโน้ตเพิ่มเอง

---

## Part 1: Macro Architecture & Overview

ลองนึกถึง **ระบบประปา**: น้ำ (ข้อมูล) ต้องถูกสูบจากแหล่งน้ำ (Data Source) ผ่านท่อ (Pipeline) ผ่านการกรอง (Transform) แล้วไปเก็บที่ถังพัก (Staging / Destination) ก่อนส่งให้บ้านแต่ละหลัง Chapter 1 สอนว่า "ท่อ" นี้ออกแบบอย่างไร และเมื่อข้อมูลมาจากหลายแหล่งที่หน้าตาไม่เหมือนกัน เราจะ **Integrate** ให้เป็นชุดเดียวกันได้อย่างไร

```text
Data Source                  Data Pipeline                         Destination
┌──────────────┐   Extract   ┌────────────────────────┐   Load    ┌─────────────────┐
│ Database     │ ──────────► │ Staging Area           │ ────────► │ Data Lake /     │
│ API          │             │  Transform (clean,     │           │ Data Warehouse  │
│ Files        │             │  join, aggregate)      │           └─────────────────┘
└──────────────┘             └────────────────────────┘
        ETL  = E → T → L        ELT = E → L → T (transform ทีหลังที่ปลายทาง)
```

### ตารางเปรียบเทียบ ETL vs ELT vs Reverse ETL

| Feature | ETL | ELT | Reverse ETL |
| :--- | :--- | :--- | :--- |
| **ลำดับ** | Extract → Transform → Load | Extract → Load → Transform | Warehouse → ระบบปฏิบัติการ |
| **Transform ทำที่ไหน** | ระหว่างทาง (Staging) | ที่ปลายทาง (เช่น Warehouse) | - |
| **จุดเด่น** | ข้อมูลที่โหลดสะอาดแล้ว | เก็บข้อมูลดิบไว้ ยืดหยุ่น เร็วกับ Cloud DWH `[เสริมนอกสไลด์]` | ส่งผลวิเคราะห์กลับไปใช้งานจริง |
| **ตัวอย่าง** | สร้าง Pipeline ด้วย Python | โหลดไฟล์ลง BigQuery แล้วใช้ SQL แปลง | ส่ง Segment ลูกค้าไปที่ Tool การตลาด |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Data Pipeline คืออะไร และทำไมต้องมี

> **Data Pipeline** = ท่อลำเลียงข้อมูลจากแหล่งข้อมูล (Data Source) ไปยังปลายทาง

**ทำไมต้องมี (ตามสไลด์):**
* **Integration:** เป็นตัวกลางรวมข้อมูลจากหลายแหล่งเข้าด้วยกัน
* **Automation:** ทำให้ท่อทำงานอัตโนมัติ ไม่ต้องให้คนมานั่งดึงไฟล์ส่งอีเมลทุกวัน

**ตัวอย่าง:** ฝ่ายขายขอยอดขายรายวันทุกเช้า ถ้าไม่มี Pipeline คนต้อง export CSV ด้วยมือทุกวัน ถ้ามี Pipeline ข้อมูลถูกดึง สรุป และวางลง Dashboard ก่อนใครเข้างาน

---

### 2.2 องค์ประกอบ E, T, L

| ขั้น | ความหมาย | ตัวอย่างงาน |
| :--- | :--- | :--- |
| **E = Extract** | ดึงข้อมูลจาก Business Data / Customer Data / ระบบต้นทาง | `SELECT` จาก Database, เรียก API, อ่านไฟล์ |
| **T = Transform** | เปลี่ยนข้อมูลให้อยู่ในรูปที่ต้องการ หลากหลายรูปแบบ | ล้างค่าผิด, แปลงชนิดข้อมูล, Join, Aggregate |
| **L = Load** | นำข้อมูลจาก **Staging Area** เข้าสู่ระบบปลายทาง (Destination) | เขียนลง Data Lake / Warehouse |

> **Staging Area** คือพื้นที่พักข้อมูลชั่วคราวระหว่างทาง ก่อนโหลดเข้าปลายทางจริง ช่วยให้ถ้าขั้น Transform พลาด ไม่ต้องไปดึงจาก Source ใหม่ทุกครั้ง `[เหตุผลเสริมนอกสไลด์]`

#### ETL vs ELT ต่างกันอย่างไร

* **ETL:** Transform ก่อนโหลด ปลายทางได้ข้อมูลที่จัดแล้ว เหมาะเมื่อปลายทางไม่ได้แรงพอจะ Transform เอง หรือต้องตัดข้อมูลสำคัญ (เช่น PII) ก่อนเข้าระบบ `[เสริมนอกสไลด์]`
* **ELT:** โหลดข้อมูลดิบเข้าปลายทางก่อน แล้ว Transform ด้วยพลังของปลายทาง (นิยมกับ Cloud Data Warehouse ที่ประมวลผลขนาดใหญ่ได้เร็ว)

#### Reverse ETL

แนวคิดใหม่ ส่งข้อมูลที่รวบรวมและวิเคราะห์แล้วใน Warehouse **กลับ** ไปที่ Tool ต่างๆ เช่น CRM หรือระบบโฆษณา เพื่อให้ฝ่ายธุรกิจใช้งานทันที

---

### 2.3 Key Considerations / Trade-offs

สไลด์ระบุปัจจัยที่ต้องชั่งน้ำหนักเมื่อออกแบบ Pipeline โดยเริ่มจาก **Accuracy** (ความถูกต้องของข้อมูล) `[ปัจจัยอื่นที่ตามมาในสไลด์ ให้ตรวจดูที่ P.16 ในไฟล์ PDF]`

| ปัจจัยที่ควรชั่งน้ำหนัก | ตัวอย่างคำถามออกแบบ |
| :--- | :--- |
| **Accuracy** | ข้อมูลที่ได้ถูกต้องครบหรือไม่ |
| **Latency** `[เสริมนอกสไลด์]` | ข้อมูลต้องมาถึงเร็วแค่ไหน (วินาที หรือรายวัน) |
| **Cost** `[เสริมนอกสไลด์]` | จ่ายค่า Compute/Storage คุ้มกับคุณค่าหรือไม่ |

> หลักคิดแบบ DE: ไม่มี Pipeline ที่ "ดีที่สุด" มีแต่ "เหมาะกับโจทย์และงบที่สุด"

---

### 2.4 ประเภทของ Data Pipeline และการประมวลผล

#### การโหลดข้อมูล

| ประเภท | ความหมาย | ใช้เมื่อ |
| :--- | :--- | :--- |
| **Initial / Historical / Full Load** | โหลดข้อมูลทั้งหมด | ตั้งระบบครั้งแรก หรือข้อมูลน้อย |
| **Incremental Load** `[เสริมนอกสไลด์]` | โหลดเฉพาะส่วนที่เพิ่ม/เปลี่ยน | ข้อมูลใหญ่ ต้องการประหยัดเวลา |

#### ประเภทการประมวลผล (Processing)

| ประเภท | ความหมาย (ตามสไลด์) | ตัวอย่าง |
| :--- | :--- | :--- |
| **Batch** | Scheduled ดึงตามช่วงเวลาที่กำหนด | รายงานยอดขายรายวัน |
| **Streaming / Real-time** `[เสริมนอกสไลด์]` | ประมวลผลทันทีที่ข้อมูลเกิด | ตรวจจับธุรกรรมผิดปกติ |

#### เครื่องมือสร้าง Data Pipeline

สไลด์แบ่งเป็นกลุ่ม เช่น **Pre-built connectors** (เครื่องมือสำเร็จรูป ไม่ต้องเขียนโค้ด) และกลุ่มที่เขียนโค้ดเอง (เช่น Python) การเลือกขึ้นกับทักษะทีม งบ และความซับซ้อนของงาน (Fivetran, Airbyte ใน CH7)

---

### 2.5 Data Integration

> **Data Integration** = การนำข้อมูลจากหลายแหล่งมารวมเป็นข้อมูลชุดเดียวกัน ให้เห็นภาพรวมทั้งหมด

**แหล่งข้อมูลที่พบ:** Database, Data Warehouse, Data Lake, ไฟล์, **API** (ช่องทางให้โปรแกรมคุยกันได้ เช่น Python ดึงข้อมูลสภาพอากาศจาก API ของกรมอุตุนิยมวิทยา)

#### ประเภทหลักของ Data Integration

| ประเภท | ปัญหาที่แก้ | ตัวอย่าง |
| :--- | :--- | :--- |
| **Schema Integration** | โครงสร้างข้อมูลต่างกัน | ระบบ A เก็บ `full_name` เดียว ระบบ B แยก `first_name`, `last_name` |
| **Value Integration** | ค่าของข้อมูลเดียวกันไม่ตรงกัน | `M/F` vs `Male/Female` |

#### Schema Integration ทำอย่างไร

เข้าใจโครงสร้างในแต่ละแหล่ง (**Local Schema**) แล้วออกแบบ **Global Schema** กลางที่ทุกแหล่ง map เข้ามาได้

```text
Local Schema A (full_name)  ─┐
                              ├──► Global Schema (first_name, last_name) ──► Warehouse
Local Schema B (first, last) ─┘
```

ปัญหาที่พบ: **Structure Conflict** (โครงสร้างไม่เหมือนกัน เช่นระบบหนึ่งเก็บทุกอย่างในตารางเดียว อีกระบบแยกหลายตาราง)

#### Value Integration

ปัญหาหลัก: ข้อมูลเดียวกันแต่ค่าไม่เหมือนกัน เช่น เพศ, หน่วยเงิน, รูปแบบวันที่ ต้องกำหนด **มาตรฐานกลาง** แล้วแปลงทุกแหล่งให้ตรงกัน

```python
# [เสริมนอกสไลด์] ตัวอย่าง Value Integration: ทำให้ค่าเพศจาก 2 ระบบเป็นมาตรฐานเดียว
import polars as pl

df = pl.DataFrame({"gender": ["M", "F", "Male", "female"]})
df = df.with_columns(
    pl.col("gender").str.to_lowercase().replace_strict(
        {"m": "male", "male": "male", "f": "female", "female": "female"}
    ).alias("gender_std")  # ใช้ค่ากลางเดียวกันทั้งตาราง
)
print(df)
```

---

### 2.6 Workshop 1: Data Collection with Python

**โจทย์:** ดึงข้อมูลจาก Database (3 Tables ที่ทีมสอนแบ่งมาจาก Kaggle ตามสไลด์ Pre-Workshop) เป็นจุดเริ่มของ Mission

**เครื่องมือที่ใช้ตามสไลด์:**

| เครื่องมือ | จุดเด่น (ตามสไลด์) |
| :--- | :--- |
| **Polars** | DataFrame library หน้าตาและคำสั่งคล้าย Pandas แต่เร็วกว่า `[รายละเอียดเสริมนอกสไลด์: เขียนด้วย Rust]` |
| **DuckDB** | Database วิเคราะห์ข้อมูล ใช้งานได้ในโปรแกรมโดยไม่ต้องติดตั้ง Server `[เสริมนอกสไลด์]` |

```python
# [เสริมนอกสไลด์] ตัวอย่างแนวคิด ETL ขนาดเล็กด้วย DuckDB + Polars (ไม่ใช่โค้ดของ Workshop จริง)
import duckdb

con = duckdb.connect()                              # สร้าง DB ในหน่วยความจำ
con.execute("CREATE TABLE t AS SELECT * FROM read_csv_auto('transactions.csv')")  # E + L
df = con.execute("SELECT product_id, SUM(amount) AS total FROM t GROUP BY 1").pl()  # T แล้วส่งเป็น Polars
print(df)
```

**หลักการที่ Workshop ต้องการสอน:** ดึงข้อมูล (Extract) จากหลายแหล่งให้ครบ เก็บไว้เป็นรูปแบบที่ขั้นถัดไป ([[Chapter 02 - Data Cleansing with Spark]]) ใช้ต่อได้

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญ
* [ ] **Data Pipeline:** ท่อลำเลียงข้อมูล Source → Destination มี Integration + Automation
* [ ] **E/T/L:** Extract ดึง, Transform แปลง, Load ใส่ปลายทาง (ผ่าน Staging Area)
* [ ] **ETL vs ELT:** ต่างที่ลำดับและที่ที่ Transform
* [ ] **Reverse ETL:** ส่งข้อมูลจาก Warehouse กลับไป Tool ธุรกิจ
* [ ] **Batch vs Streaming:** ตามเวลา vs ทันที
* [ ] **Schema vs Value Integration:** โครงสร้างต่างกัน vs ค่าต่างกัน
* [ ] **Local Schema → Global Schema**

### สรุปแนวคิดสำคัญ

| คำ | ความหมาย |
| :--- | :--- |
| `E → T → L` | ETL แปลงก่อนโหลด |
| `E → L → T` | ELT โหลดก่อนแล้วแปลงที่ปลายทาง |
| `Local → Global Schema` | แก้ปัญหา Structure Conflict |

### Concept Map

```text
Data Collection
├── Data Pipeline (Integration, Automation)
│   ├── ETL / ELT / Reverse ETL
│   ├── Load: Full / Incremental
│   └── Processing: Batch / Streaming
└── Data Integration
    ├── Schema Integration (Local → Global, Structure Conflict)
    └── Value Integration (ค่าเดียวกัน แต่ต่างรูป)
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **"ETL กับ ELT เหมือนกัน แค่สลับตัวอักษร":** ต่างที่ **ที่ที่ Transform เกิดขึ้น** ซึ่งกระทบสถาปัตยกรรมและค่าใช้จ่าย
* **"Reverse ETL คือการย้อนกลับ Pipeline เดิม":** ไม่ใช่ เป็นการส่งผลจาก Warehouse ไปยังระบบปฏิบัติการอื่น
* **"โหลดทั้งหมดทุกครั้งง่ายสุดและดีสุด":** Full Load สิ้นเปลืองเมื่อข้อมูลใหญ่ ควรพิจารณา Incremental `[เสริมนอกสไลด์]`
* **"Schema Integration กับ Value Integration คืออย่างเดียวกัน":** อย่างแรกคือ "โครงสร้าง" อย่างหลังคือ "ค่าข้างใน"
* **"ดึงข้อมูลเสร็จก็จบ":** ต้องคิดเรื่อง Accuracy และความพร้อมของข้อมูลสำหรับขั้นถัดไปด้วย

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 00 - Intro to Data Engineering]] (พื้นฐาน Data Types, Storage ที่ Pipeline ต้องเชื่อม)
  * [[Chapter 02 - Data Cleansing with Spark]] (ขั้น Transform: ล้างข้อมูลหลังดึงมา)
  * [[Chapter 04 - Data Pipeline Orchestration with Airflow]] (ทำให้ Pipeline รันอัตโนมัติ)
  * [[Chapter 01 Introduction to Database System & Relational Model]] (เข้าใจ Schema และ Relational DB ที่เป็น Source)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DataEngineer/1_Data_Collection.pdf` (39 slides, DataTH)
  * Reference: Kleppmann (2017) — *Designing Data-Intensive Applications* `[เสริมนอกสไลด์]`
