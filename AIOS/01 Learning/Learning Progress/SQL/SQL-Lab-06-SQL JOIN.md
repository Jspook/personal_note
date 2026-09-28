# แบบฝึกหัดและเฉลย SQL Lab 06: SQL INNER JOIN

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** SQL-Lab-06
* **หัวข้อ:** Table Joining (INNER JOIN, Table Aliases, Self Join, Multiple Table Joins)
* **แหล่งที่มา:** [DB Learning KMITL (Submission #106887)](https://dblearning.it.kmitl.ac.th/quiz/submission/106887)
* **วันที่ทำ:** 2026-09-03 10:06:39
* **ผลคะแนน:** ✅ ผ่าน (Passed) — 9/9 คะแนน
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/SQL/SQL-Lab-06-SQL JOIN.md`

---

## สรุปภาพรวมหัวข้อที่ใช้ทดสอบ (Skills Matrix)

| ข้อที่ | รหัสโจทย์ | จุดประสงค์ / โจทย์ย่อ | ตารางที่เกี่ยวข้อง | คำสั่ง SQL หลัก | สถานะ |
|:---:|:---:|:---|:---|:---|:---:|
| **1** | #871 | จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหั... | `employees`, `departments` | `INNER JOIN` | ✅ |
| **2** | #872 | จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหั... | `employees`, `departments` | `INNER JOIN` | ✅ |
| **3** | #873 | จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหั... | `employees` | `SELECT` | ✅ |
| **4** | #876 | จงเขียน Query ที่แสดงชื่อ นามสกุล รหัสพนักงานพร้อมกับชื่อ... | `employees` | `INNER JOIN` | ✅ |
| **5** | #878 | จงแสดงชื่อ นามสกุล และรหัสผู้จัดการของผู้จัดการทุกคน โดยต... | `employees` | `INNER JOIN` | ✅ |
| **6** | #879 | จงแสดงชื่อ นามสกุล วันที่เริ่มทำงานของพนักงานทุกคนที่เริ่... | `employees` | `INNER JOIN` | ✅ |
| **7** | #880 | จงแสดงชื่อ นามสกุล วันที่เริ่มทำงาน และเงินเดือนของพนักงา... | `employees` | `INNER JOIN` | ✅ |
| **8** | #1724 | จงเขียน Query ที่แสดงรหัสที่ตั้ง ที่อยู่ เมือง และรัฐ/จัง... | `countries`, `regions`, `locations` | `INNER JOIN` | ✅ |
| **9** | #1725 | จงเขียน Query ที่แสดงรหัสแผนก ชื่อแผนก และ ที่อยู่ของแผนก... | `countries`, `locations`, `departments` | `INNER JOIN` | ✅ |

---

## รายการโจทย์ วิธีคิด และคำตอบ

### ข้อที่ 1: จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของ... (Question #871)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของพนักงานแต่ละ คน (**ใช้** **USING clause)**
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
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
JOIN departments
USING (department_id);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select e.employee_id , e.first_name , e.last_name , e.department_id , d.department_name
from employees e
join departments d
using (department_id)
```

</details>

---

### ข้อที่ 2: จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของ... (Question #872)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของพนักงานแต่ละคน (**ใช้ ON clause)**
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
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
SELECT e.employee_id,e.first_name,e.last_name,e.department_id,d.department_name
FROM employees e
JOIN departments d
ON (e.department_id = d.department_id);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select e.employee_id , e.first_name , e.last_name , e.department_id , d.department_name
from employees e
join departments d
on e.department_id = d.department_id
```

</details>

---

### ข้อที่ 3: จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของ... (Question #873)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสพนักงาน ชื่อ นามสกุล พร้อมกับรหัสแผนก และชื่อแผนกของพนักงานแต่ละ คน (**ใช้ Equijoin)**
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
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
SELECT e.employee_id,e.first_name,e.last_name,e.department_id,d.department_name
FROM employees e,departments d
WHERE e.department_id = d.department_id;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select e.employee_id , e.first_name , e.last_name , e.department_id , d.department_name
from employees e , departments d
where e.department_id = d.department_id
```

</details>

---

### ข้อที่ 4: จงเขียน Query ที่แสดงชื่อ นามสกุล รหัสพนักงานพร้อมกับชื่อ นามสกุล รหัสผู้จัดก... (Question #876)

* **โจทย์:** จงเขียน Query ที่แสดงชื่อ นามสกุล รหัสพนักงานพร้อมกับชื่อ นามสกุล รหัสผู้จัดการของพนักงานแต่ละคน โดยให้ใส่ชื่อ คอลัมน์รหัสพนักงานเป็น Emp, ชื่อผู้จัดการเป็น MGR First Name, นามสกุลผู้จัดการเป็น MGR Last Name และรหัสผู้จัดการ เป็น Mgr (**ใช้** **ON clause)**
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e, ตาราง manager ใช้ m
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **first\_name** | **last\_name** | **Emp** | **MGR First Name** | **MGR Last Name** | **Mgr** |
| --- | --- | --- | --- | --- | --- |
| Neena | Kochhar | 101 | Steven | King | 100 |
| Lex | De Haan | 102 | Steven | King | 100 |
| Alexander | Hunold | 103 | Lex | De Haan | 102 |
| Bruce | Ernst | 104 | Alexander | Hunold | 103 |
| David | Austin | 105 | Alexander | Hunold | 103 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT e.first_name,e.last_name,e.employee_id `Emp`
    ,m.first_name `MGR First Name`,m.last_name `MGR Last Name`,m.employee_id `Mgr`
FROM employees e
JOIN employees m
ON e.manager_id = m.employee_id;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select e.first_name , e.last_name , e.employee_id as 'Emp' , m.first_name as "MGR First Name" , m.last_name as 'MGR Last Name' , m.employee_id as 'Mgr'
from employees e
join employees m on (e.manager_id = m.employee_id)
```

</details>

---

### ข้อที่ 5: จงแสดงชื่อ นามสกุล และรหัสผู้จัดการของผู้จัดการทุกคน โดยตั้งชื่อคอลัมน์ดังนี้... (Question #878)

* **โจทย์:** จงแสดงชื่อ นามสกุล และรหัสผู้จัดการของผู้จัดการทุกคน โดยตั้งชื่อคอลัมน์ดังนี้ MGR First Name, MGR Last Name, MGR และเรียงลำดับตามรหัสผู้จัดการของผู้จัดการจากน้อยไปมาก (โดยตัดแถวที่ซ้ำให้เหลือแถวเดียว) (**ใช้** **ON clause**)
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e, ตาราง manage ใช้ m
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **MGR First Name** | **MGR Last Name** | **MGR** |
| --- | --- | --- |
| Steven | King | *NULL* |
| Shanta | Vollman | 100 |
| Lex | De Haan | 100 |
| John | Russell | 100 |
| Alberto | Errazuriz | 100 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT DISTINCT m.first_name `MGR First Name`,m.last_name `MGR Last Name`,m.manager_id `MGR`
FROM employees e
JOIN employees m
ON e.manager_id = m.employee_id
ORDER BY m.manager_id;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT DISTINCT m.first_name AS "MGR First Name", m.last_name AS "MGR Last Name", m.manager_id AS "MGR"
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id
ORDER BY m.manager_id ASC;
```

</details>

---

### ข้อที่ 6: จงแสดงชื่อ นามสกุล วันที่เริ่มทำงานของพนักงานทุกคนที่เริ่มทำงานก่อนผู้จัดการข... (Question #879)

* **โจทย์:** จงแสดงชื่อ นามสกุล วันที่เริ่มทำงานของพนักงานทุกคนที่เริ่มทำงานก่อนผู้จัดการของตนเอง พร้อมกับ ชื่อ นามสกุล วันที่เริ่มทำงานของผู้จัดการของพนักงานคนนั้นๆ (ตั้งชื่อคอลัมน์ของผู้จัดการคือ Mgr First Name, Mgr Last Name, Mgr Hired) (**ใช้ ON Clause**)
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e, ตาราง manager ใช้ m
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **first\_name** | **last\_name** | **hire\_date** | **Mgr First Name** | **Mgr Last Name** | **Mgr Hired** |
| --- | --- | --- | --- | --- | --- |
| Alexander | Hunold | 1990-01-03 | Lex | De Haan | 1993-01-13 |
| Daniel | Faviet | 1994-08-16 | Nancy | Greenberg | 1994-08-17 |
| James | Marlow | 1997-02-16 | Adam | Fripp | 1997-04-10 |
| Renske | Ladwig | 1995-07-14 | Shanta | Vollman | 1997-10-10 |
| Trenna | Rajs | 1995-10-17 | Kevin | Mourgos | 1999-11-16 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT e.first_name,e.last_name,e.hire_date
    ,m.first_name `Mgr First Name`,m.last_name `Mgr Last Name`,m.hire_date `Mgr Hired`
FROM employees e
JOIN employees m
ON e.manager_id = m.employee_id
WHERE e.hire_date < m.hire_date;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT 
    e.first_name, 
    e.last_name, 
    e.hire_date, 
    m.first_name AS "Mgr First Name", 
    m.last_name AS "Mgr Last Name", 
    m.hire_date AS "Mgr Hired"
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id
WHERE e.hire_date < m.hire_date;
```

</details>

---

### ข้อที่ 7: จงแสดงชื่อ นามสกุล วันที่เริ่มทำงาน และเงินเดือนของพนักงานทุกคนที่เริ่มทำงานห... (Question #880)

* **โจทย์:** จงแสดงชื่อ นามสกุล วันที่เริ่มทำงาน และเงินเดือนของพนักงานทุกคนที่เริ่มทำงานหลังจากพนักงานที่มี นามสกุลคือ Ernst (ใช้ **ON clause**)
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e, ตารางของพนักงาน Ernst ใช้ Ernst
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **first\_name** | **last\_name** | **hire\_date** | **salary** |
| --- | --- | --- | --- |
| Lex | De Haan | 1993-01-13 | 17000.00 |
| David | Austin | 1997-06-25 | 4800.00 |
| Valli | Pataballa | 1998-02-05 | 4800.00 |
| Diana | Lorentz | 1999-02-07 | 4200.00 |
| Nancy | Greenberg | 1994-08-17 | 12000.00 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT e.first_name,e.last_name,e.hire_date,e.salary
FROM employees e
JOIN employees Ernst
ON Ernst.last_name = 'Ernst'
WHERE e.hire_date > Ernst.hire_date;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select e.first_name , e.last_name , e.hire_date , e.salary
from employees e
join employees ernst on ernst.hire_date < e.hire_date
WHERE ernst.last_name = 'Ernst';
```

</details>

---

### ข้อที่ 8: จงเขียน Query ที่แสดงรหัสที่ตั้ง ที่อยู่ เมือง และรัฐ/จังหวัด ของสถานที่ตั้งส... (Question #1724)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสที่ตั้ง ที่อยู่ เมือง และรัฐ/จังหวัด ของสถานที่ตั้งสำนักงานทั้งหมดที่อยู่ในทวีปยุโรป (**ใช้ USING clause**)
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **location\_id** | **street\_address** | **city** | **state\_province** |
| --- | --- | --- | --- |
| 2900 | 20 Rue des Corps-Saints | Geneva | Geneve |
| 3000 | Murtenstrasse 921 | Bern | BE |
| 2700 | Schwanthalerstr. 7031 | Munich | Bavaria |
| 1000 | 1297 Via Cola di Rie | Roma | *NULL* |
| 1100 | 93091 Calle della Testa | Venice | *NULL* |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT location_id, street_address, city, state_province
FROM locations
JOIN countries
USING (country_id)
JOIN regions
USING (region_id)
WHERE region_name = 'Europe';
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
select l.location_id , l.street_address , l.city , l.state_province
from locations l
join countries  using (country_id)
join regions using (region_id)
where regions.region_name = 'Europe'
```

</details>

---

### ข้อที่ 9: จงเขียน Query ที่แสดงรหัสแผนก ชื่อแผนก และ ที่อยู่ของแผนกทั้งหมดที่อยู่ในประเ... (Question #1725)

* **โจทย์:** จงเขียน Query ที่แสดงรหัสแผนก ชื่อแผนก และ ที่อยู่ของแผนกทั้งหมดที่อยู่ในประเทศที่มีชื่อขึ้นต้นด้วยตัวอักษร U (**ใช้ ON clause**)
หมายเหตุ ถ้าต้องใช้ Table alias ให้ใช้ตัวอักษรแรกของชื่อตาราง เช่น ตาราง employees ใช้ e
**\*ตัวอย่างคำตอบเป็นเพียงบางส่วนเท่านั้น
\*\*ผลลัพธ์ที่ได้อาจเรียงไม่เหมือนกับตัวอย่าง**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **department\_id** | **department\_name** | **street\_address** |
| --- | --- | --- |
| 40 | Human Resources | 8204 Arthur St |
| 80 | Sales | Magdalen Centre, The Oxford Science Park |
| 60 | IT | 2014 Jabberwocky Rd |
| 50 | Shipping | 2011 Interiors Blvd |
| 10 | Administration | 2004 Charade Rd |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SELECT d.department_id, d.department_name, l.street_address
FROM departments d
JOIN locations l
ON l.location_id = d.location_id
JOIN countries c
ON c.country_id = l.country_id
WHERE c.country_name LIKE 'U%';
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SELECT d.department_id, d.department_name, l.street_address
FROM departments d
JOIN locations l ON d.location_id = l.location_id
JOIN countries c ON l.country_id = c.country_id
WHERE c.country_name LIKE 'U%';
```

</details>

---

## เอกสารเชื่อมโยง (Backlinks)
* **เนื้อหาอ้างอิงบทเรียน:**
  * [[LAB 6 - SQL JOIN (Inner, Cross, Natural, Self)]] (สรุปคำสั่ง Inner Join, Self Join, Multi-table Joins)
