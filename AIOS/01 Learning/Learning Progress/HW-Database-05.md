# HW-Database-05: Les13 Controlling User Access

> **วิชา:** Database (Oracle SQL) | **ที่มาของโจทย์:** `Resources/Books/Database/Les13_1.pdf` (20 slides)
> **โน้ตประกอบ:** [[Les13 Controlling User Access]]
> **ป้ายแหล่งที่มา:** โจทย์สร้างจากเนื้อหาในสไลด์; เฉลยอ้างเลขสไลด์ `[p.N]` ข้อหรือส่วนที่เพิ่มเกินสไลด์ติดป้าย `[Source: generated — not verified against original document]`
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/ประยุกต์
> **หมายเหตุ:** Practice 13 (p.20) ไม่มีโจทย์ในไฟล์ แบบฝึกหัดนี้ออกใหม่จากเนื้อหาสไลด์

---

## Section A: System privileges และ Users — ระดับ ⭐

**A1.** Database security แบ่งเป็นกี่ด้านอะไรบ้าง และ system privileges กับ object privileges ต่างกันอย่างไร

<details><summary>เฉลย</summary>

แบ่งเป็น System security และ Data security; System privileges = การเข้าถึงฐานข้อมูล, Object privileges = การจัดการเนื้อหาของ database objects [p.4]
</details>

**A2.** ยกตัวอย่างงานที่ DBA ทำได้ด้วย system privileges ระดับสูง 4 อย่าง

<details><summary>เฉลย</summary>

สร้าง users ใหม่, ลบ users, ลบ tables, backup tables [p.5] (สไลด์ระบุว่ามี system privileges มากกว่า 100 ตัว)
</details>

**A3.** เขียนคำสั่งสร้าง user ชื่อ `scott` รหัสผ่าน `tiger` แล้วให้สิทธิ์ create session, create table, create sequence, create view

<details><summary>เฉลย</summary>

```sql
CREATE USER scott
IDENTIFIED BY tiger;

GRANT create session, create table,
      create sequence, create view
TO    scott;
```

[p.6, 8]
</details>

**A4.** user เปลี่ยนรหัสผ่านของตนเองเป็น `lion` ด้วยคำสั่งอะไร

<details><summary>เฉลย</summary>

```sql
ALTER USER scott
IDENTIFIED BY lion;
```

[p.11]
</details>

---

## Section B: Roles — ระดับ ⭐⭐

**B1.** สไลด์เปรียบเทียบการจัดสรร privileges แบบมีและไม่มี role อย่างไร

<details><summary>เฉลย</summary>

p.9 แสดงรูปสองแบบ: ไม่ใช้ role แต่ละ user เชื่อมไปยัง privileges โดยตรง; ใช้ role (Manager) users เชื่อมเข้า role แล้ว role เชื่อมไปยัง privileges [p.9] เป้าหมายตามวัตถุประสงค์: สร้าง roles เพื่อให้ตั้งค่าและดูแลโมเดลความปลอดภัยง่ายขึ้น [p.2]
</details>

**B2.** เขียนคำสั่ง 3 ขั้นเพื่อสร้าง role `manager` ที่มีสิทธิ์ create table และ create view แล้วให้ DEHAAN และ KOCHHAR

<details><summary>เฉลย</summary>

```sql
CREATE ROLE manager;
GRANT create table, create view TO manager;
GRANT manager TO DEHAAN, KOCHHAR;
```

[p.10]
</details>

**B3.** `GRANT` ใน p.7 รับผู้รับได้ชนิดใดบ้าง

<details><summary>เฉลย</summary>

user, role หรือ PUBLIC (`TO user [, user| role, PUBLIC...]`) [p.7]
</details>

---

## Section C: Object privileges — ระดับ ⭐⭐

**C1.** ตอบจากตารางใน p.12: (ก) privilege ใดใช้กับ Procedure ได้ (ข) privilege ใดใช้กับ Sequence ได้ (ค) privilege ใดใช้กับ Table แต่ไม่ใช้กับ View

<details><summary>เฉลย</summary>

(ก) EXECUTE (ข) ALTER และ SELECT (ค) ALTER และ INDEX [p.12]
</details>

**C2.** owner ของ object มี privileges ใดบน object ของตน และให้ privileges แก่ผู้อื่นได้หรือไม่

<details><summary>เฉลย</summary>

owner มีทุก privileges บน object และให้ privileges เฉพาะบน object ของตนได้ [p.13]
</details>

**C3.** เขียนคำสั่งให้ `sue` และ `rich` query ตาราง EMPLOYEES ได้ และให้ `scott` กับ role `manager` update เฉพาะคอลัมน์ `department_name`, `location_id` ของ DEPARTMENTS

<details><summary>เฉลย</summary>

```sql
GRANT select
ON    employees
TO    sue, rich;

GRANT update (department_name, location_id)
ON    departments
TO    scott, manager;
```

