---

name: how-to-write-note
description: Document writing standard for the user's AIOS Obsidian Vault. Defines the canonical note structure, section templates, formatting conventions, and Wiki-style backlink format used across all course notes and learning summaries. Activate when creating or reformatting any academic note, course summary, or study document.

---

# How to Write a Note

## 1. Purpose

Define the **canonical structure** for all academic notes inside the AIOS Vault.

The primary goal is:

> Every note must be self-contained, scannable, and cross-linked — usable as a study reference, exam cheat sheet, and knowledge graph node.

### Core Principles for Note Creation
1. **Course Consistency & Backlink Alignment (รักษาความต่อเนื่องทั้งวิชา):** สามารถเปิดดู/อ้างอิงโน้ตบทก่อนหน้าในวิชาเดียวกันได้ เพื่อรักษาโทนการเขียน (Tone of Voice), มาตรฐาน Metadata และนำมาเชื่อมโยง Wiki-Style Backlinks ข้ามบทได้อย่างสมบูรณ์
2. **Content Enrichment (ขยายความเชิงลึกจากหัวข้อใหญ่):** สไลด์บรรยายมักมีเนื้อหาเป็น Bullet สั้นๆ ให้อธิบายเชิงลึก ยกตัวอย่างสถานการณ์จริง เสริมทฤษฎี/แนวคิดสากลเพิ่มเติมได้ภายใต้ขอบเขตหัวข้อใหญ่ของบทนั้นๆ
3. **Zero-Loss & Preserved Media:** รักษาคำศัพท์เทคนิค รูปภาพประกอบ ไดอะแกรม และความสัมพันธ์ของเนื้อหาไว้ครบถ้วน

---

## 2. Canonical Note Structure

Every course note MUST follow this section order:

```text
# [Subject] - [Unit/Chapter]: [Topic Title]
    ↓
## Part 1: Macro Architecture & Overview         ← Big picture first
    ↓
## Part 2: Module-by-Module Deep Dive            ← Details, section by section
    ↓
## Part 3: Quick Reference & Exam Cheat Sheet    ← Summary + Checklist
    ↓
## ⚠️ Common Pitfalls & Exam Traps              ← Error-prone points
    ↓
## เอกสารเชื่อมโยง (Wiki-Style Backlinks)      ← Cross-links (MANDATORY LAST)
```

---

## 3. Section Templates

### 3.1 Document Header

```markdown
# [Subject] - [Unit/Chapter]: [Title]

> **วิชา:** [Subject Code & Name] | **สถาบัน:** [Institution]
> **Source:** `Resources/[path/to/source.pdf]` ([N] pages/slides)

---
```

**Rules:**
- Subject code before name: `06066300 Database System Concept`
- Always cite the source file path from `Resources/`
- Always state page/slide count

---

### 3.2 Part 1: Macro Architecture & Overview

**Purpose:** Give the reader the big picture before any details.

**Required elements:**
1. A 2–5 sentence paragraph describing the overall system/concept
2. An ASCII Architecture Diagram (flow or tree)
3. A Comparison Table (if topic involves ≥2 related technologies)

```markdown
## Part 1: Macro Architecture & Overview

[2–5 sentence overview paragraph]

```text
[ASCII architecture diagram]
```

### ตารางเปรียบเทียบ [Technology/Concept] ([Description])

| Feature | A | B | C |
| :--- | :--- | :--- | :--- |
| ... | ... | ... | ... |

---
```

**Formatting rules:**
- Use Thai for narrative explanations, keep technical terms as English
- Use `**bold**` for key terms on first use
- Table columns: left-align with `: ---`

---

### 3.3 Part 2: Module-by-Module Deep Dive

**Purpose:** Detailed breakdown of each sub-topic. Numbered as `2.1`, `2.2`, etc.

**Required elements per sub-section:**
- Definition/concept explanation
- Comparison table (if applicable)
- Code block with comments (if applicable)
- Terminology mapping table (Thai ↔ English ↔ Technical)

```markdown
### 2.X [Section Title]

#### [Sub-concept]
* **Key Term:** Definition in Thai with (English technical term in parentheses)

| Thai Term | English Term | คำอธิบาย |
| :--- | :--- | :--- |
| ... | ... | ... |

```[language]
// Comments in Thai explaining the WHY, not just WHAT
[code]
```

---
```

