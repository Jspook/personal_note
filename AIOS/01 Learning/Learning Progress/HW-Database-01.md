# HW-Database-01: Chapter 06 Database System Architecture

> **วิชา:** 06066300 Database System Concept | **ที่มาของโจทย์:** `Resources/Books/Database/Database_Concept_06.pdf` (77 slides)
> **โน้ตประกอบ:** [[Chapter 06 Database System Architecture]]
> **ป้ายแหล่งที่มา:** โจทย์ทุกข้อสร้างจากเนื้อหาในสไลด์; เฉลยอ้างเลขสไลด์ `[p.N]` ข้อที่เพิ่มเกินสไลด์ติดป้าย `[Source: generated — not verified against original document]`
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/ประยุกต์

---

## Section A: Three-Schema Architecture & Data Independence — ระดับ ⭐⭐

**A1.** Three-Schema Architecture แบ่งเป็นกี่ระดับ อะไรบ้าง และแต่ละระดับอธิบายอะไร

<details><summary>เฉลย</summary>

3 ระดับ: **Internal schema** (โครงสร้างเชิงกายภาพ ได้จาก Physical data model), **Conceptual schema** (โครงสร้างฐานข้อมูลและเงื่อนไขบังคับ ได้จาก Conceptual + Implementation data model), **External schema** (มุมมอง View ตามกลุ่มผู้ใช้ ใช้แบบจำลองเดียวกับ Conceptual) [p.4]
</details>

**A2.** สกีมาทั้ง 3 ระดับเก็บข้อมูลจริงหรือไม่ ข้อมูลจริงอยู่ที่ใด และ Mappings ทำหน้าที่อะไร

<details><summary>เฉลย</summary>

ไม่เก็บ สกีมาใช้อธิบายข้อมูลเท่านั้น ข้อมูลจริงอยู่ที่ระดับกายภาพ (physical level) Mappings แปลง (transform) คำร้องขอและข้อมูลระหว่างระดับ ทำให้เกิด Data Independence [p.7]
</details>

**A3.** บริษัทเพิ่มเอนทิตีใหม่ใน Conceptual schema แต่โปรแกรมที่อ้าง External schema ยังรันได้ไม่ต้องแก้ นี่คือ data independence แบบใด และเพราะเหตุใดจึงเป็นไปได้ (ยากระดับ ⭐⭐⭐)

<details><summary>เฉลย</summary>

**Logical data independence** — ระบบปรับ View definition และ Mapping ระหว่าง External กับ Conceptual ให้ โปรแกรมที่อ้างอิง External schema จึงทำงานได้ตามปกติ [p.8]
</details>

**A4.** Physical data independence คืออะไร ยกตัวอย่างการเปลี่ยนแปลงที่เข้าข่าย

<details><summary>เฉลย</summary>

ความสามารถเปลี่ยน Internal schema (เช่น เปลี่ยนโครงสร้างของข้อมูล) โดยไม่ต้องแก้ Conceptual schema และไม่ต้องแก้ External schema ตามไปด้วย [p.8]
</details>

---

## Section B: Database Languages & Query Processing — ระดับ ⭐⭐

**B1.** ภาษา SQL จัดเป็น procedural หรือ non-procedural และใช้ทำหน้าที่ใดตามสไลด์ (⭐)

<details><summary>เฉลย</summary>

Non-procedural ภาษาระดับสูง ใช้ง่าย เป็นภาษามาตรฐานของ DDL, VDL และ DML คำสั่ง DML ฝังใน host language (เช่น C++, Java) ได้ [p.10]
</details>

**B2.** เรียงขั้นตอน Basic Steps in Query Processing และบอกหน้าที่ของ Optimizer กับ Evaluation engine

<details><summary>เฉลย</summary>

1) Parsing and translation 2) Optimization 3) Evaluation [p.13] Optimizer เลือกเส้นทางที่ดีที่สุดเพื่อเข้าถึงข้อมูล ให้ Execution plan; Evaluation engine รับแผนที่เลือกแล้วไปปฏิบัติ แล้วให้ Query output [p.14]
</details>

**B3.** Relational Algebra ในสไลด์มีกี่ operators จัดกลุ่มอย่างไร (⭐)

<details><summary>เฉลย</summary>

8 ตัว — Essential Subset: Select, Project, Join (natural join); Set Operator: Union, Intersection, Difference; Special Operator: Multiply (Product), Division [p.12, 15]
</details>

**B4.** ตามสไลด์ Relational Calculus กับ Relational Algebra ต่างกันอย่างไรในแง่ "What?" กับ "How?"

<details><summary>เฉลย</summary>

Relational Calculus = ระบุ **What** (นิยามของ Result ที่ต้องการ); Relational Algebra = **How** (แบบ Procedural มี 8 operators) [p.12]
</details>

---

## Section C: DBMS Components & Functions — ระดับ ⭐⭐

**C1.** DDL Compiler เก็บ meta-data ไว้ที่ไหน และ Query Compiler ส่งต่อคำสั่งไปที่ใด

<details><summary>เฉลย</summary>

