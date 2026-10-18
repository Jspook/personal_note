# Discrete Mathematics - Week 9: GCD and Euclidean Algorithm

**วิชา:** Discrete Mathematics
**สถาบัน:** มหาวิทยาลัย (Sirasit Lochanachit, PhD)
**Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week9.pdf` (47 pages, slides)

---

## Part 1: Macro Architecture & Overview

```
GCD & Euclidean Algorithm
├── 3.5 Greatest Common Divisor (GCD)
│   ├── นิยาม GCD
│   ├── Relative Prime (จำนวนเฉพาะสัมพัทธ์)
│   └── GCD ด้วย Prime Factorization
└── 3.6 Euclidean Algorithm
    ├── Lemma (gcd(a,b) = gcd(b, a mod b))
    └── Pseudocode + Complexity O(log b)
```

---

## Part 2: Deep Dive

### 3.5 Greatest Common Divisor (GCD)

> 💡 **Intuition:** GCD คือตัวหารที่ "ใหญ่ที่สุด" ที่ยังหารทั้ง a และ b ลงตัว — เหมือนการหา "ขนาดกลุ่มที่ใหญ่ที่สุด" ที่แบ่งของสองกองได้พอดีทั้งคู่: ถ้า a = 12 และ b = 18 ตัวที่หารลงตัวทั้งคู่คือ 1, 2, 3, 6 และ 6 เป็นตัวใหญ่สุด → gcd(12, 18) = 6 — มีประโยชน์เพราะช่วยลดเศษส่วนและแก้สมการหลายอย่าง
> [Source: generated — not verified against original document]

> **นิยาม:** ให้ $a$ และ $b$ เป็นจำนวนเต็ม (ไม่ใช่ 0 ทั้งคู่)
> จำนวนเต็มที่มากที่สุด $d$ ซึ่ง $d \mid a$ และ $d \mid b$ เรียกว่า **greatest common divisor** ของ $a$ และ $b$
> เขียนแทนด้วย $\gcd(a, b)$

**วิธีหา GCD แบบง่าย:** หาตัวประกอบบวกร่วมของทั้งสองจำนวน แล้วเลือกตัวที่ใหญ่ที่สุด

**ตัวอย่าง 1:** $\gcd(24, 36)$
- ตัวประกอบบวกของ 24: 1, 2, 3, 4, 6, 8, 12, 24
- ตัวประกอบบวกของ 36: 1, 2, 3, 4, 6, 9, 12, 18, 36
- ตัวประกอบร่วม: **1, 2, 3, 4, 6, 12**
- $\gcd(24, 36) = \mathbf{12}$

**ตัวอย่าง 2:** $\gcd(17, 22)$
- 17 เป็น prime → ตัวประกอบ: 1, 17
- 22 = 2 × 11 → ตัวประกอบ: 1, 2, 11, 22
- ตัวประกอบร่วม: **1**
- $\gcd(17, 22) = \mathbf{1}$

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "จำนวนเต็มที่มากที่สุด d" → ต้องหา d ที่ **ใหญ่ที่สุด** (ไม่ใช่แค่หนึ่งตัวที่หารได้)
- "$d \mid a$ และ $d \mid b$" → d ต้องหาร a ลงตัว **และ** หาร b ลงตัว (ทั้งสองต้องลงตัว)

**ตัวอย่าง:**
- ✅ $\gcd(24, 36) = 12$ เพราะ 12 | 24, 12 | 36, และไม่มี d > 12 ที่หารทั้งคู่ได้
- ❌ $\gcd(24, 36) = 6$ ไม่ถูก (6 หารทั้งคู่ได้ แต่ไม่ใหญ่สุด)
- **ต่างกันตรง:** ต้องเป็น **ตัวประกอบร่วมที่ใหญ่ที่สุด** ไม่ใช่เพียงตัวประกอบร่วม

**อย่าสับสน:** "$\gcd(a, b)$" ≠ "$\text{lcm}(a, b)$" — GCD คือตัวประกอบร่วมที่ใหญ่สุด (Greatest) ส่วน LCM คือพหุคูณร่วมบวกที่เล็กสุด (Least)

**เช็คความเข้าใจ:** หา $\gcd(48, 18)$
<details><summary>เฉลย</summary>

ตัวประกอบของ 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48  
ตัวประกอบของ 18: 1, 2, 3, 6, 9, 18  
ตัวประกอบร่วม: 1, 2, 3, 6  
$\gcd(48, 18) = 6$
</details>

---

### Relative Prime (จำนวนเฉพาะสัมพัทธ์)

> 💡 **Intuition:** Relatively Prime หมายถึง "ไม่มีตัวประกอบร่วมนอกจาก 1" — ไม่จำเป็นต้องเป็นจำนวนเฉพาะแต่ละตัว เช่น 10 และ 21 ทั้งคู่เป็นจำนวนประกอบ (composite) แต่ gcd = 1 → relatively prime — สำคัญเพราะใช้ใน RSA cryptography และการลดเศษส่วน
> [Source: generated — not verified against original document]

> **นิยาม:** จำนวนเต็ม $a$ และ $b$ เรียกว่า **relatively prime** (หรือ coprime) ถ้า $\gcd(a, b) = 1$

> **นิยาม (Pairwise):** จำนวนเต็ม $a_1, a_2, \ldots, a_n$ เรียกว่า **pairwise relatively prime** ถ้า $\gcd(a_i, a_j) = 1$ สำหรับทุก $i < j$

**ตัวอย่าง:**
- $\gcd(17, 22) = 1$ → 17 และ 22 เป็น relatively prime ✅
- 10, 17, 21 เป็น pairwise relatively prime:
  - $\gcd(10, 17) = 1$, $\gcd(10, 21) = 1$, $\gcd(17, 21) = 1$ ✅
- 10, 19, 24 **ไม่** เป็น pairwise relatively prime:
  - $\gcd(10, 24) = 2 > 1$ ❌

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "relatively prime" → gcd = 1 (ไม่ใช่ว่าทั้งคู่เป็น prime)
- "pairwise" → ทุกคู่ต้อง relatively prime (ไม่เพียง gcd ทั้งหมด = 1)

**ตัวอย่าง:**
- ✅ 10 และ 21 relatively prime: 10 = 2×5, 21 = 3×7 → ไม่มีตัวประกอบร่วม
- ❌ 6, 10, 15 **ไม่** pairwise relatively prime: $\gcd(6,10)=2$
- **ต่างกันตรง:** 6, 10, 15 มี gcd(6,10,15) = 1 แต่ไม่ pairwise (ต้องเช็ครายคู่)

**อย่าสับสน:** "relatively prime" ≠ "ทั้งคู่เป็น prime" — 10 และ 21 ไม่ใช่ prime แต่ relatively prime

**เช็คความเข้าใจ:** 14 และ 25 relatively prime หรือไม่
<details><summary>เฉลย</summary>

14 = 2 × 7, 25 = 5²  
ไม่มีตัวประกอบร่วม ดังนั้น $\gcd(14, 25) = 1$  
14 และ 25 **เป็น relatively prime** ✅
</details>

---

### GCD ด้วย Prime Factorization

> 💡 **Intuition:** เปรียบเหมือนเทียบส่วนผสมของเค้กสองสูตร: ส่วนผสมที่ "ทั้งสองสูตรมีร่วมกัน" และใช้ปริมาณน้อยที่สุดของสองสูตรคือสิ่งที่ตรงกันจริง — gcd ก็คือ prime ที่ทั้งสองจำนวนมีร่วมกัน โดยเอาเลขยกกำลังต่ำสุดของแต่ละ prime ทำให้ได้ตัวหารร่วมที่ใหญ่ที่สุด (analogy ใช้ไม่ได้ตรงที่ส่วนผสมต้องรู้ครบทุกตัวก่อนจึงเทียบได้ ซึ่งในทางคณิตศาสตร์ก็คือการ factor ก่อน — และการ factor ตัวเลขใหญ่นั้นช้า)
> [Source: generated — not verified against original document]

ถ้า $a = 2^{a_1} \cdot 3^{a_2} \cdot 5^{a_3} \cdots$ และ $b = 2^{b_1} \cdot 3^{b_2} \cdot 5^{b_3} \cdots$ แล้ว:

$$\gcd(a, b) = 2^{\min(a_1,b_1)} \cdot 3^{\min(a_2,b_2)} \cdot 5^{\min(a_3,b_3)} \cdots$$

**ตัวอย่าง:** $\gcd(120, 500)$
$$120 = 2^3 \cdot 3^1 \cdot 5^1$$
$$500 = 2^2 \cdot 3^0 \cdot 5^3$$
$$\gcd(120, 500) = 2^{\min(3,2)} \cdot 3^{\min(1,0)} \cdot 5^{\min(1,3)} = 2^2 \cdot 3^0 \cdot 5^1 = 4 \cdot 1 \cdot 5 = \mathbf{20}$$

> ⚠️ **ข้อเสีย:** วิธีนี้ไม่มีประสิทธิภาพสำหรับตัวเลขใหญ่ เพราะไม่มีอัลกอริทึมที่รวดเร็วในการหา prime factorization

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "min(a_i, b_i)" → เลือกเลขยกกำลังที่ต่ำกว่าของ prime ตัวเดียวกัน (prime ที่มีเฉพาะในฝั่งเดียวจะได้ exponent 0 และหายไป)
- "ผลคูณของ prime^min" → ตัวหารร่วมที่ใหญ่ที่สุดคือรวมทุก prime ที่ทั้งคู่มีร่วมกัน ในจำนวนที่ต่ำที่สุดที่ทั้งคู่มี

**ตัวอย่าง:**
- ✅ gcd(120, 500): 120 = 2³·3·5, 500 = 2²·5³ → min ของ 2 คือ 2, ของ 3 คือ 0, ของ 5 คือ 1 → 2²·5 = 20 ✓
- ❌ ใช้ max แทน min: gcd(12, 25): 12 = 2²·3, 25 = 5² → max ได้ 2²·3·5² = 300 ซึ่ง **คือ lcm** ไม่ใช่ gcd (gcd(12, 25) = 1)
- **ต่างกันตรง:** min ให้ gcd (ตัวร่วมที่เล็กสุดของ exponent), max ให้ lcm

**อย่าสับสน:** "min ของ exponent" ≠ "min ของตัวเลข" — gcd(12, 25) = 1 ไม่ได้มาจากการเลือก 12 หรือ 25 แต่มาจาก exponent ของ 2, 3, 5 ที่ไม่ตรงกันทั้งหมด

**เช็คความเข้าใจ:** ใช้ prime factorization หา gcd(36, 90)
<details><summary>เฉลย</summary>

36 = 2² · 3², 90 = 2 · 3² · 5
min(2, 1) = 1 สำหรับ 2; min(2, 2) = 2 สำหรับ 3; ไม่มี 5 ในฝั่ง 36 → exponent 0
gcd(36, 90) = 2¹ · 3² = **18** (ตรวจ: 36 = 18·2, 90 = 18·5 ✓)
</details>

---

### 3.6 Euclidean Algorithm

> 💡 **Intuition:** Euclidean Algorithm ใช้ความจริงที่ว่า "หา gcd ของเลขใหญ่ สามารถลดเป็นหา gcd ของเลขที่เล็กลงได้โดยค่าไม่เปลี่ยน" — เริ่มจาก 287 และ 91 ลดเหลือ 91 และ 14 แล้วเหลือ 14 และ 7 จนเศษเป็น 0 — ข้อดีคือเร็วมาก เพราะตัวเลขหดลงเร็วจนใช้แค่ O(log b) ขั้น
> [Source: generated — not verified against original document]

> **Lemma 1:** ถ้า $a = bq + r$ แล้ว $\gcd(a, b) = \gcd(b, r)$
> นั่นคือ $\gcd(a, b) = \gcd(b, a \bmod b)$

**ตัวอย่าง:** หา $\gcd(91, 287)$

```
gcd(287, 91):
287 = 91 × 3 + 14  →  gcd(287, 91) = gcd(91, 14)
91  = 14 × 6 + 7   →  gcd(91, 14)  = gcd(14, 7)
14  = 7  × 2 + 0   →  gcd(14, 7)   = gcd(7, 0) = 7

