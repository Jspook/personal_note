# HW-Database-03: Chapter 08 Introduction to Business Intelligence and Data Warehouse

> **วิชา:** 06066300 Database System Concepts | **ที่มาของโจทย์:** `Resources/Books/Database/Database_Concept_08(1).pdf` (54 slides)
> **โน้ตประกอบ:** [[Chapter 08 Introduction to Business Intelligence and Data Warehouse]]
> **ป้ายแหล่งที่มา:** โจทย์ทุกข้อสร้างจากเนื้อหาในสไลด์; เฉลยอ้างเลขสไลด์ `[p.N]` ข้อที่เพิ่มเกินสไลด์ติดป้าย `[Source: generated — not verified against original document]`
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/ประยุกต์

---

## Section A: Business Intelligence และ Components — ระดับ ⭐⭐

**A1.** ระบบธุรกิจอัจฉริยะ (BI) คืออะไร และมีเป้าหมายอะไร (⭐)

<details><summary>เฉลย</summary>

ระบบสารสนเทศสนับสนุนการตัดสินใจ (Decision Support Data) ของผู้บริหารระดับเชิงกลยุทธ์ เพื่อให้ธุรกิจได้เปรียบเชิงการแข่งขัน (Competitive Advantage) [p.3]
</details>

**A2.** ข้อมูลสนับสนุนการตัดสินใจต่างจากข้อมูลระบบปฏิบัติงาน (Operational Data) ใน 3 ประการใดบ้าง ยกตัวอย่างแต่ละข้อ

<details><summary>เฉลย</summary>

Time Span (เก็บตามกาลเวลา อดีตถึงปัจจุบัน), Level of Aggregation (สรุปรวมหลายระดับ เช่น ยอดขายรายเดือน/ไตรมาส/ปี), Dimensionality (หลายมิติ/Cube เช่น มิติผลิตภัณฑ์ สถานที่ เวลา) [p.4]
</details>

**A3.** กระบวนการ ETL ย่อมาจากอะไรและแต่ละขั้นทำอะไร (⭐)

<details><summary>เฉลย</summary>

Extract = ดึงข้อมูลจากแหล่งต่าง ๆ; Transform = แปลงข้อมูลให้ตรงความต้องการ; Load = นำข้อมูลเข้าคลังข้อมูล [p.7]
</details>

**A4.** ระบุแหล่งข้อมูลภายในและภายนอกของ BI ตามสไลด์ (⭐)

<details><summary>เฉลย</summary>

ภายใน: ระบบสารสนเทศระดับปฏิบัติการ (Operational System) และ ERP; ภายนอก: เช่น ระบบโซ่อุปทาน (SCM) [p.6] ในแผนภาพ p.9 แหล่งข้อมูลคือ CRM, ERP, Operation System, SCM, FLAT FILE [p.9]
</details>

**A5.** เครื่องมือ OLAP และ Data Mining ต่างกันอย่างไรตามสไลด์ (⭐⭐)

<details><summary>เฉลย</summary>

OLAP = เครื่องมือวิเคราะห์ออนไลน์แบบโต้ตอบ (Interactive) สำหรับวิเคราะห์ตามสมมติฐาน เจาะลึก (On Demand) หรือหาแนวโน้ม (Trend); Data Mining = วิเคราะห์เพื่อค้นหารูปแบบ (Pattern) หรือความสัมพันธ์ที่ซ่อนอยู่จากข้อมูลปริมาณมากโดยอัตโนมัติ [p.8]
</details>

---

## Section B: Data Warehouse — ระดับ ⭐⭐

**B1.** ทำไม BI จึงใช้ฐานข้อมูลแบบ TPS ทั่วไปไม่ได้ (⭐⭐)

<details><summary>เฉลย</summary>

