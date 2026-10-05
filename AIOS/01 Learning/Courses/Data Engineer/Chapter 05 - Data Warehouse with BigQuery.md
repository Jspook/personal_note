# Data Engineer - Chapter 05: Data Warehouse with BigQuery

> **วิชา:** Road to Data Engineer 3.0 (R2DE 3.0) | **ผู้สอน:** DataTH
> **Source:** `Resources/Books/DataEngineer/5BigQuery.pdf` (88 slides)
> **หมายเหตุ:** ส่วนที่ติดป้าย `[เสริมนอกสไลด์]` คือความรู้ที่ผู้เขียนโน้ตเพิ่มเอง

---

## Part 1: Macro Architecture & Overview

ถ้า **Data Lake** คือโกดังที่กองของทุกอย่างไว้ **Data Warehouse** ก็คือ "ห้องสมุดที่จัดชั้นเรียบร้อย" พร้อมให้ค้นหาและวิเคราะห์ได้เร็ว Chapter 5 สอนแนวคิดของ Data Warehouse (Normalization/Denormalization, Columnar Storage, View, Partition) แล้วพาไปใช้ **Google BigQuery** ซึ่งเป็น **Serverless Data Warehouse** และปิดด้วยการต่อ Airflow ให้โหลดข้อมูลจาก GCS เข้า BigQuery อัตโนมัติ

```mermaid
flowchart TD
    GCS["Google Cloud Storage<br>(Data Lake)"] -->|Airflow DAG:<br>GCSToBigQueryOperator| BQ
    subgraph BQ["Google BigQuery Hierarchy"]
        direction TB
        Proj["GCP Project"] --> DS["Dataset"] --> Tab["Table / View"]
    end
    BQ --> Serve["Analytics & Serving<br>(SQL / BigQuery ML / Looker Studio)"]
```

### ตารางเปรียบเทียบ Normalize vs Denormalize

| Feature | Normalize | Denormalize |
| :--- | :--- | :--- |
| **แนวคิด** | แบ่งข้อมูลเป็นหลายตาราง ไม่เก็บซ้ำ | เก็บทุกอย่างในตารางเดียว |
| **พื้นที่เก็บ** | ประหยัด | สิ้นเปลืองกว่า (เว้นแต่ใช้ Columnar) |
| **การดึงข้อมูล** | ต้อง `JOIN` (ช้าเมื่อข้อมูลใหญ่) | ไม่ต้อง JOIN เร็ว |
| **เหมาะกับ** | ระบบ OLTP | Data Warehouse (OLAP) |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Recap: ทบทวนก่อนเข้าเรื่อง

| หัวข้อทบทวน | สรุป |
| :--- | :--- |
| **OLTP vs OLAP** | OLTP → Database; OLAP → Data Warehouse |
| **Data Warehouse** | เก็บ Structured ขนาดใหญ่ ส่วนมาก historical data ไม่เปลี่ยนแปลง |
| **เครื่องมือสร้าง Pipeline** | Pre-built connectors vs เขียนเอง |
| **Airflow** | Open-source ใช้ได้ทั้ง local, on-premise และ Cloud (Composer) |

---

### 2.2 Concept ของ Data Warehouse

#### 2.2.1 Normalization vs Denormalization

> **Normalization** = เทคนิคแบ่งข้อมูลเป็นหลายตาราง เพื่อไม่ให้เก็บข้อมูลซ้ำซ้อน ประหยัดพื้นที่ แลกกับต้อง **JOIN** ตอนดึงข้อมูล (ยิ่งตารางใหญ่ยิ่งช้า)

> **Denormalization** = เก็บข้อมูลทุกอย่างไว้ในตารางเดียว

**ตัวอย่าง `[เสริมนอกสไลด์]`:**

```text
Normalized:                         Denormalized:
 orders(order_id, customer_id)       sales(order_id, customer_name, city, product, amount)
 customers(customer_id, name, city)
 products(product_id, ...)
→ ต้อง JOIN 3 ตาราง                 → อ่านตารางเดียวจบ
```

