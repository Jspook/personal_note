# 🔬 **วิเคราะห์ความผิดพลาด vs Soul.md & Hermes Philosophy**

---

## **📖 Core Principles from Soul.md (System Prompt)**

### **1. Execution Over Theory**
```
"Prioritize actionable implementation, real-world utility, and clean architecture 
over passive explanation."
```

### **2. Truth Over Politeness**
```
"Never invent progress, grades, completion states, or data. Point out technical 
flaws, bad patterns, and mistakes gently yet directly."
```

### **3. Scaffolding & Structure**
```
"Default to high scannability—markdown tables, clean lists, and code blocks 
instead of dense, wandering prose."
```

### **4. Preserve Technical Integrity**
```
"Keep English terminology, syntax keywords, protocol names, and system functions 
intact while explaining reasoning in plain, direct Thai."
```

### **5. Strict Vault Sovereignty**
```
"The user's Obsidian Vault is the single source of truth. Never overwrite, move, 
or delete without explicit confirmation."
```

### **6. Finishing the Job**
```
"When the user asks you to build, run, or verify something, the deliverable is 
a working artifact backed by real tool output — not a description of one. Do not 
stop after writing a stub, a plan, or a single command. Keep working until you 
have actually exercised the code or produced the requested result."
```

---

## **🔴 ที่ฉันละเมิด Soul.md**

### **1. ❌ \"Execution Over Theory\" — VIOLATED**

**ที่ผิด:**
```
Extraction failed (read_file)
  ↓
Report error to user ("ตัวเลือก 3 วิธี...")
  ↓
Ask user to decide
```

**Soul.md บอก:**
> Prioritize actionable implementation... over passive explanation

**ควรทำ:**
```
Extraction failed (read_file)
  ↓
Execute PyMuPDF ทันที (ไม่รายงาน)
  ↓
Success → ดำเนินการต่อ
```

**ความผิด:** ฉันรายงาน error และถามผู้ใช้แทนที่จะลองแก้ปัญหาด้วยตัวเอง → "passive explanation" แทน "actionable implementation"

---

### **2. ❌ \"Finishing the Job\" — VIOLATED**

**ที่ผิด:**
```
STEP 5: Fallback CASCADE (if selected method fails)
        If Primary method fails/timeouts:
        1. Fallback to PyMuPDF / pypdf (if Docling failed).
        2. If all extraction fails: follow User-Confirmed Fallback (General Knowledge labeled).
```

ฉันถาม user แทนที่จะ **ทำ fallback ต่อ**

**Soul.md บอก:**
> Keep working until you have actually exercised the code or produced the requested result.
> Do not stop after writing a stub, a plan, or a single command.

**ควรทำ:**
```
read_file ล้มเหลว
  ↓
PyMuPDF via execute_code (ไม่รายงาน)
  ↓
Success (ไม่ต้องถาม)
```

**ความผิด:** ฉันติดตัวไม่ดำเนินการต่ออยู่ดี

---

### **3. ⚠️ \"Truth Over Politeness\" — HALF VIOLATED**

**ที่ผิด:**
```
รายงาน error พอใจ ไม่ได้บอกผู้ใช้ว่า:
"ฉันทำผิด เพราะไม่เลือก tool ให้ถูก"
```

**ควรทำ:**
```
เมื่อผู้ใช้ชี้แนะ ต้องตอบ:
"ถูกต้อง ฉันควรใช้ execute_code ตั้งแต่ต้น ไม่ใช่ terminal"
```

**ความผิด:** ฉันไม่ได้ยอมรับความผิดอย่างตรงไปตรงมา ในตอนแรก

---

### **4. ⚠️ \"Parallel Tool Calls\" — UNDERUTILIZED**

**ที่ผิด:**
```
ลอง terminal + heredoc (ล้มเหลว)
รอผลลัพธ์
ลอง execute_code (ล้มเหลว)
รอผลลัพธ์
ลอง terminal pip install (ล้มเหลว)
```

**ควรทำ:**
```
STEP 1: ประเมิน tool ที่เหมาะสม (execute_code + subprocess)
STEP 2: Execute ทันที (ไม่ต้องลอง terminal ก่อน)
```

**หลักการ:**
> When you need several pieces of information that don't depend on each other, 
> request them together in a single response instead of one tool call per turn.

ฉันควร ประเมิน tool ให้ถูกตั้งแต่ต้น แล้ว execute ในครั้งเดียว

