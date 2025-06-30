from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.param_functions import Form
from app.job_parser import parse_job_description
from app.nlp_utils import extract_entities
from app.resume_parser import extract_text_from_pdf
import tempfile
from pydantic import BaseModel
from app.model import compute_match_score, compute_semantic_similarity


app = FastAPI()


@app.get("/")
async def welcome():
    return {"message":"Welcome to resume anaylyzer server!"}


@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):

    # validate file type
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")


    # save the uploaded file to a temporary file(.pdf)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
        # read the content of the uploaded file
        contents = await file.read()

        # write the contents to temp file
        temp.write(contents)

        # get temp file path
        temp_path = temp.name


    # pdf parsing
    try:
        # Now parse the text from saved PDF, passed the temp file path to the pdf text extractor function
        text = extract_text_from_pdf(temp_path)

        # Pass the parsed text from pdf and extract entitites
        entities = extract_entities(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract text: {e}")


    # return first 500 chars preview
    return {
        "resume_text_preview":text[:500],
        "entities": entities
    } 



@app.post("/upload-job/")
async def upload_job(file: UploadFile = File(...)):
    try:
        # read content of uploaded job file
        contents = await file.read()
        text = contents.decode("utf-8")

        # get job info
        job_info = parse_job_description(text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract text: {e}")

    return job_info



class MatchRequest(BaseModel):
    resume_skills: list[str]
    job_skills: list[str]

@app.post("/match-resume-job/")
def match_resume_job(data: MatchRequest):
    return compute_match_score(data.resume_skills, data.job_skills)



class SemanticMatchRequest(BaseModel):
    resume_text: str
    job_text: str

@app.post("/semantic-match/")
def semantic_match(data: SemanticMatchRequest):
    score = compute_semantic_similarity(data.resume_text, data.job_text)

    return {
        "semantic_similarity_score": score,
        "interpretation": interpret_score(score)
    }

def interpret_score(score):
    if score > 85:
        return "Strong Match"
    elif score > 60:
        return "Moderate Match"
    else:
        return "Weak Match"


# Combining all the above work into this single endpoint
@app.post("/full-analysis/")
async def full_analysis(resume_pdf: UploadFile = File(...), job_txt: str = Form(...)):

    try:
        # validate file type
        if not resume_pdf.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only .pdf file are supported for resume.")

        #if not job_txt.filename.endswith(".txt"):
        #    raise HTTPException(status_code=400, detail="Only .txt file are supported for job.")


        # save and read resume: using temprory package to store resume
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
            # get file contents
            contents = await resume_pdf.read()
            # store content in temp file
            temp.write(contents)
            # get temp file path
            temp_file_path = temp.name


            # extract text from resume
            resume_text = extract_text_from_pdf(temp_file_path)
            # extract entities i.e. Skills, etc from reusme text
            resume_entities = extract_entities(resume_text)
            # get resume skills
            resume_skills = resume_entities.get("SKILLS", [])


            # parse job descriptions & skills
            job_info = parse_job_description(job_txt)
            job_skills = job_info.get("required_skills", [])


            # perform both matches - keyword match & semantic match
            keyword_score = compute_match_score(resume_skills, job_skills)
            semantic_score = compute_semantic_similarity(resume_text, job_info["job_text"])


    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fully analyze: {e}")


    return {
        "matching_skills": keyword_score["matching_skills"],
        "missing_skills": keyword_score["missing_skills"],
        "extra_resume_skills": keyword_score["extra_resume_skills"],
        "keyword_match_score": keyword_score["score_percent"],
        "semantic_similarity_score": semantic_score,
        "interpretation": interpret_score(semantic_score)
    }
