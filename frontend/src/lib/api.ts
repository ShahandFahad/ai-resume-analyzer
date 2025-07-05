const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function analyzeResume(resume: File, jobText: string) {

    // append values to from
    const form = new FormData();

    // 'resume_pdf, job_txt' are the required body fileds
    form.append('resume_pdf', resume);
    form.append('job_txt', jobText);

    // send request to server
    const res = await fetch(`${BASE_URL}/full-analysis/`, {
        method: "POST",
        body: form,
    });

    // throw error
    if (!res.ok) throw new Error('/full-analysis: API Failed');

    // return data
    return await res.json();
}

