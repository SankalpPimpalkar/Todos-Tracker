"use client";

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

            const user = localStorage.getItem('cookieFallback')
            console.log('cookie', user)

            if (user != '[]' || !user) {
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