เพราะต้องการข้อมูลแบบบูรณาการและรองรับข้อมูลปริมาณมาก ลักษณะการใช้ข้อมูลของ BI ไม่เหมาะกับระบบฐานข้อมูลธรรมดาแบบ TPS (Transaction Process System) จึงต้องใช้ Data Warehouse Database ที่จัดเก็บข้อมูลสนับสนุนการตัดสินใจ [p.10]
</details>

**B2.** Data Warehouse กับ Data Mart ต่างกันอย่างไร (⭐)

<details><summary>เฉลย</summary>

Data Warehouse = ฐานข้อมูลขนาดใหญ่ขององค์กร ข้อมูลจากหลายแหล่ง ตั้งแต่อดีตถึงปัจจุบัน Read-only; Data Mart = คลังข้อมูลขนาดเล็กใช้เฉพาะส่วนงาน เช่น ฝ่ายการตลาด [p.11]
</details>

**B3.** DBMS สำหรับคลังข้อมูลต้องมีคุณลักษณะพิเศษ 4 ข้อใดบ้าง (⭐)

<details><summary>เฉลย</summary>

Database Schema (Data Dictionary, ข้อมูลรวม/สรุป, Time Slices), Data Extraction and Loading (ETL, Data Cleaning), End-user Analytical Interface (OLAP GUI), รองรับฐานข้อมูลขนาดใหญ่ [p.12]
</details>

**B4.** อธิบายลักษณะข้อมูลในคลังข้อมูลทั้ง 4 ประการ (⭐⭐)

<details><summary>เฉลย</summary>

Integrated (บูรณาการจากหลายแหล่ง ต้องสอดคล้อง), Subject-Oriented (เก็บตามหัวข้อ/มิติ เช่น ยอดขายตามสินค้า/เวลา), Time-Variant (เก็บตามช่วงเวลา ย้อนดูการเปลี่ยนแปลงได้), Nonvolatile (ไม่แก้ไข/ลบ คงเดิม อ่านอย่างเดียว) [p.14]
</details>

**B5.** ฟังก์ชันของ ETL ในสไลด์ p.15 มีอะไรบ้าง (⭐)

<details><summary>เฉลย</summary>

Extract, Filter, Transform, Integrate, Classify, Aggregate, Summary [p.15]
</details>

**B6.** ลักษณะ Nonvolatile ของคลังข้อมูลส่งผลอย่างไรต่อการวิเคราะห์ (⭐⭐⭐)

<details><summary>เฉลย</summary>

ข้อมูลไม่ถูกเขียนทับหรือลบ มีลักษณะคงเดิม (Static data) อ่านอย่างเดียว ใช้วิเคราะห์เพื่อทำรายงานได้สม่ำเสมอ [p.14] `[Source: generated — not verified against original document]` ผลต่อเนื่องคือรายงานของช่วงเวลาเดียวกันที่รันซ้ำจะได้ผลตรงกัน
</details>

---

## Section C: Data Warehouse Design (Star / Snowflake) — ระดับ ⭐⭐⭐

**C1.** องค์ประกอบ 4 อย่างของแบบจำลองคลังข้อมูลคืออะไร (⭐)

<details><summary>เฉลย</summary>

Fact Table, Dimension Tables, Attributes, Attribute Hierarchies [p.16-18]
</details>

**C2.** Fact Table และ Dimension Table เก็บข้อมูลอะไร ยกตัวอย่าง (⭐⭐)

<details><summary>เฉลย</summary>

Fact Table = ข้อมูลตัวเลขของกิจกรรมที่ต้องการวัด/วิเคราะห์ เช่น ยอดขาย จำนวนหน่วยขาย จำนวนลูกค้า; Dimension Table = ข้อมูลมิติที่ใช้ศึกษา Fact เช่น มิติลูกค้า มิติเวลา [p.17]
</details>

**C3.** Attribute Hierarchy ของมิติเวลาและมิติสินค้าในสไลด์เป็นอย่างไร และใช้ทำอะไร (⭐⭐)

<details><summary>เฉลย</summary>

