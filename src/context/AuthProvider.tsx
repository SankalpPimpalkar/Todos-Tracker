/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { AuthContext } from "./authContext";
import appwriteService from "@/appwrite/functions";
import { useRouter } from "next/navigation";

export default function AuthProvider({
    children,
}: { children: React.ReactNode }) {

    const [userData, setUserData] = useState(null);
    const [authStatus, setAuthStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const reFetchUser = async () => {
        try {
            setIsLoading(true);
            const user: any = await appwriteService.getCurrentUser();

            if (user) {
                const list = await appwriteService.getList(user.$id);
                user.list = list.documents;
                console.log(user)

                setAuthStatus(true);
                setUserData(user)
            }

        } catch (error) {
            console.log(error)
            router.push("/auth/login");

        } finally {
            setIsLoading(false);
        }
    }

    const values = {
        userData,
        setUserData,
        authStatus,
        setAuthStatus,
        isLoading,
        setIsLoading,
        reFetchUser
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}