---

name: how-to-write-note
description: Document writing standard for the user's AIOS Obsidian Vault. Defines the canonical note structure, section templates, formatting conventions, and Wiki-style backlink format used across all course notes and learning summaries. Activate when creating or reformatting any academic note, course summary, or study document.

---

# How to Write a Note

## 1. Purpose

Define the **canonical structure** for all academic notes inside the AIOS Vault.

The primary goal is:

> Every note must be self-contained, scannable, and cross-linked — usable as a study reference, exam cheat sheet, and knowledge graph node.

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

When the source is a PDF or slide deck, follow this **exact workflow** — no exceptions:

```text
STEP 1: CHECK tools availability
─────────────────────────────────────────────────────
python -c "import pymupdf; print('PyMuPDF OK')"

If NOT available:
  → python -c "from pypdf import PdfReader; print('pypdf OK')"

NEVER use browser_subagent to open local PDF — Playwright
may not be installed on this machine.


STEP 2: EXTRACT to scratch file (UTF-8, mandatory)
─────────────────────────────────────────────────────
python -c "
import pymupdf, sys
sys.stdout.reconfigure(encoding='utf-8')
doc = pymupdf.open(r'[ABSOLUTE_PATH_TO_PDF]')
print(f'Total pages: {len(doc)}')
out = r'C:/Users/sirav/.gemini/antigravity-ide/brain/[CONV_ID]/scratch/[name]_raw.txt'
with open(out, 'w', encoding='utf-8') as f:
    for i, page in enumerate(doc):
        f.write(f'=== PAGE {i+1} ===\n{page.get_text()}\n')
doc.close()
print('Done:', out)
"

NEVER pipe output directly to terminal — Thai text causes
cp874 UnicodeEncodeError on Windows. Always write to file first.


STEP 3: READ temp file in chunks
─────────────────────────────────────────────────────
view_file(StartLine=1, EndLine=200)
view_file(StartLine=200, EndLine=400)
... repeat until all pages are read


STEP 4: MAP content → note structure
─────────────────────────────────────────────────────
Identify: chapter title, learning objectives, sections, key concepts,
tables, examples, diagrams, constraints, formulas


STEP 5: WRITE note file
─────────────────────────────────────────────────────
write_to_file to AIOS/01 Learning/Courses/[Subject]/[FileName].md


STEP 6: VERIFY
─────────────────────────────────────────────────────
Confirm file exists, backlinks are correct [[wikilink]] format
```

### Windows PowerShell Gotchas (CRITICAL)
| ❌ Wrong (Linux) | ✅ Correct (Windows PowerShell) |
| :--- | :--- |
| `head -c 60000` | Not available — write to file, use `view_file` instead |
| `dir /s /b filename` | `cmd /c "dir /s /b filename"` |
| `python ... \| head` | Write to file, then `view_file` |

---

## 7. Quality Checklist

Before saving a note, verify all items:

```text
[ ] Header has source path and page count
[ ] Part 1 has ASCII diagram AND comparison table
[ ] Every ### sub-section has concrete examples
[ ] Code blocks have language tag and Thai comments
[ ] Part 3 checklist covers all key exam concepts
[ ] Common Pitfalls section has ≥3 specific entries
[ ] Backlinks use [[wikilink]] format (not markdown links)
[ ] Each backlink has a reason in parentheses
[ ] Source cited in backlinks section
[ ] File name follows: [Subject] - [ID] [Title].md
[ ] Stored in AIOS/01 Learning/Courses/[Subject]/
```