**แล้วทำไม Denormalize แล้วยังประหยัดพื้นที่ได้?** คำตอบคือ **Columnar Storage**

#### 2.2.2 Row-based vs Columnar Storage

| | Row-based (ฐานข้อมูลทั่วไป) | Columnar (BigQuery, Redshift, Snowflake) |
| :--- | :--- | :--- |
| **เก็บอย่างไร** | เก็บเป็นแถวต่อกัน | เก็บแยกตามคอลัมน์ |
| **เหมาะกับ** | อ่าน/เขียนทีละ record | วิเคราะห์ (สรุปคอลัมน์เดียวทั้งตาราง) |
| **ข้อดี** | OLTP เร็ว | อ่านเฉพาะคอลัมน์ที่ต้องใช้ ค่าซ้ำในคอลัมน์บีบอัดได้ดี `[เสริมนอกสไลด์]` |

```text
ข้อมูล:  (1,A,100) (2,A,200) (3,B,300)

Row-based :  [1 A 100][2 A 200][3 B 300]
Columnar  :  [1 2 3] [A A B] [100 200 300]    ← "A A" บีบอัดได้
```

> **ตัวอย่าง:** คำสั่ง `SELECT SUM(amount) FROM sales` Columnar อ่านเฉพาะคอลัมน์ `amount` ไม่ต้องอ่านคอลัมน์อื่น

#### 2.2.3 Data Warehouse vs Data Mart

> **Data Mart** = ส่วนย่อยของ Warehouse ที่จัดให้เหมาะกับฝ่ายใดฝ่ายหนึ่ง เช่น Sales Mart

#### 2.2.4 Table vs View vs Materialized View

| | Table | View | Materialized View |
| :--- | :--- | :--- | :--- |
| **คืออะไร** | ตารางเก็บข้อมูลจริง | การเขียน SQL บันทึกไว้เป็นชื่อเรียกใช้ง่าย | View ที่เก็บผลลัพธ์ไว้ล่วงหน้า |
| **เขียนข้อมูลใส่** | ได้ | **ไม่ได้ (SELECT อย่างเดียว)** | ไม่ได้ |
| **ข้อมูล** | จริง | สดใหม่อัตโนมัติ ข้อมูลใหญ่คำนวณนาน | เร็วกว่า |

```sql
-- สร้าง View แล้วเรียกใช้เหมือน Table (ตัวอย่างตามสไลด์)
CREATE VIEW vw_customer_purchase AS
SELECT customer_id, SUM(amount) AS total_amount   -- [คอลัมน์ตัวอย่าง]
FROM transaction
GROUP BY customer_id;

SELECT * FROM vw_customer_purchase;               -- เรียกใช้เหมือน Table
```

#### 2.2.5 Index & Partitioning (Recap)

* **Partition:** แบ่งข้อมูลเป็นกลุ่มย่อย เช่น ตามวันที่ ข้อมูลวันเดียวกันอยู่ด้วยกัน
* **Index:** จดจำว่าแถวไหนอยู่ตรงไหน เพื่อเข้าถึงเร็วขึ้น

```sql
-- [เสริมนอกสไลด์] Query ที่ใช้ Partition ช่วย: ระบุเงื่อนไขวันที่ให้อ่านเฉพาะ partition ที่จำเป็น
SELECT * FROM scores WHERE exam_date = '2024-06-01';
```

หนังสือแนะนำเรื่องออกแบบ Data Warehouse ดูสไลด์ P.27

---

### 2.3 Google BigQuery

> **BigQuery** = Serverless Data Warehouse ของ Google Cloud Platform รองรับข้อมูลมหาศาล เขียน SQL Query ได้ทันที เริ่มต้นง่าย

**ข้อดี-ข้อเสีย:** สไลด์มีตารางสรุปที่ P.30 `[ข้อดีโดยทั่วไป: ไม่ต้องดูแล Server, ขยายอัตโนมัติ; ข้อเสียที่ควรระวัง: ค่าใช้จ่ายขึ้นกับการ Query — เสริมนอกสไลด์]`

