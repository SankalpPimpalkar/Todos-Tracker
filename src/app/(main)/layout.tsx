"use client";

import appwriteService from "@/appwrite/functions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const { setAuthStatus, setUserData } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

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
        <div className="w-full min-h-dvh flex flex-col md:flex-row">
            <Navbar />
            <NavbarMobile
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
            />
            {children}
        </div>
    );
}