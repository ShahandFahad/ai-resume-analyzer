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
        <div className="p-6 overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                            <p className="antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Resume
                            </p>
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                            <p className="antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Keyword Match
                            </p>
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                            <p className="antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Semantic Score
                            </p>
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                            <p className="antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                                Actions
                            </p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        results.map((item, idx) => (
                            <tr key={idx}>

                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                        {item.filename}
                                    </p>
                                </td>


                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                        {item.keyword_match_score}
                                    </p>
                                </td>


                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                        {item.semantic_similarity_score}
                                    </p>
                                </td>

                                <td className="p-4 border-b border-blue-gray-50">

                                    <button

                                        onClick={() => {
                                            router.push(`/detail/${idx}?data=${encodeURIComponent(JSON.stringify(item))}`)
                                        }}
                                        className="cursor-pointer relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                            <Eye />
                                        </span>
                                    </button>

                                    <button

                                        onClick={() => handleDownload(item.file)}
                                        className="cursor-pointer relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                            <Download />
                                        </span>
                                    </button>


                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
