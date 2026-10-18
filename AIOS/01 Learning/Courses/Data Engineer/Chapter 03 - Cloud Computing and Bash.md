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

> 💡 **Intuition:** Cloud Computing เหมือน **"บ้านเช่า vs บ้านซื้อเอง"** — On-premise = ซื้อเครื่อง ลงทุนเยอะ ต้องดูแลเอง (ซ่อม บำรุง จ้างช่าง), Cloud = เช่าส่วนของ Data Center จ่ายตามการใช้งาน อยู่ได้ทันที ให้ผู้ให้บริการดูแล ขยายง่าย
> [Source: generated — not verified against original document]

> **On-premises software (on-prem)** = ซอฟต์แวร์ที่ทำงานบน physical server ที่ตั้งอยู่ภายในบริษัท

พัฒนาการ (สไลด์ P.8): Dedicated Server (ซื้อเครื่องเป็นเครื่อง) → ... → Cloud `[ขั้นกลางดูสไลด์ P.8]`

> **Cloud Computing** = บริการเช่าใช้ส่วนหนึ่งของ Data Center ผ่านอินเทอร์เน็ต มีบริการหลายรูปแบบ

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "เช่าใช้ส่วนหนึ่งของ Data Center" → ไม่ต้องซื้อเครื่องเอง Provider ให้เช่า
- "ผ่านอินเทอร์เน็ต" → เข้าจากที่ไหนก็ได้ (Browser หรือ API)
- **CapEx vs OpEx** → ลงทุนซื้อทรัพย์สินล่วงหน้า (CapEx), Cloud จ่ายตามใช้ (Opex)

**ตัวอย่าง:**
- ✅ **On-premise** — บริษัทซื้อ Server ราคา 5 ล้านบาท, จ้างคนดูแล 1 คน, ใช้ 5 ปี
- ✅ **Cloud** — เช่า VM บน GCP 5 เครื่อง จ่ายตามชั่วโมงใช้งาน ไม่ต้องดูแล Hardware (แต่ยังดูแล OS/Software เอง)
- **ต่างกันตรง:** On-premise ก้อนแรกสูงแต่คุ้มเมื่อใช้เต็มที่และนาน, Cloud จ่ายตามจริงและยืดหยุ่น

**อย่าสับสน:** ❌ "Cloud ถูกกว่าเสมอ แม้ใช้งาน 24/7" — ไม่ใช่ ถ้าเปิดใช้เต็มที่ตลอดเวลา On-premise อาจคุ้มทุนกว่าในระยะยาว

**เช็คความเข้าใจ:** Startup เพิ่งขึ้นมา ต้องเลือก On-premise หรือ Cloud? ทำไม?
<details><summary>เฉลย</summary>

**ตอบ: Cloud**

**เหตุผล:**
1. **ต้นทุนต่ำเริ่มต้น** — ไม่ต้องจ่าย 5 ล้านล่วงหน้า
2. **ยืดหยุ่น** — ถ้าใช้เพิ่ม ปรับได้เร็ว, ถ้าลดใช้ ยกเลิกเดือนนี้ก็ได้
3. **ไม่ต้องจ้างคนดูแล Hardware** — Startup มีคนไม่พอ

หลังจากระบบเสถียรและใช้งาน 24/7 อาจพิจารณา On-premise

</details>

#### 2.1.2 ประเภทของ Cloud

| ประเภท            | ลักษณะ                                      | ตัวอย่าง                                                         |
| :---------------- | :------------------------------------------ | :--------------------------------------------------------------- |
| **Public Cloud**  | ใช้ทรัพยากรของผู้ให้บริการสาธารณะ           | AWS, Azure, Google Cloud (+ IBM, Alibaba, Huawei, Tencent Cloud) |
| **Private Cloud** | สร้าง Cloud ส่วนตัวใน Data Center ขององค์กร | องค์กรที่ต้องคุมข้อมูลเอง                                        |
| **Hybrid Cloud**  | รวม On-premise + Cloud (Public & Private)   | ข้อมูลอ่อนไหวอยู่ในองค์กร งานหนักใช้ Cloud                       |

