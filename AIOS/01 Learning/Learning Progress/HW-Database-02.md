# HW-Database-02: Chapter 07 Introduction to Transaction and Recovery

> **วิชา:** 06066300 Database System Concept | **ที่มาของโจทย์:** `Resources/Books/Database/Database_Concept_07(2).pdf` (52 slides)
> **โน้ตประกอบ:** [[Chapter 07 Introduction to Transaction and Recovery]]
> **ป้ายแหล่งที่มา:** โจทย์ทุกข้อสร้างจากเนื้อหาในสไลด์; เฉลยอ้างเลขสไลด์ `[p.N]` ข้อที่เพิ่มเกินสไลด์ติดป้าย `[Source: generated — not verified against original document]`
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/ประยุกต์

---

## Section A: Transaction, Sync Point และ ACID — ระดับ ⭐⭐

**A1.** Transaction คืออะไร และสไลด์พูดถึงสถานะของฐานข้อมูลระหว่างทำงานกับตอน commit ไว้อย่างไร (⭐)

<details><summary>เฉลย</summary>

Transaction คือ unit of program execution ที่เข้าถึงและอาจปรับปรุง data item หลายตัว [p.6] (ฉบับไทย: กลุ่มของคำสั่งที่กระทำกับข้อมูล เช่น การเข้าถึงหรือปรับปรุงข้อมูล [p.4]) ระหว่างทำงานฐานข้อมูลอาจ inconsistent แต่ตอน commit ต้อง consistent [p.6]
</details>

**A2.** อธิบายความต่างของ Commit กับ Rollback และผลของ `Set autocommit on` / `off`

<details><summary>เฉลย</summary>

Commit ยืนยันการเปลี่ยนแปลงตั้งแต่ Syncpoint ล่าสุดถึงจุด commit (อาจยังอยู่ใน buffer ไม่ต้องลง disk); Rollback ยกเลิกการเปลี่ยนแปลงตั้งแต่จุด rollback ไปจนถึง sync point ล่าสุด autocommit on = DBMS commit อัตโนมัติหลังแต่ละคำสั่ง; off = ไม่ commit จนกว่าจะมีคำสั่ง commit [p.8]
</details>

**A3.** จากตัวอย่างโอนเงิน $50 จาก A ไป B ให้ระบุว่า Consistency requirement และ Atomicity requirement ของ transaction นี้คืออะไร

<details><summary>เฉลย</summary>

Consistency: ผลรวมของ A และ B ต้องไม่เปลี่ยนจากการรัน transaction; Atomicity: ถ้า transaction ล้มเหลวหลังขั้น 3 (`write(A)`) และก่อนขั้น 6 (`write(B)`) ระบบต้องทำให้การปรับปรุงไม่ถูกสะท้อนในฐานข้อมูล ไม่เช่นนั้นเกิดความไม่สอดคล้อง [p.7]
</details>

**A4.** ACID มีสี่ตัวอะไรบ้าง และตามสไลด์ใครเป็นผู้รับผิดชอบ Atomicity กับ Consistency (⭐)

<details><summary>เฉลย</summary>

Atomicity, Consistency, Isolation, Durability [p.10] Atomicity = DBMS รับผิดชอบ; Consistency = programmer รับผิดชอบ (เช่น ไม่ใส่ commit มั่ว) [p.11]
</details>

**A5.** ระบบถอนเงินจาก A แล้วเกิด fail ก่อนฝากเข้า B ผลที่ถูกต้องตามหลัก Atomicity คืออะไร ใช้ตัวอย่างของสไลด์อธิบาย (⭐⭐⭐)

<details><summary>เฉลย</summary>

ต้อง fail ทั้งหมด ถอน A อย่างเดียวไม่ได้ การฝาก B ที่ยังไม่ได้ทำถือว่าไม่สำเร็จทั้งหมดที่ทำมา [p.11] `[Source: generated — not verified against original document]` ในทางปฏิบัติ DBMS จะ rollback ค่า A ที่ถอนไปแล้วกลับเป็นค่าเดิม

</details>

---

## Section B: Shadow-database, Transaction State และ Recovery พื้นฐาน — ระดับ ⭐⭐

**B1.** อธิบายขั้นตอนของ shadow-database scheme และบทบาทของ db_pointer