∴ gcd(287, 91) = 7
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**หมายเหตุ:** block นี้อธิบาย Lemma 1 ที่ให้กฎ gcd(a, b) = gcd(b, a mod b) ในส่วนนิยามด้านบน

**แตกวลีสำคัญ:**
- "a = bq + r" → หาร a ด้วย b ได้ผลหาร q และเศษ r โดย 0 ≤ r < b
- "gcd(a, b) = gcd(b, r)" → คู่ (a, b) กับคู่ (b, r) มีตัวหารร่วมชุดเดียวกัน จึงมี gcd เท่ากัน
- **เหตุผลสั้น ๆ:** r = a − bq ดังนั้น d | a และ d | b ⇔ d | b และ d | r (ใช้กฎ Theorem 1 ของ Week 8 ได้: ถ้า d | b แล้ว d | bq)

**ตัวอย่าง:**
- ✅ 287 = 91 × 3 + 14 → gcd(287, 91) = gcd(91, 14): 287 = 7 × 41, 91 = 7 × 13 → ตัวร่วม {1, 7}; 91 = 7 × 13, 14 = 2 × 7 → ตัวร่วม {1, 7} เหมือนกัน
- ❌ ใช้ผลหาร q แทนเศษ r: gcd(287, 91) ≠ gcd(91, 3) เพราะ 3 คือผลหาร ไม่ใช่เศษ → gcd(91, 3) = 1 ≠ 7 ✗
- **ต่างกันตรง:** ต้องใช้เศษ r เท่านั้น ถ้าใช้ q ตัวหารร่วมจะเปลี่ยน

