# SkillMatchAI

**SkillMatchAI** is an intelligent resume-job matching system built with **FastAPI**, **Hugging Face Transformers**, and **Next.js**. It supports:

- 📄 Uploading one or more PDF resumes
- 🧠 Semantic + keyword-based job matching
- 📊 Visual match reports and score tables
- 🚀 Frontend with React + Tailwind (Next.js)

---

## 📁 Monorepo Structure

```
resume-analyzer/            ← root folder
├── backend/                ← FastAPI app
│   ├── app/                ← all backend logic
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               ← Next.js (App Router)
│   ├── app/
│   ├── components/
│   ├── tailwind.config.js
│   └── public/
├── docker-compose.yml      ← Run both services together
└── README.md
```

---

## 🛠️ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run the API
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Visit the API docs: http://localhost:8000/docs

---

## 💻 Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: http://localhost:3000

Make sure the backend is running on `localhost:8000` or update `NEXT_PUBLIC_BACKEND_URL` in `.env`

---

## ⚡ Docker + Compose Setup

```bash
# Run both frontend and backend
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000/docs

---

## ✨ Features

- Resume parsing using PyMuPDF
- Named Entity Recognition using spaCy
- Job parsing via keyword extraction (NLP)
- Semantic matching using HuggingFace's MiniLM
- Full analysis with both methods
- React frontend with resume upload and result table

---

## 🧠 Tech Stack

- **Backend**: Python, FastAPI, Hugging Face Transformers, spaCy, PyMuPDF
- **Frontend**: React, Next.js (App Router), Tailwind CSS
- **Infra**: Docker, Docker Compose

---

## 🧪 How to Use

1. Open http://localhost:3000
2. Upload one or more PDF resumes
3. Paste job description text
4. Click "Analyze Resumes"
5. View keyword and semantic scores in table
6. Click "Detail" for full resume vs job analysis
7. Click "Download" to save resume locally

---
