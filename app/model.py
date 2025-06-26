from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# compare both job required skills and skills of resume and return different insights
def compute_match_score(resume_skills: list, job_skills: list):

    # convert resume_skills and job_skills to a set
    resume_skills_set = set([s.lower() for s in resume_skills])
    job_skills_set = set([s.lower() for s in job_skills])

    # get matching skills
    matching_skills = resume_skills_set.intersection(job_skills_set)

    # get unmatched skills
    missing_skills = job_skills_set - resume_skills_set

    # extra skills than required
    extra_skills = resume_skills_set - job_skills_set


    # calculate score
    if not job_skills_set:
        score = 0
    else:
        score = (len(matching_skills) / len(job_skills_set)) * 100


    # return results
    return {
        "score_percent": round(score, 2),
        "matching_skills": list(matching_skills),
        "missing_skills": list(missing_skills),
        "extra_resume_skills": list(extra_skills),
    }



    # Encode both texts (convert both resume and job to vectors via model)
# Sentence Transformer Model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Load once

def compute_semantic_similarity(resume_text: str, job_text: str):
    # Encode both texts (convert both resume and job to vectors via model)
    resume_vec = model.encode([resume_text])[0]
    job_vec = model.encode([job_text])[0]

    # Compute cosine similarity
    similarity = cosine_similarity([resume_vec], [job_vec])[0][0]

    return round(float(similarity * 100), 2)