**อย่าสับสน:** Lemma 1 ให้ gcd(b, r) ไม่ใช่ gcd(a, r) — ขั้นถัดไปคู่ใหม่มี b เป็นตัวแรก

**เช็คความเข้าใจ:** ใช้ Lemma 1 ลด gcd(48, 18) หนึ่งขั้น แล้วหาค่า
<details><summary>เฉลย</summary>

48 = 18 × 2 + 12 → gcd(48, 18) = gcd(18, 12)
18 = 12 × 1 + 6 → gcd(18, 12) = gcd(12, 6)
12 = 6 × 2 + 0 → gcd(12, 6) = **6** ✓
</details>

**Pseudocode (Euclidean Algorithm):**

```
Algorithm gcd(a, b):
  x = a, y = b
  while (y ≠ 0):
    r = x mod y
    x = y
    y = r
  return x   // gcd(a,b) = x
```

**Complexity:** $O(\log b)$ — จำนวนการหารที่ต้องใช้ไม่เกิน $O(\log b)$ ครั้ง

---

### ตัวอย่าง Euclidean Algorithm

**ตัวอย่าง:** หา $\gcd(2322, 654)$

```
2322 = 654 × 3 + 360   →  gcd(2322, 654) = gcd(654, 360)
654  = 360 × 1 + 294   →  gcd(654, 360)  = gcd(360, 294)
360  = 294 × 1 + 66    →  gcd(360, 294)  = gcd(294, 66)
294  = 66  × 4 + 30    →  gcd(294, 66)   = gcd(66, 30)
66   = 30  × 2 + 6     →  gcd(66, 30)    = gcd(30, 6)
30   = 6   × 5 + 0     →  gcd(30, 6)     = 6

∴ gcd(2322, 654) = 6
```

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "$\gcd(a, b) = \gcd(b, a \bmod b)$" → ลดปัญหาให้เล็กลง เช่น gcd(287,91) = gcd(91,14) = gcd(14,7) = ...
- "หยุดเมื่อ remainder = 0" → ตัวหารของขั้นสุดท้าย (= เศษตัวสุดท้ายที่ไม่ใช่ 0) คือ gcd