<details><summary>เฉลย</summary>

ทุกการ update ทำบน shadow copy ของฐานข้อมูล; db_pointer ถูกทำให้ชี้ไปยัง shadow copy ที่ update แล้วหลัง transaction ถึง partial commit และทุก page ที่ update ถูก flush ลง disk [p.13] db_pointer ชี้ไปยังสำเนาที่ consistent ปัจจุบันเสมอ ถ้า fail ใช้สำเนาเก่าและลบ shadow copy [p.14]
</details>

**B2.** ข้อจำกัดของ shadow-database scheme มีอะไรบ้าง (⭐)

<details><summary>เฉลย</summary>

สมมติว่ามี transaction active ครั้งละหนึ่งตัว; สมมติ disk ไม่เสีย; ใช้ได้กับ text editor แต่ไม่มีประสิทธิภาพกับฐานข้อมูลใหญ่; shadow paging ลดการ copy แต่ยังไม่ practical กับ DB ใหญ่; ไม่รองรับ concurrent transactions [p.14]
</details>

**B3.** สไลด์ถามว่า shadow-database scheme "extremely inefficient for large databases (why?)" ให้ตอบ (⭐⭐)

<details><summary>เฉลย</summary>

`[Source: generated — not verified against original document]` เพราะต้องคัดลอกฐานข้อมูลทั้งชุดเป็น shadow copy ทุกครั้ง (สไลด์ไม่เฉลย "why?" ไว้ [p.14] แต่บอกว่า shadow paging "ลดการ copy ข้อมูล")
</details>

**B4.** วาดหรืออธิบายสถานะของ transaction ทั้ง 5 และเงื่อนไขการเปลี่ยนสถานะ

<details><summary>เฉลย</summary>

Active (เริ่มต้น ระหว่างทำงาน) → Partially committed (หลังคำสั่งสุดท้าย) → Committed (สำเร็จ); จาก Active หรือ Partially committed → Failed (ทำต่อไม่ได้) → Aborted (rollback เรียบร้อย) [p.15-16]
</details>

**B5.** หลัง transaction เป็น Aborted ทำอะไรได้บ้าง และเงื่อนไขของแต่ละทาง (⭐⭐)

<details><summary>เฉลย</summary>

2 ทางเลือก: restart transaction (เฉพาะเมื่อไม่มี internal logical error) หรือ kill transaction [p.15]
</details>

---

## Section C: Concurrency Control และปัญหา 5 แบบ — ระดับ ⭐⭐⭐

**C1.** ทำไมระบบ multiuser DBMS จึงใช้ interleaving และมันก่อให้เกิดอะไร (⭐)

<details><summary>เฉลย</summary>

CPU เร็วกว่าอุปกรณ์ input/output มาก จึงสลับทำงานระหว่าง transaction; interleaving ช่วยป้องกันการประมวลผลที่ต้องใช้เวลานานจากความล่าช้าของ transaction อื่น [p.17] แต่ถ้าไม่ควบคุมจะเกิดปัญหา 5 แบบ [p.18]
</details>

**C2.** ระบุปัญหาทั้ง 5 แบบที่สไลด์ยกมาพร้อมคำอธิบายสั้น ๆ

<details><summary>เฉลย</summary>

Lost Update (สอง transaction ใช้ข้อมูลเดียวกันพร้อมกันจนค่าไม่เป็นไปตามต้องการ); Temporary Update/Dirty Read (T2 อ่านค่าที่ T1 แก้แล้วแต่ T1 fail/rollback); Incorrect Summary (ค่าสรุปรวมไม่ตรงเพราะมี transaction อื่นแก้บางค่า); Unrepeatable read (อ่าน X สองครั้งได้ค่าต่างกัน); Phantom Phenomenon (นับจำนวนบัญชีแล้วมีบัญชีใหม่ถูกเพิ่มเข้ามา) [p.18-20]
</details>

**C3.** T1 ปรับค่า X เป็น X−N แล้ว T2 อ่าน X ไปใช้ จากนั้น T1 ล้มเหลวและ rollback — เป็นปัญหาอะไร และ T2 ได้รับผลอย่างไร (⭐⭐)

<details><summary>เฉลย</summary>

