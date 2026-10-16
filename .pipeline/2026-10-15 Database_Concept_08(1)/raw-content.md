# raw-content (PUA Thai glyphs remapped)

<!-- page 1 -->
## [p.1]

06066300  
Database  System 
Concepts
CHAPTER 8
INTRODUCTION TO BUSINESS 
INTELLIGENCE AND DATA WAREHOUSE

<!-- page 2 -->
## [p.2]

Learning Objective
❖ระบบธุรกิจอัจฉริยะ (Business Intelligence: BI)
❖องค์ประกอบของระบบธุรกิจอัจฉริยะ(Business Intelligence Components) 
❖ระบบคลังข้อมูล (Data Warehouse)
❖เครื่องมือในการพัฒนาระบบคลังข้อมูล (Data Warehouse Development 
tools)
❖ออกแบบระบบคลังข้อมูล (Data Warehouse Design)
❖การวิเคราะห์ข้อมูลโดยใช้ OLAP (Data Analysis using OLAP)
❖NoSQL Concept
FACULTY OF INFORMATION TECHNOLOGY, KMITL
2

<!-- page 3 -->
## [p.3]

8.1 Business Intelligence: BI
❖ระบบธุรกิจอัจฉริยะ คือ ระบบสารสนเทศสนับสนุนการตัดสินใจ (Decision Support 
Data) ของผู้บริหารในระดับเชิงกลยุทธ์ (Strategic Decision) เพื่อให้ธุรกิจสามารถ ได้เปรียบ
ในเชิงการแข่งขัน (Competitive Advantage)
❖ระบบธุรกิจอัจฉริยะ ที่ประกอบด้วยเทคโนโลยีต่างๆ ได้แก่เทคโนโลยีรวบรวมและจัดเก็บ 
ข้อมูล เทคโนโลยีวิเคราะห์และเข้าถึงข้อมูลแบบหลายมิติ (Multidimensional Model) ซึ่ง 
ช่วยให้ผู้บริหารองค์กรทำการตัดสินใจทางธุรกิจที่ดียิ่งขึ้น
FACULTY OF INFORMATION TECHNOLOGY, KMITL
3

<!-- page 4 -->
## [p.4]

8.1 Business Intelligence: BI(Cont.)
❖ ลักษณะข้อมูลสนับสนุนการการตัดใจของผู้บริหาร มีความแตกต่างจากข้อมูลของระบบปฏิบัติงาน 
(Operational Data) ทั่วไป 3 ประการคือ
❖Time Span ข้อมูลมีการจัดเก็บตามกาลเวลา เป็นข้อมูลตั้งแต่อดีตจนถึงข้อมูลปัจจุบัน ซึ่งสามารถ วิเคราะห์ข้อมูลในแต่
ละช่วงเวลา
❖Level of Aggregation ข้อมูลมีการจัดเก็บในรูปแบบการสรุปรวมของกลุ่มข้อมูล (Aggregation) หลายระดับ  เช่น 
ยอดขายแต่ละเดือน ยอดขายแต่ละไตรมาส และยอดขายแต่ละปี เป็นต้น ซึ่ง สามารถเข้าถึงได้อย่างรวดเร็ว
❖Dimensionality ข้อมูลที่จัดเก็บมีหลายมิติ หรือจัดเก็บข้อมูลแบบลูกบาศก์ (Cube Data) ซึ่งสามารถ วิเคราะห์ข้อมูลได้
ตามมิติต่างๆ ที่ต้องการ เช่น ยอดขายตามมิติผลิตภัณฑ์ (Product Dimension) ยอดขายตามมิติสถานที่ (Region 
Dimension) และยอดขายตามมิติเวลา (Time Dimension) เป็นต้น
FACULTY OF INFORMATION TECHNOLOGY, KMITL
4

<!-- page 5 -->
## [p.5]

8.1 Business Intelligence: BI(Cont.)
ขอมูลแบบหลายมิติ (Cube Data)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
5
ที่มา: John Wiley & Sons, Inc.

<!-- page 6 -->
## [p.6]

