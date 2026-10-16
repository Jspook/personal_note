# raw-content (PUA Thai glyphs remapped)

<!-- page 1 -->
## [p.1]

06066300  Database System 
Concept
CHAPTER 6
DATABASE SYSTEM ARCHITECTURE
ที่มา: สไลด์นี้ดัดแปลงมาจาก Asst.Prof. Srinual Nalintippayawong

<!-- page 2 -->
## [p.2]

Learning Objectives
•สถาปัตยกรรมของระบบฐานข้อมูล(Database System 
Architecture) 
•ภาษาสำหรับฐานข้อมูล(Database Languages)
•องค์ประกอบของระบบจัดการฐานข้อมูล(DBMS Component 
Modules)
•ฟังก์ชันของระบบจัดการฐานข้อมูล
•สถาปัตยกรรมสำหรับระบบจัดการฐานข้อมูล(Architectures 
for DBMSs)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
2

<!-- page 3 -->
## [p.3]

6.1 Database System Architecture
• Three-Schema Architecture
◦สถาปัตยกรรมระบบฐานข้อมูลแบ่งสกีมาออกเป็น 3 ระดับ โดยมีเป้าหมายเพื่อแยก
โปรแกรม ของผู้ใช้งานและ    ข้อมูลออกจากัน (program-data independence) และ
สนับสนุนมุมมองต่อข้อมูลที่หลากหลาย  แตกต่างกันไปตามความต้องการใช้งาน (multi-
view of data)
•Internal schemas, Conceptual schemas, External Schema
FACULTY OF INFORMATION TECHNOLOGY, KMITL
3

<!-- page 4 -->
## [p.4]

6.1 Database System Architecture (cont.)
•Three-Schema Architecture แบ่งเป็น 3 ระดับ
• Internal schemas เป็นสกีมาที่ใช้สำหรับอธิบายโครงสร้างเชิงกายภาพของฐานข้อมูลซึ่งเป็น 
ผลลัพธ์ที่ได้จากแบบจำลองเชิงกายภาพ (Physical data model)
• Conceptual schemas เป็นสกีมาที่ใช้อธิบายโครงสร้างฐานข้อมูลและเงื่อนไขบังคับต่างๆ
สำหรับกลุ่มผู้ใช้งาน ซึ่งสกีมาดังกล่าวจะได้จากการออกแบบฐานข้อมูลโดยใช้ Conceptual data 
model และ Implementation data model
• External schemas เป็นสกีมาที่ใช้อธิบายฐานข้อมูลในมุมมองต่างๆ(View) ตามกลุ่มของผู้ใช้
งาน โดยจะใช้แบบจำลองข้อมูลเช่นเดียวกับ Conceptual schemas
FACULTY OF INFORMATION TECHNOLOGY, KMITL
4

<!-- page 5 -->
## [p.5]

6.1 Database System Architecture (cont.)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
5

<!-- page 6 -->
## [p.6]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
6
6.1 Database System Architecture (cont.)

<!-- page 7 -->
## [p.7]

• สกีมา ทั้ง 3 ระดับ ใช้สำหรับอธิบายข้อมูลเท่านั้น ข้อมูลที่เก็บจริงจะถูกจัดเก็บในระดับ 
กายภาพ (physical level)
• การเข้าถึงข้อมูลในแต่ละระดับจะผ่านกระบวนการ “Mappings” เพื่อปรับเปลี่ยน 
(transforming) คำร้องขอและส่งข้อมูลของแต่ละระดับ ทำให้เกิดความเป็นอิสระของข้อมูล
(Data Independence) นั่นก็คือ เมื่อมีการเปลี่ยนแปลงสกีมาในระดับล่างจะไม่จำเป็นต้อง 
เปลี่ยนแปลงสกีมาในระดับสูง ขึ้นไป
FACULTY OF INFORMATION TECHNOLOGY, KMITL
7
6.1 Database System Architecture (cont.)

<!-- page 8 -->
## [p.8]

6.1 Database System Architecture (cont.)
• Data Independence
• Logical data independence คือ สามารถเปลี่ยนแปลง Conceptual schema (เช่น เพิ่ม เอนทิตี) 
โดยไม่ต้องเปลี่ยนแปลง External schema  ทั้งนี้เนื่องจากระบบจะทำการเปลี่ยนแปลง View 
definition และ Mapping ดังนั้นในส่วนของโปรแกรมที่อ้างถึง External schema ก็ยังคงทำงานได้
ตามปกติ
• Physical data independence คือ ความสามารถในการเปลี่ยนแปลง Internal schema (เช่น การ
เปลี่ยนโครงสร้างของข้อมูล) โดยไม่ต้องทำการแก้ไขเปลี่ยนแปลง Conceptual schema (ซึ่งก็จะทำให้ไม่
ต้องปรับเปลี่ยนในส่วนของ External schema ด้วยเช่นกัน)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
8

<!-- page 9 -->
## [p.9]

6.1 Database System Architecture (cont.)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
9

<!-- page 10 -->
## [p.10]

6.2 Database Languages (Cont.)
• การจัดการกับข้อมูลในฐานข้อมูลเช่น การเข้าถึงข้อมูลการเพิ่มข้อมูลการลบข้อมูลและ
การ แก้ไขข้อมูลDBMS มีชุดดำเนินการ(operators) หรือภาษาที่ใช้คือ Data Manipulation 
Language (DML) สำหรับฐานข้อมูลเชิงสัมพันธ์ RDBMS ใช้ภาษา Structural Query 
Language (SQL) ซึ่งเป็นภาษาระดับสูงที่ใช้งานง่าย(non-procedural language) เป็นภาษา 
มาตรฐานของ DDL, VDL และ DML  โดยคำสั่ง DML สามารถเขียนฝังอยู่ในแอพพลิเคชัน 
โปรแกรม (host language) เช่น ภาษา C++  ภาษา Java เป็นต้น
FACULTY OF INFORMATION TECHNOLOGY, KMITL
10

<!-- page 11 -->
## [p.11]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
11
6.3 DBMS Component Modules

<!-- page 12 -->
## [p.12]

DBMS
How?
What?
Program/User
DB
Relational Calculus (นิยามของ Oracle)
นิยามของ Result ที่ต้องการ
Relational Algebra (Procederal)
มี 8 Operators
Basic Concept of Relational Database 
Language

<!-- page 13 -->
## [p.13]

Basic Steps in Query Processing
1. 
Parsing and translation
2. 
Optimization
3. 
Evaluation

<!-- page 14 -->
## [p.14]

