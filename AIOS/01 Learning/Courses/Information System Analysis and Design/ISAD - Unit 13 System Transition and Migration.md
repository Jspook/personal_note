# ISAD - Unit 13: System Transition & Migration

> **วิชา:** 06066304 Information System Analysis and Design | **สถาบัน:** KMITL (King Mongkut's Institute of Technology Ladkrabang)
> **อาจารย์:** Asst. Prof. Manop Phankokkruad, Ph.D.
> **Source:** `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT13-SystemTransition-Migration.pdf` (34 slides)

---

## Part 1: Macro Architecture & Overview

**Unit 13** เป็นบทสุดท้ายของ **Implementation Phase** ต่อจาก Unit 12 (Development, Testing & Documentation) โดยเน้นกระบวนการ **เปลี่ยนผ่านระบบ (System Transition)** จาก As-Is System ไปยัง To-Be System อย่างปลอดภัยและมีแผนรองรับ ความท้าทายหลักไม่ใช่แค่ด้านเทคนิค แต่ยังรวมถึงด้านธุรกิจและด้านคน (People Issues) ซึ่ง Kurt Lewin อธิบายว่าการเปลี่ยนแปลงองค์กรต้องผ่าน 3 ขั้นตอน: **Unfreeze → Move → Refreeze**

### ภาพรวม Implementation Phase (Unit 12 + Unit 13)

```text
Implementation Phase
├── Unit 12: Development Phase
│   ├── Managing Programming      → Completed Program
│   ├── Testing & Test Planning   → Testing Plan
│   └── Developing Documentation  → System Doc + User Documentation
│
└── Unit 13: Transition & Migration Phase
    ├── Migration Plan            → Migration Plan Document
    ├── Change Management         → Change Management Plan + Change Request
    └── Post-Implementation       → Support Plan + Training Plan + Problem Report
```

### Kurt Lewin's Change Model — กระบวนการเปลี่ยนแปลงองค์กร

```text
As-is System                                To-be System
    │                                              │
    ▼                                              ▼
[Unfreeze]  →→→→→  [Move / Transition]  →→→→→  [Refreeze]
    │                      │                       │
Analysis &            Migration Plan:          Support &
  Design              - Technical Conversion   Maintenance
                       - Change Management
```

### ตารางเปรียบเทียบ 3 ระยะของ Transition

| ระยะ | กิจกรรมหลัก | ผลลัพธ์ |
| :--- | :--- | :--- |
| **Unfreeze** | วิเคราะห์ระบบเก่า ออกแบบระบบใหม่ | Requirements + Design |
| **Move** | ติดตั้งระบบ ฝึกอบรม จัดการการเปลี่ยนแปลง | ระบบใหม่ทำงานได้ |
| **Refreeze** | สนับสนุน บำรุงรักษา ประเมินผลหลังติดตั้ง | ระบบกลายเป็น นิสัยใหม่ ขององค์กร |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Migration Plan (แผนการย้ายระบบ)

> **Migration Plan** คือแผนงานที่ระบุว่า จะต้องทำกิจกรรมอะไร เมื่อไหร่ และใครเป็นผู้รับผิดชอบ ในช่วงการเปลี่ยนผ่านจากระบบเก่าไปสู่ระบบใหม่

Migration Plan มี 3 ส่วนหลัก (3 Preparing):

```text
Migration Plan
├── 1. Preparing the Business   (เตรียมองค์กร)
│   ├── 1.1 Select Conversion Strategy
│   └── 1.2 Prepare Business Contingency Plan
├── 2. Preparing the Technology (เตรียมเทคโนโลยี)
│   ├── 2.1 Install Hardware
│   ├── 2.2 Install Software
│   └── 2.3 Convert Data
└── 3. Preparing the People     (เตรียมคน)
    ├── 3.1 Revise Management Policies
    ├── 3.2 Assess Costs and Benefits
    ├── 3.3 Motivate Adoption
    └── 3.4 Conduct Training
```

---

### 2.2 Preparing the Business — 1.1 Conversion Strategy

> **Conversion Strategy** (กลยุทธ์การแปลงระบบ) คือกระบวนการนำระบบใหม่เข้ามาใช้ในองค์กร

มี 3 มิติที่ต้องพิจารณา:

| มิติ | คำอธิบาย | ตัวอย่าง |
| :--- | :--- | :--- |
| **Conversion Style** | เปลี่ยนแบบทันทีหรือค่อยๆ เปลี่ยน | Direct, Parallel, Phased, Pilot |
| **Conversion Locations** | เปลี่ยนพร้อมกันทั้งองค์กรหรือทีละที่ | สาขาหนึ่งก่อน แล้วค่อยขยาย |
| **Conversion Modules** | เปลี่ยนทั้งระบบหรือทีละ Module | เริ่ม Module ใบเสร็จก่อน แล้วจึงเพิ่ม Inventory |

#### 4 Conversion Styles (สไตล์การแปลงระบบ)

| Conversion Style | วิธีการ | Risk | Cost | Time |
| :--- | :--- | :---: | :---: | :---: |
| **Direct Cutover** | ปิดระบบเก่า-เปิดระบบใหม่ทันที | 🔴 สูง | 🟢 ต่ำ | 🟢 สั้น |
| **Parallel** | รันทั้ง 2 ระบบพร้อมกันช่วงหนึ่ง | 🟢 ต่ำ | 🔴 สูง | 🔴 ยาว |
| **Phased/Gradual** | ทยอยเปลี่ยนทีละส่วน | 🟡 กลาง | 🟡 กลาง | 🟡 กลาง |
| **Pilot** | ทดสอบในกลุ่มเล็กก่อนขยาย | 🟡 กลาง | 🟡 กลาง | 🟡 กลาง |

**3 ปัจจัยหลักในการเลือก Conversion Strategy:**
- **Risk** — ความเสี่ยงที่ระบบใหม่จะมีปัญหากระทบการดำเนินธุรกิจ
- **Cost** — ค่าใช้จ่ายที่แตกต่างกันในแต่ละ Strategy
- **Time** — เวลาที่ต้องใช้ในการแปลงระหว่างระบบเก่าและใหม่

---

### 2.3 Preparing the Business — 1.2 Business Contingency Plan

> **Business Contingency Plan** (แผนฉุกเฉินทางธุรกิจ) คือแผนการดำเนินงานที่องค์กรจะนำมาใช้หากเกิดเหตุการณ์ไม่คาดฝัน เช่น ไฟไหม้ น้ำท่วม Data Breach หรือเครือข่ายล้มเหลว

**จุดประสงค์:**
- ช่วยให้ธุรกิจรับมือกับปัญหาเล็กๆ ของระบบใหม่ได้ โดยไม่กระทบการดำเนินงานหลัก
- การเลือก **Parallel Conversion** เป็นหนึ่งแนวทางของ Contingency Planning (เพราะยังมีระบบเก่ารองรับ)
- สำคัญมากที่ต้องให้ผู้บริหารธุรกิจและผู้ใช้หลักมีส่วนร่วมในการวางแผน

---

### 2.4 Preparing the Technology

มี 3 ขั้นตอนหลัก:

#### 2.4.1 Install Hardware
- ซื้อและติดตั้ง Hardware ที่จำเป็นสำหรับระบบใหม่
- ตรวจสอบ capacity ให้รองรับ workload ที่คาดการณ์ไว้

#### 2.4.2 Install Software
- ติดตั้งระบบใหม่ที่พัฒนาขึ้น
- รวมถึง Software เสริม (Dependencies, Libraries, Middleware) ที่ต้องใช้เพื่อให้ระบบทำงานได้

#### 2.4.3 Convert Data (ขั้นตอนที่ซับซ้อนที่สุดทางเทคนิค)

> **Data Conversion** คือการแปลงข้อมูลจากระบบเก่าให้อยู่ในรูปแบบที่ระบบใหม่รับได้ — ซึ่งมักเป็นขั้นตอนที่ซับซ้อนที่สุดใน Migration Plan

**ความท้าทายของ Data Conversion:**
- Schema ต่างกัน (Format, Data Type, Field Names)
- Data Quality — ข้อมูลเก่าอาจมี Inconsistency, Duplicates, Missing Values
- Volume — ข้อมูลปริมาณมากต้องใช้เวลาแปลงนาน
- Zero Downtime Requirement — บางธุรกิจต้องการ migrate โดยไม่หยุดระบบ

| ปัญหา Data Conversion | วิธีแก้ทั่วไป |
| :--- | :--- |
| Schema ต่างกัน | ETL Script (Extract-Transform-Load) |
| ข้อมูล dirty/inconsistent | Data Cleansing ก่อน Migration |
| Volume สูง | Batch Migration + Incremental Sync |

---

### 2.5 Preparing the People — Change Management

> **Change Management** (การบริหารการเปลี่ยนแปลง) คือกระบวนการช่วยเหลือผู้ใช้ให้ปรับตัวกับระบบใหม่และกระบวนการทำงานใหม่โดยไม่เกิดความเครียดเกินไป

**3 บทบาทหลักในการเปลี่ยนแปลงองค์กร:**

| บทบาท | ความหมาย | ตัวอย่าง |
| :--- | :--- | :--- |
| **Sponsor** | ผู้ที่ต้องการให้เกิดการเปลี่ยนแปลง — ผู้ริเริ่มขอระบบใหม่ | CEO, CTO, ผู้บริหารระดับสูง |
| **Change Agent** | ผู้นำกระบวนการเปลี่ยนแปลง | Project Manager, Systems Analyst |
| **Potential Adopters** | กลุ่มคนที่ต้องเปลี่ยนพฤติกรรม | End Users, Staff |

#### ทำไมคนถึงต้านการเปลี่ยนแปลง?

ทุกการเปลี่ยนแปลงมีทั้ง **ต้นทุน (Costs)** และ **ประโยชน์ (Benefits)** — ถ้า Benefits > Costs คนจะยอมรับการเปลี่ยน แต่สิ่งที่ดีต่อองค์กร อาจไม่ดีต่อพนักงานรายบุคคลเสมอไป (เช่น ลด Headcount หรือต้องเรียนรู้ทักษะใหม่)

**ประเภทของ Potential Adopters:**
- **Ready Adopters** — ยินดีเปลี่ยน กระตือรือร้น
- **Reluctant Adopters** — ลังเล แต่พร้อมเปลี่ยนถ้ามีเหตุผลที่ชัดเจน
- **Resistant Adopters** — ต้านการเปลี่ยนแปลง ต้องใช้กลยุทธ์พิเศษ

---

### 2.6 Preparing the People — 4 ขั้นตอนของ Change Management

#### 3.1 Revising Management Policies (ปรับนโยบายการบริหาร)

> Management Policies กำหนดเป้าหมาย วิธีทำงาน และรางวัลของสมาชิกองค์กร — ไม่มีนโยบายรองรับ ระบบใหม่จะไม่มีวันถูก adopt สำเร็จ

**3 เครื่องมือหลักในการปรับกระบวนการทำงาน:**
1. **Standard Operating Procedures (SOPs)** — ขั้นตอนการทำงานมาตรฐานใหม่
2. **Measurements and Rewards** — ตัวชี้วัด KPI และรางวัลที่สนับสนุนพฤติกรรมใหม่
3. **Resource Allocation** — จัดสรรทรัพยากร (งบ, เวลา, คน) ให้เพียงพอ

#### 3.2 Assessing Costs and Benefits (ประเมินต้นทุนและประโยชน์)

**วิธีการ:** สร้าง 2 รายการเปรียบเทียบ:
1. **มุมมององค์กร** — ROI รวม ประสิทธิภาพ ความสามารถในการแข่งขัน
2. **มุมมองของ Potential Adopters** — งานยากขึ้นหรือง่ายขึ้น? เสี่ยงตกงานไหม? ต้องเรียนรู้อะไรเพิ่ม?

#### 3.3 Motivating Adoption (จูงใจให้ยอมรับการเปลี่ยนแปลง)

> ปัจจัยสำคัญที่สุดในการ motivate การเปลี่ยนแปลง คือการมีหลักฐานที่ชัดเจนและน่าเชื่อถือว่า การเปลี่ยนแปลงนั้นจำเป็น

**2 กลยุทธ์หลัก:**

| กลยุทธ์ | วิธีการ | เหมาะกับใคร |
| :--- | :--- | :--- |
| **Informational Strategy** | โน้มน้าวด้วยข้อมูล หลักฐาน ประโยชน์ที่จะได้รับ | Ready + Reluctant Adopters |
| **Political Strategy** | ใช้อำนาจองค์กร นโยบาย หรือแรงกดดันจากผู้บริหาร | Resistant Adopters |

#### 3.4 Conduct Training (ฝึกอบรม)

> Training เป็นส่วนที่ชัดเจนที่สุดของ Change Management — ระบบใหม่ต้องการทักษะใหม่เสมอ

**3 วิธีได้มาซึ่งทักษะใหม่:**
1. **Hiring New Employees** — จ้างพนักงานที่มีทักษะพร้อมแล้ว
2. **Outsourcing** — ว่าจ้างภายนอก
3. **Training Existing Staff** — ฝึกพนักงานปัจจุบัน (ทางเลือกที่นิยมที่สุด)

**หลักการออกแบบ Training:**
- Training ต้องเน้นที่ **งานที่ผู้ใช้ต้องทำ** ไม่ใช่ฟีเจอร์ของระบบ
- ต้องครอบคลุมทั้ง **กระบวนการทำงานโดยรอบระบบ** และ **ตัวระบบเอง**
- ใช้ **Use Cases และ Use Scenarios** เป็นแนวทางออกแบบเนื้อหา Training

**วิธีการ Deliver Training:**

| วิธี | ข้อดี | เหมาะกับ |
| :--- | :--- | :--- |
| **Classroom Training** | Interactive, Q&A ได้ทันที | กลุ่มใหญ่, เนื้อหาซับซ้อน |
| **One-on-One Training** | เฉพาะเจาะจง, ตรงความต้องการ | ผู้ใช้สำคัญ, Manager |
| **Computer-Based Training (CBT)** | ยืดหยุ่น, Self-paced, ถูก | ผู้ใช้กระจาย, เนื้อหาพื้นฐาน |

---

### 2.7 Post-Implementation Activities (กิจกรรมหลังการติดตั้งระบบ)

> เป้าหมายของ Post-Implementation Activities คือการทำให้ระบบใหม่กลายเป็นวิธีการทำงานปกติขององค์กร (Institutionalize)

**3 กิจกรรมหลัก:**

```text
Post-Implementation Activities
├── 1. System Support       (สนับสนุนผู้ใช้)
├── 2. System Maintenance   (บำรุงรักษาระบบ)
└── 3. Project Assessment   (ประเมินผลโครงการ)
    ├── A. Project Team Review
    └── B. System Review
```

---

### 2.8 System Support (การสนับสนุนระบบ)

> **System Support** คือการช่วยเหลือผู้ใช้ให้ใช้งานระบบได้ — เปรียบได้กับ "On-Demand Training"

หลังระบบติดตั้งแล้ว จะมีการโอนระบบอย่างเป็นทางการให้ **Operations Group** ดูแล

**ช่องทาง Support:**
- **Online Support** — รูปแบบที่พบบ่อยที่สุด (FAQ, Knowledge Base, Chatbot)
- **Help Desk** — ให้ผู้ใช้พูดคุยกับผู้เชี่ยวชาญที่ตอบคำถามได้

**Help Desk Escalation Model:**

```text
User Problem
     │
     ▼
Level 1 Support (80% ของปัญหาควรแก้ได้ที่นี่)
     │
     │── แก้ได้ → Close Issue
     │
     └── แก้ไม่ได้ → Problem Report → Level 2 Support → System Maintenance
```

**องค์ประกอบของ Problem Report:**

| ฟิลด์ | รายละเอียด |
| :--- | :--- |
| Time & Date of Report | วันเวลาที่รายงาน |
| Reporter Info | ชื่อ อีเมล โทรศัพท์ผู้แจ้ง |
| Support Person Info | ชื่อ อีเมล โทรศัพท์ผู้รับเรื่อง |
| Software/Hardware | Software/Hardware ที่ก่อให้เกิดปัญหา |
| Location | ตำแหน่งที่พบปัญหา |
| Description | คำอธิบายปัญหา |
| Action Taken | สิ่งที่ดำเนินการแล้ว |
| Disposition | ผลลัพธ์ (แก้แล้ว / ส่งต่อ Maintenance) |

---

### 2.9 System Maintenance (การบำรุงรักษาระบบ)

> **System Maintenance** คือกระบวนการตรวจสอบ อัปเดต เฝ้าติดตาม และซ่อมบำรุงระบบคอมพิวเตอร์ เพื่อให้มีความปลอดภัย เชื่อถือได้ และมีประสิทธิภาพต่อเนื่อง

**4 ประเภทของ System Maintenance:**

| ประเภท | จุดประสงค์ | ตัวอย่าง Real-World |
| :--- | :--- | :--- |
| **Preventive Maintenance** | ป้องกันปัญหาก่อนเกิด — ค้นหาและแก้ไข latent faults | ติดตั้ง security patches, clean legacy code, defrag disk |
| **Corrective Maintenance** | แก้ bugs, errors, defects ที่ผู้ใช้พบหลังระบบ go-live | แก้ checkout page crash เมื่อใส่ discount code |
| **Adaptive Maintenance** | ปรับระบบให้รองรับ software/hardware/legal ที่เปลี่ยนไป | อัปเดต app รองรับ iOS ใหม่, ปรับระบบเงินเดือนตามกฎหมายภาษีใหม่ |
| **Perfective Maintenance** | ปรับปรุง performance, UI, หรือเพิ่มฟีเจอร์ที่ขอ | Optimize DB ให้โหลดเร็วขึ้น 50%, เพิ่ม Dark Mode |

#### Change Request (คำร้องขอเปลี่ยนแปลง)

> **Change Request** คือข้อเสนออย่างเป็นทางการเพื่อแก้ไขส่วนใดส่วนหนึ่งของระบบ

**5 แหล่งที่มาของ Change Requests:**
1. **Problem Reports** จาก Operations Group (ที่มาที่พบบ่อยที่สุด)
2. **User Enhancements** — คำขอฟีเจอร์ใหม่จากผู้ใช้
3. **Other System Projects** — ระบบอื่นๆ ที่เชื่อมต่อกัน
4. **Infrastructure Changes** — Software/Network ที่เปลี่ยนแปลง
5. **Senior Management Requests** — นโยบายจากผู้บริหารระดับสูง

**กระบวนการ Processing a Change Request:**

```text
Change Request
      │
      ▼
   Evaluate
      │
      ├── Rejected ──────────────────────────────► Notify Requester
      │
      └── Approved
              │
              ▼
           Prioritize
              │
              ▼
           Schedule
              │
              ▼
           Implement (Code, Test, Document)
              │
              ▼
           Deploy to Production
              │
              ▼
           Close + Update Problem Report
```

---

### 2.10 Project Assessment (การประเมินผลโครงการ)

> **Project Assessment** คือกลไกประเมินโครงการตลอด Lifecycle ตั้งแต่เริ่มต้นถึงสิ้นสุด — เพื่อเข้าใจว่าอะไรสำเร็จ อะไรต้องปรับปรุง

**ความสำคัญ:**
- เป็นส่วนประกอบสำคัญของ **Organizational Learning**
- สำคัญเป็นพิเศษสำหรับ Junior Staff ที่กำลังสร้างประสบการณ์
- ช่วยให้องค์กรพัฒนาขีดความสามารถในโครงการต่อๆ ไป

**2 ส่วนของ Project Assessment:**

#### A. Project Team Review

> **Project Team Review** (Post-Project Review) คือการประเมินเชิงโครงสร้างว่าทีมทำงานร่วมกัน ปฏิบัติงาน และดำเนินโครงการอย่างไร

**กระบวนการ:**
- สมาชิกแต่ละคนเขียนเอกสารสั้นรายงานและวิเคราะห์ผลงานของตนเอง
- เน้นที่ **การปรับปรุง ไม่ใช่การลงโทษ**
- Project Manager สรุปเอกสารและแจกเวียนให้องค์กรเรียนรู้

#### B. System Review

> **System Review** คือการประเมินอย่างเป็นทางการถึงสถาปัตยกรรม Infrastructure และสุขภาพทางเทคนิคของระบบโดยรวม

**เป้าหมาย:**
- ประเมินว่าต้นทุนและประโยชน์ที่คาดหวังไว้ เกิดขึ้นจริงหรือไม่หลังติดตั้ง
- ช่วยให้องค์กรพัฒนาขีดความสามารถในการบริหารโครงการในอนาคต

| การประเมิน | เน้นที่ | ผู้รับผิดชอบ |
| :--- | :--- | :--- |
| **Project Team Review** | กระบวนการทำงานของทีม, การ collaborate | Project Manager + ทีม |
| **System Review** | ความสำเร็จของระบบ, ROI จริงเทียบกับที่คาด | Management + Analyst |

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ
* [ ] **Kurt Lewin's 3 Steps:** Unfreeze → Move → Refreeze — กระบวนการเปลี่ยนแปลงองค์กร
* [ ] **Migration Plan มี 3 ส่วน:** Preparing Business / Technology / People
* [ ] **Conversion Strategy 3 มิติ:** Style (ทันที/ค่อยๆ) + Location (ที่ไหน) + Module (เท่าไหร่)
* [ ] **Conversion Styles 4 แบบ:** Direct, Parallel, Phased, Pilot — เปรียบ Risk/Cost/Time
* [ ] **Data Conversion** = ขั้นตอนที่ซับซ้อนที่สุดใน Preparing Technology
* [ ] **3 Key Roles:** Sponsor (ต้องการ), Change Agent (นำ), Potential Adopters (ต้องเปลี่ยน)
* [ ] **4 ขั้นตอน Change Management:** Revise Policy → Assess Cost/Benefit → Motivate → Train
* [ ] **Motivation 2 กลยุทธ์:** Informational (โน้มน้าว) vs Political (ใช้อำนาจ)
* [ ] **3 วิธีได้ทักษะใหม่:** Hiring / Outsourcing / Training
* [ ] **Training Principle:** เน้นงานที่ผู้ใช้ต้องทำ ไม่ใช่ฟีเจอร์ระบบ
* [ ] **Help Desk:** Level 1 แก้ 80%, ที่เหลือ → Problem Report → Level 2
* [ ] **4 ประเภท Maintenance:** Preventive / Corrective / Adaptive / Perfective
* [ ] **5 แหล่ง Change Request:** Operations Problem Reports (ที่พบบ่อยสุด), User, Other Systems, Infrastructure, Management
* [ ] **Project Assessment:** Project Team Review (ทีม) + System Review (ระบบ)

### สรุปตาราง Conversion Strategy

| Strategy | วิธี | Risk | Cost | Time | Use When |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Direct Cutover** | ปิดเก่า-เปิดใหม่ทันที | 🔴 H | 🟢 L | 🟢 Short | ระบบเล็ก, ไม่ซับซ้อน |
| **Parallel** | รัน 2 ระบบพร้อมกัน | 🟢 L | 🔴 H | 🔴 Long | Critical Systems, ไม่ยอมรับ Downtime |
| **Phased** | เปลี่ยนทีละส่วน | 🟡 M | 🟡 M | 🟡 Medium | ระบบขนาดใหญ่, หลาย Module |
| **Pilot** | ทดสอบกลุ่มเล็กก่อน | 🟡 M | 🟡 M | 🟡 Medium | ต้องการ feedback ก่อนขยาย |

### สรุปตาราง 4 ประเภท System Maintenance

| ประเภท | ทำเมื่อ | จุดประสงค์ |
| :--- | :--- | :--- |
| **Preventive** | Proactive — ก่อนเกิดปัญหา | ป้องกัน Latent Faults |
| **Corrective** | Reactive — หลัง Bug พบ | แก้ไข Bug/Error ที่พบหลัง Go-Live |
| **Adaptive** | เมื่อ Environment เปลี่ยน | ปรับรองรับ OS, Law, Platform ใหม่ |
| **Perfective** | เมื่อต้องการปรับปรุง | เพิ่ม Performance, UI, Features |

### Concept Map — Unit 13

```text
System Transition & Migration (Unit 13)
├── Transition Model (Kurt Lewin)
│   ├── Unfreeze (Analysis & Design)
│   ├── Move (Migration Plan)
│   └── Refreeze (Support & Maintenance)
│
├── Migration Plan
│   ├── 1. Preparing Business
│   │   ├── Conversion Strategy (Direct/Parallel/Phased/Pilot)
│   │   └── Business Contingency Plan
│   ├── 2. Preparing Technology
│   │   ├── Install Hardware
│   │   ├── Install Software
│   │   └── Convert Data ← ซับซ้อนที่สุด
│   └── 3. Preparing People (Change Management)
│       ├── Revise Management Policies
│       ├── Assess Costs & Benefits
│       ├── Motivate Adoption (Informational / Political)
│       └── Conduct Training (Classroom / 1-on-1 / CBT)
│
└── Post-Implementation Activities
    ├── System Support
    │   ├── Online Support
    │   └── Help Desk (L1 → L2 Escalation)
    ├── System Maintenance
    │   ├── Preventive / Corrective / Adaptive / Perfective
    │   └── Change Request (5 Sources)
    └── Project Assessment
        ├── Project Team Review (เน้นทีม)
        └── System Review (เน้น ROI ระบบ)
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **Parallel ≠ Safe ในทุกกรณี:** Parallel Conversion ลด Risk แต่ Cost สูงมาก และต้องรักษาข้อมูลสองระบบให้ Sync — ไม่เหมาะถ้า Resources จำกัด
* **Data Conversion ≠ แค่ Copy ข้อมูล:** ต้องมีการทำ Schema Mapping, Data Cleansing, Validation และ Testing ก่อนใช้งานจริง — เป็นขั้นตอนที่ซับซ้อนที่สุดใน Migration Plan
* **Training ≠ สอนใช้งานระบบ:** หลักการของ ISAD คือ Training ต้องเน้นที่ "งานที่ผู้ใช้ต้องทำ" (Job-Centric) ไม่ใช่ "ฟีเจอร์ที่ระบบมี" (System-Centric)
* **Corrective vs Adaptive ต่างกัน:** Corrective = แก้ Bug ที่มีอยู่แล้ว; Adaptive = ปรับระบบให้รองรับสิ่งแวดล้อมที่เปลี่ยนไป (เช่น OS ใหม่, กฎหมายใหม่)
* **Project Team Review ≠ ลงโทษ:** เป็นกระบวนการเรียนรู้ขององค์กร เน้น Improvement ไม่ใช่ Blame
* **Help Desk Level 1 เป้าหมาย 80%:** ถ้า Level 1 ไม่สามารถแก้ได้ ต้องทำ Problem Report ส่งต่อ Level 2 — ไม่ใช่ส่งตรงไปยัง Developer

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[ISAD - Unit 12 System Development, Testing and Documentation]] (บท System Development ก่อนหน้า — Implementation Phase ส่วนแรก ที่ Unit 13 ต่อยอดจาก)
  * [[ISAD - Unit 11 Storage Design]] (Storage Design ที่เป็นพื้นฐานของ Data Conversion ใน Migration Plan)
  * [[ISAD - Unit 10 Software Design]] (Software Design ที่ถูกนำไปพัฒนาและทดสอบก่อนเข้า Unit 12-13)
  * [[ISAD - Unit 07 Design Strategies]] (Design Strategies ที่กำหนดทิศทางการออกแบบที่ Unit 13 นำไปติดตั้ง)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT13-SystemTransition-Migration.pdf` (34 slides, KMITL)
