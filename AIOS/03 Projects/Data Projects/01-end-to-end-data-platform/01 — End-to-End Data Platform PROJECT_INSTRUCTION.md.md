# Project Instruction: แพลตฟอร์มข้อมูลแบบครบวงจร (End-to-End Data Platform)

## 1. ภาพรวมของโปรเจกต์ (Project Overview)

สร้าง **End-to-End Data Engineering Platform** ระดับเสมือนใช้งานจริงบนระบบ Production สำหรับธุรกิจอีคอมเมิร์ซ (E-commerce)

เป้าหมายคือเพื่อแสดงให้เห็นถึงทักษะด้าน Data Engineering เชิงปฏิบัติผ่าน Pipeline ที่สมบูรณ์:

```text
Source Data (ข้อมูลต้นทาง)
    ↓
Data Ingestion (การนำเข้าข้อมูล)
    ↓
Data Lake / Raw Layer (เลเยอร์ข้อมูลดิบ)
    ↓
Data Transformation (การแปลงรูปข้อมูล)
    ↓
Data Warehouse (คลังข้อมูล)
    ↓
Analytics Data Mart (มาร์ตข้อมูลเพื่อการวิเคราะห์)
    ↓
Dashboard (แดชบอร์ด)
```

โปรเจกต์นี้ต้องดูเหมือนแพลตฟอร์มข้อมูลที่ใช้งานจริง ไม่ใช่เพียงแค่สคริปต์ Python ETL ธรรมดาๆ

---

## 2. บริบททางธุรกิจ (Business Scenario)

บริษัทดำเนินธุรกิจแพลตฟอร์มอีคอมเมิร์ซและสร้างข้อมูลที่มาจาก:

- ลูกค้า (Customers)
- สินค้า (Products)
- คำสั่งซื้อ (Orders)
- รายการสินค้าในคำสั่งซื้อ (Order Items)
- การชำระเงิน (Payments)
- ร้านค้า (Stores)
- หมวดหมู่สินค้า (Product Categories)

ธุรกิจต้องการแพลตฟอร์มข้อมูลแบบรวมศูนย์ที่ช่วยให้นักวิเคราะห์และผู้จัดการเข้าใจถึง:

- รายได้ (Revenue)
- คำสั่งซื้อ (Orders)
- พฤติกรรมลูกค้า (Customer behavior)
- ประสิทธิภาพของสินค้า (Product performance)
- แนวโน้มยอดขาย (Sales trends)
- การรักษาลูกค้าไว้ (Customer retention)
- ประสิทธิภาพของร้านค้า (Store performance)

---

## 3. วัตถุประสงค์หลัก (Core Objectives)

ระบบต้องแสดงให้เห็นถึง:

1. การนำเข้าข้อมูล (Data ingestion)
2. ETL / ELT
3. การทำ Data modeling
4. การออกแบบ Data warehouse
5. การจัดการลำดับการทำงาน (Workflow orchestration)
6. การแปลงรูปข้อมูล (Data transformation)
7. การประมวลผลข้อมูลแบบเพิ่มหน่วย (Incremental processing)
8. การตรวจสอบความถูกต้องของข้อมูล (Data validation)
9. การพัฒนาบน Docker (Dockerized development)
10. CI/CD
11. เอกสารประกอบ (Documentation)

อย่าปรับแต่งเพื่อมุ่งเน้นความซับซ้อน

ให้ปรับแต่งเพื่อ:

> สถาปัตยกรรมที่ชัดเจน + การตัดสินใจเชิงวิศวกรรมที่ถูกต้อง + ความสามารถในการทำซ้ำได้ (Clear architecture + correct engineering decisions + reproducibility)

---

# 4. เทคโนโลยีสแตกที่แนะนำ (Recommended Tech Stack)

เลือกใช้:

### การเขียนโปรแกรม (Programming)

- Python
- SQL

### การประมวลผลข้อมูล (Data Processing)

- Pandas สำหรับการทำ Preprocessing ขนาดเล็ก
- PySpark สำหรับการแปลงรูปข้อมูลที่ปรับขยายขนาดได้ (scalable transformation) ในจุดที่เหมาะสม

### Orchestration

- Apache Airflow

### การจัดเก็บข้อมูล (Storage)

- ระบบไฟล์ในเครื่อง (Local filesystem) สำหรับการพัฒนา
- MinIO หรือ Storage ที่รองรับ S3 สำหรับ Data Lake

