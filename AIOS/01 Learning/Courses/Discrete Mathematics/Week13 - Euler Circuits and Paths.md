# Discrete Mathematics - Week13: Euler Circuits and Paths

> **วิชา:** Discrete Mathematics | **ผู้สอน:** Dr. Sirasit Lochanachit
> **Source:** `Resources/Books/Discrete Mathematics/DM_Week13.pdf` สไลด์ p.2-15 (ทั้งไฟล์ 25 slides, หัวสไลด์ "Week 14: Graphs Part 3")
> **ป้ายอ้างอิง:** `[p.N]` = เลขสไลด์ใน PDF, blockquote ที่ขึ้นต้น 💡 = เนื้อหาที่ผู้เขียนเพิ่มเอง (รวมเฉลยของตัวอย่างที่สไลด์ไม่เฉลย)
> **แบบฝึกหัด:** [[HW-Discrete-Math-05]] Section A-B

---

## Part 1: Macro Architecture & Overview

บทนี้เริ่มจากปัญหา Seven Bridges of Königsberg ซึ่งสไลด์จัดไว้ในหัวข้อ "History of Graph" [p.2-5] คำถามทั่วไปคือ เดินตาม edges ของกราฟโดยเริ่มที่จุดยอดหนึ่งและกลับมาที่จุดนั้น โดยผ่านทุก edge **พอดีหนึ่งครั้ง** ได้หรือไม่ [p.6] คำตอบตรวจได้ง่ายด้วยการดู degree ของจุดยอด [p.6] สไลด์นิยาม **Euler circuit** และ **Euler path** [p.7] ให้เงื่อนไขที่ใช้ตัดสิน (Theorem 1 และ 2) [p.10, 13] แล้วใช้กับกราฟ แผนผังอาคาร และปัญหาวาดรูปโดยไม่ยกดินสอ [p.8-14] ส่วนคำถามคู่กันที่ผ่านทุก **จุดยอด** พอดีหนึ่งครั้ง (Hamilton) อยู่ใน [[Week13 - Hamilton Circuits and Paths]]

```mermaid
flowchart TB
  Q["เดินผ่านทุก edge<br/>พอดีหนึ่งครั้ง ได้ไหม ?"] --> EC["Euler circuit<br/>ปิด: กลับจุดเริ่ม"]
  Q --> EP["Euler path<br/>ไม่ต้องกลับจุดเริ่ม"]
  EC --> T1["Theorem 1: ทุกจุดยอดมี degree เป็นเลขคู่<br/>(connected multigraph ≥ 2 จุด)"]
  EP --> T2["Theorem 2: มีจุดยอด degree คี่<br/>พอดี 2 จุด (แต่ไม่มี Euler circuit)"]
```
_ที่มา: นิยามและทฤษฎีบทใน [p.7, 10, 13]_

### ตารางเปรียบเทียบ Euler circuit กับ Euler path

| หัวข้อ | Euler circuit | Euler path |
| :--- | :--- | :--- |
| นิยาม [p.7] | simple circuit ที่มีทุก edge ของ G | simple path ที่มีทุก edge ของ G |
| simple หมายถึง [p.7] | ใช้แต่ละ edge พอดี 1 ครั้ง | ใช้แต่ละ edge พอดี 1 ครั้ง |
| เงื่อนไขใน multigraph ที่ connected (undirected) | ทุกจุดยอด degree เป็นเลขคู่ [p.10] | มีจุดยอด degree คี่พอดี 2 จุด และไม่มี Euler circuit [p.13] |
| เริ่มและจบ | จุดเดียวกัน | ไม่ระบุในสไลด์ |
| ตัวอย่างจากสไลด์ที่ตรงเงื่อนไข (ผลของผู้เขียน `[Source: generated — not verified against original document]`) | G₁ ใน p.8 | G₃ ใน p.8, G₁ และ G₂ ใน p.13 |

> 💡 ในกราฟ Euler path ต้องเริ่มที่จุดคี่จุดหนึ่งและจบที่อีกจุดหนึ่ง (ผู้เขียนตรวจกับตัวอย่าง p.13) `[Source: generated — not verified against original document]`

---

## Part 2: Module-by-Module Deep Dive

### 2.1 ประวัติ: Seven Bridges of Königsberg [p.2-5]

