# lightweight python image
# FROM python:3.10-slim-buster
FROM python:3

# working dir
WORKDIR /app

# copy requirements and install
COPY requirements.txt .

# up-to-date pip and setuptools
RUN pip install --no-cache-dir --upgrade pip setuptools

# install the packages in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set the Hugging Face cache directory to a writable location inside the container.
ENV HF_HOME /app/.cache/huggingface

# Explicitly create the .cache dir and give permission
RUN mkdir -p ${HF_HOME} && chmod -R 777 /app/.cache

# Download spaCy model 
RUN python -m spacy download en_core_web_sm

# copy app
COPY app /app/app

# expose FastAPI port
EXPOSE 7860

# run FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]

