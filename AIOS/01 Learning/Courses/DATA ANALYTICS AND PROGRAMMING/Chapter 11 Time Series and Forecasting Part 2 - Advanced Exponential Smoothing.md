# DATA ANALYTICS - Week 11: Time Series & Forecasting Part 2 — Advanced Exponential Smoothing

> **วิชา:** DATA ANALYTICS AND PROGRAMMING | **สถาบัน:** คณะเทคโนโลยีสารสนเทศ
> **Source:** `Resources/Books/DATA ANALYTICS AND PROGRAMMING/Concept/data analysis11_69 forecasting2.pdf` (47 slides)

---

## Part 1: Macro Architecture & Overview

**Advanced Forecasting Methods** ขยายความจากบท 10 โดยเน้นเทคนิค **Exponential Smoothing** ที่ซับซ้อนมากขึ้น — เมื่อข้อมูล Time Series มี Trend แบบเชิงเส้น และ/หรือ Seasonality ที่ชัดเจน วิธีการอย่างง่ายเช่น Moving Average ไม่เพียงพอ ต้องใช้วิธีการถ่วงน้ำหนักแบบ Exponential ที่ยืดหยุ่นมากขึ้น เพื่อจับรูปแบบและพยากรณ์อนาคตได้แม่นยำกว่า

```text
Data Classification
├── Horizontal Pattern (ระดับคงที่)
│   └── Single Exponential Smoothing
│
├── Linear Trend (แนวโน้มเชิงเส้น)
│   └── Double Exponential Smoothing (Brown's Method)
│
└── Trend + Seasonality (แนวโน้ม + ฤดูกาล)
    └── Triple Exponential Smoothing (Holt-Winters)
        ├── Multiplicative Form (ฤดูกาลแปรผันตามระดับ)
        └── Additive Form (ฤดูกาลคงที่)
```

> 💡 **Recommended Tool for Conversion:** Mermaid (Decision Tree / Classification Flowchart)

### ตารางเปรียบเทียบวิธีการเรียบแบบ Exponential

| วิธี | ลักษณะข้อมูล | พารามิเตอร์ | สูตรหลัก | เหมาะกับ |
| :--- | :--- | :--- | :--- | :--- |
| **Single Exponential** | Horizontal (ไม่มี Trend) | α (0 < α < 1) | Fₜ₊₁ = αYₜ + (1-α)Fₜ | ข้อมูลมีค่าคงที่ |
| **Double Exponential (Brown)** | Linear Trend | α (0.05-0.1) | Fₜ₊ₘ = aₜ + bₜ(m) | ข้อมูลมี Trend แนวโน้ม |
| **Triple Exponential (Holt-Winters)** | Trend + Seasonality | α, β, γ | Fₜ₊ₘ = (Lₜ + bₜm)Sₜ₋ₛ₊ₘ | ข้อมูลมี Trend และ Seasonality |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 Single Exponential Smoothing (การเรียบแบบเอ็กซ์โพเนนเชียลอย่างง่าย)

#### แนวคิด
วิธี **Single Exponential Smoothing** คือการคำนวณค่าเฉลี่ยถ่วงน้ำหนัก โดยให้น้ำหนัก **α (Alpha)** กับข้อมูลล่าสุด มากที่สุด แล้วน้ำหนักจะลดลงแบบ Exponential เมื่อข้อมูลมีความเก่ามากขึ้น

- **α ใกล้ 1** (เช่น 0.7-0.9): ให้น้ำหนักข้อมูลล่าสุดมาก → ตอบสนองเร็ว แต่ผันผวน
- **α ใกล้ 0** (เช่น 0.05-0.2): ให้น้ำหนักข้อมูลเก่ามาก → เรียบขึ้น แต่ตอบสนองช้า

#### ขั้นตอนการหาค่าพยากรณ์

```
STEP 1: กำหนดค่าน้ำหนัก α อยู่ระหว่าง 0-1
        ในปฏิบัติ ทดลองใช้หลายค่า (เช่น 0.1-0.3) แล้วเลือก α ที่ให้ MSE/MAE ต่ำสุด

STEP 2: กำหนดค่าเริ่มต้น F₂ = Y₁ (ใช้ข้อมูลแรก)

STEP 3: คำนวณค่าพยากรณ์จากสูตร
        Fₜ₊₁ = α·Yₜ + (1-α)·Fₜ
        
        ตัวอย่าง: α = 0.2, Y₁ = 5.4, Y₂ = 5.3
        F₂ = Y₁ = 5.4
        F₃ = 0.2(5.3) + 0.8(5.4) = 1.06 + 4.32 = 5.38
        F₄ = 0.2(5.6) + 0.8(5.38) = 1.12 + 4.304 = 5.424
```