* เมือง Königsberg ในปรัสเซีย (ปัจจุบันเรียก Kaliningrad และเป็นส่วนหนึ่งของ Russian republic ตามคำในสไลด์) แบ่งเป็น 4 ส่วนโดยแขนของแม่น้ำ Pregel [p.2]
* ในศตวรรษที่ 18 สะพาน 7 แห่งของ Königsberg เชื่อมบริเวณเหล่านี้ [p.2]
* ชาวเมืองสงสัยว่า เริ่มที่จุดใดจุดหนึ่งในเมือง เดินข้ามสะพานทุกแห่งครั้งเดียวโดยไม่ข้ามสะพานใดซ้ำ แล้วกลับมาจุดเริ่มได้หรือไม่ [p.4]
* ปี 1736 นักคณิตศาสตร์ชาวสวิส Leonhard Euler พิสูจน์ว่า .... [p.5] (ประโยคในสไลด์ค้างอยู่ ไม่มีข้อสรุป)

รูปกราฟของปัญหา (multigraph ที่ p.7 วาดจุด A, B, C, D และ edges คู่ระหว่าง A–C กับ A–B) อ่านจากรูป:

```mermaid
flowchart LR
  C((C)) ---|"สะพาน 1"| A((A))
  C ---|"สะพาน 2"| A
  A ---|"สะพาน 3"| B((B))
  A ---|"สะพาน 4"| B
  A ---|"สะพาน 5"| D((D))
  C ---|"สะพาน 6"| D
  B ---|"สะพาน 7"| D
```
_ต้นฉบับ: แผนที่ [p.2-5] และรูป multigraph [p.7]_

> 💡 degree ของจุดยอด: A = 5, B = 3, C = 3, D = 3 ทั้ง 4 จุดเป็นเลขคี่ จึงขัด Theorem 1 ที่ต้องการทุกจุดเป็นเลขคู่ จึงไม่มีทางข้ามสะพานทั้ง 7 แห่งครั้งเดียวแล้วกลับจุดเริ่ม ข้อสรุปนี้เป็นของผู้เขียน เพราะประโยคใน p.5 ไม่จบ `[Source: generated — not verified against original document]`

---

### 2.2 นิยาม Euler circuit และ Euler path [p.6-7]

* คำถาม Euler: เดินตาม edges เริ่มที่จุดยอดหนึ่งและกลับจุดเดิม โดยผ่านทุก edge พอดี 1 ครั้งได้หรือไม่ มี Euler circuit หรือไม่ ตอบได้ง่ายโดยดู degree ของจุดยอด [p.6]
* คำถามคู่ขนาน: เดินแล้วกลับจุดเดิมโดยผ่านทุกจุดยอดพอดี 1 ครั้ง (Hamilton circuit) ยากสำหรับกราฟส่วนใหญ่ [p.6]

> 💡 **Intuition:** Euler = "ผ่านทุก **edge** พอดี 1 ครั้ง" คิดเป็นการเดินข้ามสะพาน (edge) ทุกแห่ง แห่งละครั้งเดียว เหมือนปัญหาสะพาน Königsberg หรือ "วาดรูปโดยไม่ยกดินสอและไม่ลากเส้นซ้ำ" Euler circuit = ปิด (กลับจุดเริ่ม), Euler path = ไม่ต้องปิด
> [Source: generated — not verified against original document]

> **Definition 1:** **Euler circuit** ในกราฟ G คือ simple circuit ที่มีทุก edge ของ G **Euler path** ใน G คือ simple path ที่มีทุก edge ของ G โปรดจำว่า path หรือ circuit เป็น simple ถ้ามีแต่ละ edge พอดี 1 ครั้ง [p.7]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Euler = simple circuit/path ที่มี **ทุก edge**" → ต้องผ่าน edge ครบทุกเส้น และแต่ละเส้นพอดี 1 ครั้ง
- "Simple = ไม่มี edge ซ้ำ" → แต่ละ edge ใช้ไม่เกิน 1 ครั้ง (รวมกับ "มีทุก edge" จึงได้พอดี 1 ครั้ง)
- "Circuit = ปิด" → เริ่มและจบจุดเดียว, "Path = ไม่ต้องปิด"

**ตัวอย่าง:**
- ✅ กราฟสี่เหลี่ยมที่มีแค่ 4 edges a–b, b–c, c–d, d–a → circuit a, b, c, d, a เป็น Euler circuit
- ✅ กราฟที่มีแค่ 3 edges a–b, b–c, c–d → path a, b, c, d เป็น Euler path (เริ่ม a จบ d, ไม่ปิด)
- ❌ กราฟมี 5 edges แต่ path ผ่าน 4 → ไม่ Euler (ไม่ผ่านทุก edge)
- **ต่างกันตรง:** Euler = ผ่านทุก **edge**, Hamilton = ผ่านทุก **จุดยอด**

**อย่าสับสน:** "ผ่านทุก edge พอดี 1 ครั้ง" ไม่ห้ามผ่านจุดยอดซ้ำ → จุดยอดเดียวอาจผ่านหลายครั้ง

