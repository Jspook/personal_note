
# Lean Business Model Canvas — takeNote

> **Concept:** แอปจดโน้ตสำหรับนักเรียน/นักศึกษา ที่ช่วยให้ “จดจ่อระหว่างเรียน” และเปลี่ยนโน้ตธรรมดาให้เป็นระบบความรู้ที่นำไปทบทวนและเตรียมสอบได้

---

| หมวด                            | takeNote                                                                                                                                                                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Problem**                  | 1) นักศึกษาจดโน้ตไม่ทัน ทำให้เสียสมาธิจากการฟังอาจารย์ 2) โน้ตกระจัดกระจายและกลับมาทบทวนยาก 3) ไม่รู้ว่าตัวเองเรียนครบตาม Syllabus หรือยัง 4) เรียนแล้วลืม เพราะไม่มีระบบ Review ที่ต่อเนื่อง                              |
| **2. Customer Segments**        | **หลัก:** นักเรียน/นักศึกษา อายุประมาณ 15–24 ปี โดยเฉพาะมหาวิทยาลัย  **Early Adopter:** นักศึกษาที่เรียนหลายวิชา, สาย IT/Engineering/Science, คนที่ใช้ Digital Note อยู่แล้ว และคนที่รู้สึกว่าตัวเองจดไม่ทัน/หลุดโฟกัสง่าย |
| **3. Unique Value Proposition** | **“Focus on the lecture. We’ll help organize the knowledge later.”**  takeNote ช่วยให้นักเรียนโฟกัสกับการเรียนก่อน แล้วค่อยใช้ AI จัดระเบียบ เชื่อมโยง และทบทวนความรู้ภายหลัง                                              |
| **4. Solution**                 | 🎙️ Focus Recording + Raw Notes  → 📝 Markdown/Handwriting Notes → 🤖 AI สรุปและจัดโครงสร้าง → 🧠 Knowledge Graph → 🔄 Daily Review → 📚 Syllabus Tracking → ⏰ Exam Reminder                                               |
| **5. Channels**                 | TikTok / YouTube / Instagram สำหรับ Study Content, นักศึกษา Ambassador, กลุ่มมหาวิทยาลัย/ชมรม, Campus Events, Word of Mouth, App Store / Play Store, Content Marketing เช่น “วิธีจดโน้ตให้จำได้”                           |
| **6. Revenue Streams**          | **Subscription:** Free / Premium ประมาณ ฿79–149/เดือน หรือ ฿790–1,490/ปี  **Future:** Student/University Plan และอาจมี Education Marketplace                                                                               |
| **7. Cost Structure**           | Cloud Storage, Audio Storage, AI API/Inference, Database, Server, Development, UI/UX, Marketing, App Store/Payment Fees, Customer Support                                                                                  |
| **8. Key Metrics**              | Weekly Active Users, จำนวน Lecture ที่บันทึก, Notes/User, Review Completion Rate, Syllabus Completion Rate, 7/30-day Retention, Free → Premium Conversion, Monthly Recurring Revenue                                       |
| **9. Unfair Advantage**         | **Learning Context Graph:** Course + Syllabus + Notes + Audio + Concepts + Review + Exam Date อยู่ในระบบเดียว ทำให้ AI เข้าใจ “บริบทการเรียนของผู้ใช้” มากกว่าแค่สรุปเอกสารหนึ่งไฟล์                                       |

---

# Product Loop

จุดสำคัญของ Business Model นี้คือ **ทุก Feature ต้องสร้างข้อมูลให้ Feature ถัดไป**

```text
                 COURSE
                    │
                 SYLLABUS
                    │
                    ▼
              ┌───────────┐
              │   LEARN   │
              └─────┬─────┘
                    │
             Audio + Raw Notes
                    │
                    ▼
                 AI
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      Structured           Concepts
         Note                  │
          │                    ▼
          └──────────────► GRAPH
                               │
                               ▼
                           REVIEW
                               │
                               ▼
                          EXAM PREP
```

นี่คือสิ่งที่ทำให้ takeNote ต่างจากการทำ **“Notion + AI Summary + Graph”** แบบรวมฟีเจอร์เข้าด้วยกัน

---

# MVP Business Model

ถ้าจะเอาไปทำจริง ผมจะไม่สร้างทั้งหมดตั้งแต่วันแรก

### Phase 1 — Validate Problem

สร้างแค่:

```text
Course
   ↓
Recording + Raw Note
   ↓
AI Summary
   ↓
Review Question
```

เป้าหมายคือพิสูจน์ว่า:

> **นักศึกษายอมใช้ระบบที่ให้จดแบบไม่ต้องกังวลเรื่องความเรียบร้อย เพื่อกลับมาจัดระเบียบหลังเรียนหรือไม่?**

---

### Phase 2 — Build Differentiation

เพิ่ม:

```text
Syllabus
   +
Notes
   +
Concepts
   ↓
Knowledge Graph
```

แล้วเพิ่ม **Syllabus Tracking + Exam Preparation**

---

### Phase 3 — Monetization

```text
FREE
│
├── Basic Notes
├── Limited Recording
├── Basic Review
└── Basic Graph
          │
          ▼
      PREMIUM
          │
          ├── Unlimited Recording
          ├── AI Processing
          ├── Advanced Graph
          ├── Smart Review
          ├── Exam Planning
          └── Cross-course Knowledge Graph
```

## ตัวเลขที่ควรพิสูจน์ก่อนตั้งราคา

อย่าเริ่มจากคำถามว่า **“ควรเก็บ ฿99 หรือ ฿149?”**

ให้ทดลองวัดก่อนว่า:

**นักศึกษายอมกลับมาใช้ takeNote กี่วันต่อสัปดาห์ และยอมจ่ายเพื่ออะไร**

เพราะตัวที่จะทำให้ Subscription อยู่ได้จริงคือ **Retention + ความถี่ในการใช้** ไม่ใช่จำนวน Feature.