Description query processing
•Query = SQL
•Parser and translator = Process (Syntax and Variable)
•Relational-algebra expressions = input/output ( เส้นทางสำหรับเข้าถึงข้อมูล)
•Optimizer = เลือกเส้นทางที่ดีที่สุดเพื่อเข้าถึงข้อมูล
•Execution plan = algebra expression ที่ถูกเลือกแล้วที่จะเข้าถึงข้อมูลระดับกายภาพ (แผนงาน+
รายละเอียด)
•Evaluation engine = รับแผนที่เลือกมาปฏิบัติ
•Query output = output

<!-- page 15 -->
## [p.15]

Relational Algebra Operator
Select (restrict)
Project
Join (natural Join)
Union
Intersection
Difference
Multiply (Product)
Division
Essential Subset
Set Operator
Special Operator

<!-- page 16 -->
## [p.16]

6.3 DBMS Component Modules (cont.)
• ส่วนของภาพด้านบนแสดงถึงส่วนติดต่อใช้งานของผู้ใช้งาน(users) ประเภทต่างๆได้แก่
DBA ที่ทำหน้าทกำหนดโครงสร้างของฐานข้อมูลโดยใช้คำสั่งDDLและกำหนดสิทธิ์การใช้ฐาน
ข้อมูล(Privileged Commands) สำหรับผู้ใช้งานฐานข้อมูลในบางโอกาส(Casual Users) 
จะใช้ภาษาคิวรีโดยตรงกลุ่มผู้พัฒนาโปรแกรมประยุกต์(Programmers) ที่เขียนคำสั่งDML 
ใช้งานฐานข้อมูลผ่านแอพพลิเคชั่นโปรแกรม(Host Language) เช่นภาษาจาวาภาษาซีหรือ
ภาษาโคบอล
เป็นต้น) โดยมีPrecompiler ทำหน้าที่ดึงเอาคำสั่งDML ออกมาจาก
แอพพลิเคชั่นโปรแกรมเพื่อส่งให้DML Compiler เปลี่ยนคำสั่งเป็นObject Code 
สำหรับเข้าถึงฐานข้อมูลและกลุ่มผู้ใช้งานทั่วไป(Parametric Users) ที่ใช้งานฐานข้อมูล
ผ่านโปรแกรมประยุกต์
FACULTY OF INFORMATION TECHNOLOGY, KMITL
16

<!-- page 17 -->
## [p.17]

6.3 DBMS Component Modules (cont.)
•DDL Compiler จะทำหน้าที่ประมวลผลนิยามสกีมา (Schema definition) ที่กำหนดโดย DDL และจะ 
จัดเก็บคำอธิบายสกีมา (Mata-data) ไว้ใน DBMS Catalog
•Query Compiler จะทำหน้าที่ประมวลผลคำสั่งคิวรีและส่งต่อไปยัง Query Optimizer เพื่อวิเคราะห์
และ กำหนดขั้นตอนในการปฏิบัติการตามคำสั่งคิวรีอย่างมีประสิทธิภาพโดยใช้ที่เก็บอยู่ที่ System 
Catalog
•Runtime Database Processor จะทำหน้าที่ประมวลผลตามคำสั่งการกำหนดสิทธิ์ปฏิบัติการตาม    
แผนคิวรีและประมวลผลทรานแซกชัน(Transaction)
•ส่วนของภาพด้านล่างแสดงให้เห็นว่า ข้อมูลของผู้ใช้งาน (Stored Database) และ DBMS Catalog ถูก 
จัดเก็บอยู่ในดิสต์ การเข้าถึงข้อมูลในดิสต์ควบคุมโดยระบบปฏิบัติการ (Operating System) ที่ทำหน้า 
เกี่ยวกับอินพุท/เอาท์พุตและมีโมดูล Stored Data Manager ของ DBMS ควบคุมการเข้าถึงข้อมูลใน
ฐานข้อมูล
FACULTY OF INFORMATION TECHNOLOGY, KMITL
17

<!-- page 18 -->
## [p.18]

6.4 DBMS Functions
•Data dictionary management
• จัดเก็บรายละเอียดของข้อมูลและความสัมพันธ์ของข้อมูล(Mata-Data) ไว้ใน Data dictionary DBMS จะใช้ 
Data dictionary เพื่อดูโครงสร้างและความสัมพันธ์ของข้อมูลและเมื่อใดก็ตามที่มีการเปลี่ยนแปลงโครงสร้างของ
ฐานข้อมูลก็จะ มีการบันทึกข้อมูลใน Data dictionary อย่างอัตโนมัติ ดังนั้น จึงไม่จำเป็นต้องไปแก้ไขโปรแกรม  
ต่างๆ ที่มีการใช้ข้อมูลที่มี การเปลี่ยนแปลงดังกล่าวหรืออาจกล่าวว่า DBMS ทำให้เกิด Data abstraction
•Data storage management
• DBMS สร้างและจัดการโครงสร้างที่มีความซับซ้อนสำหรับการจัดเก็บข้อมูลมีความสำคัญต่อการปรับปรุง 
ประสิทธิภาพของระบบฐานข้อมูล(Performance tuning) แม้ว่าผู้ใช้งานจะมองฐานข้อมูลเป็นฐานข้อมูลเดียว 
แต่จริง ๆ แล้ว DBMS จัดเก็บข้อมูลไว้ในหลายไฟล์
FACULTY OF INFORMATION TECHNOLOGY, KMITL
18

<!-- page 19 -->
## [p.19]

6.4 DBMS Functions (Cont.)
• Data transformation and presentation
•DBMS จะปรับเปลี่ยนโครงสร้างหรือรูปแบบของข้อมูลระดับกายภาพ (physical data) ไปเป็นข้อมูลเชิง
ตรรก (logical data) แบบต่างๆ ที่ผู้ใช้งานต้องการ
• Security management
•DBMS จะมีระบบความปลอดภัยของข้อมูล(data security) และความเป็นส่วนตัวของข้อมูล(data privacy) ที่
จะกำหนดระดับการ เข้าถึงและการใช้ข้อมูลของผู้ใช้งานที่แตกต่างกัน
• Multi-user access control
•เพื่อให้ข้อมูลในฐานข้อมูลมีความถูกต้องบูรณภาพและมีความสอดคล้องกัน DBMS จะมีกลไกลควบคุมการใช้
ฐานข้อมูลเมื่อมีผู้ใช้งาน พร้อม ๆ กันหลายคน (transaction management and concurrency control)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
19

<!-- page 20 -->
## [p.20]

