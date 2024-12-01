"use client"

import { useEffect, useState } from "react";
import { verifyUser } from "../_lib/actions";
import { IUser } from "../_lib/types";
import { useRouter } from "next/navigation";;

export default function Profile() {
    const [user,setUser] = useState<IUser|null>(null)
    const route = useRouter()
    useEffect(()=>{
        verifyUser()
            .then(res => {
                console.log(res)
                if(res){
                    setUser(res)
                } else {
                    route.push("/login") 
                }
            })
    },[])
    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg w-80 mx-auto shadow-lg">
            <div className="flex justify-center mb-4">
                <img 
                    src="https://mrwallpaper.com/images/hd/cute-girl-profile-vector-art-7yny8leemk0u337t.jpg"
                    alt="Profile Picture" 
                    className="w-24 h-24 rounded-full border-4 border-purple-600" 
                />
            </div>
            <h1 className="text-3xl font-semibold text-center text-purple-400">{user?.name} {user?.surname}</h1>
            <p className="mt-2 text-center text-gray-400">Web Developer</p>
        </div>
    );
}
