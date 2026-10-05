# Data Engineer - Chapter 04: Data Pipeline Orchestration with Airflow

> **วิชา:** Road to Data Engineer 3.0 (R2DE 3.0) | **ผู้สอน:** DataTH
> **Source:** `Resources/Books/DataEngineer/4Airflow.pdf` (79 slides)
> **หมายเหตุ:** ส่วนที่ติดป้าย `[เสริมนอกสไลด์]` คือความรู้ที่ผู้เขียนโน้ตเพิ่มเอง

---

## Part 1: Macro Architecture & Overview

ลองนึกถึง **ผู้จัดการวงออร์เคสตรา**: นักดนตรีแต่ละคน (Task) เก่งของตัวเอง แต่ต้องมีคนบอกว่าใครเริ่มเมื่อไร ใครรอใคร และถ้าใครเล่นผิดจะทำอย่างไร Chapter 4 คือการสร้าง "ผู้จัดการ" ให้ Pipeline ด้วย **Apache Airflow** (รันบน **Google Cloud Composer**) เพื่อให้ Pipeline ทำงานอัตโนมัติ ตรวจสอบสถานะได้ และจัดการ Dependency ระหว่างงาน

```mermaid
flowchart TD
    subgraph Airflow["Apache Airflow Core Components"]
        UI["Web UI"] <--> Meta[("Metadata DB")]
        Sched["Scheduler"] --> Meta
        Sched --> Workers["Workers (รัน Task)"]
        UI <--> Sched
        DAG["DAG: [extract] ➔ [transform] ➔ [load]"]
        Sched -.->|ควบคุมคิวงาน| DAG
    end
```
> **Google Cloud Composer** = Airflow ที่ Google ติดตั้งและดูแลให้แบบ Fully Managed (ใช้ GCS เก็บไฟล์ DAG)

### ตารางเปรียบเทียบเครื่องมือ Orchestration

| Feature | Cron | Apache Airflow |
| :--- | :--- | :--- |
| **แนวคิด** | ตั้งเวลารันคำสั่งง่ายๆ (มากับ Linux) | จัดการ Pipeline ทั้งชุดเป็นกราฟ |
| **Dependency ระหว่างงาน** | ไม่มีในตัว | มี (กำหนดด้วย DAG) |
| **UI ตรวจสอบสถานะ** | ไม่มี | มี Web UI |
| **เหมาะกับ** | งานเดี่ยวๆ ง่ายๆ | Pipeline หลายขั้นที่ต้องเชื่อมกัน |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 สร้าง Cloud Composer Cluster (ก่อนเริ่มเรียน)

สไลด์ให้สร้าง Composer Environment ไว้ก่อนเพราะใช้เวลานาน ขั้นตอนหลัก: Enable Cloud Composer API (ครั้งแรก) → Create Environment (Composer 2 ต้อง Grant permission ผ่านหน้า IAM) → รอสร้างเสร็จ

> **คำเตือน `[เสริมนอกสไลด์]`:** Composer เป็นบริการที่คิดเงินตามเวลาที่เปิดอยู่ เมื่อจบ Workshop ควรลบ Environment และดูค่าใช้จ่ายใน Billing

---

### 2.2 Data Pipeline Orchestration คืออะไร

**Automation** ทำให้ Pipeline ทำงานเองอัตโนมัติ แต่เมื่อข้อมูลหลากหลายขึ้น Pipeline ก็เพิ่มขึ้นและมี **Dependency** (การพึ่งพา) ระหว่างกัน เช่น "ต้องรอ Pipeline A เสร็จก่อน B ถึงเริ่มได้" จึงต้องมีตัวจัดการ

> **Orchestration** = การจัดตาราง ควบคุมลำดับ ติดตามสถานะ และจัดการข้อผิดพลาดของ Data Pipeline หลายตัวให้ทำงานประสานกัน

**แบบเก่า: Cron** เครื่องมือตั้งเวลาที่มากับ Linux ใช้ง่ายแต่จัดการ Dependency ไม่ได้

