# Verification report: Database_Concept_06.pdf -> Chapter 06 note

Verifier ran as a separate subagent (Explore type) that read the original PDF directly (text layer plus page renders) and the pipeline artifacts. Read-only isolation was procedural: the agent type has Bash, so the no-write rule was an instruction, not a technical block. Two rounds, as planned (maximum 2).

## Round 1 (20 findings: 1 High, 11 Medium, 8 Low)
| # | Check | Result |
|---|---|---|
| 1 | Every page has a recorded status | PARTIAL -> fixed (22 flagged pages resolved by visual check) |
| 2 | Headings represented or accounted for | PARTIAL -> fixed (p.21, 43, 77 noted) |
| 3 | Definitions, numbers, parameters, tables, code preserved | PARTIAL -> fixed |
| 4 | Thai text integrity | PASS |
| 5 | Added content labeled as generated and sound | PASS |
| 6 | Homework answers match slides, citations correct | PASS |
| 7 | Template conformance, nothing unsupported | PARTIAL -> fixed |
| 8 | Source anomalies handled | PARTIAL -> fixed |

Main findings and disposition (all corrected by Extractor/Editor):
- F1 High: SQL example `ALTER SYSTEM SET SHARED_POOL_SIZE = 64M;` on p.56 sat inside an image and was missing. Added.
- F2: p.16-17 describe figures that are not on those slides; the p.11 figure was wrongly attached to them. Separated and flagged.
- F3: p.31 "xxxx" had been silently filled in; p.28 gap dropped. Now shown as `[xxxx — ต้นฉบับขาดหาย]`.
- F4: p.50 anomaly mischaracterized and a bullet dropped. Transcribed verbatim and anomaly corrected.
- F5, F11: dropped bullets on p.55 and p.75 restored.
- F6: PGA wrongly shown as part of Instance. Corrected to match p.44, 46, 65.
- F7, F8: p.27-32 and p.36-37 shown as unnumbered slides; double use of "Thin Client/Fat Server" explained.
- F9: p.2 cited for claims it does not make. Fixed.
- F10: no figures preserved. 8 figures exported to `attachments/` and embedded.
- F12: a table row with unescaped pipes. Fixed.
- F13-F20: coverage notes for p.21/43/77, undisclosed typo normalizations, small omissions, HW wording (E7) and three added HW questions (E10-E12).

## Round 2 (targeted re-verification)
All 17 round-1 fixes: PASS. No High or Medium findings. Three Low items, all applied:
- N1 wording of the p.50 vs p.52 comparison; N2 typo citation [p.28, 31, 32]; N3 extra typos (Physical Databasess, sever, shortened objective on p.2).

## Open items for you (not errors)
- Slide statements that look doubtful and are kept as written with a label: redo log "2 groups x at least 2 files" (p.52), ARCn "records everything in the database" (p.75), `V$dispatcher` "NO Rows = 1" (p.63), background process "LNDN" (p.69), LGWR trigger "ไฟล์ขนาด 1 MB" (p.71). Researcher is off, so none were checked against Oracle documentation.
- Slide 29/30 generation titles and slide 24 section number are inconsistent in the source (kept and flagged).
- Wikilink `[[Chapter 01 Introduction to Database System & Relational Model]]` matches the existing note filename; the HW file links to `[[Chapter 06 Database System Architecture]]`, which matches the proposed filename below.
