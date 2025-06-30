## Under work...

Resume Analyzer using NLP -> `Keyword Match` Analysis via NLP & -> `Sematic Anaylysis` via Sentence-Tranformers from `Hugging Face`.

It is still under development....


## Enpoints
```bash


 1. POST /upload-resume/ | Upload .pdf file contains reusme
 curl -X POST -F "file=@TempResume.pdf" http://127.0.0.1:8000/upload-resume/


 2. POST /upload-job/ | Upload .txt file contains job description
 curl -X POST -F "file=@sample_job.txt" http://127.0.0.1:8000/upload-job/


 3. POST /match-resume-job/ | Upload (request body) in json format `resume_skills` and `job_skilss` to get insights
 curl --header "Content-Type: application/json"\
     --request POST \
     --data @body.json \
     http://localhost:8000/match-resume-job/ > temp.json

  body.json
     {
        "resume_skills": ["Python", "React", "MongoDB", "Customer Service"],
        "job_skills": ["Python", "React", "Node.js", "MongoDB", "FastAPI", "NLP", "Docker"]
      }


 4. POST /semantic-match/ | Upload (request body) in json format `resume_text` and `job_text` to get semantic results
 curl --header "Content-Type: application/json"\
         --request POST \
         --data @body.json \
         http://localhost:8000/semantic-match/ > temp.json
 
 body.json

    {
        "resume_text": "I have experience in React, Python, FastAPI, and deploying ML models. I worked on a customer support AI chatbot.",
        "job_text": "Looking for a MERN Stack developer who can integrate NLP-based AI models using FastAPI and React. Should be comfortable with Python and MongoDB."
    }


 5. POST /full-analysis/ | Upload (resume.pdf) and `job_text` to get complete analysis via singel endpoint
 curl -X POST http://localhost:8000/full-analysis/ \
         -H "accept: application/json" \
         -H "Content-Type: multipart/form-data" \
         -F "resume_pdf=@FahadResume.pdf" \
         -F "job_txt=We are hiring a full-stack AI developer with expertise in Fast. Required Skills: Java, Python C++, Node.js, Flask, FastAPI, Aws, DigitalOcean, CI/CD, Version Control, Git, React.js, Mern Stack, Code Review, Deployment"




 ```


