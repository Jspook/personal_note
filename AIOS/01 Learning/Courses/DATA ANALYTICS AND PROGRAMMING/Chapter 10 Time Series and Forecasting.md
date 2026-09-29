# DATA ANALYTICS - Week 10: Time Series & Forecasting

> **วิชา:** DATA ANALYTICS AND PROGRAMMING | **สถาบัน:** คณะเทคโนโลยีสารสนเทศ
> **Source:** `Resources/Books/DATA ANALYTICS AND PROGRAMMING/Concept/data analysis10_69 forecasting.pdf` (36 slides)

> [!NOTE]
> ไฟล์ Slide บทนี้เป็น Graphic-heavy ข้อความจาก PDF มีจำกัด เนื้อหานี้รวมข้อมูลจาก Slide และการขยายความเชิงทฤษฎี

---

## Part 1: Macro Architecture & Overview

**Time Series Forecasting (การพยากรณ์อนุกรมเวลา)** คือการใช้ข้อมูลในอดีตของตัวแปรที่สนใจ มาสร้างโมเดลเพื่อพยากรณ์ค่าในอนาคต โดยมีสมมติฐานว่ารูปแบบ (Pattern) ในอดีตจะยังคงดำเนินต่อไปในอนาคต เทคนิคนี้ใช้กว้างขวางในงานธุรกิจ เช่น การพยากรณ์ยอดขาย ราคาสินค้า อุณหภูมิ และดัชนีเศรษฐกิจ

```text
กระบวนการ Time Series Forecasting
══════════════════════════════════════════
  ข้อมูลอนุกรมเวลาในอดีต (Y₁, Y₂, ..., Yₙ)
          │
          ▼
  ┌─────────────────────────┐
  │  วิเคราะห์ Pattern      │
  │  Trend / Seasonal /     │
  │  Cyclical / Irregular   │
  └──────────┬──────────────┘
             │
     ┌───────┴──────────────┐
     ▼         ▼            ▼
  Naïve     Moving      Exponential
  Method    Average     Smoothing
             │
             ▼
  ┌─────────────────────────┐
  │  วัดความแม่นยำ          │
  │  MAD, MSE, MAPE         │
  └─────────────────────────┘
```

### ตารางเปรียบเทียบวิธีการพยากรณ์

| วิธี | หลักการ | เหมาะกับ |
| :--- | :--- | :--- |
| **Naïve Method** | Fₜ₊₁ = Yₜ (ใช้ค่าล่าสุดพยากรณ์) | ข้อมูลไม่มี Trend ที่ชัดเจน |
| **Simple Average** | Fₜ₊₁ = ค่าเฉลี่ยของทุกข้อมูล | ข้อมูลมีค่าคงที่ (Stationary) |
| **Moving Average** | ค่าเฉลี่ยของ n ข้อมูลล่าสุด | ข้อมูลมี Trend ไม่แรง |
| **Exponential Smoothing** | ถ่วงน้ำหนักข้อมูลล่าสุดมากกว่า | ข้อมูลที่ข้อมูลใหม่สำคัญกว่า |
| **Regression/Trend Line** | Regression บนเวลา | ข้อมูลมี Linear Trend |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 องค์ประกอบของ Time Series

| องค์ประกอบ | ชื่อ | คำอธิบาย | ตัวอย่าง |
| :--- | :--- | :--- | :--- |
| **T** | Trend | แนวโน้มระยะยาว (ขึ้น/ลง) | ยอดขายเพิ่มทุกปี |
| **S** | Seasonal | รูปแบบที่เกิดซ้ำตามฤดูกาล | ขายดีช่วงเทศกาล |
| **C** | Cyclical | วงจรขึ้น-ลงระยะยาว (>1 ปี) | วงจรเศรษฐกิจ |
| **I** | Irregular | ความผันผวนสุ่ม (random) | โควิด, ภัยธรรมชาติ |

---

### 2.2 ตัวชี้วัดความแม่นยำของการพยากรณ์

> การเลือกวิธีพยากรณ์ที่ดีที่สุดทำโดยเปรียบเทียบค่า Error ต่อไปนี้ — ค่ายิ่งต่ำยิ่งดี

