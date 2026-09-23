# แบบฝึกหัด Discrete Mathematics Week 9 — Number Theory (Cont.)

## ข้อมูลทั่วไป
* **รหัสแบบฝึกหัด:** HW-Discrete-Math-02
* **หัวข้อ:** Primes, GCD, Euclidean Algorithm, Pseudorandom Numbers, Check Digits, Caesar/Shift Cipher
* **สถานที่บันทึก:** `AIOS/01 Learning/Learning Progress/HW-Discrete-Math-02.md`
* **Source:** `Resources/Books/Discrete Mathematics/myDiscrete_Week9.pdf`

---

## Section A: Prime Numbers & Factorization

### ข้อ A1: Prime Testing
จงระบุว่าจำนวนต่อไปนี้เป็น prime หรือ composite พร้อมแสดงเหตุผล

| จำนวน | Prime / Composite? | เหตุผล |
|:---:|:---:|:---|
| 97 | | |
| 121 | | |
| 131 | | |
| 289 | | |

<details>
<summary>เฉลย</summary>

| จำนวน | Prime / Composite? | เหตุผล |
|:---:|:---:|:---|
| 97 | **Prime** ✅ | $\sqrt{97} \approx 9.8$ → ทดสอบ 2,3,5,7: ไม่หารลงตัว |
| 121 | **Composite** ❌ | $121 = 11^2$ |
| 131 | **Prime** ✅ | $\sqrt{131} \approx 11.4$ → ทดสอบ 2,3,5,7,11: ไม่หารลงตัว |
| 289 | **Composite** ❌ | $289 = 17^2$ |

</details>

---

### ข้อ A2: Prime Factorization
จงหา prime factorization ของจำนวนต่อไปนี้

1. $360$
2. $2310$
3. $1001$

<details>
<summary>เฉลย</summary>

1. $360 = 2^3 \times 3^2 \times 5$
   - 360÷2=180, 180÷2=90, 90÷2=45, 45÷3=15, 15÷3=5, 5 เป็น prime

2. $2310 = 2 \times 3 \times 5 \times 7 \times 11$
   - 2310÷2=1155, 1155÷3=385, 385÷5=77, 77÷7=11, 11 เป็น prime

3. $1001 = 7 \times 11 \times 13$
   - 1001÷7=143, 143÷11=13, 13 เป็น prime

</details>

---

### ข้อ A3: Sieve of Eratosthenes
จงหาจำนวนเฉพาะทั้งหมดที่ไม่เกิน 50 โดยวิธี Sieve of Eratosthenes แสดงขั้นตอน

<details>
<summary>เฉลย</summary>

$\sqrt{50} \approx 7.07$ → ตัด multiples ของ 2, 3, 5, 7

จำนวนเฉพาะ ≤ 50:
**2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47**

</details>

---

## Section B: GCD and Euclidean Algorithm

### ข้อ B1: GCD โดย Prime Factorization
จงหา $\gcd(a, b)$ โดยวิธี prime factorization

1. $\gcd(84, 96)$
2. $\gcd(17, 47)$
3. $\gcd(420, 180)$

<details>
<summary>เฉลย</summary>

1. $84 = 2^2 \times 3 \times 7$, $96 = 2^5 \times 3$
   → $\gcd(84, 96) = 2^{\min(2,5)} \times 3^{\min(1,1)} = 4 \times 3 = \mathbf{12}$

2. $17$ เป็น prime, $47$ เป็น prime (ต่างกัน)
   → $\gcd(17, 47) = \mathbf{1}$ (relatively prime)

3. $420 = 2^2 \times 3 \times 5 \times 7$, $180 = 2^2 \times 3^2 \times 5$
   → $\gcd(420, 180) = 2^2 \times 3 \times 5 = \mathbf{60}$

</details>

---

### ข้อ B2: Euclidean Algorithm
จงหา GCD ต่อไปนี้โดย Euclidean Algorithm แสดงทุกขั้นตอน

1. $\gcd(2322, 654)$
2. $\gcd(27664, 2054)$
3. $\gcd(414, 662)$

<details>
<summary>เฉลย</summary>

**1. gcd(2322, 654)**
```
2322 = 654×3 + 360   → gcd(654, 360)
654  = 360×1 + 294   → gcd(360, 294)
360  = 294×1 + 66    → gcd(294, 66)
294  = 66×4  + 30    → gcd(66, 30)
66   = 30×2  + 6     → gcd(30, 6)
30   = 6×5   + 0     → gcd = 6
```
**gcd(2322, 654) = 6**

