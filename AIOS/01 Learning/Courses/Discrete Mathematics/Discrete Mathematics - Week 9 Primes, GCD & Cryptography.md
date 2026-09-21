# Discrete Mathematics - Week 9: Primes, GCD & Cryptography

## 1. จำนวนเฉพาะ (Prime Numbers) และการแยกตัวองค์ประกอบ

### 1.1 นิยามของ Prime และ Composite
* **Prime Number (จำนวนเฉพาะ):** จำนวนเต็มบวก $p > 1$ ที่มีตัวหารบวกเพียงสองตัวคือ $1$ และตัวมันเอง ($p$)
* **Composite Number (จำนวนประกอบ):** จำนวนเต็มบวก $p > 1$ ที่ไม่ใช่จำนวนเฉพาะ นั่นคือมีจำนวนเต็ม $a$ ซึ่ง $1 < a < p$ ที่ทำให้ $a \mid p$

### 1.2 ทฤษฎีบทมูลฐานของพีชคณิต (The Fundamental Theorem of Arithmetic)
จำนวนเต็มบวกทุกตัวที่มากกว่า 1 สามารถเขียนในรูปผลคูณของจำนวนเฉพาะได้อย่างเดียวเท่านั้น (Unique Prime Factorization) เมื่อเรียงลำดับจำนวนเฉพาะจากน้อยไปมาก

### 1.3 การทดสอบความเป็นจำนวนเฉพาะ (Trial Division & Sieve of Eratosthenes)
* **Trial Division Theorem:** ถ้า $n$ เป็นจำนวนประกอบ แล้ว $n$ จะต้องมีตัวหารเฉพาะ (Prime divisor) ที่มีค่าน้อยกว่าหรือเท่ากับ $\sqrt{n}$
* **Sieve of Eratosthenes:** แอลกอฮอริทึมหาจำนวนเฉพาะทั้งหมดที่ไม่เกิน $n$ โดยการตัดพหุคูณของจำนวนเฉพาะเริ่มจาก $2, 3, 5, \dots$ ไปเรื่อยๆ จนถึงตัวที่ไม่เกิน $\sqrt{n}$
* **ความอนันต์ของจำนวนเฉพาะ:** Euclid พิสูจน์ด้วยการขัดแย้ง (Proof by Contradiction) ว่าจำนวนเฉพาะมีจำนวนเป็นอนันต์

### 1.4 การอธิบายทดสอบจำนวนเฉพาะและแยกตัวประกอบด้วย Python Code

