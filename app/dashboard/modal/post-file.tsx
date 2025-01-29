import { useState } from 'react';
import DatePicker from 'react-datepicker'; // Ensure you're importing DatePicker if you're using it
import 'react-datepicker/dist/react-datepicker.css';
import {createClient} from "@/utils/supabase/client"; // Import styles for the date picker

export default function Post() {
    const [startDate, setStartDate] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<boolean>(true);
    const supabase =  createClient();
    // Handle modal open/close
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(!file || !fileName || !startDate){
            console.log('All fields ara required.');
            return;
        }

        try {
            // Upload file to Supabase storage
            const { data, error } = await supabase.storage
                .from("personal")
                .upload(`pdfs/${file.name}`, file);

            if (error) {
                console.error("File upload error:", error.message);
                return;
            }

            // Get file URL
            const { data: publicUrl  } = supabase.storage.from("personal").getPublicUrl(data.path);

            // Insert record into Supabase database
            const { data: insertedData, error: insertError } = await supabase
                .from("pdfFiles")
                .insert([
                    {
                        file_name: fileName,
                        file: publicUrl.publicUrl,
                        fa_date: startDate,
                    },
                ]);

            setLoading(false);
            if (insertError) {
                console.error("Database insert error:", insertError.message);
            } else {
                setIsModalOpen(false);
                alert("File uploaded and data saved successfully!");
                setLoading(false);
            }
        }catch (e:any){
            setMessage(e.message);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button
                onClick={handleOpenModal}
                data-tip="Upload File"
                className="tooltip inline-block rounded-full border border-gray-800 bg-gray-800 p-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
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
                    <path d="M12 5l0 14"></path>
                    <path d="M5 12l14 0"></path>
                </svg>
            </button>

            {isModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box !h-[50vh]">
                        <button
                            onClick={handleCloseModal}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">Upload File!</h3>

                        <form className="py-10 space-y-7" onSubmit={handleSubmit}>
                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    File Name
                                    <input
                                        type="text"
                                        name="file_name"
                                        id="file_name"
                                        className="grow"
                                        placeholder="File name"
                                        value={fileName}
                                        onChange={(e) => setFileName(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <input
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    id="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    FA Date
                                    <input
                                        type="date"
                                        name="fa_date"
                                        id="fa_date"
                                        className="grow"
                                        placeholder="FA Date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            {!message ?
                            <div role="alert" className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Error! Task failed successfully.</span>
                            </div>
                                :''
                            }
                            {!loading ?
                                <button disabled={!loading} type="button" className="btn btn-active btn-accent float-end">
                                    <span className="loading loading-spinner"></span>
                                    Loading...
                                </button>
                                :
                                <button type="submit" className="btn btn-active btn-accent float-end">
                                    Save
                                </button>
                            }
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
}
