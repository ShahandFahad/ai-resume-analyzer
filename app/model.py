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

