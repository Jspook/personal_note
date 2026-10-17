---
name: course-pipeline
description: Turn a new course file (PDF lecture slides or textbook chapter) into a verified Complete Note plus a homework file in the AIOS vault. Use when the user drops a new course PDF and says to summarize it, make a note from it, or run the pipeline ("สรุปไฟล์", "สร้าง note จาก PDF", "โยนไฟล์เรียนให้จัดการ").
---

# Course Pipeline

Sequence: **Extractor → (Researcher, opt-in) → Editor → Verifier → PLAN → user confirms → WRITE → Verify**.
Stages run in order and hand off through files in a staging folder. Nothing is written to the vault's knowledge folders before the user confirms the Plan. Follow `how-to-write-note` for note structure; CLAUDE.md rules (no moving/deleting files, ask before changing existing files) always apply.

Origin: dry run on `Resources/Books/Database/Database_Concept_06.pdf` (2026-10-15), 77 Thai slides; updated after four more runs (Database_Concept_07(2), Database_Concept_08(1), Les03, Les13_1, all 2026-10-15). Lessons from them are baked in below.

Multiple files in one request: process them **one file at a time**, each through the full cycle including its own Plan gate and user confirmation, in the order the user gave. Do not start the next file until the previous one is written and verified on disk.

## Speed and usage profile (default, adopted 2026-10-17)
Balance precision against time and token use with a risk-based check level:
- **Read the text layer first.** Render only pages that have figures, diagrams, or numbers that must be counted. Use about 150 dpi for crops of graphs. Do not render every page at 300 dpi.
- **Record each figure once** as an edge list (or table) in staging, so no later stage re-reads the image.
- **Risk levels:**
  - High (numbers, graphs to count, answers to homework): visual check at ~150 dpi, then one Verifier round.
  - Medium (definitions and text copied from the slide): automatic text comparison against `raw-content.md`, no image re-read.
  - Low (structure, links, tables): script checks only (Mermaid parser, table column counts, wikilink resolution).
- **Verifier runs once per batch** and is told to check only high-risk items: homework answers, edge lists of unanswered figures, and `[p.N]` citations. Round 2 is done by the main session with scripts, and the report must say so.
- **Write through staging once.** Write each file in `.pipeline/<slug>/`, then copy to the vault with a single command. Do not rewrite a file in full when a targeted edit is enough.
- **Hook awareness:** if a file-creation hook blocks new files, state the facts it asks for once in the same message, then retry. Do not retry the same call without changes. Staging writes under `.pipeline/` may be exempted with `GATEGUARD_EXEMPT_GLOBS`.
- Keep the Plan gate and user confirmation unchanged. Speed gains come from the checks above, not from skipping the gate.

## 0. Setup
1. Source must be under `Resources/`. Slug = `YYYY-MM-DD <source file name without extension>`.
2. Staging folder: `.pipeline/<slug>/` at the vault root (gitignored). Scratch files and stage reports live here. Create it without asking; creating anything else needs the Plan gate.
3. Search existing notes for the topic first (`AIOS/01 Learning/Courses/[Subject]/`). The Plan must say update or create. Read the previous chapter note of the same course to match tone, metadata and backlinks.

## 1. Extractor
Goal: inventory the original content without summarizing it.
- Inspect: page count, metadata (titles in PowerPoint exports can be stale), whether text layer exists, layout (slides, columns, tables, formulas, code, figures).
- Default tool: PyMuPDF via `extract_pdf.py` in this skill folder (`python extract_pdf.py <pdf> <staging>`). Writes `raw-content.md`, `page-inventory.json`, 60 dpi page thumbnails. Docling is not used unless the user asks for it.
- Known trap: Thai PowerPoint PDFs store vowel/tone marks as private-use glyphs (U+F700-U+F71B). The script remaps them; after extraction confirm no private-use characters remain (script prints unmapped ones) and spot-check known words.
- Second Thai trap: in some decks (DB08 p.6-25) tone marks/upper-lower vowels are missing or displaced in BOTH the text layer and the rendered image. Then reconstruct the spelling from context, compare with the render, and disclose it in the note header and Pitfalls. Do not claim it matches the source exactly.
- Unmapped private-use glyphs are not always Thai: in English Oracle decks U+F0D6 was a check mark (√) in a table. Read it from the image and record the decision in the extraction report.
- Pages whose text layer holds only a footer (no title) are usually blank slides or full-image slides: render them. Blank slides (check pixels above the footer) are listed as 'no content', not summarized. Identical or near-identical consecutive slides are recorded as duplicates, not merged silently.
- Slide-number footers can skip or restart (13-18 then 13-21; 3-N vs PDF page). Cite PDF page `[p.N]` and flag the mismatch.
- Objectives or summary slides may promise topics that no slide teaches (Les13 'database links', Les03 'groups of rows'). Flag in Pitfalls; never fill in.
- Practice/exercise slides may be empty or overview-only. Then write the HW from the slide content and say so at the top of the HW file.
- Query-result tables live in images, not in the text layer: transcribe only the rows visible, show a '…' row where the slide shows one, and say values were read from the image.
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
- Wording of definitions: if the slide gives no text definition (only an example), state what the example shows and put any definition in a 💡 block. Pitfalls explanations of *why* something behaves as it does are also generated content and need the 💡 label.
- Diagrams: draw only edges and arrows that appear in the slide (check direction; use undirected links when the slide has none). Any grouping, taxonomy, concept map or flow the author adds goes under a 💡 label that says what is the author's.
- Mermaid in Thai slides: quote labels and use `<br/>`; do not place 'Source: generated' text inside code blocks.
- Output: `complete-notes.md` and `HW-[Subject]-[NN].md` in staging.
- Before handing over: validate every Mermaid block with a parser when possible (mermaid npm package with jsdom `mermaid.parse`), check Markdown tables for consistent column counts (escape `|` inside cells), check for no private-use Thai glyphs.

