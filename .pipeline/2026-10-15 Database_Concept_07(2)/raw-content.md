# raw-content (PUA Thai glyphs remapped)

<!-- page 1 -->
## [p.1]

06066300  
Database System 
Concept
CHAPTER 7
INTRODUCTION TO TRANSACTION AND RECOVERY

<!-- page 2 -->
## [p.2]

Learning 
Objective
❖Transaction Management Concepts
❖Recovery Management Concepts
FACULTY OF INFORMATION TECHNOLOGY, KMITL
2

<!-- page 3 -->
## [p.3]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
3
DBMS 
Component 
Modules

<!-- page 4 -->
## [p.4]

แนวคิดรายการเปลี่ยนแปลง
❖ รายการเปลี่ยนแปลง คืออะไร
❖ แฟ้มที่เก็บรายการการเปลี่ยนแปลง
❖ กิจกรรมแต่ละกิจกรรมที่ถูกด าเนินการ
❖ กลุ่มของค าสั่งที่กระท ากับข้อมูล เช่น การเข้าถึงข้อมูล หรือ การปรับปรุงข้อมูล
FACULTY OF INFORMATION TECHNOLOGY, KMITL
4

<!-- page 5 -->
## [p.5]

แนวคิดรายการเปลี่ยนแปลง
begin Transaction
◦insert เด็กเกิดใหม่
◦insert จังหวัด
end Transaction
Sync Points คือจุดเริ่มต้นและสุดท้ายtransaction
FACULTY OF INFORMATION TECHNOLOGY, KMITL
5

<!-- page 6 -->
## [p.6]

Transaction Concept
❖ A transaction is a unit of program execution that accesses and  possibly 
updates various data items.
❖ A transaction must see a consistent database.
❖ During transaction execution the database may be inconsistent.
❖ When the transaction is committed, the database must be consistent.
❖ Two main issues to deal with:
❖ Failures of various kinds, such as hardware failures and system crashes
❖ Concurrent execution of multiple transactions
FACULTY OF INFORMATION TECHNOLOGY, KMITL
6

<!-- page 7 -->
## [p.7]

Example of Fund Transfer
❖ Transaction to transfer $50 from account A to account B:
1. 
read(A)
2. 
A := A – 50
3. 
write(A)
4. 
read(B)
5. 
B := B + 50
6. 
write(B)
❖ Consistency requirement – the sum of A and B is unchanged by the execution of the 
transaction.
❖ Atomicity requirement — if the transaction fails after step 3 and before step 6, the 
system should ensure that its updates are not reflected in the database, else an 
inconsistency will result.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
7

<!-- page 8 -->
## [p.8]

Syncpoint ใน sql environment
❖ Commit  คือ ยืนยันการเปลี่ยนแปลงที่เกิดขึ้นตั้งแต่ Syncpoint ล่าสุดถึงจุด commit 
อาจจะอยู่ใน buffer ไม่ต้องลง disk
❖ Rollback คือยกเลิกการเปลี่ยนแปลงตั้งแต่ rollback ไปจนถึง sync points ล่าสุดจากจุด
ที่ rollback
❖ Set autocommit off ตรงข้ามกับ Set autocommit on แปลว่า DBMS ปฏิบัติค าสั่ง 1 
ค าสั่งเสร็จแล้ว commit อัตโนมัติ ถ้า set autocommit off dbms จะยังไม่ commit จนกว่า
จะมีค าสั่ง commit สมัยก่อน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
8

<!-- page 9 -->
## [p.9]

การท างานของรายการเปลี่ยนแปลง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
9
Program A
Program B
DB Buffer
MAIN MEMORY
DataBase
Program work space    
 area 
                
  -   data    
 
       buffer 
     buffre space 
DBMS    OS

<!-- page 10 -->
## [p.10]

