# Database - LAB 8: SQL GROUP BY and Aggregate Functions

> **วิชา:** 06066300 Database System Concept | **สถาบัน:** มหาวิทยาลัย
> **Source:** `Resources/Books/Database/lab DB/DB66-LAB 8-Group By Function.pdf`

---

## Part 1: Macro Architecture & Overview

**Aggregate Functions** คือฟังก์ชันที่ทำการคำนวณบน **กลุ่มข้อมูล (Group)** และ return ค่าเดียว เช่น ผลรวม, ค่าเฉลี่ย, จำนวนนับ **GROUP BY** คือ clause ที่ใช้แบ่งข้อมูลออกเป็นกลุ่มเพื่อให้ Aggregate Functions คำนวณทีละกลุ่ม และ **HAVING** คือ WHERE ของกลุ่มข้อมูล

```text
ข้อมูลดิบ (raw data)
        │
        ▼
   GROUP BY           ← แบ่งออกเป็นกลุ่ม
        │
        ▼
Aggregate Functions  ← คำนวณในแต่ละกลุ่ม (COUNT, SUM, AVG, MAX, MIN)
        │
        ▼
    HAVING            ← กรองกลุ่ม (optional)
        │
        ▼
   Result Set         ← 1 แถวต่อ 1 กลุ่ม
```

### ตารางสรุป Aggregate Functions

| Function | ความหมาย | นับ NULL? | ใช้กับ |
| :--- | :--- | :--- | :--- |
| `COUNT(*)` | นับจำนวนทุกแถว | ✅ นับ NULL | ทุก data type |
| `COUNT(col)` | นับจำนวนแถวที่ไม่ใช่ NULL | ❌ ไม่นับ NULL | ทุก data type |
| `COUNT(DISTINCT col)` | นับค่าที่ไม่ซ้ำ | ❌ ไม่นับ NULL | ทุก data type |
| `SUM(col)` | รวมค่า | ❌ ข้าม NULL | ตัวเลข |
| `AVG(col)` | ค่าเฉลี่ย | ❌ ข้าม NULL | ตัวเลข |
| `MAX(col)` | ค่าสูงสุด | ❌ ข้าม NULL | ตัวเลข, ข้อความ, วันที่ |
| `MIN(col)` | ค่าต่ำสุด | ❌ ข้าม NULL | ตัวเลข, ข้อความ, วันที่ |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Aggregate Functions พื้นฐาน

**ใช้ได้โดยไม่ต้องมี GROUP BY** — คำนวณบนทั้งตาราง

```sql
-- นับจำนวนพนักงานทั้งหมด
SELECT COUNT(*) AS total_employees
FROM employees;

-- เงินเดือนเฉลี่ย, สูงสุด, ต่ำสุด, รวม
SELECT 
    AVG(salary)  AS avg_salary,
    MAX(salary)  AS max_salary,
    MIN(salary)  AS min_salary,
    SUM(salary)  AS total_salary
FROM employees;

-- นับเฉพาะคนที่มี department (ไม่นับ NULL)
SELECT COUNT(department_id) AS employees_with_dept
FROM employees;
```

---

### 2.2 GROUP BY

> **GROUP BY** ใช้แบ่งข้อมูลเป็น subgroup ตามค่าของคอลัมน์ที่ระบุ และ Aggregate Function จะคำนวณทีละกลุ่ม ผลลัพธ์จะมี **1 แถวต่อ 1 กลุ่ม** 

**กฎสำคัญของ GROUP BY:**

> ใน SELECT ทุก column ที่ไม่ใช่ Aggregate Function **ต้องอยู่ใน GROUP BY** มิฉะนั้นจะ Error

```sql
-- Syntax
SELECT column1, AGGREGATE_FUNCTION(column2)
FROM table
GROUP BY column1;  -- ต้องระบุ column1 ที่อยู่ใน SELECT
```

**ตัวอย่าง:**

