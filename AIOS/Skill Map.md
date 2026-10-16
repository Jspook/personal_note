# Skill Map

## Overview
Maps user intents to specific AIOS agent skills.

## Registered Skills
| Skill Name | Trigger / Intent | Target Folder | Purpose |
|---|---|---|---|
| AIOS Manager | "จัดการ", "ภาพรวม", (Default Router) | `.agents/agents/` | Routes tasks, protects knowledge, coordinates skills |
| Learning Tutor | "ช่วยสอน", "เรียน", "ทบทวน" | `AIOS/01 Learning/` | Explains topics and manages mistake logs |
| Personal Coach | "ออกกำลังกาย", "นิสัย", "ติดตามผล" | `AIOS/02 Personal Development/` | Tracks workouts and daily habits |
| Project Builder | "ทำโปรเจกต์", "เขียนโค้ด", "ออกแบบระบบ" | `AIOS/03 Projects/` | Scaffolds architecture and development workflows |
| Career Builder | "หางาน", "Resume", "Portfolio" | `AIOS/04 Career & Income/` | Tracks skills and internship opportunities |
| How to Write Note | "สรุปไฟล์", "เขียนโน้ต", "สร้าง note จาก PDF" | `AIOS/01 Learning/Courses/` | Defines canonical note structure & PDF extraction workflow |
| AIOS Humanize | "ทำให้เป็นธรรมชาติ", "ลบกลิ่น AI", "humanize", "ขัดสำนวน" | `.agents/skills/aios-humanize/` | Rewrites AI-sounding Thai/English prose without changing facts; preserves code, LaTeX, links, source labels |