ACID Properties
❖ Atomicity. Either all operations of the transaction are properly reflected in the database or 
none are.
❖ Consistency.  Execution of a transaction in isolation preserves the consistency of the database.
❖ Isolation.  Although multiple transactions may execute concurrently, each transaction must be 
unaware of other concurrently executing transactions.  Intermediate transaction results must be 
hidden from other concurrently executed transactions.  
❖That is, for every pair of transactions Ti and Tj, it appears to Ti that either Tj, finished execution before Ti 
started, or Tj started execution after Ti finished.
❖ Durability.  After a transaction completes successfully, the changes it has made to the database 
persist, even if there are system failures. 
To preserve integrity of data, the database system must ensure:
FACULTY OF INFORMATION TECHNOLOGY, KMITL
10

<!-- page 11 -->
## [p.11]

❖Automicity 
❖
เป็นหน่วยเดียวแบ่งย่อยต่อไปอีกไม่ได้
❖
โอเปอเรชั่นถ้า fail ต้อง fail หมด ถ้า ส าเร็จก็ต้องส าเร็จหมด (DBMS รับผิดชอบ)
❖
เช่น [ ถอน A อย่างเดียวไม่ได้ ถ้า fail ที่ช่วงหลังถอน A ก็ต้อง fail หมด
     ฝาก B ] <- ยังไม่ท าถือว่าไม่ส าเร็จทั้งหมดที่ท ามา
❖Consistency (รักษาความถูกต้อง)
❖
การที่เราวิ่ง transaction ใน isolation คือต้องรักษาข้อมูลให้ถูกต้องตาม integrity rule หรือถ้า   programmer 
ก าหนด scope ของ transaction ให้ถูกต้อง เช่น programmer ไม่ใส่ commit มั่ว (programmer รับผิดชอบ)
คุณสมบัติของรายการเปลี่ยนแปลง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
11

<!-- page 12 -->
## [p.12]

คุณสมบัติของรายการเปลี่ยนแปลง
❖Isolation 
❖ transaction แต่ละตัวที่วิ่งต้องวิ่งเป็นอิสระและไม่เห็นกิจกรรมที่ท าโดย transaction อื่นเลย ตัวอย่าง
❖ มี Ti และ Tj วิ่ง Overlap กันเป็น concurrency จะมี 2 กรณี
❖ Ti ส าเร็จก่อน Tj ค่อยเกิด
❖ Tj เสร็จก่อน Ti ค่อยเกิด
❖Durability 
❖ หลังจากรายการเปลี่ยนท างานเสร็จเรียบร้อย ข้อมูลที่ถูกบันทึกลงฐานข้อมูลต้องอยู่อย่างถาวร ถ้า 
transaction commit เรียบร้อย ไม่ว่าจะเกิดอะไรขึ้น DBMS รับประกันข้อมูลต้องบน disk ถาวร
FACULTY OF INFORMATION TECHNOLOGY, KMITL
12
T1
T2
T3
Serializable 
Concurrent 
Schedule
                  (same result) =  Serial Schedule
T1
T2
T3

<!-- page 13 -->
## [p.13]

Implementation of Atomicity and Durability
The recovery-management component of a database system implements 
the support for atomicity and durability.
E.g. the shadow-database scheme:
◦all updates are made on a shadow copy of the database
◦ db_pointer is made to point to the updated shadow copy  after
◦ the transaction reaches partial commit and 
◦all updated pages have been flushed to disk.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
13

<!-- page 14 -->
## [p.14]

Implementation of Atomicity and Durability (Cont.)
❖db_pointer always points to the current consistent copy of the database.
❖In case transaction fails, old consistent copy pointed to by db_pointer 
can be used, and the shadow copy can be deleted. 
❖The shadow-database scheme:
❖Assumes that only one transaction is active at a time.
❖Assumes disks do not fail
❖Useful for text editors, but 
❖extremely inefficient for large databases (why?)
❖Variant called shadow paging reduces copying of data, but is still not practical for large databases
❖Does not handle concurrent transactions.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
14

<!-- page 15 -->
## [p.15]

