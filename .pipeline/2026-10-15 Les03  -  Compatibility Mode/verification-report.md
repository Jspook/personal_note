# verification-report: Les03  -  Compatibility Mode.pdf

Verifier: general-purpose subagent, read-only by instruction (agent `course-verifier` ไม่มีใน cloud session นี้ จึงแยกตามขั้นตอน ไม่ใช่การแยกระบบ) Round 1 เท่านั้น

## ผล
ไม่มี High: ตัวเลข/ผลลัพธ์ในตารางทุกหน้าตรงภาพ, เลขหน้าอ้างถูก, เฉลย HW ถูกทุกข้อ (คำนวณซ้ำ RR/YY, TAX_RATE, ROUND/TRUNC), หน้าว่างและหน้าซ้ำตรงตามที่ระบุ, ทิศลูกศร conversion ตรงสไลด์

## Findings และการแก้
| # | Sev | Finding | Action |
| :-: | :-: | :--- | :--- |
| M1 | Med | อธิบาย AM/PM ใน Pitfalls ไม่มีป้าย generated | ย้ายไปเป็น 💡 |
| M2 | Med | เหตุผล 'higgins' ไม่มีป้าย | แยกเป็น 💡 |
| M3 | Med | "SYSDATE ของวันที่ถ่ายภาพ" เป็นการสันนิษฐาน | ปรับเป็น "สไลด์ไม่ระบุ" |
| M4 | Med | ข้อสันนิษฐาน Compatibility Mode ไม่ใช่รูปแบบป้ายมาตรฐาน | ใช้ป้ายมาตรฐาน |
| L1 | Low | แผนภาพ Part 1 / Nesting / Concept Map ไม่มีป้าย, Conditional ถูกรวมใน General | ใส่ป้าย, แก้ node เป็น General [p.45-51] |
| L2 | Low | p.8 ต่างจาก p.7 ที่ตำแหน่ง | ปรับถ้อยคำ |
| L3 | Low | ตาราง p.54 ไม่มีแถว "…" | เพิ่มแถว … |
| L4 | Low | "ตัวแปร SYSDATE" | แก้เป็น "ฟังก์ชัน" |
| L5 | Low | p.5 รวม 2 bullet | แยกเป็น 7 ข้อ |
| L6 | Low | HW A1 ไม่ตอบความต่างเรื่อง arrow | ปรับคำตอบ ไม่เพิ่มเนื้อหาเกินสไลด์ |
| L7/L8 | Low | ลิงก์ wikilink / ชื่อไฟล์ | ตรวจแล้ว ชื่อโน้ตจะเป็น `Les03 Single-Row Functions` ตรงลิงก์ |

Round 2 ไม่ได้ให้ agent ตรวจซ้ำ: ตรวจเองด้วย parser (mermaid 10.9.1 ผ่านทั้ง 6 block), จำนวนคอลัมน์ตาราง, ไม่มี private-use glyph

## ยังไม่ได้ตรวจกับแหล่งภายนอก (Researcher ปิด)
- พฤติกรรม element `AM` ใน TO_CHAR (ติดป้ายใน 💡)
