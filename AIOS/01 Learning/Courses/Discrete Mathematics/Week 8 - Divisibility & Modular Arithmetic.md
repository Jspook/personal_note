# Discrete Mathematics - Week 8: Divisibility & Modular Arithmetic

> **วิชา:** Discrete Mathematics | **สถาบัน:** มหาวิทยาลัย (Dr. Sirasit Lochanachit)
> **Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week8.pdf` (54 slides)

---

## Part 1: Macro Architecture & Overview

**Number Theory (ทฤษฎีจำนวน)** คือสาขาคณิตศาสตร์ที่ศึกษาเกี่ยวกับจำนวนเต็มและคุณสมบัติของมัน แนวคิดหลักคือ Division (การหาร) และ Prime Numbers (จำนวนเฉพาะ) ซึ่งมีความสำคัญในด้าน Computer Science โดยเฉพาะ Cryptography และ Random Number Generation

Week 8 ครอบคลุม 2 หัวข้อหลัก ได้แก่ Divisibility & Modular Arithmetic และ Integer Representations ซึ่งมีความสัมพันธ์กันผ่านการใช้ Division Algorithm และ Modular Operations ในการแปลงฐานตัวเลขและการคำนวณ Exponentiation แบบ Fast

```text
Number Theory (Week 8)
├── 1. Divisibility & Modular Arithmetic
│   ├── 1.1 Division (a | b)
│   │   ├── Definition: a | b iff ∃c: ac = b
│   │   └── Theorem 1: Properties of Division
│   ├── 1.2 Division Algorithm
│   │   └── a = dq + r  (Euclidean Division)
│   └── 1.3 Modular Arithmetic
│       ├── Modulo Operator: a mod d = r
│       ├── Congruence Modulo: a ≡ b (mod m)
│       ├── Theorem 3: a ≡ b (mod m) ↔ a mod m = b mod m
│       ├── Theorem 4: Properties of Congruence
│       └── Modular Operations (Add / Mul / Exp)
└── 2. Integer Representations [AIT/DSBA]
    ├── 2.1 Base b Representations
    ├── 2.2 Base Conversion Algorithm
    └── 2.3 Fast Modular Exponentiation
```

### ตารางเปรียบเทียบ Number Base ที่สำคัญในคอมพิวเตอร์

| Base | ชื่อ | Digits ที่ใช้ | ตัวอย่าง |
| :--- | :--- | :--- | :--- |
| 2 | Binary | 0, 1 | (1011)₂ = 11₁₀ |
| 8 | Octal | 0–7 | (17)₈ = 15₁₀ |
| 10 | Decimal | 0–9 | (15)₁₀ |
| 16 | Hexadecimal | 0–9, A–F | (F)₁₆ = 15₁₀ |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Division (การหาร)

#### นิยาม (Definition)

> 💡 **Intuition:** ความสัมพันธ์ "a หาร b" เหมือนกับการถาม "b แบ่งเป็นกลุ่มละ a ได้พอดีโดยไม่มีเศษหรือไม่" เช่น 4 หาร 12 ลงตัวเพราะเราแบ่ง 12 เป็น 3 กลุ่ม กลุ่มละ 4 ได้พอดี (4 × 3 = 12) แต่ 5 หาร 12 ไม่ลงตัวเพราะแยกไม่ได้พอดี — ความสัมพันธ์นี้สำคัญเพราะเป็นพื้นฐานของการหาตัวประกอบและเศษ
> [Source: generated — not verified against original document]

> **Division:** ถ้า `a` และ `b` เป็นจำนวนเต็มที่ `a ≠ 0` เราบอกว่า **a หาร b** ถ้ามีจำนวนเต็ม `c` ที่ทำให้ `ac = b`

```text
สัญกรณ์ (Notation):
  a | b    →  a หาร b ลงตัว (a divides b)
  a ∤ b    →  a หาร b ไม่ลงตัว

คำศัพท์:
  a  =  divisor / factor / denominator (ตัวหาร)
  b  =  dividend / numerator (ตัวตั้ง)
  b  =  multiple of a (เมื่อ a | b)