**เช็คความเข้าใจ:** กราฟ 5 จุด {a,b,c,d,e} มี edges a–b, b–c, c–d, d–e, e–a, a–c (6 edges) มี Euler circuit ไหม ตรวจด้วย degree
<details><summary>เฉลย</summary>

1. degree: a (b, e, c) = 3, b = 2, c (b, d, a) = 3, d = 2, e = 2 → ผลรวม 12 = 2 × 6 ✓
2. มีจุด degree คี่ (a, c) → ขัด Theorem 1 → **ไม่มี Euler circuit**
3. กราฟ connected และมีจุดคี่พอดี 2 จุด → ตาม Theorem 2 มี **Euler path** ที่เริ่มที่จุดคี่จุดหนึ่งและจบที่อีกจุด เช่น a, b, c, d, e, a, c (ใช้ครบ 6 edges เส้นละครั้ง)

</details>

รูปใน p.7 วาด multigraph ของ Königsberg (จุด A, B, C, D)

---

### 2.3 ตัวอย่าง: กราฟไม่มีทิศและมีทิศ [p.8-9]

**Example 1 [p.8]:** กราฟไม่มีทิศ G₁, G₂, G₃ ข้อไหนมี Euler circuit และข้อที่ไม่มีข้อไหนมี Euler path (สไลด์ไม่เฉลย) edges อ่านจากรูป:
* G₁: a–b, a–e, b–e, c–d, c–e, d–e
* G₂: a–b, a–d, b–c, c–d, a–e, b–e, c–e, d–e
* G₃: a–b, a–c, a–d, b–d, b–e, c–d, d–e

```mermaid
flowchart LR
  subgraph G1["G1"]
    a1["a"] --- b1["b"]
    a1 --- e1["e"]
    b1 --- e1
    c1["c"] --- d1["d"]
    c1 --- e1
    d1 --- e1
  end
  subgraph G2["G2"]
    a2["a"] --- b2["b"]
    a2 --- d2["d"]
    b2 --- c2["c"]
    c2 --- d2
    a2 --- e2["e"]
    b2 --- e2
    c2 --- e2
    d2 --- e2
  end
  subgraph G3["G3"]
    a3["a"] --- b3["b"]
    a3 --- c3["c"]
    a3 --- d3["d"]
    b3 --- d3
    b3 --- e3["e"]
    c3 --- d3
    d3 --- e3
  end
```
_ต้นฉบับ: รูป G₁, G₂, G₃ [p.8]_

> 💡 เฉลยของผู้เขียน (ตรวจ degree ตาม Theorem 1 และ 2):
>
> | กราฟ | degree (a, b, c, d, e) | จุด degree คี่ | ผล |
> | :--- | :--- | :--- | :--- |
> | G₁ | 2, 2, 2, 2, 4 | ไม่มี | มี Euler circuit เช่น a, b, e, c, d, e, a |
> | G₂ | 3, 3, 3, 3, 4 | a, b, c, d (4 จุด) | ไม่มีทั้ง Euler circuit และ Euler path |
> | G₃ | 3, 3, 2, 4, 2 | a, b (2 จุด) | ไม่มี Euler circuit แต่มี Euler path เช่น a, c, d, e, b, d, a, b |
>
> `[Source: generated — not verified against original document]`

**Example 2 [p.9]:** กราฟมีทิศ H₁, H₂, H₃ ข้อไหนมี Euler circuit และข้อที่ไม่มีข้อไหนมี Euler path (สไลด์ไม่เฉลยและไม่ให้ทฤษฎีบทสำหรับกราฟมีทิศ) edges อ่านจากรูป:
* H₁: a→b, a→d, d→c, c→b
* H₂: a→g, g→c, c→b, b→g, g→e, e→d, d→f, f→a
* H₃: c→d, d→b, b→c, c→a, a→b

```mermaid
flowchart LR
  subgraph H1["H1"]
    ha1["a"] --> hb1["b"]
    ha1 --> hd1["d"]
    hd1 --> hc1["c"]
    hc1 --> hb1
  end
  subgraph H2["H2"]
    ha2["a"] --> hg2["g"]
    hg2 --> hc2["c"]
    hc2 --> hb2["b"]
    hb2 --> hg2
    hg2 --> he2["e"]
    he2 --> hd2["d"]
    hd2 --> hf2["f"]
    hf2 --> ha2
  end
  subgraph H3["H3"]
    hc3["c"] --> hd3["d"]
    hd3 --> hb3["b"]
    hb3 --> hc3
    hc3 --> ha3["a"]
    ha3 --> hb3
  end
```
_ต้นฉบับ: รูป H₁, H₂, H₃ [p.9]_

