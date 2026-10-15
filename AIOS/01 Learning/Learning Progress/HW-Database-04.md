# HW-Database-04: Les03 Single-Row Functions

> **วิชา:** Database (Oracle SQL) | **ที่มาของโจทย์:** `Resources/Books/Database/Les03  -  Compatibility Mode.pdf` (66 slides)
> **โน้ตประกอบ:** [[Les03 Single-Row Functions]]
> **ป้ายแหล่งที่มา:** โจทย์สร้างจากเนื้อหาในสไลด์; เฉลยอ้างเลขสไลด์ `[p.N]` ข้อหรือส่วนที่เพิ่มเกินสไลด์ติดป้าย `[Source: generated — not verified against original document]`
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/ประยุกต์
> **หมายเหตุ:** Practice 3 ของสไลด์ (p.24, 59) ไม่มีโจทย์อยู่ในไฟล์ (p.60-66 ว่าง) แบบฝึกหัดนี้จึงออกใหม่ทั้งหมดจากเนื้อหาสไลด์

---

## Section A: ภาพรวมและ Character Functions — ระดับ ⭐

**A1.** Single-row function ต่างจาก Multiple-row function อย่างไร และมีคุณสมบัติอะไรบ้างตามสไลด์

<details><summary>เฉลย</summary>

สไลด์แบ่งฟังก์ชันเป็น Single-row กับ Multiple-row [p.4] (ความต่างเชิงจำนวนผลลัพธ์: Single-row คืนหนึ่งค่าต่อแถว [p.5]; สไลด์ไม่อธิบาย Multiple-row เพิ่ม) คุณสมบัติของ Single-row: จัดการข้อมูลรายตัว, รับ arguments และคืนค่าหนึ่งค่า, ทำงานกับแต่ละแถว, คืนหนึ่งผลลัพธ์ต่อแถว, อาจเปลี่ยน data type, ซ้อนกันได้, arguments เป็นคอลัมน์หรือ expression ได้ [p.5]
</details>

**A2.** ทำไม `WHERE last_name = 'higgins'` จึงได้ "no rows selected" และแก้อย่างไร

<details><summary>เฉลย</summary>

สไลด์แสดงว่าคิวรีนี้ไม่พบแถว และให้แก้เป็น `WHERE LOWER(last_name) = 'higgins'` ซึ่งได้ 205 Higgins 110 [p.10]

> 💡 *[Source: generated — not verified against original document]* สาเหตุคือค่าที่เก็บเป็น `Higgins` และการเปรียบเทียบสตริงแยกตัวพิมพ์เล็ก/ใหญ่ การแปลงคอลัมน์เป็นตัวพิมพ์เล็กก่อนเทียบจึงตรงกัน
</details>

**A3.** จงหาผลของแต่ละนิพจน์: (ก) `UPPER('SQL Course')` (ข) `INITCAP('SQL Course')` (ค) `SUBSTR('HelloWorld',1,5)` (ง) `INSTR('HelloWorld','W')` (จ) `LPAD(salary,10,'*')` เมื่อ salary = 24000 (ฉ) `TRIM('H' FROM 'HelloWorld')`

<details><summary>เฉลย</summary>

(ก) SQL COURSE [p.9] (ข) Sql Course [p.9] (ค) Hello [p.11] (ง) 6 [p.11] (จ) \*\*\*\*\*24000 [p.11] (ฉ) elloWorld [p.11]
</details>

---

## Section B: Number Functions — ระดับ ⭐

**B1.** จงหาผล: `ROUND(45.926, 2)`, `TRUNC(45.926, 2)`, `MOD(1600, 300)`

<details><summary>เฉลย</summary>

45.93, 45.92, 100 [p.13]
</details>

**B2.** จงหาผลของ `ROUND(45.923,2)`, `ROUND(45.923,0)`, `ROUND(45.923,-1)` และ `TRUNC(45.923,2)`, `TRUNC(45.923)`, `TRUNC(45.923,-2)`

