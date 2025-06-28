# NLP Cleaning + Entity Extraction (spaCy)
import spacy

# load spacy model
nlp = spacy.load("en_core_web_sm")


# extract entities
def extract_entities(text):
    doc = nlp(text)
    entities = {
            "PERSON": [],
            "ORG": [],
            "GPE": [],
            "DATE": [],
            "SKILLS": [], # custom logic for this
            "EDUCATION": [], # custom logic for this
            }

    # iterate over doc entities and append the specified entities from it to 'entities' dictionary
    for ent in doc.ents:
        if ent.label_ in entities:
            entities[ent.label_].append(ent.text)


    # additional heuristics
    entities["SKILLS"] = extract_skills(text)
    entities["EDUCATION"] = extract_education(text)

    
    return entities





# Custom logic
# Basic keyword match via pre-defined skills (NOTE: for vector embeddings - it is used in model.py file)
def extract_skills(text):
    predefined_skills = [
            "Python", "Machine Learning", "React", "Node.js",
            "MongoDB", "JavaScript", "FastAPI", "NLP", "Git", "Docker",
            "SQL", "AWS", "Azure", "GCP", "Kubernetes", "Data Analysis",
            "Data Science", "Deep Learning", "TensorFlow", "PyTorch",
            "Agile", "Scrum", "REST API", "Microservices", "Vue.js", "Angular",
            "Java", "C++", "C#", "Go", "Ruby", "PHP", "Scala", "Kotlin",
            "HTML", "CSS", "TypeScript", "Django", "Flask", "Spring Boot",
            "Kafka", "RabbitMQ", "Redis", "Elasticsearch", "Jenkins", "Ansible",
            "Terraform", "Linux", "Windows Server", "Networking", "Security",
            "Cloud Computing", "Big Data", "Spark", "Hadoop", "Tableau", "Power BI",
            "Excel", "Statistics", "Mathematics", "Communication", "Teamwork"
    ]
    # store matching skilss
    found = []
    
    # iterate over pre-defined skills and if matched append to the found list
    for skill in predefined_skills:
        if skill.lower() in text.lower():
            found.append(skill)


    # return matched skills
    return found


def extract_education(text):
    edu_keywords = ["BSc", "BS", "Bachelor", "MSc", "MS", "Master", "PhD", "MIT", "Harvard", "University"]

    # store matching education
    found = []

    # iterate over edu keywords and if matched append to the found list
    for keyword in edu_keywords:
        if keyword.lower() in text.lower():
            found.append(keyword)


    # return matched list, remove the repititve keywords
    return list(set(found))