> 💡 เกณฑ์สำหรับกราฟมีทิศ (ไม่อยู่ในสไลด์ เป็นความรู้มาตรฐาน): กราฟต้อง connected เมื่อมองข้ามทิศ และมี Euler circuit เมื่อทุกจุดยอดมี in-degree = out-degree ส่วน Euler path (ที่ไม่ใช่ circuit) ต้องมีจุดยอดหนึ่งจุดที่ out − in = 1 (จุดเริ่ม) และอีกหนึ่งจุดที่ in − out = 1 (จุดจบ) ที่เหลือ in = out
>
> | กราฟ | จุดที่ in ≠ out | ผล |
> | :--- | :--- | :--- |
> | H₁ | a (out 2, in 0), b (in 2, out 0), c (out 1, in 1), d (in 1, out 1) | ไม่มีทั้ง circuit และ path เพราะ a ต่าง 2 |
> | H₂ | ไม่มี (ทุกจุด in = out) | มี Euler circuit a, g, c, b, g, e, d, f, a |
> | H₃ | c (out 2, in 1), b (in 2, out 1) | ไม่มี circuit แต่มี Euler path จาก c ไป b เช่น c, a, b, c, d, b |
>
> `[Source: generated — not verified against original document]`

---

### 2.4 Necessary conditions สำหรับ Euler circuit [p.10-12]

เกณฑ์ง่ายๆ สำหรับตัดสินว่า multigraph มี Euler circuit หรือ path หรือไม่ เงื่อนไขจำเป็น: ทุกจุดยอดต้องมี degree เป็นเลขคู่ [p.10]

> 💡 **Intuition:** ทุกครั้งที่เดินผ่านจุดยอดระหว่างทาง จะใช้ edge 1 เส้นเพื่อมาถึง และอีก 1 เส้นเพื่อเดินต่อ → edge ที่จุดนั้นถูกใช้ทีละคู่ ส่วนจุดเริ่มใช้ 1 เส้นตอนออกเดิน และ 1 เส้นตอนกลับมาจบ (circuit จบที่จุดเดิม) ซึ่งก็เป็นคู่เช่นกัน → เมื่อใช้ทุก edge พอดีครั้งเดียว ทุกจุดต้องมี degree เป็นเลขคู่
> [Source: generated — not verified against original document]

> **Theorem 1:** multigraph ที่ connected และมีจุดยอดตั้งแต่ 2 จุดขึ้นไป มี Euler circuit ก็ต่อเมื่อทุกจุดยอดมี degree เป็นเลขคู่ [p.10]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Connected" → ต้องมี path เชื่อมทุกจุด (ไม่มีชิ้นแยก)
- "ก็ต่อเมื่อ (iff)" → เงื่อนไขนี้เป็นทั้งเงื่อนไขจำเป็นและเพียงพอ

**ตัวอย่าง:**
- ✅ สี่เหลี่ยม a–b–c–d–a ทุกจุด degree 2 → มี Euler circuit (เช่น a–b–c–d–a)
- ✅ หกเหลี่ยม ทุกจุด degree 2 → มี Euler circuit
- ❌ K₄ ทุกจุด degree 3 (คี่) → ไม่มี Euler circuit
- ❌ สามเหลี่ยม 2 รูปที่แยกกัน (a–b–c–a และ d–e–f–d) ทุกจุด degree 2 แต่ไม่ connected → ไม่มี Euler circuit ที่ผ่านทุก edge
- **ต่างกันตรง:** Theorem 1 ตรวจว่าทุกจุด degree คู่ (0 จุดคี่), Theorem 2 ตรวจว่ามีจุด degree คี่พอดี 2 จุด — ทั้งคู่ต้อง connected

**อย่าสับสน:** "ทุกจุดยอดมี degree เป็นเลขคู่" = degree ของแต่ละจุดเป็นคู่ ไม่ใช่ "ผลรวม degree เป็นคู่" (ผลรวม degree เป็นคู่เสมออยู่แล้วตาม Handshaking)

**เช็คความเข้าใจ:** กราฟมี 5 จุด ทุกจุด degree 4 มี Euler circuit ไหม
<details><summary>เฉลย</summary>

1. ทุกจุด degree 4 = เลขคู่ → ผ่านเงื่อนไข degree ของ Theorem 1
2. ถ้าเป็น simple graph: 5 จุดที่ degree 4 ทุกจุดคือ K₅ ซึ่ง connected → **มี Euler circuit**
3. ถ้าเป็น multigraph ต้องเช็ค connected เพิ่ม (multigraph ที่ degree เท่านี้อาจแยกเป็นหลายก้อนได้) ถ้า connected ก็มี Euler circuit

