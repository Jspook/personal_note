# HW-Discrete-Math-04: Week12 Bipartite Matching, Paths, Connectivity

> **วิชา:** Discrete Mathematics | **ที่มาของโจทย์:** `Resources/Books/Discrete Mathematics/DM_Week12.pdf` (51 slides) และ `Resources/References/` (Matchings, Paths/Cuts/Connectivity, Roadblocks)
> **โน้ตประกอบ:** [[Week12 - Bipartite Graphs and Matchings]], [[Week12 - Paths, Circuits and Connectedness]], [[Week12 - Cut Vertices, Edge Cuts and Connectivity]], [[Week12 - Road Network Connectivity Barcelona vs Bangkok]]
> **ป้ายแหล่งที่มา:** `[p.N]` = สไลด์ใน DM_Week12.pdf, `[R1]` Matchings, `[R2]` Paths/Cuts/Connectivity, `[R3]` Roadblocks โจทย์ที่ถามบนรูปในสไลด์โดยสไลด์ไม่เฉลย ผู้เขียนอ่านกราฟจากรูปแล้วคำนวณเฉลย (คำนวณโดยไล่ทุกเซตย่อยสำหรับ κ, λ และ matching จาก edges ที่ผู้เขียนอ่าน อาจอ่านรูปผิดได้) ข้อที่ผู้เขียนคิดโจทย์เองติดป้าย "โจทย์สมมติ" ส่วนที่เพิ่มเกินสไลด์และ reference ติดป้าย `[Source: generated — not verified against original document]`
> **ระดับความยาก:** ⭐ จำ/เข้าใจพื้นฐาน | ⭐⭐ อธิบาย/เปรียบเทียบ | ⭐⭐⭐ วิเคราะห์/พิสูจน์/ประยุกต์
> **หมายเหตุ:** สไลด์ p.2-9 ทบทวนเรื่อง directed graph และกราฟพิเศษจาก Week11 จึงไม่ออกโจทย์ซ้ำ ดู [[Week11 - Graphs, Graph Terminology and Representing Graphs]]

---

## Section A: Bipartite graph (Example 5-6, Exercise 5-6) ระดับ ⭐

**A1.** (Example 5 [p.11]) K₃ เป็น bipartite หรือไม่ เพราะอะไร

<details><summary>เฉลย</summary>

ไม่ใช่ K₃ เป็นสามเหลี่ยม (cycle ความยาว 3) แบ่งจุดเป็น 2 เซตไม่ได้โดยไม่ให้มี edge ภายในเซตเดียวกัน [p.11] (วิธี 2-Coloring และ odd cycle ดู [[Week11 - Graphs, Graph Terminology and Representing Graphs]]) `[Source: generated — not verified against original document]`
</details>

**A2.** (Example 6 [p.12]) C₅ เป็น bipartite หรือไม่

<details><summary>เฉลย</summary>

ไม่ใช่ C₅ เป็น cycle ความยาว 5 (คี่) ระบายสี 2 สีสลับกันไม่ได้ [p.12] `[Source: generated — not verified against original document]`
</details>

**A3.** (Exercise 5 [p.13]) กราฟ 7 จุด a, b, c, d, e, f, g มี edges g–a, g–d, a–f, a–e, a–c, b–f, b–e, b–c, f–d, e–d, c–d เป็น bipartite หรือไม่ ถ้าใช่ให้ระบุ V₁ กับ V₂

<details><summary>เฉลย</summary>

เป็น bipartite โดย V₁ = {a, b, d} และ V₂ = {g, f, e, c} ทุก edge ข้ามระหว่างสองเซต และไม่มี edge ภายในเซตเดียวกัน (edges ทั้ง 11 เส้นเป็นข้อมูลที่อ่านจากรูป [p.13]) `[Source: generated — not verified against original document]`
</details>

**A4.** (Exercise 6 [p.14]) กราฟ 6 จุด a-f มี edges a–b, a–f, a–e, b–f, b–e, b–c, b–d, f–c, f–e, f–d, e–d, c–d เป็น bipartite หรือไม่

<details><summary>เฉลย</summary>

ไม่ใช่ มีสามเหลี่ยม a–b–f (edges a–b, b–f, f–a) ซึ่งเป็น odd cycle [p.14] `[Source: generated — not verified against original document]`
</details>

---

## Section B: Matching และ job assignment ระดับ ⭐⭐