#### 💡 เสริม: Public / Private / Hybrid Cloud

> 💡 **Intuition:** เลือกประเภท Cloud เหมือน **"เลือกที่พัก"** — **Public Cloud** คือโรงแรม เช่าห้องตามคืนที่ใช้ มีแขกอื่นพักในอาคารเดียวกันแต่แยกห้องกันชัดเจน, **Private Cloud** คือการสร้างบ้านของตัวเองในที่ดินองค์กร ควบคุมเต็มที่แต่ต้องดูแลเอง, **Hybrid Cloud** คือเก็บของมีค่าไว้บ้านตัวเอง แต่เช่าโรงแรมเมื่อต้องการที่พักเพิ่มชั่วคราว (จุดที่ analogy ไม่ตรง: ความปลอดภัยของ Public Cloud ไม่ได้แปลว่า "ไม่มีกำแพง" ผู้ให้บริการแยกทรัพยากรลูกค้าด้วยระบบที่ออกแบบไว้)
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Public Cloud" → ผู้ให้บริการเป็นเจ้าของโครงสร้างพื้นฐาน ลูกค้าเช่าใช้ผ่านอินเทอร์เน็ตและจ่ายตามการใช้งาน
- "Private Cloud" → Cloud ที่สร้างขึ้นเพื่อองค์กรเดียว อยู่ใน Data Center ขององค์กรหรือเช่าเฉพาะ
- "Hybrid Cloud" → ใช้ทั้งทรัพยากร On-premise/Private และ Public พร้อมกัน และส่งข้อมูลระหว่างสองฝั่งได้

**ตัวอย่าง:**
- ✅ เว็บข่าวที่ traffic พุ่งสูงช่วงเหตุการณ์ใหญ่ — Public Cloud ขยายทรัพยากรได้เร็วตามความต้องการ
- ✅ ธนาคารที่ต้องเก็บข้อมูลลูกค้าไว้ในศูนย์ของตัวเองตามกฎ แต่ใช้ Public Cloud วิเคราะห์ข้อมูลที่ไม่อ่อนไหว — Hybrid Cloud
- ❌ "Private Cloud ปลอดภัยกว่า Public Cloud เสมอ" — ไม่จริง ความปลอดภัยขึ้นกับการตั้งค่าและการดูแล ไม่ได้ขึ้นกับประเภทอย่างเดียว
- **ต่างกันตรง:** ใครเป็นเจ้าของและดูแลโครงสร้างพื้นฐาน และข้อมูลอยู่ที่ไหน

**อย่าสับสน:** "Private Cloud = On-premise" — มักไม่เหมือนกัน On-premise คือรันบนเครื่องขององค์กรแบบดั้งเดิม ส่วน Private Cloud มักเป็นเครื่องขององค์กรที่จัดสรรทรัพยากรแบบ Cloud (ยืดหยุ่น ขอใช้เพิ่มได้)

**เช็คความเข้าใจ:** บริษัทต้องเก็บข้อมูลลูกค้าภายในองค์กรตามกฎ แต่อยากเช่า GPU ชั่วคราวช่วงเทรนโมเดล ควรเลือกประเภทไหน?
<details><summary>เฉลย</summary>

**ตอบ: Hybrid Cloud**

**เหตุผล:**
1. ข้อมูลอ่อนไหวอยู่ในองค์กร (On-premise/Private) ตามกฎ
2. งานเทรนที่ต้องการ GPU ชั่วคราวเช่าจาก Public Cloud แล้วจ่ายตามการใช้งาน

</details>

---

### 2.2 Cloud Computing Concepts

#### 2.2.1 บริการแบบ "as a Service"

> 💡 **Intuition:** IaaS/PaaS/SaaS เหมือน **"ร้านอาหารตั้งจากศูนย์"** — IaaS = เช่าห้องเปล่ามีไฟ/น้ำ (ทำครัวเอง); PaaS = เช่าครัวพร้อมอุปกรณ์ (แค่ทำอาหาร); SaaS = สั่งอาหารสำเร็จ
> [Source: generated — not verified against original document]