**Rules:**
- Every `###` section ends with `---` horizontal rule
- Inline code uses backticks: `localStorage.getItem()`
- Code blocks must include language tag: ` ```javascript ` ` ```sql ` ` ```python `
- Use `>` blockquote for definitions and important quotes

---

### 3.4 Part 3: Quick Reference & Exam Cheat Sheet

**Purpose:** Last-minute review before exam. Must be standalone.

**Required elements:**
1. A checkbox checklist of critical concepts (`- [ ] **Concept:** explanation`)
2. A Notation/Formula table (if subject has formal notation)
3. A Concept Map (ASCII tree showing relationships)

```markdown
## Part 3: Quick Reference & Exam Cheat Sheet

### Checklist สรุปหัวใจสำคัญก่อนสอบ
* [ ] **[Concept]:** [One-line explanation]

### สรุปสูตร / Notation ที่สำคัญ

| Notation | ความหมาย |
| :--- | :--- |
| `[formula]` | [meaning] |

### Concept Map

```text
[Root Concept]
├── [Branch 1]
└── [Branch 2]
```
```

---

### 3.5 Common Pitfalls & Exam Traps

**Purpose:** Document error-prone concepts and misconceptions.

```markdown
## ⚠️ Common Pitfalls & Exam Traps

* **[Wrong assumption]:** [Why it's wrong] — [What is correct]
* **[Confusing terms]:** [Distinction explained]
```

**Rules:**
- Start each bullet with the **misconception** in bold
- Follow with the correction
- Be specific — no vague warnings

---

### 3.6 เอกสารเชื่อมโยง (Wiki-Style Backlinks) — MANDATORY LAST SECTION

**Purpose:** Connect this note to the knowledge graph.

```markdown
## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Note Title]] (เหตุผลที่เชื่อมโยง — ความสัมพันธ์กับเนื้อหา)

* **แหล่งข้อมูล:**
  * Source: `Resources/[path]` ([N] pages/slides, [Institution])
  * Reference: [Author (Year)] — *[Book Title]*
```

**Rules:**
- Use Obsidian `[[wikilink]]` format — NOT markdown `[text](url)` format
- Always include the reason for the link in parentheses
- Source must point to `Resources/` path
- This section is ALWAYS the last section — nothing after it

---

## 4. Formatting Standards

### Typography
| Element | Format | Example |
| :--- | :--- | :--- |
| Key Term (first use) | `**bold**` | **Relation** |
| Code/Command | backtick | `JSON.stringify()` |
| Important Definition | `> blockquote` | > A relation is... |

### Language Convention
- **Narrative/Explanation:** Thai
- **Technical Terms:** English (ทับศัพท์) — do NOT translate to Thai
- **First mention:** Thai concept + (English term) in parentheses
- **Subsequent mentions:** English term only

### Section Separators
- Major sections (`## Part N`): always preceded by `---`
- Sub-sections (`###`): end with `---` only if they are long (>20 lines)

---

## 5. File Naming Convention

```
[Subject] - [Chapter/Unit Identifier] [Topic Title].md
```

**Examples:**
```
Database - Chapter 01 Introduction to Database System & Relational Model.md
Web Programming - Unit 06 Web Data with JSON and Local Storage.md
Discrete Mathematics - Week 10 Relations.md
```

**Rules:**
- Subject name first, then identifier, then descriptive title
- Use ` - ` (space-dash-space) as separator
- Store in `AIOS/01 Learning/Courses/[Subject]/`

---

## 6. Source Extraction Workflow (PDF/Slides)

When the source is a PDF or slide deck, follow this **Docling-first pipeline**:

```text
             User
               │
               ▼
        ┌──────────────┐
        │ AIOS Manager │
        └──────┬───────┘
               │
               ▼
       ┌────────────────┐
       │ learning-tutor │
       └───────┬────────┘
               │
        Need document?
               │
               ▼
        ┌──────────────┐
        │    Docling   │
        │     MCP      │
        └──────┬───────┘
               │
               ▼
      Structured Document
               │
               ▼
       learning-tutor
               │
        Understand/Teach
               │
               ▼
     how-to-write-note
               │
               ▼
       AIOS Course Note
```

### Step-by-Step Workflow

```text
STEP 0: PRE-INSPECTION & TOOL SELECTION (ตรวจสอบไฟล์ก่อนเลือกเครื่องมือ)
─────────────────────────────────────────────────────
Inspect the file characteristics (type, page count, layout) before selecting an extraction tool:

┌──────────────────────────────────────────────┬───────────────────────────────┐
│ File Type & Characteristics                  │ Recommended Extraction Tool   │
├──────────────────────────────────────────────┼───────────────────────────────┤
│ 1. Textbooks / Papers / Formal Reports       │ Docling MCP                   │
│    (Multi-column, complex tables, math)      │ (Best for structured docs)    │
├──────────────────────────────────────────────┼───────────────────────────────┤
│ 2. Lecture Slides / Lab Worksheets /         │ PyMuPDF / pypdf (Python)      │
│    Presentation Decks / High Page Count      │ (Fast, prevents timeout on    │
│    (> 25 pages)                              │ free-form / slide layouts)    │
├──────────────────────────────────────────────┼───────────────────────────────┤
│ 3. Scanned PDFs / Diagram-heavy              │ Visual Page Render / Vision   │
├──────────────────────────────────────────────┼───────────────────────────────┤
│ 4. Extraction Failure / Unreadable File      │ Labeled General Knowledge     │
│                                              │ Fallback                      │
└──────────────────────────────────────────────┴───────────────────────────────┘

STEP 1: EXECUTE SELECTED EXTRACTION METHOD
─────────────────────────────────────────────────────
• If Docling selected:
  Use convert_document_into_docling_document → export_docling_document_to_markdown.
• If PyMuPDF/pypdf selected:
  Extract page text to scratch file (UTF-8, avoid terminal print to prevent cp874 error).

STEP 2: VERIFY extraction quality
─────────────────────────────────────────────────────
Check that headings, tables, and body text are present.
If Thai text is garbled or content is missing, flag it.
Never assume extraction is complete without verification.

STEP 3: FALLBACK CASCADE (if selected method fails)
─────────────────────────────────────────────────────
If Primary method fails/timeouts:
1. Fallback to PyMuPDF / pypdf (if Docling failed).
2. If all extraction fails: follow User-Confirmed Fallback (General Knowledge labeled).

STEP 4: MAP content → note structure
─────────────────────────────────────────────────────
Identify: chapter title, learning objectives, sections, key concepts,
tables, examples, diagrams, constraints, formulas.
learning-tutor analyzes and understands the content.

STEP 5: WRITE note file (via how-to-write-note)
─────────────────────────────────────────────────────
write_to_file to AIOS/01 Learning/Courses/[Subject]/[FileName].md

STEP 6: VERIFY
─────────────────────────────────────────────────────
Confirm file exists, backlinks are correct [[wikilink]] format.
```

### Docling MCP Tool Reference

| Tool | Purpose |
|------|---------|
| `convert_document_into_docling_document` | Convert PDF → structured cache |
| `get_overview_of_document_anchors` | Inspect document structure & headings |
| `export_docling_document_to_markdown` | Export full Markdown text |
| `page_thumbnail` | Inspect visual layout, diagrams, tables |
| `search_for_text_in_document_anchors` | Find specific sections |
| `get_text_of_document_item_at_anchor` | Read a specific section |

### Role Boundaries (Critical)

| Role | Responsibility |
|------|---------------|
| **Docling MCP** | PDF extraction only — structured text, tables, figures |
| **learning-tutor** | Understand, analyze, explain, and teach the content |
| **how-to-write-note** | Note structure, formatting, canonical form |
| **aios-manager** | Orchestration, routing, coordination |

Docling is a **document-processing tool**, not the teaching or note-writing authority.

### Windows PowerShell Gotchas (CRITICAL)
| ❌ Wrong (Linux) | ✅ Correct (Windows PowerShell) |
| :--- | :--- |
| `head -c 60000` | Not available — write to file, use `view_file` instead |
| `dir /s /b filename` | `cmd /c "dir /s /b filename"` |
| `python ... \| head` | Write to file, then `view_file` |

### Image & Attachment Handling (CRITICAL)
- **Do not strip images:** Never delete `<img>` tags or image links when cleaning Web Clippings / HTML.
- **Git Sync Awareness:** Folder `Resources/` is ignored by `.gitignore`. Any persistent note in `AIOS/` that requires image assets to sync across devices (e.g. iPad) MUST store images in an `attachments/` folder adjacent to the note (e.g. `AIOS/.../SQL/attachments/`).
- **Embedding Format:** Use relative markdown embed: `![caption](attachments/filename.png)` accompanied by original external link for verification if available.

---

## 7. Quality Checklist

Before saving a note, verify all items:

```text
[ ] Header has source path and page count
[ ] Part 1 has ASCII diagram AND comparison table
[ ] Every ### sub-section has concrete examples
[ ] Code blocks have language tag and Thai comments
[ ] Images and sample output captures preserved and stored in local attachments/
[ ] Part 3 checklist covers all key exam concepts
[ ] Common Pitfalls section has ≥3 specific entries
[ ] Backlinks use [[wikilink]] format (not markdown links)
[ ] Each backlink has a reason in parentheses
[ ] Source cited in backlinks section
[ ] File name follows canonical conventions
[ ] Stored in correct AIOS/ directory
```