6.4 DBMS Functions (Cont.)
• Backup and recovery
•DBMS จะมีฟังก์ชันให้ DBA ทำการสำรองข้อมูล(Backup) ทั้งในลักษณะทำเป็นประจำและการ
สำรองข้อมูลตามที่ต้องการ
มี กระบวนการในการกู้คืนข้อมูล(Recovery) เพื่อให้มีการ
บันทึกข้อมูลในฐานข้อมูลสำหรับทรานแซคชันที่ประมวลผลสมบูรณ์แล้วแม้ว่าระบบจะ เกิดความ
ผิดพลาดขัดข้อง (system failure)
•Data integrity management
•DBMS จะใช้ความสัมพันธ์ของข้อมูลที่อยู่ใน Data dictionary ตรวจสอบและรักษากฎบูรณภาพ
ของข้อมูล(Integrity rules) เพื่อลด ความซ้ำซ้อนของข้อมูลและทำให้ข้อมูลมีความสอดคล้องกัน
มากที่สุด
FACULTY OF INFORMATION TECHNOLOGY, KMITL
20

<!-- page 21 -->
## [p.21]

Architectures for DBMSs 
(implementation)

<!-- page 22 -->
## [p.22]

GUI
Procedure
SQL
DBMS
      OS file Manager
1
2
3
4
5
6
7
1. Presentation Services
-  คือ Hardware เช่น screen, keyboard, mounse ฯลฯ 
-  เป็น I/O
2. Presentation Logic
เป็นโปรแกรมที่จัดการ user interface
เป็น software ที่คอยตอบสนอง กิจกรรมของการ click mouse, กด keyboard
3. Application Logic
เป็นพวกกฎกติกา procedure ต่างๆ เรียกว่า Application Logic หรือ Business Logic
พวก if then, do whie, คำนวณต่างๆ
4. Database Logic
คือส่วนที่เป็นคำสั่งติดต่อกับฐานข้อมูล
ปัจจุบันเป็นส่วนที่เป็นคำสั่ง SQL ซึ่งเราใช้แทนคำสั่ง Read, คำสั่ง Write
5. Data Management
-  ส่วนนี้จะวิ่งอยู่บน OS อีกชั้นหนึ่ง
6. File Services
-  เป็นส่วนของ OS
7. Physical Databasess
-  คือ ตัว disk ที่เก็บ physical data 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
22

<!-- page 23 -->
## [p.23]

6.5.1 Centralized DBMS Architecture
• Centralized DBMS Architecture
•แนวโน้มสถาปัตยกรรมสำหรับDBMS มีลักษณะเหมือนกันกับ คอมพิวเตอร์ทั่วไป คือ  แต่
ก่อนนี้ สถาปัตยกรรมจะใช้คอมพิวเตอร์ เมนเฟรมเป็นส่วนประมวลผลที่ส่วนกลางสำหรับฟั
งก์ชันของระบบ ทั้งหมด รวมถึงแอพพลิเคชันของผู้ใช้งานและส่วนประสานงานผู้ใช้ ผู้ใช้งาน
จะใช้งานผ่านคอมพิวเตอร์เทอร์มิเนลซึ่งไม่มีหน่วยประมวลผล เรียกสถาปัตยกรรมนี้ว่า 
“Centralized DBMS” (แบบรวมศูนย์) แม้ต่อมาเมื่ออุปกรณ์คอมพิวเตอร์มีราคาถูกลง มีการ
ใช้เวิร์คส เตชันและเครื่องคอมพิวเตอร์ส่วนบุคคล (เครื่องพีซี) แทนเทอร์มิเนลในช่วงแรกๆ ก็
ยังมีลักษณะของสถาปัตยกรรมดังกล่าว
FACULTY OF INFORMATION TECHNOLOGY, KMITL
23

<!-- page 24 -->
## [p.24]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
24
Display monitor
Display monitor
Display monitor
Application 
Programs
Tex editors
Terminal 
display control
DBMS
Compilers
Controller
Controller
Controller
Memory
I/O devices
Disk
CPU
SOFTWARE
HARDWARE/FIRMWARE
...
...
...
...
...
OPERATING SYSTEM
Terminals
6.4.2 Centralized DBMS Architecture 
(cont.)

<!-- page 25 -->
## [p.25]

DBMS
OS File Manager
1
2
3
4
5
6
7
•ข้อดี
•SQL กับ result ส่วนของ application program กับ 
DBMS ติดต่อถึงกันอยู่ใน main memory เครื่องเดียวกัน 
ทำให้ Interprocess Communication ระหว่าง DBMS 
และ Application ดีที่สุดที่เป็นไปได้ เพราะทำงานภายใน 
main memory ของเครื่อง host เดียวกัน เช่น Browser 
ติดต่อกับฐานข้อมูลที่ server เรียกว่า Enterprise Server, 
Application Server
• Traffic ระหว่าง I / O terminal กับ host ต่ำ
•Maintain ง่าย เพราะว่า application อยู่ที่ host มีปัญหา
อะไรก็แก้ที่ host
6.5.1 Centralized DBMS Architecture 
(cont.)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
25

<!-- page 26 -->
## [p.26]