DDL Compiler เก็บคำอธิบายสกีมาใน DBMS Catalog; Query Compiler ส่งต่อให้ Query Optimizer วิเคราะห์โดยใช้ข้อมูลใน System Catalog [p.17]
</details>

**C2.** Precompiler ทำหน้าที่อะไร เกี่ยวข้องกับผู้ใช้กลุ่มใด

<details><summary>เฉลย</summary>

ดึงคำสั่ง DML ออกจากแอปพลิเคชันโปรแกรม (host language) ส่งให้ DML Compiler แปลงเป็น Object Code — เกี่ยวข้องกับกลุ่ม Programmers [p.16]
</details>

**C3.** จงระบุ DBMS Functions 7 ข้อตามสไลด์

<details><summary>เฉลย</summary>

Data dictionary management, Data storage management, Data transformation and presentation, Security management, Multi-user access control, Backup and recovery, Data integrity management [p.18-20]
</details>

---

## Section D: Architectures for DBMSs — ระดับ ⭐⭐⭐

**D1.** อธิบาย 7-layer model ของสไลด์ โดยระบุเลเยอร์ที่เป็นส่วนของ OS (⭐)

<details><summary>เฉลย</summary>

1 Presentation Services, 2 Presentation Logic, 3 Application Logic, 4 Database Logic, 5 Data Management, 6 File Services, 7 Physical Databases; File Services (6) เป็นส่วนของ OS และ Data Management (5) วิ่งบน OS อีกชั้นหนึ่ง [p.22]
</details>

**D2.** ระบุข้อดีและข้อเสียของ Centralized DBMS อย่างละ 2 ข้อ

<details><summary>เฉลย</summary>

ข้อดี: Interprocess Communication ดีที่สุด (อยู่ใน main memory เครื่องเดียว), traffic terminal-host ต่ำ, maintain ง่ายที่ host [p.25]; ข้อเสีย: performance ขึ้นกับ H/W host, UI ไม่สวย, ระบบค่อนข้างปิด, ราคาสูง [p.26] (ตอบข้อใดก็ได้ 2 ข้อ)
</details>

**D3.** เหตุใด Resource Sharing LAN จึงมี "Data Management ไม่เก่ง" และไม่เหมาะกับ WAN

<details><summary>เฉลย</summary>

Disk อยู่ไกล แต่การควบคุม search/sort และ concurrency control (lock) ทำจาก workstation; traffic ขึ้นกับขนาด data (1 read : 1 record) high volume ต้องใช้ media ความเร็วสูง จึงไม่เหมาะกับ WAN [p.28]
</details>

**D4.** เปรียบเทียบ SQL-base Client/Server กับ Message-base Client/Server ด้านการ maintain และ network traffic

<details><summary>เฉลย</summary>

SQL-base: maintain ยากเพราะ program ติดตั้งบนทุก WS, traffic ยังสูง [p.30]; Message-base: maintain ง่ายกว่า (ทำฝั่ง host), traffic น้อยเพราะส่ง parameter ผ่าน function call จึงเหมาะกับ WAN แต่ผูกกับ product เพราะใช้ stored procedure ของแต่ละ product [p.31-32]
</details>

**D5.** Two-Tier กับ Three-Tier ต่างกันที่ใด และ middle tier ทำหน้าที่อะไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

Two-Tier: GUI + โปรแกรมประยุกต์อยู่ฝั่ง client ต่อ DBMS ฝั่ง server ผ่าน ODBC/JDBC [p.35]; Three-Tier เพิ่ม middle tier (Application server / Web server) เก็บ business rules รับ request จาก client ประมวลผล แล้วส่งคำสั่งไป database server ทำให้ปลอดภัยขึ้น [p.38]
</details>

**D6.** ธุรกิจต้องการเพิ่มจำนวนผู้ใช้โดยไม่จ่ายค่า DBMS Server License เพิ่ม ควรเลือกสถาปัตยกรรมใด เพราะอะไร และมีข้อเสียที่ต้องยอมรับอะไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

Three-Tier/n-Tier — เพิ่มจำนวน Application Server แทนการเพิ่ม DBMS user license ซึ่งถูกกว่า [p.41]; ข้อเสีย: reliability/performance ขึ้นกับ network, ราคาสูง (รวม network), technology ซับซ้อนต้องมี vendor ที่ support สูง [p.42]
</details>

---

## Section E: Oracle Architecture — ระดับ ⭐⭐⭐

**E1.** Oracle Server ประกอบด้วยอะไร และ Instance ต่อ Database มีอัตราส่วนเท่าใด (⭐)

<details><summary>เฉลย</summary>

Oracle Instance + Oracle Database [p.45]; 1 instance ต่อ 1 ฐานข้อมูล [p.46]
</details>

**E2.** จงระบุ Mandatory files และ Optional files ของ Oracle Database

<details><summary>เฉลย</summary>

Mandatory: Data files, Control files, Redo log files, Parameter files; Optional: Password file, Archive log file [p.49]
</details>

**E3.** เปรียบเทียบ SGA กับ PGA (เวลาที่จัดสรร, shared หรือไม่)

<details><summary>เฉลย</summary>