#### สูตรที่ขยายออก
```
Fₜ₊₁ = α·Yₜ + α(1-α)·Yₜ₋₁ + α(1-α)²·Yₜ₋₂ + ...
```
แสดงว่าน้ำหนัก **α** ลดลงแบบ exponential ตามอายุของข้อมูล

#### ตัวอย่างการคำนวณ (α = 0.2)

| ไตรมาส | ข้อมูล (Yₜ) | พยากรณ์ (Fₜ) | Error (Eₜ) | \|Eₜ\| | Eₜ² |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 5.4 | - | - | - | - |
| 2 | 5.3 | 5.40 | -0.10 | 0.10 | 0.01 |
| 3 | 5.3 | 5.38 | -0.08 | 0.08 | 0.01 |
| 4 | 5.6 | 5.36 | +0.24 | 0.24 | 0.06 |
| 5 | 6.9 | 5.41 | +1.49 | 1.49 | 2.22 |
| 6 | 7.2 | 5.71 | +1.49 | 1.49 | 2.22 |
| 7 | 7.2 | 6.01 | +1.19 | 1.19 | 1.42 |
| 8 | - | 6.25 | - | - | - |

**ค่าพยากรณ์ไตรมาส 8:** F₈ = 0.2(7.2) + 0.8(6.01) = 1.44 + 4.81 = 6.25

---

### 2.2 Double Exponential Smoothing (Brown's Method)

#### เมื่อใช้
ข้อมูลที่มี **Linear Trend แต่ไม่มี Seasonality** (ดู Chapter 10 ตัวอย่างยอดขาย 1960-1978)

#### ขั้นตอนการหาค่าพยากรณ์

```
STEP 1: กำหนด α (ปกติ 0.05-0.1 เล็กกว่า Single Method)

STEP 2: คำนวณค่าเฉลี่ยทำให้เรียบครั้งแรก
        Sₜ⁽¹⁾ = α·Yₜ + (1-α)·Sₜ₋₁⁽¹⁾

STEP 3: คำนวณค่าเฉลี่ยทำให้เรียบครั้งที่สอง
        Sₜ⁽²⁾ = α·Sₜ⁽¹⁾ + (1-α)·Sₜ₋₁⁽²⁾

STEP 4: ประมาณค่าพารามิเตอร์ Trend
        aₜ = 2·Sₜ⁽¹⁾ - Sₜ⁽²⁾       (ระดับ)
        bₜ = [α/(1-α)]·(Sₜ⁽¹⁾ - Sₜ⁽²⁾)  (Slope/Trend)

STEP 5: คำนวณค่าพยากรณ์
        Fₜ₊ₘ = aₜ + bₜ·m
        
        โดย m = จำนวนก้าวข้างหน้า
        F₈ (1 ก้าว) = a₇ + b₇(1)
        F₉ (2 ก้าว) = a₇ + b₇(2)
```

#### ตัวอย่างจากสไลด์ (ร้านหนังสือ N=4)

- **S₇⁽¹⁾ = 407.50** (ค่าเฉลี่ยเคลื่อนที่ครั้งแรก)
- **S₇⁽²⁾ = 390.88** (ค่าเฉลี่ยเคลื่อนที่ครั้งที่สอง)
- **a₇ = 2(407.50) - 390.88 = 424.13**
- **b₇ = 2/(4-1) × (407.50 - 390.88) = 11.08**
- **F₈ = 424.13 + 11.08(1) = 435.21 เล่ม**
- **F₉ = 424.13 + 11.08(2) = 446.29 เล่ม**

---

### 2.3 Triple Exponential Smoothing — Holt-Winters Method

#### เมื่อใช้
ข้อมูลที่มี **Trend AND Seasonality** (เช่น ยอดขายที่มี Pattern ฤดูกาลชัดเจน: Q1 ขายต่ำ, Q4 ขายสูง)

#### องค์ประกอบหลัก 3 ตัว

| องค์ประกอบ | สัญลักษณ์ | ความหมาย |
| :--- | :--- | :--- |
| **Level** | Lₜ | ระดับพื้นฐาน (หลังหักอิทธิพล Trend และ Seasonality) |
| **Trend** | bₜ | ทิศทาง/อัตราการเปลี่ยนแปลง (เพิ่มขึ้นหรือลดลง) |
| **Seasonality** | Sₜ | Pattern ซ้ำตามรอบเวลา (รายไตรมาส รายเดือน) |