**2. gcd(27664, 2054)**
```
27664 = 2054×13 + 962   → gcd(2054, 962)
2054  = 962×2   + 130   → gcd(962, 130)
962   = 130×7   + 52    → gcd(130, 52)
130   = 52×2    + 26    → gcd(52, 26)
52    = 26×2    + 0     → gcd = 26
```
**gcd(27664, 2054) = 26**

**3. gcd(414, 662)**
```
662 = 414×1 + 248   → gcd(414, 248)
414 = 248×1 + 166   → gcd(248, 166)
248 = 166×1 + 82    → gcd(166, 82)
166 = 82×2  + 2     → gcd(82, 2)
82  = 2×41  + 0     → gcd = 2
```
**gcd(414, 662) = 2**

</details>

---

### ข้อ B3: Relatively Prime
จงระบุว่าคู่จำนวนต่อไปนี้ relatively prime หรือไม่

1. $\gcd(35, 78)$
2. $\gcd(34, 55)$
3. จำนวน 10, 17, 21 เป็น pairwise relatively prime หรือไม่?

<details>
<summary>เฉลย</summary>

1. $35 = 5 \times 7$, $78 = 2 \times 3 \times 13$ → ไม่มีตัวประกอบร่วม → **Relatively prime ✅** ($\gcd = 1$)

2. $34 = 2 \times 17$, $55 = 5 \times 11$ → ไม่มีตัวประกอบร่วม → **Relatively prime ✅** ($\gcd = 1$)

3. $\gcd(10,17)=1$, $\gcd(10,21)=1$, $\gcd(17,21)=1$ → **Pairwise relatively prime ✅**

</details>

---

## Section C: Pseudorandom Numbers

### ข้อ C1: Linear Congruential Method
จงหา pseudorandom sequence 8 ตัวแรก โดยใช้ $m=11$, $a=7$, $c=3$, $x_0=5$

<details>
<summary>เฉลย</summary>

$x_{n+1} = (7x_n + 3) \bmod 11$

| n | $x_n$ | การคำนวณ | $x_{n+1}$ |
|:---:|:---:|:---|:---:|
| 0 | 5 | $(35+3) \bmod 11 = 38 \bmod 11$ | 5 → 38=3×11+5 → **5** |
| 0 | 5 | $7(5)+3=38$, $38 \bmod 11=5$ | 5 |
| 1 | 5 | $7(5)+3=38$, $38 \bmod 11=5$ | 5 |

> หมายเหตุ: ถ้า sequence วนซ้ำเร็ว แสดงว่าพารามิเตอร์ไม่ดี

แก้ไข computation:
- $x_0=5$: $(7\times5+3)=38, 38\bmod11=5$ → $x_1=5$ (period=1, bad params)

ลองใช้ $x_0=1$ แทน: $7(1)+3=10$, $7(10)+3=73\bmod11=7$, $7(7)+3=52\bmod11=8$, ...
**Sequence (x₀=5):** 5, 5, 5, ... (วนซ้ำ — bad seed/params combo)

</details>

---

## Section D: Check Digits (UPC)

### ข้อ D1: หา Check Digit
จงหา check digit (หลักที่ 12) ของ UPC ต่อไปนี้

1. `01234567890_`
2. `61414121229_`

<details>
<summary>เฉลย</summary>

**UPC Formula:** $3x_1+x_2+3x_3+x_4+3x_5+x_6+3x_7+x_8+3x_9+x_{10}+3x_{11}+x_{12} \equiv 0 \pmod{10}$

**1. UPC: 01234567890_**
$3(0)+1+3(2)+3+3(4)+5+3(6)+7+3(8)+9+3(0)+x_{12}$
$= 0+1+6+3+12+5+18+7+24+9+0+x_{12}$
$= 85+x_{12} \equiv 0 \pmod{10}$
$x_{12} = 5$

**Check digit = 5** → UPC: `012345678905`

**2. UPC: 61414121229_**
$3(6)+1+3(4)+1+3(4)+1+3(2)+1+3(2)+2+3(9)+x_{12}$
$= 18+1+12+1+12+1+6+1+6+2+27+x_{12}$
$= 87+x_{12} \equiv 0 \pmod{10}$
$x_{12} = 3$

**Check digit = 3** → UPC: `614141212293`

</details>

---