Temporary Update (Dirty Read / Uncommitted dependency) — ผู้อ่านใช้ค่า X−N ที่ปรับไปแล้ว ซึ่งไม่สอดคล้องกับค่า X ที่เป็นผลเมื่อ transaction ที่ปรับค่าล้มเหลว [p.19]
</details>

**C4.** T1 นับจำนวนบัญชีในตารางอยู่ ขณะที่ application เพิ่มบัญชีใหม่ — เรียกว่าอะไร และผลลัพธ์ที่ถูกต้องควรเป็นอย่างไร (⭐⭐)

<details><summary>เฉลย</summary>

Phantom Phenomenon; ผลที่ถูกต้องคือต้องไม่นำบัญชีใหม่มาคิดรวมในการนับ [p.20]
</details>

**C5.** แยกความต่างระหว่าง Unrepeatable read, Dirty read และ Phantom ด้วยคำของตัวเอง (⭐⭐⭐)

<details><summary>เฉลย</summary>

`[Source: generated — not verified against original document]` Dirty read = อ่านค่าที่ transaction อื่นแก้แต่ยังไม่ commit (อาจถูก rollback) [p.19 นิยาม dirty read]; Unrepeatable read = อ่าน X ซ้ำได้ค่าต่างกันเพราะมีคนแก้ระหว่างกลาง [p.19]; Phantom = จำนวนแถวที่เข้าเงื่อนไขเปลี่ยนเพราะมีแถวใหม่ [p.20]
</details>

---

## Section D: Schedule และ Serializability — ระดับ ⭐⭐⭐

**D1.** Schedule, Serial Schedule และ Concurrent serializable schedule ต่างกันอย่างไร (⭐)

<details><summary>เฉลย</summary>

Schedule = ลำดับการจัดคำสั่งใน Tx ว่าคำสั่งไหนของ Tx ไหนทำก่อนหลัง [p.21]; Serial Schedule = คำสั่งของ transaction เดียวกันถูกปฏิบัติต่อเนื่องจากต้นจนจบ [p.22]; Concurrent serializable schedule = ทำงานร่วมกันในช่วงเวลาเดียวกันแต่ผลเท่ากับ serial schedule [p.21]
</details>

**D2.** Schedule 1 กับ Schedule 2 (p.22-23) ต่างกันอย่างไร และทำไม Schedule 3 (p.24) จึงน่าสนใจ (⭐⭐)

<details><summary>เฉลย</summary>

Schedule 1 = serial T1 แล้ว T2; Schedule 2 = serial T2 แล้ว T1 [p.22-23] Schedule 3 ไม่ทำตามลำดับแต่ผลเท่าการทำตามลำดับ (เหมือน Schedule 1) และ A+B ถูกรักษาไว้ [p.24]
</details>

**D3.** ในตาราง conflict ของคำสั่ง read/write คู่ไหน conflict และคู่ไหนไม่ conflict (⭐)

<details><summary>เฉลย</summary>

read-read ไม่ conflict; read-write, write-read, write-write conflict [p.27] (ต้องเป็น data item เดียวกัน และอย่างน้อยหนึ่งคำสั่งเป็น write [p.25])
</details>

**D4.** จากตาราง Schedule 3 (p.28) สลับคำสั่งอย่างไรจึงได้ Schedule 6 (p.28) (⭐⭐⭐)

<details><summary>เฉลย</summary>

สไลด์ระบุว่าสลับการทำงานกันโดยไม่ขัดแย้งกันได้ [p.28] ตามรูป: Schedule 3 = T1 `read(A) write(A)`, T2 `read(A) write(A)`, T1 `read(B) write(B)`, T2 `read(B) write(B)`; Schedule 6 = T1 ทั้งชุดแล้ว T2 ทั้งชุด `[Source: generated — not verified against original document]` ขั้นสลับคือย้าย T1 `read(B) write(B)` ขึ้นมาก่อน T2 `read(A) write(A)` ซึ่งอยู่คนละ data item (B กับ A) จึงไม่ conflict
</details>

**D5.** ทำไม schedule ของ T3 (`read(Q)`, `write(Q)`) กับ T4 (`write(Q)`) ในสไลด์จึงไม่ conflict serializable (⭐⭐)

