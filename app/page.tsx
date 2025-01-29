'use client'
import Navigation from "@/app/components/navigation";
import SideBar from "@/app/components/sideBar";
import PdfView from "@/app/components/pdfView";
import {useState} from "react";
export default function Home() {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    return (

        <div>
            <Navigation user={''}/>
            <main
                className="w-full max-w-screen-md  mx-auto pt-10 grid grid-cols-1 gap-4 items-center justify-center mt-0 lg:mt-[10em] xl:mt-0 transition-[grid-template-columns] lg:grid-cols-[160px_1fr] lg:gap-8 "
            >
                <div className="h-full xl:h-[84vh] rounded-lg bg-gray-200 dark:bg-gray-900 overflow-x-scroll lg:overflow-y-scroll mx-[.5em] lg:mx-0">
                    <SideBar onSelectPdf={setSelectedPdf} />
                </div>

                <div className="h-full xl:h-[84vh] rounded-lg bg-gray-200 dark:bg-gray-900 overflow-y-scroll mx-[.5em] lg:mx-0">
                    <PdfView user={''} fileName={selectedPdf} />
                </div>
            </main>
        </div>
    );
}