8.2 Business Intelligence Components
❖การตัดสินใจของผูบริหารในระดับเชิงกลยุทธจำเปนตองใชขอมูลแบบบูรณาการ ดังนั้น 
ขอมูลนำเขาที่ใชในระบบธุรกิจอัจฉริยะมาจากแหลงขอมูลทั้งภายในและภายนอก  แหลงขอมูล
ภายใน ไดแกขอมูลจากระบบสารสนเทศตางๆภายในองคกร เชน ขอมูลจากระบบสารสนเทศ
ระดับ ปฏิบัติการ (Operational 
System) 
และระบบวางแผนทรัพยากรขององคกร 
(Enterprise Resource Planning; ERP) เปนตน สวนขอมูลจากภายนอก เชน ขอมูลจาก
ระบบโซอุปทาน (Supply Chain Management; SCM) เปนตน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
6

<!-- page 7 -->
## [p.7]

8.2 Business Intelligence Components
(Cont.)
❖ ขอมูลนำเขาจึงมีหลากหลายรูปแบบของขอมูลอาจจะมาจากระบบจัดการฐานขอมูล
(DBMS) ที่ตางชนิดกัน หรือตางยี่หอกัน(Vendors) หรือมาจากไฟลขอมูล(Flat Files) ใน
การบูรณาการขอมูลแบบองครวม จึงตองมีกระบวนการและเครื่องมือในการจัดการขอมูล
เหลานั้น เพื่อใหขอมูลมีความถูกตองสอดคลองกันและอยูในรูปแบบตามมาตรฐานที่กำหนด 
กระบวนการไดแกการดึงขอมูลจากแหลงขอมูลตางๆ (Extract data) การแปลงขอมูลใหตรง
กับความตองการ (Transform data) และการนำขอมูลเขาสูคลังขอมูล(Load data) โดยใช
เครื่องมือ ETL
FACULTY OF INFORMATION TECHNOLOGY, KMITL
7

<!-- page 8 -->
## [p.8]

8.2 Business Intelligence Components
(Cont.)
❖ ลักษณะการใชขอมูลมักจะเปนการวิเคราะหขอมูลตามสมมติฐานตาง 
ๆ
หรือเจาะลึก          
ขอมูลตามความตองการ(On Demand)  หรือหาแนวโนมของขอมูล(Trend)  ซึ่งผูวิเคราะห
ขอมูลตองการคำตอบทันที
ในการวิเคราะหขอมูลจึงตองมีเครื่องมือที่มีประสิทธิภาพสูงที่จะ
ประมวลผลการวิเคราะหขอมูลแบบภาวะเชิงโตตอบ(Interactive) 
เครื่องมือที่สำคัญดังกลาว 
คือเครื่องมือการวิเคราะหแบบออนไลน(Online Analytical Processing; OLAP) ระบบธุรกิจ
อัจฉริยะยังครอบคลุมไปถึงการวิเคราะหขอมูลเพื่อคนหารูปแบบ(Pattern) หรือความสัมพันธ
ที่ซอนอยูของขอมูลจากขอมูลปริมาณมากอยางอัตโนมัติหรือที่เรียกวาเปนการทำเหมืองขอมูล
(Data Mining) อนึ่ง
การวิเคราะหขอมูลกจะมีแบบจำลองการวิเคราะหขอมูลทางธุรกิจ
(Business Data Analysis Model) และเครื่องมือในการจัดรูปแบบการแสดงขอมูล(Data 
Visualization) ที่สนับสนุนการวิเคราะหขอมูล
FACULTY OF INFORMATION TECHNOLOGY, KMITL
8

<!-- page 9 -->
## [p.9]

8.2 Business Intelligence Components
(Cont.)
❖องคประกอบของ ระบบธุรกิจ
อัจฉริยะ
FACULTY OF INFORMATION TECHNOLOGY, KMITL
9

<!-- page 10 -->
## [p.10]

8.3  Data Warehouse
❖ การออกแบบฐานขอมูลอยางไรขึ้นอยูกับลักษณะของฐานขอมูลและวัตถุประสงคการ
นำไปใชงาน
❖ ลักษณะของความตองการขอมูลแบบบูรณาการ (Integrated data) และลักษณะการใชข
อมูลของ ระบบธุรกิจอัจฉริยะ ระบบฐานขอมูลที่จะรองรบขอมูลปริมาณมากๆ จึงไมใชระบบ
ฐานขอมูลแบบ ธรรมดาเหมือนในระบบสารสนเทศประมวลผลทรานแซคชั่น(Transaction 
Process System; TPS) แตเปนระบบฐานขอมูลแบบคลังขอมูล(Data Warehouse 
Database) ซึ่งตองสามารถจัดเก็บขอมูลสนับสนุนการตัดสินใจตามลักษณะที่กำหนด
FACULTY OF INFORMATION TECHNOLOGY, KMITL
10

