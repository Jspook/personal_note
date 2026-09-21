# เมทริกซ์ทักษะ (Skill Matrix) สำหรับ Data Engineer และ AI Engineer

## Macro Overview (ภาพรวมเชิงมหภาค)
Skill matrix นี้นำเสนอสมรรถนะหลัก ความลึกเชิงเทคนิค และโดเมนสถาปัตยกรรมที่จำเป็นสำหรับ Data Engineer และ AI Engineer ยุคใหม่ โดยใช้เป็นเกณฑ์มาตรฐานสำหรับการประเมินตนเอง การประเมินทางเทคนิค และการพัฒนาวิชาชีพอย่างต่อเนื่อง

---

## Skill Matrix Breakdown (รายละเอียดเมทริกซ์ทักษะ)

### 1. Core Data Engineering (วิศวกรรมข้อมูลพื้นฐาน)
* **Storage & Data Modeling (การจัดเก็บและการออกแบบโมเดลข้อมูล):**
  * Relational Databases (PostgreSQL, MySQL, Schema Design, [[Database Normalization Summary|Normalization 1NF–3NF]])
  * NoSQL & Document Stores (MongoDB, Cassandra, DynamoDB)
  * Data Warehousing & Lakehouses (Snowflake, BigQuery, Delta Lake, Apache Iceberg)
* **Data Pipelines & Processing (ไปป์ไลน์ข้อมูลและการประมวลผล):**
  * Batch Processing (Apache Spark, Apache Hadoop, dbt - data build tool)
  * Real-Time & Streaming (Apache Kafka, Flink, Spark Streaming)
  * Workflow Orchestration (Apache Airflow, Prefect, Dagster)

### 2. AI & LLM Engineering (วิศวกรรมปัญญาประดิษฐ์และโมเดลภาษา)
* **LLM Orchestration & Frameworks (การจัดการและการประสานการทำงานของ LLM):**
  * Application Frameworks (LangChain, LlamaIndex, Semantic Kernel)
  * Agentic Workflows & Multi-Agent Coordination
* **Retrieval-Augmented Generation (RAG) & Vector Search (การค้นหาเวกเตอร์และ RAG):**
  * Vector Databases (Pinecone, Milvus, Qdrant, Chroma, pgvector)
  * Advanced RAG Pipelines (Hybrid Search, Re-ranking, GraphRAG, Chunking Strategies)
* **Model Serving & Inference (การให้บริการโมเดลและการอนุมาน):**
  * Inference Engines (vLLM, Ollama, TGI - Text Generation Inference)
  * API Integration & Function Calling / Tool Use
* **Fine-Tuning & Evaluation (การปรับแต่งโมเดลและการประเมินผล):**
  * Supervised Fine-Tuning (SFT), Parameter-Efficient Fine-Tuning (PEFT/LoRA)
  * Evaluation Frameworks (Ragas, TruLens, DeepEval)

### 3. MLOps & Infrastructure (เอ็มแอลออปส์และโครงสร้างพื้นฐาน)
* **Containerization & Orchestration (การทำคอนเทนเนอร์และการจัดการระบบ):**
  * Docker, Docker Compose, Kubernetes (K8s)
* **CI/CD & Version Control (การควบคุมเวอร์ชันและระบบ CI/CD):**
  * Git, GitHub Actions, Automated Testing & Linting Pipelines
* **Cloud Platforms & Infrastructure as Code (IaC) (แพลตฟอร์มคลาวด์และโค้ดโครงสร้างพื้นฐาน):**
  * Cloud Providers (AWS / GCP / Azure)
  * Infrastructure as Code (Terraform, Ansible)
* **Monitoring, Logging & Observability (การเฝ้าระวัง บันทึกเหตุการณ์ และความสามารถในการสังเกตการณ์):**
  * Model & Pipeline Monitoring (Arize, Evidently, Prometheus, Grafana)

### 4. Software Engineering & System Design (วิศวกรรมซอฟต์แวร์และการออกแบบระบบ)
* **Programming Languages (ภาษาโปรแกรมมิ่ง):**
  * Python (Advanced data structures, async programming, typing), SQL, Bash scripting
* **System Architecture (สถาปัตยกรรมระบบ):**
  * Microservices, Event-Driven Architecture, API Design (REST, gRPC, GraphQL)
* **Data Quality & Governance (คุณภาพข้อมูลและการธรรมาภิบาลข้อมูล):**
  * Data Lineage, Data Catalog, Data Validation (Great Expectations, Soda)

---

## เอกสารเชื่อมโยง (Backlinks)
* **สรุปเนื้อหาหลัก:** [[Database Normalization Summary]] (การออกแบบโมเดลและโครงสร้างฐานข้อมูลระดับ 1NF, 2NF, 3NF)
* **พื้นฐานคณิตศาสตร์และวิศวกรรมข้อมูล:** [[Discrete Mathematics - Week 9 Primes, GCD & Cryptography]] (Cryptography และ Data Integrity)
