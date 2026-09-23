# แบบฝึกหัด Discrete Mathematics Week 10 — Relations

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** HW-Discrete-Math-03
* **หัวข้อ:** Relations, Properties of Relations, n-ary Relations, Matrices, Digraphs
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/HW-Discrete-Math-03.md`
* **Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week10.pdf`

---

## Section A: Relations & Cartesian Product

### ข้อ A1: Cartesian Product
กำหนดให้ $A = \{1, 2, 3\}$ และ $B = \{a, b\}$

1. จงหา $A \times B$
2. จงหา $B \times A$
3. $A \times B = B \times A$ หรือไม่? เพราะเหตุใด?
4. $|A \times B| = ?$

<details>
<summary>เฉลย</summary>

1. $A \times B = \{(1,a),(1,b),(2,a),(2,b),(3,a),(3,b)\}$

2. $B \times A = \{(a,1),(a,2),(a,3),(b,1),(b,2),(b,3)\}$

3. **ไม่เท่ากัน** — $(1,a) \in A \times B$ แต่ $(1,a) \notin B \times A$ (ลำดับต่างกัน)

4. $|A \times B| = |A| \times |B| = 3 \times 2 = \mathbf{6}$

</details>

---

### ข้อ A2: Relations on a Set
กำหนดให้ $A = \{1, 2, 3, 4\}$ และ $R = \{(a,b) \mid a \text{ divides } b\}$

1. จงหา R (ระบุ ordered pairs ทั้งหมด)
2. $(2,6) \in R$ หรือไม่? (อธิบาย)
3. $(3,6) \in R$ หรือไม่? (อธิบาย แต่ทราบว่า domain คือ A ไม่ใช่ทุกจำนวน)

<details>
<summary>เฉลย</summary>

1. ต้องหา pair $(a,b)$ ที่ $a \mid b$ โดย $a, b \in \{1,2,3,4\}$:
   - 1 divides: 1,2,3,4
   - 2 divides: 2,4
   - 3 divides: 3
   - 4 divides: 4

$$R = \{(1,1),(1,2),(1,3),(1,4),(2,2),(2,4),(3,3),(4,4)\}$$

2. $(2,6) \notin R$ — เพราะ 6 ไม่อยู่ใน $A = \{1,2,3,4\}$

3. $(3,6) \notin R$ — เหตุผลเดียวกัน 6 ไม่ใช่ element ของ $A$

</details>

---

### ข้อ A3: Functions vs Relations
จงบอกว่า relation ต่อไปนี้เป็น function หรือไม่ พร้อมเหตุผล

1. $R = \{(1,a),(2,a),(3,b)\}$ จาก $\{1,2,3\}$ ไป $\{a,b\}$
2. $R = \{(1,a),(1,b),(2,a)\}$ จาก $\{1,2\}$ ไป $\{a,b\}$
3. $R = \{(1,a),(3,b)\}$ จาก $\{1,2,3\}$ ไป $\{a,b\}$

<details>
<summary>เฉลย</summary>

1. **เป็น function** ✅ — ทุก input (1,2,3) มี output เดียว

2. **ไม่เป็น function** ❌ — input 1 มีสอง output คือ a และ b

3. **ไม่เป็น function** ❌ — input 2 ไม่มี output (ไม่ครบ domain)

</details>

---

## Section B: Properties of Relations

### ข้อ B1: ระบุ Properties
กำหนดให้ Relations บนเซต $A = \{1, 2, 3, 4\}$:

$$R_1 = \{(1,1),(1,2),(2,1),(2,2),(3,4),(4,1),(4,4)\}$$
$$R_3 = \{(1,1),(1,2),(1,4),(2,1),(2,2),(3,3),(4,1),(4,4)\}$$
$$R_4 = \{(2,1),(3,1),(3,2),(4,1),(4,2),(4,3)\}$$
$$R_5 = \{(1,1),(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(3,3),(3,4),(4,4)\}$$

จงระบุว่า relation ใดมี property Reflexive, Symmetric, Antisymmetric, Transitive บ้าง

<details>
<summary>เฉลย</summary>

| | Reflexive | Symmetric | Antisymmetric | Transitive |
|:---:|:---:|:---:|:---:|:---:|
| $R_1$ | ❌ ขาด (3,3) | ❌ มี (3,4) ไม่มี (4,3) | ❌ มี (1,2)∧(2,1) แต่ 1≠2 | ❌ (3,4)∧(4,1) ต้องมี (3,1) |
| $R_3$ | ✅ มี (1,1)(2,2)(3,3)(4,4) | ✅ ทุก pair มี pair กลับ | ❌ มี (1,2)∧(2,1) | ✅ |
| $R_4$ | ❌ ไม่มี (a,a) | ❌ มี (2,1) ไม่มี (1,2) | ✅ ไม่มี pair สองทาง | ✅ |
| $R_5$ | ✅ มี (1,1)(2,2)(3,3)(4,4) | ❌ มี (1,2) ไม่มี (2,1) | ✅ เป็น ≤ ไม่มีสองทาง | ✅ |

</details>

---

### ข้อ B2: Relations บนจำนวนเต็ม
กำหนดให้:
- $R_1 = \{(a,b) \mid a \leq b\}$
- $R_4 = \{(a,b) \mid a = b\}$
- $R_5 = \{(a,b) \mid a = b + 1\}$

สำหรับแต่ละ relation จงตรวจสอบ: Reflexive, Symmetric, Antisymmetric, Transitive

<details>
<summary>เฉลย</summary>

**$R_1$: $a \leq b$**
- Reflexive ✅: $a \leq a$
- Symmetric ❌: $1 \leq 2$ แต่ $2 \not\leq 1$
- Antisymmetric ✅: $a \leq b$ และ $b \leq a$ → $a = b$
- Transitive ✅: $a \leq b \leq c$ → $a \leq c$

**$R_4$: $a = b$**
- Reflexive ✅: $a = a$
- Symmetric ✅: $a = b$ → $b = a$
- Antisymmetric ✅: เงื่อนไขเป็น vacuously true (ถ้า $a=b$ และ $b=a$ ก็คือ $a=b$)
- Transitive ✅: $a = b = c$ → $a = c$
- **→ Equivalence Relation ✅**

**$R_5$: $a = b + 1$**
- Reflexive ❌: $a \neq a + 1$
- Symmetric ❌: $a = b+1$ → $b = a-1 \neq a+1$
- Antisymmetric ✅: ถ้า $a=b+1$ และ $b=a+1$ → $a = a+2$ ขัดแย้ง → ไม่มี pair สองทาง
- Transitive ❌: $(3,2) \in R$, $(2,1) \in R$ แต่ $(3,1) \notin R$ ($3 \neq 1+1$)

</details>

---

### ข้อ B3: Equivalence Relation
จงตรวจสอบว่า Relations ต่อไปนี้เป็น Equivalence Relation หรือไม่ พร้อมเหตุผล

1. $R = \{(a,b) \mid a \equiv b \pmod{3}\}$ บน $\mathbb{Z}$
2. $R = \{(a,b) \mid a > b\}$ บน $\mathbb{Z}$

ถ้าเป็น equivalence relation จงหา equivalence classes ของ $[0]_R$ และ $[1]_R$

<details>
<summary>เฉลย</summary>

**1. $R$: $a \equiv b \pmod{3}$**
- Reflexive ✅: $a \equiv a \pmod{3}$ เสมอ
- Symmetric ✅: ถ้า $a \equiv b$ แล้ว $b \equiv a \pmod{3}$
- Transitive ✅: ถ้า $a \equiv b$ และ $b \equiv c$ แล้ว $a \equiv c \pmod{3}$
- **→ Equivalence Relation ✅**

Equivalence classes:
$$[0]_R = \{\ldots, -6, -3, 0, 3, 6, 9, \ldots\}$$
$$[1]_R = \{\ldots, -5, -2, 1, 4, 7, 10, \ldots\}$$
$$[2]_R = \{\ldots, -4, -1, 2, 5, 8, 11, \ldots\}$$

**2. $R$: $a > b$**
- Reflexive ❌: $a \not> a$
- **→ ไม่เป็น Equivalence Relation ❌** (ต้องเป็น reflexive ด้วย)

</details>

---

## Section C: n-ary Relations & Databases

### ข้อ C1: Degree of Relation
กำหนดให้ relation $R$ เป็นเซตของ tuples $(StudentID, Name, Course, Grade)$

```
R = {
  (1001, "Alice", "CS101", "A"),
  (1002, "Bob",   "CS101", "B"),
  (1001, "Alice", "MATH201", "A+")
}
```

1. Degree ของ $R$ คือเท่าไร?
2. Domain ของแต่ละตำแหน่งคืออะไร?
3. Primary Key ของ relation นี้คืออะไร (เลือกจาก StudentID, Name, Course)?
4. ทำไม Name ถึงเป็น Primary Key ไม่ได้?

<details>
<summary>เฉลย</summary>

1. Degree = **4** (มี 4 components)

2. Domains:
   - ตำแหน่ง 1: เซตของ Student IDs
   - ตำแหน่ง 2: เซตของ Names
   - ตำแหน่ง 3: เซตของ Courses
   - ตำแหน่ง 4: เซตของ Grades (A, B, C, ...)

3. **StudentID + Course** (Composite Key) — StudentID อย่างเดียวไม่พอเพราะ Alice ลงสองวิชา; ต้องใช้ทั้งคู่

4. Name ไม่ใช่ Primary Key เพราะ:
   - อาจมีนักศึกษาชื่อซ้ำกันได้ (ไม่ unique)
   - "Alice" ปรากฏสอง tuple

</details>

---

## Section D: Zero-One Matrices

### ข้อ D1: สร้าง Matrix
กำหนดให้ $A = \{1, 2, 3\}$, $B = \{1, 2, 3, 4\}$
$R = \{(a,b) \mid a \leq b\}$ จาก $A$ ไป $B$

1. จงหา ordered pairs ทั้งหมดใน $R$
2. จงสร้าง matrix $M_R$

<details>
<summary>เฉลย</summary>

1. Pairs: $(1,1),(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(3,3),(3,4)$

2. Matrix $M_R$ (row = A, col = B):

$$M_R = \begin{pmatrix} 1 & 1 & 1 & 1 \\ 0 & 1 & 1 & 1 \\ 0 & 0 & 1 & 1 \end{pmatrix}$$

</details>

---

### ข้อ D2: อ่าน Properties จาก Matrix
กำหนดให้ $R$ บน $\{1,2,3\}$ แทนด้วย matrix:

$$M_R = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}$$

จงตรวจสอบว่า $R$ เป็น Reflexive, Symmetric, Antisymmetric หรือไม่

<details>
<summary>เฉลย</summary>

- **Reflexive?** → Diagonal: $m_{11}=1, m_{22}=1, m_{33}=1$ → ✅
- **Symmetric?** → $m_{12}=0=m_{21}$, $m_{13}=1=m_{31}$, $m_{23}=0=m_{32}$ → matrix สมมาตร → ✅
- **Antisymmetric?** → $m_{13}=1$ และ $m_{31}=1$ แต่ $1 \neq 3$ → ❌

**สรุป:** Reflexive ✅, Symmetric ✅, Antisymmetric ❌

</details>

---

## Section E: Digraphs

### ข้อ E1: อ่าน Properties จาก Digraph
กำหนดให้ Digraph บน $\{a, b, c\}$ มี edges:
$$E = \{(a,a),(b,b),(c,c),(a,b),(b,a),(b,c),(a,c)\}$$

จงตรวจสอบ: Reflexive, Symmetric, Antisymmetric, Transitive
และระบุว่าเป็น Equivalence Relation หรือไม่

<details>
<summary>เฉลย</summary>

- **Reflexive?** → มี $(a,a),(b,b),(c,c)$ ครบ → ✅
- **Symmetric?** → $(a,b) \in E$ และ $(b,a) \in E$ ✅; $(b,c) \in E$ แต่ $(c,b) \notin E$ ❌ → **ไม่ symmetric**
- **Antisymmetric?** → $(a,b)$ และ $(b,a)$ ∈ E แต่ $a \neq b$ → ❌
- **Transitive?** → $(a,b)$ และ $(b,c)$ ∈ E → ต้องมี $(a,c)$ ✅; $(b,a)$ และ $(a,b)$ ∈ E → ต้องมี $(b,b)$ ✅; $(b,a)$ และ $(a,c)$ ∈ E → ต้องมี $(b,c)$ ✅ → **Transitive ✅**

**สรุป:** Reflexive ✅, Symmetric ❌, Antisymmetric ❌, Transitive ✅

**Equivalence Relation?** → ❌ (ต้องเป็น Symmetric ด้วย)

</details>

---

### ข้อ E2: วิเคราะห์ Real-World
จงจับคู่ Property กับ Real-World Scenario ต่อไปนี้:

1. ถ้า Course A เป็น prerequisite ของ B และ B เป็น prerequisite ของ C → A เป็น prerequisite ของ C
2. ทุก Student มี Student ID ของตัวเอง
3. ถ้า A เป็นเพื่อนกับ B บน Facebook แล้ว B เป็นเพื่อนกับ A ด้วย
4. ถ้า A เป็น prerequisite ของ B และ B เป็น prerequisite ของ A → A = B (คือ course เดียวกัน)

Properties ได้แก่: Reflexive, Symmetric, Antisymmetric, Transitive

<details>
<summary>เฉลย</summary>

1. → **Transitive** (chain: A→B→C implies A→C)
2. → **Reflexive** (ทุก element สัมพันธ์กับตัวเอง)
3. → **Symmetric** (mutual friendship)
4. → **Antisymmetric** (two-way only when equal)

</details>

---

## สรุปแบบฝึกหัด

| Section | หัวข้อ | จำนวนข้อ | ความยาก |
|:---:|:---|:---:|:---:|
| A | Relations & Cartesian Product | 3 ข้อ | ⭐⭐ |
| B | Properties of Relations | 3 ข้อ | ⭐⭐⭐ |
| C | n-ary Relations & Databases | 1 ข้อ | ⭐⭐ |
| D | Zero-One Matrices | 2 ข้อ | ⭐⭐⭐ |
| E | Digraphs | 2 ข้อ | ⭐⭐⭐ |