<!-- page 11 -->
## [p.11]

8.3  Data Warehouse (Cont.)
❖ คลังขอมูล(Data Warehouse) เปนฐานขอมูลขนาดใหญขององคกรที่รองรับขอมูลปริมาณมาก 
ที่มา จากหลากหลายแหงขอมูลจากอดีตจนถึงปจจุบัน เปนฐานขอมูลแบบอานไดอยางเดียว (Read-
only) เพื่อใชสำหรับการวิเคราะหและประมวลผลคิวรี (query processing) ที่ซับซอน
❖ คลังขอมูลขนาดเล็กหรือที่เรียกวา Data Mart เปนคลังขอมูลที่ใชเฉพาะสวนงาน เชน คลังขอมูล
สำหรับฝายการตลาด เปนตน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
11

<!-- page 12 -->
## [p.12]

8.3  Data Warehouse (Cont.)
❖ ระบบจัดการฐานขอมูล(DBMS) สำหรับคลังขอมูลจึงตองมีคุณลักษณะพิเศษ เพื่อรองรับการ
ประมวลผลที่ รวดเร็ว ดังนี้
❖ Database Schema โครงสรางของฐานขอมูลหรือพจนานุกรมขอมูล(Data Dictionary) เพื่อนิยามหรืออธิบาย 
ขอมูลในฐานขอมูลซึ่งตองสามารถแสดงขอมูลที่ซับซอน ขอมูลรวม (Aggregated Data) และขอมูลสรุป 
(Summarized Data) และสามารถคิวรีข้อมูล ตามมิติของเวลา ณ เวลาตางๆ ได(Time Slices)
❖ Data Extraction and Loading (ETL function) มีฟงกชันที่ใชในการบูรณาการขอมูลจากแหลงตางๆจาก 
ระบบฐานขอมูลตางๆ หรือจากไฟลขอมูลรวมทั้งสามารถตรวจสอบความไมสอดคลองกันของขอมูล(Data 
Cleaning) เพื่อนำขอมูลที่ตองการเขาสูระบบคลังขอมูล
❖ End-user Analytical Interface (OLAP GUI) มีสวนตอประสานผูใชสำหรับการวิเคราะหขอมูลซึ่งเปนองค
ประกอบที่สำคัญที่ผูใชสามารถเขาถึงขอมูลตางๆ อยางงายและรวดเร็ว เพื่อกระบวนการตัดสินใจที่รวดเร็ว
❖ ตองสนับสนุนฐานข้อมูลที่มีขนาดใหญ่ (Size large Database)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
12

<!-- page 13 -->
## [p.13]

8.3  Data Warehouse (Cont.)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
13

<!-- page 14 -->
## [p.14]

8.4  Data Warehouse Development tools
❖ลักษณะขอมูลในระบบคลังขอมูลมีลักษณะที่สำคัญดังนี้
1)  Integrated Data เปนขอมูลที่บูรณาการจากขอมูลหลายๆ แหลงทั้งจากภายในและ ภายนอกองคกร ซึ่งขอมูลตองมีความสอด
คลองกัน
2) Subject-Oriented เปนขอมูลที่จัดเก็บตามหัวขอหรือเรื่องที่สนใจ หรือตามมิติ (Dimension) ที่ตองการวิเคราะหเชน เก็บ
ยอดขายตามมิติสินคา เก็บยอดขายตามมิติเวลา เปนตน
3)  Time-Variant เปนขอมูลที่จัดเก็บตามชวงเวลา ซึ่งสามารถตรวจสอบยอนหลังดูการเปลี่ยนแปลงของขอมูลตามกาลเวลาได้ 
(ช่วงเลา)
4)  Nonvolatile เปนขอมูลที่ ไมมีการบันทึกเปลี่ยนแปลงแกไข (Over-written) หรือลบออก ขอมูลจะมีลักษณะคงเดิม (Static 
data) สามารถอานอยางเดียว (Read-only) เพื่อใชสำหรับการวิเคราะหเพื่อจัดทำรายงานตางๆ
FACULTY OF INFORMATION TECHNOLOGY, KMITL
14
!= Transaction
!= Operation
!= Update
!= Mini World

<!-- page 15 -->
## [p.15]