<details><summary>เฉลย</summary>

ROUND: 45.92, 46, 50 [p.14]; TRUNC: 45.92, 45, 0 [p.15]
</details>

**B3.** `FROM DUAL` ในตัวอย่างสไลด์คืออะไร

<details><summary>เฉลย</summary>

DUAL เป็น dummy table ที่ใช้ดูผลของฟังก์ชันและการคำนวณ [p.14]
</details>

**B4.** พนักงาน SA_REP เงินเดือน 11000, 8600, 7000 ให้ `MOD(salary, 5000)` ได้เท่าใด

<details><summary>เฉลย</summary>

1000, 3600, 2000 (Abel, Taylor, Grant) [p.16]
</details>

---

## Section C: Date Functions — ระดับ ⭐⭐

**C1.** รูปแบบวันที่แสดงผลเริ่มต้นของ Oracle คืออะไร และ Oracle เก็บวันที่ในรูปแบบภายในอย่างไร

<details><summary>เฉลย</summary>

แสดงผลเริ่มต้น `DD-MON-RR`; เก็บเป็นตัวเลขภายใน: century, year, month, day, hours, minutes, seconds [p.17]
</details>

**C2.** สไลด์สรุปกฎเลขคณิตของวันที่ไว้อย่างไร 3 ข้อ

<details><summary>เฉลย</summary>

บวก/ลบตัวเลขกับวันที่ได้วันที่; ลบวันที่สองค่าได้จำนวนวัน; เพิ่มชั่วโมงโดยหารจำนวนชั่วโมงด้วย 24 [p.19]

> 💡 *[Source: generated — not verified against original document]* ตัวอย่าง: เพิ่ม 6 ชั่วโมงเขียนเป็น `SYSDATE + 6/24`
</details>

**C3.** จงหาผล: `ADD_MONTHS('11-JAN-94',6)`, `NEXT_DAY('01-SEP-95','FRIDAY')`, `LAST_DAY('01-FEB-95')`

<details><summary>เฉลย</summary>

'11-JUL-94', '08-SEP-95', '28-FEB-95' [p.22]
</details>

**C4.** สมมติ `SYSDATE = '25-JUL-95'` จงหาผลของ `ROUND(SYSDATE,'MONTH')`, `ROUND(SYSDATE,'YEAR')`, `TRUNC(SYSDATE,'MONTH')`, `TRUNC(SYSDATE,'YEAR')`

<details><summary>เฉลย</summary>

01-AUG-95, 01-JAN-96, 01-JUL-95, 01-JAN-95 [p.23]
</details>

**C5.** `MONTHS_BETWEEN('01-SEP-95','11-JAN-94')` ได้ 19.6774194 หมายความว่าอะไร

<details><summary>เฉลย</summary>

MONTHS_BETWEEN คืนจำนวนเดือนระหว่างสองวันที่ [p.21-22]

> 💡 *[Source: generated — not verified against original document]* ค่านี้คือ 19 เดือนเต็มกับเศษของเดือนเป็นทศนิยม จึงไม่ใช่จำนวนเต็ม
</details>

---

## Section D: Conversion Functions — ระดับ ⭐⭐

**D1.** Oracle แปลงชนิดข้อมูลให้อัตโนมัติ (implicit) ในกรณี assignment ได้จากชนิดใดเป็นชนิดใด

<details><summary>เฉลย</summary>

VARCHAR2/CHAR → NUMBER, VARCHAR2/CHAR → DATE, NUMBER → VARCHAR2, DATE → VARCHAR2 [p.26] สำหรับ expression evaluation: VARCHAR2/CHAR → NUMBER และ → DATE [p.27]
</details>

**D2.** จับคู่ฟังก์ชันกับทิศทางการแปลง: TO_CHAR, TO_NUMBER, TO_DATE

<details><summary>เฉลย</summary>