**B1.** นิยาม matching, maximum matching และ complete matching จาก V₁ ไป V₂ ตามสไลด์

<details><summary>เฉลย</summary>

* Matching M ใน simple graph G = (V, E) คือเซตย่อยของ E ที่ไม่มี 2 edges ใด incident กับจุดยอดเดียวกัน [p.20]
* Maximum matching คือ matching ที่มีจำนวน edges มากที่สุด [p.21]
* Complete matching จาก V₁ ไป V₂ คือ matching ที่ทุกจุดใน V₁ เป็น endpoint ของ edge ใน matching หรือ |M| = |V₁| [p.22]
</details>

**B2.** (Task [p.18, 23]) จากกราฟงานและพนักงาน (Alvarez: requirements, testing / Berkowitz: architecture, implementation, testing / Chen: requirements, architecture, implementation / Davis: requirements) จงหา complete matching จากเซตของงานไปเซตของพนักงาน และบอกว่าเป็น maximum และ perfect ด้วยหรือไม่

<details><summary>เฉลย</summary>

M = {Davis–requirements, Chen–architecture, Berkowitz–implementation, Alvarez–testing} (ตรงกับเส้นสีฟ้าในรูป [p.18, 23]) ใช้ครบทั้ง 4 งาน |M| = 4 = |V₁| จึงเป็น complete matching เพราะทุก matching มีขนาดไม่เกิน |V₁| = 4 จึงเป็น maximum ด้วย และเพราะ |V₁| = |V₂| = 4 และทุกจุดถูก match จึงเป็น perfect matching [R1] `[Source: generated — not verified against original document]`
</details>

**B3.** (Task [p.19, 24]) จากกราฟ Washington: architecture / Xuan: requirements, implementation, testing / Ybarra: architecture / Ziegler: requirements, architecture, testing มี complete matching จากงานไปพนักงานหรือไม่ ถ้าไม่มี maximum matching มีกี่ edges

<details><summary>เฉลย</summary>

ไม่มี ให้ A = {requirements, implementation, testing} จะได้ N(A) = {Xuan, Ziegler} |N(A)| = 2 < |A| = 3 ผิด Hall's condition [p.26] maximum matching มี 3 edges เช่น implementation–Xuan, requirements–Ziegler, architecture–Washington งาน testing ไม่เหลือพนักงาน เพราะ Xuan กับ Ziegler ถูกใช้แล้ว และ matching ขนาด 4 ต้องใช้งานครบ 4 งานซึ่งขัดกับผลของ Hall `[Source: generated — not verified against original document]`
</details>

**B4.** (Marriages on an Island [p.25]) มีผู้ชาย 3 คน (V₁) และผู้หญิง 2 คน (V₂) complete matching ของ V₁ มีได้หรือไม่ เพราะอะไร (โจทย์สมมติ)

<details><summary>เฉลย</summary>

ไม่ได้ complete matching ของ V₁ ต้องมี |M| = |V₁| = 3 แต่ edge ใน matching แต่ละเส้นต้องใช้ผู้หญิงคนละคน และมีผู้หญิงแค่ 2 คน จึงได้อย่างมาก 2 คู่ ตรงกับเงื่อนไข |V₁| ≤ |V₂| ของ complete matching [R1]; maximum matching ในกรณีนี้มีได้อย่างมาก 2 คู่ [p.25] `[Source: generated — not verified against original document]`
</details>

---

## Section C: Hall, maximal/maximum, augmenting path ระดับ ⭐⭐⭐

**C1.** ([R1]) นักศึกษา Ploy, Kai, Nok, Ton, Fah กับห้อง 101-105: Ploy–101, Ploy–102, Kai–102, Kai–103, Nok–101, Nok–103, Ton–101, Ton–102, Ton–103, Fah–103, Fah–104, Fah–105 จงแสดงว่าไม่มี complete matching จากนักศึกษาไปห้อง

<details><summary>เฉลย</summary>

ให้ A = {Ploy, Kai, Nok, Ton} ได้ N(A) = {101, 102, 103} |N(A)| = 3 < |A| = 4 ผิด Hall's condition (Theorem 4 [p.26]) จึงไม่มี complete matching [R1] ทุกเซตย่อยที่เล็กกว่าผ่านเงื่อนไข ดังนั้นต้องตรวจทุกเซตย่อย
</details>