8.4  Data Warehouse Development tools
(Cont.)
❖การพัฒนาระบบคลังขอมูลตองมีเครื่องที่สำคัญคือ
ETL ซึ่งมีฟงกชันการทำงานกับขอมูลตางๆดังนี้การ
ดึงขอมูลมาจากแหลงขอมูลตางๆ(Extract) การ
กรองขอมูลที่ตองการ (Filter) การแปลงขอมูลตาม
รูปแบบที่ถูกตอง(Transform) การบูรณาขอมูลเขา  
ดวยกัน(Integrate) การจำแนกขอมูล(Classify) 
การรวมคากลุมขอมูล
(Aggregate) และการสรุป
ขอมูล(Summary)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
15

<!-- page 16 -->
## [p.16]

8.5 Data Warehouse Design 
❖การออกแบบระบบคลัง ซึ่งมีขอมูลแบบหลายมิติ (Multidimensional Data) สามารถใช
แบบจำลอง ขอมูลเชิงสัมพันธ(Relational Model) สรางสกีมาสำหรับระบบฐานขอมูลแบบ
หลายมิติ (Multidimensional Database Schema)
❖ องคประกอบแบบจำลองคลังขอมูล
❖ Fact Table (Measurement)
❖ Dimension Tables
❖ Attributes
❖ Attribute Hierarchies
FACULTY OF INFORMATION TECHNOLOGY, KMITL
16

<!-- page 17 -->
## [p.17]

8.5 Data Warehouse Design (Cont.)
❖องคประกอบที่สำคัญของแบบจำลอง 4 องคประกอบ
1.
Fact Table คือ ตารางที่เก็บขอมูลตัวเลขของกิจกรรมหรือธุรกิจ (Fact) ที่ตองการวัดหรือวิเคราะห
(Numeric Measurements ) เชน ยอดขาย จำนวนหนวยขาย และจำนวนลูกคา เปนตน
2.
Dimension Tables คือตารางเก็บขอมูลที่เปนมิติตางๆที่ใชศึกษาหรือวิเคราะหขอมูลที่ตองการวัด หรือ
ศึกษา Fact จาก Dimension เชน ศึกษายอดขายตามมิติของลูกคา หรือตามมิติของเวลา
3.
Attributes สำหรับแอตทริบิวตใน Fact Table คือคุณลักษณะที่ใชสำหรับการสืบคน การกรอง และ การ
จำแนกขอมูลของตาราง Fact สวนแอตทริบิวตของ Dimension Table ก็คือ คุณลักษณะของมิติ ตาง ๆ ที่ใช
เปนเงื่อนไขในการวิเคราะหขอมูลFact เชน ถาเปนมิติของเวลา (Time Dimension) จะมี แอตทริบิวตไดแก
วัน เดือน ไตรมาส และปตัวอยางเงื่อนไขในการวิเคราะหเชน วิเคราะหยอดขาย รายไตรมาส เปนตน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
17

<!-- page 18 -->
## [p.18]

8.5 Data Warehouse Design (Cont.)
4.
Attribute Hierarchies คือ ลำดับของแอตทริบิวตที่มีอยูใน Dimension Table เชน ตารางมิติเวลา ที่
ประกอบดวยลำดับของแอตทริบิวตคือ วัน -> เดือน -> ไตรมาส -> ปหรือถา เปนมิติสินคา ลำดับของ
แอตทริบิวตอาจจะเปน กลุมยอยสินคา(Sub-Category) -> ประเภท สินคา (Category) เปนสกีมาของ
ฐานขอมูลที่เก็บ
❖ ลำดับของแอตทริบิวตเปนสกีมาจะเก็บใน Dat a Dictionary มีวัตถุประสงคเพื่อ ใชในการประมวล 
ผลรวมของขอมูล(Data Aggregation) และการวิเคราะหขอมูลแบบ Drill down/Roll up โดย ลำดับของ
แอตทริบิวตจะใชในการเขาถึงและการแสดงขอมูลในการวิเคราะหขอมูล
FACULTY OF INFORMATION TECHNOLOGY, KMITL
18

<!-- page 19 -->
## [p.19]

