# Project Instruction: แพลตฟอร์มคุณภาพข้อมูลและการสังเกตการณ์ระบบ (Data Quality & Observability Platform)

## 1. ภาพรวมของโปรเจกต์ (Project Overview)

สร้าง **ระบบ Data Quality และ Observability (Data Quality and Observability system)** สำหรับระบบ Data Platform ที่มีอยู่เดิม

ระบบควรตรวจจับได้เมื่อข้อมูลเกิดกรณีต่อไปนี้:

- ไม่ถูกต้อง (Incorrect)
- ไม่ครบถ้วน (Incomplete)
- ล่าช้า (Delayed)
- ซ้ำซ้อน (Duplicated)
- มีการเปลี่ยนแปลงเชิงโครงสร้าง (Structurally changed)
- ผิดปกติหรือไม่คาดคิด (Unexpected)

เป้าหมายคือเพื่อตอบคำถาม:

> "เราสามารถเชื่อถือข้อมูลชุดนี้ได้หรือไม่?" ("Can we trust the data?")

---

# 2. สถาปัตยกรรมหลัก (Core Architecture)

นำไปพัฒนาใช้งาน:

```text
Data Pipeline (ไปป์ไลน์ข้อมูล)
      ↓
Data Quality Checks (การตรวจสอบคุณภาพข้อมูล)
      ↓
Quality Results (ผลลัพธ์คุณภาพ)
      ↓
Observability Layer (เลเยอร์การสังเกตการณ์ระบบ)
      ↓
Metrics (ตัวชี้วัด/เมทริกซ์)
      ↓
Dashboard / Alerts (แดชบอร์ด / การแจ้งเตือน)
```

---

# 3. มิติของคุณภาพข้อมูล (Quality Dimensions)

จัดทำระบบตรวจสอบสำหรับมิติต่างๆ ดังนี้:

### ความครบถ้วนสมบูรณ์ (Completeness)

ตัวอย่าง:

```text
customer_id IS NOT NULL
```

### ความเป็นเอกลักษณ์ไม่ซ้ำซ้อน (Uniqueness)

ตัวอย่าง:

```text
order_id must be unique (order_id ต้องไม่ซ้ำกัน)
```

### ความถูกต้องตามเกณฑ์ (Validity)

ตัวอย่าง:

```text
quantity > 0
revenue >= 0
```

### ความสอดคล้องเชื่อมโยง (Consistency)

ตัวอย่าง:

```text
order.customer_id
must exist in (ต้องมีอยู่จริงใน)
customer table (ตาราง customer)
```

### ความสดใหม่ของข้อมูล (Freshness)

ตัวอย่าง:

```text
latest order timestamp (เวลา timestamp ของคำสั่งซื้อล่าสุด)
must be less than 1 hour old (ต้องเก่าไม่เกิน 1 ชั่วโมง)
```

### ปริมาณข้อมูล (Volume)

ตรวจจับการเปลี่ยนแปลงที่ผิดปกติในจำนวนเรคอร์ด (Detect abnormal changes in record count)

ตัวอย่าง:

```text
Yesterday: 100,000 rows (เมื่อวาน: 100,000 แถว)
Today:      8,000 rows (วันนี้:      8,000 แถว)
```

ความผิดปกติที่อาจเกิดขึ้น (Potential anomaly)

---

# 4. เครื่องมือที่แนะนำ (Recommended Tools)

เลือกใช้:

- Python
- SQL
- dbt tests
- Great Expectations หรือ Soda
- Airflow
- PostgreSQL
- Docker
- Grafana หรือ Metabase

คุณไม่จำเป็นต้องใช้ครบทุกเครื่องมือ

ให้เน้นชุดเครื่องมือขนาดกะทัดรัด (small stack) ที่พัฒนาออกมาได้อย่างมีคุณภาพดี

---

# 5. เฟรมเวิร์กคุณภาพข้อมูล (Data Quality Framework)

สร้างชุดการตรวจสอบที่สามารถนำกลับมาใช้ซ้ำได้ (reusable checks)

ตัวอย่าง:

```text
checks/
├── completeness.py
├── uniqueness.py
├── validity.py
├── freshness.py
├── volume.py
└── schema.py
```

เฟรมเวิร์กควรให้ผลลัพธ์ที่เป็นมาตรฐานเดียวกัน (standardized results)

ตัวอย่าง:

```json
{
  "check": "customer_id_not_null",
  "table": "fact_sales",
  "status": "FAILED",
  "failed_rows": 153,
  "execution_time_ms": 320
}
```

---

# 6. คะแนนคุณภาพข้อมูล (Data Quality Score)

สร้างคะแนนคุณภาพโดยรวม (overall quality score)

ตัวอย่าง:

```text
Quality Score =

Passed Checks (จำนวนการตรวจสอบที่ผ่าน)
--------------
Total Checks (จำนวนการตรวจสอบทั้งหมด)
```

อย่าถือว่าคะแนนนี้เป็นความจริงสมบูรณ์แบบเพียงอย่างเดียว (Do not treat this score as absolute truth)

ให้แสดงผลการตรวจสอบแต่ละรายการควบคู่ไปกับคะแนนด้วย

ตัวอย่าง:

```text
Overall (โดยรวม): 92%

Completeness (ความครบถ้วน)     PASS (ผ่าน)
Uniqueness (ความไม่ซ้ำซ้อน)       PASS (ผ่าน)
Validity (ความถูกต้อง)         PASS (ผ่าน)
Freshness (ความสดใหม่)        FAIL (ไม่ผ่าน)
Volume (ปริมาณข้อมูล)           PASS (ผ่าน)
```

---

# 7. ความสดใหม่ของข้อมูล (Data Freshness)

ติดตาม:

```text
source_timestamp
ingestion_timestamp
warehouse_timestamp
```

คำนวณ:

```text
freshness_delay =
warehouse_timestamp - source_timestamp
```

แจ้งเตือนเมื่อเกินเกณฑ์ที่กำหนด (threshold)

---

# 8. การติดตามตรวจสอบปริมาณข้อมูล (Volume Monitoring)

ติดตามจำนวนเรคอร์ดในอดีต (Track historical record counts)

ตัวอย่าง:

```text
Date       Rows
09/28      98,321
09/29     102,532
09/30     100,211
10/01       7,342  ← anomaly (ผิดปกติ)
```

จัดทำกลยุทธ์การตรวจจับความผิดปกติแบบพื้นฐาน (basic anomaly detection strategy)

เริ่มต้นด้วย:

```text
Historical Mean ± Threshold (ค่าเฉลี่ยในอดีต ± ค่าเกณฑ์ที่กำหนด)
```

สามารถเพิ่มวิธีที่ซับซ้อนขึ้นได้ในภายหลัง

---

# 9. การตรวจจับการเปลี่ยนแปลงของสคีมา (Schema Change Detection)

ตรวจจับการเปลี่ยนแปลงต่างๆ เช่น:

```text
column added (เพิ่มคอลัมน์)
column removed (ลบคอลัมน์)
datatype changed (เปลี่ยนประเภทข้อมูล)
nullable changed (เปลี่ยนคุณสมบัติการอนุญาตให้มีค่าว่าง)
```

ตัวอย่าง:

```text
Expected (สิ่งที่คาดหวัง):

customer_id INTEGER

Received (สิ่งที่ได้รับ):

customer_id STRING
```

ระบบควรแจ้งเตือนเรื่องนี้ก่อนที่การแปลงรูปข้อมูลในลำดับถัดไป (downstream transformations) จะล้มเหลว

---

# 10. การบูรณาการเข้ากับ Pipeline (Pipeline Integration)

บูรณาการการตรวจสอบคุณภาพเข้าไปใน Airflow โดยตรง

ตัวอย่าง:

```text
extract
   ↓
load_raw
   ↓
quality_check_raw
   ↓
transform
   ↓
quality_check_silver
   ↓
load_gold
   ↓
quality_check_gold
   ↓
publish
```

หากเกิดข้อผิดพลาดด้านคุณภาพขั้นวิกฤต (critical quality failure) ควรหยุดการทำงานของงานในลำดับถัดไป (downstream tasks)