**C2.** ([R1]) พิสูจน์ว่า Hall's condition เป็นเงื่อนไขจำเป็น (⇒)

<details><summary>เฉลย</summary>

ถ้า M เป็น complete matching ทุกจุดใน A ⊆ V₁ ถูกจับคู่กับจุดต่างกัน |A| จุดใน V₂ และจุดเหล่านั้นทั้งหมดอยู่ใน N(A) จึง |N(A)| ≥ |A| [R1]
</details>

**C3.** ([R1] นักศึกษา Anan, Bua, Chai, Dao กับโปรเจกต์ Web, AI, Game, IoT: Anan–Web, Anan–AI, Bua–Web, Chai–AI, Chai–Game, Chai–IoT, Dao–Game) จงหา maximal matching ขนาด 2 ที่ไม่ใช่ maximum และ maximum matching

<details><summary>เฉลย</summary>

Maximal ขนาด 2: M = {Anan–Web, Chai–Game} ทุก edge ที่เหลือแตะ Anan, Chai, Web หรือ Game จึงเพิ่มไม่ได้ [R1] Maximum ขนาด 4 = ν(G): {Anan–AI, Bua–Web, Chai–IoT, Dao–Game} [R1 ระบุขนาด 4, edges ผู้เขียนตรวจ] ยืนยันว่า maximal ไม่จำเป็นต้อง maximum `[Source: generated — not verified against original document]`
</details>

**C4.** (โจทย์สมมติ) งาน J1, J2, J3 มีผู้ทำได้ N(J1) = {E1}, N(J2) = {E1}, N(J3) = {E2, E3} มี complete matching จากงานไปพนักงานหรือไม่

<details><summary>เฉลย</summary>

ไม่มี ให้ A = {J1, J2} ได้ N(A) = {E1} |N(A)| = 1 < 2 = |A| ผิด Hall's condition [p.26] (J1 กับ J2 แย่ง E1 คนเดียวกัน) `[Source: generated — not verified against original document]`
</details>

**C5.** (โจทย์สมมติ) นักศึกษา s1, s2 กับโปรเจกต์ p1, p2 มี edges s1–p1, s1–p2, s2–p1 และ M = {s1–p1} จงหา augmenting path และสลับให้ได้ maximum matching

<details><summary>เฉลย</summary>

augmenting path คือ s2, p1, s1, p2 (ลำดับจุดยอดบน path; edges s2–p1 นอก M, p1–s1 ใน M, s1–p2 นอก M เริ่มที่ s2 unmatched และจบที่ p2 unmatched) สลับได้ M ⊕ P = {s2–p1, s1–p2} ขนาด 2 ตามทฤษฎีบท Berge matching นี้เป็น maximum เพราะไม่เหลือ augmenting path [R1] `[Source: generated — not verified against original document]`
</details>

---

## Section D: Path, circuit และ connectedness ระดับ ⭐

**D1.** ([p.30]) กราฟ 6 จุดที่ p.30 มี edges a–b, b–c, d–e, e–f, a–d, b–e, c–f, a–e, b–f, c–d จงจำแนกลำดับต่อไปนี้ว่าเป็น path, circuit และ simple หรือไม่: (1) a, d, c, f, e (2) d, e, c, a (3) b, c, f, e, b (4) a, b, e, d, a, b

<details><summary>เฉลย</summary>

1. a, d, c, f, e: edges {a,d}, {d,c}, {c,f}, {f,e} ครบและไม่ซ้ำ จึงเป็น simple path ยาว 4 [p.30]
2. d, e, c, a: ไม่มี edge {e, c} จึงไม่ใช่ path
3. b, c, f, e, b: เริ่มและจบที่ b ไม่ซ้ำ edge จึงเป็น simple circuit ยาว 4
4. a, b, e, d, a, b: เป็น path ยาว 5 ใช้ edge {a, b} สองครั้ง จึงไม่ simple

(ข้อ 2-4 ผู้เขียนตรวจจากรูป เพราะสไลด์เขียน edges เฉพาะข้อ 1) `[Source: generated — not verified against original document]`
</details>

**D2.** ความยาวของ path และ circuit นับจากอะไร และ circuit สั้นที่สุดในกราฟ simple ยาวเท่าไร

<details><summary>เฉลย</summary>

