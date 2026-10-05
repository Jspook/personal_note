# Data Engineer - Chapter 03: Cloud Computing and Bash

> **วิชา:** Road to Data Engineer 3.0 (R2DE 3.0) | **ผู้สอน:** DataTH
> **Source:** `Resources/Books/DataEngineer/3_Cloud_Computing_and_Bash.pdf` (86 slides)
> **หมายเหตุ:** ส่วนที่ติดป้าย `[เสริมนอกสไลด์]` คือความรู้ที่ผู้เขียนโน้ตเพิ่มเอง

---

## Part 1: Macro Architecture & Overview

ลองนึกถึงการ **ซื้อรถ vs เช่ารถ vs เรียกแท็กซี่**: ซื้อรถ = ลงทุนเอง ดูแลเอง (On-premise), เช่ารถ = ใช้ของคนอื่นแต่ต้องขับเอง (IaaS), เรียกแท็กซี่ = จ่ายตามระยะทางไม่ต้องดูแลอะไร (Serverless/SaaS) Chapter 3 อธิบายแนวคิด **Cloud Computing** และพา "เข้าห้องเครื่อง" ด้วย **Bash** (คำสั่ง Linux) เพื่อใช้ควบคุมเครื่องบน Cloud โดยปิดท้ายด้วยการอัปโหลดไฟล์เข้า Data Lake บน Google Cloud Storage

```text
เครื่องเรา / Browser
      │  Cloud Console (Web UI)   หรือ   Cloud Shell (Terminal + Bash)
      ▼
Google Cloud Platform (GCP)
 ├── Compute  : App Engine, VM, Kubernetes, Serverless ...
 └── Storage / Database
       ├── Cloud Storage (GCS)  ◄── Data Lake  (Workshop 3)
       └── BigQuery             ◄── Data Warehouse (CH5)
```

### ตารางเปรียบเทียบ On-premise vs Cloud

| Feature | On-premise | Cloud Computing |
| :--- | :--- | :--- |
| **ที่ตั้งเครื่อง** | Server ภายในบริษัท | Data Center ของผู้ให้บริการ |
| **การลงทุน** | ซื้อล่วงหน้า (CapEx) `[เสริมนอกสไลด์]` | จ่ายตามใช้ (OpEx) `[เสริมนอกสไลด์]` |
| **การขยาย** | สั่งซื้อ ติดตั้ง ใช้เวลา | ปรับได้เร็ว |
| **การดูแล** | ทีมตัวเองดูแลฮาร์ดแวร์ | Provider ดูแล |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Intro to Cloud Computing

#### 2.1.1 On-premise และพัฒนาการ Server

> **On-premises software (on-prem)** = ซอฟต์แวร์ที่ทำงานบน physical server ที่ตั้งอยู่ภายในบริษัท

พัฒนาการ (สไลด์ P.8): Dedicated Server (ซื้อเครื่องเป็นเครื่อง) → ... → Cloud `[ขั้นกลางดูสไลด์ P.8]`

> **Cloud Computing** = บริการเช่าใช้ส่วนหนึ่งของ Data Center ผ่านอินเทอร์เน็ต มีบริการหลายรูปแบบ

#### 2.1.2 ประเภทของ Cloud

| ประเภท | ลักษณะ | ตัวอย่าง |
| :--- | :--- | :--- |
| **Public Cloud** | ใช้ทรัพยากรของผู้ให้บริการสาธารณะ | AWS, Azure, Google Cloud (+ IBM, Alibaba, Huawei, Tencent Cloud) |
| **Private Cloud** | สร้าง Cloud ส่วนตัวใน Data Center ขององค์กร | องค์กรที่ต้องคุมข้อมูลเอง |
| **Hybrid Cloud** | รวม On-premise + Cloud (Public & Private) | ข้อมูลอ่อนไหวอยู่ในองค์กร งานหนักใช้ Cloud |

---

### 2.2 Cloud Computing Concepts

#### 2.2.1 บริการแบบ "as a Service"

