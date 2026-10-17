# Discrete Mathematics - Week12: Bipartite Matching and Graph Connectivity

> **วิชา:** Discrete Mathematics | **ผู้สอน:** Dr. Sirasit Lochanachit
> **Source:** `Resources/Books/Discrete Mathematics/DM_Week12.pdf` (51 slides, หัวสไลด์ "Week 13: Graphs Part 2")
> **สถานะ (2026-10-17):** เนื้อหาหัวข้อ matching และ connectivity แยกเป็นโน้ตย่อยแล้ว (ตารางด้านล่าง) ไฟล์นี้เหลือภาพรวมและส่วนทบทวนที่โน้ตย่อยไม่ได้เขียนซ้ำ

---

## Part 1: Macro Architecture & Overview

สัปดาห์นี้ต่อจาก Graphs Part 1 โดยช่วงต้นทบทวน Directed Graph Terminology และ Special Types of Simple Graphs (ดูรายละเอียดใน [[Week11 - Graphs, Graph Terminology and Representing Graphs]]) จากนั้นเข้าสู่เนื้อหาใหม่ 2 เรื่องหลัก: (1) **การจับคู่ในกราฟสองส่วน (Bipartite Matching)** สำหรับโจทย์มอบหมายงาน และ **Hall's Marriage Theorem** และ (2) **ความเชื่อมโยงของกราฟ (Connectivity)** ตั้งแต่ Path, Circuit, Connected Components ไปจนถึง Cut Vertex/Edge และตัววัด κ(G), λ(G) ซึ่งใช้วัด **ความทนทาน (reliability)** ของเครือข่าย

### แผนที่โน้ตย่อยของสัปดาห์นี้

| หัวข้อ | สไลด์ | โน้ต |
| :--- | :--- | :--- |
| Bipartite graph, Matching, Hall's theorem, augmenting path | p.10-26 | [[Week12 - Bipartite Graphs and Matchings]] |
| Path, circuit, simple, Six Degrees, Bacon number, connected, components | p.27-39 | [[Week12 - Paths, Circuits and Connectedness]] |
| Cut vertex/edge, vertex cut, κ(G), edge cut, λ(G), Whitney, Menger | p.40-49 | [[Week12 - Cut Vertices, Edge Cuts and Connectivity]] |
| การประยุกต์ใช้กับเครือข่ายข้อมูลและถนน (Barcelona vs Bangkok) | p.50-51 | [[Week12 - Road Network Connectivity Barcelona vs Bangkok]] |
| แบบฝึกหัดพร้อมเฉลย | ทั้งชุด | [[HW-Discrete-Math-04]] |

---

## Part 2: Module-by-Module Deep Dive

### 2.1 ทบทวนจาก Part 1 (Review)

* **Directed terminology:** (u, v) → u *adjacent to* v, v *adjacent from* u; u = initial, v = terminal; deg⁻(v) = in-degree, deg⁺(v) = out-degree; loop นับ 1 ทั้งสองฝั่ง
* **Theorem 3:** Σdeg⁻(v) = Σdeg⁺(v) = |E|
* **Special simple graphs:** K<sub>n</sub>, C<sub>n</sub>, W<sub>n</sub>, Q<sub>n</sub>, Bipartite (Definition 6), Complete bipartite K<sub>m,n</sub> (Definition 7)

รายละเอียด นิยาม ตาราง และตัวอย่างทั้งหมดอยู่ใน [[Week11 - Graphs, Graph Terminology and Representing Graphs]]

---

หัวข้อ 2.2 ถึง 2.10 เดิม (Bipartite และ Matching, Hall's Theorem, Paths, Paths ในกราฟทางสังคม, Connectedness, Cut Vertices และ Cut Edges, Vertex Cut และ κ(G), Edge Cut และ λ(G), การประยุกต์ใช้) รวมถึง Part 3 (Quick Reference), Concept Map และ Common Pitfalls ถูกย้ายไปอยู่ในโน้ตย่อยตามตารางข้างบน ซึ่งแต่ละโน้ตมี Part 3 และ Pitfalls ของตัวเอง

---

## เอกสารเชื่อมโยง (Wiki-Style Backlinks)
* **วิชาและหัวข้อที่เกี่ยวข้อง:**
  * [[Week12 - Bipartite Graphs and Matchings]] (Matching, Hall's Theorem)
  * [[Week12 - Paths, Circuits and Connectedness]] (Path, circuit, connectedness)
  * [[Week12 - Cut Vertices, Edge Cuts and Connectivity]] (κ(G), λ(G))
  * [[Week12 - Road Network Connectivity Barcelona vs Bangkok]] (การประยุกต์ใช้)
  * [[Week11 - Graphs, Graph Terminology and Representing Graphs]] (พื้นฐาน: นิยามกราฟ, degree, N(v), Bipartite, K<sub>m,n</sub>)
  * [[Week10 - Properties of Relations]] (Connectivity relation / transitive closure สัมพันธ์กับการมี path ระหว่างจุดยอด)
  * [[Week10 - n-ary Relations and Representing Relations]] (การแทน relation ด้วย digraph เป็นพื้นฐานของ path ในกราฟมีทิศ)

* **แหล่งข้อมูล:**
  * Source: `Resources/Books/Discrete Mathematics/DM_Week12.pdf` (51 slides, Dr. Sirasit Lochanachit)
