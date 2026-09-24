# Database - LAB 9: SQL Subqueries

> **วิชา:** 06066300 Database System Concept | **สถาบัน:** มหาวิทยาลัย
> **Source:** `Resources/Books/Database/lab DB/DB66-LAB 9-Subqueries.pdf`

---

## Part 1: Macro Architecture & Overview

**Subquery** (หรือ Inner Query / Nested Query) คือ SQL query ที่อยู่ภายใน query อื่น Subquery จะถูก execute ก่อน แล้วผลลัพธ์ถูกส่งต่อให้ Outer Query ใช้งาน เปรียบเหมือนการแบ่งปัญหาซับซ้อนออกเป็น 2 ขั้นตอน — ถามคำถามย่อยก่อน แล้วนำคำตอบมาใช้ถามคำถามหลัก

```text
Outer Query (คำถามหลัก)
│
│   SELECT ...
│   FROM   ...
│   WHERE  col IN ( ← Subquery ฝังอยู่ตรงนี้
│       SELECT col
│       FROM   other_table
│       WHERE  condition
│   )
│
└── Subquery execute ก่อน → ส่งผลลัพธ์ให้ Outer Query
```

### ตารางเปรียบเทียบ Subquery ประเภทต่างๆ

| ประเภท | ตำแหน่ง | ผลลัพธ์ที่คืน | ใช้ with |
| :--- | :--- | :--- | :--- |
| **Single-Row Subquery** | WHERE | 1 ค่า (scalar) | `=`, `<`, `>`, `!=` |
| **Multi-Row Subquery** | WHERE | หลายค่า | `IN`, `ANY`, `ALL`, `EXISTS` |
| **Correlated Subquery** | WHERE/SELECT | ขึ้นกับ Outer row | `EXISTS`, `NOT EXISTS` |
| **Inline View** | FROM | Virtual table | JOIN, WHERE |
| **Scalar Subquery** | SELECT | 1 ค่าต่อแถว | แสดงผลใน SELECT |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Single-Row Subquery

> > **Single-Row Subquery** คือ Subquery ที่ return ค่า **เพียง 1 ค่า (scalar)** ใช้กับ Comparison Operators ทั่วไป เช่น `=, >, <, !=`

```sql
-- Syntax
SELECT columns
FROM table
WHERE column operator (
    SELECT single_value
    FROM other_table
    WHERE condition
);
```

**ตัวอย่าง:**

```sql
-- หาพนักงานที่มีเงินเดือนสูงกว่าค่าเฉลี่ยของบริษัท
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)     -- Subquery return ค่าเดียว เช่น 6461.68
    FROM employees
);

-- หาพนักงานที่อยู่ใน department เดียวกับ 'Abel'
SELECT first_name, last_name
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM employees
    WHERE last_name = 'Abel'  -- ต้องมีแค่ 1 row ไม่งั้น Error
);

-- หาพนักงานที่ได้รับเงินเดือนสูงสุดในบริษัท
SELECT first_name, last_name, salary
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);
```

**ข้อควรระวัง:** ถ้า Subquery return **มากกว่า 1 แถว** แต่ใช้ `=` จะ Error ทันที (`single-row subquery returns more than one row`)

---

### 2.2 Multi-Row Subquery

> **Multi-Row Subquery** คือ Subquery ที่ return **หลายค่า** ใช้กับ Operators พิเศษ: `IN`, `NOT IN`, `ANY`, `ALL`

#### 2.2.1 IN / NOT IN

```sql
-- IN: ค่าต้องอยู่ใน list จาก Subquery
SELECT first_name, last_name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE location_id = 1700  -- อาจได้หลาย department_id
);

-- NOT IN: ค่าต้องไม่อยู่ใน list
SELECT first_name, last_name
FROM employees
WHERE department_id NOT IN (
    SELECT department_id
    FROM departments
    WHERE department_name LIKE '%IT%'
);
```

#### 2.2.2 ANY (ใช้กับ comparison operator)

> `ANY` หมายความว่า เงื่อนไขจริงสำหรับ **อย่างน้อยหนึ่งค่า** ใน list