Transaction State
❖ Active, the initial state; the transaction stays in this state while it is executing
❖ Partially committed, after the final statement has been executed.
❖ Failed, after the discovery that normal execution can no longer proceed.
❖ Aborted, after the transaction has been rolled back and the database 
restored to its state prior to the start of the transaction.  Two options after it 
has been aborted:
❖restart the transaction – only if no internal logical error
❖kill the transaction
❖ Committed, after successful completion.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
15

<!-- page 16 -->
## [p.16]

สถานะของรายการเปลี่ยนแปลง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
16
Active
Partial 
Commited
Committed
Aborted
Failed
1.         
transaction 
           
    Update, 
Insert, ...
2. transaction 
                Commit
3.            
    
4.    2        Active transaction     
Partial Commited                    
5.     transaction 
rollback

<!-- page 17 -->
## [p.17]

Concurrency Control
❖การควบคุมสภาวะพร้อมกัน
ระบบจัดการฐานข้อมูลแบบผู้ใช้งานหลายคน(multiuser DBMSs) ผู้ใช้งานหลายคนสามารถเข้าถึง
ฐานข้อมูลใน เวลาเดียวกันได้มีการประมวลทรานแซคชันมากกว้าหนึ่งทรานแซคชันในเวลาเดียวกันในลัก
ษณะของอินเทอร้ลิฟวิ่ง(interleaving) คือการสลับกันทำงาน(ภาพSchedule C สลับการทำงาน
ระหว้างทรานแซคชันT1 และT2 โดยเริ่มทำทรานแซคชันT1 ก้อน) จากการที่ซีพียูซึ่งมีความเร็วมากกว้า
อุปกรณ้อินพุท/เอ้าพุท(input/output) จะสวิชไปมาระหว้างทรานแซคชันอินเทอร้ลิฟวิ่งจะช้วยป้องกัน
การประมวลผลที่ต้องใช้เวลานานจากความล้าช้าของทรานแซคชันอื่น
FACULTY OF INFORMATION TECHNOLOGY, KMITL
17

<!-- page 18 -->
## [p.18]

Concurrency Control (Cont.)
ท ำไมต้อง Concurrency Control
การประมวลผลในลักษณะInterleaving processing อาจท าให้เกิดปัญหาขึ้นได้หลายกรณีถ้าไม่มีการ
ควบคุมสภาวะการใช้านพร้อมๆกันปัญหาดังกล่าว
❖The Lost Update Problem
❖The Temporary Update (or Dirty Read or Uncommitted dependency)  Problem 
❖The Incorrect Summary  or Consistency Control  Problem
❖Unrepeatable read
❖Phantom Phenomenon
FACULTY OF INFORMATION TECHNOLOGY, KMITL
18

<!-- page 19 -->
## [p.19]

Concurrency Control (Cont.)
❖ปัญหำกำรสูญเสียกำรแกไข(Lost Update Problem) คือ ปัญหาเกี่ยวกับการปรับปรุงค่าของข้อมูลที่ไม่เป็นไปตามที่ต้องการซึ่ง เกิดจาก
สองทรานแซคชันใช้ข้อมูลเดียวกนพร้อมๆกันใน ฐานข้อมูล
❖ปัญหำกำรอ่ำนค่ำที่ปรับปรุงชั่วครำว(Temporary Update, or Dirty Read Problem or Uncommitted dependency Problem) เกิด
จากทรานแซคชันหนึ่ง(T1) ได้ปรับปรุงข้อมูลX  (เท่าากับX-N ) ในฐานข้อมูลและมีอีกทรานแซคชันหนึ่ง (T2) ได้อ่านข้อมูลX ไปใช้และเวลาถัด
มาทรานแซคชันT1 เกิดล้มเหลว(transaction fail) จึงปรับปรุงข้อมูลX กลับเป็นค่าเริ่มต้น(X) ก่อนท าทรานแซคชันT1(rollback) ดังนั้นจะท า
ให้T2 ใช้ข้อมูลค่าX ที่ปรับปรุงค่าไปแล้ว(X-N) ซึ่งค่าของข้อมูลจะไม่สอดคลองกับค่าX ที่เป็นผลมาจากทรานแซคชันT1 ล้มเหลว
❖ปัญหำควำมไม่ถูกต้องในกำรสรุปรวมข้อมูล(Incorrect Summary Problem or Consistency Control Problem) เกิดจากทรานแซค
ชันหนึ่งมีการหาค่าสรุปรวมของข้อมูล (aggregate summary) หลังจากนั้นมีอีกทรานแซคชันหนึ่งเข้าไปปรับปรุงบางข้อมูลเหล่านั้นก็จะท า
ให้ค่าสรุปรวมของข้อมูลไม่สอดคล้องกับความเป็นจริง
❖อีกปัญหาหนึ่ง ที่อาจเกิดขึ้นคือ การอ่านค่าของข้อมูลชุดเดียวกัน ได้ค่าไม่เหมือนเดิม (unrepeatable read) เกิดขึ้นในกรณีที่มี ทราน
แซคชันหนึ่งไปอ่านข้อมูล X จ านวนสองครั้ง ซึ่งในระหว่างการอ่านครั้งที่หนึ่งและครั้งที่สอง มีอีกทรานแซคชันหนึ่งเข้าไปปรับปรุง ค่า X ท าให้
การอ่านค่า X ทั้งสองครั้งให้ค่าไม่เหมือนกัน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
19

