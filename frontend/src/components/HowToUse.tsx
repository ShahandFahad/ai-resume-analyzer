export const HowToUse = () => {
    return (
        <div id="use" className="w-auto mx-auto p-8 rounded-lg space-y-8 mb-8 bg-gray-50 border border-gray-200">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">
                How to Use the Resume Analyzer
            </h2>

            <ol className="list-decimal list-inside space-y-6 text-gray-700 text-lg">
                <li className="flex items-start space-x-5">
                    <span className="flex-shrink-0 mt-1 text-blue-600 font-bold text-2xl select-none" aria-hidden="true">
                        📄
                    </span>
                    <p>
                        <strong className="text-blue-800">Select one or more <span className="underline">.pdf resume files</span></strong> from your device to upload.
                    </p>
                </li>

                <li className="flex items-start space-x-5">
                    <span className="flex-shrink-0 mt-1 text-blue-600 font-bold text-2xl select-none" aria-hidden="true">
                        📝
                    </span>
                    <p>
                        <strong className="text-blue-800">Paste the job description</strong> into the provided <em className="italic">textarea field</em> for analysis.
                    </p>
                </li>

                <li className="flex items-start space-x-5">
                    <span className="flex-shrink-0 mt-1 text-blue-600 font-bold text-2xl select-none" aria-hidden="true">
                        ⚙️
                    </span>
                    <p>
                        <strong className="text-blue-800">Click the "Analyze" button</strong> and wait a moment while the system processes your data.
                    </p>
                </li>

                <li className="flex items-start space-x-5">
                    <span className="flex-shrink-0 mt-1 text-blue-600 font-bold text-2xl select-none" aria-hidden="true">
                        📊
                    </span>
                    <p>
                        <strong className="text-blue-800">View the results</strong> displayed in a clear, sortable <em className="italic">table format</em> summarizing the analysis.
                    </p>
                </li>
            </ol>
        </div>
    );
};
