# Data Engineer - Chapter 01: Data Collection

> **วิชา:** Road to Data Engineer 3.0 (R2DE 3.0) | **ผู้สอน:** DataTH
> **Source:** `Resources/Books/DataEngineer/1_Data_Collection.pdf` (39 slides)
> **หมายเหตุ:** ส่วนที่ติดป้าย `[เสริมนอกสไลด์]` คือความรู้ที่ผู้เขียนโน้ตเพิ่มเอง

---

## Part 1: Macro Architecture & Overview

ลองนึกถึง **ระบบประปา**: น้ำ (ข้อมูล) ต้องถูกสูบจากแหล่งน้ำ (Data Source) ผ่านท่อ (Pipeline) ผ่านการกรอง (Transform) แล้วไปเก็บที่ถังพัก (Staging / Destination) ก่อนส่งให้บ้านแต่ละหลัง Chapter 1 สอนว่า "ท่อ" นี้ออกแบบอย่างไร และเมื่อข้อมูลมาจากหลายแหล่งที่หน้าตาไม่เหมือนกัน เราจะ **Integrate** ให้เป็นชุดเดียวกันได้อย่างไร

```mermaid
flowchart TD
    subgraph ETL["1. ETL Pattern (Traditional)"]
        direction LR
        S1["Sources (DB/API)"] --> E1["Extract"] --> T1["Transform (Staging)"] --> L1["Load (DWH)"]
    end
    subgraph ELT["2. ELT Pattern (Modern Cloud)"]
        direction LR
        S2["Sources (DB/API)"] --> E2["Extract"] --> L2["Load (Lake/DWH)"] --> T2["Transform (SQL)"]
    end
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

> 💡 **Intuition:** Data Pipeline เหมือน **"สายการผลิตในโรงงาน"** — วัตถุดิบ (ข้อมูล) เข้าจากประตูหน้า (Source), ผ่านหลายสถานี (Extract → Transform → Load), ออกมาเป็นสินค้าเสร็จสิ้น (Destination) ทั้งหมดทำงานอัตโนมัติไม่ต้องมีคนดูแลทุกขั้น Pipeline คือระบบที่ทำให้ "ข้อมูลไหล" ตลอด 24 ชั่วโมง แม้คนไปนอนก็ยังทำงาน
> [Source: generated — not verified against original document]

> **Data Pipeline** = ท่อลำเลียงข้อมูลจากแหล่งข้อมูล (Data Source) ไปยังปลายทาง

**ทำไมต้องมี (ตามสไลด์):**
* **Integration:** เป็นตัวกลางรวมข้อมูลจากหลายแหล่งเข้าด้วยกัน
* **Automation:** ทำให้ท่อทำงานอัตโนมัติ ไม่ต้องให้คนมานั่งดึงไฟล์ส่งอีเมลทุกวัน

**ตัวอย่าง:** ฝ่ายขายขอยอดขายรายวันทุกเช้า ถ้าไม่มี Pipeline คนต้อง export CSV ด้วยมือทุกวัน ถ้ามี Pipeline ข้อมูลถูกดึง สรุป และวางลง Dashboard ก่อนใครเข้างาน

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "ท่อลำเลียง" → Automated channel ทำให้ข้อมูลไหลอย่างต่อเนื่อง
- "ปลายทาง" → Destination อาจเป็น Data Warehouse, Dashboard, หรือระบบอื่นใดที่ต้องการข้อมูล
- **Integration** = รวมข้อมูลจากหลายแหล่ง (Database, API, ไฟล์)
- **Automation** = ทำให้ไหลโดยอัตโนมัติ ไม่ต้องทำด้วยมือ

**ตัวอย่าง:**
- ✅ **Pipeline** — ทุกวันเวลา 5 นาฬิกาเช้า ระบบดึง Log จาก Server, ล้างข้อมูล, แล้วลง Dashboard อัตโนมัติ
- ❌ "ให้พนักงาน Export ไฟล์ด้วยมือครั้งเดียวแล้วจบ" — ไม่ใช่ Pipeline เพราะไม่อัตโนมัติและทำซ้ำเองไม่ได้
- **ต่างกันตรง:** งาน Manual = คนทำทีละครั้ง, Pipeline = ชุดขั้นตอนอัตโนมัติที่รันซ้ำได้ (ตามรอบเวลาหรือต่อเนื่อง)

**อย่าสับสน:** "ETL Job" คือ Pipeline ประเภทหนึ่ง — "Pipeline" เป็นคำที่กว้างกว่า รวมทั้งงาน Batch, Streaming และงานที่ไม่ได้เป็น ETL ครบทุกขั้น

**เช็คความเข้าใจ:** ข้อไหนเป็นตัวอย่างของ Pipeline ที่ดี?
- (ก) คนคัดลอกข้อมูลขายจาก Excel ด้วยมือเดือนละครั้ง แล้ววางลง Google Sheets
- (ข) ทุกวันเวลา 6 นาฬิกาเช้า ระบบดึงข้อมูลขายจาก Database อัตโนมัติ, ล้าง, แล้ว reload ลงใน Looker Dashboard
<details><summary>เฉลย</summary>

**ตอบ: (ข)**

**เหตุผล:**
- **(ก)** = Manual process, คน ต้องทำเอง เดือนละครั้ง ไม่ใช่ Pipeline
- **(ข)** = Automated Pipeline: ทำงานเองทุกวัน ไม่ต้องมนุษย์ยุ่งเกี่ยว

</details>

---

### 2.2 องค์ประกอบ E, T, L

| ขั้น | ความหมาย | ตัวอย่างงาน |
| :--- | :--- | :--- |
| **E = Extract** | ดึงข้อมูลจาก Business Data / Customer Data / ระบบต้นทาง | `SELECT` จาก Database, เรียก API, อ่านไฟล์ |
| **T = Transform** | เปลี่ยนข้อมูลให้อยู่ในรูปที่ต้องการ หลากหลายรูปแบบ | ล้างค่าผิด, แปลงชนิดข้อมูล, Join, Aggregate |
| **L = Load** | นำข้อมูลจาก **Staging Area** เข้าสู่ระบบปลายทาง (Destination) | เขียนลง Data Lake / Warehouse |

> **Staging Area** คือพื้นที่พักข้อมูลชั่วคราวระหว่างทาง ก่อนโหลดเข้าปลายทางจริง ช่วยให้ถ้าขั้น Transform พลาด ไม่ต้องไปดึงจาก Source ใหม่ทุกครั้ง `[เหตุผลเสริมนอกสไลด์]`

> 💡 **Intuition:** Staging Area เหมือน **"ที่พักสัมภาระชั่วคราวที่สถานีรถไฟ"** — กระเป๋าถูกวางพักไว้ก่อน ตรวจและจัดให้เรียบร้อย แล้วค่อยส่งต่อไปโรงแรม (Destination) ถ้าจัดผิด ก็หยิบจากจุดพักมาจัดใหม่ได้เลย ไม่ต้องกลับไปเอาที่บ้าน (Source)
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "พื้นที่พักข้อมูลชั่วคราว" → Temporary storage, ข้อมูลไม่อยู่ถาวร
- "ก่อนโหลดเข้าปลายทางจริง" → ระหว่าง Source และ Destination
- "ถ้า Transform พลาด ไม่ต้องไปดึงจาก Source ใหม่" → ประหยัดเวลา ดึง 1 ครั้งเก็บไว้แล้ว

**ตัวอย่าง:**
- ✅ **ใช้ Staging Area** — Extract Log → เก็บใน Staging Database → Transform (ถ้าพลาด ดึงจากที่นี่ไปแล้วแก้) → Load ลง Data Warehouse
- ❌ "ดึงแล้วแปลงแล้วส่งทันทีไม่ต้องพัก" — เสี่ยงกว่า ถ้า Transform พลาด ต้องดึงจาก Source ใหม่ (เปลืองเวลาและเพิ่มภาระ Source)
- **ต่างกันตรง:** มี Staging = ดึง 1 ครั้ง, ไม่มี Staging = ดึงหลายครั้งถ้าพลาด

**อย่าสับสน:** "Staging Area" และ "Data Lake" เป็นคนละสิ่ง — Staging Area เก็บ **ชั่วคราว** (เฉพาะช่วงรอบการประมวลผล แล้วล้างหรือเขียนทับ), Data Lake เก็บ **ระยะยาว** (เดือน/ปี)

**เช็คความเข้าใจ:** ทำไมจึงต้อง Staging Area?
<details><summary>เฉลย</summary>

**คำตอบหลัก:**
1. **ลดการดึงซ้ำ** — ดึง 1 ครั้ง เก็บไว้ Staging, ถ้า Transform ผิด ดึงจาก Staging ไป Transform ใหม่ไม่ต้องไปดึง Database ต้นทางอีก
2. **Debug ง่าย** — มองข้อมูล Staging ได้ว่า Transform ขั้นไหนพลาด
3. **กันข้อมูลครึ่งๆ กลางๆ หลุดเข้าปลายทาง** — ถ้า Transform พลาด ข้อมูลยังค้างอยู่ใน Staging ไม่ถูกโหลดเข้าปลายทาง

</details>

#### ETL vs ELT ต่างกันอย่างไร

> 💡 **Intuition:** ETL vs ELT เหมือน **"วิธีเตรียมวัตถุดิบก่อนเก็บ"** — ETL = ล้าง ซอย ปรุงแต่งเสร็จให้เรียบร้อยก่อนเข้าตู้เย็น (ผ่านจุดต่ออื่น = Staging Area), ELT = เข้าตู้เย็นดิบๆ แล้วครัวหลักเป็นคนล้าง ปรุง ตามต้องการ (Cloud Warehouse ทำได้เพราะแรง) ETL = เตรียมก่อน, ELT = เตรียมหลัง
> [Source: generated — not verified against original document]

* **ETL:** Transform ก่อนโหลด ปลายทางได้ข้อมูลที่จัดแล้ว เหมาะเมื่อปลายทางไม่ได้แรงพอจะ Transform เอง หรือต้องตัดข้อมูลสำคัญ (เช่น PII) ก่อนเข้าระบบ `[เสริมนอกสไลด์]`
* **ELT:** โหลดข้อมูลดิบเข้าปลายทางก่อน แล้ว Transform ด้วยพลังของปลายทาง (นิยมกับ Cloud Data Warehouse ที่ประมวลผลขนาดใหญ่ได้เร็ว)

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **ETL** = Extract → Transform (ที่ Staging) → Load
- **ELT** = Extract → Load → Transform (ที่ปลายทาง)
- "Transform ที่ Staging" → แปลงข้อมูลพักไว้ ก่อนส่งต่อ (ช่วยให้ Debug ถ้าพลาด)
- "Transform ที่ปลายทาง" → ข้อมูลดิบโหลดเข้า แล้วค่อย Transform ด้วย SQL

**ตัวอย่าง:**
- ✅ **ETL** — ดึง Log จาก Server → ลบข้อมูลส่วนตัว (PII) → เก็บลง Data Lake
- ✅ **ELT** — ดึง Log ดิบ → โหลดลง BigQuery → ใช้ SQL Transform ได้เลย
- **ต่างกันตรง:** ETL = ข้อมูลสะอาดแล้วตอนเข้าปลายทาง, ELT = ข้อมูลดิบเข้าปลายทางก่อน แล้วค่อยทำให้สะอาดภายในปลายทาง

**อย่าสับสน:** "ELT ดีกว่า ETL เสมอ" — ไม่ใช่ ขึ้นกับสถาปัตยกรรม: หากปลายทางแรง (Cloud) ใช้ ELT, หากต้องตัดข้อมูลลับหรือปลายทางไม่แรง ใช้ ETL

**เช็คความเข้าใจ:** ธนาคารมีไฟล์ต้นทาง 200GB แต่ต้องการแค่ข้อมูล Customer (~20GB) และปลายทางเป็น Legacy System เก่าที่ประมวลผลไม่แรง ควรใช้ ETL หรือ ELT?
<details><summary>เฉลย</summary>

**ตอบ: ETL**

**เหตุผล:**
1. **Legacy System อ่อน** → ไม่สามารถ Transform ขนาดใหญ่ได้
2. **ลดการส่งข้อมูล** → Transform ก่อน ตัดเพียง Customer data ที่ต้องการ (20GB), ส่งแค่นั้น
3. **ปลอดภัย** → ตัดข้อมูลลับ (เช่น การทำธุรกรรม Internal) ก่อนจะไปถึง Legacy System

</details>

#### Reverse ETL

แนวคิดใหม่ ส่งข้อมูลที่รวบรวมและวิเคราะห์แล้วใน Warehouse **กลับ** ไปที่ Tool ต่างๆ เช่น CRM หรือระบบโฆษณา เพื่อให้ฝ่ายธุรกิจใช้งานทันที

#### 💡 เสริม: Reverse ETL

> 💡 **Intuition:** ปกติข้อมูลไหลจากแหล่งต่าง ๆ **เข้า** Warehouse เหมือน **"ส่งวัตถุดิบเข้าโกดังกลาง"** แต่ Reverse ETL คือ **"หยิบสินค้าที่คัดแยกและวิเคราะห์แล้วจากโกดังกลับออกไปวางหน้าร้าน"** เช่น ส่งรายชื่อลูกค้าที่มีโอกาสซื้อสูงเข้า CRM ให้ทีมขายโทรติดตาม (จุดที่ analogy ไม่ตรง: Warehouse ไม่ใช่แค่ที่พัก ข้อมูลที่ส่งกลับไปต้องตรงกับความหมายที่ระบบปลายทางคาดหวัง มิฉะนั้นทีมจะเข้าใจผิด)
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Reverse ETL" → ดึงข้อมูลที่วิเคราะห์แล้วจาก Warehouse แล้วส่งกลับไปยังเครื่องมือธุรกิจ
- "CRM (Customer Relationship Management)" → ระบบจัดการความสัมพันธ์กับลูกค้า ที่ทีมขายใช้งานประจำ
- "Tool ธุรกิจ" → เครื่องมือที่ทีมใช้ทำงานประจำวัน เช่น CRM หรือระบบโฆษณา

**ตัวอย่าง:**
- ✅ Warehouse คำนวณ "ลูกค้าที่ไม่ได้ซื้อเกิน 90 วัน" แล้วส่งเข้า CRM ให้ทีมขายติดตาม — Reverse ETL
- ✅ ทีมโฆษณาต้องการกลุ่มลูกค้าที่มีโอกาสซื้อสูงไปใช้ยิงโฆษณา — Reverse ETL
- ❌ "Reverse ETL ใช้แทน ETL ได้ เพราะก็ส่งข้อมูลเข้า Warehouse เหมือนกัน" — ไม่จริง ทิศทางตรงข้าม: Reverse ETL ไหลจาก Warehouse ออกไปยังเครื่องมือธุรกิจ

**ต่างกันตรง:** ETL = ข้อมูลไหลเข้า Warehouse เพื่อวิเคราะห์ / Reverse ETL = ข้อมูลที่วิเคราะห์แล้วไหลออกไปใช้งานในเครื่องมือธุรกิจ

**อย่าสับสน:** "Reverse ETL = ยกเลิกการ ETL" — ไม่ใช่ ไม่ได้ลบหรือย้อนข้อมูลเดิม แต่เป็นการส่งผลที่วิเคราะห์แล้วไปยังปลายทางอื่น

**เช็คความเข้าใจ:** ทีมขายอยากเห็นรายชื่อลูกค้าที่มีคะแนน "โอกาสซื้อ" สูงใน CRM ทุกเช้า ข้อมูลไหลทิศทางไหน และเป็น ETL หรือ Reverse ETL?
<details><summary>เฉลย</summary>

**ตอบ: Reverse ETL**

**เหตุผล:** ข้อมูลไหลจาก Warehouse (ที่วิเคราะห์คะแนนแล้ว) ออกไปยัง CRM ที่ทีมขายใช้งาน ซึ่งเป็นทิศทางตรงข้ามกับ ETL

</details>

---

### 2.3 Key Considerations / Trade-offs

สไลด์ระบุปัจจัยที่ต้องชั่งน้ำหนักเมื่อออกแบบ Pipeline โดยเริ่มจาก **Accuracy** (ความถูกต้องของข้อมูล) `[ปัจจัยอื่นที่ตามมาในสไลด์ ให้ตรวจดูที่ P.16 ในไฟล์ PDF]`

| ปัจจัยที่ควรชั่งน้ำหนัก | ตัวอย่างคำถามออกแบบ |
| :--- | :--- |
| **Accuracy** | ข้อมูลที่ได้ถูกต้องครบหรือไม่ |
| **Latency** `[เสริมนอกสไลด์]` | ข้อมูลต้องมาถึงเร็วแค่ไหน (วินาที หรือรายวัน) |
| **Cost** `[เสริมนอกสไลด์]` | จ่ายค่า Compute/Storage คุ้มกับคุณค่าหรือไม่ |

> หลักคิดแบบ DE: ไม่มี Pipeline ที่ "ดีที่สุด" มีแต่ "เหมาะกับโจทย์และงบที่สุด"

#### 💡 เสริม: Trade-off ของ Latency และ Cost

> 💡 **Intuition:** การออกแบบ Pipeline เหมือน **"การเลือกพาหนะไปทำงาน"** — รถเร็วแต่แพง รถถูกแต่ช้า ไม่มีคันไหนดีที่สุดในทุกเงื่อนไข ต้องดูระยะทาง งบ และเวลาที่ต้องถึงที่หมาย Accuracy, Latency, Cost มักดึงไปคนละทิศ จึงต้องชั่งน้ำหนักเสมอ (จุดที่ analogy ไม่ตรง: ปัจจัยเหล่านี้วัดเป็นตัวเลขคนละหน่วยและไม่มีสูตรเปรียบเทียบตรง ๆ การตัดสินใจจึงขึ้นกับบริบทของงาน)
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Accuracy" → ข้อมูลถูกต้องและครบถ้วนแค่ไหน
- "Latency" → เวลาตั้งแต่ข้อมูลเกิดขึ้นจนมาถึงปลายทาง (ไม่ใช่ปริมาณข้อมูล)
- "Cost" → ค่า Compute และ Storage เมื่อเทียบกับคุณค่าที่ได้รับ
- "Trade-off" → การได้อย่างหนึ่งมักต้องแลกกับอีกอย่างหนึ่ง

**ตัวอย่าง:**
- ✅ รายงานยอดขายรายวันที่ผู้บริหารดูตอนเช้า — latency รายวันเพียงพอ ประหยัด cost ได้
- ✅ ระบบแจ้งเตือนสต็อกหมดที่ต้องรู้ทันที — latency ต่ำเป็นสำคัญ แม้ cost จะสูงขึ้น
- ❌ "ตั้ง latency ให้ต่ำที่สุดในทุกงาน" — ค่าใช้จ่ายจะสูงโดยไม่จำเป็นสำหรับงานที่ไม่ต้องการความเร็ว

**ต่างกันตรง:** ต้องการความเร็ว (Latency ต่ำ) / ต้องการประหยัด (Cost ต่ำ) / ต้องการความถูกต้องสูงสุด (Accuracy)

**อย่าสับสน:** "Latency = จำนวนข้อมูล" — ไม่ใช่ Latency คือ "เวลาที่รอให้ข้อมูลมาถึง" ไม่ได้วัดว่าข้อมูลมีเยอะแค่ไหน

**เช็คความเข้าใจ:** รายงานใช้ข้อมูลทุกเดือนและไม่ต้องรู้ทันที กับระบบแจ้งเตือนสต็อกหมด ควรเลือก latency แบบไหนให้แต่ละงาน และยอมแลกอะไร?
<details><summary>เฉลย</summary>

1. **รายงานรายเดือน** → latency สูงได้ (ข้อมูลมาช้าได้) แลกกับ cost ที่ต่ำลง
2. **แจ้งเตือนสต็อกหมด** → latency ต่ำ (ใกล้ real-time) ยอมจ่าย cost สูงขึ้นเพื่อให้รู้ทันที

</details>

---

### 2.4 ประเภทของ Data Pipeline และการประมวลผล

#### การโหลดข้อมูล

| ประเภท | ความหมาย | ใช้เมื่อ |
| :--- | :--- | :--- |
| **Initial / Historical / Full Load** | โหลดข้อมูลทั้งหมด | ตั้งระบบครั้งแรก หรือข้อมูลน้อย |
| **Incremental Load** `[เสริมนอกสไลด์]` | โหลดเฉพาะส่วนที่เพิ่ม/เปลี่ยน | ข้อมูลใหญ่ ต้องการประหยัดเวลา |

#### 💡 เสริม: Full Load vs Incremental Load

> 💡 **Intuition:** Full Load เหมือน **"ซื้อของใหม่ทั้งตู้เย็นทุกสัปดาห์"** ส่วน Incremental Load เหมือน **"ซื้อเฉพาะของที่หมดหรือเปลี่ยนไป"** — ประหยัดกว่ามากเมื่อข้อมูลใหญ่ แต่ต้องรู้ให้แม่นว่าอะไรเพิ่มหรือเปลี่ยน ถ้าพลาดข้อมูลจะตกหล่น (จุดที่ analogy ไม่ตรง: การลบข้อมูลเดิมมักไม่ปรากฏเป็น "แถวที่เพิ่มใหม่" จึงต้องออกแบบวิธีจัดการแยกต่างหาก)
> [Source: generated — not verified against original document]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Full Load" → โหลดข้อมูลทั้งหมดทุกครั้ง
- "Incremental Load" → โหลดเฉพาะแถวที่เพิ่มหรือเปลี่ยนนับจากรอบก่อนหน้า
- "Watermark" → จุดตรวจที่บอกว่าโหลดถึงไหนแล้ว เช่น ค่า `updated_at` ของรอบล่าสุด

**ตัวอย่าง:**
- ✅ ตารางออเดอร์ที่มีหลายร้อยล้านแถวและเพิ่มทุกวัน — Incremental โดยดึงเฉพาะแถวที่ `updated_at` มากกว่า watermark ของรอบล่าสุด
- ✅ ตั้งระบบครั้งแรก — Full Load เพื่อให้มีข้อมูลตั้งต้นครบ
- ❌ "Incremental ไม่ต้องกังวลเรื่องข้อมูลที่ถูกลบ" — ไม่จริง การลบมักไม่ปรากฏเป็นแถวใหม่ ทำให้ปลายทางยังเก็บแถวที่ลบไปแล้วได้

**ต่างกันตรง:** ครั้งแรกหรือข้อมูลน้อย → Full Load / ข้อมูลใหญ่ที่เพิ่มต่อเนื่อง → Incremental Load

**อย่าสับสน:** "Incremental = เก็บประวัติ (History)" — ไม่ใช่ ประเภทการโหลดเป็นวิธีดึงเฉพาะส่วนที่เปลี่ยน ส่วนการเก็บประวัติการเปลี่ยนแปลงเป็นการออกแบบตารางอีกเรื่องหนึ่ง

**เช็คความเข้าใจ:** ตารางออเดอร์มี 500 ล้านแถวและเพิ่มทุกวัน ควรใช้ Full Load หรือ Incremental Load และต้องมีอะไรเป็นจุดตรวจ?
<details><summary>เฉลย</summary>

1. **Incremental Load** — ข้อมูลใหญ่และเพิ่มต่อเนื่อง การโหลดทั้งหมดทุกวันสิ้นเปลือง
2. **จุดตรวจ (watermark)** เช่น `updated_at` ของรอบล่าสุด เพื่อดึงเฉพาะแถวที่เพิ่มหรือเปลี่ยนหลังจากนั้น

</details>

#### ประเภทการประมวลผล (Processing)

> 💡 **Intuition:** Batch vs Streaming เหมือน **"รถเก็บขยะ vs สายพาน"** — Batch = รถเก็บขยะที่มาตามเวลาที่กำหนด (เช่น ตี 5) แล้วเก็บไปทีเดียวทั้งก้อน, Streaming = สายพานที่พาของไปทันทีที่วางลง ทำงานตลอดเวลา — Batch ประหยัดทรัพยากร, Streaming ได้ข้อมูลสด 24/7
> [Source: generated — not verified against original document]

| ประเภท | ความหมาย (ตามสไลด์) | ตัวอย่าง |
| :--- | :--- | :--- |
| **Batch** | Scheduled ดึงตามช่วงเวลาที่กำหนด | รายงานยอดขายรายวัน |
| **Streaming / Real-time** `[เสริมนอกสไลด์]` | ประมวลผลทันทีที่ข้อมูลเกิด | ตรวจจับธุรกรรมผิดปกติ |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **Batch** = "Scheduled" → ตั้งเวลาไว้ (เช้า 5 โมง, เที่ยงวัน 12 โมง) รันทั้งก้อนพร้อมกัน
- **Streaming** = "ทันที" → ข้อมูลเข้า 1 รายการ ก็ประมวลผลได้เลย ไม่รอ
- "Latency" → เวลาที่ข้อมูล "สร้าง" จนถึง "แสดงผล": Batch มี lag นาที/ชั่วโมง, Streaming มี lag วินาที/มิลลิวินาที

**ตัวอย่าง:**
- ✅ **Batch** — เวลา 6 โมงเช้า ระบบดึง Log ของเมื่อวาน ประมวลผล สร้าง Report ส่ง Email ให้ Manager
- ✅ **Streaming** — ทันทีที่มีธุรกรรม Credit Card ผิดปกติ ระบบส่ง Alert ให้ลูกค้าทันที
- **ต่างกันตรง:** Batch = "ช่วงแน่นอน + ประมวลหลายรายการ", Streaming = "ตลอดเวลา + ทีละรายการ"

**อย่าสับสน:** "Real-time" กับ "Streaming" มักใช้สลับกัน แต่ Streaming คือ **วิธีประมวลผล** (ข้อมูลไหลเข้าทีละ event แล้วประมวลผลต่อเนื่อง) ส่วน Real-time คือ **ข้อกำหนดด้าน Latency** (ต้องได้ผลเร็วภายในเวลาที่กำหนด) — Streaming มักใช้เพื่อให้ได้ Real-time

**เช็คความเข้าใจ:** ระบบไหนควรใช้ Batch, ระบบไหนควรใช้ Streaming?
- (ก) ระบบรายงานยอดขายเดือนต่อ CEO
- (ข) ระบบตรวจจับใบหน้าลูกค้า VIP ที่เดินเข้าร้าน เพื่อแจ้ง Sales ให้ออกมาต้อนรับ
- (ค) ระบบสำรองข้อมูล Database
<details><summary>เฉลย</summary>

**(ก) Batch** — รายงาน CEO ไม่ต้องรู้ทันที, ทำแบบ scheduled (เช่น ทุกสิ้นเดือน)

**(ข) Streaming** — ต้องรู้ทันทีคนนั้นเข้ามา, Alert ให้ Sales ตอบรับทันที

**(ค) Batch** — ข้อมูล Backup ไม่ต้องตลอดเวลา ทำแบบ scheduled ตอนไม่ busy (เช่น เที่ยงคืน)

**หลักคิด:** หากต้องการเร็ว (รู้ทันที) = Streaming, หากตัดสินใจแบบ bulk = Batch

</details>

#### เครื่องมือสร้าง Data Pipeline

สไลด์แบ่งเป็นกลุ่ม เช่น **Pre-built connectors** (เครื่องมือสำเร็จรูป ไม่ต้องเขียนโค้ด) และกลุ่มที่เขียนโค้ดเอง (เช่น Python) การเลือกขึ้นกับทักษะทีม งบ และความซับซ้อนของงาน (Fivetran, Airbyte ใน CH7)

---

### 2.5 Data Integration

> 💡 **Intuition:** Data Integration เหมือน **"รวมรายชื่อแขกจากหลายทีมเป็นลิสต์เดียว"** — ทีมหนึ่งเขียนชื่อเต็ม อีกทีมแยกชื่อ-นามสกุล; ทีมหนึ่งใช้ M/F อีกทีมใช้ Male/Female ต้องแปลงให้เป็นแบบเดียวกันก่อน ผู้บริหารจึง "เห็นภาพรวม" ที่ถูกต้อง
> [Source: generated — not verified against original document]

> **Data Integration** = การนำข้อมูลจากหลายแหล่งมารวมเป็นข้อมูลชุดเดียวกัน ให้เห็นภาพรวมทั้งหมด

**แหล่งข้อมูลที่พบ:** Database, Data Warehouse, Data Lake, ไฟล์, **API** (ช่องทางให้โปรแกรมคุยกันได้ เช่น Python ดึงข้อมูลสภาพอากาศจาก API ของกรมอุตุนิยมวิทยา)

#### ประเภทหลักของ Data Integration

| ประเภท | ปัญหาที่แก้ | ตัวอย่าง |
| :--- | :--- | :--- |
| **Schema Integration** | โครงสร้างข้อมูลต่างกัน | ระบบ A เก็บ `full_name` เดียว ระบบ B แยก `first_name`, `last_name` |
| **Value Integration** | ค่าของข้อมูลเดียวกันไม่ตรงกัน | `M/F` vs `Male/Female` |

#### Schema Integration ทำอย่างไร

เข้าใจโครงสร้างในแต่ละแหล่ง (**Local Schema**) แล้วออกแบบ **Global Schema** กลางที่ทุกแหล่ง map เข้ามาได้

```mermaid
flowchart LR
    A["Local Schema A<br>(full_name)"] --> G["Global Schema<br>(first_name, last_name)"]
    B["Local Schema B<br>(first, last)"] --> G
    G --> W["Data Warehouse"]
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

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- **Schema Integration** = "โครงสร้างต่างกัน" → ระบบ A มี Column ต่างจากระบบ B (ชื่อหรือจำนวนคอลัมน์ไม่เหมือนกัน)
- **Value Integration** = "รูปแบบค่าต่างกัน" → Column ชื่อเหมือน แต่เก็บค่าต่างกัน (M vs Male)
- **Local Schema** = โครงสร้างของแต่ละระบบ
- **Global Schema** = โครงสร้าง "รวม" ที่ทุกระบบ map เข้ามา

