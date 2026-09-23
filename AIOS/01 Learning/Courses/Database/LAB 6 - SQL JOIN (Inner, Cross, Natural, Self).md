# Database - LAB 6: SQL JOIN (Inner, Cross, Natural, Self Join)

> **วิชา:** 06066300 Database System Concept | **สถาบัน:** มหาวิทยาลัย
> **Source:** `Resources/Books/Database/lab DB/DB66-LAB 6-Join (1).pdf`

---

## Part 1: Macro Architecture & Overview

**JOIN** คือการรวมข้อมูลจากตั้งแต่ 2 ตารางขึ้นไปเข้าด้วยกัน โดยอาศัยเงื่อนไขความสัมพันธ์ระหว่างคอลัมน์ ซึ่งเป็นหัวใจสำคัญของ Relational Database เพราะข้อมูลในระบบจริงถูกจัดเก็บแยกตารางตามหลัก Normalization การ JOIN จึงเป็นวิธีนำข้อมูลกลับมาใช้ร่วมกัน

```text
ตารางที่ 1 (Left Table)         ตารางที่ 2 (Right Table)
┌──────────────┐                ┌──────────────┐
│ col_A | col_B│                │ col_B | col_C│
└──────┬───────┘                └───────┬──────┘
       │                                │
       └──────── JOIN Condition ────────┘
                       │
                       ▼
                ┌─────────────────┐
                │  Result Set     │
                │col_A|col_B|col_C│
                └─────────────────┘
```

### ตารางเปรียบเทียบ JOIN ประเภทต่างๆ

| JOIN Type | คำอธิบาย | เงื่อนไข | ผลลัพธ์ |
| :--- | :--- | :--- | :--- |
| **CROSS JOIN** | Cartesian Product — คูณทุก row ของทั้งสองตาราง | ไม่มีเงื่อนไข | m × n rows |
| **INNER JOIN** | เฉพาะ row ที่ตรงเงื่อนไขทั้งสองฝั่ง | ON / WHERE | แถวที่ match เท่านั้น |
| **EQUI JOIN** | INNER JOIN ที่ใช้ `=` เป็นเงื่อนไข | `=` | แถวที่ค่าเท่ากัน |
| **NATURAL JOIN** | JOIN อัตโนมัติตามคอลัมน์ที่ชื่อเหมือนกัน | ชื่อคอลัมน์ตรงกัน | ไม่มีคอลัมน์ซ้ำ |
| **SELF JOIN** | JOIN ตารางเดียวกันกับตัวเอง | Alias ต่างกัน | ความสัมพันธ์ภายในตาราง |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 CROSS JOIN (Cartesian Product)

> **CROSS JOIN** คือการจับคู่ทุก row ของตาราง A กับทุก row ของตาราง B โดยไม่มีเงื่อนไขใดๆ ผลลัพธ์คือ **m × n rows** โดยที่ m และ n คือจำนวน row ของแต่ละตาราง

**เมื่อไหร่ใช้:** ใช้เมื่อต้องการ generate ทุก combination ที่เป็นไปได้ เช่น สินค้า × สี, ขนาด × วัสดุ

```sql
-- CROSS JOIN Syntax
SELECT t1.col1, t2.col2
FROM table1 t1
CROSS JOIN table2 t2;

-- ผลลัพธ์: ถ้า table1 มี 3 rows, table2 มี 4 rows → ได้ 12 rows
```

**ตัวอย่าง:**

```sql
-- ตาราง employee (3 rows) × ตาราง department (4 rows) = 12 rows
SELECT e.emp_name, d.dept_name
FROM employee e
CROSS JOIN department d;
```

---

### 2.2 INNER JOIN (EQUI JOIN)

> **INNER JOIN** คือการ JOIN ที่ return เฉพาะแถวที่มีค่าตรงกัน (match) ในทั้งสองตาราง แถวที่ไม่มีคู่ match จะถูกตัดทิ้ง

**Syntax หลัก 2 แบบ:**

