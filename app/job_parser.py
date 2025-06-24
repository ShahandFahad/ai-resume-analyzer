import re
from app.nlp_utils import extract_skills

# clean job description
def clean_job_description(text):
    # Lowercase, remove extra Whitespace, normalize
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9,\.\n ]", " ", text)
    text = re.sub(r"\s+", " ", text)
    
    return text.strip()

# parse job description and return cleaned text and skils from it
def parse_job_description(text):
    cleaned_text = clean_job_description(text)
    skills = extract_skills(cleaned_text)

    return {
        "job_text": cleaned_text[:500],
        "required_skills": skills
    }