| ระดับ | ชื่อเต็ม | ใครดูแลอะไร `[คำอธิบายเสริมนอกสไลด์]` |
| :--- | :--- | :--- |
| **IaaS** | Infrastructure as a Service | เช่าโครงสร้างพื้นฐาน (VM, Storage, Network) เราจัดการ OS/แอปเอง |
| **PaaS** | Platform as a Service | Provider ดูแลแพลตฟอร์ม เราวางโค้ด |
| **SaaS** | Software as a Service | ใช้ซอฟต์แวร์สำเร็จรูป เช่น Gmail |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **IaaS** = "Infrastructure" → เช่าเครื่องเท่านั้น ต้องดูแล OS + Middleware + Application เอง
- **PaaS** = "Platform" → เช่าแพลตฟอร์มสำเร็จ เราดูแลแค่ code และข้อมูล
- **SaaS** = "Software" → เช่าซอฟต์แวร์เสร็จสิ้น เราแค่ใช้ (Browser เข้าก็ได้)

**ตัวอย่าง:**
- ✅ **IaaS** — AWS EC2: เช่า Virtual Machine, เราลง Linux, Python, Database, Code
- ✅ **PaaS** — Google Cloud Run: ส่ง Docker image ขึ้น, GCP จัดการ scaling, เราใช้งาน
- ✅ **SaaS** — Gmail: เปิด browser, ส่ง/รับ email เสร็จ
- **ต่างกันตรง:** IaaS = หนักสุด (ต้องรู้เยอะ), PaaS = กลาง, SaaS = เบาสุด

**อย่าสับสน:** "PaaS ไม่มี Infrastructure" — ไม่ใช่, PaaS ยัง **มี** Infrastructure (Cloud Provider เอง), แต่ **ผู้ใช้ไม่ต้องดูแล**

**เช็คความเข้าใจ:** Data Engineer บน GCP ใช้บริการประเภทใดบ้าง ยกตัวอย่างอย่างละ 1
<details><summary>เฉลย</summary>

**ทั่วไป:**
1. **IaaS** — Compute Engine (VM) สำหรับตั้งค่าระบบเอง
2. **PaaS** — Cloud Composer (Orchestration), BigQuery (Data Warehouse)
3. **SaaS** — Looker Studio / Google Sheets สำหรับดูรายงานสำเร็จรูป

**หลักคิด:** เลือกตามระดับการควบคุมที่ต้องการ vs ภาระการดูแล — IaaS คุมได้ลึกสุดแต่ภาระสูง, SaaS พร้อมใช้สุดแต่ปรับแต่งได้น้อย

</details>

**Infrastructure หลัก 2 แบบ:** **Compute** (พลังประมวลผล) และ **Storage/Database** (ที่เก็บข้อมูล)

#### 2.2.2 การเพิ่มประสิทธิภาพ Compute

| วิธี | ความหมาย | ตัวอย่าง `[เสริมนอกสไลด์]` | เหมาะกับ (ตามสไลด์) |
| :--- | :--- | :--- | :--- |
| **Vertical Scaling** | เพิ่มกำลังเครื่องเดิม | เพิ่ม RAM/CPU | ระบบที่ต้องทำงานบนเซิร์ฟเวอร์เครื่องเดียว |
| **Horizontal Scaling** | เพิ่มจำนวนเครื่อง | เพิ่มเครื่องในคลัสเตอร์ | งานกระจายได้ เช่น Spark |

