"use client";

import appwriteService from "@/appwrite/functions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter()

    useEffect(() => {
        (async () => {
            const user = await appwriteService.getCurrentUser();

            if (user) {
                router.push("/")
            }
        })()
    }, [])

    return (
        <div className="w-full min-h-dvh">
            {children}
        </div>
    );
}