```

ตัวอย่าง:
- `4 | 8`   → ✅ เพราะ `4 × 2 = 8`
- `-3 | 9`  → ✅ เพราะ `(-3) × (-3) = 9`
- `10 | 0`  → ✅ เพราะ `10 × 0 = 0`
- `5 | 7`   → ❌ ไม่มีจำนวนเต็ม `c` ที่ `5c = 7`

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "`a | b`" → a หาร b ลงตัว (a divides b)
- "`ถ้ามีจำนวนเต็ม c`" → ต้องหา c ที่เป็นจำนวนเต็มพอดี ไม่ใช่เศษส่วน
- "`a ≠ 0`" → ตัวหารห้ามเป็น 0 (นิยามไม่ครอบคลุม 0 | b)

**ตัวอย่าง:**
- ✅ `3 | 12` เพราะ `3 × 4 = 12` (c = 4 คือจำนวนเต็ม)
- ❌ `7 | 12` เพราะต้อง `c = 12/7` ซึ่งไม่ใช่จำนวนเต็ม
- **ต่างกันตรง:** b/a ต้องเป็นจำนวนเต็มเท่านั้นจึงนับว่า "a หาร b"

**อย่าสับสน:** "`a | b`" คือข้อความจริง/เท็จว่า "b ÷ a ลงตัว" ไม่ใช่ตัวเลข a ÷ b — ลำดับสำคัญ: `3 | 12` จริง แต่ `12 | 3` เท็จ

**เช็คความเข้าใจ:** ข้อใดต่อไปนี้เป็นจริง: ก) 6 | 18, ข) 7 | 28, ค) 2 | 5
<details><summary>เฉลย</summary>

ก) ✅ จริง — 6 × 3 = 18  
ข) ✅ จริง — 7 × 4 = 28 (c = 4 เป็นจำนวนเต็ม)  
ค) ❌ เท็จ — 5 ÷ 2 = 2.5 ไม่ใช่จำนวนเต็ม
</details>

---

#### Theorem 1: Properties of Division

> 💡 **Intuition:** ลองนึกถึงการแบ่งของเป็นกลุ่ม: ถ้าแบ่งขนม 6 ชิ้นให้ 3 คนได้พอดี (3 | 6) และแบ่งขนม 9 ชิ้นให้ 3 คนได้พอดี (3 | 9) ก็รู้ได้ทันทีว่า 6+9 = 15 ชิ้นก็แบ่งให้ 3 คนได้พอดีเช่นกัน — ทฤษฎีบทนี้ทำให้สรุปการหารของผลบวกและผลคูณได้โดยไม่ต้องคำนวณทั้งหมด (analogy ใช้ไม่ได้ตรงที่ขนมแบ่งครึ่งชิ้นได้ แต่ในจำนวนเต็มผลลัพธ์ต้องเป็นจำนวนเต็มเสมอ)
> [Source: generated — not verified against original document]

ถ้า `a`, `b`, `c` เป็นจำนวนเต็มที่ `a ≠ 0` แล้ว:

| กฎ | ความหมาย |
| :--- | :--- |
| ถ้า a or b และ a or c แล้ว a or (b + c) | ถ้าหารได้ทั้งคู่ ก็หารผลบวกได้ด้วย |
| ถ้า a or b แล้ว a or bc สำหรับทุก c ∈ ℤ | ถ้าหาร b ได้ ก็หาร bc ได้เสมอ |
| ถ้า a or b และ b or c แล้ว a or c | การหาร ส่งต่อ ได้ (Transitivity) |

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "a | b" (ตารางต้นฉบับแสดงเป็น "or") → a หาร b ลงตัว คือมี c ∈ ℤ ที่ b = ac
- "a ≠ 0" → ตัวหารต้องไม่เป็นศูนย์ เพราะ 0 | b ได้เฉพาะเมื่อ b = 0 ซึ่งไม่มีความหมายในกฎนี้
- "Transitivity" → ถ้า a หาร b และ b หาร c แล้ว a หาร c (การหารต่อกันเป็นลูกโซ่)

**ตัวอย่าง:**
- ✅ 3 | 6 และ 3 | 9 → 3 | (6+9) เพราะ 15 = 3 × 5 — ผ่านกฎข้อ 1
- ✅ 2 | 4 และ 4 | 8 → 2 | 8 เพราะ 8 = 2 × 4 — ผ่านกฎข้อ 3
- ❌ 3 | 6 แต่ 3 ∤ 4 → กฎข้อ 1 ใช้ไม่ได้ เพราะเงื่อนไข "หารได้ทั้งคู่" ไม่ครบ (6+4 = 10 และ 3 ∤ 10)
- **ต่างกันตรง:** ต้องรู้ว่า a หารทั้ง b และ c ได้ "ทั้งคู่" จึงสรุปได้ว่า a หาร (b+c) ได้

**อย่าสับสน:** "a | b" ไม่ได้หมายถึง "a ÷ b" — หมายถึง "b หารด้วย a ได้ผลเป็นจำนวนเต็ม" ทิศทางสำคัญ: 3 | 6 ถูก แต่ 6 | 3 ผิด

**เช็คความเข้าใจ:** ถ้า 4 | 12 และ 4 | 20 สรุปได้หรือไม่ว่า 4 | (12 + 20)? ให้เหตุผล
<details><summary>เฉลย</summary>

ได้ — กฎข้อ 1 ให้ 4 | (12+20) โดย 12 = 4×3, 20 = 4×5 จึง 12+20 = 4×(3+5) = 4×8 = 32 ✓
</details>

---

### 2.2 Division Algorithm (Euclidean Division)

> 💡 **Intuition:** Division Algorithm เป็นการจำลองการหารแบบชั้นประถม — เมื่อหาร 17 ด้วย 5 ได้ผลหาร 3 กับเศษ 2 (17 = 5×3 + 2) — ตรรกะ "หักตัวหารออกซ้ำๆ จนเหลือเศษ" นี้ใช้ได้ทั้งตัวตั้งบวกและลบ เพียงแต่ต้องบังคับให้เศษไม่ติดลบ (0 ≤ r < d) เพื่อให้ได้ q และ r เพียงชุดเดียว (unique) — สิ่งนี้เป็นรากฐานของ modular arithmetic
> [Source: generated — not verified against original document]

> **Theorem 2:** ให้ `a ∈ ℤ` และ `d ∈ ℤ+` แล้วมี **q** และ **r** ที่ unique โดยที่ `0 ≤ r < d` และ `a = dq + r`

```text
a = dq + r

  a  =  Dividend (ตัวตั้ง)
  d  =  Divisor  (ตัวหาร)
  q  =  Quotient (ผลหาร)   →  q = a div d
  r  =  Remainder (เศษ)    →  r = a mod d
