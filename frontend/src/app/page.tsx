'use client'
import { HomePageTitle } from "@/components/HomePageTitle";
import { HowToUse } from "@/components/HowToUse";
import Loader from "@/components/Loader";
import { ResultTable } from "@/components/ResultTable";
import { UploadForm } from "@/components/UploadForm";
import { analyzeResume } from "@/lib/api";
import { useState } from "react";

export default function Home() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (formDataList: { file: File, jobText: string }[]) => {
        const newResults: any[] = [];
        setLoading(true);

        // iterate over pdf files, and send request to server for analysis
        for (const item of formDataList) {
            const result = await analyzeResume(item.file, item.jobText);

            // store the reults
            newResults.push({
                filename: item.file.name,
                file: item.file,
                ...result,
            });
        }

        // set state
        setResults(newResults);
        setLoading(false);
    };


    return (
        <div>
            <HomePageTitle />
            <main className="p-4">

                <HowToUse />

                <UploadForm onSubmit={handleUpload} />

                {loading && <Loader />}

                <ResultTable results={results} />

            </main>
        </div>
    );
}