มิติเวลา: วัน -> เดือน -> ไตรมาส -> ปี; มิติสินค้า: กลุ่มย่อยสินค้า (Sub-Category) -> ประเภทสินค้า (Category) [p.18] เก็บใน Data Dictionary เพื่อใช้ Data Aggregation และการวิเคราะห์ Drill down/Roll up [p.18]
</details>

**C4.** เปรียบเทียบ Star Schema กับ Snowflake Schema (⭐⭐⭐)

<details><summary>เฉลย</summary>

Star: 1 Fact Table + Dimension ตารางเดียวต่อมิติ (Denormalized ให้อยู่ใน 2NF) join ระดับเดียว คิวรีไม่ซับซ้อน [p.19-20]; Snowflake: แนวคิดเดียวกันแต่ Dimension บางมิติแตกเป็นหลายตารางจากการ normalize เช่น ProductDim แตกตาราง Category [p.21]
</details>

**C5.** ทำไม Product Dimension ใน Star Schema จึงไม่ผ่าน 3NF และทำไมสไลด์บอกว่าไม่เป็นปัญหา (⭐⭐⭐)

<details><summary>เฉลย</summary>

มี Functional Dependency ระหว่าง Sub-category กับ Category (Non-key -> Non-key) จึงไม่ผ่าน 3NF แต่เนื่องจากเข้าถึงแบบ Read-only จึงไม่มีปัญหา Update Anomaly [p.19]
</details>

**C6.** Primary key ของ Dimension Table และ Fact Table ใน Star Schema เป็นอย่างไร และ cardinality เป็นแบบใด (⭐⭐)

<details><summary>เฉลย</summary>

Dimension: คีย์หลักปกติ (Surrogate key); Fact: Composite key ที่ประกอบด้วย Foreign keys จากทุก Dimension Tables; Cardinality: One-to-Many [p.20]
</details>

**C7.** ออกแบบสกีมาสำหรับ "ยอดขายตามสินค้าและเวลา" ตามรูปแบบของสไลด์ (⭐⭐⭐)

<details><summary>เฉลย</summary>

ตามรูปใน p.19: TimeDimension (TimeID, Day, Month, Quarter, Year, Weekend, Holiday), ProductDimension (ProductID, ProductName, Category, SubCategory, Brand, Width, Weight), SaleFact (ProductID (FK), TimeID (FK), SaleAmount) [p.16, 19] `[Source: generated — not verified against original document]` ถ้าเป็น Snowflake ให้แยก Category ออกเป็นตารางของตัวเอง [p.21]
</details>

---

## Section D: OLAP — ระดับ ⭐⭐⭐

**D1.** Drill down และ Roll up คืออะไร และใช้ตามลำดับอะไร (⭐⭐)

<details><summary>เฉลย</summary>

Drill down = เจาะลึกลงในระดับรายละเอียด; Roll up = ดูสรุปรวมขึ้นไปทีละระดับ ทำตามลำดับ Attribute Hierarchies เช่น Region -> Product Type -> Shop [p.22]
</details>

**D2.** จากรูป p.23 ระดับ Region มี North 61,000 และ South 41,500 ถ้า Drill down เป็น Region-Product Type ค่า North ต้องแยกเป็นอะไร และมีอะไรที่ตรวจสอบความถูกต้องได้ (⭐⭐⭐)

<details><summary>เฉลย</summary>

North แยกเป็น Glossary 55,000 และ Misc. 6,000 ซึ่งรวมกันได้ 61,000 (South: 31,000 + 10,500 = 41,500) [p.23] ถ้า Drill down ต่อเป็น Shop: North ABC 30,000 + Platter 25,000 = 55,000 (Glossary) และ Platter Misc. 6,000 [p.23]
</details>

**D3.** Slice คืออะไร ในรูป p.24 กรองเพื่อดูสินค้ากลุ่มใด (⭐⭐)

<details><summary>เฉลย</summary>