```sql
-- แบบที่ 1: ใช้ JOIN keyword + ON
SELECT columns
FROM table1
INNER JOIN table2 ON table1.key = table2.key;

-- แบบที่ 2: ใช้ WHERE (เก่ากว่า แต่ยังใช้งานได้)
SELECT columns
FROM table1, table2
WHERE table1.key = table2.key;
```

**ตัวอย่างจริง:**

```sql
-- JOIN employee กับ department เพื่อดูชื่อพนักงานพร้อมชื่อแผนก
SELECT e.emp_id, e.emp_name, d.dept_name
FROM employee e
INNER JOIN department d ON e.dept_id = d.dept_id;

-- เฉพาะ employee ที่มี dept_id อยู่ใน department จะปรากฏในผลลัพธ์
-- employee ที่ dept_id = NULL หรือไม่มีใน department จะถูกตัดออก
```

**การ JOIN มากกว่า 2 ตาราง:**

```sql
SELECT e.emp_name, d.dept_name, l.location_city
FROM employee e
INNER JOIN department d ON e.dept_id = d.dept_id
INNER JOIN location l   ON d.location_id = l.location_id;
```

---

### 2.3 NATURAL JOIN

> **NATURAL JOIN** คือ JOIN ที่ระบบ JOIN อัตโนมัติโดยใช้ **คอลัมน์ที่มีชื่อเหมือนกัน** ในทั้งสองตาราง โดยไม่ต้องระบุ ON และจะแสดงคอลัมน์ร่วมนั้นเพียงครั้งเดียวในผลลัพธ์

```sql
-- Syntax
SELECT *
FROM table1
NATURAL JOIN table2;

-- เทียบเท่ากับ INNER JOIN แต่ระบบหาเงื่อนไขให้อัตโนมัติ
```

**ตัวอย่าง:**

```sql
-- ถ้า employee มีคอลัมน์ dept_id และ department ก็มีคอลัมน์ dept_id
SELECT emp_name, dept_name
FROM employee
NATURAL JOIN department;
-- ระบบจะ JOIN บน dept_id อัตโนมัติ และแสดง dept_id เพียงครั้งเดียว
```

**ข้อควรระวัง:** ถ้าสองตารางมีหลายคอลัมน์ที่ชื่อเหมือนกัน ระบบจะ JOIN บนทุกคอลัมน์เหล่านั้น ซึ่งอาจให้ผลผิดพลาด

---

### 2.4 SELF JOIN

> **SELF JOIN** คือการ JOIN ตาราง **กับตัวมันเอง** โดยใช้ **Alias** 2 ชื่อเพื่อแยกแยะ เหมาะสำหรับข้อมูลที่มี **ลำดับชั้น (Hierarchy)** ในตารางเดียว เช่น พนักงาน-หัวหน้า, หมวดหมู่-หมวดหมู่ย่อย

```sql
-- Syntax: ต้องใส่ Alias ทั้งสองฝั่ง
SELECT a.column, b.column
FROM table_name a
INNER JOIN table_name b ON a.key = b.related_key;
```

**ตัวอย่าง: หาชื่อพนักงานพร้อมชื่อหัวหน้า**

```sql
-- ตาราง employee มี columns: emp_id, emp_name, manager_id
-- manager_id อ้างอิงกลับมายัง emp_id

SELECT 
    e.emp_name   AS "ชื่อพนักงาน",
    m.emp_name   AS "ชื่อหัวหน้า"
FROM employee e
INNER JOIN employee m ON e.manager_id = m.emp_id;

-- พนักงานที่ manager_id = NULL (CEO) จะไม่ปรากฏ เพราะ INNER JOIN
-- ถ้าต้องการรวม CEO ด้วยต้องใช้ LEFT JOIN แทน
```

---

### 2.5 การใช้ Table Alias

**Alias** ช่วยให้ Query สั้นลงและอ่านง่ายขึ้น โดยเฉพาะเมื่อ JOIN หลายตาราง

```sql
-- ไม่ใช้ Alias (ยาวและอ่านยาก)
SELECT employee.emp_name, department.dept_name
FROM employee
INNER JOIN department ON employee.dept_id = department.dept_id;

-- ใช้ Alias (สั้นกว่า อ่านง่ายกว่า)
SELECT e.emp_name, d.dept_name
FROM employee e          -- e คือ alias ของ employee
INNER JOIN department d  -- d คือ alias ของ department
ON e.dept_id = d.dept_id;
```

