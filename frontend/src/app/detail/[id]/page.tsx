'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResumeDetailPage({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        const rawData = searchParams.get('data');

        if (rawData) {
            const parsed = JSON.parse(rawData);
            setData(parsed);
        }
    }, [searchParams]);

    // incase if data is null
    if (!data) return <div className="p-4">Loading...</div>

    return (
        <div className="p-8 space-y-8 bg-white rounded-lg shadow-md w-auto mx-auto">
            {/* Document Title */}
            <header>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {data.filename}
                </h1>
            </header>

            {/* Keyword Match Section */}
            <section
                aria-labelledby="keyword-match-heading"
                className="border border-cyan-300 bg-cyan-50 rounded-lg p-6 shadow-sm"
            >
                <h2
                    id="keyword-match-heading"
                    className="text-2xl font-semibold text-cyan-900 mb-4"
                >
                    Keyword Match Analysis
                </h2>
                <p className="text-lg font-semibold text-cyan-800">
                    Overall Score: <span className="font-extrabold">{data.keyword_match_score}%</span>
                </p>
                <div className="mt-5 space-y-3 text-cyan-700 text-sm leading-relaxed">
                    <p>
                        <strong>Matching Skills:</strong>{' '}
                        {data.matching_skills.length > 0 ? data.matching_skills.join(', ') : 'None identified'}
                    </p>
                    <p>
                        <strong>Missing Skills:</strong>{' '}
                        {data.missing_skills.length > 0 ? data.missing_skills.join(', ') : 'None'}
                    </p>
                    <p>
                        <strong>Additional Skills in Resume:</strong>{' '}
                        {data.extra_resume_skills.length > 0 ? data.extra_resume_skills.join(', ') : 'None'}
                    </p>
                </div>
            </section>

            {/* Semantic Match Section */}
            <section
                aria-labelledby="semantic-match-heading"
                className="border border-orange-300 bg-orange-50 rounded-lg p-6 shadow-sm"
            >
                <h2
                    id="semantic-match-heading"
                    className="text-2xl font-semibold text-orange-900 mb-4"
                >
                    Semantic Match Evaluation
                </h2>
                <p className="text-lg font-semibold text-orange-800">
                    Similarity Score: <span className="font-extrabold">{data.semantic_similarity_score}%</span>
                </p>
                <p className="mt-4 text-orange-700 text-sm leading-relaxed">
                    <strong>Interpretation:</strong> {data.interpretation || 'No interpretation provided.'}
                </p>
            </section>
        </div>
    );
};
