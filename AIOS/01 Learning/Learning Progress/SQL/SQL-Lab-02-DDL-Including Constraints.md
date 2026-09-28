# แบบฝึกหัดและเฉลย SQL Lab 02: DDL — รวมเงื่อนไขข้อบังคับ (Constraints)

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** SQL-Lab-02
* **หัวข้อ:** Table Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, Column-level vs Table-level)
* **แหล่งที่มา:** [DB Learning KMITL (Submission #105362)](https://dblearning.it.kmitl.ac.th/quiz/submission/105362)
* **วันที่ทำ:** 2026-08-10 21:00:18
* **ผลคะแนน:** ✅ ผ่าน (Passed) — 13/13 คะแนน
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/SQL/SQL-Lab-02-DDL-Including Constraints.md`

---

## สรุปภาพรวมหัวข้อที่ใช้ทดสอบ (Skills Matrix)

| ข้อที่ | รหัสโจทย์ | จุดประสงค์ / โจทย์ย่อ | ตารางที่เกี่ยวข้อง | คำสั่ง SQL หลัก | สถานะ |
|:---:|:---:|:---|:---|:---|:---:|
| **1** | #233 | จงเขียน SQL statementเพื่อสร้างตารางชื่อ title แบบ column... | `title` | `CREATE TABLE` | ✅ |
| **2** | #234 | จงเขียน SQL statement เพื่อสร้างตารางชื่อ title แบบ table... | `title` | `CREATE TABLE` | ✅ |
| **3** | #236 | จงเขียน SQL statement เพื่อสร้างตารางชื่อ title\_copy แบบ... | `title_copy` | `CREATE TABLE` | ✅ |
| **4** | #237 | จงเขียน SQL statement เพื่อสร้างตารางชื่อ title\_copy แบบ... | `title_copy` | `CREATE TABLE` | ✅ |
| **5** | #2441 | จงเพิ่ม UNIQUE constraint ชื่อ title\_un ให้กับคอลัมน์ ti... | `title` | `ALTER TABLE ADD` | ✅ |
| **6** | #2442 | จงเพิ่ม NOT NULL constraint ให้กับคอลัมน์ release\_date ใ... | `title` | `ALTER TABLE MODIFY` | ✅ |
| **7** | #2443 | จงเพิ่ม FOREIGN KEY constraint ชื่อ title\_cat\_fk ให้กับ... | `title` | `ALTER TABLE ADD` | ✅ |
| **8** | #2444 | จงลบ PRIMARY KEY constraint ออกจาก ตาราง title หมายเหตุ S... | `title` | `ALTER TABLE DROP` | ✅ |
| **9** | #2445 | จงลบ UNIQUE constraint ออกจากคอลัมน์ title ใน ตาราง title | `title` | `ALTER TABLE DROP` | ✅ |
| **10** | #2446 | จงลบตาราง employees และ ตาราง jobs ด้วยการ ไม่ลบ foreign ... | - | `SQL` | ✅ |
| **11** | #2452 | จงลบตาราง jobs ด้วยการลบ foreign key constraint หมายเหตุ ... | `employees`, `job_history`, `jobs` | `ALTER TABLE DROP` | ✅ |
| **12** | #2453 | จงลบตาราง countries ด้วยการลบ foreign key constraint หมาย... | `countries`, `locations` | `ALTER TABLE DROP` | ✅ |
| **13** | #1551 | ลบคอลัมน์ title_id ในตาราง title_copy หมายเหตุ SAVEทุกคำส... | `title_copy` | `ALTER TABLE DROP` | ✅ |

---

## รายการโจทย์ วิธีคิด และคำตอบ

### ข้อที่ 1: จงเขียน SQL statementเพื่อสร้างตารางชื่อ title แบบ column-level ซึ่งมีโครงสร้... (Question #233)

* **โจทย์:** จงเขียน SQL statementเพื่อสร้างตารางชื่อ title แบบ column-level ซึ่งมีโครงสร้างดังต่อไปนี้

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id | Primary Key | NN, U | int |  |
| title |  | NN | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category |  |  | varchar | 20 |
| release\_date |  |  | date |  |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
create table title
( 
  title_id int primary key, 
  title varchar(60) not null, 
  description varchar(400) not null, 
  rating varchar(4), 
  category varchar(20), 
  release_date date
);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
create table title(
title_id int primary key,
title varchar(60) not null,
description varchar(400) not null,
rating varchar(4) , 
category varchar(20),
release_date date);
```

</details>

---

### ข้อที่ 2: จงเขียน SQL statement เพื่อสร้างตารางชื่อ title แบบ table-level และระบุชื่อ c... (Question #234)

* **โจทย์:** จงเขียน SQL statement เพื่อสร้างตารางชื่อ title แบบ table-level และระบุชื่อ constraint (โดยสามารถใช้ชื่ออะไรก็ได้) ซึ่งมีโครงสร้างดังต่อไปนี้

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id | Primary Key | NN, U | int |  |
| title |  | NN | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category |  |  | varchar | 20 |
| release\_date |  |  | date |  |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
create table title
( 
  title_id int, 
  title varchar(60) not null, 
  description varchar(400) not null, 
  rating varchar(4), 
  category varchar(20), 
  release_date date,
  primary key (title_id) 
);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
CREATE TABLE title (
    title_id INT  NOT NULL,
    title VARCHAR(60) NOT NULL,
    description VARCHAR(400) NOT NULL,
    rating VARCHAR(4),
    category VARCHAR(20),
    release_date DATE,
    CONSTRAINT pk_title PRIMARY KEY (title_id)
);
```

</details>

---

### ข้อที่ 3: จงเขียน SQL statement เพื่อสร้างตารางชื่อ title\_copy แบบ column-level constr... (Question #236)

* **โจทย์:** จงเขียน SQL statement เพื่อสร้างตารางชื่อ title\_copy แบบ column-level constraint (เฉพาะกรณีที่ไม่สามารถใส่ในระดับ column-level ได้ ให้นักศึกษาใส่ในระดับ table-level แทน) ซึ่งมีโครงสร้างดังต่อไปนี้
**หมายเหตุ**: Foreign Key reference หาตาราง title ด้วยชื่อ column เดียวกัน

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| copy\_id | Primary Key | NN, U | int |  |
| title\_id | Foreign Key | NN | int |  |
| status |  | NN | varchar | 15 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
create table title_copy
( 
  copy_id int primary key, 
  title_id int not null, 
  status varchar(15) not null, 
  foreign key (title_id) 
  references title(title_id)
);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
CREATE TABLE title_copy (
    copy_id INT  PRIMARY KEY,
    title_id INT NOT NULL,
    status VARCHAR(15) NOT NULL,
    CONSTRAINT fk_title_id FOREIGN KEY (title_id) REFERENCES title(title_id)
);
```

</details>

---

### ข้อที่ 4: จงเขียน SQL statement เพื่อสร้างตารางชื่อ title\_copy แบบ table-level ซึ่งมีโ... (Question #237)

* **โจทย์:** จงเขียน SQL statement เพื่อสร้างตารางชื่อ title\_copy แบบ table-level ซึ่งมีโครงสร้างดังต่อไปนี้
**หมายเหตุ**: Foreign Key reference หาตาราง title ด้วยชื่อ column เดียวกัน

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| copy\_id | Primary Key | NN, U | int |  |
| title\_id | Foreign Key | NN | int |  |
| status |  | NN | varchar | 15 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
create table title_copy
( 
  copy_id int, 
  title_id int not null, 
  status varchar(15) not null, 
  primary key (copy_id), 
  foreign key(title_id) references title(title_id)
);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
create table title_copy(
copy_id int primary key,
title_id int not null,
status varchar(15) not null,
FOREIGN KEY (title_id) REFERENCES title(title_id))
```

</details>

---

### ข้อที่ 5: จงเพิ่ม UNIQUE constraint ชื่อ title\_un ให้กับคอลัมน์ title ใน ตาราง title ห... (Question #2441)

* **โจทย์:** จงเพิ่ม UNIQUE constraint ชื่อ title\_un ให้กับคอลัมน์ title ใน ตาราง title หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id | Primary Key | NN, U | int |  |
| title |  | NN, U | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category |  |  | varchar | 20 |
| release\_date |  |  | date |  |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title
ADD CONSTRAINT title_un UNIQUE (title);
```

---

### ข้อที่ 6: จงเพิ่ม NOT NULL constraint ให้กับคอลัมน์ release\_date ใน ตาราง title หมายเห... (Question #2442)

* **โจทย์:** จงเพิ่ม NOT NULL constraint ให้กับคอลัมน์ release\_date ใน ตาราง title หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id | Primary Key | NN, U | int |  |
| title |  | NN | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category |  |  | varchar | 20 |
| release\_date |  | NN | date |  |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title
MODIFY release_date date NOT NULL;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
ALTER TABLE title 
MODIFY release_date DATE NOT NULL;
```

</details>

---

### ข้อที่ 7: จงเพิ่ม FOREIGN KEY constraint ชื่อ title\_cat\_fk ให้กับตาราง title โดยมี Pa... (Question #2443)

* **โจทย์:** จงเพิ่ม FOREIGN KEY constraint ชื่อ title\_cat\_fk ให้กับตาราง title โดยมี Parent table คือ title\_category
หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้
**ตาราง title**
**ตาราง title\_category**

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id | Primary Key | NN, U | int |  |
| title |  | NN, U | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category\_id | Foreign Key |  | int |  |
| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_category\_id | Primary Key | NN, U | int |  |
| category\_name |  |  | varchar | 20 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title
ADD CONSTRAINT title_cat_fk
FOREIGN KEY (category_id)
REFERENCES title_category (title_category_id);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
alter table title
ADD CONSTRAINT title_cat_fk FOREIGN KEY (category_id) references title_category(title_category_id);
```

</details>

---

### ข้อที่ 8: จงลบ PRIMARY KEY constraint ออกจาก ตาราง title หมายเหตุ SAVEทุกคำสั่งที่ใช้เพ... (Question #2444)

* **โจทย์:** จงลบ PRIMARY KEY constraint ออกจาก ตาราง title หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id |  | NN | int |  |
| title |  | NN | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category |  |  | varchar | 20 |
| release\_date |  |  | date |  |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title
DROP PRIMARY KEY;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
ALTER TABLE title DROP PRIMARY KEY;
```

</details>

---

### ข้อที่ 9: จงลบ UNIQUE constraint ออกจากคอลัมน์ title ใน ตาราง title (Question #2445)

* **โจทย์:** จงลบ UNIQUE constraint ออกจากคอลัมน์ title ใน ตาราง title

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| Column name | Key type | Null/Unique | Data type | Length |
| --- | --- | --- | --- | --- |
| title\_id | Primary Key | NN, U | int |  |
| title |  | NN | varchar | 60 |
| description |  | NN | varchar | 400 |
| rating |  |  | varchar | 4 |
| category\_id |  |  | int |  |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title
DROP INDEX title_un;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
ALTER TABLE title DROP INDEX title_un;
```

</details>

---

### ข้อที่ 10: จงลบตาราง employees และ ตาราง jobs ด้วยการ ไม่ลบ foreign key constraint หมายเ... (Question #2446)

* **โจทย์:** จงลบตาราง employees และ ตาราง jobs ด้วยการ ไม่ลบ foreign key constraint หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
SET         FOREIGN_KEY_CHECKS = 0;
DROP      TABLE      if exists    jobs;
DROP      TABLE      if exists    employees;
SET          FOREIGN_KEY_CHECKS = 1;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE  employees;
DROP TABLE  jobs;

SET FOREIGN_KEY_CHECKS = 1;
```

</details>

---

### ข้อที่ 11: จงลบตาราง jobs ด้วยการลบ foreign key constraint หมายเหตุ SAVEทุกคำสั่งที่ใช้เ... (Question #2452)

* **โจทย์:** จงลบตาราง jobs ด้วยการลบ foreign key constraint หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
alter table employees
drop foreign key employees_jobs_job_id;
alter table job_history
drop foreign key job_history_jobs_job_id;
drop table jobs;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
ALTER TABLE employees DROP FOREIGN KEY employees_jobs_job_id;
ALTER TABLE job_history DROP FOREIGN KEY job_history_jobs_job_id;
drop table jobs;
```

</details>

---

### ข้อที่ 12: จงลบตาราง countries ด้วยการลบ foreign key constraint หมายเหตุ SAVEทุกคำสั่งที... (Question #2453)

* **โจทย์:** จงลบตาราง countries ด้วยการลบ foreign key constraint หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
alter table locations
drop foreign key locations_countries_country_id;
drop table countries;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
ALTER TABLE countries  DROP FOREIGN KEY countries_regions_region_id;
alter table locations drop foreign key locations_countries_country_id;
drop table countries;
```

</details>

---

### ข้อที่ 13: ลบคอลัมน์ title_id ในตาราง title_copy หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถ... (Question #1551)

* **โจทย์:** ลบคอลัมน์ title_id ในตาราง title_copy หมายเหตุ SAVEทุกคำสั่งที่ใช้เพื่อตอบคำถามนี้

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title_copy
DROP foreign key title_copy_ibfk_1;
ALTER TABLE title_copy
DROP title_id;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
ALTER TABLE title_copy DROP FOREIGN KEY title_copy_ibfk_1 , 
drop title_id;
```

</details>

---

## เอกสารเชื่อมโยง (Backlinks)
* **เนื้อหาอ้างอิงบทเรียน:**
  * [[Chapter 01 Introduction to Database System & Relational Model]] (Integrity Constraints, PK/FK Relationships)
  * [[SQL-Lab-01-DDL-Creating and Managing Tables]] (การสร้างและปรับโครงสร้างตาราง DDL พื้นฐาน)
