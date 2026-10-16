# verification-report: Database_Concept_07(2).pdf

Verifier: general-purpose subagent, read-only by instruction (agent `course-verifier` is not available in this cloud session, so isolation is procedural). Read all 52 slides as images. Round 1 only.

## Result of 10 checks (round 1)
1 PARTIAL (inventory statuses not updated) | 2 PASS | 3 PARTIAL | 4 PARTIAL | 5 PASS | 6 N/A (no Researcher) | 7 PARTIAL | 8 PASS (no wrong [p.N]) | 9 PARTIAL | 10 PASS (minor)

Schedule tables (p.22, 24, 26, 28, 29, 31, 36, 37), state diagram p.16 and rollforward p.46 matched the slides row by row.

## Findings and what was done
| # | Sev | Finding | Action |
| :-: | :-: | :--- | :--- |
| 1 | High | 💡 under Schedule 4 had the lost-update direction reversed | Fixed (T1's write(A) overwrites T2's; T2's write(B) overwrites T1's) |
| 2 | Med | p.9 INPUT/OUTPUT arrows reversed, Program B unconnected | Fixed |
| 3 | Med/Low | p.23 Schedule 2 table missing; p.32-34 prose only | Added p.23 table, p.34 table; p.32-33 reference the identical tables above |
| 4 | Low/Med | p.3 diagram missing edges incl. transaction manager | Added edges, caption states which are omitted |
| 5 | Low | p.51 "ช้าหน่อย" changed to "ช้ากว่า" | Restored in note and HW |
| 6 | Low | Silent changes (p.47 "เรียกกว่า", p.28 wording, p.16 node name) | Listed in Pitfalls |
| 7 | Low | p.4 bullets mis-described as heading | Rewritten as the three sub-bullets |
| 8 | Low | Tone-mark repair rationale inaccurate (images also garbled) | Pitfall reworded as reconstruction |
| 9 | Low | "ของอาจารย์" attribution; invented "ไฟล์ที่ n" labels | Reworded / removed |
| 10 | Low | Backlink without reason | Reason added (Chapter 01 exists in vault) |
| 11 | Low | page-inventory.json statuses unresolved | Updated to extracted+visually-checked |
| 12 | Low | p.35 two tables merged | Split into two tables |
| 13 | Low | p.12/p.21 term mismatch, "Schedule 11" | Added to Pitfalls |
| 14 | Low | p.21 title missing | Added to heading |
| 15 | Low | Optional template extras (notation table etc.) | Not done (optional) |
| 16 | Low | HW C3 role swap | Question rewritten with slide's roles |

## Round 2
Not re-run by the agent. Checked by me: all 13 Mermaid blocks parse (mermaid 10.9.1), table column counts consistent, no private-use glyphs. Open: finding 15 (optional), p.32-33 rely on cross-reference to earlier tables.

## Items not verified against external sources (Researcher off)
- SQL-92 "Serializable default" (p.39) vs real DBMS defaults (flagged in 💡).
- "AIJ" expansion as After-Image Journal (flagged in 💡, slide does not expand it).