```

ตัวอย่าง: 101 หาร 11
```
101 = 11 × 9 + 2
  q = 9, r = 2
```

ตัวอย่าง: -13 หาร 4 (กรณีตัวตั้งเป็นลบ — ปัด q ลง)
```
-13 = 4 × (-4) + 3
  q = -4, r = 3  (เศษต้องไม่ติดลบ)
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "`a = dq + r`" → ตัวตั้ง (a) = (ตัวหาร × ผลหาร) + เศษ
- "`0 ≤ r < d`" → เศษต้องอยู่ตั้งแต่ 0 ถึงต่ำกว่าตัวหาร (ไม่ติดลบ)
- "`unique`" → สำหรับทุก a ∈ ℤ และ d ∈ ℤ+ มี q และ r ได้เพียงชุดเดียว

**ตัวอย่าง:**
- ✅ `101 = 11 × 9 + 2` — เศษ 2 อยู่ใน [0, 11) ✅
- ❌ `101 = 11 × 10 + (-9)` — เศษติดลบ ไม่ใช่ valid ❌
- **ต่างกันตรง:** ทั้งสองสมการเป็นจริงทางเลขคณิต แต่มีเพียงชุดที่ 0 ≤ r < d เท่านั้นที่เป็น q, r ตาม Division Algorithm