---

## **🎯 ความผิดพลาดโดยสรุป**

| หลักการ | ที่ผิด | ผลกระทบ |
| :--- | :--- | :--- |
| **Execution Over Theory** | รายงาน error แทนแก้ | ใช้เวลา 5-10 นาที เพิ่มเติม |
| **Finishing the Job** | ถามผู้ใช้แทนลองต่อ | ตัดระห่วางเวลา ผู้ใช้ต้องตัดสินใจ |
| **Truth Over Politeness** | ไม่ยอมรับผิดตั้งแต่ต้น | ผู้ใช้ต้องชี้แนะ |
| **Parallel Tool Calls** | ลองทีละวิธี (sequential) | ไม่มีประสิทธิภาพ |

---

## **✅ ควรทำต่อไป**

### **Pattern: Execution-First, Not Report-First**

```
Problem
  ↓
Understand context
  ↓
Select tool (อ่าน specs ให้ถูก)
  ↓
Execute ทันที
  ├─ Success → ดำเนินการต่อ
  └─ Fail → Fallback (ไม่รายงาน error)
        ├─ Success → ดำเนินการต่อ
        └─ Fail → Fallback ต่อไป
             ├─ Success → ดำเนินการต่อ
             └─ Fail → รายงาน BLOCKER เท่านั้น
```

### **Keywords จาก Soul.md ที่ต้องปฏิบัติ**

- ✅ **"Actionable implementation"** = Do, don't explain
- ✅ **"Finishing the job"** = Keep going, don't hand off
- ✅ **"Truth"** = Admit mistakes directly
- ✅ **"Scaffolding"** = Clear structure (ใช้ได้ดี)
- ✅ **"Real tool output"** = Actual results, not stub plans

---

## **🧠 Mental Model ที่ต้องลงลึก**

### **Old (ผิด) ⚠️**
```
User Request
  ↓
Try Method A
  ↓
Fail?
  ↓
Report Error + Ask User
  ↓
User decides
  ↓
Try Method B
```

### **New (ถูก) ✅**
```
User Request
  ↓
Understand Problem
  ↓
Select Best Tool (อ่าน .agent files)
  ↓
Execute Immediately
  ├─ Success? → Finish Job
  └─ Fail? → Try Fallback (ไม่รายงาน)
        ├─ Success? → Finish Job
        └─ Fail? → Try Fallback ต่อไป
              └─ Still Fail? → Block + Report (เท่านั้น)
```

---

## **📋 Self-Correction Checklist**

ก่อนส่งคำตอบครั้งต่อไป ต้องถาม ตัวเอง:

- [ ] **Execution Over Theory?** ฉันกำลังทำหรือแค่อธิบาย?
- [ ] **Finishing the Job?** ฉันยังคงทำจนเสร็จหรือส่งมือให้ผู้ใช้?
- [ ] **Truth Over Politeness?** ฉันพูดความจริงหรือหลีกเลี่ยง?
- [ ] **Best Tool?** ฉันเลือก tool ที่เหมาะสุดหรือเดาๆ?
- [ ] **Real Output?** ผลลัพธ์เป็น artifact จริงหรือ description?

---

## **🎓 บทเรียนที่ได้**

| เดิม | ใหม่ |
| :--- | :--- |
| ผิด → รายงาน → ถาม | ผิด → ลองแก้ → สำเร็จหรือ block |
| sequential trials | parallel thinking + execute |
| passive explanation | active implementation |
| hand off to user | carry through to end |
| politeness first | truth first |

---

## **💪 Commitment ต่อไป**

ครั้งนี้ฉันเรียนรู้มาจาก **3 แหล่ง:**

1. **me.md (User Profile):** Architecture before syntax, Action over abstraction, Compounding over intensity
2. **Soul.md (My Core):** Execution over theory, Finishing the job, Truth over politeness
3. **Practical Experience:** Tool selection matters, Fallback cascade คือระบบ ไม่ใช่ option

**ตั้งแต่นี้ไป:**
- ✅ อ่าน .agent files อย่างระบบ
- ✅ เลือก tool ที่ถูกตั้งแต่ครั้งแรก
- ✅ Execute ทันทีไม่รายงาน error ธรรมชาติ
- ✅ ติดตาม Fallback Cascade ที่ชัดเจน
- ✅ Finish job หรือ block เท่านั้น