### Warehouse

เลือกใช้อย่างใดอย่างหนึ่ง:

- PostgreSQL
- BigQuery

ให้เลือกใช้ PostgreSQL เป็นหลักสำหรับการพัฒนาในเครื่อง และทำให้สถาปัตยกรรมพร้อมต่อการขึ้นระบบคลาวด์ (cloud-ready)

### การแปลงรูปข้อมูล (Transformation)

- dbt

### โครงสร้างพื้นฐาน (Infrastructure)

- Docker
- Docker Compose

### การควบคุมเวอร์ชัน (Version Control)

- Git
- GitHub

### CI/CD

- GitHub Actions

### แดชบอร์ด (Dashboard)

เลือกใช้อย่างใดอย่างหนึ่ง:

- Metabase
- Apache Superset

ให้เลือกใช้ Metabase เพื่อความเรียบง่าย

---

# 5. สถาปัตยกรรม (Architecture)

นำสถาปัตยกรรมนี้ไปพัฒนาใช้งาน:

```text
                  ┌─────────────────┐
                  │ Source Systems  │
                  │ CSV / API / DB  │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Data Ingestion  │
                  │ Python          │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Raw Data Lake   │
                  │ MinIO / S3      │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Airflow         │
                  │ Orchestration   │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Transform       │
                  │ dbt / Spark     │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Data Warehouse  │
                  │ PostgreSQL      │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Data Mart       │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Metabase        │
                  └─────────────────┘
```

---

# 6. เลเยอร์ของข้อมูล (Data Layers)

จัดทำเลเยอร์ข้อมูลที่ชัดเจน

## Bronze

ข้อมูลดิบตามที่ได้รับมาอย่างแม่นยำทุกประการ

ไม่มีการแปลงรูปทางธุรกิจ (No business transformations)

```text
bronze/
├── customers/
├── products/
├── orders/
├── order_items/
└── payments/
```

## Silver

ข้อมูลที่ผ่านการทำความสะอาดและทำให้เป็นมาตรฐานแล้ว (Cleaned and standardized data)

ตัวอย่าง:

- ลบข้อมูลที่ซ้ำซ้อน (Remove duplicates)
- ปรับค่าเวลาให้เป็นมาตรฐานเดียวกัน (Normalize timestamps)
- กำหนดประเภทข้อมูลให้เป็นมาตรฐาน (Standardize data types)
- จัดการกับเรคอร์ดที่ไม่ถูกต้อง (Handle invalid records)
- ปรับค่าข้อมูลเชิงกลุ่มให้เป็นมาตรฐาน (Normalize categorical values)

## Gold

ตารางเชิงวิเคราะห์ที่พร้อมใช้งานทางธุรกิจ (Business-ready analytical tables)

ตัวอย่าง:

```text
fact_sales
dim_customer
dim_product
dim_store
dim_date
```

---

# 7. ตัวแบบข้อมูล (Data Model)

นำ Star Schema ไปพัฒนาใช้งาน

### Fact

```text
fact_sales
```

ฟิลด์ข้อมูลควรประกอบด้วย:

- order_id
- customer_key
- product_key
- store_key
- date_key
- quantity
- unit_price
- discount
- revenue
- cost
- profit

### Dimensions

```text
dim_customer
dim_product
dim_store
dim_date
```

จัดทำเอกสารกำกับสคีมาโดยใช้ ERD

---

# 8. Airflow

สร้าง Airflow DAG:

```text
extract
   ↓
validate_raw_data
   ↓
load_bronze
   ↓
transform
   ↓
load_warehouse
   ↓
run_dbt
   ↓
data_quality_check
   ↓
refresh_analytics
```

ข้อกำหนด:

- ความสัมพันธ์ขึ้นต่อกันของงาน (Task dependencies)
- นโยบายการลองทำซ้ำเมื่อผิดพลาด (Retry policy)
- การจัดการเมื่อเกิดข้อผิดพลาด (Failure handling)
- การจัดตารางเวลาการทำงาน (Scheduling)
- การบันทึก Log (Logging)
- คุณสมบัติ Idempotency (ทำงานซ้ำได้ผลลัพธ์คงเดิม)

Pipeline ต้องปลอดภัยสำหรับการรันซ้ำหลายๆ ครั้ง

---

# 9. การประมวลผลแบบเพิ่มหน่วย (Incremental Processing)

