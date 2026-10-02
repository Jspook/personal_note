# Project Instruction: การบูรณาการข้อมูลขับเคลื่อนด้วย AI (AI-Powered Data Integration)

## 1. ภาพรวมของโปรเจกต์ (Project Overview)

สร้าง **เลเยอร์การวิเคราะห์ข้อมูลขับเคลื่อนด้วย AI (AI-powered data analytics layer)** บนระบบ Data Platform ของธุรกิจอีคอมเมิร์ซเดิมที่มีอยู่

วัตถุประสงค์คือเพื่อแสดงให้เห็นถึงวิธีการที่สามารถนำ AI/LLMs มาบูรณาการเข้ากับระบบ Data Engineering ได้อย่างปลอดภัย

ระบบต้องอนุญาตให้ผู้ใช้สามารถสอบถามคำถามทางธุรกิจโดยใช้ภาษาธรรมชาติ (natural language) ได้

ตัวอย่าง:

> "หมวดหมู่สินค้าใดที่สร้างรายได้สูงสุดในเดือนที่แล้ว?" ("What product category generated the highest revenue last month?")

ระบบควรแปลงคำถามให้เป็นคำสั่ง SQL, ตรวจสอบความถูกต้องของ SQL, สั่งรันคำสั่งดังกล่าวกับ Data Warehouse, และอธิบายผลลัพธ์ที่ได้ออกมา

---

# 2. หลักการสำคัญ (Core Principle)

LLM ต้อง **ไม่** เข้าถึงฐานข้อมูลโดยตรงโดยปราศจากการควบคุม

ใช้โฟลว์การทำงานดังนี้:

```text
User (ผู้ใช้)
 ↓
LLM
 ↓
SQL Generation (การสร้างคำสั่ง SQL)
 ↓
SQL Validation (การตรวจสอบความถูกต้องของ SQL)
 ↓
SQL Safety Check (การตรวจสอบความปลอดภัยของ SQL)
 ↓
Data Warehouse (คลังข้อมูล)
 ↓
Result (ผลลัพธ์)
 ↓
LLM Explanation (การอธิบายผลลัพธ์โดย LLM)
 ↓
User (ผู้ใช้)
```

LLM ทำหน้าที่เป็นเพียงเลเยอร์การติดต่อประสาน (interface layer) ไม่ใช่แหล่งข้อมูลความจริงขั้นสุดท้าย (source of truth)

---

# 3. วัตถุประสงค์ (Objectives)

แสดงให้เห็นถึง:

- การบูรณาการ LLM (LLM integration)
- ความเข้าใจในข้อมูลที่มีโครงสร้าง (Structured data understanding)
- การแปลงข้อความเป็นคำสั่ง SQL (Text-to-SQL)
- การออกแบบคำสั่งกระตุ้น (Prompt engineering)
- การตรวจสอบความถูกต้องของคำสั่ง SQL (SQL validation)
- ราวกั้นความปลอดภัย (Guardrails)
- การดึงข้อมูลเมทาดาตาของสคีมา (Retrieval of schema metadata)
- การสังเกตการณ์ระบบ AI (AI observability)
- ความตระหนักรู้ด้านต้นทุน (Cost awareness)
- การจัดการข้อผิดพลาด (Error handling)

---

# 4. สแตกเทคโนโลยีที่แนะนำ (Recommended Stack)

เลือกใช้:

### Backend

- Python
- FastAPI

### LLM

รองรับอย่างน้อยหนึ่งตัวเลือก:

- OpenAI API
- โมเดล LLM ในเครื่องผ่าน Ollama (Local LLM through Ollama)

ออกแบบโค้ดให้สามารถเปลี่ยนผู้ให้บริการ LLM (LLM provider) ได้

ตัวอย่าง:

```text
LLMProvider
├── OpenAIProvider
└── OllamaProvider
```

### ฐานข้อมูล (Database)

PostgreSQL / Data Warehouse เดิมที่มีอยู่

### Frontend

เว็บ UI แบบเรียบง่าย หรือ Streamlit

---

# 5. บริบทของสคีมา (Schema Context)

LLM ต้องได้รับข้อมูลสคีมาที่มีการควบคุม

ตัวอย่าง:

```text
fact_sales
- date_key
- customer_key
- product_key
- quantity
- revenue
- profit

dim_product
- product_key
- product_name
- category
```

อย่าส่งข้อมูลฐานข้อมูลที่ไม่จำเป็น

สร้างเลเยอร์เมทาดาตาของสคีมา (schema metadata layer):

```text
metadata/
├── tables.json
├── columns.json
└── relationships.json
```

---

# 6. โฟลว์การคิวรีด้วยภาษาธรรมชาติ (Natural Language Query Flow)

ตัวอย่าง:

```text
User (ผู้ใช้):
"หมวดหมู่ใดทำรายได้มากที่สุดในเดือนกันยายน?" ("Which category made the most revenue in September?")

        ↓

Intent Detection (การตรวจจับเจตนา)

        ↓

Relevant Schema Retrieval (การดึงข้อมูลสคีมาที่เกี่ยวข้อง)

        ↓

LLM SQL Generation (การสร้างคำสั่ง SQL ด้วย LLM)

        ↓

SQL Validation (การตรวจสอบความถูกต้องของ SQL)

        ↓

SQL Execution (การรันคำสั่ง SQL)

        ↓

Result (ผลลัพธ์)

        ↓

LLM Explanation (การอธิบายผลลัพธ์ด้วย LLM)

        ↓

Answer (คำตอบ)
```

---

# 7. ราวกั้นความปลอดภัยของ SQL (SQL Guardrails)

ระบบต้องปฏิเสธคำสั่ง SQL ที่เป็นอันตราย

อนุญาต:

```text
SELECT
WITH
```

ปฏิเสธเป็นค่าเริ่มต้น (Reject by default):

```text
DROP
DELETE
UPDATE
INSERT
ALTER
TRUNCATE
CREATE
```

และต้องจัดทำสิ่งเหล่านี้ด้วย:

- query timeout (การกำหนดเวลาหมดอายุของคำสั่งคิวรี)
- row limits (การจำกัดจำนวนแถวผลลัพธ์)
- restricted tables (ตารางที่จำกัดการเข้าถึง)
- restricted columns (คอลัมน์ที่จำกัดการเข้าถึง)
- SQL parsing ในจุดที่สามารถทำได้จริงในทางปฏิบัติ

อย่าพึ่งพาเพียงแค่ Prompt เพียงอย่างเดียว:

> "ห้ามสร้างคำสั่ง SQL ที่เป็นอันตราย" ("Do not generate dangerous SQL.")

ต้องจัดทำระบบตรวจสอบความถูกต้องเชิงเทคนิค (technical validation)

---

# 8. การตรวจสอบความถูกต้องของคิวรี (Query Validation)

ก่อนการรันคำสั่ง:

```text
Generated SQL (SQL ที่ถูกสร้างขึ้น)
      ↓
Syntax Check (การตรวจสอบไวยากรณ์)
      ↓
Read-only Check (การตรวจสอบว่าเป็นคำสั่งอ่านอย่างเดียว)
      ↓
Allowed Table Check (การตรวจสอบตารางที่ได้รับอนุญาต)
      ↓
Query Limit Check (การตรวจสอบการจำกัดปริมาณคิวรี)
      ↓
Execute (ดำเนินการรันคำสั่ง)
```

หากการตรวจสอบความถูกต้องล้มเหลว:

```text
SQL rejected (คำสั่ง SQL ถูกปฏิเสธ)
     ↓
Explain reason (อธิบายเหตุผล)
     ↓
Regenerate (สร้างคำสั่งใหม่อีกครั้ง)
```

จำกัดจำนวนครั้งในการพยายามสร้างคำสั่งใหม่

---

# 9. การประเมินผล AI (AI Evaluation)

สร้างชุดข้อมูลคำถามสำหรับทดสอบ

ตัวอย่าง:

```text
Question (คำถาม):
"รายได้เดือนที่แล้วเป็นเท่าไหร่?" ("What was revenue last month?")

Expected (ผลที่คาดหวัง):
SELECT ...

Question (คำถาม):
"สินค้าตัวใดขายได้มากที่สุด?" ("Which product sold the most?")

Expected (ผลที่คาดหวัง):
SELECT ...
```

ประเมิน:

- ความถูกต้องของคำสั่ง SQL (SQL validity)
- ความสำเร็จในการรันคำสั่ง (execution success)
- ความถูกต้องของผลลัพธ์ (result correctness)
- อัตราการกุข้อมูลเท็จ (hallucination rate)
- ความหน่วงของระบบ (latency)
- ปริมาณการใช้งานโทเค็น (token usage)

สร้างสคริปต์สำหรับการประเมินผล

---

# 10. การสังเกตการณ์ระบบ AI (AI Observability)

เก็บบันทึก Log:

```text
request_id
timestamp
user_question
model
prompt_version
generated_sql
validation_result
execution_time
token_usage
error
```

ห้ามเก็บบันทึกข้อมูลที่มีความละเอียดอ่อนของผู้ใช้ (sensitive user data)

---

# 11. การจัดการเวอร์ชันของ Prompt (Prompt Versioning)

จัดเก็บ Prompt ไว้ในไฟล์

ตัวอย่าง:

```text
prompts/
├── sql_generation_v1.txt
├── sql_generation_v2.txt
└── explanation_v1.txt
```

ห้ามฝัง Prompt ที่สำคัญลงในโค้ดของแอปพลิเคชันโดยตรงเด็ดขาด

จัดทำเอกสารบันทึกการเปลี่ยนแปลงระหว่างเวอร์ชันต่างๆ

