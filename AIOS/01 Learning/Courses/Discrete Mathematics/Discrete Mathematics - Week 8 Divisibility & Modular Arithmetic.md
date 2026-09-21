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

---

#### Theorem 1: Properties of Division

ถ้า `a`, `b`, `c` เป็นจำนวนเต็มที่ `a ≠ 0` แล้ว:

| กฎ | ความหมาย |
| :--- | :--- |
| ถ้า a or b และ a or c แล้ว a or (b + c) | ถ้าหารได้ทั้งคู่ ก็หารผลบวกได้ด้วย |
| ถ้า a or b แล้ว a or bc สำหรับทุก c ∈ ℤ | ถ้าหาร b ได้ ก็หาร bc ได้เสมอ |
| ถ้า a or b และ b or c แล้ว a or c | การหาร ส่งต่อ ได้ (Transitivity) |

---

### 2.2 Division Algorithm (Euclidean Division)

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

---

### 2.3 Modular Arithmetic

#### Modulo Operator

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

---

#### Congruence Modulo (สมภาค)

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

---

#### Theorem 4: Congruence Properties

ถ้า `a ≡ b (mod m)` และ `c ≡ d (mod m)` แล้ว:
- `a + c ≡ b + d (mod m)` (ผลบวก)
- `ac ≡ bd (mod m)` (ผลคูณ)

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