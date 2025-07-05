'use client'

import { Download, Eye, View } from "lucide-react";
import { useRouter } from "next/navigation";

export const ResultTable = ({ results }: { results: any[] }) => {
    const router = useRouter();

    const handleDownload = (file: File) => {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');

        link.href = url;
        link.download = file.name;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }


    // if results are null
    if (!results.length) return null;

    return (
        <div className="overflow-x-auto p-6 bg-white rounded-lg shadow-md max-w-full">
            <table className="w-full min-w-max table-auto border-collapse">
                <thead className="bg-indigo-50 sticky top-0 z-10">
                    <tr>
                        {['Resume', 'Keyword Match', 'Semantic Score', 'Actions'].map((header) => (
                            <th
                                key={header}
                                scope="col"
                                className="cursor-pointer border-b border-indigo-200 p-4 text-left text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors select-none"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-indigo-100 hover:bg-indigo-50 transition-colors"
                        >
                            <td className="p-4 text-indigo-900 text-sm font-medium">{item.filename}</td>
                            <td className="p-4 text-indigo-900 text-sm">{item.keyword_match_score}%</td>
                            <td className="p-4 text-indigo-900 text-sm">{item.semantic_similarity_score}%</td>
                            <td className="p-4 flex space-x-3">
                                <button
                                    onClick={() => router.push(`/detail/${idx}?data=${encodeURIComponent(JSON.stringify(item))}`)}
                                    aria-label={`View details for ${item.filename}`}
                                    className="group relative flex items-center justify-center w-10 h-10 rounded-lg text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="button"
                                >
                                    <Eye className="w-5 h-5 group-hover:text-indigo-800" />
                                    <span className="sr-only">View Details</span>
                                </button>

                                <button
                                    onClick={() => handleDownload(item.file)}
                                    aria-label={`Download ${item.filename}`}
                                    className="group relative flex items-center justify-center w-10 h-10 rounded-lg text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="button"
                                >
                                    <Download className="w-5 h-5 group-hover:text-indigo-800" />
                                    <span className="sr-only">Download</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