> 💡 **Intuition:** Vertical vs Horizontal Scaling เหมือน **"ขยายร้านอาหาร"** — Vertical = ทำเคาน์เตอร์เดิมให้เสิร์ฟลูกค้าได้มากขึ้น (เพิ่ม CPU/RAM ให้เครื่องเดิม), Horizontal = เปิดสาขาใหม่ เสิร์ฟลูกค้าไปยังหลายสาขา (เพิ่มจำนวนเครื่องในคลัสเตอร์) Vertical เร็วแต่มีขีดจำกัด (เครื่องแรงสุดก็มีเพดาน), Horizontal ตั้งค่าซับซ้อนกว่า (ต้องแบ่ง/ประสานงานหลายเครื่อง) แต่ขยายได้เกือบไม่มีจำกัด
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **Vertical Scaling** = "Scaling Up" → เพิ่มกำลังเครื่องเดียวให้แรงขึ้น (CPU, RAM, Storage)
- **Horizontal Scaling** = "Scaling Out" → เพิ่มจำนวนเครื่อง แบ่งงานให้กระจาย
- "ขีดจำกัด" → Vertical มีเพดาน เครื่องแรงสุดมี limit; Horizontal ขยายเกือบไม่จำกัด

**ตัวอย่าง:**
- ✅ **Vertical** — Database Server ตัวเดิมช้า → เพิ่มเป็น 16 CPU 64GB RAM (เครื่องเดิม ทำให้แรงขึ้น)
- ✅ **Horizontal** — 1 Web Server ไม่พอ → เพิ่มเป็น 10 Web Server, ใช้ Load Balancer หารงาน (Spark Cluster มี Node หลายตัว)
- **ต่างกันตรง:** Vertical ทำง่าย แต่เครื่องแรงขึ้นราคาพุ่งและมีเพดาน; Horizontal ต้นทุนต่อเครื่องต่ำ แต่ออกแบบซับซ้อน

**อย่าสับสน:** "Horizontal ดีกว่า Vertical เสมอ" — ไม่ใช่ ถ้า Application เป็น single-threaded หรือ monolith, Database ที่ shard ได้ยาก ก็ต้องใช้ Vertical แล้ว upgrade

**เช็คความเข้าใจ:** Database Server ตัวเดิมเริ่มช้า คุณจะเลือก Vertical หรือ Horizontal Scaling?
<details><summary>เฉลย</summary>

**โดยทั่วไป: Vertical (เพิ่ม CPU/RAM)**

**เหตุผล:**
1. **Database ยาก Horizontal** — Scaling Database ต้องทำ Sharding/Replication ซึ่งซับซ้อน
2. **Vertical ง่าย** — อาจต้อง downtime สั้นๆ เพื่อเปลี่ยน machine type เพิ่ม RAM/CPU ก็พอ ไม่ต้องเปลี่ยน Architecture
3. **Horizontal เหมาะ Stateless Apps** — Web Server, Spark, งาน batch ที่ไม่เก็บ state

ถ้า Database ขนาดใหญ่มาก พิจารณา Read Replicas (Horizontal สำหรับ read) + Vertical สำหรับ write master

</details>

#### 2.2.3 Managed Service vs Serverless (2 ประเภทหลักของ PaaS)

| | Managed Service | Serverless |
| :--- | :--- | :--- |
| **แนวคิด** | Provider ดูแล Cluster ให้ | ไม่ต้องรู้เรื่อง Server เลย |
| **การจ่ายเงิน `[เสริม]`** | มักจ่ายตามเวลาที่เปิดเครื่อง | จ่ายตามการใช้งานจริง |
| **ตัวอย่างในคอร์ส** | Cloud Composer (CH4) | BigQuery (CH5) |

> 💡 **Intuition:** Managed Service vs Serverless เหมือน **"ร้านอาหารเปิดโดยผู้จัดการ"** — Managed = เช่าร้านที่เจ้าของตึกดูแลไฟ/น้ำ/ซ่อม แต่เราเลือกขนาดและจ่ายตามเวลาที่เปิดแม้ไม่มีลูกค้า; Serverless = จ่ายตามลูกค้าที่เข้าจริง ร้านขยาย/หดเอง ทั้งสองชนิดผู้ใช้ไม่ต้องดูแลพื้นฐาน แต่การจ่ายเงินต่างกัน
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **Managed Service** = Provider ดูแลระบบเต็มตัว (Scaling, Updates, Patches) เราแค่ configure
- **Serverless** = เราส่งแค่ code/query, Provider จัดสรรและปรับความจุอัตโนมัติ
- "จ่ายตามเวลาเปิด" (Managed) → Billing per instance-hour
- "จ่ายตามการใช้" (Serverless) → Billing per invocation/query/scan

