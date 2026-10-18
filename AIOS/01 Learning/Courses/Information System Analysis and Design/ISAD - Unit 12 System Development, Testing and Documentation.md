# ISAD - Unit 12: System Development, Testing and Documentation

> **วิชา:** 06066304 Information System Analysis and Design | **สถาบัน:** KMITL (King Mongkut's Institute of Technology Ladkrabang)
> **อาจารย์:** Asst. Prof. Manop Phankokkruad, Ph.D.
> **Source:** `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT12-developing-testing-doc-v2.pdf` (33 slides)
> **Additional Context:** เสริมทฤษฎี Testing Pyramid, Agile Testing, และ Docs-as-Code Pattern

---

## Part 1: Macro Architecture & Overview

**Unit 12** เป็นส่วนหนึ่งของ **Implementation Phase** ซึ่งเกิดขึ้นหลังจากที่ทีมออกแบบระบบใน Unit 10-11 เสร็จสิ้นแล้ว Phase นี้ครอบคลุม 3 ภารกิจหลัก ได้แก่ การจัดการกระบวนการเขียนโปรแกรม การทดสอบระบบ และการจัดทำเอกสาร โดย Project Manager และ Systems Analyst มีบทบาทสำคัญในการประสานงานระหว่าง Programmer, Tester, และ User

**ผลลัพธ์ที่ได้จาก Implementation Phase (Unit 12-13):**

```text
Implementation Phase Outputs:
  Unit 12 Activities                 Deliverables
  Managing Programming        ->     Completed Program
  Testing & Test Planning     ->     Testing Plan
  Developing Documentation    ->     System Doc + User Documentation

  Unit 13 Activities                 Deliverables
  Installation & Conversion   ->     Migration Plan
  Training & Support          ->     Training Plan
  Change Management           ->     Change Mgmt Plan + Change Request
```

### ภาพรวม 3 ส่วนหลักของ Unit 12

```text
Unit 12 Overview:
  1. Managing the Programming Process
     - Assigning Programming Tasks
     - Coordinating Activities
     - Managing the Schedule
  2. Testing and Test Planning
     - Unit Testing (Black-box / White-box)
     - Integration Testing (4 approaches)
     - System Testing (5 sub-types)
     - Acceptance Testing (Alpha / Beta)
  3. Developing Documentation
     - System Documentation
     - User Documentation (3 types)
     - Online Documentation Design
```

---

## Part 2: Core Concepts

### 2.1 Managing the Programming Process

**Implementation Phase** เริ่มต้นเมื่อ Design Phase เสร็จสมบูรณ์ Systems Analyst ต้องทำหน้าที่บริหารกระบวนการเขียนโปรแกรมควบคู่ไปกับการออกแบบชุดทดสอบ

> **นิยาม:** การบริหารกระบวนการโปรแกรม (Managing the Programming Process) คือกลุ่มภารกิจที่ Project Manager รับผิดชอบเพื่อให้มั่นใจว่า Software พัฒนาได้ตรงเวลา ตรงสเปก และมีคุณภาพ

**ภารกิจหลัก 3 อย่างของ Project Manager:**

```text
Managing the Programming Process:
    Project Manager
          |
  --------+----------
  |        |         |
Assign  Coordinate  Manage
Tasks   Activities  Schedule
```

#### A. Assigning Programming Tasks

> 💡 **Intuition:** ลองคิดถึงการจัดทีมเขียนหนังสือ: คนที่เขียนบทเดียวกันควรเป็นคนเดียวกัน ถ้าแบ่งประโยคในบทเดียวกันให้คนละคน สไตล์และเนื้อเรื่องจะขัดกัน ข้อจำกัดของ analogy: "ทีมเล็กที่สุดที่ทำได้" ไม่ได้แปลว่าน้อยที่สุดจนงานไม่ทัน ต้องดูทั้งปริมาณงานและทักษะจริงประกอบ
> [Source: generated — not verified against original document]

**หลักการมอบหมายงานโปรแกรม:**
- **จัดกลุ่ม Module** ที่เกี่ยวข้องกันก่อน แล้วมอบทั้งกลุ่มให้ Programmer คนเดียว ไม่แยก Module ที่สัมพันธ์กันไปคนละคน
- **พิจารณาจาก Experience และ Skill Level** ของ Programmer แต่ละคน
- **ทีมที่เล็กที่สุดที่ทำได้** (Smallest Feasible Team) คือทีมที่ดีที่สุด — ลด Communication Overhead
- **บริหาร Skill Mismatch:** จัดการกรณีที่ทักษะที่มีอยู่ไม่ตรงกับที่โปรเจกต์ต้องการ

> **ตัวอย่างจริง:** ในโปรเจกต์ E-Commerce ควรมอบ `Payment` Module ให้ Senior Developer ที่มีประสบการณ์ด้าน Security โดยเฉพาะ

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "จัดกลุ่ม Module ที่เกี่ยวข้องกัน" → Module ที่ติดกันมากควรอยู่กับคนเดียว เพื่อไม่ต้องตกลง Interface ข้ามคน
- "Smallest Feasible Team" → ทีมเล็กที่สุดที่ยังทำงานได้ตามกำหนด ไม่ใช่จำนวนคนน้อยที่สุดเท่าที่จะเป็นไปได้
- "Skill Mismatch" → ทักษะที่มีไม่ตรงกับความต้องการของโปรเจกต์ ต้องหาทางแก้ เช่น อบรม หรือจ้างเพิ่มเฉพาะจุด

**ตัวอย่าง:**
- ✅ มอบ Payment Module ทั้งกลุ่มให้ Developer คนเดียวที่มีทักษะ Security — การตัดสินใจเรื่องความปลอดภัยอยู่ที่เดียว
- ❌ แบ่ง Payment Module ให้ 3 คนตามหน้าที่ ทั้งสามต้องประชุมบ่อยและตกลง Interface กันตลอด — Communication Overhead สูง
- **ต่างกันตรง:** การจัดตามกลุ่ม Module (งานที่ติดกันอยู่ด้วยกัน) ต่างจากการแบ่งตามจำนวนคนหรือจำนวนชั่วโมง

**อย่าสับสน:** "Smallest Feasible Team" ≠ "ทีมที่ไม่มีคนเลย" — เป็นทีมที่เล็กที่สุดซึ่งยังมีทักษะครบและทำงานทันกำหนด

**เช็คความเข้าใจ:** โมดูล Payment ถูกแบ่งให้ 3 คนแยกตามหน้าที่ (UI, Logic, DB) ทุกคนต้องประชุมตกลง Interface ตลอด ควรปรับตามหลักใดของการมอบหมายงาน?
<details><summary>เฉลย</summary>

ควร **จัดกลุ่ม Module ที่เกี่ยวข้องให้อยู่กับ Programmer คนเดียวหรือทีมย่อยเดียว** เพื่อลดการตกลง Interface ข้ามคนและ Communication Overhead

</details>

#### B. Coordinating Activities

**3 วิธีการประสานงาน:**

| วิธีการ | รายละเอียด | ตัวอย่างเครื่องมือ |
| :--- | :--- | :--- |
| **Weekly Project Meeting** | ประชุมทีมรายสัปดาห์เพื่อ Sync Progress | Zoom, MS Teams, Google Meet |
| **Standards & Guidelines** | กำหนด Coding Standard, Git Branching Strategy | ESLint, Prettier, GitHub Flow |
| **CASE Tools** | เครื่องมือช่วย Track Status และบริหาร Programmer | Jira, Azure DevOps, Trello |

**3 Environment Areas สำหรับ Programmer:**

```mermaid
flowchart LR
    Dev["Development Area<br>(กำลังพัฒนา / Local)"] --> Test["Testing Area / Staging<br>(Build & Test Pass)"] --> Prod["Production Area<br>(Live สำหรับผู้ใช้งานจริง)"]
```

**Change Control Techniques:**
- **File/Program Organization:** แยกไฟล์ตาม Completion Status (Dev / Test / Prod)
- **Program Log:** บันทึกการเปลี่ยนแปลงของโปรแกรมทุกครั้ง (คล้าย `git log`)

#### C. Managing the Schedule

> 💡 **Intuition:** ลองคิดถึงการสร้างบ้านแล้วเจ้าของขอเพิ่มห้องที่สามตอนที่เทพื้นไปแล้ว งบและเวลาต้องเปลี่ยนทั้งหมด แม้แต่ละครั้งจะดูเล็กน้อย ข้อจำกัดของ analogy: บางการเปลี่ยนแปลงจำเป็นจริง ปัญหาอยู่ที่การเปลี่ยนที่ไม่ผ่านการตกลงและการประเมินผลกระทบ
> [Source: generated — not verified against original document]

**ปัญหาหลักที่ทำให้ Schedule เสีย:**

| ปัญหา | คำอธิบาย | วิธีรับมือ |
| :--- | :--- | :--- |
| **Scope Creep** | ขอบเขตงานขยายโดยไม่ได้วางแผน เช่น ลูกค้าขอ Feature เพิ่มกลางโปรเจกต์ | Change Control Process อย่างเข้มงวด |
| **Day-by-Day Slippage** | งานล่าช้าทีละเล็กน้อยสะสม | Daily Stand-up Meeting |
| **Inaccurate Estimates** | ประมาณเวลาผิดตั้งแต่ต้น | Refine Estimates ระหว่างทางสม่ำเสมอ |

**Risk Assessment:** Project Manager ต้องสร้างและ Update **Risk Register** ที่ track ความเสี่ยงที่อาจกระทบ Schedule และ Cost อยู่ตลอดเวลา

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Scope Creep" → ขอบเขตขยายขึ้นโดยไม่ได้ผ่านการตกลงและการประเมินผลกระทบ
- "Day-by-Day Slippage" → งานล่าช้าทีละเล็กน้อยทุกวันจนสะสมเป็นหลายสัปดาห์
- "Change Control Process" → กระบวนการรับคำขอเปลี่ยนแปลง ประเมินผลต่อ Schedule/Cost แล้วจึงอนุมัติหรือปฏิเสธ — ไม่ได้แปลว่าห้ามเปลี่ยน
- "Risk Register" → ตารางความเสี่ยงที่ PM ติดตามและอัปเดตต่อเนื่อง

**ตัวอย่าง:**
- ✅ ลูกค้าขอ Feature ใหม่กลางโปรเจกต์ → PM ประเมินว่ากระทบ Schedule กี่วัน แล้วให้ลูกค้าตัดสินใจผ่าน Change Control ก่อนลงมือ
- ❌ รับงานเพิ่มแบบเงียบๆ โดยไม่ปรับ Schedule — ความล่าช้าสะสมโดยไม่มีใครรู้จนถึงกำหนดส่ง
- **ต่างกันตรง:** Scope Creep = มีงานเพิ่มโดยไม่ผ่านการตกลง; Day-by-Day Slippage = งานเดิมแต่ช้าลงเรื่อยๆ — ทั้งคู่ทำให้ Schedule เสียแต่แก้คนละแบบ

**อย่าสับสน:** Change Control ≠ ห้ามเปลี่ยนแปลง — เป็นกระบวนการอนุมัติและประเมินผลกระทบ การเปลี่ยนที่จำเป็นยังทำได้

**เช็คความเข้าใจ:** ทีมพบว่างานล่าช้าเพิ่มทุกวันประมาณครึ่งวัน โดยไม่มีใครขอ Feature ใหม่เลย ปัญหาเป็น Scope Creep หรือ Day-by-Day Slippage และควรแก้ด้วยอะไร?
<details><summary>เฉลย</summary>

เป็น **Day-by-Day Slippage** (ไม่มีการขอขยายขอบเขต แต่ล่าช้าสะสมทุกวัน) แก้ด้วย **Daily Stand-up Meeting** เพื่อเห็นความคืบหน้าและปัญหาเป็นรายวัน

</details>

---

### 2.2 Testing and Test Planning

**Testing** คือกระบวนการ Execute Program เพื่อค้นหา Error — ไม่ใช่เพื่อพิสูจน์ว่า Program ถูกต้อง แต่เพื่อ **หา Bug** ให้ได้มากที่สุด

> **Test Plan** คือเอกสารที่ระบุ Scope, Approach, Resources, Schedule ของกิจกรรมการทดสอบ รวมถึง Test Items, ฟีเจอร์ที่จะทดสอบ, Tasks, ผู้รับผิดชอบ, Test Environment, Design Techniques, และ Entry/Exit Criteria

**ลำดับชั้นของการทดสอบ:**

```mermaid
flowchart TD
    T1["1. Unit Testing<br>(ทดสอบ Component ย่อย / Functions / Classes)"] --> T2["2. Integration Testing<br>(ทดสอบการเชื่อมต่อระหว่าง Modules / APIs)"]
    T2 --> T3["3. System Testing<br>(ทดสอบระบบทั้งระบบเทียบกับ Requirements)"]
    T3 --> T4["4. Acceptance Testing (UAT)<br>(Alpha / Beta ทดสอบยืนยันโดยผู้ใช้งานจริง)"]
```

#### 2.2.1 Unit Testing

> 💡 **Intuition:** ลองคิด Car Assembly: ก่อนนำ Car ไป Test Drive ต้องทดสอบแต่ละ Part ก่อน (Engine ทำงานหรือไม่, Wheels หมุนได้ไหม, Lights สว่างไหม) แยกแต่ละ Part — ผ่านทีละ Part ไม่ได้รับประกันว่าประกอบแล้วจะใช้ได้ แต่อย่างน้อยรู้ว่าแต่ละ Part ไม่เสีย นั่นคือ Unit Testing
> [Source: generated — not verified against original document]

**Unit Testing** คือการทดสอบ Component ย่อยที่สุดของ Software (Function, Class, Method) แยกกัน

**ดำเนินการโดย:** Developers (ในช่วง Early Development)

**2 Approach ของ Unit Testing:**

| Approach | วิธีการ | แหล่ง Test Plan | เหมาะกับ |
| :--- | :--- | :--- | :--- |
| **Black-box Testing** | ทดสอบโดยไม่เปิดดูโค้ด — ใส่ Input ตรวจ Output | Program Specification | การทดสอบปกติทั่วไป |
| **White-box Testing** | ทดสอบโดยเปิดดูโค้ด — ตรวจ Logic, Branch, Path | Program Source Code | เมื่อ Complexity สูง |

```text
Black-box:  [Input] -> [กล่องดำ] -> [Output]   (จาก Spec ไม่รู้ข้างใน)
White-box:  [Input] -> [if/else/loop] -> [Output] (เปิดโค้ด ทดสอบทุก Branch)
```

> **ตัวอย่างจริง (Black-box):** ทดสอบ `calculate_discount(1000, 'Gold')` ว่า Output = 800 โดยไม่ดูโค้ด
>
> **ตัวอย่างจริง (White-box):** เปิดดูโค้ดพบ `if member_level == 'Gold'` -> เขียน Test Case ครอบทุก Branch

**🧭 ทำความเข้าใจ Unit Testing** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Component ย่อยที่สุด" → Function, Method, Class — ไม่ใช่ System ทั้งหมด
- "แยกกัน (Isolation)" → Test 1 Unit โดยไม่พึ่ง Unit อื่น (หากจำเป็น ใช้ Mock/Stub)
- "ดำเนินการโดย Developers" → ไม่ใช่ QA/Tester — Developer เขียน Code แล้วทดสอบเลย
- "Black-box vs White-box" → Black-box = ไม่รู้โค้ด; White-box = รู้โค้ด; Unit Test สามารถใช้ทั้ง 2 ได้

**ตัวอย่าง:**
- ✅ **Unit Testing ดี:** Developer ทดสอบ `getAge()` method โดยส่ง Birth Date แล้วตรวจว่าได้อายุถูกต้อง (ปีปัจจุบัน − ปีเกิด ปรับตามวันเกิด)
- ✅ **White-box ใน Unit Test:** เปิดโค้ด `if age > 18: is_adult = True` → ต้องทดสอบ age=18, age=19, age=17
- ❌ **ไม่ใช่ Unit Testing:** ทดสอบ "ต้องกรอก Username + Password แล้วกดปุ่ม Login" → นั่นคือ Integration/System Testing
- **ต่างกันตรง:** Unit = Part เดียว; Integration = Multiple Parts รวมกัน

**อย่าสับสน:** "Unit Testing" ≠ "JUnit" (หรือ Unittest ภาษา Python) — JUnit คือ Framework/Tool สำหรับเขียน Unit Tests

**เช็คความเข้าใจ:** ระบบ Banking มี Function `calculateMonthlyInterest(principal, annual_rate)` ต้องทดสอบแบบ Unit Testing:
- ใช้ Black-box หรือ White-box?
- ทดสอบอะไรบ้าง?
<details><summary>เฉลย</summary>

**ใช้ทั้ง 2 Approach:**

**Black-box (จาก Spec):**
- Input: principal=1000, rate=0.12 → Output ต้องเป็น 10 (1000 × 0.12 ÷ 12)
- Input: principal=0 → Output ต้องเป็น 0
- Boundary: principal ติดลบ → ต้องได้ Error ตามที่ Spec กำหนด

**White-box (จาก Code):**
- ถ้า Code มี `if rate > 0.5: return ERROR` → ต้องทดสอบ rate > 0.5 และ rate ≤ 0.5
- ถ้า Code มี `interest = principal * rate / 12` → ต้องทดสอบ เลขศูนย์ และ เลขลบ

Result: Unit Test ประกอบด้วย Black-box + White-box Test Cases รวมกัน

</details>

#### 2.2.2 Integration Testing

> 💡 **Intuition:** ลองคิด Orchestra: ทุก Musician (Violin, Piano, Drum) สามารถ Play เพลงแต่ละคนได้ (Unit Testing ผ่าน) แต่เมื่อมารวมเล่นกัน อาจเล่นไม่เข้ากัน — Violin เร็ว Piano ช้า หรือ Drum เข้าจังหวะผิด นั่นคือ Integration Testing: ตรวจว่า "เชื่อม"ระหว่าง Part ทำงานถูกต้อง
> [Source: generated — not verified against original document]

**Integration Testing** คือการทดสอบว่า Component หลายตัวเมื่อนำมา **รวมกัน** แล้ว ยังทำงานได้ถูกต้องหรือไม่ เน้นหาปัญหาจาก **Interface ระหว่าง Component**

**4 Approach ของ Integration Testing:**

| Approach | วิธีการ | แหล่ง Test Plan | เหมาะกับ |
| :--- | :--- | :--- | :--- |
| **User Interface Testing** | ทดสอบทุก Function บน Interface | Interface Design | การทดสอบ Integration ปกติ |
| **Use Scenario Testing** | ทดสอบตาม Use Case/Scenario จริง | Use Scenario | เมื่อ User Interface สำคัญมาก |
| **Data Flow Testing** | ทดสอบแต่ละ Process ทีละขั้น ตาม Physical DFD | Physical DFDs | เมื่อระบบมีการประมวลผลข้อมูลซับซ้อน |
| **System Interface Testing** | ทดสอบการแลกเปลี่ยนข้อมูลกับระบบภายนอก | Physical DFDs | เมื่อระบบต้องเชื่อมต่อกับ External Systems |

> **ตัวอย่างจริง:** ทดสอบว่าเมื่อ Order สำเร็จ Payment Module ถูก Charge และ Inventory ถูก Deduct พร้อมกัน

**🧭 ทำความเข้าใจ Integration Testing** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Component หลายตัวรวมกัน" → ต่างกับ Unit Testing ที่ทดสอบแยกทีละตัว; Integration ต้องทดสอบขณะ Component สื่อสารกัน
- "Interface ระหว่าง Component" → ทั้ง API Call, Data Format, Error Handling ต้องตรงกัน
- "4 Approach" → การทดสอบจาก UI, Scenario, Data Flow, หรือ External System Interface
- "ดำเนินการก่อน System Testing" → ต้องแน่ใจว่า Integration ไม่มีปัญหา ก่อนทดสอบระบบทั้งหมด

**ตัวอย่าง:**
- ✅ **UI Integration ดี:** กรอก Order Details ใน Web Form → System Validate Input, Save to DB, Update Inventory, ส่ง Email — ทั้งกระบวนการต้องส่งต่อกันถูกต้อง
- ❌ **Integration Bug ที่ต้องจับให้ได้:** Payment API ส่ง Success แต่ Inventory Module ไม่อัปเดต Stock → Data ไม่ Sync
- **ต่างกันตรง:** Unit = 1 Component; Integration = Multiple Components เชื่อมกัน; System = ทั้งระบบรวม

**อย่าสับสน:** "Integration Testing" ≠ "Unit Testing" — Integration ทดสอบ **ปฏิสัมพันธ์** ระหว่าง Module; Unit ทดสอบ Module เดียว

**เช็คความเข้าใจ:** ระบบ E-Commerce มี 3 Modules:
1. Order Module: รับ Order, บันทึก DB
2. Payment Module: Charge Card, ส่ง Confirmation
3. Inventory Module: ลด Stock, ส่งแจ้งเตือน

ควรทดสอบอะไรใน Integration Testing?
<details><summary>เฉลย</summary>

ควรทดสอบการเชื่อมระหว่าง:
1. **Order → Payment:** เมื่อ Order สร้าง ต้อง Call Payment API ถูก
2. **Order → Inventory:** เมื่อ Payment Success ต้อง Deduct Stock พร้อมกัน
3. **Payment ↔ Inventory Timing:** ถ้า Payment ล้ม ต้องไม่ Deduct Stock
4. **Error Handling:** ถ้า Payment Timeout ต้อง Rollback Order State เป็น Pending

→ ไม่ใช่ทดสอบแต่ละ Module แยก (นั่นคือ Unit Testing) แต่ทดสอบ **Data Flow และ Interaction** ระหว่าง 3 Module

</details>

#### 2.2.3 System Testing

> 💡 **Intuition:** ลองคิดถึงการตรวจรถก่อนส่งมอบ: ไม่ได้ดูแค่เครื่องยนต์หรือไฟหน้าทีละชิ้น แต่ขับจริงในเส้นทางที่ลูกค้าจะใช้ แล้วดูว่าทั้งคันตรงกับที่ตกลงไว้หรือไม่ ทั้งความนิ่ง ความสะดวก และความปลอดภัย ข้อจำกัดของ analogy: System Testing ต้องเทียบกับ Business Requirements ที่ตกลงไว้ ไม่ใช่แค่ดูว่าระบบเปิดขึ้นมาได้
> [Source: generated — not verified against original document]

**System Testing** คือการทดสอบ **ระบบทั้งหมด** เพื่อยืนยันว่าตรงตาม **Business Requirements** — ดำเนินการโดย Systems Analyst

**5 Sub-types ของ System Testing:**

| Sub-type | สิ่งที่ทดสอบ | แหล่ง Test Plan |
| :--- | :--- | :--- |
| **Requirements Testing** | ระบบตอบสนองความต้องการทางธุรกิจได้ครบ | System Design + Unit/Integration Tests |
| **Usability Testing** | ระบบใช้งานได้สะดวกแค่ไหน (User-Friendly) | Interface Design & Use Scenarios |
| **Security Testing** | Disaster Recovery + Unauthorized Access Prevention | Infrastructure Design |
| **Performance Testing** | รับโหลดสูงได้แค่ไหน (Load Test, Stress Test) | System Proposal + Infrastructure Design |
| **Documentation Testing** | เอกสารถูกต้องและสอดคล้องกับระบบจริง | Help System, Procedures, Tutorials |

> **ตัวอย่างจริง (Performance Testing):** ทดสอบว่า Web App รองรับ 10,000 Concurrent Users โดยไม่ Response Time เกิน 2 วินาที (Apache JMeter / Locust)

**🧭 ทำความเข้าใจ System Testing** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "ระบบทั้งหมด" → ทดสอบรวมทุก Component และ Interface เป็นหนึ่งเดียว หลังจาก Unit และ Integration ผ่านแล้ว
- "Business Requirements" → เกณฑ์ที่ต้องเทียบ คือสิ่งที่ธุรกิจต้องการ ไม่ใช่แค่สิ่งที่โค้ดตั้งใจทำ
- "Performance Testing (Load / Stress)" → ทดสอบว่าระบบรับโหลดได้แค่ไหนและพังที่จุดใด
- "Sub-type" → System Testing แบ่งเป็น 5 มุม: Requirements, Usability, Security, Performance, Documentation

**ตัวอย่าง:**
- ✅ Unit และ Integration ผ่านทั้งหมด แล้วทดสอบ 10,000 Concurrent Users ตามเกณฑ์ธุรกิจ พบว่า Response Time เกิน 2 วินาที → เป็น Performance Testing ที่จับปัญหาได้
- ❌ ระบบผ่าน Unit Testing ทุกตัว แต่ไม่เคยทดสอบโหลดจริง แล้วประกาศว่า "ระบบพร้อม" — ยังไม่มีหลักฐานว่ารองรับผู้ใช้จำนวนมากได้
- **ต่างกันตรง:** Integration ตรวจว่า "Module คุยกันถูกไหม"; System ตรวจว่า "ทั้งระบบตรงกับธุรกิจไหม"

**อย่าสับสน:** "System Testing" ≠ "Unit Testing" — System Testing ไม่ได้ทดสอบ Function เดี่ยวๆ แต่ทดสอบพฤติกรรมของระบบทั้งหมดเทียบกับ Requirement

**เช็คความเข้าใจ:** ระบบผ่าน Unit และ Integration ทั้งหมด แต่ไม่รู้ว่ารองรับผู้ใช้พร้อมกันได้กี่คน ต้องทำการทดสอบประเภทใด และอยู่ในระดับใด?
<details><summary>เฉลย</summary>

**Performance Testing** ซึ่งเป็น sub-type ของ **System Testing** — Unit/Integration ไม่ได้วัดภาระของทั้งระบบ จึงต้องทดสอบระดับทั้งระบบเทียบกับเกณฑ์ที่ตกลงไว้

</details>

#### 2.2.4 Acceptance Testing

> 💡 **Intuition:** ลองคิดถึงการลองชุดสูทที่ช่างตัด: ช่างตรวจตะเข็บเองแล้ว แต่คนที่ต้องใส่ต้องลองและตัดสินว่าสวมสบายและใส่ไปงานได้จริงหรือไม่ นั่นคือ Acceptance Testing ที่ผู้ใช้เป็นผู้ยืนยัน ข้อจำกัดของ analogy: ผู้ใช้อาจลองไม่ครบทุกกรณี จึงต้องมีการเตรียมสถานการณ์ทดสอบไว้ด้วย
> [Source: generated — not verified against original document]

**Acceptance Testing** ดำเนินการโดย **ผู้ใช้งานจริง** เพื่อยืนยันว่าระบบสมบูรณ์และยอมรับได้

**2 ขั้นตอน:**

| ขั้น | ชื่อ | วิธีการ | ข้อมูลที่ใช้ |
| :--- | :--- | :--- | :--- |
| **A** | **Alpha Testing** | ผู้ใช้ทดสอบในสภาพแวดล้อมที่ควบคุม | Test Data (ข้อมูลสมมุติ) |
| **B** | **Beta Testing** | ผู้ใช้เริ่มใช้จริงพร้อม Monitor หา Error | Real Data (ข้อมูลจริง) |

> **ตัวอย่างจริง:** Release เกมใหม่ — Alpha = QA ภายใน + Early Access Group; Beta = Public บางส่วนก่อน Official Launch

**🧭 ทำความเข้าใจ Acceptance Testing** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "ผู้ใช้งานจริง" → คนที่จะใช้ระบบจริงเป็นผู้ยืนยัน ไม่ใช่ทีมพัฒนาเป็นผู้ตัดสิน
- "Alpha Testing" → ทดสอบในสภาพแวดล้อมที่ควบคุมได้ ด้วย Test Data (ข้อมูลสมมุติ)
- "Beta Testing" → ผู้ใช้กลุ่มจำกัดเริ่มใช้งานจริงพร้อมรายงานปัญหา ด้วย Real Data
- "Acceptance" → ผลลัพธ์คือการยอมรับระบบหรือไม่ ไม่ใช่แค่ผ่าน Test Case

**ตัวอย่าง:**
- ✅ โรงพยาบาลให้พยาบาลทดลองระบบใหม่ด้วยประวัติผู้ป่วยสมมุติก่อน (Alpha) แล้วค่อยให้แผนกเดียวใช้กับข้อมูลจริง (Beta) ก่อนเปิดทุกแผนก
- ❌ ส่งเวอร์ชันใหม่ให้ทั้งบริษัทใช้กับข้อมูลจริงทันทีโดยไม่ผ่าน Alpha — ข้อผิดพลาดจะกระทบข้อมูลจริงทั้งองค์กร
- **ต่างกันตรง:** Alpha = ข้อมูลสมมุติในสภาพควบคุม; Beta = ข้อมูลจริงในกลุ่มผู้ใช้จำกัด

**อย่าสับสน:** Beta ≠ "ผู้ใช้ทั้งหมดได้ใช้แล้ว" — Beta เป็นกลุ่มจำกัดเพื่อหาปัญหาก่อนเปิดกว้าง

**เช็คความเข้าใจ:** ระบบ Banking ใหม่ต้องการให้ผู้ใช้ยืนยันก่อนเปิดให้ลูกค้าทั้งประเทศ ควรทดสอบ Alpha และ Beta อย่างไรตามลำดับ?
<details><summary>เฉลย</summary>

1. **Alpha:** ทดสอบกับ Test Data (ข้อมูลสมมุติ) ในสภาพแวดล้อมควบคุม
2. **Beta:** ให้กลุ่มลูกค้า/พนักงานจำกัดใช้งานจริงพร้อมรายงานปัญหา
3. หลังผ่านทั้งสองขั้น จึงเปิดให้ลูกค้าทั้งหมด

</details>

#### 2.2.5 ตาราง Types of Tests สรุปรวม

| Stage | ประเภทการทดสอบ | แหล่ง Test Plan | เมื่อไหร่ใช้ |
| :--- | :--- | :--- | :--- |
| **Unit** | Black-box Testing | Program Specification | ทดสอบปกติทั่วไป |
| **Unit** | White-box Testing | Program Source Code | เมื่อ Complexity สูง |
| **Integration** | User Interface Testing | Interface Design | ทดสอบปกติ |
| **Integration** | Use Scenario Testing | Use Scenario | เมื่อ UI สำคัญ |
| **Integration** | Data Flow Testing | Physical DFDs | เมื่อมีการประมวลผลข้อมูล |
| **Integration** | System Interface Testing | Physical DFDs | เมื่อมีการแลกเปลี่ยนข้อมูลกับระบบนอก |
| **System** | Requirements Testing | System Design, Unit & Integration Tests | ทดสอบปกติ |
| **System** | Usability Testing | Interface Design & Use Scenarios | เมื่อ UI สำคัญ |
| **System** | Security Testing | Infrastructure Design | เมื่อระบบมีความสำคัญสูง |
| **System** | Performance Testing | System Proposal & Infrastructure Design | เมื่อระบบมีความสำคัญสูง |
| **System** | Documentation Testing | Help System, Procedures, Tutorials | ทดสอบปกติ |
| **Acceptance** | Alpha Testing | System Tests | ทดสอบปกติ |
| **Acceptance** | Beta Testing | ไม่มี Test Plan กำหนดล่วงหน้า | เมื่อระบบมีความสำคัญสูง |

---

### 2.3 Developing Documentation

> 💡 **Intuition:** ลองคิดถึงร้านอาหาร: "คู่มือครัว" เก็บสูตรและวิธีดูแลเครื่องครัว ใช้โดยพ่อครัวและทีมดูแลระบบ ส่วน "ป้ายเมนูและคู่มือบนโต๊ะ" ช่วยลูกค้าสั่งอาหารได้ถูกต้อง นั่นคือ System Documentation (สำหรับคนสร้างและดูแล) กับ User Documentation (สำหรับคนใช้งาน) ข้อจำกัดของ analogy: ระบบซอฟต์แวร์มักทำเอกสารแบบ Online ซึ่งค้นหาได้และอัปเดตง่ายกว่าเอกสารกระดาษ
> [Source: generated — not verified against original document]

**Documentation** มี 2 ประเภทหลัก:

| ประเภท | กลุ่มเป้าหมาย | จุดประสงค์ |
| :--- | :--- | :--- |
| **System Documentation** | Programmers, Systems Analysts | เข้าใจระบบเพื่อ Build หรือ Maintain |
| **User Documentation** | ผู้ใช้งาน (End Users) | ช่วยให้ใช้งานระบบได้ถูกต้อง |

**ข้อสำคัญ:**
- User Documentation **ต้องไม่ทิ้งไว้ทำทีหลัง** — ต้องวางแผนเวลาไว้ใน Project Plan ตั้งแต่ต้น
- **Online Documentation** กำลังกลายเป็นรูปแบบหลัก แทนที่เอกสาร Paper

**Online Documentation — 4 ข้อได้เปรียบ:**
1. **Searching is simpler** — ค้นหาข้อมูลได้รวดเร็ว
2. **Multiple formats** — นำเสนอได้หลายรูปแบบ (Text, Video, Interactive Demo)
3. **Interactive** — ผู้ใช้โต้ตอบกับ Documentation ได้
4. **Less expensive** — ถูกกว่าเอกสาร Paper อย่างมาก

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "System Documentation" → เอกสารสำหรับผู้สร้างและดูแลระบบ (Programmers, Systems Analysts) ให้เข้าใจโครงสร้างเพื่อ Build หรือ Maintain
- "User Documentation" → เอกสารสำหรับผู้ใช้ปลายทาง ให้ใช้งานได้ถูกต้อง
- "ไม่ทิ้งไว้ทำทีหลัง" → ต้องใส่เวลาเขียนเอกสารผู้ใช้ไว้ใน Project Plan ตั้งแต่แรก

**ตัวอย่าง:**
- ✅ เอกสารอธิบาย Database Schema และ API สำหรับทีม Dev → System Documentation; วิดีโอวิธีสั่งสินค้าสำหรับลูกค้า → User Documentation
- ❌ เขียนคู่มือผู้ใช้หลังส่งมอบระบบไปแล้วโดยไม่ได้วางเวลาไว้ — มักไม่เสร็จ หรือไม่ตรงกับเวอร์ชันที่ผู้ใช้ใช้จริง
- **ต่างกันตรง:** ดูที่ "ใครอ่าน" — คนที่จะแก้โค้ดต้องการโครงสร้าง ส่วนคนที่ใช้งานต้องการขั้นตอน

**อย่าสับสน:** System Documentation ≠ User Documentation — คนละกลุ่มผู้อ่าน ต้องแยกเนื้อหา ไม่ควรเอาข้อมูลภายในไปให้ผู้ใช้ปลายทาง

**เช็คความเข้าใจ:** Programmer คนใหม่ต้องเข้าใจโครงสร้างโค้ดและ Module ทั้งระบบเพื่อดูแลต่อ ควรได้เอกสารประเภทใด?
<details><summary>เฉลย</summary>

**System Documentation** — เป็นเอกสารที่อธิบายโครงสร้างและการทำงานของระบบเพื่อให้ผู้ดูแลเข้าใจและแก้ไขได้

</details>

---

### 2.4 Types of User Documentation

> 💡 **Intuition:** ลองคิดถึงเครื่องซักผ้า: ตารางรหัสข้อผิดพลาดด้านหลังฝาเป็น Reference (ค้นเมื่อจำเป็น), ขั้นตอนซักทีละขั้นในคู่มือเป็น Procedural Manual, วิดีโอ 2 นาทีตอนตั้งค่าครั้งแรกเป็น Tutorial ข้อจำกัดของ analogy: ผู้ใช้มักไม่อ่านคู่มือทั้งเล่ม ดังนั้นแต่ละประเภทต้องออกแบบให้เข้าถึงได้ตรงจุดที่ต้องการ
> [Source: generated — not verified against original document]

**3 ประเภทหลักของ User Documentation:**

| ประเภท | จุดประสงค์ | ตัวอย่าง |
| :--- | :--- | :--- |
| **Reference Documents** | ผู้ใช้ค้นหาวิธีทำ Function เฉพาะ | API Reference, Help Pages |
| **Procedural Manuals** | อธิบาย Business Task ทีละขั้นตอน | คู่มือการใช้ระบบ, SOP |
| **Tutorials** | สอน Component หลักสำหรับผู้เริ่มต้น | Getting Started Guide, Video Walkthrough |

**Key Elements ใน User Documentation (7 ส่วน):**

| ส่วน | เนื้อหา |
| :--- | :--- |
| **1. Introduction** | แนะนำ Product, เป้าหมาย, System Requirements, Installation, คำศัพท์สำคัญ |
| **2. Getting Started** | Account Creation, Basic Navigation |
| **3. Features & Functionality** | อธิบาย Features ละเอียด — วิธีเข้าถึง ใช้งาน ปรับแต่ง |
| **4. Step-by-Step Instructions** | คำสั่งตามลำดับ พร้อม Screenshot, Diagram |
| **5. Troubleshooting & FAQs** | แก้ปัญหาที่พบบ่อย, Error Messages, Workarounds |
| **6. Best Practices & Tips** | Shortcuts, Optimization, Advanced Scenarios |
| **7. Glossary & Index** | คำศัพท์ + Index สำหรับค้นหาเร็ว |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Reference Documents" → ผู้ใช้ค้นว่า "ฟังก์ชันนี้ทำอย่างไร" ทีละจุด เช่น API Reference
- "Procedural Manuals" → อธิบายงานทางธุรกิจทีละขั้นตามลำดับ เช่น SOP การเปิดบัญชีใหม่
- "Tutorials" → สอนระบบตั้งแต่ต้นสำหรับผู้เริ่มใช้ ให้เห็นภาพรวมก่อนเจาะรายละเอียด

**ตัวอย่าง:**
- ✅ ผู้ใช้ใหม่เปิดวิดีโอ Tutorial "เริ่มต้นใช้งาน" แล้วค่อยเปิด Reference เมื่อต้องการดูฟังก์ชันรายละเอียด
- ❌ ทำ Tutorial ยาว 100 หน้าสำหรับ Function เดียวที่ผู้ใช้ค้นเป็นครั้งคราว — ควรเป็น Reference ที่ค้นจากจุดเดียวได้
- **ต่างกันตรง:** Reference = ค้นเมื่อต้องการ; Tutorial = เรียนครั้งแรก; Procedural = ทำตามเมื่อต้องทำงานนั้น

**อย่าสับสน:** "Procedural Manual" ≠ "Procedure ในโค้ด" — หมายถึงขั้นตอนของงานทางธุรกิจที่ผู้ใช้ทำ

**เช็คความเข้าใจ:** ผู้ใช้ใหม่ที่อยากเรียนระบบตั้งแต่ศูนย์ ควรเริ่มด้วยเอกสารประเภทใด และตามด้วยประเภทใด?
<details><summary>เฉลย</summary>

เริ่มด้วย **Tutorials** (สอนภาพรวมจากศูนย์) แล้วตามด้วย **Reference Documents** หรือ **Procedural Manuals** เมื่อผู้ใช้ต้องการทำงานเฉพาะอย่าง

</details>

---

### 2.5 Designing Online Documentation

**Navigation Controls 5 ประเภท:**

| Navigation Control | วิธีการทำงาน | ตัวอย่าง |
| :--- | :--- | :--- |
| **Table of Contents** | โครงสร้างเนื้อหาเป็นลำดับชั้น | Sidebar ใน GitBook, ReadTheDocs |
| **Index** | Keyword เรียงตามตัวอักษรพร้อม Link | ดัชนี Clickable |
| **Text Search** | ค้นหา Keyword ใน Full Text | Search Bar ใน Confluence, Notion |
| **Intelligent Agent** | AI/Chatbot ตอบคำถาม Natural Language | Algolia DocSearch AI |
| **Web-like Links** | Hyperlink ระหว่าง Topics ที่เกี่ยวข้อง | Wiki-Style Internal Links |

**หลักการออกแบบ Topic:**
- เริ่มด้วย **Clear Title** -> **Introductory Text** -> **Step-by-step Instructions**
- ใส่ **Screen Images** และ **Show Me Examples**
- มี **Navigation Controls** และ **Links** ไปยัง Related Topics

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

* [ ] **Managing the Programming Process:** 3 ภารกิจ — Assign Tasks, Coordinate Activities, Manage Schedule
* [ ] **Assigning Tasks:** จัดกลุ่ม Related Modules มอบให้คนเดียว; ทีมเล็กสุดที่ทำได้คือดีที่สุด
* [ ] **Coordinating:** 3 Environment Areas = Development -> Testing -> Production
* [ ] **Scope Creep:** ปัญหา Schedule ที่พบบ่อยที่สุด — ขอบเขตงานขยายโดยไม่ตั้งใจ
* [ ] **Testing Levels:** Unit -> Integration -> System -> Acceptance (ลำดับนี้เสมอ)
* [ ] **Unit: Black-box:** ทดสอบจาก Spec, ไม่เปิดโค้ด — ใช้ในกรณีปกติ
* [ ] **Unit: White-box:** เปิดดูโค้ด ทดสอบทุก Branch — ใช้เมื่อ Complexity สูง
* [ ] **Integration: 4 Approaches** = UI Testing, Use Scenario, Data Flow, System Interface
* [ ] **System Testing: 5 Sub-types** = Requirements, Usability, Security, Performance, Documentation
* [ ] **Acceptance: Alpha** = Made-up Data; **Beta** = Real Data
* [ ] **Documentation: 2 ประเภท** = System Doc (Developer) + User Doc (End User)
* [ ] **User Doc: 3 ประเภท** = Reference Documents, Procedural Manuals, Tutorials
* [ ] **Online Doc: 4 ข้อดี** = Easy Search, Multi-format, Interactive, Less Expensive
* [ ] **Navigation Controls: 5 ประเภท** = ToC, Index, Text Search, Intelligent Agent, Web Links

### สรุป: ใครทำอะไร ในแต่ละ Test Level

| Test Level | ผู้ดำเนินการ | จุดมุ่งหมาย |
| :--- | :--- | :--- |
| Unit Testing | Developers | ตรวจสอบ Component ย่อยทำงานถูกต้อง |
| Integration Testing | Developers / QA | ตรวจสอบการเชื่อมต่อระหว่าง Component |
| System Testing | Systems Analysts | ตรวจสอบทั้งระบบ vs. Requirements |
| Acceptance Testing | Users (ผู้ใช้จริง) | ยืนยันว่าระบบตรงความต้องการและยอมรับได้ |

### Concept Map

```text
UNIT 12: System Development, Testing & Documentation
|
+-- 1. Managing Programming
|    +-- Assigning Tasks (Group Modules, Skill Match, Smallest Team)
|    +-- Coordinating (3 Areas: Dev->Test->Prod, Change Control, CASE Tools)
|    +-- Managing Schedule (Scope Creep, Daily Slippage, Risk Register)
|
+-- 2. Testing
|    +-- Test Plan (Scope + Approach + Resources + Schedule)
|    +-- Unit Testing
|    |    +-- Black-box (From Spec, No Code View)
|    |    +-- White-box (From Source Code, Branch Coverage)
|    +-- Integration Testing
|    |    +-- User Interface Testing
|    |    +-- Use Scenario Testing
|    |    +-- Data Flow Testing (Physical DFD)
|    |    +-- System Interface Testing (Physical DFD)
|    +-- System Testing
|    |    +-- Requirements Testing
|    |    +-- Usability Testing
|    |    +-- Security Testing
|    |    +-- Performance Testing
|    |    +-- Documentation Testing
|    +-- Acceptance Testing
|         +-- Alpha (Made-up Data)
|         +-- Beta (Real Data)
|
+-- 3. Documentation
     +-- System Documentation (-> Developers/Analysts)
     +-- User Documentation (-> End Users)
          +-- Types: Reference, Procedural Manual, Tutorial
          +-- Key Elements: Intro, Getting Started, Features,
          |   Steps, Troubleshooting, Best Practices, Glossary
          +-- Online Nav: ToC, Index, Search, AI Agent, Links
```

---

## Backlinks

* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[ISAD - Unit 11 Storage Design]] — Unit ก่อนหน้า: Storage Design เป็น Design Phase ก่อน Implementation Phase
  * [[ISAD - Unit 10 Software Design]] — Software Design สร้าง Architecture ที่ Unit 12 นำมา Implement และ Test
  * [[ISAD - Unit 09 User Interface Design]] — UI Design เป็นแหล่ง Test Plan สำหรับ UI Testing และ Usability Testing
  * [[ISAD - Vault Map]] — แผนที่รวมทุก Unit ของวิชา ISAD

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT12-developing-testing-doc-v2.pdf` (33 slides, KMITL)
  * Reference: Satzinger, J.W., Jackson, R.B., & Burd, S.D. — *Systems Analysis and Design in a Changing World*
