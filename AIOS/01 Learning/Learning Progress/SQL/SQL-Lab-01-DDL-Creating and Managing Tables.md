# แบบฝึกหัดและเฉลย SQL Lab 01: DDL — Creating and Managing Tables

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** SQL-Lab-01
* **หัวข้อ:** Data Definition Language (CREATE TABLE, ALTER TABLE, DROP, RENAME, DESCRIBE)
* **แหล่งที่มา:** [DB Learning KMITL (Submission #105361)](https://dblearning.it.kmitl.ac.th/quiz/submission/105361)
* **วันที่ทำ:** 2026-08-10 19:27:30
* **ผลคะแนน:** ✅ ผ่าน (Passed) — 6/7 คะแนน
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/SQL/SQL-Lab-01-DDL-Creating and Managing Tables.md`

---

## สรุปภาพรวมหัวข้อที่ใช้ทดสอบ (Skills Matrix)

| ข้อที่ | รหัสโจทย์ | จุดประสงค์ / โจทย์ย่อ | ตารางที่เกี่ยวข้อง | คำสั่ง SQL หลัก | สถานะ |
|:---:|:---:|:---|:---|:---|:---:|
| **1** | #235 | จงเขียน SQL statement เพื่อแก้ไขขนาดของข้อมูล (Length) ขอ... | `title` | `ALTER TABLE MODIFY` | ✅ |
| **2** | #238 | ลบคอลัมน์ status ออกจากตาราง title_copy และแสดงคำสั่งเพื่... | `title_copy` | `ALTER TABLE DROP` | ✅ |
| **3** | #239 | ลบตาราง title_copy | `title_copy` | `DROP TABLE` | ✅ |
| **4** | #240 | เปลี่ยนชื่อตาราง title เป็น movie_master | `title` | `RENAME TABLE` | ✅ |
| **5** | #1549 | จงเขียน SQL statement เพื่อลบคอลัมน์ RATING | `title` | `ALTER TABLE DROP` | ✅ |
| **6** | #1550 | จงเขียน SQL statement เพื่อแก้ไขชนิดข้อมูล ของ status เป็... | `title_copy` | `ALTER TABLE MODIFY` | ❌ |
| **7** | #232 | จงสร้างตารางชื่อ STAFF ซึ่งมีโครงสร้างดังต่อไปนี้ | `staff` | `CREATE TABLE` | ✅ |

---

## รายการโจทย์ วิธีคิด และคำตอบ

### ข้อที่ 1: จงเขียน SQL statement เพื่อแก้ไขขนาดของข้อมูล (Length) ของ category เป็น 25 (Question #235)

* **โจทย์:** จงเขียน SQL statement เพื่อแก้ไขขนาดของข้อมูล (Length) ของ category เป็น 25

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title MODIFY category VARCHAR(25) ;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
alter table title
modify category varchar(25)
```

</details>

---

### ข้อที่ 2: ลบคอลัมน์ status ออกจากตาราง title_copy และแสดงคำสั่งเพื่อดูโครงสร้างหลังจากก... (Question #238)

* **โจทย์:** ลบคอลัมน์ status ออกจากตาราง title_copy และแสดงคำสั่งเพื่อดูโครงสร้างหลังจากการลบคอลัมน์

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title_copy DROP COLUMN status;
DESCRIBE title_copy;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
alter table title_copy
drop status;
describe title_copy;
```

</details>

---

### ข้อที่ 3: ลบตาราง title_copy (Question #239)

* **โจทย์:** ลบตาราง title_copy

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
DROP TABLE title_copy;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
drop table title_copy
```

</details>

---

### ข้อที่ 4: เปลี่ยนชื่อตาราง title เป็น movie_master (Question #240)

* **โจทย์:** เปลี่ยนชื่อตาราง title เป็น movie_master

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
RENAME TABLE title TO movie_master;
```

---

### ข้อที่ 5: จงเขียน SQL statement เพื่อลบคอลัมน์ RATING (Question #1549)

* **โจทย์:** จงเขียน SQL statement เพื่อลบคอลัมน์ RATING

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title
drop rating;
```

---

### ข้อที่ 6: จงเขียน SQL statement เพื่อแก้ไขชนิดข้อมูล ของ status เป็น char 50 ตัวอักษร (Question #1550) *(ต้องทบทวน ⚠️)*

* **โจทย์:** จงเขียน SQL statement เพื่อแก้ไขชนิดข้อมูล ของ status เป็น char 50 ตัวอักษร

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
ALTER TABLE title_copy
MODIFY status char(50);
```

> [!WARNING] **วิเคราะห์ข้อผิดพลาด (Error Analysis):**
> * **ข้อความ Error จากระบบ:** `IA01: title_copy.attributes.status.datatype should be char instead of varchar.`
> * **สาเหตุและจุดที่ผิด:** ชนิดข้อมูล (Data Type) ไม่ตรงตามที่โจทย์กำหนด (ตรวจสอบการใช้ CHAR vs VARCHAR หรือ Data Length)
> * **คำตอบเดิมที่ส่ง:**
>   ```sql
>   alter table title_copy
>   modify status varchar(50)
>   ```
> * **แนวทางแก้ไข:** ตรวจสอบข้อกำหนดในโจทย์และคำตอบที่ถูกต้องด้านบนเพื่อเปรียบเทียบ syntax ที่ถูกต้อง

---

### ข้อที่ 7: จงสร้างตารางชื่อ STAFF ซึ่งมีโครงสร้างดังต่อไปนี้ (Question #232)

* **โจทย์:** จงสร้างตารางชื่อ STAFF ซึ่งมีโครงสร้างดังต่อไปนี้

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **Column name** | **Data Type** | **Length** |
| --- | --- | --- |
| staff\_id | int | 5 |
| first\_name | varchar | 25 |
| last\_name | varchar | 25 |
| address | varchar | 150 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
CREATE TABLE STAFF
(
  staff_id INT(5) ,
  first_name VARCHAR(25) ,
  last_name VARCHAR(25),
  address VARCHAR(150)
);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
create table STAFF(
staff_id int(5),
first_name varchar(25),
last_name varchar(25),
address varchar(150)
);
```

</details>

---

## เอกสารเชื่อมโยง (Backlinks)
* **เนื้อหาอ้างอิงบทเรียน:**
  * [[Chapter 01 Introduction to Database System & Relational Model]] (พื้นฐาน Relational Model, Data Types และ Table Structure)
