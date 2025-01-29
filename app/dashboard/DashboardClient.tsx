'use client'
import { useState } from 'react';
import Navigation from "@/app/components/navigation";
import SideBar from "@/app/components/sideBar";
import PdfView from "@/app/components/pdfView";

export default function DashboardClient({ user }: { user: { email: string, id: string } }) {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    return (
        <div>
            <Navigation user={user.email ?? 'Guest'} />
            <main
                className="w-full max-w-screen-2xl  mx-auto pt-10 grid grid-cols-1 gap-4 items-center justify-center mt-0 lg:mt-[10em] xl:mt-0 transition-[grid-template-columns] lg:grid-cols-[160px_1fr] lg:gap-8 px-3"
            >
                <div className="h-full xl:h-[84vh] rounded-lg bg-gray-200 dark:bg-gray-900 overflow-x-scroll lg:overflow-y-scroll mx-[.5em] lg:mx-0">
                    <SideBar onSelectPdf={setSelectedPdf} />
                </div>

                <div className="h-full xl:h-[84vh] flex flex-col justify-center items-center rounded-lg bg-gray-200 dark:bg-gray-900 overflow-y-scroll mx-[.5em] lg:mx-0">
                    <PdfView user={user.id} fileName={selectedPdf} />
                </div>
            </main>
        </div>
    );
}