</details>

**Example 3 [p.11]:** ให้แผนผังอาคาร เป็นไปได้หรือไม่ที่จะเข้าอาคารจาก A และออกสู่ห้อง A โดยผ่านประตูทุกบานครั้งเดียว และต้องเข้าทุกห้อง สไลด์ไม่เฉลย

อ่านจากรูป: ตัวอักษร A อยู่นอกผนังซ้ายสุด ผู้เขียนจึงถือ A เป็นพื้นที่ภายนอก ประตูอยู่ที่ผนัง A–B, A–E, B–E, B–C, C–E, C–F, C–D, D–F, E–F (ประตู 9 บาน) แปลงเป็นกราฟโดยให้ห้องเป็นจุดยอด ประตูเป็น edge

```mermaid
flowchart LR
  A["A"] --- B["B"]
  A --- E["E"]
  B --- E
  B --- C["C"]
  C --- E
  C --- F["F"]
  C --- D["D"]
  D --- F
  E --- F
```
_ต้นฉบับ: รูปแผนผัง [p.11] (ประตูอ่านจากรูป)_

> 💡 degree: A = 2, B = 3, C = 4, D = 2, E = 4, F = 3 มีจุดคี่ 2 จุด (B, F) ตาม Theorem 1 จึงไม่มี Euler circuit คำตอบคือไม่ได้ `[Source: generated — not verified against original document]`

**Mohammed's Scimitars Problem [p.12]:** วาดรูปแบบต่อเนื่องโดยไม่ยกดินสอได้หรือไม่ เช่น วาดดาบโค้งของ Mohammed (scimitars) ให้เริ่มและจบที่จุดเดียวกันได้หรือไม่ สไลด์ไม่เฉลย

รูปในสไลด์เป็นภาพถ่ายดาบโค้งและเส้นวาดเสี้ยวพระจันทร์สองรูปซ้อนกัน

> 💡 แนวทางตอบ: แปลงรูปเป็นกราฟโดยให้จุดตัดและปลายเส้นเป็นจุดยอด แล้วตรวจ Theorem 1 ถ้าทุกจุดมี degree เป็นเลขคู่ วาดแบบเริ่มและจบที่เดียวกันได้ ผู้เขียนไม่ได้วิเคราะห์รูปนี้ จึงไม่ให้คำตอบ `[Source: generated — not verified against original document]`

---

### 2.5 Necessary conditions สำหรับ Euler path [p.13-14]

> 💡 **Intuition:** Euler path ไม่ต้องปิด → จุดเริ่มมี edge 1 เส้นที่ใช้ตอนออกเดินโดยไม่มีคู่ และจุดจบมี edge 1 เส้นที่ใช้ตอนมาถึงครั้งสุดท้ายโดยไม่มีคู่ → 2 จุดนี้มี degree คี่ ส่วนจุดระหว่างทางยังใช้ edge ทีละคู่ (มาถึง 1 เส้น เดินต่อ 1 เส้น) จึงมี degree คู่
> [Source: generated — not verified against original document]

> **Theorem 2:** multigraph ที่ connected มี Euler path แต่ไม่มี Euler circuit ก็ต่อเมื่อมีจุดยอดที่ degree เป็นเลขคี่พอดี 2 จุด [p.13]

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Euler path แต่ไม่มี circuit" → 2 จุด degree คี่ (ถ้าไม่มี degree คี่เลย = circuit, ถ้า > 2 = ไม่มี Euler)
- "พอดี 2 จุด" → นับจำนวนจุด degree คี่ให้ได้ 2 พอดี ถ้ามี 4 จุดขึ้นไป = ไม่มีทั้ง Euler path และ Euler circuit

**ตัวอย่าง:**
- ✅ Path a–b–c–d ที่มี 3 edges: deg(a) = 1, deg(b) = 2, deg(c) = 2, deg(d) = 1 → 2 จุด degree คี่ → มี Euler path (เริ่ม a จบ d)
- ❌ สี่เหลี่ยม a–b–c–d–a ทั้งหมด degree 2 → 0 จุด degree คี่ → มี Euler circuit ไม่ใช่ path
- ❌ K₄ ทุกจุด degree 3 → 4 จุด degree คี่ → ไม่มีทั้ง Euler path และ Euler circuit
- **ต่างกันตรง:** Theorem 1 = 0 odd vertices, Theorem 2 = 2 odd vertices