```python
def trial_division_factorization(n):
    """
    แยกตัวประกอบเฉพาะของ n ด้วยวิธี Trial Division (Brute-Force)
    """
    factors = []
    # ทดสอบหารด้วย 2 จนกว่าจะหารไม่ลงตัว
    while n % 2 == 0:
        factors.append(2)
        n //= 2
        
    # ทดสอบหารด้วยจำนวนคี่ตั้งแต่ 3 ขึ้นไป จนกว่าตัวหารยกกำลังสองจะเกิน n
    d = 3
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 2
        
    # หากเหลือค่า n มากกว่า 1 แสดงว่า n ที่เหลือนั้นเป็นจำนวนเฉพาะ
    if n > 1:
        factors.append(n)
    return factors

def sieve_of_eratosthenes(limit):
    """
    ค้นหาจำนวนเฉพาะทั้งหมดที่มีค่าน้อยกว่าหรือเท่ากับ limit ด้วยวิธีตะแกรงของเอราทอสเทนีส
    """
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    
    p = 2
    while p * p <= limit:
        if is_prime[p]:
            # ตัดพหุคูณทั้งหมดของ p ทิ้งไป (เริ่มจาก p*p เพราะพหุคูณก่อนหน้าถูกตัดไปแล้ว)
            for i in range(p * p, limit + 1, p):
                is_prime[i] = False
        p += 1
    return [x for x in range(2, limit + 1) if is_prime[x]]

# ตัวอย่างการใช้งาน
print("ตัวประกอบเฉพาะของ 7007:", trial_division_factorization(7007))  # [7, 7, 11, 13]
print("จำนวนเฉพาะที่ไม่เกิน 30:", sieve_of_eratosthenes(30))  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

---

## 2. ตัวหารร่วมมาก (Greatest Common Divisor - GCD)

### 2.1 นิยาม GCD และ Relative Prime
* **GCD:** $\gcd(a, b)$ คือจำนวนเต็มบวกที่มากที่สุดที่หารทั้ง $a$ และ $b$ ลงตัว
* **Relatively Prime (จำนวนเฉพาะสัมพัทธ์):** $a$ และ $b$ เป็น Relatively Prime ก็ต่อเมื่อ $\gcd(a, b) = 1$
* **Pairwise Relatively Prime:** ชุดของจำนวนเต็ม $a_1, a_2, \dots, a_n$ เป็น Pairwise Relatively Prime ถ้าทุกคู่ $i \neq j$ มี $\gcd(a_i, a_j) = 1$

### 2.2 ขั้นตอนวิธีของยูคลิด (Euclidean Algorithm)
แอลกอฮอริทึมที่มีประสิทธิภาพสูงในการหา $\gcd(a, b)$ โดยอาศัยหลักการ:
$$\text{ถ้า } a = bq + r \quad \text{แล้ว } \gcd(a, b) = \gcd(b, r)$$

* **Algorithm Pseudocode:**
  * กำหนด $x = a, y = b$
  * ขณะที่ $y \neq 0$: คำนวณ $r = x \bmod y$, แล้วให้ $x = y, y = r$
  * คืนค่า $x$ เป็นผลลัพธ์ $\gcd(a, b)$
  * ใช้จำนวนการหารเพียง $O(\log b)$ ครั้ง

### 2.3 การหา GCD ด้วย Python Code

```python
def gcd_euclidean(a, b):
    """
    หาตัวหารร่วมมาก (GCD) ของ a และ b ด้วย Euclidean Algorithm แบบ Iterative
    """
    a, b = abs(a), abs(b)
    # ให้ a มีค่ามากกว่า b เสมอ
    if b > a:
        a, b = b, a
        
    while b != 0:
        r = a % b
        a = b
        b = r
    return a

def gcd_recursive(a, b):
    """
    หาตัวหารร่วมมาก (GCD) ด้วยแบบจำลอง Recursion
    """
    return a if b == 0 else gcd_recursive(b, a % b)

# ตัวอย่างการใช้งาน
print("gcd(287, 91):", gcd_euclidean(287, 91))  # 7
print("gcd(2322, 654):", gcd_recursive(2322, 654))  # 6
```

---

## 3. การประยุกต์ใช้ Modular Arithmetic

### 3.1 ตัวเลขสุ่มเทียม (Pseudorandom Numbers)
สร้างด้วยวิธี **Linear Congruential Method**:
$$x_{n+1} = (ax_n + c) \bmod m$$
* $m$ = Modulus, $a$ = Multiplier, $c$ = Increment, $x_0$ = Seed

### 3.2 เลขรหัสตรวจสอบ (Check Digits - UPC)
รหัสบาร์โค้ดสินค้า (UPC 12 หลัก) ใช้หลักการ Modulo 10 ตรวจสอบความถูกต้อง:
$$(3x_1 + x_2 + 3x_3 + x_4 + 3x_5 + x_6 + 3x_7 + x_8 + 3x_9 + x_{10} + 3x_{11} + x_{12}) \equiv 0 \pmod{10}$$

### 3.3 โค้ดสร้างเลขสุ่มเทียมและตรวจสอบรหัสบาร์โค้ดด้วย Python

```python
def linear_congruential_generator(m, a, c, seed, count):
    """
    สร้างลำดับตัวเลขสุ่มเทียม (Pseudorandom Numbers)
    """
    sequence = []
    x = seed
    for _ in range(count):
        x = (a * x + c) % m
        sequence.append(x)
    return sequence

