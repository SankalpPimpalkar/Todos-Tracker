/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import appwriteService from "@/appwrite/functions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import TodoHistory from "@/components/TodoHistory";
import DeleteListModal from "@/components/DeleteListModal";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const { setAuthStatus, setUserData, setIsLoading } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedList, setSelectedList] = useState('')

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        (async () => {
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
        })();
    }, [])

    return (
        <div className="w-full min-h-dvh divide-x divide-light/10 flex flex-col md:flex-row">
            <Navbar
                setIsModalOpen={setIsModalOpen}
                setSelectedList={setSelectedList}
            />
            <NavbarMobile
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                setIsModalOpen={setIsModalOpen}
                setSelectedList={setSelectedList}
            />
            {children}
            <TodoHistory />
            
            <DeleteListModal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setSelectedList={setSelectedList}
                selectedList={selectedList}
            />
        </div>
    );
}