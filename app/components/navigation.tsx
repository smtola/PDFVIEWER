'use client'
import { logout } from "@/app/actions/auth";

interface User{
    user:string;
}
export default function Navigation({user}:User) {
    return (
        <div
            className="flex justify-center items-center bg-gray-200 dark:bg-gray-900 w-full py-4 px-3 space-x-4"
        >
            <h1 className="text-center text-[24px] text-center"
            >
                FA FILE REVIEW
            </h1>
            {user && user != null ?
                <form className="bg-gray-200 px-2 py-1 rounded-xl">
                    <button formAction={logout} className="flex items-center space-x-2 text-red-500">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="1">
                          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                          <path d="M9 12h12l-3 -3"></path>
                          <path d="M18 15l3 -3"></path>
                        </svg>
                    </span>
                        <span>
                        Logout
                   </span>
                    </button>
                </form> :
                ''
            }
        </div>
    );
}