SGA จัดสรรตอนสร้าง Oracle instance เป็นส่วนที่โปรเซสของ instance ใช้ร่วมกัน; PGA จัดสรรเมื่อ server process เริ่มทำงาน อยู่ฝั่ง server process ไม่ใช่ shared memory สร้างเมื่อติดต่อแบบ 1 ต่อ 1 และลบเมื่อเลิกติดต่อ [p.53, 65]
</details>

**E4.** Library Cache และ Data Dictionary Cache อยู่ใน structure ใด และเก็บอะไร

<details><summary>เฉลย</summary>

อยู่ใน Shared Pool (ขนาดของทั้งคู่ขึ้นกับ Shared Pool) — Library Cache เก็บ SQL และ PL/SQL ที่ประมวลผลแล้ว ใช้ร่วมกับผู้ใช้อื่นได้ จัดการด้วย LRU; Data Dictionary Cache เก็บโครงสร้างฐานข้อมูล (files, tables, indexes, columns, users, privileges) ใช้ตรวจชื่อ object และสิทธิ์ [p.56-58]
</details>

**E5.** Database Buffer Cache แบ่งพื้นที่เป็น 3 ประเภท จงอธิบายพฤติกรรมและพารามิเตอร์ของแต่ละประเภท

<details><summary>เฉลย</summary>

Keep (`DB_KEEP_CACHE_SIZE`) block คงค้างในแคชหลังใช้; Recycle (`DB_RECYCLE_CACHE_SIZE`) block ถูกใช้ซ้ำทันทีที่ไม่ใช้งาน; Default (`DB_CACHE_SIZE`) ใช้ LRU [p.60]
</details>

**E6.** กำหนด `SGA_MAX_SIZE` ไว้ 128M ต้องการตั้ง `DB_CACHE_SIZE` ให้ใหญ่กว่านั้น ทำได้หรือไม่ (⭐⭐⭐)

<details><summary>เฉลย</summary>

ไม่ได้ — การปรับขนาดบัฟเฟอร์แคชต้องไม่เกิน `SGA_MAX_SIZE` และต้องพิจารณาพารามิเตอร์ SGA ทั้งหมด [p.55, 61] (ตัวเลข 128M เป็นสมมติของโจทย์ ไม่มีในสไลด์)
</details>

**E7.** จงระบุเงื่อนไขที่ทำให้ LGWR ทำงาน และบอกว่าทำงานก่อนหรือหลัง DBWn

<details><summary>เฉลย</summary>

ทำงานเมื่อ Commit, ใช้พื้นที่ 1/3, ไฟล์ขนาด 1 MB, ทุก 3 วินาที และ **ทำงานก่อน DBWn** [p.71]
</details>

**E8.** ฐานข้อมูลล่มทั้ง instance กับผู้ใช้ปิดโปรแกรมผิดปกติ ใช้ background process ใดกู้คืน แต่ละตัวทำอะไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

Instance failure → **SMON**: Rolls forward (ใช้ Redo log file) + Rolls back (ใช้ Undo/Rollback Segments); user failure (database ไม่ล้ม) → **PMON**: Rolls Back [p.73-74]
</details>

**E9.** จงเรียงโครงสร้างเชิงตรรกะของ Oracle database ตามลำดับชั้น และจับคู่กับโครงสร้างกายภาพ

<details><summary>เฉลย</summary>

database → tablespaces → segments → extents → blocks; กายภาพ: Data files ติดต่อกับ tablespaces, OS Block ติดต่อกับ blocks [p.76]
</details>

**E10.** กำหนดขนาด Shared Pool เป็น 64M ด้วยคำสั่งใด และ Shared Pool แบ่งหน่วยความจำเป็นส่วนใดบ้าง

<details><summary>เฉลย</summary>

`ALTER SYSTEM SET SHARED_POOL_SIZE = 64M;` [p.56] แบ่งเป็น Library Cache และ Data Dictionary Cache [p.56]
</details>

**E11.** จะรู้ได้อย่างไรว่า Oracle ทำงานแบบ Dedicated หรือ Shared server ตามสไลด์ และสองแบบต่างกันอย่างไร

<details><summary>เฉลย</summary>

ดูจาก `select * from V$dispatcher;` [p.63] Dedicated = 1 user process : 1 server process (default); Shared = 1 user process > 1 dispatcher [p.63] (การตีความว่า "no rows" หมายถึง dedicated เป็นข้อสรุปจากบริบท `[Source: generated — not verified against original document]`)
</details>

**E12.** จงยกตัวอย่าง Optional background processes อย่างน้อย 4 ตัวตามสไลด์

<details><summary>เฉลย</summary>

ARCn, LNDN (ตามที่พิมพ์ในสไลด์), RECO, CJQ0, LMON, Snnn, Dnnn, Pnnn, LCKn, QMNn [p.69] (ตอบ 4 ตัวใดก็ได้)
</details>

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* [[Chapter 06 Database System Architecture]] (โน้ตต้นทางของโจทย์ชุดนี้)
* Source: `Resources/Books/Database/Database_Concept_06.pdf` (77 slides, KMITL)