**อย่าสับสน:** "พอดี 2 จุด degree คี่" ไม่ได้บอก "degree คี่ต้องเป็น 1 หรือ 3" → อาจเป็น 1, 3, 5, ...

**เช็คความเข้าใจ:** กราฟ 4 จุด {a,b,c,d} degree: 1, 3, 2, 2 มี Euler path ไหม
<details><summary>เฉลย</summary>

1. จุด degree คี่: a (1) และ b (3) → พอดี 2 จุด, c และ d degree 2 (คู่)
2. ถ้ากราฟ connected → ตาม Theorem 2 **มี Euler path** (เริ่มที่ a หรือ b และจบที่อีกจุด) แต่ไม่มี Euler circuit
3. ตัวอย่างกราฟที่ตรงเงื่อนไข: edges a–b, b–c, b–d, c–d (connected) → Euler path a, b, c, d, b

</details>

**Example (ไม่มีเลขใน p.13):** กราฟไหนมี Euler path (สไลด์ไม่เฉลย) edges อ่านจากรูป:
* G₁: a–b, b–c, c–d, d–a, b–d
* G₂ (7 จุด): a–g, a–b, b–c, c–d, d–e, g–f, f–e, b–g, c–g, c–f, d–f
* G₃ (6 จุดรอบ + g ตรงกลาง): a–b, b–c, c–d, d–e, e–f, f–a และ g เชื่อมกับทั้ง 6 จุด

> 💡 เฉลยของผู้เขียน:
>
> | กราฟ | จุด degree คี่ | ผล |
> | :--- | :--- | :--- |
> | G₁ | b (3), d (3) | มี Euler path เช่น b, a, d, c, b, d |
> | G₂ | b (3), d (3) | มี Euler path เช่น b, a, g, b, c, g, f, c, d, f, e, d |
> | G₃ | a, b, c, d, e, f (6 จุด จุดละ 3) | ไม่มี Euler path |
>
> `[Source: generated — not verified against original document]`

**Example 4 [p.14]:** ให้แผนผังอาคาร เป็นไปได้หรือไม่ที่จะเข้าห้อง A และออกจากห้อง E โดยผ่านประตูทุกบานครั้งเดียว และต้องเข้าทุกห้อง สไลด์ไม่เฉลย

อ่านจากรูป: ห้อง A–H มีประตูภายใน 8 บาน คือ A–H, H–G, B–G, G–F, B–C, G–D, F–E, C–D และมีประตูภายนอก 2 บาน (ผนังซ้ายของ A และผนังขวาของ E)

```mermaid
flowchart LR
  O["ภายนอก"] --- A["A"]
  A --- H["H"]
  H --- G["G"]
  G --- B["B"]
  G --- F["F"]
  G --- D["D"]
  B --- C["C"]
  C --- D
  F --- E["E"]
  E --- O
```
_ต้นฉบับ: รูปแผนผัง [p.14] (ประตูอ่านจากรูป)_

> 💡 ถ้านับเฉพาะประตูภายใน degree คี่มีสองห้องคือ A (1) และ E (1) ตาม Theorem 2 จึงมี Euler path จาก A ไป E เส้นทางตัวอย่าง: เข้า A → H → G → B → C → D → G → F → E แล้วออกประตูภายนอกของ E ใช้ประตูภายในครบ 8 บานและผ่านครบ 8 ห้อง คำตอบคือทำได้ `[Source: generated — not verified against original document]`

---

### 2.6 การประยุกต์ใช้ Euler path และ circuit [p.15]

Euler path และ circuit ใช้แก้ปัญหาที่ต้องหา path หรือ circuit ที่ผ่านแต่ละรายการพอดี 1 ครั้ง เช่น [p.15]
* ถนนแต่ละสายในย่าน
* ถนนในเครือข่ายขนส่ง
* การเชื่อมต่อในโครงข่ายสาธารณูปโภค (utility grid)
* link ในเครือข่ายสื่อสาร

การประยุกต์อื่นที่สไลด์ระบุ: การจัดวางวงจร, network multicasting และชีววิทยาโมเลกุลที่ใช้ Euler path ใน sequencing ของ DNA [p.15] รูปในสไลด์เป็นแผนภาพเส้นทางรถจากคลัง (Depot) ไปหาลูกค้า (Customers)

#### 💡 เสริม: ทำไมจุดคี่ทำให้เดินไม่ครบ (เหตุผลเบื้องหลัง Königsberg)