---

### 2.6 Schema ที่ใช้ใน LAB 6 (HR Schema)

```sql
-- HR Schema (Oracle-style) — ใช้ทดสอบใน LAB
-- employees: employee_id, first_name, last_name, salary, department_id, manager_id
-- departments: department_id, department_name, manager_id, location_id
-- locations: location_id, city, country_id
-- jobs: job_id, job_title, min_salary, max_salary
```

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

- [ ] **CROSS JOIN:** ผลลัพธ์ = m × n rows ไม่มีเงื่อนไข — ระวัง result set ขนาดใหญ่มาก
- [ ] **INNER JOIN:** เฉพาะแถวที่ match — ใช้ ON หรือ WHERE ก็ได้
- [ ] **NATURAL JOIN:** JOIN อัตโนมัติตามชื่อคอลัมน์ที่เหมือนกัน — ไม่มี ON
- [ ] **SELF JOIN:** JOIN ตัวเอง ต้องใช้ Alias 2 ตัว — ใช้กับข้อมูล Hierarchy
- [ ] **Alias:** ใช้ `tablename alias` หรือ `tablename AS alias` ก็ได้
- [ ] **JOIN หลายตาราง:** ต่อ JOIN ซ้ำได้ไม่จำกัด

### สรุป Syntax Pattern

| JOIN Type | Syntax Pattern |
| :--- | :--- |
| CROSS JOIN | `FROM A CROSS JOIN B` |
| INNER JOIN | `FROM A INNER JOIN B ON A.key = B.key` |
| NATURAL JOIN | `FROM A NATURAL JOIN B` |
| SELF JOIN | `FROM T a INNER JOIN T b ON a.col = b.col` |
| WHERE style | `FROM A, B WHERE A.key = B.key` |

### Concept Map

```text
SQL JOIN
├── CROSS JOIN (Cartesian Product — ไม่มีเงื่อนไข)
│
├── INNER JOIN (เฉพาะที่ match)
│   ├── EQUI JOIN (ใช้ = เป็นเงื่อนไข) ← INNER JOIN ทั่วไป
│   └── NON-EQUI JOIN (ใช้ >, <, BETWEEN เป็นเงื่อนไข)
│
├── NATURAL JOIN (JOIN อัตโนมัติตามชื่อคอลัมน์)
│
└── SELF JOIN (JOIN กับตัวเอง — ต้องใช้ Alias)
```

---

## ⚠️ Common Pitfalls & Exam Traps

- **CROSS JOIN สร้าง row จำนวนมากโดยไม่ตั้งใจ:** ถ้าลืมใส่ WHERE ใน Old-style JOIN (`FROM A, B`) ผลลัพธ์จะเป็น Cartesian Product โดยไม่รู้ตัว — ตรวจสอบ WHERE เสมอ
- **NATURAL JOIN อันตรายเมื่อมีคอลัมน์ชื่อเหมือนกันหลายคอลัมน์:** ระบบจะ JOIN บนทุกคอลัมน์ที่ชื่อตรงกัน ซึ่งอาจทำให้ผลลัพธ์ผิดพลาดโดยไม่มี Error — ในงาน Production ควรใช้ INNER JOIN + ON แทน
- **SELF JOIN ลืม Alias:** หากไม่ใช้ Alias ระบบจะ Error เพราะ SQL ไม่รู้ว่า column ไหนมาจาก instance ไหน
- **INNER JOIN ตัด NULL ออก:** row ที่ Foreign Key เป็น NULL หรือไม่มีคู่ match จะหายไปจากผลลัพธ์ — ถ้าต้องการ row เหล่านี้ต้องใช้ OUTER JOIN
- **ชื่อคอลัมน์ซ้ำใน JOIN:** เมื่อ SELECT * จาก JOIN ที่มีชื่อคอลัมน์ซ้ำ ต้องระบุ `tablealias.columnname` เพื่อหลีกเลี่ยง Ambiguous Column Error