#### 2.3.1 โครงสร้างการเข้าถึง

```text
Project  >  Dataset  >  Table
```

* **Project:** ระดับบนสุด (ผูกกับ Billing)
* **Dataset:** กลุ่มของตาราง (กำหนด Data Location)
* **Table:** ตารางข้อมูล

**ชนิดข้อมูลที่ใช้บ่อย:** ตัวเลข ข้อความ วันที่/เวลา ฯลฯ (สไลด์ P.32)

#### 2.3.2 ที่เก็บข้อมูลของ Table

| ประเภท | คำอธิบาย |
| :--- | :--- |
| **Native table** | เก็บข้อมูลภายใน BigQuery ประสิทธิภาพและอ่านเร็วสุด |
| **External query** | ใช้ `EXTERNAL_QUERY` ไป Query SQL database อื่นใน Google Cloud (เช่น Cloud SQL) โดยไม่ต้องย้ายข้อมูลเข้ามา |

#### 2.3.3 การคิดเงินของ BigQuery

| ส่วน | รายละเอียด (ตามสไลด์) |
| :--- | :--- |
| **On-demand: ค่า Query (Analysis)** | คิดตามข้อมูลที่ Query อ่าน |
| **On-demand: ค่า Storage** | คิดตามพื้นที่เก็บ |
| **ค่าโหลดข้อมูล (Ingestion)** | Batch Insert (โหลดทีละก้อน) vs แบบอื่นที่คิดเงินต่างกัน (P.36) |
| **Workload Management / Editions** | วิธีคิดเงินขั้นสูง สลับระหว่าง 2 วิธีได้ตอนใช้จริง |

> **ราคาจริงเปลี่ยนได้ ให้ดูหน้า Pricing ทางการของ Google Cloud** (ไม่ระบุตัวเลขในโน้ต)

**เทคนิคลดค่าใช้จ่าย:**
1. ใช้ **Preview tab** เมื่อต้องการดู data เพราะฟรี (ตามสไลด์)
2. BigQuery มี **Cache** ไม่เสียเงินถ้า Query เดิมซ้ำภายใน 24 ชั่วโมง (BigQuery ไม่การันตีเรื่องเวลา)
3. `[เสริมนอกสไลด์]` เลือกเฉพาะคอลัมน์ที่ต้องใช้ แทน `SELECT *` เพราะเป็น Columnar จึงคิดตามคอลัมน์ที่อ่าน
4. `[เสริมนอกสไลด์]` ใช้เงื่อนไข Partition ใน `WHERE`

```sql
-- ไม่ดี: อ่านทุกคอลัมน์ (ค่าใช้จ่ายสูง)
SELECT * FROM workshop.transaction;

-- ดีกว่า: อ่านเฉพาะคอลัมน์ที่ต้องใช้
SELECT date, thb_amount FROM workshop.transaction;
```

#### 2.3.4 การแชร์และสิทธิ์

แชร์ได้ทั้งระดับ Project, Dataset, Table หรือ View โดยอ้างอิง Google Account (เช่น Gmail)

#### 2.3.5 BigQuery ML

สร้าง Machine Learning model ด้วย **SQL** ลดขั้นตอนให้ง่ายขึ้น (รองรับโมเดลหลายประเภท ตัวอย่างดู P.43)

```sql
-- [เสริมนอกสไลด์] แนวคิดการสร้างโมเดลด้วย SQL ใน BigQuery ML
CREATE OR REPLACE MODEL `my_dataset.sales_model`
OPTIONS (model_type = 'linear_reg', input_label_cols = ['thb_amount']) AS
SELECT quantity, unit_price, thb_amount FROM `my_dataset.transaction`;
```

---

### 2.4 3 วิธี Load Data เข้า BigQuery

| # | วิธี | ลักษณะ |
| :--- | :--- | :--- |
| 1 | **Console (Web UI)** | Manual, ทำครั้งเดียว/ทดลอง |
| 2 | **`bq load`** ใน BashOperator | Automatic ผ่านคำสั่ง CLI |
| 3 | **`GCSToBigQueryOperator`** | Automatic ผ่าน Airflow Provider (ทางที่ Workshop เน้น) |