> 💡 **Intuition:** ทุกครั้งที่เดินเข้าแล้วออกจากจุดหนึ่ง จะใช้ edge 2 เส้น (เข้า 1 ออก 1) ดังนั้นจุดที่ผ่านระหว่างทางต้องมี edge เป็นจำนวนคู่ ถ้า edge มีจำนวนคี่ แปลว่าจุดนั้นต้องเป็นจุดเริ่มหรือจุดจบ และ Euler path มีจุดเริ่มกับจุดจบได้อย่างละ 1 จุดเท่านั้น (analogy ใช้ไม่ได้ตรงที่ในชีวิตจริงเราอาจข้ามสะพานเดิมซ้ำได้ แต่โจทย์ Euler ห้ามใช้ edge ซ้ำ จึงใช้ตรรกะ "เข้า-ออกเป็นคู่" ได้)
> [Source: generated — not verified against original document]

**แตกวลีสำคัญ:**
- "degree" → จำนวน edge ที่ติดกับจุดนั้น (ในโจทย์ Königsberg คือจำนวนสะพานที่ต่อกับแต่ละพื้นที่)
- "จุดคี่" → จุดที่ degree เป็นเลขคี่
- "0 หรือ 2 จุดคี่" → เงื่อนไขที่กราฟต้องมีเพื่อให้มี Euler circuit หรือ Euler path (ตาม Theorem 1, 2)

**ตัวอย่าง:**
- ✅ กราฟ a–b, b–c, c–a, c–d: degree a = 2, b = 2, c = 3, d = 1 → จุดคี่ 2 จุด (c, d) → มี Euler path เช่น c–a–b–c–d ใช้ครบ 4 edges
- ❌ Königsberg: จุดคี่ 4 จุด (A = 5, B = 3, C = 3, D = 3) → ไม่มีทั้ง Euler circuit และ Euler path
- **ต่างกันตรง:** นับจำนวนจุดคี่: 0 จุด → มี circuit ได้; 2 จุด → มี path ได้ (แต่ไม่มี circuit); 4 จุดขึ้นไป → ไม่มีทั้งคู่

**อย่าสับสน:** "จุดคี่" ≠ "จุดเริ่มต้นที่ต้องเลือก" — จุดคี่บอกแค่ว่าเป็นจุดเริ่มหรือจุดจบได้เท่านั้น การมี Euler path ยังต้องเช็คว่ากราฟ connected ด้วย

**เช็คความเข้าใจ:** กราฟ a–b, b–c, c–d, d–a, a–c มี Euler path หรือไม่ ถ้ามี จุดเริ่มกับจุดจบคืออะไร (degree: a = 3, b = 2, c = 3, d = 2)
<details><summary>เฉลย</summary>

จุดคี่: a และ c → 2 จุด และกราฟ connected → มี Euler path ที่เริ่มที่ a หรือ c และจบที่อีกจุด (ไม่มี Euler circuit เพราะมีจุดคี่)
ตัวอย่างเส้นทาง: a–b–c–d–a–c (ใช้ครบ 5 edges: ab, bc, cd, da, ac)
</details>

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ
* [ ] **Euler circuit:** simple circuit ที่มีทุก edge (แต่ละ edge พอดี 1 ครั้ง) [p.7]
* [ ] **Euler path:** simple path ที่มีทุก edge [p.7]
* [ ] **Theorem 1:** connected multigraph ที่มี ≥ 2 จุด มี Euler circuit ⇔ ทุกจุด degree เป็นเลขคู่ [p.10]
* [ ] **Theorem 2:** connected multigraph มี Euler path แต่ไม่มี Euler circuit ⇔ มีจุด degree คี่พอดี 2 จุด [p.13]
* [ ] **ปัญหาอาคาร:** ห้อง = จุดยอด, ประตู = edge แล้วนับ degree ตามทฤษฎีบท [p.11, 14]
* [ ] **Königsberg:** ทั้ง 4 ส่วนของเมืองมี degree เป็นเลขคี่ [p.7, ผลของผู้เขียน]
* [ ] **ตรวจได้เร็ว:** Euler ดู degree ได้ แต่ Hamilton ยากสำหรับกราฟส่วนใหญ่ [p.6]

### สรุปสูตร / Notation ที่สำคัญ

| Notation | ความหมาย |
| :--- | :--- |
| $\deg(v)$ เป็นเลขคู่ ทุก $v$ | เงื่อนไข Euler circuit (Theorem 1) [p.10] |
| $\#\{v : \deg(v) \text{ เป็นเลขคี่}\} = 2$ | เงื่อนไข Euler path ที่ไม่ใช่ circuit (Theorem 2) [p.13] |
| $\deg^-(v) = \deg^+(v)$ ทุก $v$ | เกณฑ์ Euler circuit ในกราฟมีทิศ (ความรู้มาตรฐาน ไม่อยู่ในสไลด์) |