---

# 11. การแจ้งเตือน (Alerting)

จัดทำระบบแจ้งเตือนสำหรับ:

- Pipeline ล้มเหลว (Pipeline failure)
- ความสดใหม่ของข้อมูลล้มเหลว/ล่าช้า (Freshness failure)
- คุณภาพข้อมูลล้มเหลว (Data quality failure)
- สคีมามีการเปลี่ยนแปลง (Schema change)
- ปริมาณข้อมูลผิดปกติ (Volume anomaly)

เลือกใช้หนึ่งช่องทางการแจ้งเตือน:

- Slack
- Email
- Discord

สำหรับโปรเจกต์พอร์ตโฟลิโอ การใช้ Slack หรือ Discord ก็เพียงพอแล้ว

---

# 12. แดชบอร์ดการสังเกตการณ์ระบบ (Observability Dashboard)

สร้างแดชบอร์ดที่ประกอบด้วย:

### Pipeline

- อัตราความสำเร็จ (Success rate)
- อัตราความล้มเหลว (Failure rate)
- เวลาในการทำงาน (Execution time)

### Data (ข้อมูล)

- จำนวนแถว (Row count)
- ความสดใหม่ของข้อมูล (Data freshness)
- คะแนนคุณภาพ (Quality score)

### Quality (คุณภาพ)

- การตรวจสอบที่ผ่าน (Passed checks)
- การตรวจสอบที่ไม่ผ่าน (Failed checks)
- จำนวนแถวที่ไม่ผ่านเกณฑ์ (Failed rows)

### Trends (แนวโน้ม)

- คะแนนคุณภาพตามช่วงเวลา (Quality score over time)
- ระยะเวลาการทำงานของ Pipeline (Pipeline duration)
- ปริมาณข้อมูล (Data volume)

---

# 13. การจำลองสถานการณ์เหตุการณ์ขัดข้อง (Incident Simulation)

สร้างสถานการณ์ความผิดพลาดขึ้นมาโดยเจตนา (intentional failures)

อย่างน้อยที่สุด:

### สถานการณ์ที่ 1 (Scenario 1)

ใส่ค่า customer_id เป็น NULL

ผลที่คาดหวัง:

```text
Completeness check → FAIL (ไม่ผ่าน)
Pipeline → STOP (หยุดทำงาน)
Alert → SENT (ส่งการแจ้งเตือน)
```

### สถานการณ์ที่ 2 (Scenario 2)

เปลี่ยนประเภทข้อมูล (datatype)

ผลที่คาดหวัง:

```text
Schema check → FAIL (ไม่ผ่าน)
Alert → SENT (ส่งการแจ้งเตือน)
```

### สถานการณ์ที่ 3 (Scenario 3)

หยุดข้อมูลต้นทาง (Stop the source data)

ผลที่คาดหวัง:

```text
Freshness check → FAIL (ไม่ผ่าน)
Alert → SENT (ส่งการแจ้งเตือน)
```

### สถานการณ์ที่ 4 (Scenario 4)

โหลดเรคอร์ดที่ซ้ำซ้อน (duplicate records) เข้าไป

ผลที่คาดหวัง:

```text
Uniqueness check → FAIL (ไม่ผ่าน)
```

จัดทำเอกสารบันทึกเหตุการณ์ขัดข้องแต่ละกรณี

---

# 14. รายงานเหตุการณ์ขัดข้อง (Incident Report)

สร้าง:

```text
docs/incidents/
```

ตัวอย่าง:

```text
INC-001-null-customer-id.md
```

เนื้อหาประกอบด้วย:

```text
Incident (เหตุการณ์)
Date (วันที่)
Detection (การตรวจพบ)
Impact (ผลกระทบ)
Root Cause (สาเหตุที่แท้จริง)
Resolution (การแก้ไขปัญหา)
Prevention (การป้องกันในอนาคต)
```

สิ่งนี้มีความสำคัญอย่างยิ่งในการแสดงให้เห็นถึงวิธีคิดเชิงวิศวกรรมที่แท้จริง (real engineering thinking)

---