```sql
-- salary > ANY → เงินเดือนสูงกว่าค่าต่ำสุดใน list (เหมือน > MIN)
SELECT first_name, salary
FROM employees
WHERE salary > ANY (
    SELECT salary
    FROM employees
    WHERE department_id = 60
);
-- ถ้า dept 60 มีเงินเดือน [4800, 6000, 9000]
-- คืนทุกคนที่เงินเดือน > 4800 (ค่าต่ำสุดของ list)
```

#### 2.2.3 ALL (ใช้กับ comparison operator)

> `ALL` หมายความว่า เงื่อนไขจริงสำหรับ **ทุกค่า** ใน list

```sql
-- salary > ALL → เงินเดือนสูงกว่าทุกค่าใน list (เหมือน > MAX)
SELECT first_name, salary
FROM employees
WHERE salary > ALL (
    SELECT salary
    FROM employees
    WHERE department_id = 60
);
-- คืนเฉพาะคนที่เงินเดือน > 9000 (ค่าสูงสุดของ list)
```

**ตารางสรุป ANY vs ALL:**

| Operator | ความหมาย | เทียบเท่า |
| :--- | :--- | :--- |
| `> ANY` | สูงกว่าค่าใดค่าหนึ่ง | `> MIN(subquery)` |
| `< ANY` | ต่ำกว่าค่าใดค่าหนึ่ง | `< MAX(subquery)` |
| `=` `ANY` | เท่ากับค่าใดค่าหนึ่ง | `IN (subquery)` |
| `> ALL` | สูงกว่าทุกค่า | `> MAX(subquery)` |
| `< ALL` | ต่ำกว่าทุกค่า | `< MIN(subquery)` |
| `!= ALL` | ไม่เท่ากับทุกค่า | `NOT IN (subquery)` |

---

### 2.3 Correlated Subquery

> **Correlated Subquery** คือ Subquery ที่ **อ้างอิง column จาก Outer Query** ทำให้ Subquery ต้อง execute ใหม่ทุกครั้งสำหรับแต่ละแถวของ Outer Query

```sql
-- Syntax: Subquery อ้างอิง alias ของ Outer Query (e.department_id)
SELECT e.first_name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE department_id = e.department_id  -- ← อ้างอิง e จาก Outer Query
);
-- สำหรับแต่ละพนักงาน: หาค่าเฉลี่ยเงินเดือนของแผนกตัวเอง
-- แล้วเปรียบเทียบว่าพนักงานคนนั้นได้มากกว่าค่าเฉลี่ยแผนกไหม
```

---

### 2.4 EXISTS / NOT EXISTS

> **EXISTS** ตรวจสอบว่า Subquery return ข้อมูลอะไรก็ได้หรือไม่ (return `TRUE` ถ้ามีอย่างน้อย 1 แถว) มักใช้กับ Correlated Subquery

```sql
-- EXISTS: ถ้า Subquery คืน >= 1 แถว → TRUE
SELECT department_name
FROM departments d
WHERE EXISTS (
    SELECT 1               -- SELECT อะไรก็ได้ ค่าไม่สำคัญ
    FROM employees e
    WHERE e.department_id = d.department_id  -- Correlated
);
-- คืน department ที่มีพนักงานอย่างน้อย 1 คน

-- NOT EXISTS: ถ้า Subquery คืน 0 แถว → TRUE
SELECT department_name
FROM departments d
WHERE NOT EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.department_id
);
-- คืน department ที่ไม่มีพนักงานเลย
```

---

### 2.5 Inline View (Subquery ใน FROM)

> **Inline View** คือการนำ Subquery ไปวางใน `FROM` clause ราวกับเป็นตารางชั่วคราว ต้องตั้ง **Alias** ให้เสมอ

```sql
-- Syntax
SELECT outer_columns
FROM (
    SELECT inner_columns     -- ← Inline View
    FROM table
    WHERE condition
) alias_name               -- ← ต้องมี Alias
WHERE outer_condition;
```

**ตัวอย่าง:**

```sql
-- หาพนักงานที่มีเงินเดือนสูงกว่า avg ของแต่ละแผนก
SELECT e.first_name, e.salary, dept_avg.avg_sal, e.department_id
FROM employees e
INNER JOIN (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
) dept_avg ON e.department_id = dept_avg.department_id
WHERE e.salary > dept_avg.avg_sal;
```