### Concept Map

```mermaid
flowchart TB
  Dg["ตรวจ degree ของทุกจุดยอด"] --> Q{"มีจุด degree คี่กี่จุด ?"}
  Q -->|"0 จุด"| C["Euler circuit"]
  Q -->|"2 จุด"| P["Euler path (เริ่ม-จบที่จุดคี่)"]
  Q -->|"มากกว่า 2 จุด"| N["ไม่มีทั้งสอง"]
```
> 💡 Concept map นี้เป็นการสรุปของผู้เขียนจาก Theorem 1 และ 2 (กราฟต้อง connected) `[Source: generated — not verified against original document]`

---

## ⚠️ Common Pitfalls & Exam Traps

* **สับสน Euler กับ Hamilton:** Euler ผ่านทุก **edge** พอดี 1 ครั้ง Hamilton ผ่านทุก **จุดยอด** พอดี 1 ครั้ง [p.6, 7, 16]
* **คิดว่า Euler path คือ Euler circuit:** Theorem 2 พูดถึง Euler path "แต่ไม่มี Euler circuit" และต้องมีจุดคี่พอดี 2 จุด ถ้าไม่มีจุดคี่เลยจะมี circuit [p.10, 13]
* **ลืมเงื่อนไข connected:** ทั้ง Theorem 1 และ 2 ใช้กับ multigraph ที่ connected [p.10, 13] ถ้า edges ของกราฟกระจายอยู่ในหลายส่วนที่ไม่ติดกัน จะไม่มี Euler circuit ที่ผ่านทุก edge แม้ degree ของทุกจุดเป็นเลขคู่
* **ใช้ degree ของกราฟไม่มีทิศกับกราฟมีทิศ:** Example 2 [p.9] ใช้กราฟมีทิศ ต้องเทียบ in-degree กับ out-degree ไม่ใช่นับ degree รวม (สไลด์ไม่มีทฤษฎีบทข้อนี้ ใช้เกณฑ์มาตรฐานตามหัวข้อ 2.3)
* **นับ "ภายนอก" ผิดในโจทย์อาคาร:** ประตูที่เปิดสู่ภายนอกเป็น edge ที่ปลายข้างหนึ่งไม่อยู่ใน graph ถ้าโจทย์ให้เข้าและออกทางประตูภายนอก ให้นับเฉพาะประตูภายในแล้วใช้ Theorem 2 (Example 4) หรือเติมจุดยอด "ภายนอก" เข้ากราฟ
* **ตอบจากรูปโดยไม่นับ degree ครบ:** กราฟที่ดูสมมาตรมักมีจุดคี่ซ่อนอยู่ (เช่น G₂ ใน p.8 มี degree 3 สี่จุด)

**ข้อสังเกตเกี่ยวกับต้นฉบับ (ไม่แก้ในเนื้อหา):**
* หัวสไลด์เขียน "Week 14" แต่ชื่อไฟล์เป็น Week13
* p.5 ประโยค "Euler proved that ...." ไม่จบ
* p.8, p.9, p.11, p.12, p.13, p.14 เป็นโจทย์ที่ไม่มีเฉลย เฉลยทั้งหมดในบทนี้เป็นของผู้เขียนที่อ่านกราฟจากรูป
* p.9 ถามเรื่องกราฟมีทิศ แต่ทฤษฎีบทในสไลด์พูดถึง degree ทั่วไป
* p.10 มีรูปเล็กมุมขวาล่าง เป็นกราฟจุด A-E ที่มี loop ที่ B และเส้นสีแดง พร้อมข้อความ "CDCBBADEBC" โดยไม่มีคำอธิบายในสไลด์
* หัวข้อ "Example" ใน p.13 ไม่มีเลข ถัดไปคือ Example 4 [p.14]
* A ใน Example 3 [p.11] ผู้เขียนตีความเป็นพื้นที่ภายนอกจากตำแหน่งตัวอักษร ถ้าตีความอื่นคำตอบอาจเปลี่ยน

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Week13 - Hamilton Circuits and Paths]] (คู่ขนาน: ผ่านทุกจุดยอดพอดี 1 ครั้ง)
  * [[Week12 - Paths, Circuits and Connectedness]] (นิยาม path, circuit, simple ที่ใช้ในบทนี้)
  * [[Week11 - Graphs, Graph Terminology and Representing Graphs]] (degree, multigraph, directed graph, in-degree และ out-degree)
  * [[HW-Discrete-Math-05]] (แบบฝึกหัดพร้อมเฉลย Section A-B)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/Discrete Mathematics/DM_Week13.pdf` (25 slides, Dr. Sirasit Lochanachit)