---

# 12. การจัดการข้อผิดพลาด (Error Handling)

จัดการกรณีต่างๆ ดังนี้:

### คำถามที่ไม่ถูกต้อง (Invalid Question)

```text
"ฉันไม่มีข้อมูลเพียงพอที่จะตอบคำถามนี้" ("I don't have enough information to answer this question.")
```

### คำสั่ง SQL ไม่ถูกต้อง (Invalid SQL)

สร้างใหม่ (Regenerate) หรือส่งคืนข้อความแสดงข้อผิดพลาดที่ชัดเจน

### ข้อผิดพลาดจากฐานข้อมูล (Database Error)

ส่งคืนข้อความที่ปลอดภัย

### ความล้มเหลวของ LLM (LLM Failure)

เปลี่ยนไปใช้ผู้ให้บริการรายอื่นแทน (Fallback to another provider) หากมีการกำหนดค่าไว้

### คำถามที่มีความกำกวม (Ambiguous Question)

ถามกลับเพื่อขอความชัดเจน

ตัวอย่าง:

> "คุณหมายถึงเดือนไหน?" ("Which month do you mean?")

---

# 13. API

จัดทำ Endpoints เช่น:

```text
POST /query
GET /health
GET /schema
```

ตัวอย่าง:

```json
POST /query

{
  "question": "What were the top 5 products last month?"
}
```

Response:

```json
{
  "answer": "...",
  "sql": "...",
  "execution_time_ms": 124,
  "confidence": "..."
}
```

ห้ามเปิดเผยข้อมูลความลับภายใน (internal secrets)

---

# 14. UI

สร้างอินเทอร์เฟซแบบเรียบง่าย:

```text
┌─────────────────────────────────────┐
│ ถามข้อมูลของคุณ (Ask your data)     │
├─────────────────────────────────────┤
│ สินค้าตัวไหนสร้างรายได้มากที่สุดใน   │
│ เดือนที่ผ่านมา?                     │
│                                     │
│             [ ถาม ]                 │
├─────────────────────────────────────┤
│ คำตอบ (Answer)                      │
│                                     │
│ สินค้ายอดนิยม: ...                  │
│                                     │
│ SQL                                 │
│ SELECT ...                          │
│                                     │
│ เวลาในการรัน: 124 ms                │
└─────────────────────────────────────┘
```

อนุญาตให้ผู้ใช้สามารถตรวจสอบดูคำสั่ง SQL ที่ถูกสร้างขึ้นได้

---

# 15. โครงสร้าง Repository (Repository Structure)

```text
ai-data-analytics/
│
├── app/
│   ├── api/
│   ├── llm/
│   ├── sql/
│   ├── metadata/
│   ├── services/
│   └── main.py
│
├── prompts/
├── evaluations/
├── tests/
├── docs/
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

---

# 16. ข้อกำหนดสำหรับ README (README Requirements)

อธิบาย:

- ปัญหา (Problem)
- สถาปัตยกรรม (Architecture)
- เวิร์กโฟลว์ของ AI (AI workflow)
- การสร้างคำสั่ง SQL (SQL generation)
- ราวกั้นความปลอดภัย (Guardrails)
- ระเบียบวิธีในการประเมินผล (Evaluation methodology)
- ตัวอย่างคำถาม (Example questions)
- กรณีความล้มเหลว (Failure cases)
- ข้อพิจารณาด้านต้นทุน (Cost considerations)
- ข้อพิจารณาด้านความปลอดภัย (Security considerations)
- ข้อจำกัด (Limitations)

แนบแผนภาพสถาปัตยกรรมประกอบด้วย

---

# 17. นิยามของความเสร็จสมบูรณ์ (Definition of Done)

- [ ] คิวรีด้วยภาษาธรรมชาติทำงานได้
- [ ] การสร้างคำสั่ง SQL ทำงานได้
- [ ] การตรวจสอบความถูกต้องของ SQL ทำงานได้
- [ ] คำสั่ง SQL ที่เป็นอันตรายถูกบล็อก
- [ ] การดึงข้อมูลสคีมาทำงานได้
- [ ] API ทำงานได้
- [ ] UI ทำงานได้
- [ ] มีชุดข้อมูลสำหรับประเมินผล (Evaluation dataset)
- [ ] มีการบันทึกค่าเมทริกซ์ต่างๆ ของ AI
- [ ] มีการติดตามเวอร์ชันของ Prompt
- [ ] มีการจัดการข้อผิดพลาด
- [ ] README มีเนื้อหาครบถ้วนสมบูรณ์

โปรเจกต์ต้องแสดงให้เห็นว่า AI ได้รับการบูรณาการ **อยู่ภายในสถาปัตยกรรม Data Engineering ที่ถูกควบคุมดูแล**, ไม่ใช่แค่การเรียกใช้ LLM API ธรรมดาๆ