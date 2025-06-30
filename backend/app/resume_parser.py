import pymupdf
# import fitz # old way, PyMuPDF

def extract_text_from_pdf(file_path:str) -> str:

    # open the temp pdf file
    doc = pymupdf.open(file_path)
    print(f"Number of pages: {doc.page_count}")
    text = "" # store content of pdf

    # iterate over pages and extract text form it
    for page in doc:
        text += page.get_text()

    return text

