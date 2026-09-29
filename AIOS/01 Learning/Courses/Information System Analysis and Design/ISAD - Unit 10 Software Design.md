# ISAD - Unit 10: Software Design

> **วิชา:** 06066304 Information System Analysis and Design | **สถาบัน:** KMITL (King Mongkut's Institute of Technology Ladkrabang)
> **อาจารย์:** Asst. Prof. Manop Phankokkruad, Ph.D.
> **Source:** `Resources/Books/Information System Analysis and Design/ISAD2026-UNIT10-SoftwareDesign-v2.pdf` (46 slides)
> **Additional Context:** เสริมทฤษฎี SOLID Principles, Design Patterns (GoF), และ Clean Code แนวคิดจาก Software Engineering

---

## Part 1: Macro Architecture & Overview

**Software Design** คือกระบวนการแปลง **User Requirements** ให้อยู่ในรูปแบบที่เหมาะสมสำหรับนักพัฒนา (Programmers) ใช้เขียนโค้ด โดย Analysts มีหน้าที่กำหนดว่าจะต้องเขียนโปรแกรมอะไรบ้าง และสร้าง **Program Specifications** เป็นคำแนะนำสำหรับนักพัฒนา

Software Design เป็น **กระบวนการวนซ้ำ (Iterative Process)** ที่แปลง Requirements ให้เป็น Blueprint สำหรับสร้างซอฟต์แวร์ ในช่วง Design Phase นักวิเคราะห์จะตัดสินใจในรายละเอียดการ Implementation เช่น ภาษาโปรแกรมที่จะใช้ การจัดระเบียบ Process โดยใช้ **Structure Chart** และการสร้าง **Program Specifications** ที่ละเอียด

```text
Software Design Process: จุดเชื่อมโยงใน Design Phase
────────────────────────────────────────────────────────────────
  Functional Model (Use Cases, DFDs)
  Behavioral Model (State Diagrams)           Other Requirements
                         |                          |
                         +──────────+───────────────+
                                    |
                      +─────────────────────────+
                      |   Architectural Design   |
                      +────────────+────────────+
                                   |
                    +──────────────+──────────────+
                    |              |               |
              Data Design    Procedural       Interface
                             Design           Design
                                   |
                                   |
                           Program Modules
                                   |
                    +──────────────+──────────────+
                    |              |               |
                  Code           Test      Integration &
                                           Validation
────────────────────────────────────────────────────────────────
```

### ความสัมพันธ์กับ Unit ก่อนหน้า
- **[[ISAD - Unit 09 User Interface Design]]:** Unit 09 เน้น UI/UX และการออกแบบ Input/Output ที่ผู้ใช้มองเห็น ส่วน Unit 10 นี้เน้นโครงสร้างภายใน (Internal Architecture) ของซอฟต์แวร์ที่นักพัฒนาต้องสร้าง
- **Logical → Physical:** Analysis Phase สร้าง Logical DFDs ที่ไม่ระบุวิธี Implementation ส่วน Design Phase สร้าง Physical Process Models ที่อธิบายว่าระบบสุดท้ายทำงานอย่างไร

---

## Part 2: Core Concepts

### 2.1 Fundamental Software Design Concepts

Software Design มี **9 แนวคิดพื้นฐาน** ที่นักวิเคราะห์ต้องเข้าใจ:

#### 1. Abstraction (การนามธรรม)
**Abstraction** คือการพิจารณา Component ในระดับสูง โดยละเว้น Implementation Details

- **Highest-Level Abstraction:** อธิบายด้วยภาษาของ Problem Domain (เช่น "ระบบต้องคำนวณภาษี")
- **Lower-Level Abstraction:** อธิบายรายละเอียดมากขึ้น (เช่น "Function `calculateTax(income, rate)` คืนค่า `income * rate`")
- **Procedural Abstraction:** ลำดับคำสั่งที่มีหน้าที่เฉพาะเจาะจง (เช่น Function, Method)
- **Data Abstraction:** กลุ่มข้อมูลที่อธิบาย Data Object (เช่น Class, Struct)

> **ตัวอย่างจริง:** ใน E-Commerce System นักวิเคราะห์บอกว่า "ระบบต้องประมวลผลการชำระเงิน" — นี่คือ Abstraction ระดับสูง ระดับต่ำลงมาคือ "เรียก Payment Gateway API → ตรวจสอบ Response → Update Order Status → ส่ง Email ยืนยัน"

#### 2. Architecture (สถาปัตยกรรมซอฟต์แวร์)
**Software Architecture** คือโครงสร้างครบถ้วนของซอฟต์แวร์ ประกอบด้วย:
- โครงสร้างของ Program Modules และวิธีที่ Module เหล่านั้นโต้ตอบกัน
- โครงสร้างของ Data ที่ Component ใช้
- Software Design มุ่งสร้าง **Architectural Framework** ก่อน แล้วจึงทำ Detailed Design ต่อ

> **ตัวอย่างจริง:** MVC (Model-View-Controller), Microservices, Layered Architecture ล้วนเป็นตัวอย่างของ Software Architecture Patterns ที่ทีมต้องเลือกก่อนลงมือเขียนโค้ด

#### 3. Patterns (รูปแบบการออกแบบ)
**Design Pattern** คือโครงสร้างการออกแบบที่พิสูจน์แล้วว่าแก้ปัญหาเฉพาะรูปแบบได้ดี นักออกแบบใช้ Pattern เพื่อ:
- **A. ตรวจสอบความเหมาะสม:** Pattern นี้ใช้กับปัญหาปัจจุบันได้ไหม?
- **B. นำกลับมาใช้ใหม่:** ประหยัดเวลาออกแบบ
- **C. เป็นแนวทาง:** ใช้เป็น Guide สร้าง Pattern ที่คล้ายกัน

> **ตัวอย่างจริง (GoF Design Patterns):**
> - **Singleton Pattern:** ระบบ Configuration ที่ต้องการ Instance เดียว เช่น Database Connection Pool
> - **Observer Pattern:** ระบบ Notification ที่ผู้ใช้ Subscribe แล้วได้รับแจ้งเตือนอัตโนมัติ
> - **Factory Pattern:** ระบบสร้าง Payment Object แบบต่างๆ (CreditCard, PayPal, QR Code) โดยไม่ต้องระบุ Class ตรงๆ

#### 4. Modularity (การแบ่งโมดูล)
**Modularity** คือการแบ่งซอฟต์แวร์ออกเป็น **Module** อิสระที่แก้ไขได้โดยไม่กระทบ Module อื่น

**ประโยชน์ของ Modularization:**

| ประโยชน์ | คำอธิบาย |
|---|---|
| Functional Separation | แบ่งตามหน้าที่งาน ชัดเจน |
| Reusability | Module ใช้ได้กับ Application อื่น |
| Parallel Development | หลายทีมพัฒนาพร้อมกัน |
| Testability | ทดสอบแต่ละ Module แยกกันได้ง่ายขึ้น |
| Concurrent Execution | รัน Module หลายตัวพร้อมกันได้ |

#### 5. Information Hiding (การซ่อนข้อมูล)
**Information Hiding** คือแต่ละ Module ซ่อน Internal Details ของตัวเอง และสื่อสารกับ Module อื่นผ่าน **Well-Defined Interfaces** เท่านั้น

- Algorithm และ Data ภายใน Module ไม่ควรเข้าถึงได้จากภายนอก
- ให้ประโยชน์มากที่สุดในช่วง Testing และ Software Maintenance

> **ตัวอย่างจริง:** Class `BankAccount` ซ่อน `balance` เป็น Private — ภายนอกเรียกใช้ได้แค่ `deposit()`, `withdraw()`, `getBalance()` เท่านั้น ไม่สามารถแก้ไข `balance` โดยตรงได้

#### 6. Functional Independence (ความเป็นอิสระเชิงหน้าที่)
**Functional Independence** คือการพัฒนา Module ที่มีหน้าที่ **Single-Minded** โดยไม่พึ่งพา Module อื่นมากเกินไป

วัดด้วย 2 เกณฑ์หลัก:

| เกณฑ์ | ความหมาย | เป้าหมาย |
|---|---|---|
| **Cohesion** | ความเกาะเกี่ยวภายใน Module | **High Cohesion** ✅ |
| **Coupling** | การพึ่งพากันระหว่าง Module | **Low Coupling** ✅ |

**Cohesion Types (จากดีที่สุด → แย่ที่สุด):**
```
Functional > Sequential > Communicational > Procedural > Temporal > Logical > Coincidental
     High Cohesion (ดี)                                          Low Cohesion (แย่)
```

**Coupling Types (จากดีที่สุด → แย่ที่สุด):**
```
Data > Stamp > Control > External > Common > Content
  Low Coupling (ดี)                  High Coupling (แย่)
```

> **หลักทองของ Software Design:** "High Cohesion + Low Coupling = Good Design"

> **ตัวอย่างจริง:**
> - ❌ **Coincidental Cohesion (แย่):** Module `Utilities` ที่รวม `calculateTax()`, `sendEmail()`, `resizeImage()` ไว้ด้วยกัน — ไม่มีความสัมพันธ์กัน
> - ✅ **Functional Cohesion (ดี):** Module `TaxCalculator` ที่มีแค่ `calculateIncomeTax()`, `calculateVAT()`, `applyTaxDeduction()` — ล้วนเกี่ยวกับภาษีทั้งหมด

#### 7. Refinement (การปรับละเอียด)
**Refinement** คือการแปลง Specification ระดับ Abstract ให้กลายเป็น Program ที่ Execute ได้ระดับ Concrete ทีละขั้น (**Stepwise Refinement**)

```text
ตัวอย่าง Stepwise Refinement:

Level 1 (Abstract):  "Open door"

Level 2 (Refined):   walk to door;
                     reach for knob;
                     open door; walk through; close door.

Level 3 (Detailed):  repeat until door opens
                       turn knob clockwise;
                       if knob does not turn, then
                         take key out; find correct key; insert in lock;
                       endif
                       pull/push door
                     end repeat
```

> Abstraction และ Refinement เป็น **แนวคิดเสริมกัน** — Abstraction มองภาพรวม, Refinement ลงรายละเอียด

#### 8. Refactoring (การปรับโครงสร้างโค้ด)
**Refactoring** คือการ Reorganize Design หรือ Code เพื่อให้ **ง่ายขึ้น โดยที่ Behavior/Function ไม่เปลี่ยน**

- ตรวจสอบหา: Redundancy, Unused Elements, Inefficient Algorithms, Poor Data Structures
- แก้ไข "Design Failure" เพื่อให้ได้ Design ที่ดีขึ้น

> **ตัวอย่างจริง:** นำ Code ที่ Copy-Paste ซ้ำ 5 ที่มารวมเป็น Function เดียว, เปลี่ยน Long Method เป็น Method เล็กๆ หลายตัว, Extract Class จาก God Object

#### 9. Design Classes
**Design Classes** คือการ Refine Analysis Classes ให้มีรายละเอียดพอสำหรับ Implementation

5 ประเภทของ Design Classes:

| ประเภท | บทบาท | ตัวอย่าง |
|---|---|---|
| **User Interface Classes** | จัดการ Interaction กับผู้ใช้ | LoginForm, DashboardView |
| **Business Domain Classes** | Logic หลักของธุรกิจ | Order, Product, Customer |
| **Process Classes** | กระบวนการที่ซับซ้อน | PaymentProcessor, ReportGenerator |
| **Persistent Classes** | จัดการข้อมูลใน Database | OrderRepository, UserDAO |
| **System Classes** | Infrastructure/Utilities | Logger, EmailService, Config |

---

### 2.2 Object-Oriented Methodology

**Object-Oriented Methodology (OOM)** มี **3 คุณสมบัติหลัก (Pillars of OOP):**

#### คำศัพท์พื้นฐาน OOP

| คำศัพท์ | ความหมาย |
|---|---|
| **Class** | Blueprint ที่อธิบาย Attributes และ Operations ของ Object |
| **Object** | Instance ของ Class — Component จริงที่ทำงาน |
| **Method** | Action ที่ Object สามารถทำได้ |
| **Message** | การเรียกให้ Object Execute Method |

#### Encapsulation (การห่อหุ้ม)
**Encapsulation** คือการรวม Attributes และ Methods ไว้ใน Class เดียว และซ่อน Internal Details จากภายนอก

- ข้อมูลภายใน Class เข้าถึงได้ผ่าน Interface ที่ Class กำหนดเท่านั้น
- **Data Hiding:** ป้องกัน Direct Access → ลด Side Effects, รักษา Data Integrity

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance   # Private attribute

    def deposit(self, amount):     # Public Interface
        if amount > 0:
            self.__balance += amount

    def get_balance(self):         # Controlled Access
        return self.__balance
```

#### Inheritance (การสืบทอด)
**Inheritance** คือการนำ Class ที่มีอยู่แล้วมาต่อยอดด้วย Attributes หรือ Operations ใหม่ — **Reuse Existing Classes**

| ประเภท | คำอธิบาย | รองรับโดย |
|---|---|---|
| **Single Inheritance** | มี Parent Class เดียว | Java, Python, C++ |
| **Multiple Inheritance** | มีหลาย Parent Class | Python, C++ (ไม่รองรับใน Java) |

```python
class Person:
    def __init__(self, name):
        self.name = name

class Employee(Person):        # สืบทอดจาก Person
    def __init__(self, name, emp_id):
        super().__init__(name)
        self.emp_id = emp_id
```

> **หมายเหตุ:** นักออกแบบต้องรู้ว่าภาษาที่เลือกรองรับ Inheritance ประเภทใดบ้าง

#### Polymorphism (พหุรูป)
**Polymorphism** คือความสามารถที่ Object ต่าง Class กัน ตอบสนองต่อ Method เดียวกันในแบบของตัวเอง

```python
class Person:
    def compute_pay(self): return "Base salary"

class Employee(Person):
    def compute_pay(self): return "Salary + Benefits"  # Override

class Customer(Person):
    def compute_pay(self): return "Bill amount"        # Override

# Polymorphism ในทางปฏิบัติ
people = [Person(), Employee(), Customer()]
for p in people:
    print(p.compute_pay())  # Method เดียวกัน → ผลลัพธ์ต่างกัน
```

---

## Part 3: Applied Techniques

### 3.1 Class Design Activities

วัตถุประสงค์ของ Class Design:
- ตรวจสอบว่า Class ให้ Behavior ที่ Use-Case Realizations ต้องการ
- ให้ข้อมูลเพียงพอสำหรับ Implementation โดยไม่กำกวม
- จัดการ Non-Functional Requirements ที่เกี่ยวกับ Class

**กระบวนการ Class Design:**
1. **Adding Specifications** — เพิ่มรายละเอียดให้ Model
2. **Identifying Reuse Opportunities** — หา Class ที่ใช้ซ้ำได้
3. **Restructuring** — ปรับโครงสร้าง Design
4. **Optimizing** — ปรับปรุงประสิทธิภาพ
5. **Mapping to Language** — แปลง Class สู่ภาษาโปรแกรม

#### Adding Specifications

**A. ตรวจสอบ Analysis Models ปัจจุบัน:**
- Class ทุกตัวจำเป็นและเพียงพอ ไม่มี Attribute/Method ที่หายหรือเกิน

**B. Visibility Modifiers:**
```
+ Public    : มองเห็นได้จาก Class อื่น
- Private   : มองเห็นได้เฉพาะภายใน Class
# Protected : มองเห็นได้เฉพาะ Class และ Subclass
```

**C. Method Signatures:** ชื่อ Method, Parameters, Return Type

**D. Constraints:**
- **Preconditions:** เงื่อนไขก่อน Method ทำงาน
- **Postconditions:** เงื่อนไขหลัง Method ทำงาน
- **Invariants:** เงื่อนไขที่ต้องเป็นจริงตลอดเวลา

#### Method Specification

| ส่วนประกอบ | เนื้อหา |
|---|---|
| **General Information** | ชื่อ Method, ชื่อ Class, วัตถุประสงค์ |
| **Events** | สิ่งที่ Trigger Method (Mouse Click, API Call) |
| **Message Passing** | Parameters ที่ส่งเข้าและ Return |
| **Algorithm Specifications** | Logic (Pseudocode) |
| **Other Info** | การคำนวณ, Procedure Calls |

---

### 3.2 Structure Chart & Program Design

#### Structure Chart (แผนภาพโครงสร้าง)
**Structure Chart** แสดงการจัดระเบียบและ Interaction ของ Code ในรูปแบบ Hierarchical ที่แสดง Sequence, Selection, Iteration

```text
ตัวอย่าง Structure Chart:

               +─────────────────+
               |   Main Program  |
               +────────+────────+
       +────────────────+────────────────+
       |                |                |
+──────────+    +──────────────+    +──────────+
| Get Input|    | Process Data |    |  Output  |
+──────────+    +──────+───────+    +──────────+
                +──────+──────+
                |             |
         +──────────+  +──────────+
         |Validate  |  |Calculate |
         +──────────+  +──────────+
```

#### Fan-In และ Fan-Out

| เมตริก | ความหมาย | เป้าหมาย |
|---|---|---|
| **High Fan-In** | หลาย Module เรียกใช้ Module เดียว | ✅ ดี — Reuse สูง |
| **Low Fan-In** | มีแค่ Module เดียวเรียก | ⚠️ ปกติ แต่ระวัง Code Duplication |
| **Low Fan-Out** | Control Module เรียก Subordinate ≤7 ตัว | ✅ ดี |
| **High Fan-Out** | Subordinate มากเกินไป | ❌ ซับซ้อน ควรแบ่งระดับ |

> **กฎทั่วไป:** จำกัด Subordinate ไว้ที่ **~7 Module** ต่อ Control Module

> **ตัวอย่าง High Fan-In:** `ERROR_LOGGER` ถูกเรียกโดยทุก Module ในระบบ — แก้ Bug ครั้งเดียว ทุก Module ได้รับประโยชน์ทันที (Single Point of Fix)

---

### 3.3 Program Specification

**Program Specification** คือนิยามว่าโปรแกรมต้องทำอะไร เป็น Blueprint สำหรับ Developer

**4 ส่วนประกอบหลัก:**

| ส่วนประกอบ | เนื้อหา |
|---|---|
| **Program Information** | ชื่อโปรแกรม, วัตถุประสงค์, Class ที่เกี่ยวข้อง |
| **Events** | เหตุการณ์ที่ Trigger (User Action, Timer, System Event) |
| **Inputs and Outputs** | ข้อมูลรับ/ส่ง, Format, Validation Rules |
| **Pseudocode** | Logic การทำงาน |

```text
ตัวอย่าง Pseudocode: Process Customer Order
Trigger: Customer clicks "Submit Order"

BEGIN
  VALIDATE order_items not empty
  VALIDATE customer has shipping address

  FOR EACH item IN order_items DO
    CHECK inventory
    IF insufficient stock THEN
      NOTIFY customer; REMOVE item
    END IF
  END FOR

  CALCULATE total = SUM(item.price * item.qty)
  APPLY discount IF customer.is_premium

  CALL payment_processor.charge(customer, total)
  IF payment_success THEN
    CREATE order record; SEND confirmation email; UPDATE inventory
  ELSE
    NOTIFY customer of payment failure
  END IF
END
```

---

## Part 4: Common Pitfalls & Exam Points

### ❌ ข้อผิดพลาดที่พบบ่อย

| ข้อผิดพลาด | คำอธิบาย | วิธีแก้ |
|---|---|---|
| **สับสน Cohesion กับ Coupling** | คิดว่า High Coupling ดี หรือ Low Cohesion ดี | จำ: High Cohesion + Low Coupling = Good |
| **Abstraction ≠ Vagueness** | Abstraction ไม่ใช่การพูดเลือน | ระบุระดับของ Abstraction ให้ชัด |
| **Refactoring ≠ Rewriting** | Refactoring ไม่เปลี่ยน Behavior | ถ้า Behavior เปลี่ยน = ไม่ใช่ Refactoring |
| **Fan-Out สูงเกินไป** | Control Module ดูแล Subordinate >7 ตัว | แบ่งงานเป็น Sub-Controller |
| **God Object** | Class เดียวรับผิดชอบทุกอย่าง | ใช้ Single Responsibility Principle |

### 📌 สรุปสำหรับสอบ

| แนวคิด | Core Idea | เป้าหมาย |
|---|---|---|
| **Abstraction** | ซ่อนรายละเอียด, โฟกัสสิ่งสำคัญ | — |
| **Modularity** | แบ่ง → พัฒนาแยก → รวมกัน | — |
| **Cohesion** | ความเกาะเกี่ยวภายใน | **High** ✅ |
| **Coupling** | การพึ่งพาระหว่าง Module | **Low** ✅ |
| **Encapsulation** | ซ่อน Data, เปิด Interface | — |
| **Inheritance** | Reuse + ต่อยอด | — |
| **Polymorphism** | Method เดียว, Behavior ต่างกัน | — |
| **Fan-In** | หลาย Module เรียกตัวเดียว | **High** ✅ |
| **Fan-Out** | ตัวเดียวเรียกหลาย Module | **Low** ✅ |
| **Refactoring** | เปลี่ยนโครงสร้าง, ไม่เปลี่ยน Behavior | — |

---

## Backlinks

- [[ISAD - Unit 09 User Interface Design]] — Unit ก่อนหน้า: UI/UX Design และ User-Facing Interface
- [[ISAD - Vault Map]] — แผนที่รวมทุก Unit ของวิชา ISAD