**ตัวอย่าง:**
- ✅ **Managed** — Cloud Composer (Airflow managed): เราสร้าง DAG, GCP ดูแล Airflow infrastructure, ใช้ 24/7 จ่าย per hour
- ✅ **Serverless** — BigQuery: เราเขียน SQL ส่งข้อมูล ก็ประมวลผลเลย, จ่ายตามไบต์ที่ scan
- **ต่างกันตรง:** Managed = ต้องตั้ง instance ล่วงหน้า (reserve capacity); Serverless = ปล่อยโหลด ปรับความจุเอง

**อย่าสับสน:** "Serverless = ไม่มี Server" — ไม่ใช่ Server ยังมีแต่ Provider ซ่อนและจัดการให้; Managed ยังมี instance/cluster ที่เราเลือกขนาดและจ่ายตามเวลาเปิด

**เช็คความเข้าใจ:** Startup มีข้อมูล 1 TB แต่ไม่รู้จะมีเท่าไหร่ในเดือนหน้า ควรเลือก Managed Service หรือ Serverless สำหรับ Data Warehouse?
<details><summary>เฉลย</summary>

**ตอบ: Serverless (BigQuery)**

**เหตุผล:**
1. **ไม่รู้จะโต/ลด** → Serverless ขยายเองตามข้อมูล
2. **ไม่ต้องคำนวณ capacity ล่วงหน้า** → BigQuery อ่าน query ได้เลย จ่ายตามไบต์ scan
3. **Managed อาจแพง** — reserve instance แต่ยังไม่ใช้ → Idle cost
4. **Startup ขาดเงิน** → Serverless "pay-as-you-go" ประหยัดกว่า

ถ้าโตขึ้นและค่า BigQuery สูง อาจซื้อ Slots/Capacity pricing — ยังเป็น serverless

</details>

#### 2.2.4 Vendor Lock-in vs Cloud Agnostic

> **Vendor Lock-in** = การติดอยู่ใน ecosystem ของ Cloud Provider รายเดียว ย้ายออกยาก

> **Cloud Agnostic** = บริการ/เครื่องมือที่ใช้ได้กับหลาย Cloud

**ตัวอย่างที่ปรากฏในคอร์ส:** Astro (Airflow ที่ไม่ผูก Google), MinIO (Object Storage open-source ที่ API เข้ากันได้กับ S3)

> 💡 **Intuition:** Vendor lock-in เหมือน **"มือถือที่ชาร์จได้เฉพาะสายของยี่ห้อเดียว"** — ตอนซื้อสะดวกดี แต่วันที่อยากเปลี่ยนค่ายต้องเปลี่ยนอุปกรณ์หลายอย่างตามไปด้วย ส่วน Cloud Agnostic คือ "ชาร์จด้วยช่องมาตรฐาน" ย้ายได้ง่ายกว่า (จุดที่ analogy ไม่ตรง: การหลีกเลี่ยง lock-in มักแลกกับความสะดวกและฟีเจอร์พิเศษที่ผู้ให้บริการทำไว้ดี จึงเป็น trade-off ไม่ใช่สิ่งที่ "ถูกเสมอ")
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Lock-in" → ผูกติดกับผู้ให้บริการรายเดียว จนย้ายออกได้ยากและมีต้นทุนสูง
- "Ecosystem" → ชุดบริการที่ทำงานร่วมกันได้ดีภายในผู้ให้บริการรายเดียว
- "Cloud Agnostic" → บริการหรือเครื่องมือที่ใช้ได้กับหลาย Cloud เช่น Airflow หรือ Object Storage ที่ API เข้ากันได้กับ S3