| ตัวชี้วัด | สูตร | ความหมาย |
| :--- | :--- | :--- |
| **ME** | Σ(Yₜ - Fₜ)/n | Mean Error — ค่าเฉลี่ย Error (รวม + และ -) |
| **MAD** | Σ|Yₜ - Fₜ|/n | Mean Absolute Deviation — ค่าเบี่ยงเบนสัมบูรณ์เฉลี่ย |
| **MSE** | Σ(Yₜ - Fₜ)²/n | Mean Square Error — โทษ Error ขนาดใหญ่มากกว่า |
| **MAPE** | Σ(|Yₜ-Fₜ|/Yₜ)×100/n | Mean Absolute Percentage Error — ค่าเป็น % ของข้อมูลจริง |

```python
# ตัวอย่างการคำนวณ
# ถ้า Yₜ = [5.4, 5.3, 5.6, 6.9, 7.2] และ Fₜ = [5.3, 5.4, 5.3, 5.6, 6.9]
# Et = Yₜ - Fₜ = [0.1, -0.1, 0.3, 1.3, 0.3]
# MAD = (0.1+0.1+0.3+1.3+0.3)/5 = 0.42
# MSE = (0.01+0.01+0.09+1.69+0.09)/5 = 0.378
# MAPE = (|Et/Yt|×100) เฉลี่ย
```

---

### 2.3 Naïve Method

> **Naïve Method** คือวิธีที่ง่ายที่สุด — ใช้ค่าล่าสุดเป็นค่าพยากรณ์ถัดไป

```
Fₜ₊₁ = Yₜ

ตัวอย่าง:
Period | Data (Yₜ) | Forecast (Fₜ) | Error (Eₜ)
2002 Q1 | 5.4 |      -     |    -
2002 Q2 | 5.3 |    5.4     |  -0.1
2002 Q3 | 5.6 |    5.3     |   0.3
2003 Q1 | 6.9 |    5.6     |   1.3
2003 Q2 | 7.2 |    6.9     |   0.3

ME = 0.30,  MAD = 0.33,  MSE = 0.31,  MAPE = 5%
```

---

### 2.4 Simple Average Method

> ใช้ค่าเฉลี่ยของทุกข้อมูลที่มีมาพยากรณ์ค่าต่อไป

```
Fₜ₊₁ = (Y₁ + Y₂ + ... + Yₜ) / t

ตัวอย่าง: F₂ = 5.4, F₃ = (5.4+5.3)/2 = 5.35, F₄ = (5.4+5.3+5.6)/3 = 5.43, ...
```

**ข้อจำกัด:** ข้อมูลเก่าและใหม่มีน้ำหนักเท่ากัน — ไม่ดีถ้าข้อมูลมี Trend

---

### 2.5 Moving Average Method

> ใช้ค่าเฉลี่ยของ n ข้อมูลล่าสุด (window ขนาด n)

```
Fₜ₊₁ = (Yₜ + Yₜ₋₁ + ... + Yₜ₋ₙ₊₁) / n

ตัวอย่าง n=3:
F₄ = (Y₁+Y₂+Y₃)/3 = (5.4+5.3+5.6)/3 = 5.43
F₅ = (Y₂+Y₃+Y₄)/3 = (5.3+5.6+6.9)/3 = 5.93
```

**การเลือก n:** n เล็ก = ตอบสนองเร็ว แต่ผันผวน | n ใหญ่ = เรียบขึ้น แต่ช้าตอบสนอง

---

### 2.6 Exponential Smoothing

> ถ่วงน้ำหนักข้อมูลล่าสุดมากกว่า โดยน้ำหนักลดลงแบบ Exponential ตามความเก่าของข้อมูล

```
Fₜ₊₁ = α·Yₜ + (1-α)·Fₜ

โดยที่ α = Smoothing Constant (0 < α < 1)
- α ใกล้ 1 → ให้น้ำหนักข้อมูลใหม่มาก (ตอบสนองเร็ว)
- α ใกล้ 0 → ให้น้ำหนักข้อมูลเก่ามาก (เรียบ, ตอบสนองช้า)
```

---

### 2.7 ข้อมูลตัวอย่าง Trend จาก Slide (1960-1978)