<!-- page 20 -->
## [p.20]

Phantom Phenomenon
 หาก T1 กำลังทำการนับจำนวนบัญชีในตาราง แต่ Application ทำการเพิ่มบัญชี
ใหม่เข้าสู่ตารางทำให้การนับจำนวนบัญชีรวมบัญชีใหม่เข้าไปด้วย ทำให้ผลลัพธ์ที่ได้
ผิดพลาด สิ่งที่ถูกต้องคือต้องไม่นำมาคิดรวมในการนับด้วย
Sum(Account)
Insert (new Account)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
20

<!-- page 21 -->
## [p.21]

Concurrent Executions
Schedule คือ ลำดับการจัดคำสั่งใน Tx ว่าคำสั่งไหนของ Tx ไหนทำก่อน คำสั่งไหนของ Tx ไหน ทำตามหลัง
Concurrent serializable schedule ทำงานร่วมกันในช่วงเวลาเดียวกัน 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
21
T1
T2
T3
T1
T2
T3
               
Serializable Schedule

<!-- page 22 -->
## [p.22]

Schedule 1
ให้ T1 หักเงินจากบัญชี $50 จาก A ไป B
และให้ T2 หักเงินจากบัญชี 10% จากยอด
คงเหลือ โดยหักจาก A ไป B.  
ให้ Tx ทำตามลำดับ โดยให้เริ่มจาก T1 และ 
T2  ตาม  ซึ่งเรียกว่า serial schedule  
Serial Schedule คือค าสั่งของtransaction 
เดียวกันถูกปฏิบัติอย่างต่อเนื่องตั้งแต่ต้นจนจบ
FACULTY OF INFORMATION TECHNOLOGY, KMITL
22

<!-- page 23 -->
## [p.23]

Schedule 2
ให้ Tx ทำตามลำดับ โดยให้เริ่มจาก T2
และ ตาม T1
FACULTY OF INFORMATION TECHNOLOGY, KMITL
23

<!-- page 24 -->
## [p.24]

Schedule 3
ให้ T1 และ T2 ประมวลผล
แยกกันโดยรายการเปลี่ยนแปลง
ไม่ทำตามลำดับแต่ผลลัพธ์ที่ได้มี
ค่าเท่ากับ (equivalent )การ
ทำงานตามลำดับ ซึ่งมีผล
เหมือนกับ Schedule 1  
In Schedules 1, 2 and 3, the sum A + B is preserved.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
24

<!-- page 25 -->
## [p.25]