**ตัวอย่าง:**
- ✅ เขียน pipeline ด้วย Airflow และ SQL มาตรฐาน — ย้ายไป Cloud อื่นได้โดยแก้ส่วนที่เชื่อมกับบริการเฉพาะน้อยกว่า
- ✅ ใช้ฟีเจอร์เฉพาะของ BigQuery เต็มรูปแบบ — เร็วและสะดวก แต่ย้ายออกยากขึ้น
- ❌ "ใช้ MinIO แล้ว lock-in หายไปทั้งหมด" — ไม่จริง ยังมีการผูกกับ operation และบริการอื่นของระบบอยู่
- **ต่างกันตรง:** ใช้ฟีเจอร์เฉพาะของเจ้าเดียว (เร็วและสะดวก แต่ย้ายยาก) หรือยึดมาตรฐานร่วม (ย้ายง่าย แต่อาจเสียฟีเจอร์พิเศษ)

**อย่าสับสน:** "Cloud Agnostic = ไม่ใช้ Cloud" — ไม่ใช่ ยังใช้ Cloud อยู่ แค่เลือกบริการที่ย้ายได้ง่าย

**เช็คความเข้าใจ:** ทีมต้องเลือกระหว่างใช้ฟีเจอร์เฉพาะของ BigQuery หรือยึด SQL มาตรฐาน + Airflow ถ้าอนาคตอาจต้องย้ายไป Cloud อื่น ควรตัดสินใจอย่างไร และต้องถามอะไรก่อน?
<details><summary>เฉลย</summary>

**แนวทาง:** ชั่งน้ำหนักระหว่าง "ความเร็วและฟีเจอร์ที่ได้" กับ "ต้นทุนการย้ายในอนาคต"

**ควรถามก่อน:**
1. ความเป็นไปได้ที่จะย้าย Cloud จริงมีแค่ไหน
2. ฟีเจอร์เฉพาะนั้นจำเป็นต่อธุรกิจหรือไม่ ถ้าไม่จำเป็น การยึดมาตรฐานจะลดความเสี่ยงได้โดยเสียค่าใช้จ่ายน้อย

</details>

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

> 💡 **Intuition:** GCS Bucket เหมือน **"คลังเก็บของขนาดใหญ่ (Warehouse)"** — สร้างชั้นย่อย (Folders เสมือน) จัดระเบียบไฟล์ (Objects) ค่าใช้จ่ายคิดตามพื้นที่จัดเก็บจริง ถ้าลบแล้วกู้ไม่ได้ เว้นแต่มี Soft delete หรือเปิด Object Versioning โดย Bucket นิยมใช้เก็บข้อมูลดิบ (Data Lake) ก่อน Transform ลง Data Warehouse
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **Bucket** = Container ระดับบนสุด ชื่อต้องไม่ซ้ำระดับโลก
- **Object** = Blob (Binary Large Object) = ไฟล์ใดๆ ขนาดสูงสุด 5 TiB ต่อ object
- "Folders เสมือน" → GCS flat namespace ที่จริง ไม่มี folder แต่เก็บโดยชื่อ (e.g., `raw/`, `clean/`)
- **Durability** → 99.999999999% เพราะ replicate ข้อมูลอยู่หลายที่

**ตัวอย่าง:**
- ✅ **Bucket Name:** `my-company-datalake-2024` (เติมชื่อบริษัท/ปีเพื่อไม่ให้ซ้ำทั่วโลก)
- ✅ **Object Path:** `gs://my-company-datalake-2024/raw/transactions_20240518.csv`
- ✅ **File Types:** CSV, JSON, Parquet, Images, Video, Binary — ได้ทั้งหมด
- ❌ "ลบแล้วกู้ได้เสมอ" — ไม่เสมอ กู้ได้เฉพาะช่วง Soft delete (ค่าเริ่มต้น 7 วัน) หรือเมื่อเปิด Object Versioning ไว้ก่อนเท่านั้น
- **ต่างกันตรง:** Local disk จุจำกัดตามเครื่อง; Bucket ขยายได้แทบไม่จำกัด จ่ายตามที่เก็บจริง