ความยาวคือจำนวน edges [p.28] circuit ต้องมีความยาวมากกว่า 0 และเริ่มจบจุดเดียวกัน [p.29] ใน simple graph simple circuit สั้นที่สุดยาว 3 เพราะ u, v, u ใช้ edge {u, v} สองครั้ง [R2]
</details>

**D3.** Six degrees of separation หมายถึง path ยาวเท่าไร และ Bacon number ของนักแสดง c คืออะไร

<details><summary>เฉลย</summary>

โซ่ไม่เกิน 6 คน คือ path ยาวไม่เกิน 5 [p.32] Bacon number ของนักแสดง c คือความยาวของ shortest path ระหว่าง c กับ Kevin Bacon ในกราฟ Hollywood [p.33]
</details>

**D4.** ([p.37]) G₁ (a–b, a–c, b–c, c–f, c–d, f–d, f–g, d–e) และ G₂ (a–b, a–c, e–d, e–f, d–f) กราฟไหน connected ถ้าไม่ connected มี components อะไรบ้าง

<details><summary>เฉลย</summary>

G₁ connected (ทุกจุดมี path ถึงกัน) G₂ disconnected มี 2 components คือ {a, b, c} และ {d, e, f} [p.36-37] (สไลด์ไม่เฉลย ผู้เขียนอ่านจากรูป) `[Source: generated — not verified against original document]`
</details>

**D5.** ([p.38]) กราฟ H ในรูปมี connected component กี่ก้อน อะไรบ้าง

<details><summary>เฉลย</summary>

3 ก้อน คือ H₁ (สามเหลี่ยม a, b, c), H₂ (edge d–e) และ H₃ (path f–g–h) ซึ่ง disjoint กันและ union เป็น H [p.38]
</details>

**D6.** ([p.39]) กราฟซ้าย (i, j, k, l, m, n, o, x) และกราฟขวา (x, y, z, v, u, w) กราฟไหน connected

<details><summary>เฉลย</summary>

กราฟซ้าย connected กราฟขวา disconnected: {x, y, z, v} เชื่อมกันครบทุกคู่ ส่วน u และ w เชื่อมกันเองด้วยเส้นโค้ง 2 เส้นและไม่มี edge ไปกลุ่มแรก จึงมี components {x, y, z, v} และ {u, w} [p.39] (ผู้เขียนอ่านจากรูป) `[Source: generated — not verified against original document]`
</details>

**D7.** ([R2]) ในกราฟ a–b, a–c, b–c, c–d, c–e, d–e, e–f, f–g จงจำแนก a, b, c, a, b และ a, b, c, d, e, c, a

<details><summary>เฉลย</summary>

a, b, c, a, b: path ยาว 4 ไม่ simple เพราะใช้ edge a–b ซ้ำ; a, b, c, d, e, c, a: simple circuit ยาว 6 (ไม่ซ้ำ edge แม้เยี่ยมจุด c สองครั้ง) [R2]
</details>

---

## Section E: Cut vertex และ cut edge ระดับ ⭐⭐

**E1.** ([p.41]) กราฟ G₁ มี edges a–b, b–d, b–c, d–c, c–e, e–f, e–g, f–g, g–h, e–h จงหา cut vertices และ cut edges

<details><summary>เฉลย</summary>

Cut vertex: b (ลบแล้ว a โดดเดี่ยว), c (แยก {a, b, d} จาก {e, f, g, h}), e (แยก {a, b, c, d} จาก {f, g, h}) Cut edge: {a, b} และ {c, e} [p.40-41] (สไลด์ไม่เฉลย ผู้เขียนอ่าน edges จากรูปและตรวจด้วยสคริปต์) `[Source: generated — not verified against original document]`
</details>

**E2.** ทำไม K<sub>n</sub> (n ≥ 3) ไม่มี cut vertex

<details><summary>เฉลย</summary>

ลบจุดยอดหนึ่งจุดพร้อม incident edges ได้ K<sub>n−1</sub> ซึ่งยัง connected [p.42]
</details>

**E3.** ([p.43]) แสดงว่า {b, c, e} เป็น vertex cut ในกราฟที่ p.43 (edges a–b, b–c, d–e, e–f, a–d, b–e, c–f, a–e, b–f, c–d)

<details><summary>เฉลย</summary>

ลบ b, c, e (พร้อม edges ที่ติดกัน) เหลือจุด a, d, f กับ edge a–d เท่านั้น จุด f ไม่มี edge เหลือ จึง disconnected ({a, d} กับ {f}) [p.43] `[Source: generated — not verified against original document]`
</details>