**เครื่องมือสมัยใหม่ในสไลด์:** Azkaban (เริ่มโดย LinkedIn เหมาะกับ Hadoop), Airflow และอื่นๆ `[ตัวอย่างอื่นเสริมนอกสไลด์: Luigi, Prefect, Dagster]`

---

### 2.3 Apache Airflow

> **Apache Airflow** = เครื่องมือที่ Airbnb สร้างปี 2015 เพื่อทำ Data Pipeline Orchestration (Open-source ใช้ได้ทั้งบนเครื่องตัวเอง on-premise และ Cloud ตามที่สไลด์ CH5 ย้ำ)

**Airbnb ใช้ Airflow ทำอะไร (ตามสไลด์):** Data Cleansing, ตรวจคุณภาพข้อมูล และงานอื่นๆ ที่เป็น Pipeline

**Community:** มีผู้กดดาวบน GitHub มากกว่า 35,000+ (ตัวเลข ณ เวลาที่ทำสไลด์) และมีงานประจำปี **Airflow Summit**

#### 2.3.1 ส่วนประกอบของ Airflow

| ส่วนประกอบ | หน้าที่ `[คำอธิบายเสริมนอกสไลด์]` |
| :--- | :--- |
| **Web UI** | ดู/ควบคุม DAG เปิด-ปิด ดู Schedule และผลการรันในอดีต |
| **Scheduler** | ตัดสินว่า Task ไหนถึงเวลารัน |
| **Workers** | ทำงานจริงของแต่ละ Task |
| **Metadata Database** | เก็บสถานะการรันและการตั้งค่า |
| **CLI** | สั่งงาน Pipeline ผ่านคำสั่ง |
| **Providers** | ตัวเชื่อมต่อกับระบบอื่นๆ มากมาย (GCP, AWS, MySQL ฯลฯ) |

#### 2.3.2 DAG: หัวใจของ Airflow

> **DAG (Directed Acyclic Graph)** = กราฟที่มีทิศทางและ **ไม่วนกลับ** (วิ่งทางเดียว) 1 Data Pipeline ใน Airflow = 1 DAG

```mermaid
flowchart TD
    subgraph Bad["❌ ผิด (มี Loop วนกลับ — ไม่ใช่ DAG)"]
        direction LR
        A1["A"] --> B1["B"] --> C1["C"]
        C1 -.->|"วนกลับ (Loop)"| A1
    end

    subgraph Good["✅ ถูก (DAG — มีทิศทางและไม่วนกลับ)"]
        direction LR
        A2["A"] --> B2["B"] --> D2["D"]
        B2 --> C2["C"] --> D2
    end
```

* **Task:** หน่วยงานย่อยใน DAG
* **Task Status:** แต่ละ Task มีสถานะกำกับ (เช่น สำเร็จ ล้มเหลว กำลังรัน) ดูได้ใน UI
* **Task หลัก 2 แบบ (สไลด์):** **Operator** (ทำงาน) และ **Sensor** (รอเงื่อนไข)
* **Graph View:** ดูโครงสร้าง DAG ว่าแต่ละ Task ต่อกันอย่างไร
* **TaskGroup:** รวม Task ที่เกี่ยวข้องเป็นกลุ่มย่อยเพื่อให้ DAG อ่านง่าย

**ตัวอย่าง ETL DAG (สไลด์ P.28):** E (Extract) → T (Transform) → L (Load) แต่ละขั้นเป็น 1 Task

#### 2.3.3 Airflow แบบ Managed

| บริการ | ผู้ให้ | จุดเด่น |
| :--- | :--- | :--- |
| **Cloud Composer** | Google Cloud | ติดตั้งดูแลให้ ใช้ร่วมกับ GCS/BigQuery ง่าย |
| **Astro** | Astronomer | สำหรับคนไม่อยากติด Vendor Lock-in กับ Google |
| **Amazon MWAA** | AWS | Airflow บน AWS |

**โบนัส:** ใน Extra Chapter มีสอน Airflow on Docker ติดตั้งบนเครื่องตัวเอง

---

### 2.4 สร้าง Airflow DAG

