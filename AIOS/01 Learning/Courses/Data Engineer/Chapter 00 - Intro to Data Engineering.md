# Data Engineer - Chapter 00: Intro to Data Engineering

> **วิชา:** Road to Data Engineer 3.0 (R2DE 3.0) | **ผู้สอน:** DataTH
> **Source:** `Resources/Books/DataEngineer/0_Intro_to_Data_Engineering.pdf` (85 slides)
> **หมายเหตุ:** ส่วนที่ติดป้าย `[เสริมนอกสไลด์]` คือความรู้ที่ผู้เขียนโน้ตเพิ่มเอง ไม่ได้อยู่ในสไลด์ต้นฉบับ

---

## Part 1: Macro Architecture & Overview

ลองนึกภาพ **ร้านอาหารขนาดใหญ่**: มีครัวที่ทำอาหารตลอดเวลา (ระบบ Application), มีห้องเย็นเก็บวัตถุดิบ (Data Storage), มีพนักงานคอยขนวัตถุดิบเข้าครัวตามเวลา (Data Pipeline) และมีเมนูสรุปยอดขายให้เจ้าของร้านดู (Dashboard) **Data Engineer (DE)** คือคนที่ออกแบบและดูแล "ระบบท่อ + ห้องเก็บของ" ทั้งหมดนี้ เพื่อให้ Data Scientist และ Analyst เปิดมาใช้ข้อมูลที่สะอาดและเชื่อถือได้ทันที

Chapter 0 ตอบ 3 คำถามพื้นฐาน: (1) DE คืออาชีพอะไร ต่างจากสายอื่นอย่างไร (2) Big Data คืออะไร ทำไมต้องมีระบบพิเศษ (3) ข้อมูลมีกี่ประเภท และควรเก็บไว้ที่ไหน

```text
[Data Sources]            [Ingest / Pipeline]        [Store]                 [Serve]
 App / Website   ──┐                              ┌─ Database (OLTP)
 IoT Sensors     ──┼──►  Extract → Transform ──►  ├─ Data Warehouse (OLAP) ──► BI / Dashboard
 3rd-party API   ──┤        → Load                └─ Data Lake (Files)     ──► ML / Data Science
 Files (CSV...)  ──┘
                          ▲
                          └── Orchestration + Automation (Chapter 4)

หัวข้อของ Course Outline:  CH1 Collect → CH2 Cleanse → CH3 Cloud → CH4 Pipeline → CH5 Warehouse → CH6 Dashboard → CH7 Advanced
```

### ตารางเปรียบเทียบ Database vs Data Warehouse vs Data Lake

| Feature | Database | Data Warehouse | Data Lake |
| :--- | :--- | :--- | :--- |
| **จุดประสงค์หลัก** | รันระบบ App (เขียน/อ่านเร็ว) | วิเคราะห์ข้อมูลในอดีต | เก็บไฟล์ทุกรูปแบบแบบดิบ |
| **ประเภทข้อมูล** | Structured (+ Semi ใน NoSQL) | Structured | ทุกประเภท (ไฟล์) |
| **Workload** | OLTP | OLAP | ขึ้นกับเครื่องมือที่มาอ่าน |
| **ตัวอย่าง** | MySQL, PostgreSQL, MongoDB | BigQuery, Redshift, Snowflake | Google Cloud Storage, S3, MinIO |
| **Schema** | กำหนดก่อนเขียน | กำหนดก่อนเขียน | ตีความตอนอ่าน (schema-on-read) `[เสริมนอกสไลด์]` |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 ข้อมูลสำคัญก่อนเริ่มเรียน และ Mission ของคอร์ส

คอร์สเรียน 9 สัปดาห์ + เบรก 1 สัปดาห์ (ช่วง 18 พ.ค. - 20 ก.ค. 2024) เรียนวันเสาร์ผ่าน BigMarker มีวิดีโอย้อนหลังใน school.datath.com ข้อสอบ Final ก่อนจบเพื่อรับ Course Certificate

> **จุดที่ควรจำ:** คอร์สนี้เล่าเป็นเรื่องราวต่อเนื่อง ผู้เรียน "ได้รับเข้าทำงานเป็น Data Engineer" และได้ **Mission แรก** คือทำ Data Pipeline ให้ทีม Sales กับ Marketing ที่ต้องการขยายไลน์ธุรกิจ ทุก Workshop (1-6) จึงต่อกันเป็นท่อเดียวตั้งแต่ต้นจนจบ

```text
Workshop 1 (ดึงข้อมูล) → W2 (ล้างข้อมูล) → W3 (เก็บใน Data Lake)
        → W4 (Airflow อัตโนมัติ) → W5 (โหลดเข้า BigQuery) → W6 (Dashboard)
```