| ระดับ | ชื่อเต็ม | ใครดูแลอะไร `[คำอธิบายเสริมนอกสไลด์]` |
| :--- | :--- | :--- |
| **IaaS** | Infrastructure as a Service | เช่าโครงสร้างพื้นฐาน (VM, Storage, Network) เราจัดการ OS/แอปเอง |
| **PaaS** | Platform as a Service | Provider ดูแลแพลตฟอร์ม เราวางโค้ด |
| **SaaS** | Software as a Service | ใช้ซอฟต์แวร์สำเร็จรูป เช่น Gmail |

**Infrastructure หลัก 2 แบบ:** **Compute** (พลังประมวลผล) และ **Storage/Database** (ที่เก็บข้อมูล)

#### 2.2.2 การเพิ่มประสิทธิภาพ Compute

| วิธี | ความหมาย | ตัวอย่าง `[เสริมนอกสไลด์]` | เหมาะกับ (ตามสไลด์) |
| :--- | :--- | :--- | :--- |
| **Vertical Scaling** | เพิ่มกำลังเครื่องเดิม | เพิ่ม RAM/CPU | ระบบที่ต้องทำงานบนเซิร์ฟเวอร์เครื่องเดียว |
| **Horizontal Scaling** | เพิ่มจำนวนเครื่อง | เพิ่มเครื่องในคลัสเตอร์ | งานกระจายได้ เช่น Spark |

#### 2.2.3 Managed Service vs Serverless (2 ประเภทหลักของ PaaS)

| | Managed Service | Serverless |
| :--- | :--- | :--- |
| **แนวคิด** | Provider ดูแล Cluster ให้ | ไม่ต้องรู้เรื่อง Server เลย |
| **การจ่ายเงิน `[เสริม]`** | มักจ่ายตามเวลาที่เปิดเครื่อง | จ่ายตามการใช้งานจริง |
| **ตัวอย่างในคอร์ส** | Cloud Composer (CH4) | BigQuery (CH5) |

#### 2.2.4 Vendor Lock-in vs Cloud Agnostic

> **Vendor Lock-in** = การติดอยู่ใน ecosystem ของ Cloud Provider รายเดียว ย้ายออกยาก

> **Cloud Agnostic** = บริการ/เครื่องมือที่ใช้ได้กับหลาย Cloud

**ตัวอย่างที่ปรากฏในคอร์ส:** Astro (Airflow ที่ไม่ผูก Google), MinIO (Object Storage open-source ที่ API เข้ากันได้กับ S3)

---

### 2.3 Google Cloud Platform (GCP)

GCP มีมากกว่า 100 บริการ แต่ DE ใช้หลักๆ ในสไลด์:

| กลุ่ม | บริการ (ตัวอย่าง) | ใช้ทำอะไร |
| :--- | :--- | :--- |
| **Compute** | App Engine, VM ฯลฯ | รันโปรแกรม |
| **Storage / Database** | **Cloud Storage (GCS)**, BigQuery | เก็บข้อมูล |
| **Data Processing & Pipeline** | Composer, Dataproc `[Dataproc ตามสไลด์ CH2]` | ประมวลผลและจัดการ Pipeline |
| **Tools** | **Cloud Shell**, Cloud Console | ใช้งานผ่าน Browser |

**Reference Architecture:** สไลด์แสดงตัวอย่าง Architecture บน GCP และ Azure ให้เห็นว่าบริการต่างๆ ประกอบกันเป็นระบบข้อมูลอย่างไร

**เปรียบเทียบผู้ให้บริการ:** แต่ละเจ้ามีบริการคล้ายกันแต่ชื่อต่างกัน (เช่น ที่เก็บไฟล์ของ AWS = S3, ของ Google = Cloud Storage) ดูตารางเทียบทางการได้ที่ cloud.google.com/docs/get-started/aws-azure-gcp-service-comparison

#### Google Cloud Storage (GCS)

> **GCS** = บริการเก็บไฟล์แบบ **Blob** (Binary Large Object) ขนาดเท่าไรก็ได้ ดึงไปใช้เมื่อไรก็ได้ เหมือน Harddrive ส่วนตัวขององค์กร

* **Bucket:** ถังเก็บไฟล์ ข้างในสร้างโฟลเดอร์ได้ ใส่ไฟล์ได้ทุกชนิด (Structured, Semi-structured, Unstructured)
* สร้างกี่ Bucket ก็ได้เท่าที่จำเป็น