Conflict Serializability
❖ ค าสั่ง li และ lj ในรายการเปลี่ยนแปลงของ Ti และ Tj ท าการเปลี่ยนแปลงกับ
ข้อมูลชุดเดียวกัน (Data Item) ท าให้ข้อมูลนั้นขัดแย้งกัน (conflict ) ในแต่ละ
รายการเปลี่ยนแปลงควรมีค าสั่งเพื่อเขียนข้อมูลอย่างน้อย 1 ค าสั่ง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
25

<!-- page 26 -->
## [p.26]

Schedule 4
รายการเปลี่ยนในกรณีนี้การท างานที่
ก าหนดให้ T1 และ T2 ประมวลผลพร้อม
กันแต่ผลลัพธ์ที่ได้ไม่เท่ากับ T1 น า T2 
ตาม
FACULTY OF INFORMATION TECHNOLOGY, KMITL
26

<!-- page 27 -->
## [p.27]

li = read(Q), lj = read(Q).   li and lj don’t conflict
li = read(Q),  lj = write(Q).  They conflict.
li = write(Q), lj = read(Q).   They conflict
li = write(Q), lj = write(Q).  They conflict
Conflict Serializability
FACULTY OF INFORMATION TECHNOLOGY, KMITL
27

<!-- page 28 -->
## [p.28]

จากรายการเปลี่ยนแปลง 3 สามารถแปลงไปเป็นรายการเปลี่ยนแปลง 6 
โดยสามารถสลับการท างานกันโดยไม่ขัดแย้งกัน
Schedule 3
Schedule 6
Conflict Serializability
FACULTY OF INFORMATION TECHNOLOGY, KMITL
28

<!-- page 29 -->
## [p.29]

Conflict Serializability (Cont.)
Example of a schedule that is not conflict serializable:
We are unable to swap instructions in the above schedule to obtain either the 
serial schedule < T3, T4 >, or the serial schedule < T4, T3 >.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
29

<!-- page 30 -->
## [p.30]

Let S and S´ be two schedules with the same set of transactions.  S and S´ are view equivalent if 
the following three conditions are met, for each data item Q, 
1.If in schedule S, transaction Ti reads the initial value of Q, then in schedule S’ also transaction Ti must 
read the initial value of Q.
2.If in schedule S transaction Ti executes read(Q), and that value was produced by transaction Tj (if any), 
then in schedule S’ also transaction Ti must read the value of Q that was produced by the same write(Q) 
operation of transaction Tj .
3.The transaction (if any) that performs the final write(Q) operation in schedule S must also perform the 
final write(Q) operation in schedule S’.
As can be seen, view equivalence is also based purely on reads and writes alone.
View Serializability
FACULTY OF INFORMATION TECHNOLOGY, KMITL
30

<!-- page 31 -->
## [p.31]

Other Notions of Serializability
The schedule below produces 
same outcome as the serial 
schedule < T1, T5 >, yet is not 
conflict equivalent or view 
equivalent to it. 
Determining such equivalence 
requires analysis of operations 
other than read and write.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
31

<!-- page 32 -->
## [p.32]

Non-View Serializability
Schedule 1
Schedule 2
FACULTY OF INFORMATION TECHNOLOGY, KMITL
32

<!-- page 33 -->
## [p.33]

Schedule 1
Schedule 3
View Serializability
FACULTY OF INFORMATION TECHNOLOGY, KMITL
33

<!-- page 34 -->
## [p.34]

View Serializability
Schedule 5
Schedule 6
FACULTY OF INFORMATION TECHNOLOGY, KMITL
34

<!-- page 35 -->
## [p.35]

การ write ของ T4 ไม่มี read 
เรียกว่า blind write สำหรับ T6 
write ผลลัพธ์เหมือนกันถูกต้อง
เป็น Serializable แต่ Conflict 
กัน (T3, T4)
View Serializability
FACULTY OF INFORMATION TECHNOLOGY, KMITL
35

<!-- page 36 -->
## [p.36]