8.5 Data Warehouse Design (Cont.)
❖แบบจำลองขอมูลที่ใชออกแบบสกีมาระบบฐานขอมูลหลายมิติหรือคลังขอมูลมีอยู2 แบบจำลอง คือ Star Schema และ Snowflake Schema ซึ่ง
มีลักษณะดังนี้
1)  Star Schema
แบบจำลองขอมูลที่ประกอบดวย1 Fact Table (เก็บขอมูลวัดหรือ Metrics) ซึ่งอยูในขั้น 3NF และมีเพียง ตารางเดียว Dimension Table สำหรับแต
ละมิติ ซึ่งจะยอมใหDimension Table มีความซ้ำซอนของขอมูลหรือลด ระดับนอรมัลไลเซชัน (Denormalized) ใหอยูในขั้น 2NF เพื่อความรวดเร็วใน
การเขาถึงขอมูลใน Product Dimension ยังมี Function Dependency (FD) คือ ยังมีความสัมพันธระหวางแอตทริบิวตSub-category กับ 
Category (ไมผาน3NF เนื่องจาก Non-key -> Non-key) ทั้งนี้ เนื่องจากเปนระบบฐานขอมูลแบบนี้เขาถึงแบบ Read-only จึงไมมีปญหาในการ
ปรับปรุงขอมูล(Update Anomaly)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
19

<!-- page 20 -->
## [p.20]

8.5 Data Warehouse Design (Cont.)
❖สวนคียหลัก (Primary key)
❖Dimension Table ก็เปนคียหลักปกติ (Surrogate key)
❖Fact Table เปน Composite key ที่ประกอบดวยForeign keys จากทุก Dimension Tables  
ดังนั้น แบบจำลอง Star Schema จะทำใหระบบมีความรวดเร็วในการประมวลผลการวิเคราะหตามมิติ   
ตางๆ เนื่องจากการคิวรีไมซับซอน สามารถ Join ตารางโดยตรงจาก Fact Table ไปยัง Dimension 
Table ใน ระดับเดียวเทานั้น
❖Cardinality: One-to-Many
FACULTY OF INFORMATION TECHNOLOGY, KMITL
20

<!-- page 21 -->
## [p.21]

8.5 Data Warehouse Design (Cont.)
2) Snowflake Schema
แบบจำลองขอมูลที่มีแนวคิดหลักเชนเดียวกับแบบ Star Schema คือประกอบดวย1 Fact Table ซึ่งมีคีย
หลักมาจาก FK ที่มาจาก Dimension Table ตางๆอนึ่ง สำหรับDimension Tables ของบางมิติจะมี     
มากกวา 1 ตาราง ซึ่งเกิดจากการทำนอรมัลไลเซชัน Dimension Tables  ในกรณีที่มีแอตทริบิวตจำนวน
มากที่เปนสัดสวนที่มีนัยสำคัญของฐานขอมูลเชน ProductDim ไดแตกตาราง Category ออกมา
FACULTY OF INFORMATION TECHNOLOGY, KMITL
21

<!-- page 22 -->
## [p.22]

8.6 Data Analysis using OLAP
1. Drill down และ Roll up
ในการวิเคราะหขอมูลจะใชฟงกชัน Drill Down เขาถึงขอมูลแบบเจาะลึกลงในระดับรายละเอียด และฟงก
ชัน Roll Up ใน การดูขอมูลในระดับสรุปรวมขึ้นไปที่ละระดับ เชน
❖Drill Down ในขณะที่ดูขอมูลยอดขายสินคาของแตละประเภท พบวาสินคาเครื่องใชไฟฟายอดขายสูงที่สุด ผูวิเคราะห
สนใจดูวาเปนเครื่องใชไฟฟาในกลุมไหนมียอดขายเทาไรบางก็สามารถ Drill Down เพื่อดูรายละเอียดไดระบบก็จะสรุป
ยอดรวมสินคาในกลุมยอยที่อยูในประเภทสินคานั้นๆ
❖ Roll Up ก็ตรงกันขามกัน คือในขณะที่ดูขอมูลในระดับกลุมสินคา ก็สามารถ Roll Up ขึ้นไปเพื่อดูขอมูลสรุปยอด 
รวมของแตละประเภทสินคา
❖ การ Drill down และ Roll up จะประมวลผลตามลำดับของแอตทริบิวต(Attribute Hierarchies) ตัวอยางเชน 
Region -> Product Type -> Shop
FACULTY OF INFORMATION TECHNOLOGY, KMITL
22

<!-- page 23 -->
## [p.23]

8.6 Data Analysis using OLAP (Cont.)
Region -> Product Type -> Shop
FACULTY OF INFORMATION TECHNOLOGY, KMITL
23

<!-- page 24 -->
## [p.24]

8.6 Data Analysis using OLAP (Cont.)
2) Slice
เปนการแบงชิ้นขอมูลหลายมิติหรือกรองขอมูลเพื่อวิเคราะหตามความตองการ เชน ในรูปเปนกา
รกรองขอมูลเพื่อวิเคราะหขอมูลเพื่อดูยอดขายเฉพาะสนคาที่เปน Glossary ไดแกFish, Meat, 
Pork
FACULTY OF INFORMATION TECHNOLOGY, KMITL
24

