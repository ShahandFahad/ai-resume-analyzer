'use client'
import { useState } from "react";


export const UploadForm = ({ onSubmit }: { onSubmit: Function }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [jobText, setJobText] = useState('');


    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();

        const formDataList = files.map((file) => ({ file, jobText }));

        onSubmit(formDataList);
    };


    return (
        <form onSubmit={handleUpload} className="space-y-4">

            <input
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className="block rounded p-4 bg-gray-200 cursor-pointer"
            />

            <textarea
                placeholder="Paste job description here..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                rows={6}
                className="w-full p-2 border rounded outline-none"
            />

            <button
                type="submit"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Analyze 
            </button>

        </form>
    );
};