**ตัวอย่าง:**
- ✅ **Schema Integration** — ระบบ HR เก็บ `first_name`, `last_name` แยก, ระบบ Payroll เก็บ `full_name` รวม → ต้องสร้าง Global Schema ที่รวมให้เป็นรูปแบบเดียว
- ✅ **Value Integration** — HR เก็บ `M`/`F`, Payroll เก็บ `Male`/`Female` → ต้องทำให้เป็นมาตรฐาน (เช่น `male`/`female` ทั้งคู่)
- **ต่างกันตรง:** Schema = "รูปร่าง" ต่างกัน, Value = "เนื้อหา" ต่างกัน

**อย่าสับสน:** "Schema Integration" **ไม่ใช่** "Value Integration" — Schema = โครงสร้าง (column), Value = ค่า (data inside column)

**เช็คความเข้าใจ:** ข้อไหนเป็น Schema Conflict, ข้อไหนเป็น Value Conflict?
- (ก) ระบบ A มี Column `birthdate` (YYYY-MM-DD), ระบบ B มี Column `birth_year` เพียงอย่างเดียว
- (ข) ระบบ A เก็บ `country = "TH"`, ระบบ B เก็บ `country = "Thailand"`
- (ค) ระบบ A มี `phone`, ระบบ B ไม่มีเลย
<details><summary>เฉลย</summary>