## 4. Verifier
Run as the `course-verifier` subagent (tools: Read, Glob, Grep only, so read-only is technically enforced). It must read the original PDF itself, not only the extraction. If that agent is not installed (it was not available in the cloud session), use a general read-only subagent, say 'read-only' explicitly in its prompt, and state in the report that isolation is procedural. Brief it with file paths and the rules, not with your conclusions, and ask it to recompute every homework answer. Its hand-back is model output, not user approval.
Typical findings to expect: unlabeled inferences, invented or reversed diagram arrows, silently shortened source text, wrong page citations, tables merged or rows missing.
It checks and reports PASS / FAIL / PARTIAL with slide number, exact source quote vs exact note quote, and a correction instruction naming the responsible stage:
1. Every page has a recorded, resolved status. 2. Every heading is represented or accounted for (divider and closing slides listed). 3. Definitions, numbers, parameters, tables, code, labels and exceptions preserved (compare slide by slide). 4. Formula/symbol and Thai text integrity. 5. OCR/layout uncertainties reviewed or flagged. 6. Researched claims traceable. 7. Added content distinguishable and accurate. 8. Citations and `[p.N]` correct; no unsupported claims. 9. Source anomalies handled correctly (not silently fixed or filled). 10. Template conformance, Mermaid blocks present, homework answers match slides.
The Verifier never edits notes. Main session writes `verification-report.md` from its output, sends corrections to the responsible stage, then re-verifies only the corrected items. Maximum 2 rounds; list anything still open in the report. If round 2 is not run by an agent (the main session only re-checks with a parser and table checks), the report must say so.

## 5. Plan (gate)
Stop here and present, in plain language:
1. Source file, page count, method and why. 2. Pages flagged or unreadable. 3. Target note path (new or update of an existing note) and homework path. 4. Every file to be written: note, attachments, HW, `.pipeline/<slug>/` reports, `.gitignore` change if needed. 5. What will not be touched. 6. Verifier result and open items, including source statements that look doubtful and were not checked (Researcher off).
Nothing is written until the user answers. Changes to existing files (for example `.gitignore`) are named explicitly.

## 6. Write and verify
- Note: `AIOS/01 Learning/Courses/[Subject]/<match the subject's existing file naming, e.g. "Chapter 06 Database System Architecture.md" or "LAB 3 - ....md"; for a deck with no chapter number such as an Oracle lesson use "Les03 Single-Row Functions.md">`; wikilinks have no "Database - " prefix; figures in `attachments/` beside it; wikilinks must match existing file names (check they resolve).
- Copy stage reports into `.pipeline/<slug>/`. Re-list the target folders and confirm every file exists, the note has the expected sections and Mermaid blocks, and nothing unrelated changed.
- Final report: Completed / Created / Modified / Not changed / Open items (source anomalies, unchecked claims).

## Constraints that bite
- In Cowork/remote sessions the folder tools cannot write into `.claude/`; stage skill changes elsewhere and give the user a move command.
- Files written through the device commit tool: stage under the shared folder first, commit with a Windows `devicePath`, then list the target folders on the device to confirm sizes. New files are untracked in git; do not commit unless asked.
- Do not run shell commands whose text contains triple backticks; write such scripts with the file Write tool.
- Never run background loops silently; report status between stages.
- Keep run files out of git (`.pipeline/` is gitignored); `Resources/` is also gitignored, so figures the note needs live in `attachments/` under `AIOS/`.