**อย่าสับสน:** "GCS คือ Hard Drive ส่วนตัว" — ไม่ใช่ GCS คือ **Object Storage** (ต่างจาก Block Storage/File Storage) ดึง/ใส่ทั้งไฟล์ ไม่ได้แก้ไฟล์ในที่

**เช็คความเข้าใจ:** Data Lake บน GCS ต้องเก็บไฟล์ CSV 100 GB ควรตั้ง Bucket เดียวใหญ่ หรือแบ่ง Bucket หลายตัว?
<details><summary>เฉลย</summary>

**ตอบ: Bucket เดียว ใช้ naming convention แบ่งโฟลเดอร์**

**เหตุผล:**
1. **ค่าใช้จ่ายเหมือนกัน** — ไม่ว่า 1 Bucket หรือหลาย Bucket, ราคาตาม GB เก็บ
2. **จัดการง่ายกว่า** — 1 Bucket, ใช้ prefix: `gs://datalake/raw/`, `gs://datalake/clean/`, `gs://datalake/archive/`
3. **แยก Bucket เมื่อต้องการ** IAM, Location, Storage class หรือ billing ต่างกัน (เช่น dev/prod)

</details>

**Object Storage แบบ S3 ได้ durability สูงมาก:** สไลด์อ้างว่า Amazon S3 ได้ 99.999999999% durability จากเทคนิค เช่น แยกการเก็บ metadata และไฟล์ content `[เทคนิคอื่นดูสไลด์ P.41]`

**Cloud Shell:** เครื่องมือฟรีที่ให้ใช้ command-line (CLI) ผ่าน web browser

---

### 2.4 Intro to Bash (Linux Command Line)

> **Linux** (หรือ `*nix`) เป็นระบบปฏิบัติการที่มีรากฐานจาก Unix **Bash** (Bourne-Again SHell) เป็น command language สั่งงานระบบผ่าน Terminal

ทำไม DE ต้องรู้: เครื่อง Server บน Cloud ส่วนใหญ่รัน Linux และมักไม่มีหน้าจอกราฟิก ต้องควบคุมด้วยคำสั่ง

> 💡 **Intuition:** Bash คือ **"วิธีพูดคุยกับคอมพิวเตอร์ผ่าน Terminal"** — แทน GUI (คลิกปุ่ม) คุณพิมพ์คำสั่งให้เครื่องทำ ดีเพราะ Server บน Cloud ไม่มีหน้าจอ ต้องควบคุมด้วยคำสั่ง และเครื่องสามารถ "จำ" ลำดับคำสั่งที่เราพิมพ์ เก็บเป็น script ได้เพื่อรันทีหลัง
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **Command** = คำสั่ง ว่าต้องการให้เครื่องทำอะไร (e.g., `ls` = แสดง list ไฟล์)
- **Terminal / Shell** = หน้าจอพิมพ์คำสั่ง (Bash เป็น shell type)
- **File Path** = ที่อยู่ของไฟล์/folder (e.g., `/home/airflow/dags/`)
- **Absolute Path** = พาธจากรากสุด `/`; **Relative Path** = พาธจากตำแหน่งปัจจุบัน

**ตัวอย่าง:**
- ✅ **รู้ตำแหน่ง** → `pwd` (print working directory)
- ✅ **ดูไฟล์** → `ls` (list files)
- ✅ **cd** → เปลี่ยนไดเรกทอรี (change directory) เช่น `cd /home/airflow` (เข้าไปในโฟลเดอร์นั้น)
- ❌ "ลบด้วย `rm file.txt` ก็สามารถกู้ได้" — ไม่ได้ `rm` ลบถาวร ไม่มี Recycle Bin
- **ต่างกันตรง:** GUI = คลิก-คลิก มองเห็น; Bash = พิมพ์คำสั่ง ต้องจำหรือให้ `man` ช่วย

**อย่าสับสน:** "Bash หรือ Shell ต่างกัน" — Bash เป็น **ชนิด** ของ Shell (มี Shell ตัวอื่น เช่น sh, zsh แต่ Bash ยอดนิยม)