#### สองรูปแบบ

**1. Multiplicative (คูณ)** — ฤดูกาลแปรผันตามระดับ
```
ข้อมูล = Level × Trend × Seasonality

เหมาะ: ขายดีช่วงฤดูกาลที่ดี แต่ขนาด % คงที่
ตัวอย่าง: ถ้า Level เพิ่ม 2 เท่า ฤดูกาลก็เพิ่ม 2 เท่า
```

**2. Additive (บวก)** — ฤดูกาลคงที่
```
ข้อมูล = Level + Trend + Seasonality

เหมาะ: ข้อมูลที่ฤดูกาล Impact คงที่ไม่เปลี่ยน
ตัวอย่าง: ตลอดปี ช่วงเทศกาลขายเพิ่ม 500 บาทเท่าเดิม
```

#### Holt-Winters Multiplicative (สูตรปกติ)

```
พารามิเตอร์ 3 ตัว:
- α = ค่าคงที่ทำให้เรียบ Level (0 < α < 1)
- β = ค่าคงที่ทำให้เรียบ Trend (0 < β < 1)
- γ = ค่าคงที่ทำให้เรียบ Seasonality (0 < γ < 1)

สูตรการอัปเดต:
Lₜ = α(Yₜ / Sₜ₋ₛ) + (1-α)(Lₜ₋₁ + bₜ₋₁)
bₜ = β(Lₜ - Lₜ₋₁) + (1-β)bₜ₋₁
Sₜ = γ(Yₜ / Lₜ) + (1-γ)Sₜ₋ₛ

ค่าพยากรณ์:
Fₜ₊ₘ = (Lₜ + bₜ·m) × Sₜ₋ₛ₊ₘ

เมื่อ:
- s = จำนวนฤดูกาลใน 1 ปี (เช่น 4 สำหรับไตรมาส, 12 สำหรับเดือน)
- m = จำนวนก้าวข้างหน้า
```

#### ค่าเริ่มต้น (Initialization)

```
STEP 1: Level ครั้งแรก
        Lₛ = (Y₁ + Y₂ + ... + Yₛ) / s
        
        ตัวอย่าง (s=4): L₄ = (362+385+432+341)/4 = 380

STEP 2: Trend ครั้งแรก
        bₛ = (1/s) × [ (Yₛ₊₁-Y₁)/s + (Yₛ₊₂-Y₂)/s + ... + (Y₂ₛ-Yₛ)/s ]

STEP 3: Seasonality
        Sᵢ = Yᵢ / Lₛ,  i = 1, 2, ..., s
        
        ตัวอย่าง:
        S₁ = Y₁/L₄ = 362/380 = 0.953
        S₂ = Y₂/L₄ = 385/380 = 1.013
        S₃ = Y₃/L₄ = 432/380 = 1.137
        S₄ = Y₄/L₄ = 341/380 = 0.897
```

#### ตัวอย่างจากสไลด์ (α=0.822, β=0.055, γ=0.000)

| ไตรมาส | Yₜ | Lₜ | bₜ | Sₜ | Fₜ | Error |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 362 | - | - | 0.953 | - | - |
| 2 | 385 | - | - | 1.013 | - | - |
| 3 | 432 | - | - | 1.137 | - | - |
| 4 | 341 | 380 | 9.75 | 0.897 | - | - |
| 5 | 382 | 398.99 | 10.26 | 0.953 | 371.29 | +10.71 |
| 6 | 409 | 404.68 | 10.01 | 1.013 | 414.64 | -5.64 |
| ... | ... | ... | ... | ... | ... | ... |

---

### 2.4 การจำแนก Moving Average vs Exponential Smoothing

| ลักษณะ | Moving Average | Exponential Smoothing |
| :--- | :--- | :--- |
| **ลำดับเทอม** | ใช้ N เทอมล่าสุดเท่านั้น | ใช้ข้อมูลทั้งหมดตั้งแต่เริ่มต้น |
| **น้ำหนัก** | เท่ากันทั้งหมด | Exponential (ล่าสุดมากสุด) |
| **การตอบสนอง** | ช้า (lag มาก) | เร็ว (lag น้อย) |
| **ความเรียบ** | ขึ้นอยู่กับ N | ขึ้นอยู่กับ α |
| **Trend** | ผ่อนลง | ติดตาม |
| **Seasonality** | ไม่สามารถจำลอง | สามารถจำลอง (Triple) |

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