#### 2.4.1 โครงสร้างไฟล์ DAG (5 ขั้นตอนตามสไลด์)

| ขั้น | ทำอะไร |
| :--- | :--- |
| 1. **Importing Modules** | import DAG และ Operator ที่ต้องใช้ |
| 2. **Default Arguments** | config กลางที่ใช้กับทุก Task ถ้าไม่ได้เขียนทับ |
| 3. **Instantiate a DAG** | สร้าง DAG object (ตั้ง schedule, ชื่อ ฯลฯ) |
| 4. **Tasks** | สร้าง Operator โดยมี `task_id` ไม่ซ้ำกัน |
| 5. **Setting up Dependencies** | กำหนดลำดับ Task |

```python
# ตัวอย่าง DAG ง่ายๆ (อิงโครงสร้างตามสไลด์: import → default_args → DAG → tasks → dependencies)
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator   # สไลด์ใช้ BashOperator เป็นตัวอย่าง

default_args = {                       # config กลางใช้ร่วมกันทุก Task
    "owner": "me",
    "retries": 1,                      # ล้มเหลวแล้วลองใหม่ 1 ครั้ง [ค่าตัวอย่าง]
    "retry_delay": timedelta(minutes=5),
}

with DAG(
    dag_id="hello_pipeline",           # ชื่อ DAG ต้องไม่ซ้ำ
    default_args=default_args,
    start_date=datetime(2024, 5, 1),
    schedule_interval="@daily",        # ใช้ Preset หรือ Cron ได้ (เช่น "0 6 * * *")
    catchup=False,                     # ไม่รันย้อนหลังทุกวันที่ผ่านมา [เสริมนอกสไลด์]
) as dag:
    t1 = BashOperator(task_id="say_hello", bash_command="echo 'Hello World'")
    t2 = BashOperator(task_id="say_bye", bash_command="echo 'Bye'")

    t1 >> t2                           # t1 ต้องเสร็จก่อน t2 เริ่ม
```

> **หมายเหตุ `[เสริมนอกสไลด์]`:** ชื่อพารามิเตอร์ schedule ใน Airflow รุ่นใหม่เปลี่ยนเป็น `schedule` ถ้าเวอร์ชันของ Composer ที่ใช้ต่างกัน ให้ตรวจเอกสารตามเวอร์ชัน (สไลด์มีหน้า Cloud Composer แต่ละ version ต่างกันอย่างไร)

#### 2.4.2 Schedule Interval และแนวคิด ETL ของ Airflow

* ใช้ **Preset** หรือ **Cron expression** ได้ (สไลด์แนะนำ crontab.guru ช่วยสร้าง Cron)
* Airflow ออกแบบตามแนวคิดว่า ETL ของช่วงเวลาหนึ่ง จะรัน **เมื่อช่วงเวลานั้นสิ้นสุดแล้ว** (เช่น ETL ของวันนี้ต้องรอข้อมูลครบทั้งวัน ก่อนรัน)

#### 2.4.3 Operator ที่พบบ่อย

| Operator | ใช้ทำอะไร |
| :--- | :--- |
| `BashOperator` | รันคำสั่ง Bash (`bash_command`) |
| `PythonOperator` / TaskFlow `[เสริม]` | รันฟังก์ชัน Python |
| `EmptyOperator` / `DummyOperator` | ไม่ทำอะไร ใช้เป็นจุดรวม/แยกใน DAG |

#### 2.4.4 Dependencies

```python
t1 >> t2            # t1 ก่อน t2 (เรียงลำดับ)
t1 >> [t2, t3]      # Fan-out: t1 เสร็จแล้ว t2 และ t3 รันพร้อมกัน
[t2, t3] >> t4      # Fan-in:  t2 และ t3 เสร็จทั้งคู่ถึงรัน t4
```

```mermaid
flowchart TD
    subgraph Linear["Linear: t1 >> t2"]
        direction LR
        L1["t1"] --> L2["t2"]
    end

    subgraph FanOut["Fan-out: t1 >> [t2, t3]"]
        direction LR
        F1["t1"] --> F2["t2"]
        F1 --> F3["t3"]
    end

    subgraph FanIn["Fan-in: [t2, t3] >> t4"]
        direction LR
        I1["t2"] --> I3["t4"]
        I2["t3"] --> I3
    end
```