### ข้อ D2: ตรวจสอบ UPC
จงตรวจว่า UPC ต่อไปนี้ถูกต้องหรือไม่

1. `036000291452`
2. `041331021641`

<details>
<summary>เฉลย</summary>

**1. 036000291452:**
$3(0)+3+3(6)+0+3(0)+0+3(2)+9+3(1)+4+3(5)+2$
$= 0+3+18+0+0+0+6+9+3+4+15+2 = 60$
$60 \bmod 10 = 0$ → **ถูกต้อง ✅**

**2. 041331021641:**
$3(0)+4+3(1)+3+3(3)+1+3(0)+2+3(1)+6+3(4)+1$
$= 0+4+3+3+9+1+0+2+3+6+12+1 = 44$
$44 \bmod 10 = 4 \neq 0$ → **ไม่ถูกต้อง ❌**

</details>

---

## Section E: Cryptography (Caesar & Shift Cipher)

### ข้อ E1: Caesar Cipher Encryption
จงเข้ารหัสข้อความต่อไปนี้ด้วย Caesar Cipher (k=3)

1. `HELLO WORLD`
2. `MATH IS FUN`

<details>
<summary>เฉลย</summary>

**Encryption: f(p) = (p+3) mod 26**

**1. HELLO WORLD:**
H(7)→J(10)=**K**, E(4)→7=**H**, L(11)→14=**O**, L→**O**, O(14)→17=**R**, W(22)→25=**Z**, O→**R**, R(17)→20=**U**, L→**O**, D(3)→6=**G**

→ `KHOOR ZRUOG`

**2. MATH IS FUN:**
M(12)→15=**P**, A(0)→3=**D**, T(19)→22=**W**, H(7)→10=**K**, I(8)→11=**L**, S(18)→21=**V**, F(5)→8=**I**, U(20)→23=**X**, N(13)→16=**Q**

→ `PDWK LV IXQ`

</details>

---

### ข้อ E2: Shift Cipher Decryption
จงถอดรหัสข้อความต่อไปนี้ โดยที่รู้ว่าใช้ Shift Cipher ด้วย k=7

`AOLY LZ JVSV NBHYK`

<details>
<summary>เฉลย</summary>

**Decryption: f⁻¹(p) = (p−7) mod 26**

A(0)→-7→19=T, O(14)→7=H, L(11)→4=E, Y(24)→17=R
L(11)→4=E, Z(25)→18=S
J(9)→2=C, V(21)→14=O, S(18)→11=L, V(21)→14=O, N(13)→6=G, B(1)→-6→20=U, H(7)→0=A, K(10)→3=D

→ **`THER ES COLOR GUARD`** → `THERE IS COLOR GUARD`

</details>

---

### ข้อ E3: วิเคราะห์ความปลอดภัย
ทำไม Shift Cipher ถึงไม่ปลอดภัยสำหรับการใช้งานจริง? อธิบายพร้อมยกตัวอย่างวิธีโจมตี

<details>
<summary>เฉลย</summary>

**เหตุผล:** Shift Cipher มี key space เพียง **26 ค่า** (k = 0 ถึง 25)

**วิธีโจมตี (Brute Force Attack):**
1. ลองถอดรหัสด้วย k=0, k=1, ..., k=25
2. ดูว่า plaintext ไหนอ่านรู้เรื่อง
3. ทำได้ใน **seconds** ด้วยคอมพิวเตอร์

**ตัวอย่าง:** ถ้าพบ `KHOOR` → ลอง k=3 → `HELLO` อ่านรู้เรื่อง → พบ key แล้ว

**วิธีโจมตีอีกแบบ (Frequency Analysis):**
- ในภาษาอังกฤษ ตัวอักษรที่ใช้บ่อยที่สุดคือ E, T, A
- ถ้าตัวอักษรที่พบบ่อยสุดใน ciphertext คือ H → น่าจะ E+3=H → k=3

</details>

---

## สรุปแบบฝึกหัด

| Section | หัวข้อ | จำนวนข้อ | ความยาก |
|:---:|:---|:---:|:---:|
| A | Prime Numbers & Factorization | 3 ข้อ | ⭐⭐ |
| B | GCD & Euclidean Algorithm | 3 ข้อ | ⭐⭐ |
| C | Pseudorandom Numbers | 1 ข้อ | ⭐⭐⭐ |
| D | Check Digits (UPC) | 2 ข้อ | ⭐⭐ |
| E | Cryptography (Cipher) | 3 ข้อ | ⭐⭐⭐ |