[p.14]
</details>

---

## Section D: WITH GRANT OPTION, PUBLIC และ Data dictionary — ระดับ ⭐⭐

**D1.** `WITH GRANT OPTION` และ `PUBLIC` ทำอะไร พร้อมตัวอย่างคำสั่ง

<details><summary>เฉลย</summary>

`WITH GRANT OPTION` ให้ user มีอำนาจส่งต่อ privileges เช่น `GRANT select, insert ON departments TO scott WITH GRANT OPTION;`; `PUBLIC` ให้ผู้ใช้ทุกคนในระบบ เช่น `GRANT select ON alice.departments TO PUBLIC;` [p.15]
</details>

**D2.** จับคู่ data dictionary view กับคำอธิบาย: (1) USER_ROLE_PRIVS (2) USER_TAB_PRIVS_MADE (3) USER_TAB_PRIVS_RECD (4) USER_SYS_PRIVS

<details><summary>เฉลย</summary>

(1) Roles ที่ user เข้าถึงได้; (2) Object privileges ที่ให้บน objects ของ user; (3) Object privileges ที่ให้แก่ user; (4) แสดง system privileges ที่ให้แก่ user [p.16]
</details>

**D3.** view ใดแสดง privileges ที่ให้บนระดับคอลัมน์ ทั้งฝั่งที่ให้และฝั่งที่ได้รับ

<details><summary>เฉลย</summary>

`USER_COL_PRIVS_MADE` (ที่ให้บนคอลัมน์ของ objects ของ user) และ `USER_COL_PRIVS_RECD` (ที่ให้แก่ user บนคอลัมน์เฉพาะ) [p.16]
</details>

---

## Section E: REVOKE — ระดับ ⭐⭐⭐

**E1.** เขียนคำสั่งที่ Alice ใช้ถอน SELECT และ INSERT ที่ให้ Scott บน DEPARTMENTS

<details><summary>เฉลย</summary>

```sql
REVOKE select, insert
ON     departments
FROM   scott;
```

ผลในสไลด์: `Revoke succeeded.` [p.18]
</details>

**E2.** Alice ให้ `select, insert` บน departments แก่ scott ด้วย `WITH GRANT OPTION` แล้ว scott ส่งต่อให้ผู้อื่น ถ้า Alice ถอนสิทธิ์จาก scott ผู้ที่ scott ส่งต่อให้จะเป็นอย่างไร

<details><summary>เฉลย</summary>

ถูกถอนไปด้วย เพราะสไลด์ระบุว่า privileges ที่ให้ผู้อื่นผ่าน `WITH GRANT OPTION` ถูกเพิกถอนด้วย [p.17] 

> 💡 *[Source: generated — not verified against original document]* สถานการณ์ตัวอย่าง (scott ส่งต่อให้ผู้อื่น) เป็นของผู้เขียนโจทย์ ต่อยอดจาก p.15 และ p.17
</details>

**E3.** ระบุรูปแบบไวยากรณ์ของ REVOKE และส่วนที่เป็น optional

<details><summary>เฉลย</summary>

`REVOKE {privilege [, privilege...]|ALL} ON object FROM {user[, user...]|role|PUBLIC} [CASCADE CONSTRAINTS];` — `[CASCADE CONSTRAINTS]` อยู่ในวงเล็บเหลี่ยม [p.17]

> 💡 *[Source: generated — not verified against original document]* สไลด์ไม่ได้อธิบายความหมายของ CASCADE CONSTRAINTS เพียงแสดงในรูปแบบไวยากรณ์
</details>

---

## Section F: สรุปคำสั่ง — ระดับ ⭐⭐

**F1.** จับคู่คำสั่งกับการทำงาน: CREATE USER, GRANT, CREATE ROLE, ALTER USER, REVOKE

<details><summary>เฉลย</summary>

CREATE USER = สร้าง user (โดยปกติโดย DBA); GRANT = ให้ users อื่นมีสิทธิ์เข้าถึง objects ของคุณ; CREATE ROLE = สร้างกลุ่มของ privileges (โดยปกติโดย DBA); ALTER USER = เปลี่ยนรหัสผ่านของ user; REVOKE = ถอน privileges บน object จาก users [p.19]
</details>

**F2.** วัตถุประสงค์ของบทมีเรื่อง database links แต่ไฟล์สไลด์นี้ครอบคลุมหรือไม่

<details><summary>เฉลย</summary>

ไม่ครอบคลุม: p.2 ระบุ "Create and access database links" แต่ไม่มีสไลด์ใดอธิบาย (p.3-20)
</details>

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **โน้ตประกอบ:** [[Les13 Controlling User Access]]
* **แบบฝึกหัดก่อนหน้า:** [[HW-Database-04]]
* **แหล่งข้อมูล:** `Resources/Books/Database/Les13_1.pdf`