TO_CHAR แปลง NUMBER หรือ DATE เป็น CHARACTER; TO_NUMBER แปลง CHARACTER เป็น NUMBER; TO_DATE แปลง CHARACTER เป็น DATE [p.28-30]
</details>

**D3.** จงเขียนผลของ format models เหล่านี้ตามสไลด์: `'HH24:MI:SS AM'`, `'DD "of" MONTH'`, `'ddspth'`

<details><summary>เฉลย</summary>

15:45:32 PM, 12 of OCTOBER, fourteenth [p.34]
</details>

**D4.** `fm` ใน format model ของ TO_CHAR ทำอะไร และ format model ต้องมีลักษณะอย่างไร

<details><summary>เฉลย</summary>

`fm` ตัดช่องว่างที่เติมหรือเลขศูนย์นำ; format model ต้องอยู่ใน single quotes, case sensitive, ใช้ date format element ที่ถูกต้อง และคั่นจากค่า date ด้วยจุลภาค [p.31] ตัวอย่าง `fmDD Month YYYY` ให้ "17 June 1987" สำหรับ King [p.36]
</details>

**D5.** `TO_CHAR(salary, '$99,999.00')` กับ salary ของ Ernst (6000) ให้ผลอะไร และตัวอักษร 9, 0, $, L, ., "," หมายถึงอะไร

<details><summary>เฉลย</summary>

ผล `$6,000.00` [p.38]; 9 = แทนตัวเลข, 0 = บังคับแสดงศูนย์, $ = เครื่องหมายดอลลาร์แบบลอย, L = สัญลักษณ์สกุลเงินท้องถิ่นแบบลอย, . = จุดทศนิยม, "," = ตัวคั่นหลักพัน [p.37]
</details>

**D6.** `fx` modifier ใช้ทำอะไร

<details><summary>เฉลย</summary>

ระบุให้ character argument ตรงกับ date format model ของ TO_DATE แบบเป๊ะ [p.39]
</details>

---

## Section E: RR Date Format — ระดับ ⭐⭐⭐

**E1.** เติมตาราง: ปีปัจจุบัน / วันที่ที่ระบุ → RR และ YY

| Current Year | Specified Date | RR | YY |
| :-: | :-: | :-: | :-: |
| 1995 | 27-OCT-95 | ? | ? |
| 1995 | 27-OCT-17 | ? | ? |
| 2001 | 27-OCT-17 | ? | ? |
| 2001 | 27-OCT-95 | ? | ? |

<details><summary>เฉลย</summary>

RR/YY: 1995/1995; 2017/1917; 2017/2017; 1995/2095 [p.41]
</details>

**E2.** ถ้าปีปัจจุบันสองหลักอยู่ช่วง 50–99 และปีที่ระบุ 0–49 วันที่ที่คืนอยู่ในศตวรรษใด ถ้าปีที่ระบุอยู่ช่วง 50–99 ล่ะ

<details><summary>เฉลย</summary>

ปีที่ระบุ 0–49: ศตวรรษถัดไป; ปีที่ระบุ 50–99: ศตวรรษปัจจุบัน [p.41]
</details>

**E3.** ทำไมสไลด์แนะนำ `TO_DATE('01-Jan-90', 'DD-Mon-RR')` เพื่อหาพนักงานที่จ้างก่อนปี 1990 และผลลัพธ์ในภาพมีใครบ้าง

<details><summary>เฉลย</summary>

เพราะ RR ให้ผลเหมือนกันไม่ว่ารันในปี 1999 หรือปัจจุบัน; ผลในภาพ: King 17-Jun-1987, Kochhar 21-Sep-1989, Whalen 17-Sep-1987 [p.42]
</details>

---

## Section F: Nesting, NULL และ Conditional — ระดับ ⭐⭐⭐

**F1.** ฟังก์ชันซ้อน `F3(F2(F1(col,arg1),arg2),arg3)` ประเมินตามลำดับใด และ `NVL(TO_CHAR(manager_id), 'No Manager')` ทำงานอย่างไร

