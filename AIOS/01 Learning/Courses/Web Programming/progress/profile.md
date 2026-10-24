# Learner Profile

Learning mode: active
Onboarding: complete

Scope: `AIOS/01 Learning/Courses/Web Programming/` only. Do not apply learning mode to other vault areas.
Task logs: `Lab/mock exam/progress/1/`, `Lab/mock exam/progress/2/`

## Project
Situation: Homework / exam (task track)
Building: Web Programming course labs and mock exams (Node.js, Express, EJS, REST API, SQLite, session/cookie)
Codebase familiarity: Not applicable (starter code given per task)
Learning scope: Web Programming only

## Experience
Overall programming: Not specified
Stack familiarity: Back end (Node.js / Express / EJS / SQLite): Beginner. Self-reported 2026-10-24: "ความรู้ back end เป็น 0". Front end (HTML / CSS / JS, labs 2-6): Not specified

## Goals
Primary: Not stated explicitly. Inferred from the mock exam work 2026-10-24: write Express + EJS + REST/SQLite code by hand for the exam.
Capability goal: Not specified

## Preferences
Code mode: learner-types
Checkpoint frequency: Normal
Question style: Open-ended
Language: Thai, English technical terms kept
Pace: step by step ("จับมือทำทีละขั้น"); learner reports results back

## Strong Concepts
No demonstrated understanding recorded yet as strong. Mock Exam 1 was completed with corrections (learner-reported); see the task log for what the learner typed and fixed.

## Developing Concepts
- Route design: a duplicated `app.get('/')` shadows the later one; GET and POST routes for the same path are both needed (Mock Exam 1 step 4, Mock Exam 2 step 3)
- One response per request (`res.render` / `res.redirect` once; `return` when responding early) (Mock Exam 1 steps 6-7)
- EJS tag syntax (`<% %>`, `<%= %>`, `<%- %>`; the closing tag is `%>`) (Mock Exam 1 step 2)
- Reading the spec literally before changing code (`ORDER BY name` was changed to `id`; Mock Exam 2 step 6)

## Revisit
- Mock Exam 2: restore `ORDER BY name` in route `/` (still `ORDER BY id` when last checked, 2026-10-24)
- Mock Exams 3-6 not started
- Mistake Log entry for "one response per request": proposed, not yet confirmed by the learner