อย่าประมวลผลชุดข้อมูลทั้งหมดทุกครั้ง

จัดทำ Incremental ingestion โดยอิงตาม:

- timestamp
- updated_at
- วันที่นำเข้าข้อมูล (ingestion date)
- watermark

ตัวอย่าง:

```text
Last processed (ประมวลผลครั้งล่าสุด):
2026-09-30 23:59:59

Next run (การรันครั้งต่อไป):
only process records after this timestamp (ประมวลผลเฉพาะเรคอร์ดที่เกิดขึ้นหลังค่าเวลา timestamp นี้เท่านั้น)
```

จัดทำเอกสารอธิบายกลยุทธ์ที่เลือกใช้

---

# 10. การแปลงรูปข้อมูล (Data Transformation)

ใช้ dbt สำหรับการแปลงรูปข้อมูลภายใน Warehouse

สร้าง:

```text
models/
├── staging/
├── intermediate/
└── marts/
```

นำไปปฏิบัติ:

- staging models
- business transformations
- analytical models
- incremental models ในจุดที่เหมาะสม

---

# 11. แดชบอร์ด (Dashboard)

สร้างแดชบอร์ดทางธุรกิจแบบเรียบง่าย

ตัวชี้วัดขั้นต่ำ:

### ยอดขาย (Sales)

- รายได้รวม (Total Revenue)
- จำนวนคำสั่งซื้อทั้งหมด (Total Orders)
- มูลค่าเฉลี่ยต่อคำสั่งซื้อ (Average Order Value)
- กำไร (Profit)

### สินค้า (Products)

- สินค้ายอดนิยม (Top Products)
- รายได้แยกตามหมวดหมู่ (Revenue by Category)
- จำนวนสินค้า (Product Quantity)

### ลูกค้า (Customers)

- ลูกค้าใหม่ (New Customers)
- ลูกค้าเก่าที่กลับมาซื้อซ้ำ (Returning Customers)
- รายได้จากลูกค้า (Customer Revenue)

### มิติเวลา (Time)

- รายได้รายวัน (Daily Revenue)
- รายได้รายเดือน (Monthly Revenue)
- การเติบโตของรายได้ (Revenue Growth)

แดชบอร์ดควรดึงข้อมูลจากเลเยอร์ Gold มาใช้งาน แทนที่จะดึงตรงจากตารางข้อมูลดิบ

---

# 12. Docker

โปรเจกต์ต้องสามารถรันได้โดยใช้:

```bash
docker compose up
```

บริการต่างๆ ควรประกอบด้วยโดยประมาณ:

```text
airflow
postgres
minio
metabase
```

จัดทำเอกสารอธิบายตัวแปรสภาพแวดล้อม (Environment variables)

ห้ามคอมมิตข้อมูลความลับ (secrets) เด็ดขาด

---

# 13. CI/CD

สร้างเวิร์กโฟลว์ GitHub Actions

อย่างน้อยที่สุด:

```text
Pull Request
    ↓
Lint
    ↓
Unit Tests
    ↓
SQL / dbt Tests
    ↓
Build Docker Image
```

Pipeline ควรหยุดทำงานและแจ้งล้มเหลว (fail) เมื่อมีแบบทดสอบที่ไม่ผ่าน

---

# 14. การทดสอบ (Testing)

จัดทำแบบทดสอบสำหรับ:

### Python

- ฟังก์ชันการนำเข้าข้อมูล (ingestion functions)
- ฟังก์ชันการแปลงรูปข้อมูล (transformation functions)
- ฟังก์ชันยูทิลิตี้ (utility functions)

### ข้อมูล (Data)

- คีย์ที่ไม่ซ้ำกัน (unique keys)
- ฟิลด์ที่ห้ามมีค่าว่าง (not-null fields)
- ค่าที่ยอมรับได้ (accepted values)
- ความถูกต้องสมบูรณ์ของการอ้างอิงระหว่างตาราง (referential integrity)

### Pipeline

- ความถูกต้องสมบูรณ์ของ DAG (DAG integrity)
- ความสัมพันธ์ขึ้นต่อกันของงาน (task dependencies)

---

# 15. การสังเกตการณ์ระบบ (Observability)

ติดตามตรวจสอบ:

- เวลาในการทำงานของ Pipeline (Pipeline execution time)
- งานที่ล้มเหลว (Task failures)
- จำนวนเรคอร์ดที่ประมวลผล (Number of records processed)
- ความสดใหม่ของข้อมูล (Data freshness)
- ปริมาณข้อมูล (Data volume)