**E4.** ([R2]) edge เป็น cut edge เมื่อไร และในกราฟ G₁ ของ E1 edge {b, d} เป็น cut edge หรือไม่

<details><summary>เฉลย</summary>

edge เป็น cut edge ก็ต่อเมื่อไม่อยู่บน simple circuit ใดเลย [R2] edge {b, d} อยู่บนสามเหลี่ยม b–d–c จึงไม่ใช่ cut edge `[Source: generated — not verified against original document]`
</details>

---

## Section F: κ(G), λ(G) และ Whitney ระดับ ⭐⭐⭐

**F1.** ([p.46]) จงหา κ(G) ของ G₂, G₃, G₄, G₅ edges ที่อ่านจากรูป:
* G₂: a–b, a–c, b–c, c–d, d–e, e–f, f–c
* G₃: a–b, a–g, b–g, b–c, c–d, c–f, d–e, e–f, f–g
* G₄: a–b, a–g, a–f, b–g, b–c, c–d, c–e, c–f, d–e, d–f, e–f, g–f
* G₅: a–b, a–h, a–g, b–c, b–g, b–h, b–d, c–d, c–f, c–g, c–e, d–e, d–f, e–f, f–g, f–h, g–h

<details><summary>เฉลย</summary>

* G₂: κ = 1 (cut vertex c)
* G₃: κ = 2 (ไม่มี cut vertex, vertex cut {b, g} แยก a)
* G₄: κ = 2 (ไม่มี cut vertex, vertex cut {c, f} แยก {a, b, g} จาก {d, e})
* G₅: κ = 3 (vertex cut {b, g, h} แยก a ออก ไม่มีเซตขนาด 2 ที่ทำให้ disconnected)

(สไลด์ไม่เฉลย ผู้เขียนไล่ทุกเซตย่อยจาก edges ที่อ่านจากรูป) [โจทย์ p.46] `[Source: generated — not verified against original document]`
</details>

**F2.** ([p.49]) จงหา λ(G) ของกราฟชุดเดียวกัน

<details><summary>เฉลย</summary>

* G₂: λ = 2 (ไม่มี cut edge เพราะ a–b–c เป็นสามเหลี่ยมและ c–d–e–f เป็นสี่เหลี่ยม edge cut ขนาด 2 เช่น {a–c, b–c})
* G₃: λ = 2 (edge cut {a–b, a–g})
* G₄: λ = 3 (edge cut {b–c, a–f, g–f} แยก {a, b, g} ออก ไม่มี edge cut ขนาด 2)
* G₅: λ = 3 (ลบ a–b, a–g, a–h แยก a ออก)

[โจทย์ p.49] `[Source: generated — not verified against original document]`
</details>

**F3.** ตรวจ Whitney's inequality κ(G) ≤ λ(G) ≤ δ(G) กับ G₂-G₅ ของ F1

<details><summary>เฉลย</summary>

δ(G₂) = 2 (a, b มี degree 2): 1 ≤ 2 ≤ 2; δ(G₃) = 2 (a, d, e มี degree 2): 2 ≤ 2 ≤ 2; δ(G₄) = 3: 2 ≤ 3 ≤ 3 (κ < λ); δ(G₅) = 3 (a, e มี degree 3): 3 ≤ 3 ≤ 3 ทุกกราฟเป็นไปตามอสมการ [R2] `[Source: generated — not verified against original document]`
</details>

**F4.** ค่า κ ของ K₅ และของกราฟจุดเดียว K₁ ตามนิยามคือเท่าไร และทำไมสไลด์ p.45 กับ [R2] อธิบายกรณี κ = 0 ต่างกัน

<details><summary>เฉลย</summary>

κ(K₅) = 5 − 1 = 4 (กำหนดโดยนิยาม [p.44]) κ(K₁) = 1 − 1 = 0 ตามนิยามเดียวกัน สไลด์ p.45 เขียน "κ(G) = 0 iff G is disconnected" ซึ่งไม่ครอบคลุม K₁ ที่ connected แต่มี κ = 0 [R2] เพิ่มกรณี G = K₁ `[Source: generated — not verified against original document]`
</details>

**F5.** ([R2]) K₄ สองก้อน (บน a, b, c, d และบน e, f, g, h) เชื่อมด้วย d–e และ d–f จงหา κ, λ, δ

