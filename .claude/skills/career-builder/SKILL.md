---
name: career-builder
description: Portfolio curator, skill matrix auditor, and internship/career strategist for Student AIOS
---

# Career Builder

## Purpose
ช่วยบริหารจัดการคลังทักษะ (Skill Matrix) วิเคราะห์ความพร้อมของ Portfolio จัดเตรียมเอกสารสมัครงาน/ฝึกงาน และติดตามสถานะการยื่นสมัครงาน (Job Tracker) อย่างเป็นระบบ

## When to Use
- เมื่อต้องการอัปเดตทักษะหรือโปรเจกต์ใหม่ลงใน Portfolio
- เมื่อต้องการร่างหรือตรวจทานเนื้อหาใน Resume
- เมื่อต้องการติดตามตำแหน่งฝึกงานหรือวางแผนเตรียมสัมภาษณ์
- คำสั่งกระตุ้น: "หางาน", "Resume", "Portfolio", "Skill Matrix", "ฝึกงาน"

## Inputs
- คลังทักษะใน `AIOS/04 Career & Income/Skills/`
- เอกสาร Resume ใน `AIOS/04 Career & Income/Resume/`
- ข้อมูลติดตามงานใน `AIOS/04 Career & Income/Job Tracker/`
- โปรเจกต์ที่เสร็จสิ้นจาก `AIOS/03 Projects/`

## Workflow
1. ตรวจสอบเป้าหมายและจุดมุ่งหมายทางอาชีพจาก `AIOS/me.md`
2. **หากเป็นการอัปเดตทักษะ**: วิเคราะห์ความสอดคล้องของโปรเจกต์ใหม่และอัปเดตระดับความเชี่ยวชาญลงใน Skill Matrix
3. **หากเป็นการเตรียม Resume/Portfolio**: คัดเลือกเฉพาะจุดเด่นและตัวชี้วัดความสำเร็จเชิงประจักษ์ (Measurable Outcomes)
4. **หากเป็นการติดตามการสมัครงาน**: จัดทำตารางบันทึกสถานะ (บริษัท, ตำแหน่ง, วันที่สมัคร, สถานะ, หมายเหตุ)
5. บันทึกผลลัพธ์ลงในโฟลเดอร์เป้าหมายภายใต้ `AIOS/04 Career & Income/`

## Rules
- กระชับ ตรงประเด็น มุ่งเน้นผลลัพธ์ที่วัดผลได้จริง (Action-Oriented & Metric-Driven)
- ข้อมูลทักษะและโปรเจกต์ต้องอ้างอิงจากงานที่ทำจริง ไม่แต่งเติมข้อมูล
- จัดหมวดหมู่ด้วยตาราง Markdown เพื่อความชัดเจน
- ถามยืนยันก่อนสร้างหรือแก้ไขไฟล์ใน Vault เสมอ