**เช็คความเข้าใจ:** เครื่องของคุณตอนนี้อยู่ที่ `/home/user/documents` ต้องการไปที่ `/home/user/projects` ใช้คำสั่งอะไร?
<details><summary>เฉลย</summary>

**ตอบ: `cd /home/user/projects` หรือ `cd ../projects`**

**เหตุผล:**
1. **`cd /home/user/projects`** = absolute path ชัดเจน
2. **`cd ../projects`** = relative path: `..` = ขึ้นไปหนึ่งระดับ จาก /home/user/documents ขึ้นไป /home/user แล้วเข้า projects

ทั้งคู่ถูก อันไหนก็ได้ แต่ absolute path ปลอดภัยกว่า (ไม่สับสนกับตำแหน่ง)

</details>

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

#### 💡 เสริม: cp / mv / rm (การจัดการไฟล์ใน Terminal)

> 💡 **Intuition:** ลองนึกถึง **"กระดาษบนโต๊ะทำงาน"** — `cp` คือถ่ายสำเนาแล้วเก็บต้นฉบับไว้ที่เดิม, `mv` คือย้ายกระดาษไปอีกลิ้นชัก (หรือเปลี่ยนชื่อ) ต้นฉบับจึงหายจากที่เดิม, `rm` คือฉีกทิ้งโดยไม่มีถังขยะให้กู้ (จุดที่ analogy ไม่ตรง: ใน GUI ทั่วไปมี Trash ให้กู้คืนได้ แต่ `rm` ใน Terminal ไม่มีขั้นตอนนี้)
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "`cp SOURCE DEST`" → copy สร้างไฟล์ใหม่ที่ปลายทาง ต้นฉบับยังอยู่ที่เดิม
- "`mv SOURCE DEST`" → move ย้ายไฟล์ไปที่ใหม่; ถ้าปลายทางอยู่ในโฟลเดอร์เดิมและเป็นชื่อใหม่ ก็คือการเปลี่ยนชื่อ
- "`rm FILE`" → remove ลบถาวร ไม่มี Recycle Bin
- "`cp -r`" → copy ทั้งโฟลเดอร์ (ต้องใส่ `-r` สำหรับโฟลเดอร์)

**ตัวอย่าง:**
- ✅ `cp sales.csv backup/` — ได้สำเนาใน `backup/` และ `sales.csv` เดิมยังอยู่ (ต้องมีโฟลเดอร์ `backup/` ก่อน)
- ✅ `mv old.csv new.csv` — เปลี่ยนชื่อไฟล์ในโฟลเดอร์เดิม
- ❌ `rm *.csv` ตอนตั้งใจจะลบแค่ไฟล์ทดลอง — ทุกไฟล์ `.csv` ในโฟลเดอร์จะหายทันทีโดยไม่มีทางกู้ (ควรใช้ `ls *.csv` ดูรายชื่อก่อน)
- **ต่างกันตรง:** `cp` = มีสองชุด, `mv` = เหลือชุดเดียวที่ย้ายแล้ว, `rm` = หายจริง

**อย่าสับสน:** "`mv` = ย้ายไปถังขยะ" — ไม่ใช่ `mv` ไม่มีถังขยะ ย้ายหรือเปลี่ยนชื่อโดยตรง การกู้คืนทำได้ยาก

**เช็คความเข้าใจ:** ต้องการให้ `sales.csv` เหลือทั้งในโฟลเดอร์เดิมและมีสำเนาใน `backup/` ใช้คำสั่งอะไร และก่อนพิมพ์ `rm` เพื่อลบไฟล์ควรเช็คอะไร?
<details><summary>เฉลย</summary>

1. สำเนาไฟล์: `cp sales.csv backup/` (ต้นฉบับยังอยู่)
2. ก่อน `rm` ให้ใช้ `ls` ดูชื่อไฟล์ที่ pattern ตรง และยืนยัน path ปัจจุบันด้วย `pwd` ก่อนกด Enter เพราะลบแล้วกู้ไม่ได้

</details>

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