#### 2.4.5 Bonus: Atomic & Idempotent

| หลักการ | ความหมาย `[คำอธิบายขยายนอกสไลด์]` | ตัวอย่าง |
| :--- | :--- | :--- |
| **Atomic** | Task ทำสำเร็จทั้งหมดหรือไม่ทำเลย | ไม่โหลดข้อมูลแค่ครึ่งเดียว |
| **Idempotent** | รันซ้ำกี่ครั้งผลลัพธ์ก็เหมือนเดิม | โหลดข้อมูลของวันที่ X ด้วยการ "แทนที่" ไม่ใช่ "เพิ่มต่อท้าย" |

> **ทำไมสำคัญ:** Pipeline ล้มกลางทางเป็นเรื่องปกติ ถ้า Idempotent เราสั่ง rerun ได้อย่างมั่นใจโดยข้อมูลไม่ซ้ำ

---

### 2.5 Workshop 4: Automated Data Pipeline with Airflow

* **เป้าหมาย:** นำ Pipeline ที่เขียนไว้ใน Workshop 1 มาเปลี่ยนให้เป็นระบบอัตโนมัติบน Apache Airflow (Cloud Composer) ดึงข้อมูลจาก MySQL และ Currency API นำมาผสาน (Merge) คำนวณยอดขาย และบันทึกเป็น Parquet ส่งเข้า Data Lake (GCS)

---

#### 2.5.1 การเตรียมสภาพแวดล้อมและโค้ดผ่าน Cloud Shell

1. จัดการ Composer environment และติดตั้ง **Python packages** (ใช้เวลาราว 7-10 นาที)
2. **Clone โค้ดเริ่มต้นผ่าน Git บน Cloud Shell:**
   ```bash
   git clone https://github.com/DataTH-Team/r2de3-workshops.git
   cd r2de3-workshops/dags
   ```
3. เปิดแก้ไขโค้ดด้วย Cloud Shell Editor
4. **Deploy DAG ขึ้น Cloud Composer:**
   เมื่อแก้ไขไฟล์เสร็จแล้ว ให้คัดลอกไฟล์ขึ้นโฟลเดอร์ `dags` ใน GCS Bucket ของ Composer:
   ```bash
   gsutil cp file.py gs://<CLOUD-COMPOSER-BUCKET>/dags
   ```
   > 💡 **โครงสร้าง GCS Mount ใน Composer:**
   > - โฟลเดอร์ DAGs: `/home/airflow/gcs/dags/` ตรงกับ `gs://<CLOUD-COMPOSER-BUCKET>/dags/`
   > - โฟลเดอร์ Data: `/home/airflow/gcs/data/` ตรงกับ `gs://<CLOUD-COMPOSER-BUCKET>/data/`

---

#### 2.5.2 การสร้าง MySQL Connection บน Airflow UI

1. กดปุ่ม **OPEN AIRFLOW UI** จาก Cloud Composer Console
   
   ![Open Airflow UI](attachments/de_ws4_composer_airflow_ui.png)

2. ไปที่เมนู **Admin > Connections** แล้วกดปุ่ม **+** (Add a new record)
   
   ![Airflow Connections Menu](attachments/de_ws4_airflow_connections_menu.png)

3. กรอกข้อมูลการเชื่อมต่อฐานข้อมูลตามตาราง และกด **Save**:

   | ฟิลด์ | ค่าที่ต้องกรอก |
   | :--- | :--- |
   | **Connection Id \*** | `mysql_default` |
   | **Connection Type \*** | `MySQL` |
   | **Description** | `R2DE database` |
   | **Host** | `34.136.184.58` |
   | **Schema** | `r2de3` |
   | **Login** | `r2de3` |
   | **Password** | `Roady-to-DE-star-3.0` |
   | **Port** | `3306` |

   ![MySQL Connection Form](attachments/de_ws4_airflow_mysql_connection_config.png)