```text
Project
└── Bucket: my-company-datalake   (ชื่อต้องไม่ซ้ำกันทั่วโลก [เสริมนอกสไลด์])
    ├── raw/transactions_2024-05-18.csv
    └── clean/transactions.parquet
```

**Object Storage แบบ S3 ได้ durability สูงมาก:** สไลด์อ้างว่า Amazon S3 ได้ 99.999999999% durability จากเทคนิค เช่น แยกการเก็บ metadata และไฟล์ content `[เทคนิคอื่นดูสไลด์ P.41]`

**Cloud Shell:** เครื่องมือฟรีที่ให้ใช้ command-line (CLI) ผ่าน web browser

---

### 2.4 Intro to Bash (Linux Command Line)

> **Linux** (หรือ `*nix`) เป็นระบบปฏิบัติการที่มีรากฐานจาก Unix **Bash** (Bourne-Again SHell) เป็น command language สั่งงานระบบผ่าน Terminal

ทำไม DE ต้องรู้: เครื่อง Server บน Cloud ส่วนใหญ่รัน Linux และมักไม่มีหน้าจอกราฟิก ต้องควบคุมด้วยคำสั่ง

#### คำสั่งพื้นฐานที่เรียนในคลาส

| กลุ่ม | คำสั่ง | ความหมาย | ตัวอย่าง |
| :--- | :--- | :--- | :--- |
| **ท่องโลก** | `ls` | list ไฟล์ใน directory ปัจจุบัน | `ls` |
| | `pwd` | print working directory (อยู่ที่ไหน) | `pwd` |
| | `cd` | change directory | `cd [PATH]` |
| **Print/อ่าน/สร้างไฟล์** | `echo` | แสดงข้อความหรือตัวแปร | `echo "Hello World!"` |
| | `cat` | concatenate อ่านไฟล์ออกมา (ต่อหลายไฟล์ได้) | `cat file.txt` |
| | `more` / `less` | เปิดไฟล์ใหญ่เป็นหน้าๆ | `less big.csv` |
| | `touch` | สร้างไฟล์เปล่า | `touch [FILENAME]` |
| **สร้าง Directory/จัดการไฟล์** | `mkdir` | make directory | `mkdir [DIRECTORY_NAME]` |
| | `cp` | copy | `cp a.txt dir/` |
| | `mv` | move/เปลี่ยนชื่อ | `mv [SOURCE] [DESTINATION]` |
| | `rm` | remove ลบถาวร | `rm [FILENAME]` |
| **อื่นๆ** | `wget` | download ไฟล์จาก URL (`-O` ตั้งชื่อไฟล์) | `wget -O data.zip URL` |
| | `unzip` | แตกไฟล์ zip | `unzip [ZIP_FILE]` |
| | `wc` | นับบรรทัด/คำ/byte | `wc [FILE]` |
| | `man` | ดูคู่มือคำสั่ง (กด `q` ออก) | `man ls` |

```bash
# ตัวอย่างลำดับคำสั่งจริง: เตรียมโฟลเดอร์ ดาวน์โหลด และตรวจสอบไฟล์
pwd                            # ดูว่าตอนนี้อยู่ที่ไหน
mkdir workshop3                # สร้างโฟลเดอร์ทำงาน
cd workshop3                   # เข้าไปในโฟลเดอร์นั้น
wget -O data.zip "https://example.com/data.zip"   # โหลดไฟล์ (URL ตัวอย่าง)
unzip data.zip                 # แตกไฟล์
ls                             # ดูว่ามีไฟล์อะไรบ้าง
wc -l *.csv                    # นับจำนวนบรรทัดของทุกไฟล์ csv
```

> **ระวัง:** `rm` ลบถาวร ไม่มี Recycle Bin ตรวจชื่อไฟล์ให้แน่ใจก่อนกด Enter

**โบนัสในสไลด์:** `vim` เป็น text editor ใน terminal ที่ขึ้นชื่อว่า "เข้าแล้วออกไม่ได้" `[เสริมนอกสไลด์: ออกด้วยกด Esc แล้วพิมพ์ :q! (ไม่บันทึก) หรือ :wq (บันทึก)]`

