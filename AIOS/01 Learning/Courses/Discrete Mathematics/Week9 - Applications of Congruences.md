# Discrete Mathematics - Week 9: Applications of Congruences

**วิชา:** Discrete Mathematics
**สถาบัน:** มหาวิทยาลัย (Sirasit Lochanachit, PhD)
**Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week9.pdf` (47 pages, slides)

---

## Part 1: Macro Architecture & Overview

```
Applications of Congruences (Section 4)
├── 4.1 Hashing Functions (→ Data Structures course)
├── 4.2 Pseudorandom Numbers
│   ├── Linear Congruential Method
│   └── Recursion: x_{n+1} = (ax_n + c) mod m
└── 4.3 Check Digits
    ├── UPC (Universal Product Code) — 12 digits
    └── ISBN (ไม่ได้ cover ใน slides นี้)
```

---

## Part 2: Deep Dive

### 4.2 Pseudorandom Numbers (จำนวนสุ่มเทียม)

**แนวคิด:**
- คอมพิวเตอร์ต้องการตัวเลขสุ่ม (simulations, games, cryptography)
- แต่ไม่มีการสุ่มจริง — ใช้ **pseudorandom numbers** ที่สร้างจากสูตรทางคณิตศาสตร์แทน

**Linear Congruential Method:**

$$x_{n+1} = (ax_n + c) \bmod m$$

โดยกำหนดพารามิเตอร์ 4 ตัว:
| พารามิเตอร์ | ชื่อ | เงื่อนไข |
|:---:|:---|:---|
| $m$ | modulus | $m \geq 2$ |
| $a$ | multiplier | $2 \leq a < m$ |
| $c$ | increment | $0 \leq c < m$ |
| $x_0$ | seed (ค่าเริ่มต้น) | $0 \leq x_0 < m$ |

> **ข้อสังเกต:** ถ้าใช้ seed เดิม → ได้ผลลัพธ์เหมือนเดิมเสมอ (reproducible)

**Python ตัวอย่าง:**
```python
import random
random.seed(9001)       # กำหนด seed
random.randint(1, 10)   # ได้ผลเหมือนกันทุกครั้งที่ seed เดิม
```

---

**ตัวอย่าง:** หา pseudorandom sequence จาก $m = 9$, $a = 7$, $c = 4$, $x_0 = 3$

$$x_{n+1} = (7x_n + 4) \bmod 9$$

|  n  | $x_n$ | การคำนวณ                                | $x_{n+1}$ |
| :-: | :---: | :-------------------------------------- | :-------: |
|  0  |   3   | $(7 \times 3 + 4) \bmod 9 = 25 \bmod 9$ |     7     |
|  1  |   7   | $(7 \times 7 + 4) \bmod 9 = 53 \bmod 9$ |     8     |
|  2  |   8   | $(7 \times 8 + 4) \bmod 9 = 60 \bmod 9$ |     6     |
|  3  |   6   | $(7 \times 6 + 4) \bmod 9 = 46 \bmod 9$ |     1     |
|  4  |   1   | $(7 \times 1 + 4) \bmod 9 = 11 \bmod 9$ |     2     |
|  5  |   2   | $(7 \times 2 + 4) \bmod 9 = 18 \bmod 9$ |     0     |
|  6  |   0   | $(7 \times 0 + 4) \bmod 9 = 4  \bmod 9$ |     4     |
|  7  |   4   | $(7 \times 4 + 4) \bmod 9 = 32 \bmod 9$ |     5     |
|  8  |   5   | $(7 \times 5 + 4) \bmod 9 = 39 \bmod 9$ |     3     |
|  9  |   3   | วนซ้ำ (period = 9)                      |     —     |

**Sequence:** 3, 7, 8, 6, 1, 2, 0, 4, 5, 3, 7, 8, ...

> ถ้าต้องการเลขระหว่าง 0 ถึง 1 ให้หารด้วย $m$: $x_n / m$

---

### 4.3 Check Digits: UPC (Universal Product Code)

**แนวคิด:**
- สินค้าทุกชิ้นมีบาร์โค้ด **UPC** 12 หลัก
- หลักสุดท้าย (หลักที่ 12) คือ **check digit** ที่ใช้ตรวจสอบความถูกต้อง

**สูตร Check Digit:**

$$3x_1 + x_2 + 3x_3 + x_4 + 3x_5 + x_6 + 3x_7 + x_8 + 3x_9 + x_{10} + 3x_{11} + x_{12} \equiv 0 \pmod{10}$$

- หลักคี่ (1, 3, 5, 7, 9, 11) คูณด้วย **3**
- หลักคู่ (2, 4, 6, 8, 10, 12) คูณด้วย **1**

---

**ตัวอย่าง 1:** หา check digit ของ UPC `79357343104_`

$$3(7) + 9 + 3(3) + 5 + 3(7) + 3 + 3(4) + 3 + 3(1) + 0 + 3(4) + x_{12} \equiv 0 \pmod{10}$$
$$21 + 9 + 9 + 5 + 21 + 3 + 12 + 3 + 3 + 0 + 12 + x_{12} \equiv 0 \pmod{10}$$
$$98 + x_{12} \equiv 0 \pmod{10}$$
$$x_{12} \equiv -98 \equiv -8 \equiv 2 \pmod{10}$$

**Check digit = 2** → UPC สมบูรณ์: `793573431042`

---

**ตัวอย่าง 2:** ตรวจสอบว่า `041331021641` เป็น UPC ที่ถูกต้องหรือไม่

$$3(0) + 4 + 3(1) + 3 + 3(3) + 1 + 3(0) + 2 + 3(1) + 6 + 3(4) + 1$$
$$= 0 + 4 + 3 + 3 + 9 + 1 + 0 + 2 + 3 + 6 + 12 + 1 = 44$$

$44 \bmod 10 = 4 \neq 0$ → **ไม่ถูกต้อง** ❌

---

## Part 3: Quick Reference & Exam Cheat Sheet

| แนวคิด | สูตร / กฎสำคัญ |
|:---|:---|
| Pseudorandom (Linear) | $x_{n+1} = (ax_n + c) \bmod m$ |
| พารามิเตอร์ | $m$: modulus, $a$: multiplier, $c$: increment, $x_0$: seed |
| UPC Check Formula | $\sum (\text{odd pos} \times 3 + \text{even pos}) \equiv 0 \pmod{10}$ |
| ตรวจ UPC ถูก | ผลรวม $\equiv 0 \pmod{10}$ |
| หา check digit | แก้สมการ $\text{sum} + x_{12} \equiv 0 \pmod{10}$ |

---

## ⚠️ Common Pitfalls & Exam Traps

- Pseudorandom ≠ random จริง: ถ้า seed เดิม ผลลัพธ์เดิมเสมอ
- UPC: นับตำแหน่งจาก **1** ไม่ใช่ 0 — ผิดพลาดบ่อยมาก
- ค่าสัมประสิทธิ์ UPC: **คี่คูณ 3**, **คู่คูณ 1** (ไม่ใช่กลับกัน)
- เวลา check validity ต้องรวม check digit ด้วย แล้ว mod 10 ต้องได้ 0

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- [[Week9 - Prime Numbers and Factorization]] (Pseudorandom ใช้ใน Cryptography ที่ต้องการ prime)
- [[Week9 - GCD and Euclidean Algorithm]] (GCD ใช้ในการออกแบบ congruence systems)
- [[Week9 - Cryptography and Ciphers]] (Pseudorandom สำคัญสำหรับ key generation)