•ข้อเสีย
•ถ้า H/W Host ความสามารถตํ่า performance จะ
ไม่ดี
•User Interface ไม่ส่วย(แต่ใช้งานดีนะ)
•ถ้า screen เป็น GUI keyboard จะไม่ user 
friendly เป็นภาระให้ host keep track ทุก cursor 
movement (ข้อนี้พวก keyboard เวลา key มีการ 
map keyboard ฯลฯ
•เป็นระบบค่อนข้างปิด ถ้าเป็น proprietary system 
ต้องการ user training เฉพาะเครื่องไม่มีโอกาสทำ end 
user computing คือ user เขียนโปรแกรมเองไม่ได้
•ราคาสูง
DBMS
OS File Manager
1
2
3
4
5
6
7
6.5.1 Centralized DBMS Architecture 
(cont.)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
26

<!-- page 27 -->
## [p.27]

Resource Sharing LAN
1
2
5
6
7
1 read
1 record
Print Server
•ข้อดี
•ในแต่ละ workstation ใช้ Pc-based application ก็ได้
•ได้ GUI ที่สวย และ keyboard ก็ user friendly
•ราคาถูก
• End user computing ได้สบาย เพราะโปรแกรมมีอยู่มาก ใช้งานง่าย เขียน
โปรแกรมง่าย
FACULTY OF INFORMATION TECHNOLOGY, KMITL
27

<!-- page 28 -->
## [p.28]

•ข้อเสีย
•Data Management ไม่เก่ง เพราะ (หมายเลข 6 กับ 7)  Disk ตัว xxxxx จะอยู่ไกลออกไป แต่ว่า control การ 
search และการ sort มาจาก font end (workstation) และการทำconcurrency control ทำจาก 
workstation เหมือนกัน คือต้อง lock มาจาก workstation เพราะฉะนั้นมันจึงไม่เก่ง
•Traffic ใน network ขึ้นกับขนาดของ data ( 1 read 1 record)
•ถ้า high volume จึงต้องการ media high speed จึงไม่เหมาะกับระบบ WAN
•ขนาดของโปรแกรมติดที่ความสามารถของ PC ไม่ใช่ว่าโปรแกรมใดๆ จะมาลงที่ PC ก็ได้ถ้า PC ไม่ดี
Resource Sharing LAN
FACULTY OF INFORMATION TECHNOLOGY, KMITL
28

<!-- page 29 -->
## [p.29]

SQL-base Client/Server
(1st Generation Client/Server) 
•ข้อดี
•Data Management ดีขึ้นมาก ตามความสามรถของ DBMS 
•Develop Application ง่าย เพราะว่ายกภาระเรื่อง system ให้ DBMS จัดการ (เช่น concurrency control, recovery control)  ทาง
ฝ่าย application เพียงแต่ส่ง SQL Statement ไปยัง Database Server
•ประหยัดค่าใช้จ่าย ไม่ต้องมี Development Machine คือ พัฒนางานบน PC เวลาเขียนโปรแกรมไม่ต้องใช้เครื่องอื่นพัฒนา จะทำให้
ประหยัดไม่ต้องซื้อเครื่องเพิ่ม
•เป็น open system WS กับ DB Server ติดต่อกัน โดยคำสั่ง SQL โดยผ่านทาง ODBC Driver โปรแกรมนี้ WS อาจจะเป็นผลิตภัณฑ์
ต่างจาก Database (DBMS)
•End user computing หมายเลข 6 คือ PC base application
•ราคาไม่แพงมาก เมื่อเทียบกับพวกแบบที่ 1 
1
2
4
7
SQL
Result
DBMS
OS File Manager
5
6
ODBC 
Driver
Work Station
Database 
Server
FACULTY OF INFORMATION TECHNOLOGY, KMITL
29

<!-- page 30 -->
## [p.30]

•ข้อเสีย
•Maintenance ยาก เนื่องจาก program ต้องติดตั้งอยู่บน WS มีปัญหาต้องตามไป maintain ทุก workstation 
เลย
•Stored Procedure เอา application logic บางส่วน กับ database logic บางส่วนไว้ที่ server
•Application development tool เป็น object-oriented programming language ออกแบบยาก ใช้วิธี 
structure programming module ไม่ได้ 
•Tool ไม่มีมาตรฐาน maintain ยาก
•Traffic ใน network ยังถือว่าสูงเมื่อเทียบกับบาง  architecture 
SQL-base Client/Server
(2nd Generation Client/Server) 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
30

<!-- page 31 -->
## [p.31]

Message-base Client/Server
•ข้อดี
•Maintenance ง่ายขึ้น ทำได้ที่ฝั่ง host ได้
•Traffic น้อย เพราะส่ง parameter ผ่าน function call
•โปรแกรมที่ฝั่ง server ต้องเป็น integrity rule ที่อ้างข้อมูลบน database ส่วนฝั่ง client จะเป็น 
user interface ก็จะมี integrity จะเป็นเฉพาะ integrity rule ที่ไม่อ้าง DB จะ fix ไว้เลย เช่น 
ข้อมูลอายุคน ช่วงนั้นช่วงนี้ จะ check ที่ font-end แต่ทำแบบนี้เวลาแก้ไขต้องเสียค่า 
maintenance บางคนยอมเอา integrity rule ทั้งหมดไว้ที่ xxxx  (response time กับ 
maintenance จะสวนทางกัน)
•เนื่องจาก traffic น้อยเหมาะกับการใช้ในระบบ WAN 
ใส่ Stored Procedure 
กับ application logic บางส่วน และ 
database logic บางส่วนไว้ที่ server
1
2
3
4
5 6
7
4
FACULTY OF INFORMATION TECHNOLOGY, KMITL
31

<!-- page 32 -->
## [p.32]

•ข้อเสีย
•แบบนี้การจะเรียก stored procedure อาจต้องทำ product front-end ที่กำหนด เพราะฉะนั้นมักไม่ open
•H/W Server ต้องมีขีดความสามารถที่สูง user จะถึง limit เร็วขึ้น เรียกว่า Thin Client Fat Server ปัจจุบัน
ไม่เรียกแล้วถ้าใช้ feature อย่างนี้ต้องผูกติดกับ product เพราะต้องใช้ stored procedure ของแต่ละ 
product กับ font end ของแต่ละ product ใช้ภาษา (java,Visual .Net , etc..)
Message-base Client/Server
FACULTY OF INFORMATION TECHNOLOGY, KMITL
32

<!-- page 33 -->
## [p.33]

6.5.2 Client/Server Architecture
• Client/Server Architecture
•สถาปัตยกรรมแบบแม่ข่าย-ลูกข่าย(Client/Server) ถูกพัฒนาขึ้นเพื่อจัดการกับสภาวะแวดล้อมที่
มี เครื่องพีซี เวิร์คสเตชัน เครื่องแม่ข่ายให้บริการแฟ้มข้อมูลเครื่องพิมพ์ เครื่องแม่ข่ายให้บริการ
ฐานข้อมูลเว็บเซิรฟเวอร์ และอุปกรณ์เชื่อมต่ออื่นๆ ผ่านเครือข่ายโดยเครื่องแม่ข่าย(Server) 
จะเป็นเครื่องที่มีฟังก์ชันเฉพาะต่างๆเช่น ไฟล์เซิรฟเวอร์ ที่ให้บริการแฟ้มข้อมูลพริ้นเตอร์เซิรฟ
เวอร์ ที่ให้บริการเครื่องพิมพ์ เว็บเซิรฟเวอร์หรืออีเมลเซิรฟเวอร์ เป็นต้น ในลักษณะดังกล่าวเครื่อง
ลูกข่าย(Client) จะสามารถเข้าถึงทรัพยากร (ไม่มีในเครื่องลูกข่าย) ที่ ให้บริการในส่วนของเครื่อง
แม่ข่าย
FACULTY OF INFORMATION TECHNOLOGY, KMITL
33

<!-- page 34 -->
## [p.34]

Application Architectures
• Two-tier architecture:  E.g. client 
programs using ODBC/JDBC to 
communicate with a database
• Three-tier architecture: E.g. 
web-based applications, and 
  applications built using 
“middleware”
FACULTY OF INFORMATION TECHNOLOGY, KMITL
34

<!-- page 35 -->
## [p.35]

6.5.2.1 Two-Tier Client/Server 
Architecture
• Two-Tier Client/Server Architecture
•สถาปัตยกรรมระบบฐานข้อมูลแบบแม่ข่าย-ลูกข่ายจึงเป็นระบบที่ โปรแกรมส่วนต่อป
ระสานผู้ใช้ (GUI) และโปรแกรมประยุกต์ จะอยู่บน เครื่องฝั่งลูกข่าย(client side) 
เมื่อต้องการเข้าถึง DBMS โปรแกรม บนเครื่องลูกข่ายจะติดต่อสื่อสารกับ DBMS ที่อยู่
บนเครื่องฝั่งแม่ข่าย(server side) โดยใช้โปรแกรมอินเทอร์เฟส(application 
programming interface; API) มาตรฐาน ODBC (Open Database Connectivity) 
หรือสำหรับโปรแกรมภาษาจาวา ก็จะใช้มาตรฐาน JDBC
FACULTY OF INFORMATION TECHNOLOGY, KMITL
35

<!-- page 36 -->
## [p.36]

Thin Client/Fat Server
•ข้อดี
• program มีขนาดใหญ่เกินกว่า PC ได้ แต่สามารถวิ่ง
ที่ host ซึ่งมีขีดความสามารถสูง
• user interface สวยเป็น GUI
•ตัวอย่าง คล้ายๆ กับ NC (browser สำเร็จรูป) ส่วน
ฝั่ง server จะเป็น Database Server concept ของ
พวกนี้อุปกรณ์ปลายทางจะไม่ complicate ซับซ้อน
มากนัก  จะเป็นอุปกรณ์ basic คล้ายๆ กับเป็น
เครื่องรับอย่างเดียว เช่น โทรศัพท์, โทรทัศน์ ที่ไม่ต้องมี
การ upgrade ที่เครื่องรับ แต่ถ้ามีการ upgrade ก็ให้ 
upgrade ที่ server
1
2
3
4
5
6
7
(Unix) Multitasking
X window
(X Server)
X client
FACULTY OF INFORMATION TECHNOLOGY, KMITL
36

<!-- page 37 -->
## [p.37]

•ข้อเสีย
• ในกรณี terminal หรือ unix-base WS ราคาจะสูง
• ต้องการ network พิเศษ เช่น ATM ราคาจะแพง
• ใช้งานเป็น PC ไม่ได้หรือได้ยาก
• กรณีที่ WS เป็น PC ก็สามารถใช้ PC application ได้
Thin Client/Fat Server
FACULTY OF INFORMATION TECHNOLOGY, KMITL
37

<!-- page 38 -->
## [p.38]

6.5.2.2 Three-Tier and n-Tier 
Architecture for Web Applications 
• Three-Tier and n-Tier Architecture for Web Applications 
•การเกิดขึ้นของเว็บและเว็บแอพพลิเคชันได้เปลี่ยนบทบาทของเครื่องแม่ขาย-ลูกข่ายนำไปสู่
สถาปัตยกรรมแบบสามระดับคือเพิ่มขั้นระดับกลาง(ซึ่งเรียกว่าmiddle tier)  ระหว่างเครื่องแม่
ข่ายและเครื่องลูกข่ายซึ่งอาจจะเป็นแอพพลิเคชันเซิร์ฟเวอร์หรือเว็บเซิรฟเวอร์
ทำหน้าที่
เก็บข้อกำหนดทางธุรกิจ(business rules) ที่เซิรฟเวอร์ฐานข้อมูลจะใช้สำหรับการเข้าถึงข้อมูล
เครื่องแม่ข่ายจะรับคำร้องขอใช้บริการจากเครื่องลูกข่ายทำการประมวลผลคำร้องนั้นและส่งคำสั่ง
ไปยังเซิรฟเวอร์ฐานข้อมูล
• มีความปลอดภัยมากขึ้น
FACULTY OF INFORMATION TECHNOLOGY, KMITL
38

<!-- page 39 -->
## [p.39]

• User interface
• Application rules
• Middle tier
• Application server/Web server
• Data access
GUI Web 
Interface
Database 
Management 
System
Application 
Programs, Web 
Pages
Client
Application 
Server or Web 
Server
Database Server
6.5.2.2 Three-Tier and n-Tier 
Architecture for Web Applications (cont.) 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
39

<!-- page 40 -->
## [p.40]

Result
1
2
3
4
5
6
3
4
5
6
7
7
Server SQL
6.5.2.2 Three-Tier and n-Tier 
Architecture for Web Applications(cont.) 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
40

<!-- page 41 -->
## [p.41]

•ข้อดี
•Open System Application ต่อกับ DB Server ได้หลายชุด
•Application Server ก็มีได้หลายชุด ถ้าเพิ่มปริมาณ user สามารถเพิ่ม application server ได้ จาก
การที่ในแบบที่ 5 เวลาจะเพิ่ม user จะต้องมีการ upgrade DBMS Server License ทำให้เสียค่าใช้จ่าย
แพง ถ้าเป็นแบบที่ 6 เวลาเพิ่ม user เพิ่ม application server ซึ่งจะถูกกว่าการเพิ่ม DBMS User 
License
•Reliability จะสูง “No single point of failure” คือ จากการที่ต่อ application ได้หลายชุด และ 
DBMS ได้หลายชุด ทำให้เวลา application server ไหน down อีก server หนึ่งทำงานแทนได้
•Web-base application บน WS
6.5.2.2 Three-Tier and n-Tier 
Architecture for Web Applications(cont.) 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
41

<!-- page 42 -->
## [p.42]

•ข้อเสีย
•Reliability ขึ้นกับ network และ performance ขึ้นกับ network
•ราคาสูง (รวม cost network)
•complex technology คือต้องการ vendor ที่มีความสามารถในการ support สูง
6.5.2.2 Three-Tier and n-Tier 
Architecture for Web Applications(cont.) 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
42

<!-- page 43 -->
## [p.43]

Oracle Architectural 
Component

<!-- page 44 -->
## [p.44]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
44

<!-- page 45 -->
## [p.45]

Oracle server
•เป็นฐานข้อมูลเพื่อใช้สำหรับการรวบรวมข้อมูลตามกระบวนการ
จัดการฐานข้อมูล
•ประกอบด้วย 
•Oracle Instance
•Oracle Database
FACULTY OF INFORMATION TECHNOLOGY, KMITL
45

<!-- page 46 -->
## [p.46]

Oracle Instance
•ตัวกลางสำหรับติดต่อระหว่าง Oracle Database กับผู้ใช้
•การทำงานของฐานข้อมูลมี 1 instance ต่อ 1 ฐานข้อมูล 
•ประกอบด้วยหน่วยความจำและโครงสร้างของ background process
FACULTY OF INFORMATION TECHNOLOGY, KMITL
46

<!-- page 47 -->
## [p.47]

การติดต่อและสร้าง session
•เมื่อผู้ใช้ล็อกอินเพื่อใช้งานฐานข้อมูลผ่านทางแอฟพลิเคชั่นหรือเครื่องมือของ Oracle นั้นเปรียบเสมือนเป็น User Process 
เพื่อส่งคำสั่งหรือรอรับผลลัพธ์จากฐานข้อมูล
•เมื่อผู้ใช้ล็อกอินด้วยบัญชีผู้ใช้และรหัสผ่านถูกต้อง Oracle จะสร้าง Server Process เพื่อรอรับคำสั่งจาก User Process 
และนำคำสั่งเหล่านั้นมาประมวลผลพร้อมกลับส่งผลลัพธ์ให้กับผู้ใช้ ซึ่งการทำงานจะทำรวมกับ Oracle Instance และ Oracle 
Database
FACULTY OF INFORMATION TECHNOLOGY, KMITL
47

<!-- page 48 -->
## [p.48]

Oracle Database
•ข้อมูลของฐานข้อมูลที่จัดเก็บไว้ในไฟล์ระบบปฏิบัติการ ซึ่งเป็นข้อมูลจริงที่ผู้ใช้ป้อนเข้าไปและข้อมูลที่
ระบบจัดการฐานข้อมูลสร้างขึ้น เช่น โครงสร้างข้อมูล รายละเอียดผู้ใช้ สิทธิการใช้งานฐานข้อมูล เป็นต้น
•ประกอบด้วยไฟล์ 3 ลักษณะ คือ Data files, Control files, Redo log files
FACULTY OF INFORMATION TECHNOLOGY, KMITL
48

<!-- page 49 -->
## [p.49]

Oracle Database
•Mandatory files
•Data files
•Control files
•Redo log files
•Parameter files
•Optional files
•Password file
•Archive log file
FACULTY OF INFORMATION TECHNOLOGY, KMITL
49

<!-- page 50 -->
## [p.50]

Oracle Database
•Data files เก็บมุมมองที่เป็น logical view เช่น user , view, table , index, sequence  
เป็นต้น (oracle tools)
•Logical view เก็บรายละเอียดของชื่อไฟล์ เช่น control file, datafile, redo log files 
พร้อมกับสถานที่เก็บไฟล์ (locations) และเก็บชื่อ database เก็บรายละเอียดของการเข้า
จังหวะกันของ database files 
•Control files เก็บมุมมองที่เป็น Physical view 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
50

<!-- page 51 -->
## [p.51]

Oracle Database
•Redo log file เก็บ redo log entry
•Parameter file เป็นไฟล์ที่ใช้ในการเปิดฐานข้อมูล เก็บขนาดของ SGA
•Password file เก็บรายละเอียดของ sys เก็บจำนวนของ database user ที่ต้องการ grant สิทธิ์ ที่
เรียกว่า sysdba และ sysoper 
•Archive log file มีก็ต่อเมื่อ Database อยู่ในโหมดที่เรียกกว่า Archive log mode โดย default 
ฐานข้อมูลมีค่าเป็น no archive log mode  
•Archive log file เก็บเหมือน redo log file 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
51

<!-- page 52 -->
## [p.52]

โครงสร้างทางกายภาพ
•ทางกายภาพ oracle เป็นข้อมูล 3 files 
•Data files คือ ไฟล์สำหรับเก็บข้อมูลที่ใช้ในฐานข้อมูล โดยไฟล์ข้อมูลที่ถูกสร้างขึ้นจะมี
ความสัมพันธ์กับเทเบิลสเปซ
•Control files คือ ไฟล์สำหรับเก็บข้อมูลที่ต้องใช้สำหรับดูแลและตรวจสอบความ
ถูกต้องของฐานข้อมูล เช่น ชื่อฐานข้อมูล เวลาที่สร้างฐานข้อมูล ชื่อและไดเร็กทรอรีของ 
data files และ redo log files
•Redo Log files คือ ไฟล์สำหรับบันทึกรายการการเปลี่ยนแปลงที่เกิดขึ้นกับข้อมูล โดย
ทุกฐานข้อมูลมีไฟล์ redo log 2 กรุ๊ปแต่ละกรุ๊ปต้องมีอย่างน้อย 2 ไฟล์
FACULTY OF INFORMATION TECHNOLOGY, KMITL
52

<!-- page 53 -->
## [p.53]

โครงสร้างหน่วยความจำ
•ออราเคิลแบ่งหน่วยความจำออกเป็น 2 ส่วน ดังนี้
•System Global Area (SGA) ถูกจัดสรรขึ้นขณะที่สร้าง oracle instance และเป็น
ส่วนประกอบพื้นฐานที่โปรเซสของ oracle instance ใช้งานร่วมกัน ซึ่งสามารถเรียกอีกแบบ
หนึ่งว่า “Share Global Area”
•Program Global Area (PGA) ถูกจัดสรรขึ้นขณะที่เซิร์ฟเวอร์โปรเซสถูกเริ่มใช้งาน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
53

<!-- page 54 -->
## [p.54]

System Global Area
•SGA มีโครงสร้างประกอบกันดังนี้
•Shared Pool
•Database Buffer Cache
•Redo Log Buffer 
•โครงสร้างอื่น ๆ  เช่น lock , statistical data เป็นต้น
•โครงสร้างของหน่วยความจำที่สามารถจัดเพิ่มเติมใน SGA มีดังนี้
•Java Pool   (optional – กำหนดพารามิเตอร์ JAVA_POOL_SIZE = 0 )
•Large Pool  (optional – กำหนดพารามิเตอร์ LARGE_POOL_SIZE = 0)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
54

<!-- page 55 -->
## [p.55]

•มีลักษณะ Dynamic
•สามารถขยายได้ โดยใช้พารามิเตอร์ SGA_MAX_SIZE
•การจัดสรรและการขยายในส่วนของ SGA
•สามารถจัดสรรหน่วยความเสมือนได้อย่างต่อเนื่อง
•ขนาดของ SGA มีขนาดไม่เกิน SGA_MAX_SIZE ที่กำหนดไว้ตั้งแต่ต้น
System Global Area
1. SQL> show parameter SGA_MAX 
2. SQL> Select value from V$parameter where name = ‘sga_max_size’;
FACULTY OF INFORMATION TECHNOLOGY, KMITL
55

<!-- page 56 -->
## [p.56]

Shared Pool
•ทำหน้าที่
•เก็บคำสั่ง SQL ที่ประมวลผลแล้ว
•เก็บข้อมูลที่ถูกแสดงผลล่าสุด
•ภายใน Shared Pool แบ่งหน่วยความจำออกเป็น
•Library Cache
•Data Dictionary Cache
•พารามิเตอร์ที่เกี่ยวข้อง
•SHARED_POOL_SIZE
FACULTY OF INFORMATION TECHNOLOGY, KMITL
56

<!-- page 57 -->
## [p.57]

Library Cache
•เก็บ SQL และ PL/SQL ที่ถูกส่งเข้ามาใน DB ตั้งแต่เปิดจนถึงปัจจุบันและเป็นคำสั่งถูกประมวลผลเท่านั้น 
•สามารถนำคำสั่งที่เคยประมวลผลไปใช้ร่วมกับผู้ใช้อื่น ๆ ได้ (เก็บคำสั่งเหมือนกัน เช่น select * from 
employee เป็นต้น )
•คอยจัดการหน่วยความจำของคำสั่งโดยใช้อัลกอริทึมแบบ LRU (Least recently used)
•ภายใน Library Cache แบ่งเป็น
•Share SQL area
•Share PL/SQL area
•ขนาดของ Library Cache ขึ้นอยู่กับขนาดของ Share Pool 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
57

<!-- page 58 -->
## [p.58]

Data Dictionary Cache
• กลุ่มของฐานข้อมูลที่ถูกนำไปใช้หรือเรียกใช้จากผู้ใช้ (โครงสร้างของฐานข้อมูล)
• ประกอบด้วย database files, tables, indexes, columns, user, privileges และ database objects 
อื่น ๆ 
• ระหว่างการประมวลผลคำสั่ง server process จะทำการตรวจสอบชื่อของอ๊อบเจ็คและสิทธิ์การเข้าถึงใน 
data dictionary
• หน่วยความจำของ data dictionary จะมีผลกับผลลัพธ์ที่แสดงกับมายังผู้ใช้ เมื่อมีการส่งคิวรี และ DML
• ขนาดของ Data Dictionary ขึ้นอยู่กับ Shared Pool
FACULTY OF INFORMATION TECHNOLOGY, KMITL
58

<!-- page 59 -->
## [p.59]

Database Buffer Cache
•เก็บข้อมูล (data) ที่อ่านมาจากตารางใน datafiles เช่น select operation เป็นต้น
•เก็บค่าเก่า ค่าใหม่ ของข้อมูลระหว่างประมวลผลทรานสเซ็กชั่นเช่น insert, update , delete เป็นต้น 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
59

<!-- page 60 -->
## [p.60]

Database Buffer Cache
• Oracle แบ่งเนื้อที่ในบัฟเฟอร์แคชออกเป็น 3 ประเภท
• Keep คือ บล็อกข้อมูลที่เก็บในเนื้อที่นี้ยังคงค้างอยู่ในหน่วยความจำในส่วนของบัฟเฟอร์แคชหลังจากการใช้งาน กำหนด
ด้วย DB_KEEP_CACHE_SIZE
• Recycle คือ บล็อกข้อมูลที่เก็บในเนื้อที่นี้ถูกนำมาใช้ใหม่ทั้นทีที่ไม่ถูกใช้งาน กำหนดด้วย DB_RECYCLE_CACHE_SIZE
• Default คือ บล็อกข้อมูลที่กำหนดค่าเริ่มต้นเป็น Default โดยใช้อัลกอริทึม LRU ในการควบคุม การนำบล็อกข้อมูล
กลับมาใช้งานใหม่
• สามารถกำหนดขนาดของบัฟเฟอร์แคชได้ใหม่โดยส่งคำสั่ง
ALTER SYSTEM SET DB_CACHE_SIZE = < ขนาดของเนี้อที่บัฟเฟอร์แคช >
FACULTY OF INFORMATION TECHNOLOGY, KMITL
60

<!-- page 61 -->
## [p.61]

การปรับเปลี่ยนขนาดของบัฟเฟอร์แคชสามาถเปลี่ยนได้แต่ต้องไม่มากกว่า SGA_MAX_SIZE  เช่น 
ต้องการเปลี่ยนขนาดของบัฟเฟอร์แคชเท่ากับ 96M ต้องพิจารณาค่าพารามิเตอร์ของ SGA ด้วย
การเลือกขนาดของบัฟเฟอร์แคชที่เหมาะสม สามารถรวบรวมจากสถิตการใช้งานได้ โดยวิวจาก 
V$DB_CACHE_ADVICE 
การกำหนดบัฟเฟอร์แคชเพื่อหาเนื้อที่ที่เหมาะสมต้องปรับเปลี่ยนพารามิเตอร์ 
DB_CACHE_ADVICE [OFF|ON|READY] 
Database Buffer Cache
DB_BLOCK_SIZE = 2k  ไม่สามารถเปลี่ยขนาดได้
FACULTY OF INFORMATION TECHNOLOGY, KMITL
61

<!-- page 62 -->
## [p.62]

Redo log Buffer
•เก็บการเปลี่ยนแปลงทั้งหมดในฐานข้อมูล redo log entry 
•ค่าเก่า (old value )
•ค่าใหม่ (new value )
•คำสั่ง instruction 
•วันเวลา Timestamp
•รหัสของผู้ใช้ ( user id )
•สามารถเปลี่ยนขนาดโดยผ่านพารามิเตอร์
LOG_BUFFER ถ้าเปลี่ยนค่าของพารามิเตอร์ไฟล์ ต้อง shutdown database 
และค่าต้องไม่เกิน SGA_MAX_SIZE
FACULTY OF INFORMATION TECHNOLOGY, KMITL
62

<!-- page 63 -->
## [p.63]

Large Pool (optional)
• ถูกใช้เมื่อฐานข้อมูลถูกกำหนดเป็น Share sever configuration (multi-threaded server configuration ver8)
• ถ้าฐานข้อมูลถูกกำหนดเป็น Recovery Manager (RMAN)
• สามารถเปลี่ยนพารามิเตอร์ LARGE_POOL_SIZE
Database Configuration
1.
Dedicated server configuration  - 1 user process : 1 sever process (default)
2.
Shared server configuration      - 1 user process > 1 dispatcher 
วิธีการดู database server
 
  SQL> select * from V$dispatcher;  => NO Rows   =  1
FACULTY OF INFORMATION TECHNOLOGY, KMITL
63

<!-- page 64 -->
## [p.64]

Java Pool (optional)
• ถ้ามีแอฟพิเคชั่นที่ถูกสร้างโดยภาษาจาวาและนำมาประมวลผลในฐานข้อมูล
• เพื่อเก็บ Java command , java variable, class files etc….
• กำหนดขนาดผ่านพารามิเตอร์ JAVA_POOL_SIZE
FACULTY OF INFORMATION TECHNOLOGY, KMITL
64

<!-- page 65 -->
## [p.65]

Program Global Area
• PGA อยู่ในฝั่ง server process และไม่ใช่ share memory 
• ถูกสร้างขึ้นเมื่อมีการติดต่อกับ oracle sever แบบ 1 ต่อ 1
• ถูกลบทิ้งเมื่อเลิกติดต่อกับ oracle server
• เก็บรายละเอียดของ user process ที่ server process จับคู่
•User id
•User process
•Server process
•Oracle server
FACULTY OF INFORMATION TECHNOLOGY, KMITL
65

<!-- page 66 -->
## [p.66]

Process Structure
•การทำงานของโปรเซสแต่ละประเภท
•User process ทำงานเมื่อ database user ต้องการติดตอ่กับ oracle server
•Server process ทำการติดต่อกับ oracle instance เพื่อ user ทำการติดต่อเมื่อเริ่มการใช้
งาน database
•Background process ทำงานเมื่อ oracle instance เริ่มทำงาน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
66

<!-- page 67 -->
## [p.67]

User process
• ทำงานเมื่อโปรแกรมต้องการติดต่อกับ Oracle server
• ทำการติดกับ oracle server เพียงครั้งเดียว
• ไม่ทำการติดต่อโดยตรงกับ Oracle server แต่ติดต่อผ่าน server process
FACULTY OF INFORMATION TECHNOLOGY, KMITL
67

<!-- page 68 -->
## [p.68]

Server Process
• ทำหน้าที่เสมือนเป็นตัวเชื่อมระหว่าง user process กับ oracle server
• นำผลลัพธ์ที่ประมวลผลเรียบร้อยแล้วจาก oracle serverและส่งให้กับ user process
• 1 server process : 1 user process
FACULTY OF INFORMATION TECHNOLOGY, KMITL
68

<!-- page 69 -->
## [p.69]

Background Process
•ระบบปฏิบัติการ ที่ทำหน้าที่สนับสนุนการทำงานของ SGA ให้สำเร็จลุล่วงไปได้ด้วยดี
•Mandatory Background processes:
•DBWn 
PMON 
 
CKPT
•LGWR 
SMON 
 
•Optional background processes:
•ARcn 
 
LNDN 
 
RECO
•CJQ0 
 
LMON 
 
Snnn
•Dnnn 
 
Pnnn
•LCKn 
 
QMNn
FACULTY OF INFORMATION TECHNOLOGY, KMITL
69

<!-- page 70 -->
## [p.70]

Database Writer (DBWn)
•DBWn คือ การนำข้อมูลที่อยู่ในบัฟเฟอร์เขียนลง Data 
file
•ทำงานเมื่อ
•เกิดการ Checkpoint
•เนื้อที่ของบัฟเฟอร์ถูกใช้ 1/3 ของพื้นที่ทั้งหมด และทำให้เกิด
การ Checkpoint
•ขนาดของบัฟเฟอร์เต็ม
•เมื่อถึงเวลาที่ระบุไว้ในพารามิเตอร์ [ log checkpoint – 
timeout = 1000sec or log checkpoint-interval = 1k ]
•Tablespace [ OFFLINE |Read Only| Truncate| Begin 
Backup]
•เมื่อเกิด log switch 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
70

<!-- page 71 -->
## [p.71]

Log Writer (LGWR)
•LGWR คือ การนำค่าเก่า ค่าใหม่บันทึกลง log 
file
•ทำงานเมื่อ
•Commit
•เนื้อถูกใช้ 1/3 ของพื้นที่
•เมื่อไฟล์มีขนาด 1 MB
•ทำงานทุก 3 วินาที
•ทำงานก่อน DBWn 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
71

<!-- page 72 -->
## [p.72]

Checkpoint (CKPT)
•ทำงานเมื่อ
•เมื่อ LGWR ทำงาน
•ทำหน้าที่ประทับตราที่หัวไฟล์ให้เป็น Oracle 
Database Files ให้เข้าจังหวะกัน
•Data files
•Control files
•Redo log files
FACULTY OF INFORMATION TECHNOLOGY, KMITL
72

<!-- page 73 -->
## [p.73]

System Monitor (SMON)
•SMON ทำหน้าที่กู้คืนข้อมูลให้กับฐานข้อมูลเมื่อ 
Instance Failure
•ทำหน้าที่ดังนี้
•Rolls forward คือ การนำข้อมูลจาก Redo log file มาคืน
ให้กับตารางที่อยู่ใน Data file
•Rolls back คือ การนำข้อมูลจาก Undo Segments 
(Rollback Segments) ที่อยู่ใน Data file มาคืนให้กับตาราง
ใน Data file
FACULTY OF INFORMATION TECHNOLOGY, KMITL
73

<!-- page 74 -->
## [p.74]

Process Monitor (PMON)
•PMON ทำหน้าที่กู้คืนเมื่อ user failure 
(Database not failure) เช่น ออกจากโปรแกรม
แบบผิดปกติ ผู้ดูแลฐานข้อมูลลบโปรเซสเป็นต้น
•ทำหน้าที่ 
•Rolls Back
FACULTY OF INFORMATION TECHNOLOGY, KMITL
74

<!-- page 75 -->
## [p.75]

Archiver(ARCn) optional
•ทำการสำรองข้อมูลจาก redo logs อัตโนมัติเมื่อฐานข้อมูลถูกกำหนดเป็น ARCHIVELOG 
MODE
•ทำการบันทึกข้อมูลทุกเรคอร์ดที่อยู่ในฐานข้อมูลลง Archive Files
FACULTY OF INFORMATION TECHNOLOGY, KMITL
75

<!-- page 76 -->
## [p.76]

Logical Structure
• แบ่งการมองของฐานข้อมูลออกเป็น 2 ลักษณะ คือ Logical และ Physical 
• มุมมองของ Logical พิจารณาตามลำดับชั้น คือ data base , tablespaces, segments, extens and blocks
• มุมของ Physical ประกอบด้วย Data files ซึ่งติดต่อกับ tablespaces , OS Block  ติดต่อกับ blocks
FACULTY OF INFORMATION TECHNOLOGY, KMITL
76

<!-- page 77 -->
## [p.77]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
77