Recoverable Schedules
❖Recoverable schedule — if a transaction Tj reads a data item previously written by a 
transaction Ti , then the commit operation of Ti appears before the commit operation of Tj.
❖The following schedule (Schedule 11) is not recoverable if T9 commits immediately after 
the read
❖If T8 should abort, T9 would have read (and possibly shown to the user) an inconsistent 
database state.  Hence, database must ensure that schedules are recoverable.
FACULTY OF INFORMATION TECHNOLOGY, KMITL
36

<!-- page 37 -->
## [p.37]

Cascading Rollbacks
❖Cascading rollback – a single transaction failure leads to a series of transaction rollbacks.  Consider 
the following schedule where none of the transactions has yet committed (so the schedule is 
recoverable)
❖If T10 fails, T11 and T12 must also be rolled back.
❖Can lead to the undoing of a significant amount of work
FACULTY OF INFORMATION TECHNOLOGY, KMITL
37

<!-- page 38 -->
## [p.38]

Cascadeless Schedules
❖ Cascadeless schedules — cascading rollbacks cannot occur; for 
each pair of transactions Ti and Tj such that Tj  reads a data item 
previously written by Ti, the commit operation of Ti appears before 
the read operation of Tj.
❖ Every cascadeless schedule is also recoverable
❖ It is desirable to restrict the schedules to those that are 
cascadeless
FACULTY OF INFORMATION TECHNOLOGY, KMITL
38

<!-- page 39 -->
## [p.39]

Levels of Consistency in SQL-92
❖Serializable — default (รับประกัน conflict หรือ view serializable, cascadeless และไม่เกิด
ปัญหา Phantom Phenomenon)
❖Repeatable read — รับประกันความถูกต้อง ผลลัพธ์เกือบเหมือน serializable ขณะที่มีการแสดงผล
ลัพธ์ทีละหลายแถวหากย้อนกลับไปดูค่าเดิมภายในแถวทำได้ค่าเดิมเสมอ (ไม่รับประกัน phantom 
phenomenon)
❖Read committed — ไม่รับประกันความถูกต้องใด ๆ รับประกันเพียง cascadeless เท่านั้น ผลทำให้
การทำงานเร็วผิดหรือถูกไม่มีใครรู้ บางยี่ห้อเรียกว่า “Cursor Stability”
❖Read uncommitted — ไมรับประกันใด ๆ เลย ซึ่งสามารถอ่านได้ขณะยังไม่ commit
FACULTY OF INFORMATION TECHNOLOGY, KMITL
39

<!-- page 40 -->
## [p.40]

Failure Classification
FACULTY OF INFORMATION TECHNOLOGY, KMITL
42
Transaction fail  คือ การ
ที่ Tx ปฏิบัติงานต่อไปไม่ได้
• Logical error คือ 
error จาก 
application เช่น code 
program ผิดปกติ
• System error เมื่อ 
System software 
(OS, DBMS) เข้าสู่
สถานะผิดปกติ เช่น dead 
lock
System crash  อาจเกิด
จาก SW, HW เช่น
• HW มีปัญหา (ยกเว้น 
disk)
• Bug ของ System 
Software ( เช่น 
DBMS )
Disk failure 
• กรณีที่สามารถกู้คืนระบบได้
นั้นคือกรณีของ 
Transaction fail / 
System crash เท่านั้น

<!-- page 41 -->
## [p.41]

Storage Structure
 Storage Structure
◦ Volatile  = ไฟดับแล้วข้อมูลหาย
◦ Non-Volatile = ไฟดับแล้วข้อมูลไม่หาย
◦ Stable Storage = เป็น storage ที่สมมติว่าไม่มีวันเสียหาย
FACULTY OF INFORMATION TECHNOLOGY, KMITL
43

<!-- page 42 -->
## [p.42]

Database Backup/Recovery Concepts
การสำรองข้อมูลมี 2 ประเภท (ระบบทั่วไป หรือ ระบบฐานข้อมูล)
1.
Volume backup  คือ สำรองข้อมูลทุกประเภทรวมทั้งค่าเก่าและค่าใหม่
- ข้อเสีย คือ ใช้เวลามาก
2.
Incremental backup คือ สำรองเฉพาะสิ่งที่มีการเปลี่ยนแปลง (AIJ)
     - ข้อดีคือ ใช้เวลาน้อยในการสำรองข้อมูล
         ***volume ต่างกับ export  กับ import เพราะใช้เวลานาน และวิธีการทำการสำรอง