<!-- page 25 -->
## [p.25]

8.6 Data Analysis using OLAP (Cont.)
3) Dice
เปนการวิเคราะหโดยเปลี่ยนมิติของขอมูล(หมุนแกนหรือเปลี่ยนหนาของขอมูลลูกบาศก) เชน ในรูปบนเปน 
การวิเคราะหเพื่อดูขอมูลยอดขายของแตละ Product Type ตามมิติ Shop สวนภาพลางเปนการวิเคราะห
ยอดขายของแตละ Product Type ตามมิติ Date ซึ่งก็คือ เปลี่ยนมิติในวิเคราะหจากมิติ Shop เปนมิติ Date
FACULTY OF INFORMATION TECHNOLOGY, KMITL
25

<!-- page 26 -->
## [p.26]

8.7 NoSQL Concept
❖ SQL Concepts
❖ NoSQL Concepts
❖ NoSQL Characteristics
❖ Types of NoSQL
❖ SQL vs NoSQL
❖ NoSQL Tools
FACULTY OF INFORMATION TECHNOLOGY, KMITL
26

<!-- page 27 -->
## [p.27]

SQL Characteristics
❖ Data stored in columns and tables
❖ Relationships represented by data
❖ Data Manipulation Language
❖ Data Definition Language 
❖ Transactions
❖ Abstraction from physical layer
FACULTY OF INFORMATION TECHNOLOGY, KMITL
27

<!-- page 28 -->
## [p.28]

SQL Physical Layer Abstraction
❖Applications specify what, not how
❖ Query optimization engine
❖Physical layer can change without modifying applications
❖ Create indexes to support queries
❖ In Memory databases
FACULTY OF INFORMATION TECHNOLOGY, KMITL
28

<!-- page 29 -->
## [p.29]

Data Manipulation Language (DML)
❖ Data manipulated with Select, Insert, Update, & Delete statements
❖ Select T1.Column1, T2.Column2 …
  From Table1, Table2 …
  Where T1.Column1 = T2.Column1 …
❖ Data Aggregation
❖ Compound statements
❖ Functions and Procedures
❖ Explicit transaction control
FACULTY OF INFORMATION TECHNOLOGY, KMITL
29

<!-- page 30 -->
## [p.30]

Data Definition Language
❖ Schema defined at the start
❖ Create Table (Column1 Datatype1, Column2 Datatype 2, …)
❖ Constraints to define and enforce relationships ( Primary Key, Foreign Key, and etc.)
❖ Triggers to respond to Insert, Update , & Delete
❖ Stored Modules
❖ Alter …
❖ Drop …
❖ Security and Access Control
FACULTY OF INFORMATION TECHNOLOGY, KMITL
30

<!-- page 31 -->
## [p.31]

Transactions – ACID Properties
❖ Atomic – All of the work in a transaction completes (commit) or 
none of it completes
❖ Consistent – A transaction transforms the database from one 
consistent state to another consistent state. Consistency is defined in 
terms of constraints.
❖ Isolated – The results of any changes made during a transaction 
are not visible until the transaction has committed.
❖ Durable – The results of a committed transaction survive failures
FACULTY OF INFORMATION TECHNOLOGY, KMITL
31

<!-- page 32 -->
## [p.32]

NoSQL คืออะไร 
❖ NoSQL ย่อมาจาก Not Only Structure Query Language
❖ Unstructured ของ Database แบบ SQL มันเป็นแนวทางการแก้ไขปัญหาของ Database 
ที่มีข้อมูลขนาดใหญ่และไม่มีรูปแบบที่ชัดเจน โดยไม่จำเป็นต้องเก็บข้อมูลแบบ Table เดียวที่มี
ต้องข้อมูลเหมือนกันทั้งหมดในหนึ่ง Table แต่สามารถจัดเก็บข้อมูลแบบได้หลายรูปแบบ 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
32

<!-- page 33 -->
## [p.33]

SQL vs NoSQL
FACULTY OF INFORMATION TECHNOLOGY, KMITL
33
NoSQL
Pros
  Good for non-relational data.
•
Schema-less architecture allows for frequent 
changes to the database and easy addition of 
varied data to the system. 
•
  Easily scalable, runs well on distributed systems 
