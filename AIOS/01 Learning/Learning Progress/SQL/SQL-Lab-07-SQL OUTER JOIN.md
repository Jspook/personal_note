# แบบฝึกหัดและเฉลย SQL Lab 07: SQL OUTER JOIN

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** SQL-Lab-07
* **หัวข้อ:** Outer Joins (LEFT OUTER JOIN, RIGHT OUTER JOIN, Finding Unmatched Records with IS NULL)
* **แหล่งที่มา:** [DB Learning KMITL (Submission #108301)](https://dblearning.it.kmitl.ac.th/quiz/submission/108301)
* **วันที่ทำ:** 2026-09-22 19:06:10
* **ผลคะแนน:** ✅ ผ่าน (Passed) — 6/9 คะแนน
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/SQL/SQL-Lab-07-SQL OUTER JOIN.md`

---

## สรุปภาพรวมหัวข้อที่ใช้ทดสอบ (Skills Matrix)

| ข้อที่ | รหัสโจทย์ | จุดประสงค์ / โจทย์ย่อ | ตารางที่เกี่ยวข้อง | คำสั่ง SQL หลัก | สถานะ |
|:---:|:---:|:---|:---|:---|:---:|
| **1** | #917 | จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหั... | `employees`, `departments` | `LEFT JOIN` | ✅ |
| **2** | #918 | จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหั... | `employees`, `departments` | `RIGHT JOIN` | ❌ |
| **3** | #919 | จงเขียน Query ที่แสดงชื่อ นามสกุล รหัสพนักงานพร้อมกับชื่อ... | `employees` | `LEFT JOIN` | ✅ |
| **4** | #920 | จงเขียน SQL statement แสดง รหัสพนักงานและรหัสงาน ที่ไม่เค... | `employees`, `job_history` | `RIGHT JOIN` | ✅ |
| **5** | #921 | จงเขียน Query ที่แสดงรหัสที่ตั้ง และชื่อเมือง เฉพาะที่ยัง... | `locations`, `departments` | `LEFT JOIN` | ❌ |
| **6** | #922 | จงเขียน Query ที่แสดงรหัสประเทศ และชื่อประเทศ เฉพาะที่ยัง... | `countries`, `locations`, `departments` | `RIGHT JOIN` | ❌ |
| **7** | #923 | จงเขียน Query ที่แสดงรหัสประเทศ ชื่อประเทศ และชื่อทวีป ที... | `countries`, `regions`, `locations` | `RIGHT JOIN` | ✅ |
| **8** | #971 | แสดงชื่อพนักงาน และนามสกุลพนักงานที่ไม่ได้ติดต่อการขายกับ... | `employees`, `customers` | `LEFT JOIN` | ✅ |
| **9** | #1753 | แสดงหมายเลขบริษัทลูกค้าและชื่อบริษัทลูกค้า ที่ยังไม่มีในร... | `customers`, `payments` | `RIGHT JOIN` | ✅ |

---

## รายการโจทย์ วิธีคิด และคำตอบ

### ข้อที่ 1: จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของ... (Question #917)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของพนักงานแต่ละ คน และรวมพนักงานที่ยังไม่ได้ถูกมอบหมายแผนกที่ทำงาน (ยังไม่มีรหัสแผนก) (ใช้ **USING clause)
\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **employee\_id** | **first\_name** | **last\_name** | **department\_id** | **department\_name** |
| --- | --- | --- | --- | --- |
| 100 | Steven | King | 90 | Executive |
| 101 | Neena | Kochhar | 90 | Executive |
| 102 | Lex | De Haan | 90 | Executive |
| 103 | Alexander | Hunold | 60 | IT |
| 104 | Bruce | Ernst | 60 | IT |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT employee_id,first_name,last_name,department_id,department_name
FROM employees
LEFT OUTER JOIN departments
USING (department_id);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT employee_id, first_name, last_name, department_id, department_name
FROM employees
LEFT JOIN departments
USING (department_id);
```

</details>

---

### ข้อที่ 2: จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของ... (Question #918) *(ต้องทบทวน ⚠️)*

* **โจทย์:** จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของพนักงานแต่ละคน และรวมแผนกที่ยังไม่มีพนักงาน (ใช้ **USING clause)
\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **employee\_id** | **first\_name** | **last\_name** | **department\_id** | **department\_name** |
| --- | --- | --- | --- | --- |
| 200 | Jennifer | Whalen | 10 | Administration |
| 201 | Michael | Hartstein | 20 | Marketing |
| 202 | Pat | Fay | 20 | Marketing |
| 114 | Den | Raphaely | 30 | Purchasing |
| 115 | Alexander | Khoo | 30 | Purchasing |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT employee_id,first_name,last_name,department_id,department_name
FROM employees
RIGHT OUTER JOIN departments
USING (department_id);
```

> [!WARNING] **วิเคราะห์ข้อผิดพลาด (Error Analysis):**
> * **ข้อความ Error จากระบบ:** `Incorrect query result.
(QID: 918, UID: 4741)`
> * **สาเหตุและจุดที่ผิด:** ในคำสั่ง `USING (column_name)` ห้ามใส่ Table Alias นำหน้าคอลัมน์ที่อยู่ใน USING clause (เช่น ห้ามใช้ `e.department_id` ต้องใช้ `department_id` เดี่ยวๆ ใน SELECT/USING)
> * **คำตอบเดิมที่ส่ง:**
>   ```sql
>   select employee_id , first_name , last_name , e.department_id , d.department_name
>   from employees e
>   right outer join departments d
>   using (department_id)
>   ```
> * **แนวทางแก้ไข:** ตรวจสอบข้อกำหนดในโจทย์และคำตอบที่ถูกต้องด้านบนเพื่อเปรียบเทียบ syntax ที่ถูกต้อง

---

### ข้อที่ 3: จงเขียน Query ที่แสดงชื่อ นามสกุล รหัสพนักงานพร้อมกับชื่อ นามสกุล รหัสผู้จัดก... (Question #919)

* **โจทย์:** จงเขียน Query ที่แสดงชื่อ นามสกุล รหัสพนักงานพร้อมกับชื่อ นามสกุล รหัสผู้จัดการของพนักงานแต่ ละคน โดยให้ใส่ชื่อ คอลัมน์รหัสพนักงานเป็น Emp, ชื่อผู้จัดการ เป็น mgr\_first\_name, นามสกุลผู้จัดการ เป็น mgr\_last\_name และรหัสผู้จัดการ เป็น Mgr โดยให้แสดงเฉพาะข้อมูลพนักงานที่ยังไม่มีผู้จัดการ (ใช้ **ON clause)** (**โดยใช้นามแฝงคือ e สำหรับตารางพนักงาน, m สำหรับตารางผู้จัดการ)**
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| first_name | last_name | Emp | mgr_first_name | mgr_last_name | Mgr |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Steven | King | 100 | NULL | NULL | NULL |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT e.first_name,e.last_name,e.employee_id `Emp`
        ,m.first_name `mgr_first_name`,m.last_name `mgr_last_name`,m.employee_id `Mgr`
FROM employees e
LEFT OUTER JOIN employees m
ON e.manager_id = m.employee_id
WHERE m.employee_id IS NULL;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT 
    e.first_name,
    e.last_name,
    e.employee_id AS Emp,
    m.first_name AS mgr_first_name,
    m.last_name AS mgr_last_name,
    m.employee_id AS Mgr
FROM employees e
LEFT JOIN employees m 
    ON e.manager_id = m.employee_id
WHERE e.manager_id IS NULL;
```

</details>

---

### ข้อที่ 4: จงเขียน SQL statement แสดง รหัสพนักงานและรหัสงาน ที่ไม่เคย ปรับเปลี่ยนตำแหน่ง... (Question #920)

* **โจทย์:** จงเขียน SQL statement แสดง รหัสพนักงานและรหัสงาน ที่ไม่เคย ปรับเปลี่ยนตำแหน่ง งาน (ใช้ right outer join, ON clause โดยใช้นามแฝงคือตัวอักษรตัวแรกของชื่อตาราง)

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT                            e.employee_id,   e.job_id
FROM                               job_history j 
RIGHT OUTER JOIN       employees e
ON                                     e.employee_id = j.employee_id
WHERE                            j.employee_id IS NULL
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select e.employee_id , e.job_id
from job_history j
right outer join employees e
ON j.employee_id = e.employee_id
WHERE j.employee_id IS NULL;
```

</details>

---

### ข้อที่ 5: จงเขียน Query ที่แสดงรหัสที่ตั้ง และชื่อเมือง เฉพาะที่ยังไม่มีแผนกใดๆ ตั้งอยู... (Question #921) *(ต้องทบทวน ⚠️)*

* **โจทย์:** จงเขียน Query ที่แสดงรหัสที่ตั้ง และชื่อเมือง เฉพาะที่ยังไม่มีแผนกใดๆ ตั้งอยู่ (ใช้ **ON clause โดยใช้นามแฝงคือตัวอักษรตัวแรกของชื่อตาราง) เรียงลำดับด้วยเมืองจาก A-Z
\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **location\_id** | **city** |
| --- | --- |
| 2000 | Beijing |
| 3000 | Bern |
| 2100 | Bombay |
| 2900 | Geneva |
| 1300 | Hiroshima |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT l.location_id,l.city
FROM locations l
LEFT OUTER JOIN departments d 
ON l.location_id = d.location_id
WHERE d.location_id IS NULL
ORDER BY l.city ASC;
```

> [!WARNING] **วิเคราะห์ข้อผิดพลาด (Error Analysis):**
> * **ข้อความ Error จากระบบ:** `Incorrect rows order
(QID: 921, UID: 4741)`
> * **สาเหตุและจุดที่ผิด:** คำตอบที่ส่งยังไม่ตรงตามเงื่อนไขหรือชนิดข้อมูลที่โจทย์ระบุ
> * **คำตอบเดิมที่ส่ง:**
>   ```sql
>   SELECT 
>       l.location_id, 
>       l.city
>   FROM locations l
>   LEFT OUTER JOIN departments d 
>       ON l.location_id = d.location_id
>   WHERE d.department_id IS NULL
>   ORDER BY l.city ASC;
>   ```
> * **แนวทางแก้ไข:** ตรวจสอบข้อกำหนดในโจทย์และคำตอบที่ถูกต้องด้านบนเพื่อเปรียบเทียบ syntax ที่ถูกต้อง

---

### ข้อที่ 6: จงเขียน Query ที่แสดงรหัสประเทศ และชื่อประเทศ เฉพาะที่ยังไม่มีแผนกใดๆ ตั้งอยู... (Question #922) *(ต้องทบทวน ⚠️)*

* **โจทย์:** จงเขียน Query ที่แสดงรหัสประเทศ และชื่อประเทศ เฉพาะที่ยังไม่มีแผนกใดๆ ตั้งอยู่ (ใช้ **Using clause) เรียงลำดับด้วยชื่อประเทศจาก Z-A
\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **country\_id** | **country\_name** |
| --- | --- |
| ZW | Zimbabwe |
| ZM | Zambia |
| CH | Switzerland |
| SG | Singapore |
| NG | Nigeria |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT country_id,country_name
FROM departments
JOIN locations
USING (location_id)
RIGHT OUTER JOIN countries
USING (country_id)
WHERE department_id IS NULL
ORDER BY country_name DESC;
```

> [!WARNING] **วิเคราะห์ข้อผิดพลาด (Error Analysis):**
> * **ข้อความ Error จากระบบ:** `Student query result contains unnecessary rows.
(QID: 922, UID: 4741)`
> * **สาเหตุและจุดที่ผิด:** ในคำสั่ง `USING (column_name)` ห้ามใส่ Table Alias นำหน้าคอลัมน์ที่อยู่ใน USING clause (เช่น ห้ามใช้ `e.department_id` ต้องใช้ `department_id` เดี่ยวๆ ใน SELECT/USING)
> * **คำตอบเดิมที่ส่ง:**
>   ```sql
>   SELECT 
>       c.country_id,
>       c.country_name
>   FROM countries c
>   LEFT JOIN locations l USING (country_id)
>   LEFT JOIN departments d USING (location_id)
>   WHERE d.department_id IS NULL
>   ORDER BY c.country_name DESC;
>   ```
> * **แนวทางแก้ไข:** ตรวจสอบข้อกำหนดในโจทย์และคำตอบที่ถูกต้องด้านบนเพื่อเปรียบเทียบ syntax ที่ถูกต้อง

---

### ข้อที่ 7: จงเขียน Query ที่แสดงรหัสประเทศ ชื่อประเทศ และชื่อทวีป ที่มีในฐานข้อมูล แต่ยั... (Question #923)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสประเทศ ชื่อประเทศ และชื่อทวีป ที่มีในฐานข้อมูล แต่ยังไม่ได้กำหนดเป็นที่ตั้ง (ไม่มีข้อมูลที่ตั้ง) เรียงลำดับด้วยรหัสประเทศจาก A-Z (ใช้ **Using clause)
\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| country_id | country_name | region_name |
| :--- | :--- | :--- |
| AR | Argentina | Americas |
| BE | Belgium | Europe |
| DK | Denmark | Europe |
| EG | Egypt | Middle East and Africa |
| FR | France | Europe |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT country_id,country_name,region_name
FROM locations
RIGHT OUTER JOIN countries
USING (country_id)
JOIN regions
USING (region_id)
WHERE location_id IS NULL
ORDER BY country_id ASC;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT c.country_id , c.country_name , r.region_name
FROM countries c
JOIN regions r USING (region_id)
LEFT JOIN locations l USING (country_id)
WHERE l.location_id IS NULL
ORDER BY country_id ASC;
```

</details>

---

### ข้อที่ 8: แสดงชื่อพนักงาน และนามสกุลพนักงานที่ไม่ได้ติดต่อการขายกับบริษัทลูกค้า (Question #971)

* **โจทย์:** แสดงชื่อพนักงาน และนามสกุลพนักงานที่ไม่ได้ติดต่อการขายกับบริษัทลูกค้า
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **firstName** | **lastName** |
| --- | --- |
| Diane | Murphy |
| Mary | Patterson |
| Jeff | Firrelli |
| William | Patterson |
| Gerard | Bondur |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT e.firstName,e.lastName
FROM employees e
LEFT OUTER JOIN customers c
ON e.employeeNumber = c.salesRepEmployeeNumber
WHERE c.salesRepEmployeeNumber IS NULL;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT 
    e.firstName, 
    e.lastName
FROM employees e
LEFT OUTER JOIN customers c
    ON c.salesRepEmployeeNumber = e.employeeNumber
WHERE c.customerNumber IS NULL;
```

</details>

---

### ข้อที่ 9: แสดงหมายเลขบริษัทลูกค้าและชื่อบริษัทลูกค้า ที่ยังไม่มีในรายการชำระเงิน (ใช้ R... (Question #1753)

* **โจทย์:** แสดงหมายเลขบริษัทลูกค้าและชื่อบริษัทลูกค้า ที่ยังไม่มีในรายการชำระเงิน (ใช้ RIGHT OUTER JOIN)
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **customerNumber** | **customerName** |
| --- | --- |
| 121 | Baane Mini Imports |
| 124 | Mini Gifts Distributors Ltd. |
| 125 | Havel & Zbyszek Co |
| 128 | Blauer See Auto, Co. |
| 129 | Mini Wheels Co. |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
Select customerNumber, customerName
from payments
right outer join customers
using (customerNumber)
where payments.customerNumber IS NULL
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT 
    c.customerNumber,
    c.customerName
FROM payments p
RIGHT OUTER JOIN customers c 
    ON p.customerNumber = c.customerNumber
WHERE p.customerNumber IS NULL;
```

</details>

---

## เอกสารเชื่อมโยง (Backlinks)
* **เนื้อหาอ้างอิงบทเรียน:**
  * [[LAB 7 - SQL OUTER JOIN (Left, Right, Full)]] (สรุปคำสั่ง Left/Right Outer Join และกรณี Unmatched Records)
  * [[LAB 6 - SQL JOIN (Inner, Cross, Natural, Self)]] (เปรียบเทียบ Inner Join vs Outer Join)