* [ ] **Single Exponential:** Fₜ₊₁ = αYₜ + (1-α)Fₜ — เลือก α (ปกติ 0.1-0.3)
* [ ] **Double Exponential:** คำนวณ Sₜ⁽¹⁾ → Sₜ⁽²⁾ → aₜ, bₜ → Fₜ₊ₘ — เหมาะ Trend เชิงเส้น
* [ ] **Triple (Holt-Winters):** เพิ่ม Seasonality → 3 พารามิเตอร์ (α, β, γ)
* [ ] **Multiplicative vs Additive:** คูณ (ฤดูกาลแปรผัน) vs บวก (ฤดูกาลคงที่)
* [ ] **ค่า m:** m=1 → 1 ก้าว, m=2 → 2 ก้าว
* [ ] **MSE/MAE:** เลือก α ที่ให้ Error ต่ำสุด

### สรุปสูตรสำคัญ

| สูตร | ความหมาย |
| :--- | :--- |
| `Fₜ₊₁ = αYₜ + (1-α)Fₜ` | Single Exponential |
| `Sₜ⁽¹⁾ = αYₜ + (1-α)Sₜ₋₁⁽¹⁾` | Double — ครั้งแรก |
| `Sₜ⁽²⁾ = αSₜ⁽¹⁾ + (1-α)Sₜ₋₁⁽²⁾` | Double — ครั้งที่สอง |
| `aₜ = 2Sₜ⁽¹⁾ - Sₜ⁽²⁾` | Level (Double) |
| `bₜ = [α/(1-α)](Sₜ⁽¹⁾ - Sₜ⁽²⁾)` | Slope/Trend (Double) |
| `Fₜ₊ₘ = aₜ + bₜ·m` | Forecast m ก้าวข้างหน้า (Double) |
| `Fₜ₊ₘ = (Lₜ + bₜ·m)·Sₜ₋ₛ₊ₘ` | Forecast (Holt-Winters Multiplicative) |

### Concept Map

```text
Exponential Smoothing Methods
├── Single Exponential
│   ├── Horizontal Data (ไม่มี Trend)
│   ├── α ∈ (0, 1)
│   └── Fₜ₊₁ = αYₜ + (1-α)Fₜ
│
├── Double Exponential (Brown's)
│   ├── Linear Trend Data
│   ├── คำนวณ 2 ครั้ง: Sₜ⁽¹⁾, Sₜ⁽²⁾
│   └── Fₜ₊ₘ = aₜ + bₜ·m
│
└── Triple Exponential (Holt-Winters)
    ├── Trend + Seasonality
    ├── 3 พารามิเตอร์: α, β, γ
    ├── 2 รูปแบบ: Multiplicative / Additive
    └── Fₜ₊ₘ = (Lₜ + bₜ·m)·Sₜ₋ₛ₊ₘ
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **α ไม่มีค่า \"ถูก\":** ต้อง optimize (ทดลองหลายค่า) เลือกค่าที่ให้ MSE/MAE ต่ำสุด — ไม่มีค่า universal
* **Exponential ≠ ชัวร์ดีกว่า Moving Average เสมอ:** สำหรับข้อมูล Horizontal ธรรมดา Moving Average บางที ง่ายกว่าและเพียงพอ
* **ค่าเริ่มต้น Lₛ ใน Holt-Winters:** ต้องอาศัยข้อมูล s ไตรมาสแรกมาคำนวณ — ไม่ใช่ก็ได้เอา Naive
* **s = ความยาวฤดูกาล:** ถ้าข้อมูลรายเดือน s=12; รายไตรมาส s=4; รายปี s=1 (ไม่มี seasonality)
* **Multiplicative ÷ 0:** ถ้า Yₜ = 0 จะเกิด division by zero — อาจต้องปรับ data หรือใช้ additive แทน
* **ความแนน Exponential:** ที่ชื่อ \"Exponential\" ไม่ได้หมายถึง exponential function แต่หมายถึงน้ำหนักลดลงแบบ exponential

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 10 Time Series and Forecasting]] (เทคนิค Moving Average พื้นฐาน)
  * [[Chapter 06 Regression Analysis]] (Causal Forecasting ใช้ Regression ทำนายจากตัวแปรอื่น)
  * [[Chapter 07 Multiple Regression Analysis]] (Multiple Regression บน Time Series)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DATA ANALYTICS AND PROGRAMMING/Concept/data analysis11_69 forecasting2.pdf` (47 slides, คณะเทคโนโลยีสารสนเทศ)
  * Related: `Resources/Books/DATA ANALYTICS AND PROGRAMMING/Concept/data analysis10_69 forecasting.pdf` (Chapter 10 — Moving Average & Baseline Methods)