(the cloud).
Cons 
•
Installation management and toolsets still 
maturing. 
•
Can have slower response time. 
Examples: Amazon DynamoDB, MongoDB, 
Couchbase, Riak
SQL
Pros
•
Relational databases are good at structured 
a data and transactional, high-performance, 
work loads.
•
Offering are proven and mature with wide 
variety of tools available.
Cons
•
Can be difficult to scale
•
Fixed schema for organizing data
Examples: MySQL, PostGreSQL, SQL Server, 
Oracle

<!-- page 34 -->
## [p.34]

Pros: NoSQL
❖ โดยมาก NoSQL มักถูกออกแบบมาให้มี Availability สูงมาก และ Scale ระบบเพื่อรองรับ
ผู้ใช้งานจำนวนมากได้ง่าย ถึงแม้ระบบจะทำงานร่วมกันข้าม Data Center ก็ตาม
❖ NoSQL หลายๆ ระบบถูกออกแบบมาสำหรับ Unstructured Data โดยเฉพาะ เช่น 
ประมวลผล Log, XML, JSON และเอกสารต่างๆทำให้มีความยืดหยุ่นในการใช้งานเฉพาะทาง
แต่ละประเภทสูง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
34

<!-- page 35 -->
## [p.35]

Cons : NoSQL
❖ NoSQL ทำงานแบบNon-transactional ดังนั้นถ้าหากข้อมูลมีความละเอียดสูง ทำให้เกิดความ
ผิดพลาดไม่ได้เลยทำให้NoSQL หลายๆระบบก็อาจจะไม่เหมาะในหลายๆกรณี
❖ ต้นทุนการเรียกข้อมูลขึ้นมาใช้งานสูงกว่า
เมื่อเทียบกับการเรียกข้อมูลโดยใช้
SQL เนื่องจากไม่
สามารถเลือกเจาะจงข้อมูลเฉพาะส่วนที่สนใจขึ้นมาแสดงได้
ยกเว้นงานเฉพาะทางบางอย่างที่จะดีกว่า
SQL แบบชัดเจนมาก(ขึ้นอยู่กับงานที่ทำและเทคโนโลยีที่เลือก) แต่การบันทึกข้อมูลลงไปส่วนใหญ่จะง่าย
กว่าSQL
❖ เทคโนโลยีส่วนใหญ่ไม่มีความเป็นมาตรฐานกลาง
ดังนั้นการเปรียบเทียบแต่ละเทคโนโลยีค่อนข้างทำ
ได้ยากผู้ใช้งานต้องมีความเชี่ยวชาญกับการจัดการSoftware
❖ ผู้เชี่ยวชาญที่สามารถสนับสนุนเทคโนโลยีเหล่านี้ในระดับองค์กรได้นั้นยังมีไม่มาก
แต่เทคโนโลยี
NoSQL นี้กลับมีความจำเป็นมากในการที่องค์กรจะสร้างความแตกต่างในเชิงเทคโนโลยีจากคู่แข่ง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
35

<!-- page 36 -->
## [p.36]

คุณสมบัติของ NoSQL
❖ Dynamic Schema : Schema สามารถเพิ่มเติมได้
❖ Auto-Sharding : การแบ่งข้อมูลเก็บเป็นส่วน ๆ 
❖ Integrated Caching
FACULTY OF INFORMATION TECHNOLOGY, KMITL
36

<!-- page 37 -->
## [p.37]

Replication
❖Replication copies the entire database across all nodes in the 
distributed system.

<!-- page 38 -->
## [p.38]

Sharding
❖ Sharding divides the data inside the database and partitions pieces of it to 
different nodes.
❖ Databases can be sharded horizontally (by rows) or vertically (by columns).

<!-- page 39 -->
## [p.39]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
39

<!-- page 40 -->
## [p.40]

Pros / Cons of Each
Sharding
Replication
Pros
❖Fast data writing / reading. 
Low memory overhead.
❖Fast data reading. High 
data reliability.
Cons
❖Potential data loss
❖High network overhead. 
High memory overhead.

<!-- page 41 -->
## [p.41]