**อย่าสับสน:** "`div`" (ผลหาร) กับ "`mod`" (เศษ) เป็นคนละอย่าง — "`a div d`" = q, "`a mod d`" = r

**เช็คความเข้าใจ:** หา q และ r จาก -21 = d×q + r เมื่อ d = 5
<details><summary>เฉลย</summary>

เราต้อง 0 ≤ r < 5 และ -21 = 5q + r  
q = floor(-21/5) = floor(-4.2) = -5  
-21 = 5×(-5) + r = -25 + r → r = 4 (อยู่ใน 0 ≤ r < 5 ✅)  
ดังนั้น q = -5, r = 4  
หมายเหตุ: ต้อง "ปัด q ลง" (floor) ไม่ใช่ปัดเศษ ถึงจะได้เศษไม่ติดลบ
</details>

---

### 2.3 Modular Arithmetic

#### Modulo Operator

> 💡 **Intuition:** Modulo คือ "เศษที่เหลือ" — เหมือนนาฬิกา: ถ้าตอนนี้ 2 โมง แล้วบวก 11 ชั่วโมง ได้ 13 แต่หน้าปัด 12 ชั่วโมงจะวนรอบ: 13 mod 12 = 1 (คือ 1 โมง) — การ mod บังคับตัวเลขให้อยู่ในช่วง 0 ถึง d-1
> [Source: generated — not verified against original document]

> `a mod d = r` คือเศษที่เหลือเมื่อ `a` หารด้วย `d`; `d` เรียกว่า **modulus**

สูตรสำหรับตัวเลขติดลบ:
```
a mod d = a - (floor(a / d) × d)
```

ตัวอย่าง: -17 mod 7
```
floor(-17/7) = floor(-2.43) = -3
-17 - (-3 × 7) = -17 + 21 = 4
ดังนั้น -17 mod 7 = 4
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "`a mod d`" → ผลของการเอาเศษ (remainder operation)
- "`floor`" → ปัดลง (ไม่ใช่ปัดเศษ) — สำคัญสำหรับตัวเลขติดลบ

**ตัวอย่าง:**
- ✅ `17 mod 5 = 2` เพราะ 17 = 5×3 + 2, เศษ = 2
- ✅ `-17 mod 5 = 3` เพราะ -17 = 5×(-4) + 3, เศษ = 3 (ต้อง floor ลง)
- **ต่างกันตรง:** ถ้า a ติดลบ ต้อง floor q ลงให้ r ไม่ติดลบ ไม่เช่นนั้น r อาจติดลบ

**อย่าสับสน:** "`-17 mod 7 = 4`" ไม่ใช่ "`-17 mod 7 = -3`" — เศษต้องไม่ติดลบตามนิยาม

**เช็คความเข้าใจ:** หา -13 mod 5
<details><summary>เฉลย</summary>

floor(-13/5) = floor(-2.6) = -3  
-13 - (-3 × 5) = -13 + 15 = 2  
ดังนั้น -13 mod 5 = 2
</details>

---

#### Congruence Modulo (สมภาค)

> 💡 **Intuition:** Congruence ไม่ใช่ "เท่ากัน" แต่ "ปลายทางเหมือนกันเมื่อหารด้วย m" — เหมือนนาฬิกา: 14 โมง และ 2 โมง ต่างกัน แต่ถ้านับรอบ 12 ชั่วโมง ทั้งคู่ชี้จุดเดียวกัน (14 ≡ 2 mod 12) — สำคัญเพราะให้วิธีการเปรียบเทียบตัวเลขในแง่มุม "เศษเดียวกัน"
> [Source: generated — not verified against original document]

> **Definition:** `a ≡ b (mod m)` ถ้า `m | (a - b)`

> **Theorem 3:** `a ≡ b (mod m)` ก็ต่อเมื่อ `a mod m = b mod m`

| สัญกรณ์ | ชนิด | ความหมาย |
| :--- | :--- | :--- |
| `a ≡ b (mod m)` | Relation | a และ b สมภาคกัน mod m |
| `a mod m = r` | Operation | ผลลัพธ์การหารเอาเศษ |

ตัวอย่าง: นาฬิกา 12 ชั่วโมง
```
8:00 am + 6 ชั่วโมง = 14:00
14 ≡ 2 (mod 12)  เพราะ 14 mod 12 = 2
→ 14:00 = 2:00 pm
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "`a ≡ b (mod m)`" → a สมภาคกับ b (modulo m) ไม่ใช่ "a เท่ากับ b"
- "`m | (a - b)`" → m หาร (a - b) ลงตัว ↔ ความหมาย: ผลต่าง a - b เป็นทวีคูณของ m

