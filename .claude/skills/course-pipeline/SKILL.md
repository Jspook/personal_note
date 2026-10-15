---
name: course-pipeline
description: Turn a new course file (PDF lecture slides or textbook chapter) into a verified Complete Note plus a homework file in the AIOS vault. Use when the user drops a new course PDF and says to summarize it, make a note from it, or run the pipeline ("สรุปไฟล์", "สร้าง note จาก PDF", "โยนไฟล์เรียนให้จัดการ").
---

# Course Pipeline

Sequence: **Extractor → (Researcher, opt-in) → Editor → Verifier → PLAN → user confirms → WRITE → Verify**.
Stages run in order and hand off through files in a staging folder. Nothing is written to the vault's knowledge folders before the user confirms the Plan. Follow `how-to-write-note` for note structure; CLAUDE.md rules (no moving/deleting files, ask before changing existing files) always apply.

Origin: dry run on `Resources/Books/Database/Database_Concept_06.pdf` (2026-10-15), 77 Thai slides. Lessons from it are baked in below.

## 0. Setup
1. Source must be under `Resources/`. Slug = `YYYY-MM-DD <source file name without extension>`.
2. Staging folder: `.pipeline/<slug>/` at the vault root (gitignored). Scratch files and stage reports live here. Create it without asking; creating anything else needs the Plan gate.
3. Search existing notes for the topic first (`AIOS/01 Learning/Courses/[Subject]/`). The Plan must say update or create. Read the previous chapter note of the same course to match tone, metadata and backlinks.

## 1. Extractor
Goal: inventory the original content without summarizing it.
- Inspect: page count, metadata (titles in PowerPoint exports can be stale), whether text layer exists, layout (slides, columns, tables, formulas, code, figures).
- Default tool: PyMuPDF via `extract_pdf.py` in this skill folder (`python extract_pdf.py <pdf> <staging>`). Writes `raw-content.md`, `page-inventory.json`, 60 dpi page thumbnails. Docling is not used unless the user asks for it.
- Known trap: Thai PowerPoint PDFs store vowel/tone marks as private-use glyphs (U+F700-U+F71B). The script remaps them; after extraction confirm no private-use characters remain (script prints unmapped ones) and spot-check known words.
- Text inside images is not in the text layer. Every page flagged `needs-visual-check` must be rendered and read (Read tool on PNG / PDF page). Contact sheets of 4-6 pages at ~65-70 dpi work well. Record each page as `extracted+visually-checked` with a resolution; no page may stay unresolved before the Editor starts. Typical misses: SQL examples and parameter values inside image boxes.
- Preserve source anomalies (inconsistent numbering, placeholders such as "xxxx", typos, figure/text mismatches). Do not silently fix them; list them in `extraction-report.md`.
- Export key figures: crop page renders at ~110 dpi to PNG (`db06_pNN_<name>.png` style) for `attachments/` beside the note.
- Artifacts: `extraction-report.md` (file facts, tool and version, method and why, issues, per-page status summary, anomalies), `page-inventory.json`, `raw-content.md`, figure PNGs.
- If extraction fails: report the exact failure, then continue with general knowledge only for the affected sections, each labeled `[Source: generated — not verified against original document]` (user-confirmed default, 2026-09-23).

## 2. Researcher (off by default)
Run only when the Editor flags a concept the source cannot explain, a likely source error, or the user asks. Prefer primary docs. Record title, URL, date, access date and the claim supported in `sources.json`; keep external material visibly separate from source content; never overwrite a source statement, add a labeled correction note instead. If search is unavailable, say so and continue source-only. Artifacts: `research-report.md`, `research-notes.md`, `sources.json`.

