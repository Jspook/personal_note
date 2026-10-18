# Discrete Mathematics - Week 9: Cryptography and Ciphers

**วิชา:** Discrete Mathematics
**สถาบัน:** มหาวิทยาลัย (Sirasit Lochanachit, PhD)
**Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week9.pdf` (47 pages, slides)

---

## Part 1: Macro Architecture & Overview

```
Cryptography (Section 5)
├── 5.1 Classical Cryptography
│   ├── Caesar Cipher (shift = 3 เสมอ)
│   └── Shift Cipher (shift = k ทั่วไป)
└── Preview: Advanced Ciphers (Cybersecurity course)
    ├── Affine Cipher
    ├── Vigenère Cipher
    └── RSA (Public Key Cryptography)
```

**Encryption / Decryption Pipeline:**
```
Plaintext → [Encryption function f(p)] → Ciphertext
Ciphertext → [Decryption function f⁻¹(p)] → Plaintext
```

---

## Part 2: Deep Dive

### 5.1 Classical Cryptography — Caesar Cipher

> 💡 **Intuition:** Caesar cipher = "เลื่อนตัวอักษร" — ตัวอักษรแต่ละตัวเลื่อนไปข้างหน้า 3 ตำแหน่ง (A→D, Z→C) เหมือนการหมุนวงกลมตัวอักษร — ง่ายแต่ไม่ปลอดภัย (ถ้ารู้ว่าเป็นการเลื่อน ลอง shift แค่ 26 แบบก็แตก) ทำไมสำคัญ: เป็นรากฐานของการเข้ารหัส ช่วยเข้าใจแนวคิด shift cipher ทั่วไป
> [Source: generated — not verified against original document]

**ประวัติ:**
- Julius Caesar ส่งข้อความลับโดย **เลื่อนตัวอักษรไปข้างหน้า 3 ตัว**
- เช่น A→D, B→E, X→A, Y→B, Z→C

**ตัวอักษร ↔ ตัวเลข (Z₂₆):**

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |

| N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |

**สูตร:**
$$\text{Encryption: } f(p) = (p + 3) \bmod 26$$
$$\text{Decryption: } f^{-1}(p) = (p - 3) \bmod 26$$

---

**ตัวอย่าง: Encrypt "WINTER IS COMING"**

| Plain | W | I | N | T | E | R | I | S | C | O | M | I | N | G |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| p | 22 | 8 | 13 | 19 | 4 | 17 | 8 | 18 | 2 | 14 | 12 | 8 | 13 | 6 |
| f(p) | 25 | 11 | 16 | 22 | 7 | 20 | 11 | 21 | 5 | 17 | 15 | 11 | 16 | 9 |
| Cipher | **Z** | **L** | **Q** | **W** | **H** | **U** | **L** | **V** | **F** | **R** | **P** | **L** | **Q** | **J** |

**ผลลัพธ์:** `ZLQWHULVFRPLQJ`

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "A=0, Z=25" → ตัวอักษรแปลงเป็นเลข (A=0 ไม่ใช่ 1)
- "Encryption: f(p) = (p + 3) mod 26" → เลื่อนไปข้างหน้า 3, เกิน Z ให้วนกลับมาที่ A (mod 26)
- "Decryption: f⁻¹(p) = (p - 3) mod 26" → เลื่อนย้อนกลับ 3 (p ตรงนี้คือเลขของตัว ciphertext)

**ตัวอย่าง:**
- ✅ Encrypt W (22) → (22+3) mod 26 = 25 → Z ✓
- ✅ Encrypt Z (25) → (25+3) mod 26 = 28 mod 26 = 2 → C ✓
- ❌ ลืม mod 26 → เลขใหญ่ (28 แทน 2)
- **ต่างกันตรง:** ทั้งเข้าและถอดต้องใช้ A=0 ให้สม่ำเสมอ

**อย่าสับสน:** "Caesar = shift 3" ≠ "Shift cipher = k ใดๆ" — Caesar เป็นกรณีพิเศษ

**เช็คความเข้าใจ:** Encrypt "ABC" ด้วย Caesar cipher
<details><summary>เฉลย</summary>

A (0) → (0+3) mod 26 = 3 → D
B (1) → (1+3) mod 26 = 4 → E
C (2) → (2+3) mod 26 = 5 → F
ผลลัพธ์: DEF
</details>

---

### Shift Cipher (ทั่วไป)

> 💡 **Intuition:** Shift cipher = Caesar ที่ "k" ใดๆ ไม่ใช่แค่ 3 — ถ้า k=1 เลื่อน 1, k=5 เลื่อน 5 เป็นต้น ทำไมสำคัญ: ให้ความยืดหยุ่น (26 key ที่เป็นไปได้) แต่ยังไม่ปลอดภัยเพราะ brute force ลองทั้ง 26 ค่า
> [Source: generated — not verified against original document]

Caesar cipher เป็นกรณีพิเศษของ **Shift Cipher** ที่ $k = 3$

$$\text{Encryption: } f(p) = (p + k) \bmod 26$$
$$\text{Decryption: } f^{-1}(p) = (p - k) \bmod 26$$

- $k$ เรียกว่า **key** (กุญแจ)
- มี key ได้ 26 ค่า (0–25) → ถอดรหัสโดย brute force ได้ง่ายมาก

**🧭 ทำความเข้าใจ** _[Source: generated — not verified against original document]_

**แตกวลีสำคัญ:**
- "Key k" → จำนวนตำแหน่งที่เลื่อน (0 ≤ k ≤ 25)
- "Encryption / Decryption" → เข้า = +k, ถอด = −k
- "Brute force" → ลองทั้ง 26 key จนหา plaintext ที่มี sense

**ตัวอย่าง:**
- ✅ Decrypt "FVB" ด้วย k=7, (p − 7) mod 26: F(5)→5−7=−2→24(Y), V(21)→21−7=14(O), B(1)→1−7=−6→20(U) → "YOU" ✓
- ✅ Encrypt "YOU" ด้วย k=7, (p + 7) mod 26: Y(24)→24+7=31→5(F), O(14)→14+7=21(V), U(20)→20+7=27→1(B) → "FVB" ✓ (ย้อนกลับได้ตรงกัน)
- ❌ ลืม mod 26 เมื่อติดลบ → ได้ −2 ซึ่งไม่ใช่ตัวอักษร (ต้องบวก 26 ได้ 24 = Y)
- **ต่างกันตรง:** Shift k=3 คือ Caesar, Shift k=ใดๆ คือ Shift cipher ทั่วไป

**อย่าสับสน:** "Shift cipher with k=3" = Caesar, "Shift cipher with k=5" ≠ Caesar — ต่างค่า k คือ cipher ต่างกัน

**เช็คความเข้าใจ:** Decrypt "BCD" ด้วย k=1
<details><summary>เฉลย</summary>

B (1) → (1−1) mod 26 = 0 → A
C (2) → (2−1) mod 26 = 1 → B
D (3) → (3−1) mod 26 = 2 → C
ผลลัพธ์: ABC
</details>

---

**ตัวอย่าง: Decrypt "FVB ZOHSS UVA WHZZ" โดย $k = 7$**

| Cipher | F | V | B | Z | O | H | S | S | U | V | A | W | H | Z | Z |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| p | 5 | 21 | 1 | 25 | 14 | 7 | 18 | 18 | 20 | 21 | 0 | 22 | 7 | 25 | 25 |
| p−7 mod 26 | −2→24 | 14 | −6→20 | 18 | 7 | 0 | 11 | 11 | 13 | 14 | −7→19 | 15 | 0 | 18 | 18 |
| Plain | **Y** | **O** | **U** | **S** | **H** | **A** | **L** | **L** | **N** | **O** | **T** | **P** | **A** | **S** | **S** |

**ผลลัพธ์:** `YOU SHALL NOT PASS` 🧙

> **หมายเหตุ:** เมื่อผลติดลบ เช่น $-2 \bmod 26 = 24$ (คือ F→Y)

---

### Preview: Advanced Cryptography (Cybersecurity Course)

| Cipher | หลักการ |
|:---|:---|
| **Affine Cipher** | $f(p) = (ap + b) \bmod 26$ (ใช้ทั้งคูณและบวก) |
| **Vigenère Cipher** | ใช้ key หลายตัวอักษรสลับกัน |
| **RSA (Public Key)** | ใช้ prime numbers ขนาดใหญ่ — ยากต่อการ factor |
| **Public Key Crypto** | มี public key (เข้ารหัส) และ private key (ถอดรหัส) |

#### 💡 เสริม: Affine Cipher

> 💡 **Intuition:** Affine cipher คือ Shift cipher ที่เพิ่มการ "คูณ" เข้าไปก่อนเลื่อน: f(p) = (ap + b) mod 26 — ตัว b ทำหน้าที่เลื่อนเหมือนเดิม ส่วน a เปลี่ยนการจับคู่ตัวอักษร ความรู้ใหม่ที่สำคัญคือ a ต้องไม่ทำให้สองตัวอักษรชนกัน ซึ่งต่อกับ GCD โดยตรง (analogy ใช้ไม่ได้ตรงที่ "การคูณ mod 26" ไม่ได้ยืดตัวอักษรจริง แต่เป็นการสลับตำแหน่งตามกฎคูณในเลขคณิต mod 26)
> [Source: generated — not verified against original document]

**แตกวลีสำคัญ:**
- "f(p) = (ap + b) mod 26" → คูณ p ด้วย a แล้วบวก b แล้ว mod 26 (a = multiplier, b = shift)
- "gcd(a, 26) = 1" → เงื่อนไขที่ a ต้องมี เพื่อให้มี a⁻¹ (mod 26) และถอดรหัสได้
- "a⁻¹" → ค่าที่ a × a⁻¹ ≡ 1 (mod 26) ใช้ย้อนการคูณตอนถอดรหัส

**ตัวอย่าง:** f(p) = (3p + 5) mod 26
- ✅ gcd(3, 26) = 1 → ใช้ได้ เพราะ 3 × 9 = 27 ≡ 1 (mod 26) จึง a⁻¹ = 9
  - เข้ารหัส A (0): (3×0 + 5) mod 26 = 5 → F; B (1): (3×1 + 5) mod 26 = 8 → I
  - ถอดรหัส f⁻¹(c) = 9(c − 5) mod 26: F (5) → 9×0 = 0 → A ✓; I (8) → 9×3 = 27 mod 26 = 1 → B ✓
- ❌ f(p) = (2p + 0) mod 26: gcd(2, 26) = 2 ≠ 1 → A (0) และ N (13) เข้ารหัสได้ A ทั้งคู่ (2×13 = 26 ≡ 0) → ถอดรหัสไม่ได้เพราะไม่รู้ว่า A มาจากตัวไหน
- **ต่างกันตรง:** gcd(a, 26) = 1 หรือไม่ — ถ้าไม่ ฟังก์ชันไม่เป็น 1-to-1

**อย่าสับสน:** Shift cipher เป็นกรณีพิเศษ a = 1 ของ Affine — b คือค่าเลื่อน ไม่ใช่ a

**เช็คความเข้าใจ:** f(p) = (5p + 1) mod 26 ใช้ได้หรือไม่ ถ้าใช้ได้ เข้ารหัส B (1) ได้อะไร
<details><summary>เฉลย</summary>

26 = 5 × 5 + 1 → gcd(5, 26) = gcd(5, 1) = 1 → ใช้ได้ ✓
B (1) → (5×1 + 1) mod 26 = 6 → **G**
</details>

---

## Part 3: Quick Reference & Exam Cheat Sheet

| แนวคิด | สูตร |
|:---|:---|
| Caesar Encrypt | $f(p) = (p + 3) \bmod 26$ |
| Caesar Decrypt | $f^{-1}(p) = (p - 3) \bmod 26$ |
| Shift Encrypt | $f(p) = (p + k) \bmod 26$ |
| Shift Decrypt | $f^{-1}(p) = (p - k) \bmod 26$ |
| A=0, Z=25 | จำ: ตัวอักษรในตำแหน่งที่ $n$ → เลข $n-1$ |
| ติดลบ | $-x \bmod 26 = 26 - x$ |

---

## ⚠️ Common Pitfalls & Exam Traps

- **A = 0** ไม่ใช่ A = 1! — ผิดบ่อยมาก
- เมื่อ $p - k < 0$ ต้อง $+26$ เพื่อให้ได้ค่าใน $Z_{26}$
- Caesar cipher ไม่ปลอดภัย: มีแค่ 26 possibilities → brute force ได้ใน seconds
- Shift cipher และ Caesar cipher **ต่างกันแค่ค่า $k$** — เป็น cipher family เดียวกัน

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

- [[Week9 - Prime Numbers and Factorization]] (RSA ต้องการ prime numbers ขนาดใหญ่)
- [[Week9 - Applications of Congruences]] (Pseudorandom ใช้ใน cryptographic systems)
- [[Week9 - GCD and Euclidean Algorithm]] (Extended Euclidean ใช้ใน RSA key generation)
