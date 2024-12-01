"use client"

import { useEffect } from "react";
import { handleSignout } from "../_lib/actions";

interface IProps {
    children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    const signOut = () => {
        handleSignout()
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Navbar */}
            <nav className="bg-purple-900 p-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex space-x-6">
                        {/* Logo or Profile link */}
                        <a href="#" className="text-xl font-semibold text-white hover:text-purple-300">
                            MyProfile
                        </a>
                        {/* Navbar items */}
                        <ul className="flex space-x-6">
                            <li>
                                <a href="/profile" className="hover:text-purple-300">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="#settings" className="hover:text-purple-300">
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a href="#photos" className="hover:text-purple-300">
                                    Photos
                                </a>
                            </li>
                            <li>
                                <a href="#posts" className="hover:text-purple-300">
                                    Posts
                                </a>
                            </li>
                            <li>
                                <a href="#other" className="hover:text-purple-300">
                                    Other
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Profile icon (optional) */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={signOut}
                            className="w-full py-2 text-pink-600 font-semibold rounded-lg hover:text-pink-200 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">{children}</main>
        </div>
    );
}
