# แบบฝึกหัดและเฉลย SQL Mock Quiz 2 (HR Database Schema)

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** SQL-Mock-Quiz-02
* **หัวข้อ:** SQL Queries (JOIN, OUTER JOIN, Aggregate Functions, GROUP BY, Subqueries, LIKE, String Concatenation)
* **วันที่:** 2026-09-27
* **Schema อ้างอิง:** Standard HR Database Schema (`employees`, `departments`, `jobs`, `job_history`, `locations`, `countries`, `regions`)
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/SQL Mock Quiz2.md`

---

## สรุปภาพรวมหัวข้อที่ใช้ทดสอบ (Skills Matrix)

| ข้อที่ | หัวข้อหลัก | ตารางที่เกี่ยวข้อง | ฟังก์ชัน / คำสั่งหลัก |
|:---:|:---|:---|:---|
| **1** | Outer Join | `countries`, `locations` | `LEFT JOIN ... ON` |
| **2** | Inner Join & String Manipulation | `employees`, `jobs` | `JOIN`, Concatenation (`\|\|` / `CONCAT`) |
| **3** | Inner Join | `countries`, `regions` | `JOIN ... ON` |
| **4** | Aggregate Functions & Pattern Matching | `jobs` | `MAX()`, `MIN()`, `LIKE 'AD%'` |
| **5** | Grouping & Counting | `departments` | `GROUP BY`, `COUNT()` |
| **6** | Subquery & Filtering | `employees` | `WHERE employee_id IN (SELECT manager_id ...)` |
| **7** | Join & Row Limiting | `job_history`, `jobs` | `JOIN`, `LIMIT 1` / `FETCH FIRST 1 ROWS ONLY` |
| **8** | Multiple Grouping & Ordering | `employees` | `GROUP BY department_id, job_id`, `SUM()`, `ORDER BY` |

---

## รายการโจทย์ วิธีคิด และคำตอบ

### ข้อที่ 1: แสดงชื่อประเทศและชื่อเมือง โดยแสดงประเทศทั้งหมด (รวมประเทศที่ไม่มีเมือง)

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `LEFT OUTER JOIN`
> * **แนวคิด:**
>   * ต้องการข้อมูลประเทศทั้งหมด แม้ว่าประเทศนั้นจะไม่มีเมือง (`locations`) บันทึกอยู่ก็ตาม
>   * ใช้ `LEFT JOIN` โดยตั้ง `countries` เป็นตารางฝั่งซ้าย (Left Table) เพื่อรักษาแถวของประเทศทั้งหมดไว้ และนำ `locations` มาจับคู่ด้วย `country_id`
> * **SQL Query:**
>   ```sql
>   SELECT c.country_name, l.city
>   FROM countries c
>   LEFT JOIN locations l ON c.country_id = l.country_id;
>   ```

---

### ข้อที่ 2: แสดงชื่อ-นามสกุลพนักงาน (ตั้งชื่อคอลัมน์ Name) และชื่อตำแหน่งงาน

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `INNER JOIN` และการเชื่อมข้อความ (String Concatenation)
> * **แนวคิด:**
>   * รวม `first_name` และ `last_name` เข้าด้วยกันและเว้นวรรค 1 ช่อง พร้อมตั้ง Alias เป็น `"Name"`
>   * เชื่อมตาราง `employees` กับ `jobs` ผ่าน `job_id` เพื่อดึง `job_title`
> * **SQL Query:**
>   ```sql
>   SELECT CONCAT(e.first_name, ' ', e.last_name) AS "Name", j.job_title
>   FROM employees e
>   JOIN jobs j ON e.job_id = j.job_id;
>   ```
> * **หมายเหตุ:** ใน MySQL หรือบาง RDBMS สามารถใช้ `e.first_name || ' ' || e.last_name AS "Name"`

---

### ข้อที่ 3: แสดงชื่อประเทศและชื่อภูมิภาค เฉพาะที่มีรหัสภูมิภาคตรงกัน

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `INNER JOIN`
> * **แนวคิด:**
>   * เชื่อมตาราง `countries` และ `regions` โดยใช้เงื่อนไข `c.region_id = r.region_id`
>   * ดึงเฉพาะข้อมูลที่มีค่าเชื่อมโยงตรงกันทั้งสองฝั่ง
> * **SQL Query:**
>   ```sql
>   SELECT c.country_name, r.region_name
>   FROM countries c
>   JOIN regions r ON c.region_id = r.region_id;
>   ```

---

### ข้อที่ 4: หาค่าเงินเดือนขั้นต่ำที่สูงที่สุด และค่าเงินเดือนขั้นสูงที่ต่ำที่สุด เฉพาะรหัสตำแหน่งที่ขึ้นต้นด้วย 'AD'

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `Aggregate Functions` (`MAX`, `MIN`) ร่วมกับ `LIKE` Wildcard
> * **แนวคิด:**
>   * กรองข้อมูลตำแหน่งงานเฉพาะที่ `job_id LIKE 'AD%'`
>   * หาเงินเดือนขั้นต่ำที่สูงที่สุดด้วย `MAX(min_salary)`
>   * หาเงินเดือนขั้นสูงที่ต่ำที่สุดด้วย `MIN(max_salary)`
> * **SQL Query:**
>   ```sql
>   SELECT MAX(min_salary) AS max_min_salary, 
>          MIN(max_salary) AS min_max_salary
>   FROM jobs
>   WHERE job_id LIKE 'AD%';
>   ```

---

### ข้อที่ 5: หาจำนวนแผนกทั้งหมดแยกตามรหัสสถานที่ตั้ง

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `GROUP BY` และ `COUNT()`
> * **แนวคิด:**
>   * จัดกลุ่มข้อมูลตามสถานที่ตั้ง (`GROUP BY location_id`)
>   * นับจำนวนแผนกในแต่ละกลุ่มด้วย `COUNT(department_id)`
> * **SQL Query:**
>   ```sql
>   SELECT location_id, 
>          COUNT(department_id) AS total_departments
>   FROM departments
>   GROUP BY location_id;
>   ```

---

### ข้อที่ 6: แสดงชื่อ-นามสกุลผู้จัดการ (name_manager) รหัสตำแหน่ง และรายได้ ที่เงินเดือน > 5,500 (1 คนต่อ 1 row)

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `Subquery` (Filtering by set membership)
> * **แนวคิด:**
>   * ผู้จัดการคือพนักงานที่มี `employee_id` ปรากฏอยู่ในคอลัมน์ `manager_id` ของตารางพนักงาน
>   * ใช้ Subquery `SELECT manager_id FROM employees WHERE manager_id IS NOT NULL` เพื่อหาชุดรหัสของผู้จัดการ
>   * ใช้ `WHERE employee_id IN (...)` พร้อมเงื่อนไขเงินเดือน `salary > 5500`
>   * การใช้ `WHERE employee_id IN (...)` บนตาราง `employees` จะได้ผลลัพธ์ 1 คนต่อ 1 แถวโดยอัตโนมัติ (ไม่เกิดแถวซ้ำเหมือนการทำ Self-Join โดยตรง)
> * **SQL Query:**
>   ```sql
>   SELECT first_name || ' ' || last_name AS name_manager, 
>          job_id, 
>          salary
>   FROM employees
>   WHERE employee_id IN (
>       SELECT manager_id 
>       FROM employees 
>       WHERE manager_id IS NOT NULL
>   ) AND salary > 5500;
>   ```

---

### ข้อที่ 7: แสดงรหัสแผนกและรหัสตำแหน่งจากประวัติการทำงาน ที่มีเงินเดือนสูงสุด > 10,000 และแสดงแค่ 1 บรรทัด

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** `INNER JOIN` และการจำกัดจำนวนแถวผลลัพธ์ (`Row Limiting`)
> * **แนวคิด:**
>   * เชื่อม `job_history` กับ `jobs` ผ่าน `job_id`
>   * กรองเฉพาะตำแหน่งที่ `j.max_salary > 10000`
>   * จำกัดผลลัพธ์ให้แสดงเพียง 1 แถวแรก
> * **SQL Query (Standard / PostgreSQL / MySQL):**
>   ```sql
>   SELECT jh.department_id, jh.job_id
>   FROM job_history jh
>   JOIN jobs j ON jh.job_id = j.job_id
>   WHERE j.max_salary > 10000
>   LIMIT 1;
>   ```
> * **SQL Query (สำหรับ Oracle SQL 12c+):**
>   ```sql
>   SELECT jh.department_id, jh.job_id
>   FROM job_history jh
>   JOIN jobs j ON jh.job_id = j.job_id
>   WHERE j.max_salary > 10000
>   FETCH FIRST 1 ROWS ONLY;
>   ```

---

### ข้อที่ 8: แสดงรหัสตำแหน่ง รหัสแผนก และผลรวมเงินเดือน (Sum salary of the jobs) จัดกลุ่มตามแผนกและตำแหน่ง เรียงตามรหัสแผนกจากน้อยไปมาก

> [!success]- เฉลยและวิธีทำ (คลิกเพื่อดูเฉลย)
> * **หัวข้อ:** Multiple Column `GROUP BY`, `SUM()`, `ORDER BY`
> * **แนวคิด:**
>   * จัดกลุ่มตาม 2 คอลัมน์คือ `department_id` และ `job_id`
>   * รวมยอดเงินเดือนของแต่ละกลุ่มด้วย `SUM(salary)`
>   * เรียงลำดับผลลัพธ์ตาม `department_id ASC`
> * **SQL Query:**
>   ```sql
>   SELECT job_id, 
>          department_id, 
>          SUM(salary) AS "Sum salary of the jobs"
>   FROM employees
>   GROUP BY department_id, job_id
>   ORDER BY department_id ASC;
>   ```

---

## เอกสารเชื่อมโยง (Backlinks)
* **เนื้อหาอ้างอิงบทเรียน:**
  * [[LAB 5 - SQL SELECT with Conditions (WHERE, Operators, LIKE, NULL, ORDER BY)]] (เงื่อนไขการค้นหา, Pattern Matching, Logical Operators)
  * [[LAB 6 - SQL JOIN (Inner, Cross, Natural, Self)]] (การเชื่อมตารางแบบ Inner Join)
  * [[LAB 7 - SQL OUTER JOIN (Left, Right, Full)]] (การเชื่อมตารางแบบ Left / Right Outer Join)
  * [[LAB 8 - SQL GROUP BY and Aggregate Functions)]] (ฟังก์ชันรวมข้อมูล SUM, COUNT, MAX, MIN และการจัดกลุ่ม GROUP BY)
  * [[LAB 9 - SQL Subqueries]] (การเขียน Subquery ทั้ง Single-row, Multi-row ด้วย IN)
