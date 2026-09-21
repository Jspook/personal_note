# Discrete Mathematics - Week 10: Relations (ความสัมพันธ์)

## 1. บทนำและแนวคิดทั่วไป (Macro Overview)

ในทางคณิตศาสตร์และวิทยาการคอมพิวเตอร์ **ความสัมพันธ์ (Relations)** คือโครงสร้างที่ใช้แสดงการเชื่อมโยงระหว่างวัตถุหรือข้อมูลในเซตต่าง ๆ ความสัมพันธ์เป็นพื้นฐานที่สำคัญยิ่งในระบบฐานข้อมูลแบบสัมพันธ์ (Relational Databases), การวิเคราะห์โครงข่าย (Network Analysis), โครงสร้างข้อมูลแบบกราฟ (Graphs), และขั้นตอนวิธีในการจัดเรียงข้อมูล (Sorting Algorithms)

---

## 2. การเจาะลึกเนื้อหา (Module-by-Module Deep Dive)

### 2.1 ผลคูณคาร์ทีเซียนและความสัมพันธ์ทวิภาค (Cartesian Product & Binary Relations)
* **Cartesian Product ($A \times B$):** เซตของคู่อันดับ $(a, b)$ ทั้งหมดโดยที่ $a \in A$ และ $b \in B$
  $$A \times B = \{(a, b) \mid a \in A \land b \in B\}$$
* **Binary Relation ($R$ จาก $A$ ไป $B$):** เป็นซับเซตของผลคูณคาร์ทีเซียน ($R \subseteq A \times B$)
* **Binary Relation on a Set $A$:** ซับเซตของ $A \times A$ (ความสัมพันธ์จากเซต $A$ ไปยังเซต $A$ ตัวมันเอง)

### 2.2 คุณสมบัติของความสัมพันธ์ (Properties of Relations)
ให้ $R$ เป็นความสัมพันธ์บนเซต $A$:
1. **Reflexive (สะท้อน):** ทุกสมาชิกต้องมีความสัมพันธ์กับตัวเอง
   $$\forall a \in A \, [(a, a) \in R]$$
2. **Symmetric (สมมาตร):** ถ้า $a$ สัมพันธ์กับ $b$ แล้ว $b$ ต้องสัมพันธ์กับ $a$ ด้วย
   $$\forall a \forall b \, [(a, b) \in R \implies (b, a) \in R]$$
3. **Antisymmetric (ปฏิสมมาตร):** ถ้า $a$ สัมพันธ์กับ $b$ และ $b$ สัมพันธ์กับ $a$ แล้ว $a$ ต้องเท่ากับ $b$ เท่านั้น (ใช้ป้องกันความสัมพันธ์แบบวนลูปในโครงสร้างลำดับชั้น)
   $$\forall a \forall b \, [(a, b) \in R \land (b, a) \in R \implies a = b]$$
4. **Transitive (ถ่ายทอด):** ถ้า $a$ สัมพันธ์กับ $b$ และ $b$ สัมพันธ์กับ $c$ แล้ว $a$ ต้องสัมพันธ์กับ $c$ ด้วย
   $$\forall a \forall b \forall c \, [(a, b) \in R \land (b, c) \in R \implies (a, c) \in R]$$

### 2.3 ความสัมพันธ์สมมูลและชั้นสมมูล (Equivalence Relations & Classes)
* **Equivalence Relation:** ความสัมพันธ์ที่มีคุณสมบัติครบทั้ง 3 ข้อคือ **Reflexive, Symmetric, และ Transitive**
* **Equivalence Class $[a]_R$:** เซตของสมาชิกทั้งหมดที่สัมพันธ์กับ $a$ ภายใต้ความสัมพันธ์สมมูล $R$
  $$[a]_R = \{s \mid (a, s) \in R\}$$
* **ตัวอย่างสำคัญ:** Congruence Modulo (สมภาคในเลขคณิตมอดุโล) เป็นความสัมพันธ์สมมูลที่แบ่งจำนวนเต็มออกเป็นกลุ่ม ๆ ตามเศษเหลือ