การแบ่งชิ้นข้อมูลหลายมิติหรือกรองข้อมูลตามความต้องการ ในสไลด์กรองเพื่อดูยอดขายเฉพาะสินค้า Glossary ได้แก่ Fish, Meat, Pork [p.24]
</details>

**D4.** Dice ต่างจาก Slice อย่างไร ยกตัวอย่างจาก p.25 (⭐⭐⭐)

<details><summary>เฉลย</summary>

Dice = เปลี่ยนมิติการวิเคราะห์ (หมุนแกนหรือเปลี่ยนหน้าของลูกบาศก์) เช่น เปลี่ยนจากวิเคราะห์ยอดขาย Product Type ตามมิติ Shop เป็นตามมิติ Date [p.25] ส่วน Slice คือกรองข้อมูล [p.24]
</details>

**D5.** ตรวจสอบว่าตารางสองใบใน p.25 สอดคล้องกันหรือไม่ (⭐⭐⭐)

<details><summary>เฉลย</summary>

`[Source: generated — not verified against original document]` สอดคล้อง: Glossary ตามร้าน 30,000 + 25,000 + 31,000 = 86,000 เท่ากับตามวัน 43,000 + 43,000; Misc. ตามร้าน 6,000 + 10,500 = 16,500 เท่ากับตามวัน 10,000 + 6,500 (ค่าอ้างอิงจากตาราง p.25)
</details>

---

## Section E: SQL vs NoSQL — ระดับ ⭐⭐

**E1.** ข้อดีข้อเสียของ SQL และ NoSQL ตามสไลด์ (⭐⭐)

<details><summary>เฉลย</summary>

SQL: ดี = เหมาะกับข้อมูลมีโครงสร้างและงาน transactional ประสิทธิภาพสูง ผลิตภัณฑ์พิสูจน์แล้วเครื่องมือหลากหลาย; เสีย = scale ยาก, fixed schema [p.33] NoSQL: ดี = เหมาะกับ non-relational data, schema-less, scale ง่ายบน distributed system; เสีย = เครื่องมือยังพัฒนา, response time อาจช้ากว่า [p.33]
</details>

**E2.** ข้อเสียของ NoSQL ตามสไลด์ภาษาไทย (p.35) มีอะไรบ้าง (⭐⭐)

<details><summary>เฉลย</summary>

Non-transactional (ไม่เหมาะกับงานที่ผิดพลาดไม่ได้); ต้นทุนการเรียกข้อมูลสูงกว่า SQL เพราะเลือกเจาะจงข้อมูลไม่ได้ (แต่บันทึกข้อมูลง่ายกว่า); ไม่มีมาตรฐานกลาง เปรียบเทียบยาก; ผู้เชี่ยวชาญยังมีไม่มาก [p.35]
</details>

**E3.** ACID ใน SQL ทั้ง 4 ตัวมีนิยามอย่างไรตามสไลด์ (⭐)

<details><summary>เฉลย</summary>

Atomic: งานทั้งหมดใน transaction สำเร็จ (commit) หรือไม่สำเร็จเลย; Consistent: ย้ายฐานข้อมูลจากสถานะ consistent หนึ่งไปอีกสถานะ ความสอดคล้องนิยามด้วย constraints; Isolated: ผลของการเปลี่ยนแปลงไม่ถูกมองเห็นจนกว่าจะ commit; Durable: ผลของ transaction ที่ commit แล้วอยู่รอดจากความล้มเหลว [p.31]
</details>

**E4.** สถานการณ์ใดที่สไลด์บอกว่า NoSQL ไม่เหมาะ และเหตุผลคืออะไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

ข้อมูลที่ต้องมีความละเอียดสูงและผิดพลาดไม่ได้เลย เพราะ NoSQL ทำงานแบบ Non-transactional [p.35]
</details>

---

## Section F: NoSQL Types, Replication/Sharding และ Tools — ระดับ ⭐⭐⭐

**F1.** Replication กับ Sharding ต่างกันอย่างไร และข้อดี/ข้อเสียของแต่ละแบบ (⭐⭐)