**ตัวอย่าง:**
- ✅ `15 ≡ 3 (mod 4)` เพราะ 15 - 3 = 12 และ 4 | 12 (4 หาร 12 ลงตัว) ✅
- ✅ `-1 ≡ 5 (mod 6)` เพราะ -1 - 5 = -6 และ 6 | (-6) ✅
- ❌ `10 ≡ 3 (mod 4)` เพราะ 10 - 3 = 7 และ 4 ∤ 7 ❌
- **ต่างกันตรง:** ตัดสินด้วยเงื่อนไขเดียวคือ m หารผลต่าง `(a-b)` ลงตัวหรือไม่

**อย่าสับสน:** "`a ≡ b (mod m)`" (สมภาค/Relation) ≠ "`a mod m = b`" (Operation) — ตัวแรกเชื่อมโยงสองจำนวน ตัวหลังให้ผลลัพธ์เศษ

**เช็คความเข้าใจ:** 27 ≡ ? (mod 5) — เติมตัวเลขให้สัญลักษณ์เป็นจริง
<details><summary>เฉลย</summary>

27 mod 5 = 2 (เพราะ 27 = 5×5 + 2)  
ดังนั้น 27 ≡ 2 (mod 5) หรือ 27 ≡ 7 (mod 5) หรือ 27 ≡ 12 (mod 5) ล้วนถูก (จำนวนใดก็ได้ที่มีเศษเดียวกันเมื่อหารด้วย 5)  
คำตอบ: 2 (หรือตัวเลขอื่นใดที่ mod 5 ได้ 2)
</details>

---

#### Theorem 4: Congruence Properties

> 💡 **Intuition:** การสมภาค (≡) คือ "เศษเท่ากันเมื่อหารด้วย m" ไม่จำเป็นต้องเท่ากันจริง — ทำให้เราบวกและคูณ "เศษ" แทน "ตัวเลขใหญ่" ได้ เช่น ต้องหาเศษของ 13 × 7 เมื่อหารด้วย 5 ก็แทนด้วย 3 × 2 ได้ เพราะเศษไม่เปลี่ยนเมื่อคูณ (analogy ใช้ไม่ได้ตรงที่นาฬิกาไม่ได้เก็บข้อมูลว่าผ่านกี่รอบ แต่ congruence ก็เก็บเฉพาะเศษเช่นกัน จึงย้อนกลับไปหาตัวเลขเดิมไม่ได้)
> [Source: generated — not verified against original document]

ถ้า `a ≡ b (mod m)` และ `c ≡ d (mod m)` แล้ว:
- `a + c ≡ b + d (mod m)` (ผลบวก)
- `ac ≡ bd (mod m)` (ผลคูณ)

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "a ≡ b (mod m)" → a และ b เหลือเศษเท่ากันเมื่อหารด้วย m (เทียบเท่า m | (a−b))
- "ทั้งสองคู่ใช้ m เดียวกัน" → เงื่อนไขที่ขาดไม่ได้ ต้องเช็ค m ก่อนรวมผลทุกครั้ง

**ตัวอย่าง:**
- ✅ 7 ≡ 2 (mod 5) และ 13 ≡ 3 (mod 5) → 7+13 = 20 ≡ 0 และ 2+3 = 5 ≡ 0 (mod 5) ✓; 7×13 = 91 ≡ 1 และ 2×3 = 6 ≡ 1 (mod 5) ✓
- ❌ 7 ≡ 2 (mod 5) และ 8 ≡ 2 (mod 6) → m ไม่เหมือนกัน: 7+8 = 15 ≡ 0 (mod 5) แต่ 2+2 = 4 ≡ 4 (mod 5) ไม่เท่ากัน — Theorem 4 ใช้ไม่ได้
- **ต่างกันตรง:** ทั้งสองคู่ต้องอ้างอิง modulus ตัวเดียวกัน