> 🔒 **Connection Security:** การใช้ Airflow Connection ช่วยแยก Credentials ออกจากโค้ด DAG เพื่อความปลอดภัยและเป็นไปตามหลัก Twelve-Factor App ห้าม Hardcode Password ในโค้ด Python

---

#### 2.5.3 แบบฝึกหัดปูพื้นฐาน (Exercise 1 - 3)

##### Exercise 1: TaskFlow API (Airflow 2.0+)
โค้ดแบบ TaskFlow ใช้ Decorator `@dag` และ `@task` ทำให้อ่านง่ายและรองรับ XCom ส่งค่าง่ายขึ้น:

```python
import datetime
from airflow.decorators import dag, task
from airflow.utils.dates import days_ago

default_args = {'owner': 'datath'}

@task()
def print_hello():
    print("Hello World!")

@task()
def print_date():
    print(datetime.datetime.now())

@dag(default_args=default_args, schedule_interval="@once", start_date=days_ago(1), tags=['exercise'])
def exercise1_taskflow_dag():
    t1 = print_hello()
    t2 = print_date()
    t1 >> t2

exercise1_dag = exercise1_taskflow_dag()
```

##### Exercise 2: Fan-out Pipeline (การแตกสายงานแบบ Parallel)
กระจายงานให้ทำงานพร้อมกัน โดยผสมผสาน TaskFlow เข้ากับ Standard Operator (เช่น `BashOperator`):

```python
import datetime
from airflow.decorators import dag, task
from airflow.operators.bash import BashOperator
from airflow.utils.dates import days_ago

default_args = {'owner': 'datath'}

@task()
def print_hello():
    print("Hello World!")

@task()
def print_date():
    print(datetime.datetime.now())

@dag(default_args=default_args, schedule_interval="@once", start_date=days_ago(1), tags=['exercise'])
def exercise2_taskflow_dag():
    t1 = print_hello()
    t2 = print_date()
    t3 = BashOperator(task_id="list_file_gcs", bash_command="gsutil ls")

    # Fan-out: เมื่อ t1 จบ ให้รัน t2 และ t3 แบบคู่ขนาน
    t1 >> [t2, t3]

exercise2_dag = exercise2_taskflow_dag()
```

##### Exercise 3: Fan-in Pipeline (การรวมสายงาน)
การรวมงานหลายตัวเข้าสู่จุดเดียว และการใช้ Loop สร้าง Tasks แบบกระชับ:

```python
from airflow.models import DAG
from airflow.operators.dummy import DummyOperator
from airflow.utils.dates import days_ago

with DAG("exercise3_fan_in_dag_w_loop", start_date=days_ago(1), schedule_interval="@once", tags=["exercise"], owner="datath") as dag:
    dag.doc_md = """
    # Exercise 3: Fan-in Pipeline แบบใช้ loop
    สร้าง task จำลองด้วย DummyOperator เพื่อกำหนด Dependency ซับซ้อน
    """
    t = [DummyOperator(task_id=f"task_{i}") for i in range(7)]

    # Fan-in: t0, t1, t2 ทำงานเสร็จ จึงเริ่ม t4
    [t[0], t[1], t[2]] >> t[4]
    # รวมผลลัพธ์ t3, t4, t5 เข้าสู่ขั้นตอนสุดท้าย t6
    [t[3], t[4], t[5]] >> t[6]
```

---

#### 2.5.4 โค้ด Production Pipeline ฉบับสมบูรณ์ (`workshop4.py`)

โค้ดรวมทั้ง Pipeline: ดึง MySQL ด้วย `MySqlHook`, ดึง API ด้วย `requests`, Transform รวมข้อมูลด้วย `pandas`, และบันทึกเป็น Parquet ขึ้น GCS mount:

```python
from airflow.models import DAG
from airflow.decorators import dag, task
from airflow.providers.mysql.hooks.mysql import MySqlHook
from airflow.utils.dates import days_ago
import pandas as pd
import requests

MYSQL_CONNECTION = "mysql_default"
CONVERSION_RATE_URL = "https://r2de3-currency-api-vmftiryt6q-as.a.run.app/gbp_thb"

# กำหนดเส้นทางไฟล์ใน GCS mount ของ Cloud Composer
mysql_output_path = "/home/airflow/gcs/data/transaction_data_merged.parquet"
conversion_rate_output_path = "/home/airflow/gcs/data/conversion_rate.parquet"
final_output_path = "/home/airflow/gcs/data/workshop4_output.parquet"

default_args = {'owner': 'datath'}

@dag(default_args=default_args, schedule_interval="@once", start_date=days_ago(1), tags=["workshop"])
def workshop4_pipeline():
    """
    # Workshop 4: Final Pipeline
    นำโค้ดจาก Workshop 1 มาจัดวางเป็น Automated Pipeline บน Airflow
    """

    @task()
    def get_data_from_mysql(output_path):
        # เชื่อมต่อ MySQL ด้วย MySqlHook ผ่าน connection ที่สร้างไว้
        mysqlserver = MySqlHook(MYSQL_CONNECTION)
        product = mysqlserver.get_pandas_df(sql="SELECT * FROM r2de3.product")
        customer = mysqlserver.get_pandas_df(sql="SELECT * FROM r2de3.customer")
        transaction = mysqlserver.get_pandas_df(sql="SELECT * FROM r2de3.transaction")

        # Merge 3 ตารางเข้าด้วยกัน
        merged_transaction = transaction.merge(
            product, how="left", left_on="ProductNo", right_on="ProductNo"
        ).merge(
            customer, how="left", left_on="CustomerNo", right_on="CustomerNo"
        )
        
        # เซฟเป็น Parquet ไปที่ GCS Mount
        merged_transaction.to_parquet(output_path, index=False)
        print(f"Output to {output_path}")

    @task()
    def get_conversion_rate(output_path):
        # เรียก REST API ดึงอัตราแลกเปลี่ยน
        r = requests.get(CONVERSION_RATE_URL)
        result_conversion_rate = r.json()
        df = pd.DataFrame(result_conversion_rate).drop(columns=['id'])

        # แปลงเป็น date format แล้วเซฟ Parquet
        df['date'] = pd.to_datetime(df['date'])
        df.to_parquet(output_path, index=False)
        print(f"Output to {output_path}")

    @task()
    def merge_data(transaction_path, conversion_rate_path, output_path):
        transaction = pd.read_parquet(transaction_path)
        conversion_rate = pd.read_parquet(conversion_rate_path)

        # Merge ข้อมูลธุรกรรมเข้ากับอัตราแลกเปลี่ยนตามวันที่
        final_df = transaction.merge(conversion_rate, how="left", left_on="Date", right_on="date")
        
        # คำนวณยอดขายรวม (GBP) และแปลงเป็นเงินบาท (THB)
        final_df["total_amount"] = final_df["Price"] * final_df["Quantity"]
        final_df["thb_amount"] = final_df["total_amount"] * final_df["gbp_thb"]

        # คลีนคอลัมน์และกำหนด Schema มาตรฐาน
        final_df = final_df.drop(["date", "gbp_thb"], axis=1)
        final_df.columns = [
            'transaction_id', 'date', 'product_id', 'price', 'quantity', 'customer_id',
            'product_name', 'customer_country', 'customer_name', 'total_amount', 'thb_amount'
        ]

        # บันทึกไฟล์ Parquet ขั้นสุดท้าย
        final_df.to_parquet(output_path, index=False)
        print(f"Output to {output_path}")
        print("== End of Workshop 4 ʕ•́ᴥ•̀ʔっ♡ ==")

    # กำหนด Tasks
    t1 = get_data_from_mysql(output_path=mysql_output_path)
    t2 = get_conversion_rate(output_path=conversion_rate_output_path)
    t3 = merge_data(
        transaction_path=mysql_output_path,
        conversion_rate_path=conversion_rate_output_path,
        output_path=final_output_path
    )

    # Dependency: t1 และ t2 ทำงานคู่ขนานกัน แล้วส่งต่อให้ t3
    [t1, t2] >> t3

workshop4_pipeline()
```

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญ
* [ ] **Orchestration:** จัดตาราง ลำดับ สถานะ ของหลาย Pipeline
* [ ] **Cron vs Airflow:** Cron ไม่มี Dependency/UI
* [ ] **DAG:** กราฟทิศทางเดียว ไม่วนกลับ = 1 Pipeline
* [ ] **Task / Operator / Sensor**
* [ ] **Managed Airflow:** Composer (GCP), Astro, MWAA (AWS)
* [ ] **5 ขั้นเขียน DAG:** Import → Default Args → DAG → Tasks → Dependencies
* [ ] **Schedule:** Preset / Cron
* [ ] **Fan-out / Fan-in**
* [ ] **Atomic & Idempotent**

