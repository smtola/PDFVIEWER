 export default function NoPDFSelected() {
    return (
        <div className="flex flex-col items-center justify-center">
        <div className="text-center">
        <div className="flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="64" height="64" strokeWidth="1">
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
                <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"></path>
                <path d="M17 18h2"></path>
                <path d="M20 15h-3v6"></path>
                <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z"></path>
            </svg>
        </div>
        <h2 className="mt-4 text-lg font-medium text-gray-500">No PDF Selected</h2>
    <p className="mt-1 text-sm text-gray-500">Please select a PDF file to view.</p>
    </div>
    </div>
);
};