```python
# ตัวอย่างโหลดไฟล์จาก GCS เข้า BigQuery ด้วย Airflow Operator (ชื่อ import ตามสไลด์)
from airflow.providers.google.cloud.transfers.gcs_to_bigquery import GCSToBigQueryOperator

load_to_bq = GCSToBigQueryOperator(
    task_id="load_to_bq",
    bucket="<BUCKET_NAME>",                          # ใส่ชื่อ bucket ของคุณ
    source_objects=["data/transaction.parquet"],     # [path ตัวอย่าง]
    destination_project_dataset_table="workshop.transaction",
    source_format="PARQUET",
    write_disposition="WRITE_TRUNCATE",              # [เสริม] เขียนทับ ช่วยให้ rerun แล้วไม่ซ้ำ (Idempotent)
)
```

> **สังเกต:** `WRITE_TRUNCATE` ทำให้รันซ้ำแล้วผลเท่าเดิม เชื่อมกับหลัก Idempotent ใน [[Chapter 04 - Data Pipeline Orchestration with Airflow]]

---

### 2.5 Workshop 5: Data Warehouse with BigQuery

* **โจทย์:** จาก Workshop 4 ที่ได้ไฟล์ Parquet บน GCS Data Lake แล้ว จะนำข้อมูลเข้าสู่ BigQuery Data Warehouse โดยอัตโนมัติได้อย่างไร
* **การจัดการโค้ดบน Cloud Shell:**
  ```bash
  # Clone โค้ดลงในโฟลเดอร์ใหม่ workshop5
  git clone https://github.com/DataTH-Team/r2de3-workshops.git workshop5
  cd workshop5/dags

  # สำหรับกรณีใช้โปรเจกต์เดิมแล้วติด conflict จากไฟล์ที่แก้ไข:
  git stash        # เก็บการเปลี่ยนแปลงไว้ชั่วคราว
  git pull         # อัปเดตโค้ดล่าสุดจากรีโป
  git stash pop    # นำการเปลี่ยนแปลงกลับคืนมา
  ```

---

#### 2.5.1 ภาพรวมลำดับการทำงาน (Workflow Progression)

| ขั้น | วิธีการ | รายละเอียด |
| :--- | :--- | :--- |
| **1** | สร้าง **Dataset** ใน BigQuery | ตั้งชื่อ Dataset เช่น `workshop` (เลือก Data location ให้ตรงกับ Bucket) |
| **2.1** | Manual Ingestion | ทดลอง Load ไฟล์ Parquet ผ่าน BigQuery Console ด้วยตนเอง เพื่อตรวจสอบ Schema |
| **3** | ทดสอบ Query เบื้องต้น | `SELECT count(distinct date) FROM workshop.transaction;` |
| **2.2** | Automatic: CLI ผ่าน `BashOperator` | ใช้คำสั่ง `bq load` โหลดไฟล์จาก GCS เข้า BigQuery Table |
| **2.3** | Automatic: Native Provider | ใช้ `GCSToBigQueryOperator` ของ Airflow จัดการแบบ Declarative |

> 💡 **ทำไมต้อง Manual ก่อน Automatic:**
> การทำมือ (Manual) ช่วยให้เห็น Data Types, ตรวจสอบ Schema Mismatch และมั่นใจในผลลัพธ์ที่ถูกต้องก่อน เมื่อนำไปทำเป็น Automation ใน DAG จึงมี Baseline ในการตรวจสอบว่า Task ทำงานถูกต้อง

---

#### 2.5.2 แนวทางที่ 1: โหลดข้อมูลด้วย `BashOperator` + `bq load` (`workshop5_bq_load.py`)

ใช้ CLI `bq load` สั่งการ BigQuery โดยตรงผ่าน `BashOperator`:

```python
from airflow.models import DAG
from airflow.decorators import dag, task
from airflow.operators.bash import BashOperator
from airflow.providers.mysql.hooks.mysql import MySqlHook
from airflow.utils.dates import days_ago
import pandas as pd
import requests

MYSQL_CONNECTION = "mysql_default"
CONVERSION_RATE_URL = "https://r2de3-currency-api-vmftiryt6q-as.a.run.app/gbp_thb"

mysql_output_path = "/home/airflow/gcs/data/transaction_data_merged.parquet"
conversion_rate_output_path = "/home/airflow/gcs/data/conversion_rate.parquet"
final_output_path = "/home/airflow/gcs/data/workshop4_output.parquet"

default_args = {'owner': 'datath'}

@task()
def get_data_from_mysql(output_path):
    mysqlserver = MySqlHook(MYSQL_CONNECTION)
    product = mysqlserver.get_pandas_df(sql="SELECT * FROM r2de3.product")
    customer = mysqlserver.get_pandas_df(sql="SELECT * FROM r2de3.customer")
    transaction = mysqlserver.get_pandas_df(sql="SELECT * FROM r2de3.transaction")

    merged = transaction.merge(product, how="left", on="ProductNo").merge(customer, how="left", on="CustomerNo")
    merged.to_parquet(output_path, index=False)

@task()
def get_conversion_rate(output_path):
    r = requests.get(CONVERSION_RATE_URL)
    df = pd.DataFrame(r.json()).drop(columns=['id'])
    df['date'] = pd.to_datetime(df['date'])
    df.to_parquet(output_path, index=False)

@task()
def merge_data(transaction_path, conversion_rate_path, output_path):
    transaction = pd.read_parquet(transaction_path)
    conversion_rate = pd.read_parquet(conversion_rate_path)

    final_df = transaction.merge(conversion_rate, how="left", left_on="Date", right_on="date")
    final_df["total_amount"] = final_df["Price"] * final_df["Quantity"]
    final_df["thb_amount"] = final_df["total_amount"] * final_df["gbp_thb"]
    final_df = final_df.drop(["date", "gbp_thb"], axis=1)
    final_df.columns = [
        'transaction_id', 'date', 'product_id', 'price', 'quantity', 'customer_id',
        'product_name', 'customer_country', 'customer_name', 'total_amount', 'thb_amount'
    ]
    final_df.to_parquet(output_path, index=False)

@dag(default_args=default_args, schedule_interval="@once", start_date=days_ago(1), tags=["workshop"])
def workshop5_bash():
    """โหลดข้อมูลเข้า BigQuery ด้วย bq load ผ่าน BashOperator"""
    t1 = get_data_from_mysql(output_path=mysql_output_path)
    t2 = get_conversion_rate(output_path=conversion_rate_output_path)
    t3 = merge_data(
        transaction_path=mysql_output_path,
        conversion_rate_path=conversion_rate_output_path,
        output_path=final_output_path
    )

    # Task 4: เรียกคำสั่ง bq load ใน bash
    t4 = BashOperator(
        task_id="bq_load",
        bash_command="bq load --source_format=PARQUET workshop.transaction1 gs://<CLOUD-COMPOSER-BUCKET>/data/workshop4_output.parquet"
    )

    [t1, t2] >> t3 >> t4

workshop5_bash()
```

---

#### 2.5.3 แนวทางที่ 2: โหลดข้อมูลด้วย Native Provider (`workshop5_gcs_to_bq.py`)

ใช้ `GCSToBigQueryOperator` ซึ่งเป็น Best Practice บน Airflow มี Error Handling และ State Management ที่รัดกุมกว่า:

```python
from airflow.decorators import dag, task
from airflow.providers.google.cloud.transfers.gcs_to_bigquery import GCSToBigQueryOperator
from airflow.providers.mysql.hooks.mysql import MySqlHook
from airflow.utils.dates import days_ago
import pandas as pd
import requests

MYSQL_CONNECTION = "mysql_default"
CONVERSION_RATE_URL = "https://r2de3-currency-api-vmftiryt6q-as.a.run.app/gbp_thb"

mysql_output_path = "/home/airflow/gcs/data/transaction_data_merged.parquet"
conversion_rate_output_path = "/home/airflow/gcs/data/conversion_rate.parquet"
final_output_path = "/home/airflow/gcs/data/workshop4_output.parquet"

default_args = {'owner': 'datath'}

# Tasks: get_data_from_mysql, get_conversion_rate, merge_data (เหมือนในหัวข้อ 2.5.2)

@dag(default_args=default_args, schedule_interval="@once", start_date=days_ago(1), tags=["workshop"])
def workshop5():
    """โหลดข้อมูลเข้า BigQuery ผ่าน GCSToBigQueryOperator"""
    t1 = get_data_from_mysql(output_path=mysql_output_path)
    t2 = get_conversion_rate(output_path=conversion_rate_output_path)
    t3 = merge_data(
        transaction_path=mysql_output_path,
        conversion_rate_path=conversion_rate_output_path,
        output_path=final_output_path
    )

    # Task 4: Native Operator สำหรับ GCS -> BigQuery
    t4 = GCSToBigQueryOperator(
        task_id="gcs_to_bigquery",
        bucket="<CLOUD-COMPOSER-BUCKET>",
        source_objects=["data/workshop4_output.parquet"],
        source_format="PARQUET",
        destination_project_dataset_table="workshop.transaction",
        write_disposition="WRITE_TRUNCATE"  # เขียนทับทุกครั้งเพื่อรองรับ Idempotency
    )

    [t1, t2] >> t3 >> t4

workshop5()
```

---

#### 2.5.4 การตรวจสอบความถูกต้องใน BigQuery (Data Verification)

หลังจาก DAG รันสำเร็จ สามารถเปิด BigQuery Studio และรัน SQL เพื่อตรวจสอบความสมบูรณ์ของข้อมูล:

```sql
-- 1. ตรวจสอบจำนวนวันทั้งหมดที่มีธุรกรรม
SELECT count(distinct date) AS total_dates FROM `workshop.transaction`;

-- 2. ตรวจสอบยอดขายรวมสกุลเงินบาท
SELECT SUM(thb_amount) AS total_revenue_thb FROM `workshop.transaction`;
```

**Bonus Tools:** `bigframes` ไลบรารี Python เขียน DataFrame แบบ Pandas แต่รัน Job บน BigQuery

---

### 2.6 Bonus: Google's Data Cloud

#### 2.6.1 Data Lakehouse & BigLake

> **Data Lakehouse** = สถาปัตยกรรมที่ผสมจุดเด่นของ Data Lake และ Data Warehouse เพื่อจัดการและวิเคราะห์ข้อมูลได้ยืดหยุ่นขึ้น

| | Data Lake | Data Warehouse | Lakehouse |
| :--- | :--- | :--- | :--- |
| **จุดเด่น** | เก็บไฟล์ทุกรูปแบบ ราคาถูก | Query เร็ว มีโครงสร้าง | รวมทั้งสองอย่าง |

> **BigLake** = Storage Engine ที่สร้าง connection ให้ใช้ความสามารถ storage ของ BigQuery ได้ แม้ข้อมูลอยู่ที่ Cloud Storage

* **BigLake Table:** ระบบเก็บไฟล์ที่เชื่อมกับ BigQuery โดยตรง อ่านไฟล์ด้วย BigQuery ได้
* **Main Features (ตามสไลด์):** Fine-grain security (ระดับ Column ฯลฯ), รองรับหลาย data formats และหลาย Data Source
* **Apache Iceberg:** สไลด์แสดงตัวอย่างสร้างตาราง Iceberg ด้วย Dataproc Spark

#### 2.6.2 Dataplex & Analytics Hub

