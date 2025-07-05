import Link from "next/link";

export const HomePageTitle = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 px-6 py-16">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-md text-center">
                Resume Match Analyzer
            </h1>
            <p className="text-lg text-blue-700 max-w-xl text-center">
                Leverage AI-powered insights to optimize your resume and perfectly align with job descriptions.
                Analyze, compare, and enhance your job applications with ease.
            </p>

            <div className="flex gap-6 text-blue-600 font-medium text-lg mt-4">
                <Link href="#use" className="hover:text-blue-800 transition-colors border p-2 rounded">
                    How to Use?
                </Link>
                <Link href="#upload" className="hover:text-blue-800 transition-colors border p-2 rounded">
                    Analyze Resumes
                </Link>
            </div>
        </div>
    );
}
