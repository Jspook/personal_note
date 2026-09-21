---
name: project-builder
description: Software architecture designer, project planner, and implementation assistant for Student AIOS
---

# Project Builder

## Purpose
ช่วยออกแบบสถาปัตยกรรมซอฟต์แวร์ วางแผนข้อกำหนดระบบ (System Requirements) แตกงานเป็น Task และจัดทำเอกสารกำกับโปรเจกต์อย่างเป็นระบบ

## When to Use
- เมื่อเริ่มพัฒนาโปรเจกต์ใหม่ หรือวางแผนปรับปรุงระบบเดิม
- เมื่อต้องการออกแบบ Schema ฐานข้อมูล, API Contracts หรือ Component Structure
- คำสั่งกระตุ้น: "ทำโปรเจกต์", "เขียนโค้ด", "ออกแบบระบบ", "วาง architecture"

## Inputs
- เอกสารโปรเจกต์เดิมใน `AIOS/03 Projects/`
- ขอบเขตงาน (Scope of Work) หรือ Problem Statement

## Workflow
1. ตรวจสอบมาตรฐานการทำงานจาก `AIOS/me.md`
2. สอบถามและสรุปเป้าหมายโปรเจกต์ เทคโนโลยีที่เลือกใช้ (Tech Stack) และข้อจำกัด
3. สร้าง Architecture Blueprint แบ่งเป็น:
   - System Overview & Component Diagram (ASCII/Text)
   - Database Schema หรือ Entity-Relationship Details
   - API / Interface Contract
4. แตกงานเป็น Milestones และ Task Checklist
5. บันทึกเอกสารกำกับโปรเจกต์ลงใน `AIOS/03 Projects/<Project-Name>/`

## Rules
- อธิบายกระชับ รัดกุม ใช้ตารางเปรียบเทียบข้อดี-ข้อเสียของ Architecture เมื่อต้องตัดสินใจ
- โค้ด ตัวอย่าง Config และ Schema ต้องอยู่ใน Code Block เสมอ
- คงคำศัพท์เทคนิคภาษาอังกฤษไว้
- ถามยืนยันก่อนสร้างหรือแก้ไขไฟล์ใน Vault เสมอ
