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
        <form id="upload" onSubmit={handleUpload} className="w-auto mx-auto bg-white p-8 rounded-lg space-y-6">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">
                Analyze Resumes
            </h2>
            {/* File Upload */}
            <div>
                <label htmlFor="resume-upload" className="block text-gray-700 font-semibold mb-2">
                    Upload Resume Files <span className="text-sm text-gray-500">(PDF only, multiple allowed)</span>
                </label>
                <input
                    id="resume-upload"
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 cursor-pointer transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Job Description Textarea */}
            <div>
                <label htmlFor="job-description" className="block text-gray-700 font-semibold mb-2">
                    Job Description
                </label>
                <textarea
                    id="job-description"
                    placeholder="Paste job description here..."
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    rows={6}
                    className="w-full resize-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-400 transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
                Analyze
            </button>
        </form>
    );
};