## 3. Editor
Goal: write the Complete Note from `raw-content.md` + page renders using `how-to-write-note`.
- Header with source path and slide count; every claim that comes from the source carries `[p.N]`; link each major section to source pages.
- Diagrams are Mermaid only (no ASCII art). Embed the original figures from `attachments/` only when they add information.
- Content added beyond the source goes in blockquotes starting with 💡 and the `[Source: generated — not verified against original document]` label. Never present generated content as source content.
- Keep all meaningful content: lists, numbers, parameters, SQL/code, diagram labels, exceptions. Do not drop a bullet because it looks minor. Do not fill gaps in the source: show `[xxxx — ต้นฉบับขาดหาย]`.
- Add a pitfalls bullet for each source anomaly and for each typo normalization (list the corrected typos with page numbers).
- Do not attribute a statement to a slide that does not say it (check cited page numbers). Do not claim a figure belongs to text that merely refers to "the figure above".
- Also write the homework file (user default, 2026-09-23): `AIOS/01 Learning/Learning Progress/HW-[Subject]-[NN].md`, NN = next free two-digit number (check existing files). Questions from the source, answers inside `<details>`, difficulty rating per section, slide references in every answer, invented scenarios marked as such.
- Output: `complete-notes.md` and `HW-[Subject]-[NN].md` in staging.
- Before handing over: validate every Mermaid block with a parser when possible (mermaid npm package with jsdom `mermaid.parse`), check Markdown tables for consistent column counts (escape `|` inside cells), check for no private-use Thai glyphs.

## 4. Verifier
Run as the `course-verifier` subagent (tools: Read, Glob, Grep only, so read-only is technically enforced). It must read the original PDF itself, not only the extraction. If that agent is not installed, use a general read-only subagent and state in the report that isolation is procedural.
It checks and reports PASS / FAIL / PARTIAL with slide number, exact source quote vs exact note quote, and a correction instruction naming the responsible stage:
1. Every page has a recorded, resolved status. 2. Every heading is represented or accounted for (divider and closing slides listed). 3. Definitions, numbers, parameters, tables, code, labels and exceptions preserved (compare slide by slide). 4. Formula/symbol and Thai text integrity. 5. OCR/layout uncertainties reviewed or flagged. 6. Researched claims traceable. 7. Added content distinguishable and accurate. 8. Citations and `[p.N]` correct; no unsupported claims. 9. Source anomalies handled correctly (not silently fixed or filled). 10. Template conformance, Mermaid blocks present, homework answers match slides.
The Verifier never edits notes. Main session writes `verification-report.md` from its output, sends corrections to the responsible stage, then re-verifies only the corrected items. Maximum 2 rounds; list anything still open in the report.

## 5. Plan (gate)
Stop here and present, in plain language:
1. Source file, page count, method and why. 2. Pages flagged or unreadable. 3. Target note path (new or update of an existing note) and homework path. 4. Every file to be written: note, attachments, HW, `.pipeline/<slug>/` reports, `.gitignore` change if needed. 5. What will not be touched. 6. Verifier result and open items, including source statements that look doubtful and were not checked (Researcher off).
Nothing is written until the user answers. Changes to existing files (for example `.gitignore`) are named explicitly.

## 6. Write and verify
- Note: `AIOS/01 Learning/Courses/[Subject]/<match the subject's existing file naming, e.g. "Chapter 06 Database System Architecture.md">`; figures in `attachments/` beside it; wikilinks must match existing file names (check they resolve).
- Copy stage reports into `.pipeline/<slug>/`. Re-list the target folders and confirm every file exists, the note has the expected sections and Mermaid blocks, and nothing unrelated changed.
- Final report: Completed / Created / Modified / Not changed / Open items (source anomalies, unchecked claims).

## Constraints that bite
- In Cowork/remote sessions the folder tools cannot write into `.claude/`; stage skill changes elsewhere and give the user a move command.
- Never run background loops silently; report status between stages.
- Keep run files out of git (`.pipeline/` is gitignored); `Resources/` is also gitignored, so figures the note needs live in `attachments/` under `AIOS/`.
