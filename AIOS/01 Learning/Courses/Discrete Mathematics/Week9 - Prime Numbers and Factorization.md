# Discrete Mathematics - Week 9: Prime Numbers and Factorization

**วิชา:** Discrete Mathematics
**สถาบัน:** มหาวิทยาลัย (Sirasit Lochanachit, PhD)
**Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week9.pdf` (47 pages, slides)

---

## Part 1: Macro Architecture & Overview

```
Number Theory (Week 9 Cont.)
├── 3. Primes & GCD
│   ├── 3.1 Prime Numbers (นิยาม + ตัวอย่าง)
│   ├── 3.2 Trial Division
│   ├── 3.3 Sieve of Eratosthenes
│   ├── 3.4 Interesting Facts (Mersenne Primes, ∞ Primes)
│   ├── 3.5 GCD
│   └── 3.6 Euclidean Algorithm
├── 4. Applications of Congruences
│   ├── 4.2 Pseudorandom Numbers
│   └── 4.3 Check Digits (UPC)
└── 5. Cryptography
    ├── 5.1 Caesar Cipher
    └── Shift Cipher
```

---

## Part 2: Deep Dive

### 3.1 Prime Numbers (จำนวนเฉพาะ)

> **นิยาม:** จำนวนเต็มบวก $p > 1$ เรียกว่า **prime** (จำนวนเฉพาะ) ถ้าตัวประกอบบวกของ $p$ มีเพียง 1 กับ $p$ เท่านั้น

- จำนวนที่มากกว่า 1 แต่ไม่ใช่จำนวนเฉพาะ เรียกว่า **composite** (จำนวนประกอบ)
- $p$ เป็น composite ก็ต่อเมื่อ มีจำนวนเต็มบวก $a$ ที่ $a \mid p$ และ $1 < a < p$

**ตัวอย่าง:** จำนวนใดบ้างที่เป็น prime?

| จำนวน | Prime? | เหตุผล |
|:---:|:---:|:---|
| 1 | ❌ | ไม่ใช่ — นิยามกำหนด $p > 1$ |
| 2 | ✅ | ตัวประกอบมีแค่ 1, 2 |
| 3 | ✅ | ตัวประกอบมีแค่ 1, 3 |
| 4 | ❌ | 4 = 2 × 2 (composite) |
| 5 | ✅ | ตัวประกอบมีแค่ 1, 5 |
| 6 | ❌ | 6 = 2 × 3 |
| 7 | ✅ | ตัวประกอบมีแค่ 1, 7 |
| 9 | ❌ | 9 = 3 × 3 |
| 17 | ✅ | หาร 2, 3 ไม่ลงตัว |
| 51 | ❌ | 51 = 3 × 17 |

---

### Fundamental Theorem of Arithmetic (ทฤษฎีบทหลักของเลขคณิต)

> **Theorem 1:** จำนวนเต็มทุกตัวที่มากกว่า 1 สามารถเขียนได้อย่างเป็นเอกลักษณ์ในรูป **prime** หรือ **ผลคูณของจำนวนเฉพาะ** (เรียงจากน้อยไปมาก)

**ตัวอย่าง:**
$$100 = 2^2 \times 5^2$$
$$641 = 641 \text{ (prime)}$$
$$999 = 3^3 \times 37$$
$$1024 = 2^{10}$$

---

### การหา Prime Factorization (การแยกตัวประกอบเฉพาะ)

**ขั้นตอน:**
1. หาร $n$ ด้วยจำนวนเฉพาะเรียงจากน้อยไปมาก เริ่มจาก 2
2. ถ้า $n$ มีตัวประกอบเฉพาะ $p$ แล้ว $p \leq \sqrt{n}$ จะพบก่อน
3. เมื่อพบ $p$ แล้ว หาร $n/p$ ต่อด้วยจำนวนเฉพาะที่ $\geq p$

**ตัวอย่าง:** หา prime factorization ของ 7007

```
7007 ÷ 2  → ไม่ลงตัว
7007 ÷ 3  → ไม่ลงตัว
7007 ÷ 5  → ไม่ลงตัว
7007 ÷ 7  = 1001  ✅
1001 ÷ 7  = 143   ✅
143  ÷ 7  → ไม่ลงตัว
143  ÷ 11 = 13    ✅
13 เป็น prime → จบ

