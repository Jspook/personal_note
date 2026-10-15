# Vault Map

## Purpose
This document defines the storage layout and file naming standards for AIOS.

## Folder Mapping
- `CLAUDE.md`: Root instructions for Claude (AIOS Manager role, rules, routing).
- `.claude/skills/`: Claude skills (e.g., `learning-tutor`, `how-to-write-note`).
- `.agents/`: Legacy pre-Claude agents, rules and skills. Kept as backup.
- `AIOS/00 Dashboard/`: High-level tracking, daily logs, and weekly reviews.
- `AIOS/01 Learning/`: Academic courses, study summaries, and mistake logs.
- `AIOS/02 Personal Development/`: Habits, fitness routines, and personal growth.
- `AIOS/03 Projects/`: Source references, architecture plans, and project progress.
- `AIOS/04 Career & Income/`: Skill matrices, resumes, and internship applications.
- `AIOS/Scripts/`: Helper scripts.
- `Resources/`: External materials, documentation, and book notes.

## File Rules
- Naming: Use descriptive titles (e.g., `Database Systems - Normalization.md`).
- Integrity: Never overwrite user notes without confirmation.