```sql
-- จำนวนพนักงานในแต่ละแผนก
SELECT department_id, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id;
-- ผลลัพธ์: 1 แถวต่อ 1 department_id

-- เงินเดือนเฉลี่ยในแต่ละแผนก
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
ORDER BY avg_salary DESC;

-- กลุ่มตาม department AND job
SELECT department_id, job_id, COUNT(*) AS count
FROM employees
GROUP BY department_id, job_id;  -- ทุก column ที่ไม่ใช่ Aggregate ต้องอยู่ใน GROUP BY
```

---

### 2.3 HAVING

> **HAVING** คือ filter ที่ใช้กรอง **หลังจาก GROUP BY** ทำงานแล้ว เปรียบเหมือน WHERE แต่ใช้กับกลุ่มข้อมูล สามารถใช้ Aggregate Function ใน HAVING condition ได้

**ความแตกต่างระหว่าง WHERE และ HAVING:**

| ข้อ | WHERE | HAVING |
| :--- | :--- | :--- |
| กรองอะไร | แถวดิบ (row) ก่อน GROUP BY | กลุ่ม (group) หลัง GROUP BY |
| ใช้ Aggregate Function ได้ไหม | ❌ ไม่ได้ | ✅ ได้ |
| ตำแหน่ง | ก่อน GROUP BY | หลัง GROUP BY |

```sql
-- HAVING Syntax
SELECT column, AGGREGATE_FUNCTION(col)
FROM table
WHERE condition           -- กรองแถวก่อน grouping (optional)
GROUP BY column
HAVING aggregate_condition;  -- กรองหลัง grouping
```

**ตัวอย่าง:**

```sql
-- แผนกที่มีพนักงานมากกว่า 5 คน
SELECT department_id, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;

-- แผนกที่มีเงินเดือนเฉลี่ยสูงกว่า 8000
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 8000
ORDER BY avg_salary DESC;

-- ใช้ WHERE และ HAVING ร่วมกัน
-- WHERE กรองก่อน, HAVING กรองหลัง
SELECT department_id, COUNT(*) AS emp_count
FROM employees
WHERE salary > 5000           -- กรองเฉพาะคนที่เงินเดือน > 5000 ก่อน
GROUP BY department_id
HAVING COUNT(*) >= 3;         -- จากนั้นเลือกเฉพาะแผนกที่มีคนที่ผ่านเงื่อนไข >= 3 คน
```

---

### 2.4 การ GROUP BY กับ JOIN

สามารถใช้ GROUP BY ร่วมกับ JOIN เพื่อดึงชื่อที่อ่านง่ายแทน ID

```sql
-- จำนวนพนักงานในแต่ละแผนก พร้อมชื่อแผนก
SELECT d.department_name, COUNT(e.employee_id) AS emp_count
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY emp_count DESC;

-- เงินเดือนเฉลี่ยแต่ละแผนก พร้อมชื่อแผนก เฉพาะแผนกที่ avg > 7000
SELECT d.department_name, AVG(e.salary) AS avg_salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
HAVING AVG(e.salary) > 7000
ORDER BY avg_salary DESC;
```

---

### 2.5 ORDER ของ SQL Clauses (สำคัญมาก)

SQL clauses ต้องเรียงในลำดับที่กำหนดเท่านั้น:

```sql
SELECT   column, AGGREGATE(col)    -- 1. ระบุ column ที่ต้องการ
FROM     table                     -- 2. ระบุตาราง
[JOIN    other_table ON ...]       -- 3. JOIN (optional)
WHERE    row_condition             -- 4. กรองแถวก่อน GROUP (optional)
GROUP BY column                   -- 5. จัดกลุ่ม (optional)
HAVING   group_condition          -- 6. กรองกลุ่ม (optional)
ORDER BY column                   -- 7. เรียงลำดับ (optional)
[LIMIT   n];                      -- 8. จำกัดจำนวน (optional)
```

> **จำง่าย:** `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`
> ย่อ: **SF W G H O** (Safe Fish With Green Herb Onion)

---

### 2.6 COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)