# 15. ประวัติคุณภาพข้อมูล (Data Quality History)

จัดเก็บผลลัพธ์ด้านคุณภาพไว้ในตารางฐานข้อมูล

ตัวอย่าง:

```text
data_quality_results
```

ฟิลด์ข้อมูล:

```text
check_id
check_name
table_name
status
failed_rows
execution_time
timestamp
```

สิ่งนี้จะช่วยให้สามารถนำไปวิเคราะห์ประวัติย้อนหลังได้ (historical analysis)

---

# 16. โครงสร้าง Repository (Repository Structure)

```text
data-quality-platform/
│
├── checks/
├── monitors/
├── alerts/
├── dags/
├── dashboards/
├── tests/
├── docs/
│   └── incidents/
│
├── config/
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

---

# 17. การทดสอบ (Testing)

ทดสอบ:

- การตรวจสอบคุณภาพ (quality checks)
- การตรวจจับความล้มเหลว (failure detection)
- การสั่งทำงานของการแจ้งเตือน (alert triggers)
- การเปรียบเทียบสคีมา (schema comparison)
- การคำนวณความสดใหม่ของข้อมูล (freshness calculation)
- การตรวจจับความผิดปกติ (anomaly detection)

ครอบคลุมทั้งสองกรณี:

```text
PASS cases (กรณีที่ผ่าน)
FAIL cases (กรณีที่ไม่ผ่าน)
```

---

# 18. ข้อกำหนดสำหรับ README (README Requirements)

ประกอบด้วย:

1. ปัญหา (Problem)
2. ทำไม Data Quality จึงมีความสำคัญ (Why Data Quality matters)
3. สถาปัตยกรรม (Architecture)
4. มิติของคุณภาพข้อมูล (Quality dimensions)
5. การพัฒนาชุดการตรวจสอบ (Check implementation)
6. การบูรณาการเข้ากับ Airflow (Airflow integration)
7. การแจ้งเตือน (Alerting)
8. แดชบอร์ด (Dashboard)
9. การจำลองสถานการณ์เหตุการณ์ขัดข้อง (Incident simulations)
10. ตัวอย่างการหาสาเหตุที่แท้จริง (Root-cause examples)
11. ข้อจำกัด (Limitations)
12. การปรับปรุงในอนาคต (Future improvements)

---

# 19. นิยามของความเสร็จสมบูรณ์ (Definition of Done)

- [ ] มีเฟรมเวิร์กสำหรับคุณภาพข้อมูล (Data quality framework)
- [ ] การตรวจสอบความครบถ้วนสมบูรณ์ (Completeness checks) ทำงานได้
- [ ] การตรวจสอบความไม่ซ้ำซ้อน (Uniqueness checks) ทำงานได้
- [ ] การตรวจสอบความถูกต้องตามเกณฑ์ (Validity checks) ทำงานได้
- [ ] การตรวจสอบความสดใหม่ของข้อมูล (Freshness checks) ทำงานได้
- [ ] การติดตามตรวจสอบปริมาณข้อมูล (Volume monitoring) ทำงานได้
- [ ] การติดตามตรวจสอบสคีมา (Schema monitoring) ทำงานได้
- [ ] การบูรณาการเข้ากับ Airflow ทำงานได้
- [ ] ระบบแจ้งเตือนทำงานได้
- [ ] แดชบอร์ดทำงานได้
- [ ] มีการจัดเก็บประวัติคุณภาพข้อมูล
- [ ] มีการจำลองสถานการณ์เหตุการณ์ขัดข้อง (Incident simulations)
- [ ] มีรายงานเหตุการณ์ขัดข้อง (Incident reports)
- [ ] มีชุดแบบทดสอบอัตโนมัติ (Automated tests)
- [ ] README มีเนื้อหาครบถ้วนสมบูรณ์

โปรเจกต์สุดท้ายจะต้องแสดงให้เห็นอย่างชัดเจนถึง:

> ตรวจจับ → อธิบาย → แจ้งเตือน → หยุด/กู้คืน → ป้องกัน (Detect → Explain → Alert → Stop/Recover → Prevent)