<details><summary>เฉลย</summary>

สลับคำสั่งแล้วไม่สามารถได้ serial schedule ทั้ง <T3, T4> และ <T4, T3> [p.29] (ลำดับในรูป: T3 `read(Q)`, T4 `write(Q)`, T3 `write(Q)`)
</details>

**D6.** บอกเงื่อนไข view equivalent ทั้ง 3 ข้อ (⭐⭐)

<details><summary>เฉลย</summary>

สำหรับทุก data item Q: (1) ถ้า S ที่ Ti อ่านค่าเริ่มต้นของ Q แล้ว S´ ก็ต้องเป็นแบบเดียวกัน (2) ถ้าใน S Ti อ่านค่าที่ Tj เขียน แล้วใน S´ Ti ต้องอ่านค่าจาก write(Q) เดียวกันของ Tj (3) transaction ที่ write(Q) ตัวสุดท้ายใน S ต้องเป็นตัวเดียวกับใน S´ [p.30]
</details>

**D7.** Blind write คืออะไร และสไลด์ใช้ T3, T4, T6 ยกตัวอย่างอะไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

Blind write = write ที่ไม่มี read (เช่น write(Q) ของ T4) สไลด์สรุปว่า schedule ที่มี T6 write ผลลัพธ์เหมือนกันถูกต้อง เป็น Serializable แต่ Conflict กัน (T3, T4) [p.35]
</details>

**D8.** schedule ของ T1 กับ T5 (p.31) ให้ผลเท่ากับ < T1, T5 > แต่ไม่ conflict หรือ view equivalent — สไลด์สรุปว่าอย่างไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

การตัดสินความ equivalent แบบนี้ต้องวิเคราะห์ operation อื่นนอกจาก read และ write [p.31] `[Source: generated — not verified against original document]` เพราะ T1 และ T5 ใช้การบวกลบ (A−50, B+50, B−10, A+10) ที่สลับลำดับกันได้ตามคุณสมบัติทางคณิตศาสตร์ ซึ่งการวิเคราะห์เฉพาะ read/write มองไม่เห็น
</details>

---

## Section E: Recoverability และ Isolation Levels — ระดับ ⭐⭐

**E1.** Recoverable schedule คืออะไร และยกตัวอย่าง schedule ที่ไม่ recoverable จากสไลด์ (⭐⭐)

<details><summary>เฉลย</summary>

ถ้า Tj อ่านข้อมูลที่ Ti เขียน ต้อง commit ของ Ti มาก่อน commit ของ Tj [p.36] ตัวอย่าง Schedule 11: T8 `read(A) write(A) … read(B)`, T9 `read(A)` — ไม่ recoverable ถ้า T9 commit ทันทีหลัง read เพราะถ้า T8 abort T9 จะอ่านสถานะที่ไม่สอดคล้อง [p.36]
</details>

**E2.** Cascading rollback คืออะไร และ schedule ของ T10, T11, T12 แสดงอะไร (⭐⭐)

<details><summary>เฉลย</summary>

transaction เดียวล้มเหลวแล้วทำให้เกิด rollback ต่อเนื่องหลายตัว ใน T10, T11, T12 ที่ยังไม่มีใคร commit (schedule จึง recoverable) ถ้า T10 fail ต้อง rollback T11 และ T12 ด้วย และอาจย้อนงานจำนวนมาก [p.37]
</details>

**E3.** Cascadeless กับ Recoverable ต่างและเกี่ยวข้องกันอย่างไร (⭐⭐)

<details><summary>เฉลย</summary>

Cascadeless: commit ของ Ti ต้องมาก่อน read ของ Tj (เมื่อ Tj อ่านค่าที่ Ti เขียน); ทุก cascadeless schedule เป็น recoverable ด้วย และเป็นที่ต้องการ [p.38]
</details>

**E4.** เรียงระดับความสอดคล้องใน SQL-92 จากเข้มงวดไปหลวม และบอกว่าระดับไหนไม่รับประกัน phantom (⭐⭐)

<details><summary>เฉลย</summary>

Serializable (default) → Repeatable read → Read committed → Read uncommitted [p.39] Repeatable read ไม่รับประกัน phantom; Serializable ไม่เกิด phantom [p.39]
</details>