```sql
-- ตัวอย่างข้อมูล employees:
-- emp_id: 1, 2, 3, 4, 5
-- department_id: 10, 10, NULL, 20, 10

SELECT
    COUNT(*)                    AS total_rows,       -- 5 (นับทุกแถวรวม NULL)
    COUNT(department_id)        AS has_dept,         -- 4 (ไม่นับ NULL)
    COUNT(DISTINCT department_id) AS unique_dept     -- 2 (10 และ 20)
FROM employees;
```

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

- [ ] **Aggregate Functions:** COUNT, SUM, AVG, MAX, MIN — ส่วนใหญ่ไม่นับ NULL (ยกเว้น COUNT(*))
- [ ] **GROUP BY:** แบ่งกลุ่ม — ทุก column ใน SELECT ที่ไม่ใช่ Aggregate ต้องอยู่ใน GROUP BY
- [ ] **HAVING:** กรองกลุ่ม (หลัง GROUP BY) — ใช้ Aggregate Function ได้
- [ ] **WHERE:** กรองแถว (ก่อน GROUP BY) — ใช้ Aggregate Function ไม่ได้
- [ ] **Clause Order:** `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`
- [ ] **COUNT(*) vs COUNT(col):** `COUNT(*)` นับ NULL, `COUNT(col)` ไม่นับ NULL

### สรุปสูตร / Notation

| Function | Syntax | ตัวอย่าง |
| :--- | :--- | :--- |
| `COUNT(*)` | `COUNT(*)` | `SELECT COUNT(*) FROM emp;` |
| `COUNT(col)` | `COUNT(column)` | `COUNT(department_id)` |
| `COUNT DISTINCT` | `COUNT(DISTINCT col)` | `COUNT(DISTINCT dept_id)` |
| `SUM` | `SUM(column)` | `SUM(salary)` |
| `AVG` | `AVG(column)` | `AVG(salary)` |
| `MAX` | `MAX(column)` | `MAX(salary)` |
| `MIN` | `MIN(column)` | `MIN(salary)` |

### Concept Map

```text
Aggregate Query Pipeline
│
SELECT [col], [AGGREGATE(col)]
    │
FROM [table]
    │
WHERE [row filter]       ← กรองแถวก่อน
    │
GROUP BY [col]           ← แบ่งกลุ่ม
    │
    ├── COUNT(*)         ← นับทุกแถวในกลุ่ม (รวม NULL)
    ├── COUNT(col)       ← นับที่ไม่ใช่ NULL ในกลุ่ม
    ├── SUM(col)         ← รวมในกลุ่ม
    ├── AVG(col)         ← เฉลี่ยในกลุ่ม
    ├── MAX(col)         ← สูงสุดในกลุ่ม
    └── MIN(col)         ← ต่ำสุดในกลุ่ม
    │
HAVING [group filter]    ← กรองกลุ่มหลัง aggregate
    │
ORDER BY [col]           ← เรียงลำดับผลลัพธ์
```

---

## ⚠️ Common Pitfalls & Exam Traps

- **ใส่ column ใน SELECT แต่ไม่ใส่ใน GROUP BY:** Error ทันที — "column must appear in GROUP BY clause or be used in an aggregate function"
- **ใช้ Aggregate Function ใน WHERE:** Error — ต้องใช้ใน HAVING แทน เช่น `WHERE COUNT(*) > 5` → ผิด ต้องเป็น `HAVING COUNT(*) > 5`
- **COUNT(*) vs COUNT(col) สับสน:** ถ้าต้องการนับแถวทั้งหมดใช้ `COUNT(*)` ถ้าต้องการนับเฉพาะที่ไม่ใช่ NULL ใช้ `COUNT(col)`
- **AVG ไม่นับ NULL — อาจให้ผลผิด:** ถ้าต้องการ AVG ที่นับ NULL เป็น 0 ต้องใช้ `SUM(col) / COUNT(*)` แทน `AVG(col)`
- **GROUP BY ต้องใช้ชื่อคอลัมน์ ไม่ใช่ Alias:** บางระบบ (เช่น Oracle) ไม่รับ Alias ใน GROUP BY — ต้องใช้ชื่อจริงของคอลัมน์
- **HAVING กับ WHERE ใช้ร่วมกันได้:** WHERE กรองก่อน GROUP BY, HAVING กรองหลัง — ใช้ร่วมกันได้และสามารถเพิ่มประสิทธิภาพโดยกรอง WHERE ก่อน