**(ก) Schema Conflict** — Column ต่างกัน (birthdate vs birth_year) ต้องออกแบบ Global Schema ตัดสินใจ: ใช้ birth_year เป็นตัวกลาง (ดึงปีจาก birthdate ของ A) หรือเก็บ birthdate แล้วปล่อยเป็น NULL สำหรับข้อมูลจาก B ที่ไม่มีวันเดือน

**(ข) Value Conflict** — Column เหมือนกัน (country) แต่ค่าต่างกัน ("TH" vs "Thailand") ต้องมาตรฐาน

**(ค) Schema Conflict** — ระบบหนึ่งมี column ระบบหนึ่งไม่มี → ต้องตัดสินใจ: Optional field ใน Global Schema หรือต้อง mandatory ทั้งคู่

</details>

---

### 2.6 Workshop 1: Data Collection with Python

* **แหล่งเรียนรู้ & โน้ตบุ๊กปฏิบัติการ:** [Google Colab - Workshop 1 (กด File > Save a copy in Drive)](https://colab.research.google.com/drive/1O4k37OvuBw1YlGcRPV17vIVbS6lJIZxX?usp=sharing)
* **ที่มาของชุดข้อมูล (Dataset Background):** ดัดแปลงมาจาก [Kaggle: E-commerce Business Transaction Dataset](https://www.kaggle.com/datasets/gabrielramos87/an-online-shop-business/data) โดยจำลองแบ่งข้อมูลออกเป็น 3 ตารางบน Relational Database เพื่อให้ฝึกฝนการทำ Data Integration & Collection เสมือนระบบงานจริง
* **โจทย์:** ดึงข้อมูลธุรกรรมจาก MySQL Database และดึงอัตราแลกเปลี่ยนค่าเงิน GBP เป็น THB จาก REST API เพื่อรวมและแปลงข้อมูลยอดขายให้พร้อมสำหรับการนำไป Clean ใน [[Chapter 02 - Data Cleansing with Spark]]

---

#### 2.6.1 แหล่งข้อมูลต้นทาง (Source Ingestion Specification)

1. **MySQL Database:**
   * **Host:** `34.136.184.58` | **Port:** `3306` | **Database:** `r2de3` | **Charset:** `utf8mb4`
   * **Credentials:** User `r2de3`, Password `Roady-to-DE-star-3.0`
   * **ตารางที่ใช้งาน:**
     * `r2de3.transaction`: บันทึกธุรกรรม (`TransactionNo`, `Date`, `ProductNo`, `Price`, `Quantity`, `CustomerNo`)
     * `r2de3.product`: ข้อมูลสินค้า (`ProductNo`, `ProductName`)
     * `r2de3.customer`: ข้อมูลลูกค้า (`CustomerNo`, `Country`, `Name`)

   > 🔒 **Security Best Practice (Colab Secrets & Credential Isolation):**
   > * **ห้าม** Hardcode รหัสผ่านลงในโค้ด และ **ห้าม** Commit Credential ขึ้น Git เด็ดขาด
   > * บน Google Colab ให้ใส่ค่าลงในแท็บ **Secrets (ไอคอนรูปกุญแจ 🔑)** และเปิดสวิตช์ **Notebook access** ให้เป็นสีฟ้า เพื่อเรียกใช้ผ่าน `google.colab.userdata`
   >
   > ![Colab Secrets Setup](attachments/de_ws1_colab_secrets.png)

2. **REST API อัตราแลกเปลี่ยนเงิน (Currency Conversion API):**
   * **Endpoint:** `https://r2de3-currency-api-vmftiryt6q-as.a.run.app/gbp_thb` (HTTP GET)
   * **รูปแบบข้อมูล (JSON):**
     ```json
     [
       {"date": "2023-05-01", "gbp_thb": 42.761, "id": "ebf2"},
       {"date": "2023-05-02", "gbp_thb": 42.477, "id": "101a"}
     ]
     ```

---

#### 2.6.2 โค้ดปฏิบัติการเต็มตามลำดับขั้นตอน (Step-by-Step Implementation)

##### Step 1: ดึงข้อมูลจาก MySQL ด้วย PyMySQL & SQLAlchemy
```python
# 1. ติดตั้ง driver สำหรับ MySQL
!pip install pymysql

import sqlalchemy
import pandas as pd
from google.colab import userdata

# 2. ดึง Credential จาก Colab Secrets ป้องกันการ Hardcode
class Config:
    MYSQL_HOST = userdata.get("MYSQL_HOST")
    MYSQL_PORT = userdata.get("MYSQL_PORT")  # 3306
    MYSQL_USER = userdata.get("MYSQL_USER")
    MYSQL_PASSWORD = userdata.get("MYSQL_PASSWORD")
    MYSQL_DB = 'r2de3'
    MYSQL_CHARSET = 'utf8mb4'

# 3. สร้าง Connection Engine
engine = sqlalchemy.create_engine(
    "mysql+pymysql://{user}:{password}@{host}:{port}/{db}".format(
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        host=Config.MYSQL_HOST,
        port=Config.MYSQL_PORT,
        db=Config.MYSQL_DB,
    )
)

# 4. สำรวจ Schema ด้วย Context Manager (จะปิด cursor ให้อัตโนมัติ)
with engine.connect() as connection:
    tables = connection.execute(sqlalchemy.text("show tables;")).fetchall()
    desc_tx = connection.execute(sqlalchemy.text("describe transaction")).fetchall()
    print("Tables:", tables)

# 5. Query ข้อมูลเข้าสู่ Pandas DataFrame (วิธีที่สะดวกที่สุด: pd.read_sql)
product = pd.read_sql("SELECT * FROM r2de3.product", engine).set_index("ProductNo")
customer = pd.read_sql("SELECT * FROM r2de3.customer", engine)
transaction = pd.read_sql("SELECT * FROM r2de3.transaction", engine)

# 6. Merge ตารางทั้ง 3 เข้าด้วยกัน
merged_transaction = transaction.merge(
    product, how="left", left_on="ProductNo", right_on="ProductNo"
).merge(
    customer, how="left", left_on="CustomerNo", right_on="CustomerNo"
)
```

##### Step 2: ดึงข้อมูลค่าเงินจาก REST API ด้วย Requests
```python
import requests

url = "https://r2de3-currency-api-vmftiryt6q-as.a.run.app/gbp_thb"
response = requests.get(url)
result_conversion_rate = response.json()

# แปลงเป็น DataFrame และปรับประเภท Date
conversion_rate = pd.DataFrame(result_conversion_rate).drop(columns=['id'])
conversion_rate['date'] = pd.to_datetime(conversion_rate['date'])
```

##### Step 3: ผสานข้อมูล (Join & Calculate)
```python
# รวมข้อมูลธุรกรรมเข้ากับอัตราแลกเปลี่ยนตามวัน
final_df = merged_transaction.merge(
    conversion_rate, how="left", left_on="Date", right_on="date"
)

# คำนวณยอดขายรวมหน่วยปอนด์ (total_amount) และแปลงเป็นเงินบาท (thb_amount)
final_df["total_amount"] = final_df["Price"] * final_df["Quantity"]
final_df["thb_amount"] = final_df["total_amount"] * final_df["gbp_thb"]

# ทางเลือกเสริม: คำนวณด้วย .apply() และ lambda function
# final_df["thb_amount"] = final_df.apply(lambda row: row["total_amount"] * row["gbp_thb"], axis=1)

# ทำความสะอาดคอลัมน์และเปลี่ยนชื่อเป็นรูปแบบมาตรฐาน (Lowercase + _id)
final_df = final_df.drop(["date", "gbp_thb"], axis=1)
final_df.columns = [
    'transaction_id', 'date', 'product_id', 'price', 'quantity', 'customer_id',
    'product_name', 'customer_country', 'customer_name', 'total_amount', 'thb_amount'
]
```

##### Step 4: ส่งออกไฟล์ผลลัพธ์ (Output Data)
```python
# 1. ส่งออกเป็น Parquet (แนะนำสำหรับ Data Pipeline ไม่เก็บ index เพื่อลดขนาด)
final_df.to_parquet("output.parquet", index=False)

# 2. ส่งออกเป็น CSV สำหรับการตรวจสอบเบื้องต้น
final_df.to_csv("output.csv", index=False)

# 3. ตรวจสอบความถูกต้องของไฟล์ Parquet ที่สร้างขึ้น
check_parquet = pd.read_parquet("output.parquet")
print("Data rows:", len(check_parquet))
```

---

#### 2.6.3 ส่วนขยายเชิงลึก (Workshop 1 Bonuses)

##### Bonus 1: Benchmark ประสิทธิภาพ Pandas vs Polars
Polars เขียนด้วยภาษา Rust และทำงานแบบ Multithreaded ช่วยให้การ Join และ Export ข้อมูลเร็วกว่า Pandas อย่างมีนัยสำคัญ:
```python
import polars as pl

# แปลงจาก Pandas DataFrame เป็น Polars DataFrame
customer_pl = pl.from_pandas(customer)
product_pl = pl.from_pandas(product, include_index=True)
transaction_pl = pl.from_pandas(transaction)
conversion_rate_pl = pl.from_pandas(conversion_rate)

# ทำงานแบบ Join และ Write Parquet ด้วย Polars
joined_pl = transaction_pl.join(
    product_pl, on="ProductNo", how="left"
).join(
    customer_pl, on="CustomerNo", how="left"
).join(
    conversion_rate_pl, left_on="Date", right_on="date", how="left"
)

joined_pl.write_parquet("test_polars.parquet")
```

##### Bonus 2: Query ไฟล์ Parquet ในเครื่องด้วย DuckDB (In-Process OLAP)
ไม่ต้องสร้าง Database Server ให้ยุ่งยาก สามารถใช้ DuckDB รัน SQL บนไฟล์ Parquet ได้ทันที:
```python
import duckdb

# รัน SQL ตรงไปยังไฟล์ Parquet ใน Local
duckdb.sql('SELECT * FROM "output.parquet" LIMIT 5')
duckdb.sql('SELECT customer_country, SUM(thb_amount) AS revenue FROM "output.parquet" GROUP BY 1 ORDER BY 2 DESC')
```

##### Bonus 3: Production Secret Management ด้วย `.env` และ `python-dotenv`
ในกรณีทำงานบน Local หรือ Server ที่ไม่ใช่ Colab:
```python
# ติดตั้งไลบรารี
!pip install python-dotenv

# สร้างไฟล์ .env (อย่าลืมใส่ .env ใน .gitignore เด็ดขาด)
# HOST=34.136.184.58
# PORT=3306
# PASSWORD=xxxx

import os
from dotenv import load_dotenv

load_dotenv()  # โหลดตัวแปรจาก .env เข้า environment variables

# ข้อควรระวัง: os.getenv จะคืนค่าเป็น string เสมอ หากเป็นตัวเลขต้อง cast เช่น int()
db_host = os.getenv("HOST")
db_port = int(os.getenv("PORT", 3306))
```

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