**คำแนะนำการเรียน `[เสริมนอกสไลด์]`:** อย่าท่องคำสั่ง ให้จำ "ทำไมต้องมีขั้นตอนนี้" แล้วลองเขียน Pipeline ซ้ำด้วยข้อมูลของตัวเอง เช่น ข้อมูลรายจ่ายส่วนตัวหรือ Dataset จาก Kaggle

---

### 2.2 Data Engineer คือใคร

> **Data Engineer** = ผู้ออกแบบ สร้าง และดูแลระบบที่ทำให้ข้อมูลไหลจากแหล่งต้นทางไปสู่ผู้ใช้งานได้อย่างถูกต้อง ครบถ้วน และตรงเวลา

#### 2.2.1 สิ่งที่ DE ต้องรู้ (ตามสไลด์ 4 กลุ่ม)

| กลุ่มความรู้ | ตัวอย่างเครื่องมือ | เรียนใน Chapter |
| :--- | :--- | :--- |
| **Big Data Platform** (On-premise & Cloud) | Hadoop, GCP, AWS, Azure | CH2, CH3 |
| **Data Pipeline** (ท่อส่งข้อมูล) | Airflow, Azure Data Factory | CH1, CH4 |
| **Programming** | Python, SQL, Bash, Java/Scala | ตลอดคอร์ส |
| **Software Engineering & Automation** | Git, Docker, Kubernetes | CH7 |

#### 2.2.2 เปรียบเทียบสายงานข้อมูล

| ประเด็น | Data Engineer | Data Scientist | Software Engineer |
| :--- | :--- | :--- | :--- |
| **งานหลัก** | สร้างระบบข้อมูล/Pipeline | วิเคราะห์ + สร้าง Model | สร้างซอฟต์แวร์/ระบบ App |
| **Output** | ข้อมูลที่พร้อมใช้ | Insight / Model | Product / Feature |
| **เครื่องมือเด่น** | Spark, Airflow, Warehouse | Pandas, scikit-learn | Framework, API |

**ตัวอย่างสถานการณ์:** ทีม DS อยากสร้าง Model ทำนายลูกค้าเลิกใช้บริการ แต่ข้อมูลกระจายอยู่ใน 5 ระบบ มีค่าว่างเต็มไปหมด → DE ต้องรวมและทำความสะอาดก่อน DS ถึงเริ่มงานได้ นี่คือเหตุผลที่สไลด์บอกว่า DE เป็น "อาชีพที่ขาดไม่ได้ในองค์กรที่ต้องการทำ Data Science"

**ชื่อตำแหน่งใกล้เคียง (จากสไลด์):** Cloud Engineer, DevOps Engineer, Data Architect, System Engineer ขอบเขตงานของ DE แต่ละบริษัทอาจไม่เหมือนกัน ขึ้นกับขนาดองค์กรและจำนวนทีม

---

### 2.3 Big Data

#### 2.3.1 Big Data คืออะไร และหลัก 4Vs (IBM)

| V | ความหมาย | ตัวอย่าง |
| :--- | :--- | :--- |
| **Volume** | ปริมาณข้อมูลมหาศาล | Log ของแอปที่มีผู้ใช้ล้านคน |
| **Velocity** | ข้อมูลเกิดและไหลเร็ว | ข้อมูล IoT Sensor ทุกวินาที |
| **Variety** | หลากหลายรูปแบบ | ตาราง + JSON + ภาพ + วิดีโอ |
| **Veracity** | ความน่าเชื่อถือของข้อมูล | ข้อมูลที่พิมพ์ผิดหรือขัดแย้งกัน |

> **ทำไมต้องมีระบบพิเศษ:** เมื่อข้อมูลใหญ่เกินกว่าเครื่องเดียวจะรับไหว (RAM, Disk, CPU) ต้องกระจายงานไปหลายเครื่อง

**Brief History (สไลด์ P.50):** ยุค Database (เริ่มราว 1983) → Data Warehouse → Big Data / Hadoop → Cloud `[รายละเอียดแต่ละยุคเสริมนอกสไลด์]`

#### 2.3.2 Big Data Platform สองแบบ

| ประเด็น | On-Premise (เช่น Hadoop) | Cloud Computing |
| :--- | :--- | :--- |
| **การลงทุน** | ซื้อเครื่องล่วงหน้า (ต้นทุนสูง) | จ่ายตามการใช้งาน |
| **การดูแล** | ทีมเราดูแลฮาร์ดแวร์เอง | Provider ดูแลให้ |
| **การขยาย** | ต้องสั่งซื้อ/ติดตั้งเพิ่ม | ปรับขนาดได้เร็ว |
| **ตัวอย่าง** | Hadoop Ecosystem | GCP, AWS, Azure (3 ผู้ให้บริการ Public Cloud ใหญ่สุด) |

