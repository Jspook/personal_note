# Extraction report: Database_Concept_06.pdf

- Source: `Resources/Books/Database/Database_Concept_06.pdf`, 77 pages, 1.16 MB
- PDF metadata: creator Acrobat PDFMaker 11 for PowerPoint, created 2024-09-04. Title field reads "Prediction of Stroke using Deep Learning Model" (stale PowerPoint metadata; the content is Database System Concept Chapter 6)
- Type: digital PDF exported from PowerPoint slides (lecture deck, Thai with English technical terms), not scanned, no OCR needed
- Tool: PyMuPDF 1.28.2 (`pymupdf`, page.get_text()), Python 3.13. Docling skipped by user decision. Page images rendered at 70 dpi for visual checks
- Method selection basis: lecture slides > 25 pages, full-text layer present on every page

## Issue found and fixed
Thai text layer uses private-use glyphs (U+F700-U+F71B) for vowel/tone marks, so raw text shows e.g. `สถาป\uf710ตยกรรม`. Remapped by lookup (F701 ิ, F702 ี, F703 ึ, F704 ื, F70A/F713 ่, F70B/F714 ้, F70C/F715 ๊, F70D/F716 ๋, F70E/F717 ์, F710 ั, F711/F71B ํ, F712 ็, F718 ุ, F719 ู), then `ํา` normalized to `ำ`. U+F076 (bullet) mapped to `•`. After remap no private-use characters remain (checked). Mapping was validated against known words (สถาปัตยกรรม, ข้อมูล, ส่วน, ฟังก์ชัน, เป็น, ซ้ำซ้อน)

## Status
- 77/77 pages have an inventory entry (`page-inventory.json`)
- Pages with sparse or no text layer, content is diagram/image; read visually and transcribed into the note: [5, 6, 9, 11, 13, 21, 43, 44, 77]
- Pages flagged for visual check (22 pages): [5, 6, 9, 11, 12, 13, 15, 16, 21, 22, 24, 25, 26, 27, 29, 31, 36, 39, 40, 43, 44, 77]
- Diagram pages whose labels live in images (read from page renders): 5, 6, 9, 11, 13, 44. Vector diagrams with numeric layer labels: 22, 24-27, 29, 31, 36, 39, 40
- Pages 21, 43 are section divider slides; p.77 is a closing "Questions" image slide, no content
- Figures are not exported as image assets in this run (notes use ASCII with conversion hints per how-to-write-note Phase 1)

## Anomalies in the source (preserved, not corrected silently)
- p.24 titled "6.4.2 Centralized DBMS Architecture (cont.)" while p.23, 25, 26 use 6.5.1
- p.29 "1st Generation Client/Server" vs p.30 "2nd Generation Client/Server" on its continuation slide
- p.28 "xxxxx" and p.31 "xxxx" placeholders where text is missing
- p.50 Data files / Control files described with logical/physical view wording that is hard to follow
- p.69 background process listed as "LNDN" (probable typo); column layout of the list collapsed in text extraction
- p.63 "NO Rows = 1" unclear
- Obvious typos corrected in the note and listed there: Procederal, font end, Mata-data, ทั้นที, extens