---

## แบบฝึกหัด (Practice Exercises)

ใช้ Schema: `employees`, `departments` (HR Schema)

### ระดับ Basic

**ข้อ 1:** นับจำนวนพนักงานทั้งหมดในบริษัท

**ข้อ 2:** หาเงินเดือนสูงสุด ต่ำสุด และค่าเฉลี่ยของพนักงานทั้งบริษัท

**ข้อ 3:** นับจำนวนพนักงานในแต่ละ department_id (GROUP BY department_id)

### ระดับ Intermediate

**ข้อ 4:** แสดงชื่อแผนก (department_name) และจำนวนพนักงานในแต่ละแผนก โดย JOIN กับ departments table

**ข้อ 5:** แสดง department_id และเงินเดือนเฉลี่ย เฉพาะแผนกที่มีเงินเดือนเฉลี่ยมากกว่า 6,000

**ข้อ 6:** แสดง department_name และจำนวนพนักงาน เฉพาะแผนกที่มีพนักงานมากกว่า 5 คน เรียงตามจำนวนมากไปน้อย

### ระดับ Application

**ข้อ 7:** แสดง department_name และเงินเดือนรวม (SUM) ของพนักงานที่มีเงินเดือน > 5,000 เฉพาะแผนกที่เงินเดือนรวมมากกว่า 50,000

**ข้อ 8:** นับจำนวน department ที่มีพนักงานอยู่จริง (ใช้ COUNT DISTINCT)

---

### เฉลย

```sql
-- ข้อ 1: จำนวนพนักงานทั้งหมด
SELECT COUNT(*) AS total_employees
FROM employees;

-- ข้อ 2: เงินเดือน max, min, avg
SELECT 
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary,
    ROUND(AVG(salary), 2) AS avg_salary
FROM employees;

-- ข้อ 3: จำนวนพนักงานต่อแผนก
SELECT department_id, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
ORDER BY department_id;

-- ข้อ 4: ชื่อแผนก + จำนวนพนักงาน (JOIN)
SELECT d.department_name, COUNT(e.employee_id) AS emp_count
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name;

-- ข้อ 5: เงินเดือนเฉลี่ย > 6000
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 6000;

-- ข้อ 6: แผนกที่มีพนักงาน > 5 คน
SELECT d.department_name, COUNT(e.employee_id) AS emp_count
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY emp_count DESC;

-- ข้อ 7: เงินเดือนรวมต่อแผนก (WHERE + GROUP BY + HAVING)
SELECT d.department_name, SUM(e.salary) AS total_salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 5000                -- กรองพนักงานก่อน
GROUP BY d.department_name
HAVING SUM(e.salary) > 50000;       -- กรองแผนกหลัง

-- ข้อ 8: จำนวน department ที่มีพนักงาน
SELECT COUNT(DISTINCT department_id) AS active_departments
FROM employees
WHERE department_id IS NOT NULL;
```

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- **วิชาและหัวข้อที่เกี่ยวข้อง:**
  - [[LAB 6 - SQL JOIN (Inner, Cross, Natural, Self)]] (JOIN ที่มักใช้ก่อน GROUP BY เพื่อดึงชื่อแทน ID)
  - [[LAB 7 - SQL OUTER JOIN (Left, Right, Full)]] (OUTER JOIN + GROUP BY สำหรับ Reporting ที่รวมแผนกว่าง)
  - [[LAB 9 - SQL Subqueries]] (Subquery สามารถใช้แทน HAVING ได้ในบางกรณี)
  - [[LAB 4 - SQL SELECT]] (SELECT พื้นฐานก่อนเรียน GROUP BY)

- **แหล่งข้อมูล:**
  - Source: `Resources/Books/Database/lab DB/DB66-LAB 8-Group By Function.pdf`
