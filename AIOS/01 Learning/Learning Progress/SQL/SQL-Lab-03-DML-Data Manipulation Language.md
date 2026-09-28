# แบบฝึกหัดและเฉลย SQL Lab 03: DML — Data Manipulation Language

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** SQL-Lab-03
* **หัวข้อ:** Data Manipulation (INSERT INTO, UPDATE, DELETE FROM, Single & Multi-row Operations)
* **แหล่งที่มา:** [DB Learning KMITL (Submission #105425)](https://dblearning.it.kmitl.ac.th/quiz/submission/105425)
* **วันที่ทำ:** 2026-08-13 09:56:51
* **ผลคะแนน:** ✅ ผ่าน (Passed) — 10/10 คะแนน
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/SQL/SQL-Lab-03-DML-Data Manipulation Language.md`

---

## สรุปภาพรวมหัวข้อที่ใช้ทดสอบ (Skills Matrix)

| ข้อที่ | รหัสโจทย์ | จุดประสงค์ / โจทย์ย่อ | ตารางที่เกี่ยวข้อง | คำสั่ง SQL หลัก | สถานะ |
|:---:|:---:|:---|:---|:---|:---:|
| **1** | #302 | เขียน SQL statement เพื่อเพิ่มข้อมูลลงในตาราง LAB\_EMP โด... | `lab_emp` | `INSERT INTO` | ✅ |
| **2** | #303 | เขียน SQL statements เพื่อเพิ่มข้อมูลลงในตาราง LAB\_EMP โ... | `lab_emp` | `INSERT INTO` | ✅ |
| **3** | #305 | เขียน SQL statements เพื่อแก้ไขนามสกุลของพนักงานรหัสที่ 3... | `lab_emp` | `UPDATE` | ✅ |
| **4** | #306 | เขียน SQL statements เพื่อแก้ไขเงินเดือนของพนักงานทุกคนจา... | `lab_emp` | `UPDATE` | ✅ |
| **5** | #307 | เขียน SQL statements เพื่อลบพนักงานที่มีชื่อจริงว่า Patty... | `lab_emp` | `DELETE` | ✅ |
| **6** | #2761 | จงเขียน SQL เพียง 1 Statement เพื่อเพิ่มข้อมูลเกี่ยวกับคว... | `interesting` | `INSERT INTO` | ✅ |
| **7** | #2763 | จงเขียน SQL statements เพื่อแก้ไขข้อมูลพนักงานดูแลอสังหาร... | `staff` | `UPDATE` | ✅ |
| **8** | #3098 | จงเขียน SQL statement เพื่อแก้ไขค่าทุกแถวในคอลัมน์ state_... | `locations` | `UPDATE` | ✅ |
| **9** | #3099 | เขียน SQL statement เพื่อลบข้อมูลทุกแถวในตาราง lab_emp | `lab_emp` | `DELETE` | ✅ |
| **10** | #3100 | เขียน SQL statement เพื่อลบแถวที่มีค่า salary น้อยกว่า 12... | `lab_emp` | `DELETE` | ✅ |

---

## รายการโจทย์ วิธีคิด และคำตอบ

### ข้อที่ 1: เขียน SQL statement เพื่อเพิ่มข้อมูลลงในตาราง LAB\_EMP โดยใช้ข้อมูลแถวแรกจากต... (Question #302)

* **โจทย์:** เขียน SQL statement เพื่อเพิ่มข้อมูลลงในตาราง LAB\_EMP โดยใช้ข้อมูลแถวแรกจากตารางที่กำหนดให้ โดย ไม่ต้องระบุชื่อคอลัมน์

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **ID** | **LAST\_NAME** | **FIRST\_NAME** | **USERID** | **SALARY** |
| --- | --- | --- | --- | --- |
| 1 | Pastel | Lorenze | lpastel | 895 |
| 2 | Dansk | Patty | pdansk | 860 |
| 3 | Brooks | Ben | bbrooks | 1100 |
| 4 | Newton | Ched | cnewton | 750 |
| 5 | Raff | Audrey | araff | 1550 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
INSERT INTO  LAB_EMP
VALUES           (1, 'Pastel','Lorenze', 'lpastel', 895);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
insert into lab_emp
values (1 , "Pastel" , 'Lorenze' , 'lpastel' , 895);
```

</details>

---

### ข้อที่ 2: เขียน SQL statements เพื่อเพิ่มข้อมูลลงในตาราง LAB\_EMP โดยใช้ข้อมูลแถวที่สอง... (Question #303)

* **โจทย์:** เขียน SQL statements เพื่อเพิ่มข้อมูลลงในตาราง LAB\_EMP โดยใช้ข้อมูลแถวที่สองจากตารางที่กำหนดให้ โดย ต้องระบุชื่อคอลัมน์

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| **ID** | **LAST\_NAME** | **FIRST\_NAME** | **USERID** | **SALARY** |
| --- | --- | --- | --- | --- |
| 1 | Pastel | Lorenze | lpastel | 895 |
| 2 | Dansk | Patty | pdansk | 860 |
| 3 | Brooks | Ben | bbrooks | 1100 |
| 4 | Newton | Ched | cnewton | 750 |
| 5 | Raff | Audrey | araff | 1550 |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
INSERT INTO  LAB_EMP (ID, LAST_NAME, FIRST_NAME, USERID,    SALARY)
VALUES                          (2, 'Dansk','Patty', 'pdansk', 860);
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
insert into lab_emp (id , last_name , first_name , userid , salary)
values (2 , "Dansk" , "Patty" , 'pdansk' , 860);
```

</details>

---

### ข้อที่ 3: เขียน SQL statements เพื่อแก้ไขนามสกุลของพนักงานรหัสที่ 3 เป็น Detroid (Question #305)

* **โจทย์:** เขียน SQL statements เพื่อแก้ไขนามสกุลของพนักงานรหัสที่ 3 เป็น Detroid

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
update lab_emp
set last_name = 'Detroid'
where id = 3;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
update lab_emp
set last_name = "Detroid"
where id = 3;
```

</details>

---

### ข้อที่ 4: เขียน SQL statements เพื่อแก้ไขเงินเดือนของพนักงานทุกคนจากที่ได้รับต่ำกว่า $9... (Question #306)

* **โจทย์:** เขียน SQL statements เพื่อแก้ไขเงินเดือนของพนักงานทุกคนจากที่ได้รับต่ำกว่า $900 เป็น $1,000

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
UPDATE     LAB_EMP
SET             salary = 1000
WHERE      salary < 900;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
update lab_emp
set salary = 1000
where salary < 900;
```

</details>

---

### ข้อที่ 5: เขียน SQL statements เพื่อลบพนักงานที่มีชื่อจริงว่า Patty และนามสกุลคือ Dansk... (Question #307)

* **โจทย์:** เขียน SQL statements เพื่อลบพนักงานที่มีชื่อจริงว่า Patty และนามสกุลคือ Dansk ออกจากตาราง LAB_EMP

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
DELETE   FROM     LAB_EMP
WHERE    first_name = 'Patty' and last_name='Dansk';
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
delete from lab_emp
where first_name = 'Patty' and last_name = 'Dansk';
```

</details>

---

### ข้อที่ 6: จงเขียน SQL เพียง 1 Statement เพื่อเพิ่มข้อมูลเกี่ยวกับความสนใจของลูกค้าจากตา... (Question #2761)

* **โจทย์:** จงเขียน SQL เพียง 1 Statement เพื่อเพิ่มข้อมูลเกี่ยวกับความสนใจของลูกค้าจากตาราง interesting ตามข้อมูลต่อไปนี้ (โดยไม่ระบุชื่อคอลัมน์)

* **โครงสร้างตาราง / ตัวอย่างข้อมูล:**

| ClientNo | PropNo | InterestDate | Comment |
| --- | --- | --- | --- |
| 20014 | 10011 | 2001-03-16 | Wonderful Interior |


* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
INSERT INTO interesting VALUES (20014, 10011, '2001-03-16', 'Wonderful Interior')
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
insert into interesting
values (20014 , 10011 , '2001-03-16' , 'Wonderful Interior');
```

</details>

---

### ข้อที่ 7: จงเขียน SQL statements เพื่อแก้ไขข้อมูลพนักงานดูแลอสังหาริมทรัพย์รหัส 400023 ... (Question #2763)

* **โจทย์:** จงเขียน SQL statements เพื่อแก้ไขข้อมูลพนักงานดูแลอสังหาริมทรัพย์รหัส 400023 ในตาราง staff ให้เงินเดือนเท่ากับ 700

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
UPDATE staff set salary = 700 where staffNo = 400023;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
update staff
set salary = 700
where staffno = 400023;
```

</details>

---

### ข้อที่ 8: จงเขียน SQL statement เพื่อแก้ไขค่าทุกแถวในคอลัมน์ state_province ของตาราง lo... (Question #3098)

* **โจทย์:** จงเขียน SQL statement เพื่อแก้ไขค่าทุกแถวในคอลัมน์ state_province ของตาราง locations เป็น ค่า NULL

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
UPDATE locations
SET    state_province = NULL;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
update locations
set state_province = null;
```

</details>

---

### ข้อที่ 9: เขียน SQL statement เพื่อลบข้อมูลทุกแถวในตาราง lab_emp (Question #3099)

* **โจทย์:** เขียน SQL statement เพื่อลบข้อมูลทุกแถวในตาราง lab_emp

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
DELETE FROM lab_emp;
```

<details>
<summary>💡 ดูคำตอบที่ส่งตรวจ (User Submission)</summary>

```sql
delete from lab_emp
```

</details>

---

### ข้อที่ 10: เขียน SQL statement เพื่อลบแถวที่มีค่า salary น้อยกว่า 1200 ออกจากตาราง lab_emp (Question #3100)

* **โจทย์:** เขียน SQL statement เพื่อลบแถวที่มีค่า salary น้อยกว่า 1200 ออกจากตาราง lab_emp

* **SQL Query (คำตอบที่ถูกต้อง):**
```sql
DELETE FROM lab_emp
WHERE salary < 1200;
```

---

## เอกสารเชื่อมโยง (Backlinks)
* **เนื้อหาอ้างอิงบทเรียน:**
  * [[Chapter 01 Introduction to Database System & Relational Model]] (ข้อมูลและการจัดการข้อมูลในตาราง)
  * [[SQL-Lab-01-DDL-Creating and Managing Tables]] (ตารางเป้าหมายที่ใช้จัดการข้อมูล)
