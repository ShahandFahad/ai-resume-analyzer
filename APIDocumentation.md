# 📘 SkillMatchAI API Documentation

This document outlines all API endpoints available in the **SkillMatchAI** backend. These endpoints support PDF resume parsing, job text processing, skill matching, semantic analysis, and a unified endpoint for full analysis.

---

## 🔗 Base URL
```
http://localhost:8000
```

---

## 📝 Endpoints

### 1. 📄 Upload Resume
```
POST /upload-resume/
```
Upload a `.pdf` resume and extract raw text content.

**Example cURL:**
```bash
curl -X POST -F "file=@TempResume.pdf" http://127.0.0.1:8000/upload-resume/
```

---

### 2. 📄 Upload Job Description
```
POST /upload-job/
```
Upload a `.txt` job description file.

**Example cURL:**
```bash
curl -X POST -F "file=@sample_job.txt" http://127.0.0.1:8000/upload-job/
```

---

### 3. 🧠 Match Resume vs Job Skills
```
POST /match-resume-job/
```
Compare resume skills and job skills using keyword-based matching.

**Request Body (JSON):**
```json
{
  "resume_skills": ["Python", "React", "MongoDB", "Customer Service"],
  "job_skills": ["Python", "React", "Node.js", "MongoDB", "FastAPI", "NLP", "Docker"]
}
```

**Example cURL:**
```bash
curl --header "Content-Type: application/json" \
     --request POST \
     --data @body.json \
     http://localhost:8000/match-resume-job/
```

---

### 4. 🔍 Semantic Matching (Resume vs Job Text)
```
POST /semantic-match/
```
Analyze semantic similarity between resume content and job description.

**Request Body (JSON):**
```json
{
  "resume_text": "I have experience in React, Python, FastAPI, and deploying ML models. I worked on a customer support AI chatbot.",
  "job_text": "Looking for a MERN Stack developer who can integrate NLP-based AI models using FastAPI and React. Should be comfortable with Python and MongoDB."
}
```

**Example cURL:**
```bash
curl --header "Content-Type: application/json" \
     --request POST \
     --data @body.json \
     http://localhost:8000/semantic-match/
```

---

### 5. 🧾 Full Resume–Job Analysis
```
POST /full-analysis/
```
Submit a resume `.pdf` and job description `text` together for full semantic and keyword-based analysis.

**Multipart Form Fields:**
- `resume_pdf`: file (.pdf)
- `job_txt`: string

**Example cURL:**
```bash
curl -X POST http://localhost:8000/full-analysis/ \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "resume_pdf=@FahadResume.pdf" \
     -F "job_txt=We are hiring a full-stack AI developer with expertise in Fast. Required Skills: Java, Python C++, Node.js, Flask, FastAPI, Aws, DigitalOcean, CI/CD, Version Control, Git, React.js, Mern Stack, Code Review, Deployment"
```

---

## ✅ Tip
All APIs return JSON responses with extracted/resolved fields such as `resume_text_preview`, `required_skills`, `matching_skills`, `keyword_match_score`, and `semantic_similarity_score`.

Use `/docs` or `/redoc` for interactive API testing via Swagger UI.

---

## 🔐 Security
This API currently supports unauthenticated access. For production, consider adding JWT Auth or API Key headers.

---

## 📦 Status Codes
| Code | Meaning              |
|------|----------------------|
| 200  | OK                   |
| 400  | Bad Request          |
| 422  | Unprocessable Entity |
| 500  | Internal Server Error|

---

© 2025 SkillMatchAI · Built with FastAPI & HuggingFace