---

## แบบฝึกหัด (Practice Exercises)

ใช้ Schema: `employees`, `departments`, `locations` (HR Schema)

### ระดับ Basic

**ข้อ 1:** แสดงชื่อพนักงานทุกคน (first_name, last_name) พร้อมชื่อแผนก (department_name) ที่พวกเขาสังกัด โดยใช้ INNER JOIN

**ข้อ 2:** ถ้า departments มี 27 rows และ locations มี 23 rows — CROSS JOIN ระหว่าง 2 ตารางนี้จะได้ผลลัพธ์กี่ rows?

**ข้อ 3:** เขียน Query แสดงชื่อพนักงาน (first_name) และ department_name โดยใช้ NATURAL JOIN ระหว่าง employees และ departments

### ระดับ Intermediate

**ข้อ 4:** แสดงชื่อพนักงานแต่ละคน (first_name, last_name) พร้อมชื่อหัวหน้าของพวกเขา (manager first_name, manager last_name) โดยใช้ SELF JOIN — พนักงานที่ไม่มีหัวหน้าไม่ต้องแสดง

**ข้อ 5:** แสดงรายชื่อพนักงาน พร้อมชื่อแผนก และชื่อเมืองที่แผนกนั้นตั้งอยู่ โดย JOIN 3 ตารางเข้าด้วยกัน (employees → departments → locations)

**ข้อ 6:** แสดงพนักงานที่อยู่ในแผนกเดียวกับพนักงานที่มี last_name = 'King' (ไม่รวม King เอง)

### ระดับ Application

**ข้อ 7:** เขียน Query แสดงคู่พนักงานที่ทำงานในแผนกเดียวกัน (ใช้ SELF JOIN) โดยไม่แสดงคู่ซ้ำ เช่น ถ้าแสดง (A, B) แล้วไม่ต้องแสดง (B, A)

---

### เฉลย

```sql
-- ข้อ 1: INNER JOIN employees กับ departments
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- ข้อ 2: CROSS JOIN rows = 27 × 23 = 621 rows

-- ข้อ 3: NATURAL JOIN
SELECT first_name, department_name
FROM employees
NATURAL JOIN departments;

-- ข้อ 4: SELF JOIN หาชื่อหัวหน้า
SELECT e.first_name || ' ' || e.last_name  AS employee_name,
       m.first_name || ' ' || m.last_name  AS manager_name
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id;

-- ข้อ 5: JOIN 3 ตาราง
SELECT e.first_name, e.last_name, d.department_name, l.city
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN locations l   ON d.location_id = l.location_id;

-- ข้อ 6: พนักงานในแผนกเดียวกับ King
SELECT e.first_name, e.last_name
FROM employees e
INNER JOIN employees k ON e.department_id = k.department_id
WHERE k.last_name = 'King'
  AND e.employee_id != k.employee_id;

-- ข้อ 7: คู่พนักงานในแผนกเดียวกัน (ไม่ซ้ำ)
SELECT a.first_name AS emp1, b.first_name AS emp2, a.department_id
FROM employees a
INNER JOIN employees b ON a.department_id = b.department_id
WHERE a.employee_id < b.employee_id;  -- < ป้องกันคู่ซ้ำ
```

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- **วิชาและหัวข้อที่เกี่ยวข้อง:**
  - [[LAB 7 - SQL OUTER JOIN]] (JOIN ชนิด Outer ที่เก็บแถวที่ไม่ match ไว้ด้วย — ต่อเนื่องจาก LAB นี้)
  - [[LAB 5 - SQL SELECT with Conditions]] (WHERE clause ที่ใช้คู่กับ JOIN)
  - [[LAB 9 - SQL Subqueries]] (Subquery เป็นอีกวิธีที่ทำสิ่งเดียวกับ JOIN ได้บางกรณี)
  - [[Chapter 01 Introduction to Database System & Relational Model]] (พื้นฐาน Relational Model ที่ทำให้ JOIN มีความหมาย)

- **แหล่งข้อมูล:**
  - Source: `Resources/Books/Database/lab DB/DB66-LAB 6-Join (1).pdf`