<details><summary>เฉลย</summary>

Replication คัดลอกทั้งฐานข้อมูลไปทุก node [p.37]; Sharding แบ่งข้อมูลไปคนละ node (horizontal = rows, vertical = columns) [p.38] ตาราง p.40: Sharding ข้อดี = Fast data writing/reading, Low memory overhead ข้อเสีย = Potential data loss; Replication ข้อดี = Fast data reading, High data reliability ข้อเสีย = High network overhead, High memory overhead [p.40]
</details>

**F2.** ฐานข้อมูล NoSQL 4 ชนิดคืออะไร และชนิดใดเหมาะกับการเก็บข้อมูล Session ของ web app (⭐⭐)

<details><summary>เฉลย</summary>

Key-Value Store, Wide Column Store, Document Store, Graph Store [p.41] Key-Value Store เหมาะกับข้อมูลไม่ซับซ้อนที่ต้องการความเร็วสูง เช่น Session ของ Web app [p.41]
</details>

**F3.** Document Store ต่างจาก Key-Value Store อย่างไร และเหมาะกับอะไร (⭐⭐)

<details><summary>เฉลย</summary>

Document Store เพิ่มดัชนี (Index) เพื่อค้นหาข้อมูลได้ เป็นคุณสมบัติเพิ่มเติมจาก Key-Value Store เหมาะกับการเก็บข้อมูลทั่วไป [p.41]
</details>

**F4.** Graph Store เหมาะกับงานแบบใด (⭐)

<details><summary>เฉลย</summary>

ระบุความสัมพันธ์ที่ซับซ้อนได้มากกว่า Relational database เช่น ข้อมูลลักษณะ Social network [p.41]
</details>

**F5.** จากตารางเปรียบเทียบ RDBMS กับ MongoDB ศัพท์ Table และ Row ใน MongoDB เรียกว่าอะไร (⭐)

<details><summary>เฉลย</summary>

Table → Collection, Row → Document (Schema และ Joins ถูกขีดฆ่าในรูปฝั่ง MongoDB) [p.48]
</details>

**F6.** ตามแผนภาพ "What's tools you need?" ถ้าองค์กรไม่ใช่ Google/Facebook ไม่มี Social Graph ไม่ต้องการ High Availability และข้อมูลไม่มีโครงสร้าง (Structured = No) ไม่ใช่งาน Embedded/Bad Network/Device Cluster ควรเลือกอะไร (⭐⭐⭐)

<details><summary>เฉลย</summary>

Mongo — ตามเส้นทาง Are you Google? No → What about Facebook? No → Do you have a Social Graph? No → Do you need High Availability? No → Is your data Structured? No → Embedded? Bad Network? Device Cluster? No → Mongo [p.52] (อ่านจากแผนภาพลายมือ)
</details>

**F7.** จับคู่เครื่องมือกับลักษณะ: Redis, Neo4j, Elasticsearch, MongoDB/CouchDB, DynamoDB/Riak/Cassandra (⭐⭐)

<details><summary>เฉลย</summary>

Redis: รองรับ Key-Value เหมาะกับ Ranking/Leaderboard และประมวลผลสถิติซับซ้อน; Neo4j: ประมวลผลข้อมูลแบบ Graph; Elasticsearch: ค้นหาข้อมูลแบบ Text; MongoDB/CouchDB: ใช้ JSON ต่อยอดจาก Key-Value มี Sub-key/Sub-Value และ Sharding; DynamoDB/Riak/Cassandra: เน้นความทนทาน บันทึกและอ่านได้ตลอดเวลาแม้ข้อมูลที่อ่านไม่ใช่ล่าสุด [p.53]
</details>

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **โน้ตประกอบ:** [[Chapter 08 Introduction to Business Intelligence and Data Warehouse]]
* **แบบฝึกหัดก่อนหน้า:** [[HW-Database-02]]
* **แหล่งข้อมูล:** `Resources/Books/Database/Database_Concept_08(1).pdf`