ข้อมูลต่างกัน
FACULTY OF INFORMATION TECHNOLOGY, KMITL
44

<!-- page 43 -->
## [p.43]

---
log file
(AIJ)
Archive Logs
Incremental Backup Using Archive Logs
FACULTY OF INFORMATION TECHNOLOGY, KMITL
45

<!-- page 44 -->
## [p.44]

Sun
log
Mon
log
Fri
log
Mon
Log
Archive
SUN
Log
Archive
Fri
Log
Archive
SAT
Vol
SAT
Vol
Backup
…
…
Volume Backup and Incremental Backup
FACULTY OF INFORMATION TECHNOLOGY, KMITL
46

<!-- page 45 -->
## [p.45]

Wed
11:00 am
DB crashed
FACULTY OF INFORMATION TECHNOLOGY, KMITL
47

<!-- page 46 -->
## [p.46]

Tue
Morning
Wed
11:00 am
Wed
Morning
Mon
Morning
2nd
Vol
Backup
SAT
Vol
Backup
Wed
Log upto 
Tue
Log
Archive
Mon
Log
Archive
SUN
Log
Archive
11:00 
am
Rollforward Activity
FACULTY OF INFORMATION TECHNOLOGY, KMITL
48

<!-- page 47 -->
## [p.47]

Recovery Applied
 หาก DBA ท าการ Backup Data ทุกสัปดาห์ และท า Incremental Backup ใน
ทุก ๆ วัน หากระบบล่ม DBA ควรน า Volume Backup มาใช้ร่วมกับ 
Incremental Backup มากู้คืนระบบ วิธีนี้เรียกกว่า “Roll Forward”
FACULTY OF INFORMATION TECHNOLOGY, KMITL
49

<!-- page 48 -->
## [p.48]

Shadow Paging
FACULTY OF INFORMATION TECHNOLOGY, KMITL
50
การท า log-based recovery ต้องใช้เวลาส าหรับการท า recovery มาก โดยไม่สามารถ
มองเห็น logfile ครั้งสุดท้ายได้ทันที จึงต้องใช้วิธีการท า Shadow paging 
Shadow paging ใช้ส าหรับระบบบนเครื่อง PC ซึ่งไม่มี logfile

<!-- page 49 -->
## [p.49]

Shadow Paging
Page 1
Page 1
Old
Update
Page on disk 
current page table 
shadow page table 
FACULTY OF INFORMATION TECHNOLOGY, KMITL
51

<!-- page 50 -->
## [p.50]

Shadow Paging Concept
 เมื่อ Tx เริ่มต้นระบบจะท าการสร้าง current page table ขึ้นมาคู่กับ Shadow paging 
  เมื่อมีการเปลี่ยนแปลง
- ท าการหา page on disk ว่างๆ มาใส่ข้อมูลที่เปลี่ยนแปลง
- current page ชี้อันใหม่แทน
  หาก fail ก็แค่ลบ current page table อันใหม่ทิ้ง เอาอันเก่ามาใช้ได้เลย ซึ่งเรียกว่า 
“instance roll back”
  ถ้า commit 
- save current page table
- ลบของเก่าทิ้ง
FACULTY OF INFORMATION TECHNOLOGY, KMITL
52

<!-- page 51 -->
## [p.51]

Shadow Paging
ข้อเสีย
data fragment เยอะ (ต้องการแทรกอันใหม่ตลอด)
  commit ช้าหน่อย(ต้อง save ลง dbspace จริง)
  ไม่มี log file เอามาท า incremental backup (ทุกครั้งต้อง Volume Backup)
FACULTY OF INFORMATION TECHNOLOGY, KMITL
53

<!-- page 52 -->
## [p.52]

FACULTY OF INFORMATION TECHNOLOGY, KMITL
64
