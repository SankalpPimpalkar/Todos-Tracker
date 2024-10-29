/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import appwriteService from "@/appwrite/functions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import TodoHistory from "@/components/TodoHistory";

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
            try {

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

            }
        })();
    }, [])

    return (
        <div className="w-full min-h-dvh divide-x divide-light/10 flex flex-col md:flex-row">
            <Navbar />
            <NavbarMobile
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
            />
            {children}
            <TodoHistory />
        </div>
    );
}