รายละเอียด Cloud อยู่ใน [[Chapter 03 - Cloud Computing and Bash]]

---

### 2.4 ประเภทของข้อมูล (Types of Data)

| ประเภท | คำอธิบาย | ตัวอย่าง |
| :--- | :--- | :--- |
| **Structured** | โครงสร้างแน่นอน แสดงเป็นตาราง แถว-คอลัมน์ได้ | ตารางสั่งซื้อใน MySQL, ไฟล์ CSV |
| **Semi-Structured** | โครงสร้างยืดหยุ่น ขยายได้ในอนาคต | JSON, XML, Log |
| **Unstructured** | ไม่มีโครงสร้างตายตัว | รูปภาพ, วิดีโอ, เสียง, เอกสาร PDF |

```json
// ตัวอย่าง Semi-Structured: JSON แต่ละ record มี field ไม่เท่ากันได้
{"order_id": 1, "customer": "A", "coupon": "NEW10"}
{"order_id": 2, "customer": "B"}
```

> **พัฒนาการการเก็บข้อมูล (สไลด์ P.57):** กระดาษ → ตาราง → ... → Big Data เกิดข้อมูลหลายรูปแบบจนต้องมีที่เก็บหลายประเภท

---

### 2.5 ที่เก็บข้อมูล (Data Storage)

#### 2.5.1 Database

เหมาะกับข้อมูลที่ต้องเขียนและอ่านเร็ว เช่น Website, Mobile App

| ชนิด | ใช้กับ | ตัวอย่าง | ภาษา |
| :--- | :--- | :--- | :--- |
| **SQL (RDBMS)** | Structured | MySQL, PostgreSQL | SQL |
| **NoSQL** ("Not Only SQL") | Semi-Structured | MongoDB, Cassandra, Redis `[ตัวอย่างเสริมนอกสไลด์]` | เฉพาะตัว/บางตัวอ่าน SQL ได้ |

สไลด์ระบุว่า Database Model ยังมีอีกมาก (Relational, Document, Key-value, Graph ฯลฯ) ดูอันดับได้ที่ db-engines.com/en/ranking

#### 2.5.2 Data Warehouse

เก็บข้อมูล Structured ขนาดใหญ่ มักเป็น **historical data** ที่ไม่เปลี่ยนแปลง เพื่อใช้วิเคราะห์ ตัวอย่างในสไลด์: Google BigQuery, Amazon Redshift (ดู [[Chapter 05 - Data Warehouse with BigQuery]])

#### 2.5.3 OLTP vs OLAP

| ประเด็น | OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |
| :--- | :--- | :--- |
| **ใช้ทำอะไร** | บันทึกธุรกรรมทีละรายการ | วิเคราะห์/สรุปข้อมูลก้อนใหญ่ |
| **ที่เก็บ** | Database | Data Warehouse |
| **ตัวอย่างคำถาม** | "ตะกร้าของลูกค้า A มีอะไรบ้าง" | "ยอดขายรายเดือนของแต่ละภูมิภาคปีนี้" |
| **รูปแบบ Query** | แถวเดียว/น้อยแถว | สแกนหลายล้านแถว แต่ใช้ไม่กี่คอลัมน์ |

#### 2.5.4 Data Lake

ที่เก็บไฟล์ขนาดใหญ่รองรับ **ทุกรูปแบบ** เหมือน Harddrive ขององค์กรแต่มีระบบป้องกันข้อมูลสูญหายที่ดีกว่า (เช่น GCS, S3, MinIO)

#### 2.5.5 เลือกที่เก็บอย่างไร

| ถ้างานคือ... | เลือก |
| :--- | :--- |
| ระบบ App ที่ข้อมูลเปลี่ยนตลอดเวลา | Database |
| รวมข้อมูลเก่ามาวิเคราะห์/ทำรายงาน | Data Warehouse |
| เก็บไฟล์ดิบ รูป วิดีโอ หรือยังไม่รู้ว่าจะใช้ทำอะไร | Data Lake |

**Pattern พื้นฐานบน Big Data (สไลด์ P.73):** ข้อมูลจาก Database / ไฟล์ → ลง Data Lake → ประมวลผล → โหลดเข้า Data Warehouse → ใช้งาน `[รายละเอียดลำดับเป็นการสรุปของผู้เขียนโน้ต ให้เทียบกับสไลด์ P.73]`

