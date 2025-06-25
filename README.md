
## Enpoints
```bash


 1. POST /upload-resume/ | Upload .pdf file contains reusme
 curl -X POST -F "file=@TempResume.pdf" http://127.0.0.1:8000/upload-resume/


 2. POST /upload-job/ | Upload .txt file contains job description
 curl -X POST -F "file=@sample_job.txt" http://127.0.0.1:8000/upload-job/


 3. POST /match-resume-job/ | Upload in json format `resume_skills` and `job_skilss` to get insights
 curl --header "Content-Type: application/json"\
     --request POST \
     --data @body.json \
     http://localhost:8000/match-resume-job/ > temp.json

  body.json
     {
        "resume_skills": ["Python", "React", "MongoDB", "Customer Service"],
        "job_skills": ["Python", "React", "Node.js", "MongoDB", "FastAPI", "NLP", "Docker"]
      }

 ```


