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

---

### Shift Cipher (ทั่วไป)

Caesar cipher เป็นกรณีพิเศษของ **Shift Cipher** ที่ $k = 3$

$$\text{Encryption: } f(p) = (p + k) \bmod 26$$
$$\text{Decryption: } f^{-1}(p) = (p - k) \bmod 26$$

- $k$ เรียกว่า **key** (กุญแจ)
- มี key ได้ 26 ค่า (0–25) → ถอดรหัสโดย brute force ได้ง่ายมาก

---

**ตัวอย่าง: Decrypt "FVB ZOHSS UVA WHZZ" โดย $k = 7$**

| Cipher | F | V | B | Z | O | H | S | S | U | V | A | W | H | Z | Z |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| p | 5 | 21 | 1 | 25 | 14 | 7 | 18 | 18 | 20 | 21 | 0 | 22 | 7 | 25 | 25 |
| p−7 mod 26 | −2→24 | 14 | −6→20 | 18 | 7 | 0 | 11 | 11 | 13 | 14 | −7→19 | 15 | 0 | 18 | 18 |
| Plain | **Y** | **O** | **U** | **S** | **H** | **A** | **L** | **L** | **N** | **O** | **T** | **P** | **A** | **S** | **S** |

**ผลลัพธ์:** `YOU SHALL NOT PASS` 🧙

> **หมายเหตุ:** เมื่อผลติดลบ เช่น $-2 \bmod 26 = 24$ (คือ A→Y)

---

### Preview: Advanced Cryptography (Cybersecurity Course)

| Cipher | หลักการ |
|:---|:---|
| **Affine Cipher** | $f(p) = (ap + b) \bmod 26$ (ใช้ทั้งคูณและบวก) |
| **Vigenère Cipher** | ใช้ key หลายตัวอักษรสลับกัน |
| **RSA (Public Key)** | ใช้ prime numbers ขนาดใหญ่ — ยากต่อการ factor |
| **Public Key Crypto** | มี public key (เข้ารหัส) และ private key (ถอดรหัส) |

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