**อย่าสับสน:** "≡ (mod m)" ไม่ได้หมายถึง "=" — 7 ≠ 2 แต่ 7 ≡ 2 (mod 5) เพราะเศษทั้งคู่เป็น 2

**เช็คความเข้าใจ:** ถ้า 17 ≡ 2 (mod 5) และ 9 ≡ 4 (mod 5) จงหา (17 × 9) mod 5 โดยใช้ Theorem 4 และตรวจด้วยการคูณตรง ๆ
<details><summary>เฉลย</summary>

ใช้ Theorem 4: 2 × 4 = 8 ≡ 3 (mod 5)
ตรวจตรง ๆ: 17 × 9 = 153 = 5 × 30 + 3 → 153 mod 5 = 3 ✓ ตรงกัน
</details>

---

#### Modular Operations

| การดำเนินการ | สูตร |
| :--- | :--- |
| Addition | `(a + b) mod m = ((a mod m) + (b mod m)) mod m` |
| Multiplication | `ab mod m = ((a mod m)(b mod m)) mod m` |
| Exponentiation | `a^b mod m = (a mod m)^b mod m` |

---

### 2.4 Integer Representations (การแทนค่าจำนวนเต็ม)

> ทุก Positive Integer `n` สามารถเขียนในรูป: `n = a_k*b^k + ... + a_1*b + a_0` โดย `0 ≤ a_j < b`

#### การแปลงจาก Base b → Decimal (ขยายค่าประจำตำแหน่ง)

```
(10101111)₂ = 1×2⁷ + 1×2⁵ + 1×2³ + 1×2² + 1×2¹ + 1×2⁰
             = 128 + 32 + 8 + 4 + 2 + 1 = 175

(7016)₈  = 7×512 + 0×64 + 1×8 + 6 = 3598

(E5)₁₆   = 14×16 + 5 = 229
```

---

#### Base Conversion Algorithm (Decimal → Base b)

แนวคิด: หารซ้ำๆ ด้วย base เก็บเศษเป็น digit อ่านจากล่างขึ้นบน

```
Algorithm base_b_expansion(n, b):
  q = n, k = 0
  while q ≠ 0:
    a_k = q mod b     // เศษคือ digit ตำแหน่งถัดไป
    q   = q div b     // หารเพื่อลด
    k   = k + 1
  return (a_{k-1} ... a_1 a_0) base b
```

ตัวอย่าง: 12345 → Octal
```
12345 ÷ 8 = 1543 เศษ 1
 1543 ÷ 8 =  192 เศษ 7
  192 ÷ 8 =   24 เศษ 0
   24 ÷ 8 =    3 เศษ 0
    3 ÷ 8 =    0 เศษ 3
→ อ่านขึ้นบน: (30071)₈
```

#### Shortcut: Binary ↔ Octal ↔ Hex

```
Octal ↔ Binary:  1 octal digit = 3 binary digits
Hex   ↔ Binary:  1 hex digit   = 4 binary digits

(765)₈   = (111 110 101)₂
(A8D)₁₆  = (1010 1000 1101)₂
```

---

### 2.5 Fast Modular Exponentiation

#### วิธีที่ 1: Divide and Conquer

```
ถ้า b เป็นเลขคู่:
  a^b mod c = (a^2)^(b/2) mod c = (a^2 mod c)^(b/2) mod c

ถ้า b เป็นเลขคี่:
  a^b mod c = (a × (a^2)^((b-1)/2)) mod c
```

ตัวอย่าง: 2⁹⁰ mod 13
```
= (2⁵⁰ × 2⁴⁰) mod 13
= (2⁵⁰ mod 13 × 2⁴⁰ mod 13) mod 13
= (4 × 3) mod 13 = 12
```

