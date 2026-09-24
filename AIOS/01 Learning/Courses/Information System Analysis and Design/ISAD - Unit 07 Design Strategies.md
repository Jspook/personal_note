# ISAD - Unit 07: Design Strategies

> **วิชา:** 06066304 Information System Analysis and Design | **สถาบัน:** KMITL (King Mongkut's Institute of Technology Ladkrabang)
> **อาจารย์:** Asst. Prof. Manop Phankokkruad, Ph.D.
> **Source:** `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT07-design-strategies-v1.pdf` (33 slides)

---

## Part 1: Macro Architecture & Overview

Unit 07 ครอบคลุมการเปลี่ยนผ่านจาก **Analysis Phase** ไปสู่ **Design Phase** ในวงจรการพัฒนาระบบ (SDLC) โดยเน้นที่การเลือกกลยุทธ์การจัดหาระบบ (**System Acquisition Strategy**) ซึ่งเป็นจุดตัดสินใจสำคัญว่าองค์กรจะสร้างระบบเองภายใน ซื้อซอฟต์แวร์สำเร็จรูป หรือจ้างภายนอก แต่ละแนวทางมีข้อดีข้อเสียและปัจจัยที่ควรพิจารณาแตกต่างกัน

```text
SDLC Overview
─────────────────────────────────────────────────────
  1. Planning
       │
  2. Analysis  ──► System Proposal (Deliverable)
       │
  3. Design    ──► System Specification (Deliverable)
       │    ├── Architecture Design
       │    ├── UI Design
       │    └── Program Design
       │
  4. Implementation
─────────────────────────────────────────────────────

Design Phase Input/Output:
  Requirements (จาก Analysis)
       │
       ▼
  Design Phase
       │
       ▼
  System Specification
    ├── A. Recommended System Acquisition Strategy  ← Unit 07
    ├── B. Architecture Design
    ├── C. Hardware and Software Specification
    ├── D. Interface Design
    ├── E. Physical Process Model
    ├── F. Program Design Specifications
    ├── G. Physical Data Model
    └── H. Data Storage Design
```

### ตารางเปรียบเทียบ System Acquisition Strategy ทั้ง 3 แบบ

| ประเด็น | Custom Development | Packaged Software | Outsourcing |
| :--- | :--- | :--- | :--- |
| **ความหมาย** | พัฒนาระบบขึ้นเองตั้งแต่ต้น | ซื้อซอฟต์แวร์สำเร็จรูป | จ้างบุคคลภายนอกสร้างหรือดูแล |
| **ความยืดหยุ่น** | สูงมาก | ต่ำ (ตามที่ vendor กำหนด) | ปานกลาง |
| **ความเสี่ยง** | สูง | ต่ำ | ปานกลาง–สูง |
| **ค่าใช้จ่าย** | สูง | ปานกลาง | ต่ำในช่วงแรก |
| **ระยะเวลา** | นาน | สั้น | ขึ้นกับ vendor |
| **เหมาะกับ** | ความต้องการเฉพาะ/กลยุทธ์หลัก | ความต้องการทั่วไป | งานที่ไม่ใช่กลยุทธ์หลัก |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Transition from Requirements to Design

#### Design Phase คืออะไร

> Design Phase คือขั้นตอนที่ตัดสินใจว่า **ระบบใหม่จะทำงานอย่างไร** — เป็น "สะพาน" เชื่อม Requirements สู่ Solution จริง

- **Analysis Phase** → ตอบคำถาม **"What"** (ธุรกิจต้องการอะไร)
- **Design Phase** → ตอบคำถาม **"How"** (จะสร้างระบบนั้นอย่างไร)

#### กระบวนการเปลี่ยนผ่าน

1. **System Proposal** (Output จาก Analysis) → นำเสนอต่อ Approval Committee ผ่าน System Walk-through
2. ช่วงต้นของ Design Phase → แปลง **Business Requirements** เป็น **System Requirements** (รายละเอียดเชิงเทคนิค)
3. System Requirements ถูกสื่อสารผ่าน Design Documents, Physical Process Models, และ Data Models
4. **System Specification** (Output หลักของ Design Phase) → ส่งต่อให้ทีม Programming เพื่อ Implementation

> ⚠️ ช่วงปลาย Design Phase จะมีการทบทวน Feasibility Analysis และ Project Plan อีกครั้ง ก่อนที่ Project Sponsor จะตัดสินใจว่าจะ "ดำเนินการต่อ" หรือ "ยุติโครงการ"

---

### 2.2 System Acquisition Strategies — 3 กลยุทธ์หลัก

#### กลยุทธ์ที่ 1: Custom Development

**Custom Development** คือการสร้างระบบใหม่ตั้งแต่เริ่มต้นโดยทีมภายในองค์กร

**ข้อดี (Pros):**
- มีความยืดหยุ่นและสร้างสรรค์ในการแก้ปัญหาทางธุรกิจได้อย่างเต็มที่
- สามารถนำเทคโนโลยีล่าสุดมาใช้เพื่อสนับสนุนกลยุทธ์ขององค์กรได้
- สร้างทักษะเชิงเทคนิคและความรู้เชิงธุรกิจสะสมไว้ภายในองค์กร

**ข้อเสีย (Cons):**
- ต้องใช้ความพยายามและเวลาสูงมาก
- ต้องการบุคลากร IS ที่มีทักษะหลากหลายและสูง ซึ่งหาและรักษาไว้ยาก
- ความเสี่ยงในการพัฒนาระบบจากศูนย์นั้นสูงมาก

---

#### กลยุทธ์ที่ 2: Packaged Software

**Packaged Software** คือการซื้อซอฟต์แวร์สำเร็จรูปที่ถูกพัฒนามาสำหรับความต้องการทางธุรกิจทั่วไป

**ลักษณะสำคัญ:**
- มีตั้งแต่ขนาดเล็ก (เครื่องมือเฉพาะทาง) ไปจนถึงขนาดใหญ่อย่าง **ERP (Enterprise Resource Planning)**
- ติดตั้งและใช้งานได้รวดเร็วกว่า Custom Development มาก
- ได้รับการทดสอบแล้ว → ลดความเสี่ยงด้านคุณภาพ

**ข้อจำกัด:**
- องค์กรต้อง "ยอมรับ" ฟีเจอร์ที่มีให้เท่านั้น
- แก้ไขได้บางส่วนผ่าน **Customization** (ปรับ Parameters) หรือสร้าง **Workaround** (โปรแกรมเสริมที่เชื่อมต่อกับ Packaged Application)

**Systems Integration:**

> **Systems Integration** คือการสร้างระบบใหม่โดยการรวมกัน (Combine) ระหว่าง Packaged Software, ระบบเก่า (Legacy Systems), และซอฟต์แวร์ใหม่ที่เขียนขึ้นมาเพื่อเชื่อมต่อ

- ความท้าทายหลัก: การ integrate ข้อมูลจากระบบที่แตกต่างกัน

---

#### กลยุทธ์ที่ 3: Outsourcing

**Outsourcing** คือการจ้าง Vendor, Developer, หรือ Service Provider ภายนอกมาสร้างหรือดูแลระบบ

**รูปแบบ Outsourcing:**
- **ASP (Application Service Provider)** — ให้บริการซอฟต์แวร์และบริการผ่าน Internet
- **SaaS (Software as a Service)** — ต่อยอดจากโมเดล ASP

**ข้อดี:** ต้นทุนเริ่มต้นต่ำ, Setup เร็ว

**ความเสี่ยง (Risks):**
- ข้อมูลลับขององค์กรอาจถูกเปิดเผย (Compromising Confidential Information)
- เสียการควบคุมการพัฒนาในอนาคต (Losing Control over Future Development)
- สูญเสียทักษะภายในองค์กร (Losing In-house Skills)

> ⚠️ **"You should never outsource what you do not understand."**

**ประเภทสัญญา Outsourcing:**

| ประเภทสัญญา | ลักษณะ |
| :--- | :--- |
| **Time and Arrangements** | จ่ายตามเวลาและค่าใช้จ่ายจริงที่ใช้ไป |
| **Fixed-price Contract** | กำหนดราคาตายตัว ไม่ขึ้นกับทรัพยากรหรือเวลาที่ใช้ |
| **Value-added Contract** | Outsourcer รับส่วนแบ่งจากผลประโยชน์ที่ระบบสร้างขึ้น |

**แนวทาง Outsourcing ที่ดี (Outsourcing Guidelines):**
- รักษาการสื่อสารแบบเปิดตลอดเวลา
- กำหนดและ Stabilize Requirements **ก่อน** เซ็นสัญญา
- มองความสัมพันธ์เป็น Partnership
- คัดเลือก Vendor อย่างรอบคอบ
- มีผู้รับผิดชอบจัดการความสัมพันธ์กับ Outsourcer
- อย่า Outsource สิ่งที่ตัวเองไม่เข้าใจ
- เน้นความยืดหยุ่นในข้อกำหนด, ความสัมพันธ์ระยะยาว, และสัญญาระยะสั้น

---

### 2.3 Influences on the Acquisition Strategy — 5 ปัจจัยที่มีผล

ไม่มีกลยุทธ์ใดที่ "ดีที่สุด" สำหรับทุกสถานการณ์ ต้องพิจารณาจากปัจจัยต่อไปนี้:

#### ปัจจัยที่ 1: Business Need (ความต้องการทางธุรกิจ)

| ลักษณะความต้องการ | กลยุทธ์ที่เหมาะ |
| :--- | :--- |
| ทั่วไป / มี Solution อยู่แล้ว | **Packaged Software** |
| เฉพาะเจาะจง / ไม่มี Solution สำเร็จรูป | **Custom Development** |
| ไม่ใช่กลยุทธ์หลักขององค์กร | **Outsourcing** |

#### ปัจจัยที่ 2: In-House Experience (ความเชี่ยวชาญภายในองค์กร)

| ระดับ In-House Experience | กลยุทธ์ที่เหมาะ |
| :--- | :--- |
| มีทั้ง Functional และ Technical Skills ครบ | **Custom Development** |
| ขาดทักษะเทคนิคในการสร้างระบบ | **Packaged Software** |
| ต้องการ Outside Experience | **Outsourcing** |

#### ปัจจัยที่ 3: Project Skills (ทักษะที่ใช้ในโครงการ)

- ทักษะแบ่งเป็น **Technical Skills** (เช่น SQL) และ **Functional Skills** (เช่น E-commerce)
- หากทักษะนั้นสำคัญต่อกลยุทธ์องค์กร → ควรพัฒนา In-house
- หากเป็นแค่ Operational Issue (เช่น Network Security) → ควร Outsource หรือซื้อ Packaged Software เพื่อให้ Internal Team โฟกัสงานที่สำคัญกว่า

#### ปัจจัยที่ 4: Project Management (การบริหารโครงการ)

- **Custom Development** → ต้องการ Project Management และ Methodology ที่ดีมาก
- ปัจจัยที่อาจทำให้โครงการเสียทิศทาง: ปัญหาด้านงบประมาณ, การจัดบุคลากร, และ Business Users ที่ต้องการมากเกินไป
- **Packaged Software / Outsourcing** → ยังคงต้องการการจัดการ แต่ได้รับผลกระทบจากปัจจัยภายในน้อยกว่า

#### ปัจจัยที่ 5: Time Frame (กรอบเวลา)

- เวลาจำกัด → มองหาระบบที่สร้างและทดสอบแล้ว (**Packaged Software**)
- หากเลือก Custom แต่เวลาน้อย → ใช้เทคนิค **Timeboxing** เพื่อจัดการปัญหา
- **Outsourcing** อาจใช้เวลานานพอๆ กับ Custom Development

---

### 2.4 Selecting an Acquisition Strategy

#### เครื่องมือในการรวบรวมข้อมูลจาก Vendor

| เครื่องมือ | ย่อว่า | ใช้เมื่อไหร่ |
| :--- | :--- | :--- |
| **Request for Proposal** | **RFP** | ต้องการข้อเสนอละเอียดจาก Vendor สำหรับโครงการขนาดใหญ่ |
| **Request for Information** | **RFI** | โครงการขนาดเล็ก / งบน้อย ต้องการข้อมูลพื้นฐาน |
| **Request for Quote / Invitation for Bid** | **RFQ / IFB** | มีรายการที่ต้องการชัดเจน ต้องการแค่ราคา |

- **RFP** → อธิบายรายละเอียดระบบที่ต้องการ ให้ Vendor ตอบกลับว่าจะตอบสนองความต้องการนั้นอย่างไร

#### Alternative Matrix (ตารางเปรียบเทียบทางเลือก)

> **Alternative Matrix** คือตารางที่รวบรวม Pros/Cons และการวิเคราะห์ Feasibility ของทุก Design Alternative ไว้ในที่เดียว เพื่อให้ Approval Committee ตัดสินใจได้ง่าย

**ขั้นตอนการสร้าง Alternative Matrix:**
1. สร้างตารางบรรจุ Technical, Economical, และ Organizational Feasibility ของแต่ละทางเลือก
2. เพิ่ม **Weights (น้ำหนัก)** ตาม Priority ของเกณฑ์แต่ละข้อ → ได้ **Weighted Alternative Matrix**
3. เพิ่มคอลัมน์ **Score** เพื่อสื่อสารว่าแต่ละทางเลือกตอบโจทย์เกณฑ์ได้ดีแค่ไหน
4. **Approval Committee** ทำการตัดสินใจขั้นสุดท้าย

```text
Alternative Matrix Structure:
┌──────────────┬───────────────┬───────────────┬───────────────┐
│  Criteria    │  Alternative  │  Alternative  │  Alternative  │
│  (+ Weight)  │     A         │     B         │     C         │
├──────────────┼───────────────┼───────────────┼───────────────┤
│ Technical    │ Score × Wt    │ Score × Wt    │ Score × Wt    │
│ Economical   │ Score × Wt    │ Score × Wt    │ Score × Wt    │
│ Organizational│ Score × Wt   │ Score × Wt    │ Score × Wt    │
├──────────────┼───────────────┼───────────────┼───────────────┤
│ TOTAL        │   ΣScore      │   ΣScore      │   ΣScore      │
└──────────────┴───────────────┴───────────────┴───────────────┘
→ ทางเลือกที่ได้ TOTAL Score สูงสุด = ทางเลือกที่แนะนำ
```

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

- [ ] **Design Phase:** ตอบคำถาม "How" — ตัดสินใจว่าระบบจะทำงานอย่างไร, Output คือ System Specification
- [ ] **System Proposal:** Output สุดท้ายของ Analysis Phase → เป็น Input สำหรับ Design Phase
- [ ] **3 กลยุทธ์:** Custom Development / Packaged Software / Outsourcing — รู้ Pros, Cons, และเมื่อไหรควรใช้
- [ ] **Workaround:** โปรแกรมเสริมที่สร้างขึ้นมาเชื่อมกับ Packaged Software เพื่อรองรับความต้องการพิเศษ
- [ ] **Systems Integration:** รวม Packaged Software + Legacy Systems + New Software เข้าด้วยกัน
- [ ] **ASP / SaaS:** รูปแบบ Outsourcing ที่ส่งบริการผ่าน Internet
- [ ] **5 ปัจจัย:** Business Need / In-House Experience / Project Skills / Project Management / Time Frame
- [ ] **Timeboxing:** เทคนิคจัดการเวลาสำหรับ Custom Development ที่มีกรอบเวลาจำกัด
- [ ] **RFP / RFI / RFQ:** เครื่องมือรวบรวมข้อมูลจาก Vendor — รู้ว่าอันไหนใช้เมื่อไหร่
- [ ] **Alternative Matrix:** ตารางเปรียบเทียบ + Weights + Score → ช่วย Approval Committee ตัดสินใจ

### สรุป Acquisition Strategy ที่ควรเลือก

| สถานการณ์ | กลยุทธ์ที่แนะนำ |
| :--- | :--- |
| ความต้องการ Unique + มีทักษะ In-house ครบ | Custom Development |
| ความต้องการทั่วไป + เวลาน้อย | Packaged Software |
| ขาดทักษะ + งานไม่ใช่กลยุทธ์หลัก | Outsourcing |
| งบน้อย + ต้องการเริ่มเร็ว | Outsourcing (ASP/SaaS) |

### Concept Map

```text
Design Strategies (Unit 07)
├── 1. Transition to Design
│     ├── Analysis → System Proposal → Design
│     ├── Design Phase: "How to build"
│     └── Output: System Specification (A–H)
│
├── 2. System Acquisition Strategies
│     ├── Custom Development (สร้างเอง)
│     ├── Packaged Software (ซื้อ + Customize)
│     │     ├── Workaround
│     │     └── Systems Integration
│     └── Outsourcing (จ้างภายนอก)
│           ├── ASP / SaaS
│           └── Contract Types: Time / Fixed-price / Value-added
│
├── 3. Influences on Strategy
│     ├── Business Need
│     ├── In-House Experience
│     ├── Project Skills
│     ├── Project Management
│     └── Time Frame
│
└── 4. Selecting a Strategy
      ├── RFP / RFI / RFQ
      └── Alternative Matrix (Weighted)
```

---

## ⚠️ Common Pitfalls & Exam Traps

- **สับสนระหว่าง RFP / RFI / RFQ:** RFP = ละเอียดที่สุด, RFI = สั้นกว่า สำหรับโครงการเล็ก, RFQ = แค่ขอราคา (มีรายการชัดเจนแล้ว)
- **คิดว่า Custom Development ดีที่สุดเสมอ:** ผิด — ถ้าความต้องการทั่วไปและเวลาจำกัด Packaged Software อาจดีกว่ามาก
- **ลืม Workaround vs. Systems Integration:** Workaround คือโปรแกรมเสริมสำหรับ Packaged ที่ยังคงใช้ต่อ ส่วน Systems Integration คือการรวมหลายระบบเข้าด้วยกัน
- **คิดว่า Outsourcing ถูกและเร็วเสมอ:** ไม่ใช่ — Outsourcing อาจใช้เวลานานเท่า Custom Development และมีความเสี่ยงด้านความลับของข้อมูล
- **ลืม 5 ปัจจัยของ Acquisition Strategy:** ต้องรู้ทั้ง 5 ปัจจัย: Business Need, In-House Experience, Project Skills, Project Management, Time Frame
- **Alternative Matrix:** ต้องมีทั้ง Weights (น้ำหนัก) และ Score — ตารางที่ไม่มี Weight คือ Alternative Matrix ธรรมดา ไม่ใช่ Weighted Alternative Matrix
- **"Never outsource what you don't understand":** นี่คือหลักการสำคัญที่มักออกข้อสอบ

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- **วิชาและหัวข้อที่เกี่ยวข้อง:**
  - [[ISAD - Unit 01 Introduction]] (ภาพรวมของ SDLC และบทบาทของแต่ละ Phase)
  - [[ISAD - Unit 06 Requirements]] (Analysis Phase ที่เป็น Input ของ Design Phase)
  - [[ISAD - Unit 08 Architecture Design]] (ต่อจาก Design Strategies — เนื้อหา Architecture Design)

- **แหล่งข้อมูล:**
  - Source: `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT07-design-strategies-v1.pdf` (33 slides, KMITL)
  - อาจารย์: Asst. Prof. Manop Phankokkruad, Ph.D. — School of Information Technology, KMITL