NoSQL datatypes
❖ Key-Value Store 
❖ เก็บข้อมูลโดยการระบุ Key และ Value เพื่อดึงข้อมูลโดยการระบุ Key จากนั้นฐานข้อมูลจะค้น Value คืนมาให้
❖ Key-Value Store เหมาะกับการเก็บข้อมูลที่ไม่ซับซ้อน และต้องการความเร็วสูง เช่น การเก็บข้อมูล Session ของ Web app
❖ Wide Column Store
❖ สามารถเพิ่ม Column ได้ 
❖เหมาะกับระบบฐานข้อมูลที่ต้องการนำเสนอแบบกระจาย และขนาดใหญ่ 
❖ Document Store
❖สามารถเพิ่มดัชนี (Index) เพื่อค้นหาข้อมูล ซึ่งเป็นคุณสมบัติเพิ่มเติมจาก Key-Value Store
❖เหมาะกับการเก็บข้อมูลทั่วไป
❖ Graph Store
❖สามารถระบุความสัมพันธ์ที่ซับซ้อนได้ มากกว่าวิธี Relational database
❖ตัวอย่างเช่น การเก็บข้อมูลในลักษณะ Social network
FACULTY OF INFORMATION TECHNOLOGY, KMITL
41

<!-- page 42 -->
## [p.42]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
42
Column-Family Store
Key/Value Store 
Document Store
Graph Databases

<!-- page 43 -->
## [p.43]

Document Store
FACULTY OF INFORMATION TECHNOLOGY, KMITL
44

<!-- page 44 -->
## [p.44]

Column Family
FACULTY OF INFORMATION TECHNOLOGY, KMITL
45

<!-- page 45 -->
## [p.45]

Column Family
FACULTY OF INFORMATION TECHNOLOGY, KMITL
46

<!-- page 46 -->
## [p.46]

Key-Value Store
FACULTY OF INFORMATION TECHNOLOGY, KMITL
48

<!-- page 47 -->
## [p.47]

Graph Database
FACULTY OF INFORMATION TECHNOLOGY, KMITL
49

<!-- page 48 -->
## [p.48]

Difference between RDBMS & MongoDB
FACULTY OF INFORMATION TECHNOLOGY, KMITL
50
Server
Databases
Tables
Rows
Rows
Databases
Tables
Server
Schema
Joins
Collections
RDBMS
MongoDB
Documents
Schema
Joins

<!-- page 49 -->
## [p.49]

Popular Software : Key-Value Stores
FACULTY OF INFORMATION TECHNOLOGY, KMITL
51

<!-- page 50 -->
## [p.50]

Popular Software : Document Databases
FACULTY OF INFORMATION TECHNOLOGY, KMITL
52

<!-- page 51 -->
## [p.51]

Popular Software : Graph Databases
FACULTY OF INFORMATION TECHNOLOGY, KMITL
53

<!-- page 52 -->
## [p.52]

What’s tools you need?
FACULTY OF INFORMATION TECHNOLOGY, KMITL
54

<!-- page 53 -->
## [p.53]

NoSQL tools specification
❖ DynamoDB, Riak และ Cassandra เน้นให้ฐานข้อมูลมีความทนทาน, สามารถบันทึกข้อมูลและเรียกอ่านข้อมูลได้
ตลอดเวลา แม้ว่าข้อมูลที่ถูกอ่านออกไปนั้นจะไม่ใช่ข้อมูลล่าสุด
❖ MongoDB และ CouchDB เพิ่มเติมความสามารถในการบันทึกข้อมูลให้มีความยืดหยุ่นกว่าเดิม โดยใช้ JSON ทำให้มี
ความสามารถต่อยอดจาก Key-Value ที่มีอยู่ พร้อมเพิ่มระบบ Sub-key และ Sub-Value ภายในกับการทำSharding ทำ
ให้รองรับการบริการข้อมูลจำนวนมากด้วยความเร็วสูง
❖ Redis ถูกออกแบบมาให้รองรับ Key-Value ทำให้สามารถจัดการกับข้อมูลได้รวดเร็วและดีขึ้น ซึ่งที่นิยมสำหรับการ
สร้างข้อมูลที่มีการเรียงลำดับหลายๆ ชุด ทำให้เหมาะสำหรับการทำRanking และ Leaderboard รวมถึงยังมี
ความสามารถในการจัดเรียงและประมวลผลทางสถิติที่ซับซ้อน เพื่อนำไปประยุกต์สำหรับ Application เฉพาะทาง
บางอย่างได้ดี
❖ Neo4j เป็นฐานข้อมูลสำหรับการประมวลผลข้อมูลแบบ Graph
❖ Elasticsearch เป็นระบบฐานข้อมูลสำหรับการค้นหาข้อมูลแบบ Text
FACULTY OF INFORMATION TECHNOLOGY, KMITL
55

<!-- page 54 -->
## [p.54]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
57