∴ 7007 = 7² × 11 × 13
```

---

### 3.2 Trial Division (การทดลองหาร)

> **Theorem 2:** ถ้า $n$ เป็น composite integer แล้ว $n$ จะมีตัวประกอบเฉพาะที่ $\leq \sqrt{n}$

**วิธีใช้:** ทดลองหาร $n$ ด้วยทุกจำนวนเฉพาะ $\leq \sqrt{n}$
- ถ้าหารไม่ลงตัวสักตัว → $n$ เป็น prime

**ตัวอย่าง:** แสดงว่า 101 เป็น prime
- $\sqrt{101} \approx 10.05$ → ต้องทดสอบ prime ที่ ≤ 10: 2, 3, 5, 7
- 101 ÷ 2 = 50.5, 101 ÷ 3 = 33.67, 101 ÷ 5 = 20.2, 101 ÷ 7 = 14.4
- ไม่มีตัวไหนหารลงตัว → **101 เป็น prime** ✅

---

### 3.3 Sieve of Eratosthenes (ตะแกรงเอราทอสเทนีส)

**วิธีหาจำนวนเฉพาะทั้งหมด ≤ n:**
1. เริ่มจากรายการ 2 ถึง $n$
2. ลบจำนวนที่หารด้วย 2 ลงตัว (ยกเว้น 2)
3. ลบจำนวนที่หารด้วย 3 ลงตัว (ยกเว้น 3)
4. ทำต่อเนื่องจนถึง prime ตัวใหญ่สุด $a \leq \sqrt{n}$

**ตัวอย่าง:** หา prime ทั้งหมด ≤ 25

ตัดด้วย 2, 3, 5 (เพราะ $\sqrt{25} = 5$):

```
จำนวนที่เหลือ (prime): 2, 3, 5, 7, 11, 13, 17, 19, 23
```

---

### 3.4 Interesting Facts about Primes

1. **จำนวนเฉพาะมีอนันต์** — พิสูจน์โดย Euclid ด้วย Proof by Contradiction:
   - สมมติว่ามี prime จำนวนจำกัด: $p_1, p_2, \ldots, p_n$
   - ให้ $Q = p_1 p_2 \cdots p_n + 1$
   - ไม่มี $p_j$ ใดหาร $Q$ ลงตัว (เพราะ $Q \bmod p_j = 1$ เสมอ)
   - ดังนั้นต้องมี prime ใหม่ที่ไม่อยู่ในรายการ → **ขัดแย้ง** ✅

2. **Mersenne Primes:** prime ในรูป $2^p - 1$ (เช่น $2^2 - 1 = 3$, $2^5 - 1 = 31$)

3. **Prime Number Theorem:** จำนวน prime ที่ไม่เกิน $x$ ≈ $\dfrac{x}{\ln x}$

---

## Part 3: Quick Reference & Exam Cheat Sheet

| แนวคิด | สูตร / กฎสำคัญ |
|:---|:---|
| Prime ต้องมี | ตัวประกอบบวกแค่ 1 กับตัวเอง |
| Composite | หาร $a$ ลงตัว โดย $1 < a < p$ |
| ตรวจ prime n | ทดลองหารด้วย prime $\leq \sqrt{n}$ |
| Fundamental Thm. | ทุกจำนวน > 1 มี prime factorization เดียว |
| Mersenne Prime | รูป $2^p - 1$ |
| Prime มีอนันต์ | Euclid พิสูจน์ด้วย contradiction |

---

## ⚠️ Common Pitfalls & Exam Traps

- **1 ไม่ใช่ prime!** — นิยามระบุ $p > 1$
- **2 เป็น prime เดียวที่เป็น even** — อย่าลืม
- การ Trial Division ต้องทดสอบแค่ $\leq \sqrt{n}$ ไม่ต้องทดสอบทุกตัวจนถึง $n$
- Prime Factorization ของ 1 **ไม่มี** (ไม่ได้เป็น empty product = 1)

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- [[Week9 - GCD and Euclidean Algorithm]] (ใช้ Prime Factorization ในการหา GCD)
- [[Week9 - Applications of Congruences]] (Pseudorandom, UPC Check Digits)
- [[Week9 - Cryptography and Ciphers]] (Prime ใช้ใน RSA Cryptosystem)
