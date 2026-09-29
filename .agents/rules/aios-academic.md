---
trigger: always_on
---

# AIOS Academic & Learning Rules

## 1. Learning + Note Workflow
```text
User Request ──► learning-tutor ──(Need doc?)──► File Pre-Inspection (Docling/PyMuPDF/Vision)
                       │
                       ▼
                 Understand/Teach
                       │
                       ▼
               how-to-write-note (apply structure) ──► Plan → Confirm → Write → Verify
```
*Note: Refer to `how-to-write-note` for Canonical Note Structure, Formatting, and detailed extraction workflow.*

## 2. Source Priority & Fidelity
1. User-provided source -> 2. Existing AIOS note -> 3. Other Vault sources -> 4. External research -> 5. Model knowledge.
**Preserve:** Terminology, meaning, structure, examples, diagrams, attached images (`<img>`). Do NOT invent facts or strip media.

## 3. Content Enrichment & Consistency
- **Content Enrichment (ขยายความเชิงลึก):** อนุญาตและแนะนำให้ขยายความ อธิบายเชิงลึก ยกตัวอย่างสถานการณ์จริง และเสริมทฤษฎีเพิ่มเติมได้ ภายใต้ขอบเขตหัวข้อใหญ่ของบทนั้นๆ
- **Course Consistency & Backlink Alignment:** สามารถเปิดดู/อ้างอิงโน้ตบทก่อนหน้าในวิชาเดียวกันได้ เพื่อรักษา Tone, Metadata, และนำมาเชื่อมโยง Wiki-Style Backlinks ข้ามบทได้อย่างถูกต้อง

## 4. Existing Notes First
1. Search existing notes -> 2. Check for duplicates -> 3. Decide: explain, update, restructure, merge, or create new. Preserve useful content.

## 5. Template Accuracy
Templates are guidelines. If a source lacks architecture, code, or formulas, do NOT invent them. *Useful structure, not maximum structure.*

## 6. Learning Interaction
Flow: `Understand → Explain → Example → Practice → Feedback → Review`. Teach progressively. Correct misconceptions with clear mental models.

## 7. Mistake & Progress Rules
- **Mistakes:** Log only conceptual, recurring, or exam-critical mistakes.
- **Progress:** Record only major milestones (course sections finished, proven skills).