def validate_upc(upc_string):
    """
    ตรวจสอบความถูกต้องของรหัสบาร์โค้ด UPC 12 หลัก
    """
    if len(upc_string) != 12 or not upc_string.isdigit():
        return False
        
    digits = [int(ch) for ch in upc_string]
    
    # คำนวณผลคูณน้ำหนัก (ตำแหน่งคี่คูณ 3, ตำแหน่งคู่คูณ 1)
    total = sum(3 * digits[i] if i % 2 == 0 else digits[i] for i in range(12))
    return total % 10 == 0

# ตัวอย่างการใช้งาน
# LCG: m=9, a=7, c=4, seed=3
print("ลำดับ LCG (5 ตัวแรก):", linear_congruential_generator(9, 7, 4, 3, 5))  # [7, 8, 6, 1, 2]

# ตรวจสอบบาร์โค้ด UPC
print("UPC 041331021641 ถูกต้องหรือไม่:", validate_upc("041331021641"))  # True
print("UPC 041331021645 ถูกต้องหรือไม่:", validate_upc("041331021645"))  # False
```

---

## 4. รหัสวิทยาคลาสสิก (Classical Cryptography)

### 4.1 Caesar Cipher (รหัสซีซาร์)
แทนอักษร A-Z ด้วยตัวเลข $0-25$ แล้วเลื่อนไปทางขวา 3 ตำแหน่ง:
* **Encryption Function:** $f(p) = (p + 3) \bmod 26$
* **Decryption Function:** $f^{-1}(c) = (c - 3) \bmod 26$

### 4.2 Shift Cipher
ขยายความสามารถจาก Caesar Cipher โดยกำหนดคีย์ $k$ ใดๆ:
* **Encryption:** $f(p) = (p + k) \bmod 26$
* **Decryption:** $f^{-1}(c) = (c - k) \bmod 26$

### 4.3 โค้ดเข้ารหัสและถอดรหัส Shift Cipher ด้วย Python

```python
def shift_cipher_encrypt(plaintext, k):
    """
    เข้ารหัสข้อความภาษาอังกฤษ (ไม่ระบุตัวพิมพ์เล็ก/ใหญ่) ด้วย Shift Cipher และคีย์ k
    """
    ciphertext = []
    for ch in plaintext:
        if 'A' <= ch <= 'Z':
            p = ord(ch) - ord('A')
            c = (p + k) % 26
            ciphertext.append(chr(ord('A') + c))
        elif 'a' <= ch <= 'z':
            p = ord(ch) - ord('a')
            c = (p + k) % 26
            ciphertext.append(chr(ord('a') + c))
        else:
            ciphertext.append(ch)  # เก็บช่องว่างและสัญลักษณ์เดิมไว้
    return "".join(ciphertext)

def shift_cipher_decrypt(ciphertext, k):
    """
    ถอดรหัสข้อความด้วยการขยับย้อนกลับด้วยคีย์ -k
    """
    return shift_cipher_encrypt(ciphertext, -k)

# ตัวอย่างการใช้งาน
plain_text = "WINTER IS COMING"
cipher_text = shift_cipher_encrypt(plain_text, 3)
print(f"เข้ารหัส: '{plain_text}' -> '{cipher_text}'")  # 'ZLQWHU LV FRPLQJ'
print(f"ถอดรหัส: '{cipher_text}' -> '{shift_cipher_decrypt(cipher_text, 3)}'")  # 'WINTER IS COMING'
```

---

## เอกสารเชื่อมโยง (Backlinks)
* **สัปดาห์ก่อนหน้า:** [[Discrete Mathematics - Week 8 Divisibility & Modular Arithmetic]]
* **สัปดาห์ถัดไป:** [[Discrete Mathematics - Week 10 Relations]]
* **แบบฝึกหัดทบทวนประจำสัปดาห์:** [[HW-Discrete-Math-01]]
* **หัวข้อสืบเนื่อง:** [[Data & AI Engineer Skill Matrix]] (การนำความรู้ Cryptography และเศษเหลือไปใช้ในระบบความปลอดภัยข้อมูล)