อย่างน้อยที่สุด Log จะต้องทำให้สามารถตอบคำถามต่อไปนี้ได้:

> เกิดอะไรขึ้นเมื่อ Pipeline ล้มเหลว?

---

# 16. โครงสร้าง Repository (Repository Structure)

ใช้โครงสร้างดังนี้:

```text
data-platform/
│
├── dags/
├── ingestion/
├── transformation/
├── dbt/
├── data/
│   ├── bronze/
│   ├── silver/
│   └── gold/
│
├── tests/
├── docker/
├── dashboard/
├── docs/
│
├── docker-compose.yml
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

---

# 17. ข้อกำหนดสำหรับ README (README Requirements)

README ต้องประกอบด้วย:

1. ภาพรวมของโปรเจกต์ (Project overview)
2. ปัญหาทางธุรกิจ (Business problem)
3. แผนภาพสถาปัตยกรรม (Architecture diagram)
4. การเลือกใช้เทคโนโลยี (Technology choices)
5. กระแสการไหลของข้อมูล (Data flow)
6. ตัวแบบข้อมูล (Data model)
7. เวิร์กโฟลว์ของ Pipeline (Pipeline workflow)
8. วิธีการรันโปรเจกต์ (How to run)
9. ตัวอย่างคำสั่งคิวรี (Example queries)
10. ภาพหน้าจอแดชบอร์ด (Dashboard screenshots)
11. กลยุทธ์ด้านคุณภาพข้อมูล (Data quality strategy)
12. การตัดสินใจเชิงวิศวกรรม (Engineering decisions)
13. ข้อจำกัด (Limitations)
14. การปรับปรุงในอนาคต (Future improvements)

---

# 18. การตัดสินใจเชิงวิศวกรรม (Engineering Decisions)

สร้าง:

```text
docs/architecture-decisions.md
```

อธิบายการตัดสินใจ เช่น:

- ทำไมต้องเป็น PostgreSQL?
- ทำไมต้องเป็น Airflow?
- ทำไมต้องเป็น dbt?
- ทำไมต้องเป็น Star Schema?
- ทำไมต้องเป็นการประมวลผลแบบเพิ่มหน่วย (incremental processing)?
- ทำไมต้องเป็น Bronze/Silver/Gold?
- ทำไมต้องเป็น Docker?

อย่าเขียนเพียงแค่อธิบายว่าเทคโนโลยีเหล่านั้นคืออะไร

ให้อธิบายถึงข้อดีข้อเสียและสิ่งที่ต้องแลกเปลี่ยน (Trade-offs)

---

# 19. นิยามของความเสร็จสมบูรณ์ (Definition of Done)

โปรเจกต์จะถือว่าเสร็จสมบูรณ์ก็ต่อเมื่อ:

- [ ] Pipeline ทั้งหมดทำงานได้สำเร็จลุล่วง
- [ ] Pipeline ถูกควบคุมลำดับการทำงานโดย Airflow
- [ ] ข้อมูลถูกจัดเก็บแยกในเลเยอร์ Bronze/Silver/Gold
- [ ] Warehouse ใช้สคีมาที่มีเอกสารระบุไว้ชัดเจน
- [ ] การแปลงรูปข้อมูลด้วย dbt ทำงานได้ถูกต้อง
- [ ] การประมวลผลแบบเพิ่มหน่วย (Incremental processing) ทำงานได้ถูกต้อง
- [ ] มีชุดแบบทดสอบข้อมูล (Data tests)
- [ ] Docker Compose สามารถเริ่มระบบทำงานได้
- [ ] CI pipeline ทำงานได้สำเร็จ
- [ ] แดชบอร์ดทำงานได้
- [ ] README มีเนื้อหาครบถ้วนสมบูรณ์
- [ ] มีแผนภาพสถาปัตยกรรม
- [ ] มี ERD
- [ ] ได้ทำการทดสอบสถานการณ์จำลองเมื่อเกิดข้อผิดพลาด (Failure scenario) แล้ว

ผลลัพธ์สุดท้ายจะต้องสามารถทำให้ผู้อื่น (นักพัฒนาคนอื่น) นำไปรันซ้ำเพื่อสร้างผลลัพธ์แบบเดียวกันได้ โดยปฏิบัติตามคำแนะนำใน README