**E5.** สไลด์สรุป Read committed ไว้ว่าอย่างไร และบางยี่ห้อเรียกว่าอะไร (⭐)

<details><summary>เฉลย</summary>

ไม่รับประกันความถูกต้องใด ๆ รับประกันเพียง cascadeless ผลทำให้การทำงานเร็ว บางยี่ห้อเรียกว่า "Cursor Stability" [p.39]
</details>

---

## Section F: Failure, Backup และ Shadow Paging — ระดับ ⭐⭐⭐

**F1.** แบ่ง Failure ออกเป็นกี่ชนิดตามสไลด์ และ Logical error กับ System error ต่างกันอย่างไร (⭐⭐)

<details><summary>เฉลย</summary>

3 ชนิด: Transaction fail, System crash, Disk failure [p.40] Logical error = error จาก application เช่น code program ผิดปกติ; System error = system software (OS, DBMS) เข้าสู่สถานะผิดปกติ เช่น deadlock [p.40]
</details>

**F2.** Volatile, Non-Volatile และ Stable Storage ต่างกันอย่างไร (⭐)

<details><summary>เฉลย</summary>

Volatile = ไฟดับแล้วข้อมูลหาย; Non-Volatile = ไฟดับแล้วข้อมูลไม่หาย; Stable Storage = storage ที่สมมติว่าไม่มีวันเสียหาย [p.41]
</details>

**F3.** เปรียบเทียบ Volume backup กับ Incremental backup (⭐⭐)

<details><summary>เฉลย</summary>

Volume = สำรองทุกประเภท รวมค่าเก่าและใหม่ ข้อเสียคือใช้เวลามาก; Incremental = สำรองเฉพาะที่เปลี่ยนแปลง (AIJ) ใช้เวลาน้อย [p.42] และสไลด์ย้ำว่า volume ต่างกับ export/import (ใช้เวลานาน และวิธีทำต่างกัน) [p.42]
</details>

**F4.** ระบบที่ทำ Volume backup ทุกวันเสาร์ และเก็บ log archive ทุกวัน ล่มวันพุธ 11:00 น. อธิบายขั้นตอน Roll Forward ตามสไลด์ (⭐⭐⭐)

<details><summary>เฉลย</summary>

นำ SAT Vol Backup มากู้เป็น 2nd Vol Backup แล้วเล่น log archive ต่อเนื่อง SUN → Mon Morning, Mon → Tue Morning, Tue → Wed Morning, Wed log up to 11:00 am → Wed 11:00 am [p.46] วิธีนี้ (Volume Backup ร่วมกับ Incremental Backup) เรียกว่า "Roll Forward" [p.47] (การจับคู่ log กับสถานะ "Morning" อ่านจากตำแหน่งลูกศรในรูป)
</details>

**F5.** Shadow paging ใช้กับระบบแบบไหน เพราะอะไร และทำงานอย่างไรเมื่อ fail / commit (⭐⭐⭐)

<details><summary>เฉลย</summary>

ใช้กับระบบบนเครื่อง PC ซึ่งไม่มี logfile (log-based recovery ใช้เวลามาก) [p.48] เริ่ม Tx สร้าง current page table คู่กับ shadow; เปลี่ยนแปลงโดยหา page ว่างมาใส่ข้อมูลแล้วให้ current page ชี้ตัวใหม่ [p.50] ถ้า fail ทิ้ง current page table ใหม่ ใช้อันเก่า ("instance roll back"); ถ้า commit save current page table แล้วลบของเก่า [p.50]
</details>

**F6.** ข้อเสียของ shadow paging มีอะไรบ้าง (⭐)

<details><summary>เฉลย</summary>

data fragment เยอะ (ต้องแทรกอันใหม่ตลอด); commit ช้าหน่อย (ต้อง save ลง dbspace จริง); ไม่มี log file สำหรับ incremental backup จึงต้อง Volume Backup ทุกครั้ง [p.51]
</details>

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **โน้ตประกอบ:** [[Chapter 07 Introduction to Transaction and Recovery]]
* **แบบฝึกหัดก่อนหน้า:** [[HW-Database-01]]
* **แหล่งข้อมูล:** `Resources/Books/Database/Database_Concept_07(2).pdf`