| บริการ | ใช้ทำอะไร (ตามสไลด์) |
| :--- | :--- |
| **Dataplex** | รวมศูนย์ Data ทั้งหมดบน Google (Data Mesh / Data Fabric) รวมข้อมูลจากหลายที่ทั้ง On-premise และ Cloud |
| **Analytics Hub** | แชร์ข้อมูล |

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญ
* [ ] **OLTP vs OLAP** → Database vs Data Warehouse
* [ ] **Normalize vs Denormalize:** JOIN เยอะ vs ตารางเดียว
* [ ] **Columnar Storage:** ทำให้ Denormalize แล้วยังประหยัดและเร็ว
* [ ] **Data Warehouse vs Data Mart**
* [ ] **Table / View / Materialized View**
* [ ] **Partition / Index**
* [ ] **BigQuery:** Serverless, `Project > Dataset > Table`
* [ ] **Native vs External (`EXTERNAL_QUERY`)**
* [ ] **ราคา:** Query + Storage + Ingestion, Cache 24 ชม., Preview ฟรี
* [ ] **BigQuery ML:** สร้างโมเดลด้วย SQL
* [ ] **3 วิธี Load:** Console / `bq load` / `GCSToBigQueryOperator`
* [ ] **Lakehouse / BigLake / Dataplex / Analytics Hub**

### Decision Rules

```text
อยากเห็น data ตัวอย่างโดยไม่เสียเงิน     → Preview tab
Query ซ้ำเดิมภายใน 24 ชม.                 → Cache (ไม่คิดเงิน)
View ช้าเพราะข้อมูลใหญ่                    → Materialized View
ต้อง Query ข้อมูลบน GCS ด้วยพลัง BigQuery → BigLake
```

### Concept Map

```text
Data Warehouse
├── แนวคิด: Normalize/Denormalize, Columnar, Mart, View, Partition/Index
├── BigQuery: Project>Dataset>Table, Native/External, Pricing, Share, BQML
├── Load: Console / bq load / GCSToBigQueryOperator
└── Lakehouse Ecosystem: BigLake, Iceberg, Dataplex, Analytics Hub
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **"Denormalize เปลืองพื้นที่เสมอ":** กับ Columnar Storage ค่าซ้ำในคอลัมน์บีบอัดได้ดี จึงเปลืองน้อยกว่าที่คิด
* **"View เก็บข้อมูลไว้เอง":** View เป็นแค่ SQL ที่บันทึกชื่อไว้ คำนวณสดทุกครั้ง ส่วนที่เก็บผลไว้คือ Materialized View
* **"`SELECT *` กับ `LIMIT` ทำให้ถูกลง":** BigQuery คิดตามข้อมูลที่อ่าน `LIMIT` ไม่ลดค่า scan `[เสริมนอกสไลด์]` ให้เลือกคอลัมน์ที่จำเป็นและใช้ Preview แทน
* **"BigQuery ไม่ต้องดูแลอะไรเลย":** ยังต้องออกแบบ Dataset/Location/สิทธิ์ และคุมค่าใช้จ่ายเอง
* **"Dataset คนละ Location Query ข้ามกันได้ง่าย":** สไลด์เตือนว่า Data location สำคัญ ต้องสอดคล้องกัน (ระหว่าง Dataset และข้อมูลต้นทาง)
* **"BigQuery เหมาะกับงาน OLTP ของ App":** BigQuery คือ OLAP ใช้วิเคราะห์ ไม่ใช่แทน Database ของ App `[เสริมนอกสไลด์]`

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 04 - Data Pipeline Orchestration with Airflow]] (DAG ที่ใช้โหลดข้อมูลเข้า BigQuery)
  * [[Chapter 06 - Report & Dashboard with Looker Studio]] (ใช้ BigQuery table/view เป็น Data Source)
  * [[Chapter 03 - Cloud Computing and Bash]] (GCS ต้นทางข้อมูล)
  * [[Chapter 01 Introduction to Database System & Relational Model]] (ทฤษฎี Relational / Normalization)
  * [[LAB 8 - SQL GROUP BY and Aggregate Functions]] (SQL ที่ใช้ Query ใน BigQuery)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DataEngineer/5BigQuery.pdf` (88 slides, DataTH)
  * Reference: Google Cloud Documentation — BigQuery (cloud.google.com/bigquery/docs) `[เสริมนอกสไลด์]`
