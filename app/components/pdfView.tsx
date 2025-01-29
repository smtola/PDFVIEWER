'use client'
import { useRef, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Post from "@/app/dashboard/modal/post-file";
import NoPDFSelected from "@/app/components/NoPDFSelected";
// Set the worker source for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface User{
    user:string;
    fileName: string | null;

}
export default function PdfView(
    {
        user,
        fileName
    }:User
) {
    const [numPages, setNumPages] = useState<number | undefined>(undefined);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const viewerRef = useRef<HTMLDivElement>(null);
    const [toggleScreen, setToggleScreen] = useState<boolean>(true);


    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    function toggleFullscreen() {
        if (viewerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                setToggleScreen(false);
            } else {
                viewerRef.current.requestFullscreen();
                setToggleScreen(true);
            }
        }

    }
    return (
        <div
            className="relative flex flex-col justify-center items-center bg-black/0 p-4"
            ref={viewerRef}
        >
            {fileName ? (
                <Document file={fileName} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center items-center md:items-center w-full">
                    <Page
                        pageNumber={pageNumber}
                        className="border border-gray-100 shadow-lg scale-[.7] md:scale-[.95]"
                    />
                </Document>
            ) : (
                <NoPDFSelected/>
            )}

            {/* Controls positioned at the top-right */}
            <div className="bg-black/50 p-4 rounded-lg w-[11vh] xl:w-[14vh] h-fit fixed bottom-[5%] lg:top-[7%] xl:top-[12%] right-[4%] lg:right-[10%] 2xl:right-[14%] z-10 flex flex-col gap-3 px-2">
                <p className="mb-2 text-gray-900 dark:text-gray-100">
                    Page {pageNumber} of {numPages}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(pageNumber - 1)}
                        className="inline-block rounded-full border border-gray-800 bg-gray-800 p-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="24"
                            height="24"
                            strokeWidth="1"
                        >
                            <path d="M15 6l-6 6l6 6"></path>
                        </svg>
                    </button>
                    <button
                        disabled={pageNumber >= (numPages || 1)}
                        onClick={() => setPageNumber(pageNumber + 1)}
                        className="inline-block rounded-full border border-gray-800 bg-gray-800 p-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="24"
                            height="24"
                            strokeWidth="1"
                        >
                            <path d="M9 6l6 6l-6 6"></path>
                        </svg>
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        data-tip={toggleScreen !== false ? 'minimize':"fullscreen"}
                        className="tooltip text-center inline-block rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                        {toggleScreen !== true ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="1">
                                <path d="M16 4l4 0l0 4"></path>
                                <path d="M14 10l6 -6"></path>
                                <path d="M8 20l-4 0l0 -4"></path>
                                <path d="M4 20l6 -6"></path>
                                <path d="M16 20l4 0l0 -4"></path>
                                <path d="M14 14l6 6"></path>
                                <path d="M8 4l-4 0l0 4"></path>
                                <path d="M4 4l6 6"></path>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="1">
                                <path d="M5 9l4 0l0 -4"></path>
                                <path d="M3 3l6 6"></path>
                                <path d="M5 15l4 0l0 4"></path>
                                <path d="M3 21l6 -6"></path>
                                <path d="M19 9l-4 0l0 -4"></path>
                                <path d="M15 9l6 -6"></path>
                                <path d="M19 15l-4 0l0 4"></path>
                                <path d="M15 15l6 6"></path>
                            </svg>
                        }
                    </button>
                    {user && user != null ?
                        <Post />
                        :
                        ''
                    }
                </div>

            </div>
        </div>
    );
}