---

### 2.6 Scalar Subquery ใน SELECT

```sql
-- แสดงชื่อพนักงานพร้อมเงินเดือนเฉลี่ยของบริษัท (ซ้ำทุกแถว)
SELECT 
    first_name,
    salary,
    (SELECT AVG(salary) FROM employees) AS company_avg,
    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;
```

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

- [ ] **Single-Row Subquery:** คืน 1 ค่า — ใช้กับ `=`, `>`, `<`, `!=`
- [ ] **Multi-Row Subquery:** คืนหลายค่า — ใช้กับ `IN`, `NOT IN`, `ANY`, `ALL`
- [ ] **Correlated Subquery:** อ้างอิง Outer Query — execute ใหม่ทุกแถว
- [ ] **EXISTS:** ตรวจสอบว่ามีแถวหรือไม่ — ไม่สนค่า แค่สนว่ามีแถวไหม
- [ ] **Inline View:** Subquery ใน FROM — ต้องมี Alias
- [ ] **ANY vs ALL:** ANY = อย่างน้อยหนึ่ง, ALL = ทุกค่า

### สรุป Syntax Pattern

| ประเภท | Syntax | Operators ที่ใช้ได้ |
| :--- | :--- | :--- |
| Single-Row | `WHERE col = (SELECT single FROM ...)` | `=`, `!=`, `<`, `>`, `<=`, `>=` |
| Multi-Row IN | `WHERE col IN (SELECT multi FROM ...)` | `IN`, `NOT IN` |
| Multi-Row ANY | `WHERE col > ANY (SELECT ...)` | `> < >= <= = !=` + ANY |
| Multi-Row ALL | `WHERE col > ALL (SELECT ...)` | `> < >= <= = !=` + ALL |
| Correlated | `WHERE col = (SELECT ... WHERE t.col = outer.col)` | ทุกแบบ |
| EXISTS | `WHERE EXISTS (SELECT 1 FROM ... WHERE ...)` | `EXISTS`, `NOT EXISTS` |
| Inline View | `FROM (SELECT ...) alias` | — |

### Concept Map

```text
Subquery
├── Single-Row (คืน 1 ค่า)
│   └── ใช้ =, >, <, !=
│
├── Multi-Row (คืนหลายค่า)
│   ├── IN / NOT IN
│   ├── ANY (อย่างน้อย 1 ค่าจริง)
│   └── ALL (ทุกค่าต้องจริง)
│
├── Correlated (อ้างอิง Outer Query)
│   └── EXISTS / NOT EXISTS
│
└── Inline View (อยู่ใน FROM)
    └── ทำงานเป็น Virtual Table
```

---

## ⚠️ Common Pitfalls & Exam Traps

- **Single-Row Subquery คืนมากกว่า 1 แถว:** ถ้าใช้ `=` แต่ Subquery คืน 2+ แถว จะ Error ทันที — ตรวจสอบว่า WHERE ของ Subquery กรองเหลือแค่ 1 แถวเสมอ
- **NOT IN กับ NULL:** ถ้า Subquery return ค่า NULL อยู่ใน list, `NOT IN` จะ return 0 แถวเสมอ เพราะ `col != NULL` เป็น `UNKNOWN` — ใช้ `NOT EXISTS` แทนเมื่อมีโอกาสเจอ NULL
- **สับสน ANY และ ALL:** `> ANY` = สูงกว่าค่าต่ำสุด (ง่ายกว่า), `> ALL` = สูงกว่าทุกค่า รวมค่าสูงสุด (ยากกว่า)
- **Inline View ลืม Alias:** Oracle จะ Error ถ้าไม่มี Alias — เพิ่มชื่อ alias หลัง `)` ของ Subquery เสมอ
- **Correlated Subquery ช้ากว่า JOIN:** เพราะ execute ซ้ำทุกแถวของ Outer Query — ในงาน Production อาจพิจารณา Rewrite เป็น JOIN + GROUP BY แทน
- **EXISTS vs IN:** `EXISTS` หยุดทันทีที่พบแถวแรก (เร็วกว่า) แต่ `IN` ต้อง collect ค่าทั้งหมดก่อน — ใช้ `EXISTS` เมื่อ Subquery อาจคืน list ขนาดใหญ่