**ตัวอย่าง:**
- ✅ $\gcd(91, 287)$ → 287 = 91×3 + 14, แล้ว 91 = 14×6 + 7, แล้ว 14 = 7×2 + 0 → gcd = 7
- **ต่างกันตรง:** ขั้นตอน (287, 91) → (91, 14) → (14, 7) → (7, 0) ทำให้ปัญหาเล็กลง ทีละครั้ง

**อย่าสับสน:** "Euclidean Algorithm" ≠ "Prime Factorization Method" — ได้ gcd เท่ากัน แต่ Euclidean ใช้เพียง O(log b) ขั้นโดยไม่ต้องแยกตัวประกอบ ส่วนการแยกตัวประกอบช้ามากสำหรับตัวเลขใหญ่

**เช็คความเข้าใจ:** หา gcd(48, 18) ด้วย Euclidean Algorithm
<details><summary>เฉลย</summary>

48 = 18 × 2 + 12 → gcd(48,18) = gcd(18,12)  
18 = 12 × 1 + 6  → gcd(18,12) = gcd(12,6)  
12 = 6 × 2 + 0   → gcd(12,6) = 6  
**gcd(48, 18) = 6**
</details>

---

## Part 3: Quick Reference & Exam Cheat Sheet

| แนวคิด | สูตร / กฎสำคัญ |
|:---|:---|
| GCD นิยาม | $d$ ที่ใหญ่สุดซึ่ง $d \mid a$ และ $d \mid b$ |
| Relatively Prime | $\gcd(a, b) = 1$ |
| GCD จาก Prime Factor | $\gcd = \prod p^{\min(\text{exp})}$ |
| Euclidean Algorithm | $\gcd(a, b) = \gcd(b, a \bmod b)$ |
| หยุดเมื่อ | remainder = 0, คำตอบคือ divisor ล่าสุด |
| Complexity | $O(\log b)$ |

---

## ⚠️ Common Pitfalls & Exam Traps

- $\gcd(a, 0) = a$ — GCD กับ 0 คือตัวมันเองเสมอ
- $\gcd(a, b) = \gcd(b, a)$ — ลำดับไม่มีผล
- ใน Euclidean Algorithm ต้องให้ $a > b$ ก่อนเริ่ม (หรือตัว algorithm จัดการให้ใน iteration แรก)
- อย่าสับสนระหว่าง GCD (ใหญ่สุด) กับ LCM (น้อยสุด)

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- [[Week9 - Prime Numbers and Factorization]] (GCD ใช้ Prime Factorization ในการคำนวณ)
- [[Week9 - Applications of Congruences]] (GCD ใช้ใน Check Digits และ Cryptography)
- [[Week9 - Cryptography and Ciphers]] (RSA ต้องการ GCD ในการสร้าง key)
