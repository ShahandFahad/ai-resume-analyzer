# lightweight python image
FROM python:3.10-slim


# working dir
WORKDIR /app

# copy requirements and install
COPY requirements.txt .

# install the packages in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# copy app
COPY . .

# expose FastAPI port
EXPOSE 8000

# run FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]



