from fastapi import FastAPI, HTTPException, UploadFile, File
from app.job_parser import parse_job_description
from app.nlp_utils import extract_entities
from app.resume_parser import extract_text_from_pdf
import tempfile

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






