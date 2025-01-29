'use client'

import {useEffect, useState} from "react";
import {format} from "date-fns";
import Loading from "@/app/components/Loading";
import {createClient} from "@/utils/supabase/client";

interface SideBarProps {
    onSelectPdf: (fileName: string) => void;
}
export default function SideBar({ onSelectPdf }: SideBarProps) {
    const [dataFiles, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    console.log(dataFiles)
    const supabase =  createClient();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase.from("pdfFiles").select("*");

                if (error) throw error; // Proper error handling

                setProducts(data); // No need to parse JSON, as Supabase already returns a JS object
            } catch (e: any) {
                console.error("Error fetching products:", e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleClickChange = (value:string) => {
        dataFiles.filter((item) => {
            if(item.id === value){
                onSelectPdf(item.file)
            }
        })
    }

    return (
        <ul className="my-[1em] flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-3 ">
            <li className="hidden
            lg:flex flex-col justify-center items-center py-3 border-gray-500 border-b-2">
               <h1 className="text-center text-balance"
               >REVIEW FILE FA</h1>
            </li>
            {loading ? <Loading /> :
                (
                    dataFiles.map((items) =>
                            <li key={items.id} className="
                                hover:bg-black/50  hover:dark:bg-black/50 w-full
                                flex flex-col justify-center items-center border-gray-500 border-b-2 px-2">
                                <button onClick={() => handleClickChange(items.id)} type="button"
                                    className="w-[14vh] md:w-[20vh] lg:w-full flex flex-col justify-center items-start">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" strokeWidth="1">
                                          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                          <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
                                          <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"></path>
                                          <path d="M17 18h2"></path>
                                          <path d="M20 15h-3v6"></path>
                                          <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z"></path>
                                        </svg>
                                    </span>
                                    <h2 className="text-start text-[12px] md:text-[16px]">
                                        {items.file_name}
                                    </h2>
                                    <span
                                        className="text-gray-500 font-light text-[12px]"
                                    >
                                        {format(items.fa_date, 'dd-MMM-yyyy')}
                    </span>
                                </button>
                            </li>
                    )
                )
            }
        </ul>
    );
}