### 2.4 n-ary Relations และระบบฐานข้อมูล
* **n-ary Relation:** ซับเซตของผลคูณคาร์ทีเซียนของเซต $n$ เซต ($A_1 \times A_2 \times \dots \times A_n$) ใช้ในการแทนเรคคอร์ดในฐานข้อมูลสัมพันธ์ โดยแต่ละคอลัมน์คือ Domain และ Degree คือจำนวนเซต ($n$)
* **Primary Key:** โดเมนที่ค่าในคู่อันดับนั้นมีเอกลักษณ์เฉพาะตัว (Uniqueness) ไม่ซ้ำกันเลยในตาราง เพื่อใช้ระบุแถวข้อมูล

---

## 3. การอธิบายด้วยโค้ด Python (Implementation Code)

โค้ดด้านล่างใช้สำหรับตรวจสอบคุณสมบัติของความสัมพันธ์บนเซต $A$ จากเซตของคู่อันดับ (Relation $R$):

```python
def check_relation_properties(set_A, relation_R):
    """
    ตรวจสอบคุณสมบัติ Reflexive, Symmetric, Antisymmetric และ Transitive
    ของความสัมพันธ์ R บนเซต A
    """
    is_reflexive = True
    is_symmetric = True
    is_antisymmetric = True
    is_transitive = True
    
    # 1. ตรวจสอบ Reflexive: (a, a) ต้องอยู่ใน R ทุกตัว
    for a in set_A:
        if (a, a) not in relation_R:
            is_reflexive = False
            break
            
    # 2. ตรวจสอบ Symmetric และ Antisymmetric
    for (a, b) in relation_R:
        # สมมาตร: ถ้า (a, b) อยู่ แล้ว (b, a) ต้องอยู่
        if (b, a) not in relation_R:
            is_symmetric = False
        # ปฏิสมมาตร: ถ้า (a, b) และ (b, a) อยู่ แล้ว a ต้องเท่ากับ b
        if (b, a) in relation_R and a != b:
            is_antisymmetric = False
            
    # 3. ตรวจสอบ Transitive: ถ้า (a, b) และ (b, c) อยู่ แล้ว (a, c) ต้องอยู่
    for (a, b) in relation_R:
        for (b2, c) in relation_R:
            if b == b2: # พบทางเชื่อมต่อ
                if (a, c) not in relation_R:
                    is_transitive = False
                    break
                    
    return {
        "Reflexive": is_reflexive,
        "Symmetric": is_symmetric,
        "Antisymmetric": is_antisymmetric,
        "Transitive": is_transitive
    }

# --- ตัวอย่างการใช้งาน ---
A = {1, 2, 3, 4}

# R1 เป็นความสัมพันธ์สมมูล (Reflexive, Symmetric, Transitive)
R1 = {
    (1, 1), (2, 2), (3, 3), (4, 4),
    (1, 2), (2, 1)
}

properties = check_relation_properties(A, R1)
print("คุณสมบัติของ R1:")
for prop, val in properties.items():
    print(f" - {prop}: {val}")
```

---

## 4. ทางเลือกการนำเสนอความสัมพันธ์ (Representing Relations)

1. **Zero-One Matrices ($M_R$):** ใช้เมทริกซ์ที่เก็บค่า 0 และ 1
   * หากเป็น Reflexive: เส้นทแยงมุมหลัก (Main Diagonal) จะเป็น 1 ทั้งหมด
   * หากเป็น Symmetric: เมทริกซ์จะสมมาตรเทียบกับเส้นทแยงมุมหลัก ($M_R = M_R^T$)
2. **Directed Graphs (Digraphs):** ใช้จุดยอด (Vertices) และเส้นเชื่อมมีทิศทาง (Edges)
   * Reflexive: ทุกจุดยอดต้องมีวงวนตัวเอง (Loop)
   * Symmetric: หากมีเส้นเชื่อมจาก $x \rightarrow y$ ต้องมีเส้นย้อนกลับจาก $y \rightarrow x$

---

## เอกสารเชื่อมโยง (Backlinks)
* **สัปดาห์ก่อนหน้า:** [[Discrete Mathematics - Week 9 Primes, GCD & Cryptography]] (ซึ่งกล่าวถึง Congruence Modulo ซึ่งเป็นหนึ่งใน Equivalence Relation ที่สำคัญที่สุด)
* **แบบฝึกหัดทบทวนประจำสัปดาห์:** [[HW-Discrete-Math-01]]
* **หัวข้อสืบเนื่อง:** [[Database Normalization Summary]] (การนำ n-ary Relations ไปออกแบบฐานข้อมูลในระดับ 1NF, 2NF, 3NF)