#### วิธีที่ 2: Fast Modular Exponentiation (Binary Method)

> 💡 **Intuition:** ถ้าต้องคำนวณ 3^644 คูณทีละตัวไม่ไหวแน่ ๆ วิธีนี้ใช้ "การยกกำลังสองสะสม" — ทุกรอบ power เป็นกำลังสองของรอบก่อน (ค่าเลขชี้กำลังเพิ่มเป็นสองเท่า) และคูณเข้าผลลัพธ์เฉพาะรอบที่ bit ของ exponent เป็น 1 จึงใช้จำนวนรอบเท่ากับจำนวน bit ของ exponent (ประมาณ log n) แทนที่จะคูณ n ครั้ง (analogy ใช้ไม่ได้ตรงที่ทุกขั้นต้องตัดด้วย mod ทันที ไม่ใช่สะสมตัวเลขก้อนใหญ่)
> [Source: generated — not verified against original document]

```
Algorithm modular_expo(b, n=(a_{k-1}...a_1 a_0)₂, m):
  x = 1
  power = b mod m
  for i in range(0, k):
    if a_i = 1 then x = (x × power) mod m
    power = (power × power) mod m
  return x   // x = b^n mod m

Complexity: O((log m)² log n)
```

ตัวอย่าง: 3^644 mod 645
```
644 = (1010000100)₂
คำนวณ power: 3¹, 3², 3⁴, ... (แต่ละขั้น mod 645)
คูณรวมเฉพาะที่ bit = 1
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "binary expansion ของ exponent" → เขียนเลข n ในฐานสอง แล้วดูว่า bit ตัวไหนเป็น 1 (a_0 คือ bit ขวาสุด)
- "power = (power × power) mod m" → ยกกำลังสองทุกรอบ ผลคือ power = b^(2^i) mod m ไม่ใช่ b^i
- "x = (x × power) mod m เมื่อ a_i = 1" → คูณเข้าผลลัพธ์เฉพาะรอบที่ bit เป็น 1

**ตัวอย่าง:** คำนวณ 3^5 mod 7 โดย 5 = (101)₂ → a_0 = 1, a_1 = 0, a_2 = 1
- ✅ เริ่ม x = 1, power = 3 mod 7 = 3
  - i=0 (a_0=1): x = 1×3 mod 7 = 3; power = 3² mod 7 = 2
  - i=1 (a_1=0): ไม่คูณ x; power = 2² mod 7 = 4
  - i=2 (a_2=1): x = 3×4 mod 7 = 12 mod 7 = 5; power = 4² mod 7 = 2
  - ผล x = 5 → ตรวจ: 3^5 = 243 = 7 × 34 + 5 ✓
- ❌ คูณ x ทุกรอบโดยไม่ดู bit → i=0: x = 3; i=1 (ผิด): x = 3×2 = 6; i=2: x = 6×4 = 24 mod 7 = 3 ≠ 5 — ผิดเงื่อนไขเพราะคูณ x ที่ bit = 0
- **ต่างกันตรง:** power ยกกำลังสองทุกรอบ แต่ x คูณเฉพาะรอบที่ bit = 1

**อย่าสับสน:** "power" ในอัลกอริทึมคือ b^(2^i) mod m ไม่ใช่ b^i — ถ้าเข้าใจว่าเพิ่มทีละ 1 เท่า จะตีความ trace ผิดทันที

**เช็คความเข้าใจ:** จงหา 2^6 mod 9 โดย 6 = (110)₂
<details><summary>เฉลย</summary>

ตั้ง x = 1, power = 2 mod 9 = 2
- i=0 (a_0=0): ไม่คูณ x; power = 2² = 4
- i=1 (a_1=1): x = 1×4 = 4; power = 4² mod 9 = 16 mod 9 = 7
- i=2 (a_2=1): x = 4×7 = 28 mod 9 = 1; power = 49 mod 9 = 4
ผล 1 → ตรวจ: 2^6 = 64 = 9 × 7 + 1 ✓
</details>

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

- [ ] **Division:** `a | b` iff ∃c ∈ ℤ such that `b = ac`
- [ ] **Division Algorithm:** `a = dq + r`, `0 ≤ r < d`, `q = a div d`, `r = a mod d`
- [ ] **Mod negative:** `a mod d = a - floor(a/d)×d` (เศษต้องเป็น non-negative)
- [ ] **Congruence:** `a ≡ b (mod m)` iff `m | (a - b)` iff `a mod m = b mod m`
- [ ] **Properties:** ถ้า `a ≡ b` และ `c ≡ d` แล้ว `a+c ≡ b+d` และ `ac ≡ bd` (mod m)
- [ ] **Modular Ops:** ทำ mod ก่อน ค่อยบวก/คูณ แล้ว mod อีกครั้ง
- [ ] **Base Conversion:** หารซ้ำด้วย base, เก็บเศษ, อ่านจากล่างขึ้นบน
- [ ] **Hex shortcut:** 1 hex digit = 4 binary digits; 1 octal = 3 binary
- [ ] **Fast Expo:** ใช้ binary expansion ของ exponent, คูณสะสมเฉพาะที่ bit = 1

### สรุปสูตร / Notation ที่สำคัญ

| Notation | ความหมาย |
| :--- | :--- |
| `a or b` (a divides b) | a หาร b ลงตัว |
| `a = dq + r` | Division Algorithm |
| `q = a div d` | ผลหาร (Quotient) |
| `r = a mod d` | เศษ (Remainder) |
| `a ≡ b (mod m)` | a สมภาคกับ b (Congruence) |
| `(a_k...a_0) base b` | Base b Representation |

### Concept Map

```text
Number Theory (Week 8)
│
├── Division (a | b)
│   └── Division Algorithm: a = dq + r
│       ├── q = a div d
│       └── r = a mod d
│
├── Modular Arithmetic
│   ├── a mod d = r
│   ├── Congruence: a ≡ b (mod m)
│   │   ↔ m | (a-b)
│   │   ↔ a mod m = b mod m
│   └── Operations: Add / Mul / Exp (mod m)
│
└── Integer Representations
    ├── Base b → Decimal: positional expansion
    ├── Decimal → Base b: successive division
    └── Fast Expo: binary expansion of exponent