| ปี | ค่าข้อมูล | ปี | ค่าข้อมูล |
| :--- | :--- | :--- | :--- |
| 1960 | 5.86 | 1970 | 9.08 |
| 1961 | 6.38 | 1971 | 9.22 |
| 1962 | 6.46 | 1972 | 9.54 |
| 1963 | 6.78 | 1973 | 10.20 |
| 1964 | 7.52 | 1974 | 10.49 |
| 1965 | 8.31 | 1975 | 10.41 |
| 1966 | 8.80 | 1976 | 10.54 |
| 1967 | 8.89 | 1977 | 10.58 |
| 1968 | 8.92 | 1978 | 10.84 |
| 1969 | 9.07 | | |

ข้อมูลนี้แสดง **Upward Trend** อย่างชัดเจน → เหมาะกับ Trend Line Regression

---

## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ

* [ ] **องค์ประกอบ Time Series:** Trend (T), Seasonal (S), Cyclical (C), Irregular (I)
* [ ] **Naïve:** Fₜ₊₁ = Yₜ — ง่ายที่สุด ใช้เป็น Baseline
* [ ] **Simple Average:** ค่าเฉลี่ยสะสม — ข้อมูลทุกจุดน้ำหนักเท่ากัน
* [ ] **Moving Average:** ค่าเฉลี่ย n จุดล่าสุด — n กำหนดความเรียบ
* [ ] **Exponential Smoothing:** Fₜ₊₁ = αYₜ + (1-α)Fₜ — α กำหนดน้ำหนัก
* [ ] **ตัวชี้วัด:** MAD, MSE, MAPE — ยิ่งต่ำยิ่งดี

### สรุปสูตรสำคัญ

| สูตร | ชื่อ |
| :--- | :--- |
| `MAD = Σ\|Yₜ-Fₜ\|/n` | Mean Absolute Deviation |
| `MSE = Σ(Yₜ-Fₜ)²/n` | Mean Square Error |
| `MAPE = Σ(\|Yₜ-Fₜ\|/Yₜ)×100/n` | Mean Absolute % Error |
| `Fₜ₊₁ = Yₜ` | Naïve |
| `Fₜ₊₁ = ΣYᵢ/t` | Simple Average |
| `Fₜ₊₁ = (Yₜ+...+Yₜ₋ₙ₊₁)/n` | Moving Average |
| `Fₜ₊₁ = αYₜ + (1-α)Fₜ` | Exponential Smoothing |

### Concept Map

```text
Time Series Forecasting
├── องค์ประกอบ: Trend, Seasonal, Cyclical, Irregular
├── วิธีพยากรณ์
│   ├── Naïve Method (baseline)
│   ├── Simple Average
│   ├── Moving Average (เลือก n)
│   └── Exponential Smoothing (เลือก α)
└── วัดความแม่นยำ
    ├── MAD (ค่าเบี่ยงเบนสัมบูรณ์เฉลี่ย)
    ├── MSE (โทษ Error ใหญ่มากกว่า)
    └── MAPE (แสดงผลเป็น %)
```

---

## ⚠️ Common Pitfalls & Exam Traps

* **Naïve ≠ โมเดลแย่เสมอ:** สำหรับข้อมูลที่ไม่มี Pattern ชัดเจน Naïve อาจดีกว่าวิธีซับซ้อน
* **Moving Average ไม่ได้พยากรณ์ค่าอนาคต > 1 ก้าว:** โดยตรงทำได้แค่ 1 ก้าวข้างหน้า
* **α ใน Exponential Smoothing:** ไม่มีค่าที่ "ถูก" ต้อง optimize จากข้อมูล (ใช้ MSE/MAD เปรียบเทียบ)
* **MAPE ใช้ไม่ได้เมื่อ Yₜ = 0:** เพราะหารด้วยศูนย์
* **ME ≠ MAD:** ME อาจเป็น 0 แม้ Error จริงๆ สูง (บวก-ลบหักล้างกัน) ต้องดู MAD และ MSE ด้วย

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)

* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Chapter 06 Regression Analysis]] (Causal Forecasting ใช้ Regression)
  * [[Chapter 07 Multiple Regression Analysis]] (Regression บน Time Series)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/DATA ANALYTICS AND PROGRAMMING/Concept/data analysis10_69 forecasting.pdf` (36 slides, คณะเทคโนโลยีสารสนเทศ)
