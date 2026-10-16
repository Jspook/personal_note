# verification-report: Les13_1.pdf

Verifier: general-purpose subagent, read-only by instruction (agent `course-verifier` ไม่มีใน cloud session นี้ จึงแยกตามขั้นตอน ไม่ใช่การแยกระบบ) Round 1 เท่านั้น

## ผล
ไม่มี High/Med: ตาราง p.12 ตรงภาพทีละช่อง (15 √), ไวยากรณ์ SQL ทุกคำสั่งตรงสไลด์, data dictionary views 8 ตัวตรง, แผนภาพ p.9 ตรงภาพ (ไม่มีหัวลูกศร), anomalies ถูกคงและแจ้ง, เฉลย HW ถูกทุกข้อ

## Findings และการแก้ (ทั้งหมด Low)
| # | Finding | Action |
| :-: | :--- | :--- |
| 1 | Pitfalls ป้าย "p.16 / p.19" ผิด typo อยู่ที่ p.19 | แก้เป็น p.19 |
| 2 | แถว "ผู้ให้" อ้าง p.5 อย่างเดียว | เพิ่ม [p.7-8] |
| 3 | แผนภาพ p.4 จัด System/Data security เป็นลูกของ Privileges | เพิ่มคำอธิบายในป้าย generated |
| 4 | HW C2 ถ้อยคำคำถามไม่ตรงคำตอบ | แก้คำถาม |
| 5 | HW E2 ป้าย generated เป็นวงเล็บ ไม่สม่ำเสมอ | ใช้ป้าย blockquote มาตรฐาน |

Round 2 ไม่ได้ให้ agent ตรวจซ้ำ: ตรวจเองด้วย parser (mermaid 10.9.1 ผ่านทั้ง 3 block), จำนวนคอลัมน์ตาราง, ไม่มี private-use glyph (ก่อนแก้; การแก้เป็นข้อความล้วน)

## ยังไม่ได้ตรวจกับแหล่งภายนอก (Researcher ปิด)
- ไม่มีข้อกล่าวอ้างภายนอกสไลด์ที่ต้องตรวจ (ส่วนที่เพิ่มติดป้าย generated ทั้งหมด)