### สรุป Syntax สำคัญ

| Syntax | ความหมาย |
| :--- | :--- |
| `t1 >> t2` | t1 ก่อน t2 |
| `t1 >> [t2, t3]` | Fan-out |
| `[t2, t3] >> t4` | Fan-in |
| `/home/airflow/gcs/dags/` | โฟลเดอร์วางไฟล์ DAG ใน Composer |

### If you see X → think Y

```text
ต้องรัน Pipeline ทุกวันอัตโนมัติ + ต้องรอ Task ก่อนหน้า → Airflow DAG
รันซ้ำแล้วข้อมูลซ้ำ                                        → Pipeline ไม่ Idempotent
ต้องรอไฟล์มาก่อนเริ่ม                                       → Sensor
```

### Concept Map

```text
Orchestration
├── Cron (ง่าย ไม่มี Dependency)
└── Airflow
    ├── Components: Web UI, Scheduler, Workers, Metadata DB, Providers
    ├── DAG ──► Tasks (Operator / Sensor) ──► Dependencies
    ├── Managed: Composer / Astro / MWAA
    └── Best Practice: Atomic, Idempotent
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **"DAG คือ Task ตัวหนึ่ง":** DAG คือ "Pipeline ทั้งชุด" ส่วน Task เป็นหน่วยย่อยใน DAG
* **"DAG วนซ้ำได้ถ้าจำเป็น":** ต้อง **Acyclic** เสมอ ถ้าต้องการรันซ้ำ ให้ใช้ Schedule ไม่ใช่วงวนใน DAG
* **"Airflow ประมวลผลข้อมูลเอง":** Airflow เป็นตัวสั่งงานและติดตามสถานะ งานประมวลผลหนักควรทำโดยเครื่องมืออื่น (Spark, BigQuery) `[เสริมนอกสไลด์]`
* **"ไฟล์ DAG อยู่ที่ไหนก็ได้":** ใน Composer ต้อง Upload ไปที่โฟลเดอร์ `dags` ของ GCS Bucket ที่ผูกกับ Environment
* **"รันซ้ำไม่มีผลเสีย":** ถ้า Task ไม่ Idempotent เช่น `INSERT` ต่อท้าย รันซ้ำจะทำให้ข้อมูลซ้ำ
* **"ตั้ง schedule แล้วรันตอนถึงเวลาเริ่ม":** Airflow รันเมื่อ **ช่วงเวลานั้นสิ้นสุด** ไม่ใช่ตอนเริ่ม

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 01 - Data Collection]] (แนวคิด Pipeline และ ETL ที่ Airflow ทำให้อัตโนมัติ)
  * [[Chapter 03 - Cloud Computing and Bash]] (GCS, Cloud Shell, Bash ที่ใช้ใน Workshop)
  * [[Chapter 05 - Data Warehouse with BigQuery]] (ต่อยอด DAG ให้โหลดข้อมูลเข้า BigQuery)
  * [[Chapter 07 - Advanced Data Engineering]] (Git, Docker, Kubernetes ที่เกี่ยวกับการ Deploy Airflow)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DataEngineer/4Airflow.pdf` (79 slides, DataTH)
  * Reference: Apache Airflow Documentation (airflow.apache.org) `[เสริมนอกสไลด์]`