---

### 2.6 Data Pipeline, Tools และ Tech Landscape

> **Data Pipeline:** ชุดขั้นตอนอัตโนมัติที่ลำเลียงข้อมูลจากต้นทางไปปลายทาง ตัวอย่างระบบจัดการ Pipeline: Airflow, Azure Data Factory ([[Chapter 04 - Data Pipeline Orchestration with Airflow]])

**กลุ่มเครื่องมือของ DE (สรุปสไลด์ P.79):** Data Lake, Data Processing, Orchestration, Data Warehouse, Visualization และ Programming (Python, SQL, Bash) + Software Engineering (Git, Docker, K8s)

**Data & AI Landscape 2024:** แผนที่เครื่องมือจาก mattturck.com/mad2024 ใช้ดูภาพรวมว่ามีเครื่องมือกี่หมวด **อย่าพยายามรู้จักทุกตัว** ให้เข้าใจ "หมวด" ก่อน เช่น ตัวนี้เป็น Warehouse ตัวนี้เป็น Orchestrator

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญ
* [ ] **Data Engineer:** สร้างและดูแลระบบข้อมูล/Pipeline ไม่ใช่คนวิเคราะห์ผลหรือสร้าง Model เป็นหลัก
* [ ] **4Vs:** Volume, Velocity, Variety, Veracity
* [ ] **3 ประเภทข้อมูล:** Structured / Semi-Structured / Unstructured พร้อมยกตัวอย่างได้
* [ ] **OLTP vs OLAP:** ธุรกรรมรายแถวเทียบกับวิเคราะห์ก้อนใหญ่ → Database เทียบกับ Data Warehouse
* [ ] **Data Lake:** เก็บไฟล์ทุกรูปแบบ ราคาถูก
* [ ] **On-premise vs Cloud:** เครื่องของเราเองเทียบกับเช่า Data Center

### Decision Rules

```text
ข้อมูลเปลี่ยนบ่อย + App ต้องการเร็ว     → Database (OLTP)
วิเคราะห์ข้อมูลในอดีต ปริมาณมาก         → Data Warehouse (OLAP)
ไฟล์ดิบ/รูป/ยังไม่รู้จะใช้อะไร            → Data Lake
```

### Concept Map

```text
Data Engineering
├── Role: DE vs DS vs SWE
├── Big Data: 4Vs
├── Platform: On-premise (Hadoop) / Cloud
├── Data Types: Structured / Semi / Unstructured
├── Storage: Database / Warehouse / Lake
└── Pipeline + Tools: Orchestration, Processing, Git, Docker
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **"DE กับ DS ทำงานเหมือนกัน":** ไม่ใช่ DE สร้างโครงสร้างและ Pipeline ให้ข้อมูลพร้อมใช้ ส่วน DS วิเคราะห์และสร้าง Model บนข้อมูลนั้น
* **"NoSQL แปลว่าไม่ใช้ SQL เลย":** สไลด์ระบุว่า NoSQL = **Not Only SQL** บางตัวอ่าน SQL ได้
* **"เก็บทุกอย่างใน Database เดียวพอ":** Database ออกแบบมาเพื่อ OLTP การวิเคราะห์ก้อนใหญ่ใน Database ที่รัน App อยู่อาจทำให้ระบบหลักช้าลง `[ข้อสังเกตเสริมนอกสไลด์]`
* **"Data Lake คือ Data Warehouse ที่ใหญ่กว่า":** Lake เก็บไฟล์ดิบทุกรูปแบบ Warehouse เก็บข้อมูลที่จัดโครงสร้างไว้เพื่อ Query วิเคราะห์
* **"Big Data = ข้อมูลเยอะเท่านั้น":** ต้องพิจารณาครบ 4Vs ไม่ใช่แค่ Volume

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 01 - Data Collection]] (บทถัดไป — เริ่มสร้าง Pipeline ด้วย ETL/ELT)
  * [[Chapter 03 - Cloud Computing and Bash]] (ขยายความ Big Data Platform แบบ Cloud)
  * [[Chapter 05 - Data Warehouse with BigQuery]] (ขยายความ Data Warehouse และ OLAP)
  * [[Chapter 01 Introduction to Database System & Relational Model]] (พื้นฐาน RDBMS ของวิชา Database)
  * [[Me]] (เป้าหมายสาย Data & AI Engineer)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DataEngineer/0_Intro_to_Data_Engineering.pdf` (85 slides, DataTH)
  * Reference: Reis & Housley (2022) — *Fundamentals of Data Engineering* `[เสริมนอกสไลด์]`