<details><summary>เฉลย</summary>

ประเมินจากระดับลึกสุดไปตื้นสุด คือ F1 → F2 → F3 [p.43] ในตัวอย่าง TO_CHAR แปลง manager_id เป็นสตริงก่อน แล้ว NVL แทน NULL ด้วย 'No Manager' ผลคือ King | No Manager [p.44]

> 💡 *[Source: generated — not verified against original document]* TO_CHAR ถูกใช้ก่อนเพราะ NVL ต้องการ data type ที่ตรงกัน [p.46]
</details>

**F2.** NVL ต้องระวังเรื่องอะไรเกี่ยวกับ data type และ COALESCE ได้เปรียบ NVL อย่างไร

<details><summary>เฉลย</summary>

data type ต้องตรงกัน เช่น `NVL(commission_pct,0)`, `NVL(hire_date,'01-JAN-97')`, `NVL(job_id,'No Job Yet')` [p.46]; COALESCE รับค่าทางเลือกได้หลายค่า คืน expression แรกที่ไม่เป็น NULL [p.50]
</details>

**F3.** จากตารางผล NULLIF ในสไลด์ ทำไม Bruce/Ernst และ Curtis/Davies ได้ RESULT ว่าง

<details><summary>เฉลย</summary>

ความยาวชื่อเท่ากัน (5/5 และ 6/6) ผลจึงว่าง ส่วนแถวอื่นได้ค่า expr1 เช่น Steven/King 6 กับ 4 ได้ 6 [p.49 อ่านจากภาพ]

> 💡 *[Source: generated — not verified against original document]* NULLIF(expr1, expr2) คืน NULL เมื่อสองค่าเท่ากัน มิฉะนั้นคืน expr1 สไลด์ไม่ได้นิยามเป็นข้อความ สรุปจากผลในภาพ
</details>

**F4.** NVL2(commission_pct, 'SAL+COMM', 'SAL') ให้ INCOME อะไรกับ Zlotkey (.2) และ Mourgos (ว่าง)

<details><summary>เฉลย</summary>

Zlotkey: SAL+COMM; Mourgos: SAL [p.48]
</details>

**F5.** เขียน CASE ที่ให้ผลเทียบเท่า `DECODE(job_id, 'IT_PROG', 1.10*salary, 'ST_CLERK', 1.15*salary, 'SA_REP', 1.20*salary, salary)` และบอก REVISED_SALARY ของ Rajs (ST_CLERK, 3500)

<details><summary>เฉลย</summary>

```sql
CASE job_id WHEN 'IT_PROG'  THEN 1.10*salary
            WHEN 'ST_CLERK' THEN 1.15*salary
            WHEN 'SA_REP'   THEN 1.20*salary
            ELSE salary END "REVISED_SALARY"
```

[p.54, 56] Rajs ได้ 4025 [p.54, 56]
</details>

**F6.** ตัวอย่างอัตราภาษีใช้ `DECODE(TRUNC(salary/2000, 0), 0, 0.00, 1, 0.09, 2, 0.20, 3, 0.30, 4, 0.40, 5, 0.42, 6, 0.44, 0.45)` จงหา TAX_RATE ของเงินเดือน 10500, 8600, 3500, 14000

<details><summary>เฉลย</summary>

> 💡 *[Source: generated — not verified against original document]* คำนวณจากสูตรใน p.57 (สไลด์ไม่มีผลลัพธ์): 10500/2000 = 5.25 → 5 → 0.42; 8600/2000 = 4.3 → 4 → 0.40; 3500/2000 = 1.75 → 1 → 0.09; 14000/2000 = 7 → ไม่ตรง 0–6 ใช้ default → 0.45
</details>

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **โน้ตประกอบ:** [[Les03 Single-Row Functions]]
* **แบบฝึกหัดก่อนหน้า:** [[HW-Database-03]]
* **แหล่งข้อมูล:** `Resources/Books/Database/Les03  -  Compatibility Mode.pdf`