---

### 2.5 Workshop 3: Upload to Data Lake

* **แหล่งดาวน์โหลดไฟล์ข้อมูล:** [Documentation & Data File (Designil)](https://file.designil.com/f/6BamyF+)
* **เป้าหมาย:** Upload ไฟล์ข้อมูลเข้า **Google Cloud Storage (GCS)** ซึ่งทำหน้าที่เป็น Data Lake ในระบบ
* **เตรียมตัว:** สมัคร Google Cloud รับเครดิตฟรี $300 ใช้ได้ใน 90 วันแรก (สำหรับลูกค้าใหม่ ตามสไลด์)

#### 2.5.1 ช่องทางการ Upload ข้อมูลขึ้น GCS

| วิธี | ขั้นตอน | เหมาะกับ |
| :--- | :--- | :--- |
| **Web UI (Cloud Console)** | สร้าง Bucket → กดปุ่ม Upload | ไฟล์ไม่กี่ไฟล์ ทำครั้งเดียว |
| **Cloud Shell + `gsutil`** | upload ไฟล์เข้า Cloud Shell ก่อน แล้วใช้ `gsutil` | ทำซ้ำได้ เขียนเป็นสคริปต์ใน Terminal |
| **Python Client Library (SDK)** | เขียนสคริปต์ผ่าน Cloud Shell Editor เพื่อจัดการ Programmatically | เชื่อมต่อเข้ากับ Data Pipeline หรือ Microservices |

```bash
# [เสริมนอกสไลด์] รูปแบบคำสั่ง gsutil ที่ใช้บ่อย
gsutil mb gs://my-datalake-bucket                       # make bucket
gsutil cp data.csv gs://my-datalake-bucket/raw/         # copy ไฟล์ขึ้น GCS
gsutil ls gs://my-datalake-bucket/raw/                  # ดูไฟล์ใน bucket
```

> **หมายเหตุ `[เสริมนอกสไลด์]`:** Google สนับสนุนเครื่องมือใหม่ `gcloud storage` ที่ใช้แทน `gsutil` ได้ในปัจจุบัน ถ้าคำสั่งเปลี่ยน ให้ดูเอกสารทางการ

---

#### 2.5.2 โค้ดปฏิบัติการ Python SDK (`workshop3.py`)

ใน Workshop นี้ ผู้เรียนจะเปิด **Cloud Shell Editor** และสร้างไฟล์ Python เพื่อเชื่อมต่อจัดการ Bucket ด้วยไลบรารี `google-cloud-storage`:

```python
from google.cloud import storage


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket with race-condition protection."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Optional: ตั้ง generation-match precondition เพื่อหลีกเลี่ยง race conditions และ data corruption
    # กำหนด generation_match_precondition = 0 สำหรับไฟล์ใหม่ที่ยังไม่เคยมีอยู่ใน bucket
    generation_match_precondition = 0

    blob.upload_from_filename(
        source_file_name, 
        if_generation_match=generation_match_precondition
    )

    print(f"File {source_file_name} uploaded to {destination_blob_name}.")


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # Construct client-side representation ของ blob โดยยังไม่ดาวน์โหลด payload ทันที
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(
        f"Downloaded storage object {source_blob_name} from bucket {bucket_name} to local file {destination_file_name}."
    )


if __name__ == "__main__":
    mode = input("Upload (u) or Download (d)? ")
    bucket_name = input("Please enter bucket name: ")
    source_file = input("Please enter source file: ")
    destination = input("Please enter destination file (leave blank if use the same name): ")
    
    if destination is None or destination == "":
        destination = source_file.split("/")[-1]
    
    if mode.strip().lower() in ["upload", "u"]: 
        upload_blob(bucket_name, source_file, destination)
    elif mode.strip().lower() in ["download", "d"]: 
        download_blob(bucket_name, source_file, destination)
    else:
        print("Invalid command")
```

> 💡 **วิศวกรรมข้อมูลน่ารู้ (Generation Match Precondition):**
> ค่า `generation_match_precondition = 0` ใน GCS เปรียบเสมือน **Optimistic Concurrency Control** เพื่อรับประกันว่าการ Upload จะล้มเหลวทันทีหากมี Process อื่นสร้างไฟล์ชื่อเดียวกันนี้ขึ้นมาก่อนหน้า ป้องกันการเขียนทับโดยไม่ตั้งใจ (Data Corruption)

**Bonus: Storage Object Lifecycle** ตั้งกฎจัดการไฟล์ระยะยาว เช่น ย้ายไฟล์เก่าไปชั้นเก็บที่ถูกลง หรือลบอัตโนมัติ (สไลด์เตือนว่า **Delete แล้ว undo ไม่ได้**) สไลด์มีตัวอย่าง Storage Lifecycle ของ AWS เทียบด้วย

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญ
* [ ] **On-premise vs Cloud:** เครื่องของเราเทียบกับเช่า Data Center
* [ ] **Public / Private / Hybrid Cloud**
* [ ] **IaaS / PaaS / SaaS**
* [ ] **Vertical vs Horizontal Scaling**
* [ ] **Managed Service vs Serverless**
* [ ] **Vendor Lock-in vs Cloud Agnostic**
* [ ] **GCS:** Bucket เก็บ Blob ได้ทุกชนิด
* [ ] **Bash พื้นฐาน:** `ls pwd cd echo cat touch mkdir cp mv rm wget unzip wc man`
* [ ] **Workshop 3:** สร้าง Bucket + upload ผ่าน UI และ `gsutil`

### สรุปคำสั่งสำคัญ

| คำสั่ง | ความหมาย |
| :--- | :--- |
| `pwd` | อยู่ที่ไหน |
| `ls` | มีอะไรบ้าง |
| `cd PATH` | ไปที่ไหน |
| `cp / mv / rm` | คัดลอก / ย้าย-เปลี่ยนชื่อ / ลบถาวร |

### Concept Map

```text
Cloud Computing
├── ประเภท: Public / Private / Hybrid
├── Service: IaaS / PaaS (Managed, Serverless) / SaaS
├── Scaling: Vertical / Horizontal
├── ความเสี่ยง: Vendor Lock-in ↔ Cloud Agnostic
├── GCP: Compute, GCS (Bucket), BigQuery, Cloud Shell
└── Bash: นำทาง / ไฟล์ / ดาวน์โหลด → gsutil → Data Lake
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **"Cloud ถูกกว่า On-premise เสมอ":** ถ้าใช้งานหนักคงที่ตลอดเวลา อาจแพงกว่า ต้องคำนวณตามรูปแบบการใช้งาน `[เสริมนอกสไลด์]`
* **"Vertical กับ Horizontal Scaling คือเรื่องเดียวกัน":** Vertical = ทำเครื่องเดียวแรงขึ้น; Horizontal = เพิ่มจำนวนเครื่อง
* **"Serverless แปลว่าไม่มี Server":** มี Server แต่ Provider จัดการให้ทั้งหมด เราไม่ต้องดูแล
* **"`rm` ลบแล้วกู้ได้":** `rm` ลบถาวร ไม่มี Recycle Bin
* **"Bucket คือ Folder ธรรมดา":** Bucket คือหน่วยที่ใหญ่กว่า ข้างในมี folder ได้อีกชั้น `[ในทางเทคนิค GCS เป็น flat namespace — เสริมนอกสไลด์]`
* **"ลืมปิด/ลบ Resource หลังจบ Workshop":** อาจโดนตัดเงิน สไลด์ CH6 มีวิธีลบ Project ใน Google Cloud

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 02 - Data Cleansing with Spark]] (Spark รันบน Cloud ได้ เช่น Dataproc/Databricks)
  * [[Chapter 04 - Data Pipeline Orchestration with Airflow]] (ใช้ GCS เป็นที่เก็บ DAG และข้อมูล)
  * [[Chapter 05 - Data Warehouse with BigQuery]] (บริการ Serverless บน GCP)
  * [[Chapter 00 - Intro to Data Engineering]] (Data Lake และ Big Data Platform ภาพรวม)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DataEngineer/3_Cloud_Computing_and_Bash.pdf` (86 slides, DataTH)
  * Reference: Google Cloud Documentation — Cloud Storage `[เสริมนอกสไลด์]`
