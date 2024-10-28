"use client";

import appwriteService from "@/appwrite/functions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Navbar from "@/components/Navbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const { setAuthStatus, setUserData } = useAuth()

    useEffect(() => {
        (async () => {
            const user = await appwriteService.getCurrentUser();

            if (user) {
                setAuthStatus(true);
                setUserData(user)
            } else {
                router.push("/auth/login");
            }
        })();
    }, [])

    return (
        <div className="w-full min-h-dvh">
            <Navbar />
            {children}
        </div>
    );
}