---

## แบบฝึกหัด (Practice Exercises)

ใช้ Schema: `employees`, `departments`, `locations` (HR Schema)

### ระดับ Basic

**ข้อ 1:** หาพนักงานทุกคนที่มีเงินเดือนสูงกว่าค่าเฉลี่ยเงินเดือนของบริษัท (แสดง first_name, last_name, salary)

**ข้อ 2:** หาพนักงานที่อยู่ในแผนกเดียวกับ 'Whalen' (ใช้ Single-Row Subquery)

**ข้อ 3:** หาพนักงานที่อยู่ในแผนกที่ตั้งอยู่ใน location_id 1700 (ใช้ IN Subquery)

### ระดับ Intermediate

**ข้อ 4:** หาพนักงานที่มีเงินเดือนสูงกว่าเงินเดือนของพนักงาน **ทุกคน** ในแผนก 60 (ใช้ ALL)

**ข้อ 5:** หาพนักงานที่มีเงินเดือนสูงกว่าเงินเดือนของพนักงาน **อย่างน้อยหนึ่งคน** ในแผนก 60 (ใช้ ANY)

**ข้อ 6:** หาชื่อแผนกที่มีพนักงานอย่างน้อย 1 คน โดยใช้ EXISTS

### ระดับ Application

**ข้อ 7:** หาพนักงานที่มีเงินเดือนสูงกว่าค่าเฉลี่ยของ **แผนกตัวเอง** (ใช้ Correlated Subquery)

**ข้อ 8:** แสดงชื่อแผนกที่ **ไม่มีพนักงานเลย** โดยใช้ NOT EXISTS

---

### เฉลย

```sql
-- ข้อ 1: เงินเดือน > ค่าเฉลี่ยบริษัท
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- ข้อ 2: แผนกเดียวกับ Whalen
SELECT first_name, last_name
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM employees
    WHERE last_name = 'Whalen'
);

-- ข้อ 3: แผนกที่อยู่ใน location 1700
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE location_id = 1700
);

-- ข้อ 4: เงินเดือน > ทุกคนในแผนก 60
SELECT first_name, last_name, salary
FROM employees
WHERE salary > ALL (
    SELECT salary
    FROM employees
    WHERE department_id = 60
);

-- ข้อ 5: เงินเดือน > อย่างน้อย 1 คนในแผนก 60
SELECT first_name, last_name, salary
FROM employees
WHERE salary > ANY (
    SELECT salary
    FROM employees
    WHERE department_id = 60
);

-- ข้อ 6: แผนกที่มีพนักงาน (EXISTS)
SELECT department_name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.department_id
);

-- ข้อ 7: เงินเดือน > avg ของแผนกตัวเอง (Correlated)
SELECT e.first_name, e.last_name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE department_id = e.department_id  -- อ้างอิง Outer row
);

-- ข้อ 8: แผนกที่ไม่มีพนักงาน (NOT EXISTS)
SELECT department_name
FROM departments d
WHERE NOT EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.department_id
);
```

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- **วิชาและหัวข้อที่เกี่ยวข้อง:**
  - [[LAB 6 - SQL JOIN (Inner, Cross, Natural, Self)]] (JOIN เป็นอีกวิธีหาข้อมูลที่ Subquery ก็ทำได้ — เลือกตามบริบท)
  - [[LAB 7 - SQL OUTER JOIN (Left, Right, Full)]] (NOT EXISTS ทำสิ่งเดียวกับ LEFT JOIN + IS NULL)
  - [[LAB 8 - SQL GROUP BY and Aggregate Functions]] (Single-Row Subquery มักใช้ Aggregate เช่น AVG, MAX)
  - [[LAB 5 - SQL SELECT with Conditions]] (WHERE + Operators พื้นฐานก่อนเรียน Subquery)

- **แหล่งข้อมูล:**
  - Source: `Resources/Books/Database/lab DB/DB66-LAB 9-Subqueries.pdf`