<details><summary>เฉลย</summary>

κ(G) = 1 (ลบ d), λ(G) = 2 (ลบ d–e กับ d–f), δ(G) = 3 (เช่น deg a = 3) จึงเป็นตัวอย่างที่ κ < λ < δ [R2]
</details>

---

## Section G: เครือข่ายถนนและความน่าเชื่อถือ ระดับ ⭐⭐⭐

**G1.** ([R3]) พิสูจน์ว่า grid graph m × n (m, n ≥ 2) มี κ = λ = 2

<details><summary>เฉลย</summary>

มุมมี degree 2 จึง λ ≤ δ = 2 สำหรับ κ ≥ 2: ลบจุด x ใดๆ เลือกแถวและคอลัมน์ที่ไม่ผ่าน x รวมกันเป็นกากบาทที่ connected จุด u อื่นอยู่ในแถวที่ไม่ผ่าน x หรือในคอลัมน์ที่ไม่ผ่าน x แล้ววิ่งตามเส้นนั้นจนชนกากบาท ไม่มีจุดเดียวที่ทำให้ disconnected จึง κ ≥ 2 Whitney ให้ 2 ≤ κ ≤ λ ≤ 2 [R3]
</details>

**G2.** ([R3]) ทำไมทุก edge ของต้นไม้เป็น bridge

<details><summary>เฉลย</summary>

ต้นไม้มี path เดียวระหว่างจุดสองจุดใดๆ ลบ edge uv ทำลาย path u–v เส้นเดียวนั้น u กับ v จึงอยู่คนละ component [R3]
</details>

**G3.** ([R3]) สามเหลี่ยมสองรูปใช้จุดร่วมจุดเดียว (bowtie) มี κ, λ เท่าไร และอธิบายเป็นเมือง

<details><summary>เฉลย</summary>

κ = 1, λ = 2 สองย่านที่เชื่อมกันดีมาบรรจบที่วงเวียนเดียว อุบัติเหตุที่วงเวียนแบ่งเมืองได้ แต่ถ้าปิดถนนต้องปิด 2 เส้น [R3]
</details>

**G4.** ([R3]) ต้นไม้ของ bridges ใน model Bangkok มี p = 31 ใบ ต้องเพิ่ม edge ใหม่อย่างน้อยกี่เส้นเพื่อให้เป็น 2-edge-connected

<details><summary>เฉลย</summary>

⌈31/2⌉ = 16 เส้น (Eswaran และ Tarjan 1976 ตามที่ [R3] อ้าง) [R3]
</details>

**G5.** ([R3]) กราฟ connected ทำเป็นถนนทางเดียวให้ทุกคนไปถึงทุกปลายทางได้เมื่อใด

<details><summary>เฉลย</summary>

เมื่อไม่มี bridge (Robbins' theorem 1939) grid ของ Barcelona ผ่านเกณฑ์ ส่วน bridge ใน Bangkok เช่นซอยตันต้องเป็นสองทาง [R3]
</details>

**G6.** ([R3]) panel ของ Barcelona แสดง |V| = 52, |E| = 92 และแยกเป็น 2 ส่วน จงคำนวณ independent loops และเทียบกับค่าที่ panel แสดง (42)

<details><summary>เฉลย</summary>

cycle rank = |E| − |V| + c = 92 − 52 + 2 = 42 ตรงกับ panel จึงสรุปได้ว่า panel เป็นค่าหลังปิดสี่แยก ไม่ใช่เครือข่ายตั้งต้น (Bangkok: 99 − 98 + 3 = 4 ตรงกับ panel เช่นกัน) [R3] `[Source: generated — not verified against original document]`
</details>

---

## สรุปแบบฝึกหัด

| Section | หัวข้อ | ระดับ | จำนวนข้อ |
| :--- | :--- | :--- | :--- |
| A | Bipartite | ⭐ | 4 |
| B | Matching และ job assignment | ⭐⭐ | 4 |
| C | Hall, maximal/maximum, augmenting path | ⭐⭐⭐ | 5 |
| D | Path, circuit, connectedness | ⭐ | 7 |
| E | Cut vertex และ cut edge | ⭐⭐ | 4 |
| F | κ, λ, Whitney | ⭐⭐⭐ | 5 |
| G | เครือข่ายถนนและความน่าเชื่อถือ | ⭐⭐⭐ | 6 |
