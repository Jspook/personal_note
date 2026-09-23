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

---

### Relative Prime (จำนวนเฉพาะสัมพัทธ์)

> **นิยาม:** จำนวนเต็ม $a$ และ $b$ เรียกว่า **relatively prime** (หรือ coprime) ถ้า $\gcd(a, b) = 1$

> **นิยาม (Pairwise):** จำนวนเต็ม $a_1, a_2, \ldots, a_n$ เรียกว่า **pairwise relatively prime** ถ้า $\gcd(a_i, a_j) = 1$ สำหรับทุก $i < j$

**ตัวอย่าง:**
- $\gcd(17, 22) = 1$ → 17 และ 22 เป็น relatively prime ✅
- 10, 17, 21 เป็น pairwise relatively prime:
  - $\gcd(10, 17) = 1$, $\gcd(10, 21) = 1$, $\gcd(17, 21) = 1$ ✅
- 10, 19, 24 **ไม่** เป็น pairwise relatively prime:
  - $\gcd(10, 24) = 2 > 1$ ❌

---

### GCD ด้วย Prime Factorization

ถ้า $a = 2^{a_1} \cdot 3^{a_2} \cdot 5^{a_3} \cdots$ และ $b = 2^{b_1} \cdot 3^{b_2} \cdot 5^{b_3} \cdots$ แล้ว:

$$\gcd(a, b) = 2^{\min(a_1,b_1)} \cdot 3^{\min(a_2,b_2)} \cdot 5^{\min(a_3,b_3)} \cdots$$

**ตัวอย่าง:** $\gcd(120, 500)$
$$120 = 2^3 \cdot 3^1 \cdot 5^1$$
$$500 = 2^2 \cdot 3^0 \cdot 5^3$$
$$\gcd(120, 500) = 2^{\min(3,2)} \cdot 3^{\min(1,0)} \cdot 5^{\min(1,3)} = 2^2 \cdot 3^0 \cdot 5^1 = 4 \cdot 1 \cdot 5 = \mathbf{20}$$

> ⚠️ **ข้อเสีย:** วิธีนี้ไม่มีประสิทธิภาพสำหรับตัวเลขใหญ่ เพราะไม่มีอัลกอริทึมที่รวดเร็วในการหา prime factorization

---

### 3.6 Euclidean Algorithm

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
