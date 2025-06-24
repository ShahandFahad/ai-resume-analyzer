
## Enpoints
```bash


 1. POST /upload-resume/ | Upload .pdf file contains reusme
 curl -X POST -F "file=@TempResume.pdf" http://127.0.0.1:8000/upload-resume/


 2. POST /upload-job/ | Upload .txt file contains job description
 curl -X POST -F "file=@sample_job.txt" http://127.0.0.1:8000/upload-job/


 ```