```

---

## ⚠️ Common Pitfalls & Exam Traps

- **`a mod d` กับ `a ≡ b (mod m)` ต่างกัน:** `mod` ตัวแรกคือ Operation ให้ผลเป็นตัวเลข ตัวหลังคือ Relation ระหว่างสองจำนวน — อย่าสับสนสัญลักษณ์ `mod` ทั้งสองแบบ
- **เศษจากการหารต้องไม่ติดลบ (0 ≤ r < d):** เมื่อ `a` เป็นลบ ต้องปัด quotient ลง (floor) — เช่น `-13 = 4×(-4) + 3` ไม่ใช่ `4×(-3) + (-1)`
- **Base Conversion อ่านจากล่างขึ้นบน:** เศษแรกที่ได้คือ Least Significant Digit (LSD) ไม่ใช่ Most Significant Digit
- **Fast Modular Expo ต้องทำ mod ทุกขั้น:** หากลืม mod ระหว่าง iteration ตัวเลขจะ overflow — ต้อง `power = (power × power) mod m` ทุกรอบ
- **Hex digits A-F คือ 10-15:** เวลาคำนวณ `(2AE0B)₁₆` → A=10, E=14, B=11 อย่าลืมแทนค่าก่อนคำนวณ

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- **วิชาและหัวข้อที่เกี่ยวข้อง:**
  - [[Discrete Mathematics - Week 9 Primes, GCD & Cryptography]] (เนื้อหาต่อเนื่อง Week 8 — Prime Numbers, GCD, และการประยุกต์ Modular Arithmetic ใน Cryptography)
  - [[Discrete Mathematics - Week 10 Relations]] (Congruence Modulo เป็นตัวอย่างของ Equivalence Relation)

- **แหล่งข้อมูล:**
  - Source: `Resources/Books/Discrete Mathematics/myDiscrete_Week8.pdf` (54 slides, Dr. Sirasit Lochanachit)