# HW-Discrete-Math-05: Week13 Euler และ Hamilton

> **วิชา:** Discrete Mathematics | **ที่มาของโจทย์:** `Resources/Books/Discrete Mathematics/DM_Week13.pdf` (25 slides)
> **โน้ตประกอบ:** [[Week13 - Euler Circuits and Paths]], [[Week13 - Hamilton Circuits and Paths]]
> **ป้ายแหล่งที่มา:** `[p.N]` = สไลด์ใน DM_Week13.pdf สไลด์ส่วนใหญ่เป็นโจทย์เปล่าโดยไม่มีเฉลย ผู้เขียนอ่านกราฟจากรูปแล้วคำนวณเฉลย (คำนวณ degree และตรวจ circuit/path จาก edges ที่ผู้เขียนอ่าน อาจอ่านรูปผิดได้) เฉลยของข้อเหล่านั้นและข้อที่เพิ่มเกินสไลด์ติดป้าย `[Source: generated — not verified against original document]` ข้อที่ผู้เขียนคิดโจทย์เองติดป้าย "โจทย์สมมติ"
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/ประยุกต์
> **หมายเหตุ:** p.12 (Mohammed's Scimitars) ไม่ออกโจทย์ เพราะผู้เขียนยังไม่ได้ตรวจรูปทีละจุด ดูหมายเหตุในโน้ต Euler

---

## Section A: Euler circuit และ Euler path ระดับ ⭐

**A1.** นิยาม Euler circuit และ Euler path

<details><summary>เฉลย</summary>

Euler circuit ในกราฟ G คือ simple circuit ที่มีทุก edge ของ G Euler path ใน G คือ simple path ที่มีทุก edge ของ G โดย simple หมายถึงมีแต่ละ edge พอดี 1 ครั้ง [p.7]
</details>

**A2.** เงื่อนไขของ Theorem 1 และ Theorem 2 คืออะไร

<details><summary>เฉลย</summary>

Theorem 1: multigraph ที่ connected และมีจุดยอด ≥ 2 จุด มี Euler circuit ก็ต่อเมื่อทุกจุดยอดมี degree เป็นเลขคู่ [p.10] Theorem 2: multigraph ที่ connected มี Euler path แต่ไม่มี Euler circuit ก็ต่อเมื่อมีจุดยอด degree คี่พอดี 2 จุด [p.13]
</details>

**A3.** (Example 1 [p.8]) กราฟไม่มีทิศ G₁ (a–b, a–e, b–e, c–d, c–e, d–e), G₂ (a–b, a–d, b–c, c–d, a–e, b–e, c–e, d–e), G₃ (a–b, a–c, a–d, b–d, b–e, c–d, d–e) กราฟไหนมี Euler circuit ข้อที่ไม่มีข้อไหนมี Euler path

<details><summary>เฉลย</summary>

* G₁: degree (a, b, c, d, e) = (2, 2, 2, 2, 4) ทุกจุดเป็นเลขคู่ จึงมี Euler circuit เช่น a, b, e, c, d, e, a
* G₂: degree = (3, 3, 3, 3, 4) มีจุดคี่ 4 จุด จึงไม่มีทั้ง circuit และ path
* G₃: degree = (3, 3, 2, 4, 2) มีจุดคี่ 2 จุด (a, b) จึงไม่มี circuit แต่มี Euler path เช่น a, c, d, e, b, d, a, b

(ตาม Theorem 1 และ 2 [p.10, 13]; สไลด์ไม่เฉลย) `[Source: generated — not verified against original document]`
</details>

**A4.** (Example 2 [p.9]) กราฟมีทิศ H₁ (a→b, a→d, d→c, c→b), H₂ (a→g, g→c, c→b, b→g, g→e, e→d, d→f, f→a), H₃ (c→d, d→b, b→c, c→a, a→b) กราฟไหนมี Euler circuit ข้อที่ไม่มีข้อไหนมี Euler path

<details><summary>เฉลย</summary>

ใช้เกณฑ์มาตรฐานของกราฟมีทิศ (ไม่อยู่ในสไลด์): circuit ต้องมี in-degree = out-degree ทุกจุด path ต้องมีจุดหนึ่งที่ out − in = 1 และอีกจุดที่ in − out = 1
* H₁: a มี out 2 in 0 จึงต่างกัน 2 ไม่มีทั้ง circuit และ path
* H₂: ทุกจุด in = out จึงมี Euler circuit a, g, c, b, g, e, d, f, a
* H₃: c มี out 2 in 1 และ b มี in 2 out 1 จึงไม่มี circuit แต่มี Euler path เริ่มที่ c จบที่ b เช่น c, a, b, c, d, b

[p.9] `[Source: generated — not verified against original document]`
</details>

---

## Section B: ปัญหาแผนผังอาคารและ Königsberg ระดับ ⭐⭐

**B1.** (Example 3 [p.11]) แผนผังอาคารมีห้อง A (พื้นที่ภายนอกผนังซ้าย), B, C, D, E, F และประตู A–B, A–E, B–E, B–C, C–E, C–F, C–D, D–F, E–F เป็นไปได้หรือไม่ที่จะเข้าจาก A ผ่านประตูทุกบานครั้งเดียวแล้วกลับออกสู่ A

<details><summary>เฉลย</summary>

ไม่ได้ degree ของ A, B, C, D, E, F = 2, 3, 4, 2, 4, 3 มีจุดคี่ 2 จุด (B และ F) ตาม Theorem 1 จึงไม่มี Euler circuit (ผู้เขียนตีความ A เป็นพื้นที่ภายนอกจากตำแหน่งตัวอักษรในรูป และอ่านประตูจากรูป) [p.10-11] `[Source: generated — not verified against original document]`
</details>

**B2.** (Example 4 [p.14]) แผนผังอาคารมีประตูภายใน A–H, H–G, B–G, G–F, B–C, G–D, F–E, C–D และประตูภายนอกที่ห้อง A กับห้อง E เป็นไปได้หรือไม่ที่จะเข้าห้อง A และออกจากห้อง E โดยผ่านประตูทุกบานครั้งเดียวและเข้าทุกห้อง

<details><summary>เฉลย</summary>

ได้ ถ้านับเฉพาะประตูภายใน degree คี่มีแค่ A (1) และ E (1) ตาม Theorem 2 [p.13] จึงมี Euler path จาก A ไป E เช่น A, H, G, B, C, D, G, F, E ใช้ประตูภายในครบ 8 บานและผ่านครบ 8 ห้อง แล้วออกประตูภายนอกของ E (ประตูอ่านจากรูป) [p.14] `[Source: generated — not verified against original document]`
</details>

**B3.** (Example [p.13]) กราฟไหนมี Euler path: G₁ (a–b, b–c, c–d, d–a, b–d), G₂ (a–g, a–b, b–c, c–d, d–e, g–f, f–e, b–g, c–g, c–f, d–f), G₃ (วงหกเหลี่ยม a–b–c–d–e–f–a และจุด g ตรงกลางเชื่อมทั้ง 6 จุด)

<details><summary>เฉลย</summary>

* G₁: จุดคี่ b, d (degree 3) จึงมี Euler path เช่น b, a, d, c, b, d
* G₂: จุดคี่ b, d (degree 3) จึงมี Euler path เช่น b, a, g, b, c, g, f, c, d, f, e, d
* G₃: จุด a-f มี degree 3 ทุกจุด (6 จุดคี่) จึงไม่มี Euler path

(Theorem 2 [p.13]; สไลด์ไม่เฉลย) `[Source: generated — not verified against original document]`
</details>

**B4.** (Königsberg [p.2-7]) multigraph ของปัญหามีจุด A, B, C, D และ edges A–C สองเส้น, A–B สองเส้น, A–D, B–D, C–D หนึ่งเส้นต่อคู่ ข้ามสะพานทั้ง 7 แห่งครั้งเดียวแล้วกลับจุดเริ่มได้หรือไม่

<details><summary>เฉลย</summary>

ไม่ได้ degree ของ A, B, C, D = 5, 3, 3, 3 ทั้ง 4 จุดเป็นเลขคี่ ขัด Theorem 1 [p.10] (ข้อสรุปของ Euler ที่ p.5 ในสไลด์ประโยคค้าง ผู้เขียนสรุปจากทฤษฎีบท) `[Source: generated — not verified against original document]`
</details>

---

## Section C: Hamilton circuit และ Hamilton path ระดับ ⭐

**C1.** นิยาม Hamilton circuit และ Hamilton path และต่างจาก Euler อย่างไร

<details><summary>เฉลย</summary>

Hamilton circuit คือ simple circuit ที่ผ่านทุกจุดยอดพอดี 1 ครั้ง Hamilton path คือ simple path ที่ผ่านทุกจุดยอดพอดี 1 ครั้ง [p.16] Euler ผ่านทุก edge พอดี 1 ครั้ง [p.7] และเงื่อนไข Euler ตรวจด้วย degree ได้ง่าย ส่วน Hamilton ยากสำหรับกราฟส่วนใหญ่ [p.6]
</details>

**C2.** (Exercise 1 [p.19]) กราฟ simple G₁ (a–b, a–c, a–e, b–c, b–e, c–e, c–d, d–e), G₂ (a–b, b–c, c–d, b–d), G₃ (a–b, b–g, d–c, c–e, e–f, b–c, g–e) กราฟไหนมี Hamilton circuit ถ้าไม่มีกราฟไหนมี Hamilton path

<details><summary>เฉลย</summary>

* G₁: มี Hamilton circuit a, b, c, d, e, a
* G₂: ไม่มี circuit (a มี degree 1) แต่มี Hamilton path d, c, b, a
* G₃: ไม่มีทั้งสอง a, d, f เป็นใบ 3 จุด path ที่ผ่านทุกจุดมีปลายได้แค่ 2 ปลาย

(สไลด์ไม่เฉลย) `[Source: generated — not verified against original document]`
</details>

**C3.** (Hamilton's Puzzle [p.17]) คำว่า Hamilton circuit มาจากเกมอะไร ใครคิด ปีไหน

<details><summary>เฉลย</summary>

Icosian puzzle ที่ Sir William Rowan Hamilton นักคณิตศาสตร์ชาวไอริชคิดในปี 1857 ประกอบด้วยทรงสิบสองหน้า (dodecahedron) ที่ไม้ มีหมุดที่ทุกจุดยอดและเชือก [p.17]
</details>

---

## Section D: Dirac, Ore ระดับ ⭐⭐⭐

**D1.** (Example 1 [p.22]) กราฟ G₁ ของ C2 จงเติม n และ degree ของทุกจุด แล้วตรวจ Dirac และ Ore

<details><summary>เฉลย</summary>

n = 5, deg(a) = 3, deg(b) = 3, deg(c) = 4, deg(d) = 2, deg(e) = 4
* Dirac: ต้อง deg ≥ n/2 = 2.5 หรือก็คือ ≥ 3 แต่ deg(d) = 2 จึงไม่เข้าเงื่อนไข
* Ore: คู่ที่ไม่ adjacent คือ (a, d) และ (b, d) ซึ่ง 3 + 2 = 5 ≥ 5 ทั้งคู่ จึงเข้าเงื่อนไข จึงมี Hamilton circuit [p.21-22]

(สไลด์เตรียมช่องว่าง ไม่เฉลย) `[Source: generated — not verified against original document]`
</details>

**D2.** (Exercise [p.23]) กราฟ 6 จุด a–b, a–c, b–c, c–d, d–e, d–f, e–f, a–e, b–f จงเติม n และ degree แล้วแสดงว่ามี Hamilton circuit

<details><summary>เฉลย</summary>

n = 6 และ deg ของ a, b, c, d, e, f เท่ากับ 3 ทุกจุด ≥ n/2 = 3 จึงเข้าเงื่อนไข Dirac และมี Hamilton circuit เช่น a, b, c, d, f, e, a (ป้าย c และ d ในรูปอยู่ใกล้จุดสองจุดกลางรูป ผู้เขียนกำหนด c เป็นจุดบนและ d เป็นจุดล่าง) [p.21, 23] `[Source: generated — not verified against original document]`
</details>

**D3.** ถ้ากราฟเข้าเงื่อนไข Dirac จะเข้าเงื่อนไข Ore ด้วยหรือไม่ เพราะอะไร

<details><summary>เฉลย</summary>

เข้าด้วย ถ้าทุกจุดมี degree ≥ n/2 ผลรวม degree ของจุดสองจุดใดๆ ≥ n จึงรวมถึงทุกคู่ที่ไม่ adjacent [p.21] ส่วนกลับกันไม่จริง (G₁ ของ D1 เข้า Ore แต่ไม่เข้า Dirac) `[Source: generated — not verified against original document]`
</details>

**D4.** กราฟที่ไม่เข้า Dirac และ Ore แต่มี Hamilton circuit มีไหม ยกตัวอย่าง (โจทย์สมมติ)

<details><summary>เฉลย</summary>

มี C₆ (วงจร 6 จุด) ทุกจุด degree 2 < 3 = n/2 ไม่เข้า Dirac คู่ที่ไม่ adjacent มี deg + deg = 4 < 6 ไม่เข้า Ore แต่ตัวกราฟเองเป็น Hamilton circuit แสดงว่าสองทฤษฎีบทเป็นเงื่อนไขเพียงพอ ไม่ใช่เงื่อนไขจำเป็น [p.20-21] `[Source: generated — not verified against original document]`
</details>

**D5.** กราฟ K₂,₃ มี Hamilton circuit และ Hamilton path หรือไม่ (โจทย์สมมติ)

<details><summary>เฉลย</summary>

ไม่มี circuit: ใน bipartite graph วงจรสลับฝั่งไปมาจึงต้องมีจุดสองฝั่งจำนวนเท่ากัน แต่ K₂,₃ มี 2 กับ 3 จุด มี Hamilton path เช่น y₁, x₁, y₂, x₂, y₃ (โดย V₁ = {x₁, x₂}, V₂ = {y₁, y₂, y₃}) [p.16] `[Source: generated — not verified against original document]`
</details>

---

## Section E: เปรียบเทียบและการประยุกต์ ระดับ ⭐⭐

**E1.** ยกตัวอย่างงานที่ใช้ Euler path/circuit และ Hamilton path/circuit อย่างละ 3 อย่างตามสไลด์

<details><summary>เฉลย</summary>

Euler [p.15]: ถนนแต่ละสายในย่าน, ถนนในเครือข่ายขนส่ง, การเชื่อมต่อในโครงข่ายสาธารณูปโภค (อื่นๆ: link ในเครือข่ายสื่อสาร, การจัดวางวงจร, network multicasting, DNA sequencing) Hamilton [p.24]: ทางแยกถนน, การวางท่อในโครงข่ายสาธารณูปโภค, node ในเครือข่ายสื่อสาร (และ traveling salesman)
</details>

**E2.** Traveling salesman problem คืออะไร และเกี่ยวกับ Hamilton circuit อย่างไร

<details><summary>เฉลย</summary>

ถามหาเส้นทางที่สั้นที่สุดที่พนักงานขายควรเดินเพื่อผ่านเมืองชุดหนึ่ง วิธีแก้เกี่ยวข้องกับการหา Hamilton circuit ที่ผลรวมน้ำหนักของ edges น้อยที่สุด [p.24]
</details>

**E3.** Weighted graph คืออะไร และ shortest path ถามอะไร

<details><summary>เฉลย</summary>

Weighted graph คือกราฟที่มีตัวเลขกำกับแต่ละ edge Shortest path คือ path ที่มีความยาวน้อยที่สุดระหว่างจุดยอดสองจุดที่กำหนด [p.25] (สไลด์หน้านี้เป็นหน้าสุดท้ายและไม่มีอัลกอริทึม)
</details>

**E4.** เหตุใด Euler ตรวจได้ง่ายกว่า Hamilton

<details><summary>เฉลย</summary>

Euler มีเงื่อนไขจำเป็นและเพียงพอที่ตรวจด้วย degree ได้ (Theorem 1 และ 2 [p.10, 13]) ส่วน Hamilton ไม่มีเงื่อนไขง่ายๆ ที่จำเป็นและเพียงพอ รู้แค่เงื่อนไขเพียงพอเช่น Dirac และ Ore [p.6, 20-21]
</details>

---

## สรุปแบบฝึกหัด

| Section | หัวข้อ | ระดับ | จำนวนข้อ |
| :--- | :--- | :--- | :--- |
| A | Euler circuit และ path | ⭐ | 4 |
| B | แผนผังอาคารและ Königsberg | ⭐⭐ | 4 |
| C | Hamilton circuit และ path | ⭐ | 3 |
| D | Dirac และ Ore | ⭐⭐⭐ | 5 |
| E | เปรียบเทียบและการประยุกต์ | ⭐⭐ | 4 |
