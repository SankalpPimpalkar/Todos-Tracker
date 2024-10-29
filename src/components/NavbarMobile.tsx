/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X, Menu, History, LoaderCircle } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import appwriteService from '@/appwrite/functions';
import useAuth from '@/context/useAuth';

export default function NavbarMobile({ isOpen, toggleSidebar }: any) {
    const router = useRouter();
    const [isloggingOut, setIsloggingOut] = useState(false);
    const { userData } = useAuth();

    const handleRedirect = (id: string) => {
        router.push(`/list/${id}`);
        toggleSidebar();
    }

    const handleDeleteList = async (e: FormEvent) => {
        e.stopPropagation();
        console.log("Propagation Stopped");
    }

    const handleLogout = async () => {
        setIsloggingOut(true);
        const response = await appwriteService.logout();

        if (response) {
            router.push("/auth/login")
        }
        setIsloggingOut(false);
    }

    return (
        <div className='block md:hidden'>
            <div className="w-full fixed top-0 md:hidden flex items-center justify-between px-5 py-4 bg-primary">
                <div className="text-lg text-light font-bold">
                    😎 Next Todo
                </div>

                <button onClick={toggleSidebar}>
                    <Menu className="text-light w-6 h-6" />
                </button>
            </div>

            <div className={`fixed top-0 right-0 h-full bg-primary w-full max-w-xs p-3 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } md:translate-x-0 md:flex md:static`}>

                {/* Close Button for Mobile */}
                <button onClick={toggleSidebar} className="md:hidden self-end">
                    <X className="text-light w-6 h-6" />
                </button>

                <div className='mt-10 flex flex-col h-full justify-between'>
                    <div>
                        <div className="mt-4">
                            <h2 className="text-light font-medium">
                                My List
                            </h2>

                            <ul className="mt-2 space-y-2">
                                {
                                    userData?.list.map((li: any) => (
                                        <li onClick={() => handleRedirect(String(li?.$id))} key={li?.$id} className='w-full bg-warm text-secondary px-3 py-2 font-medium rounded flex items-center justify-between cursor-pointer'>
                                            <h6>
                                                {li.title}
                                            </h6>

                                            <button
                                                onClick={handleDeleteList} className='md:hover:rotate-90 duration-200 transition-all'>
                                                <X className='text-primary w-5 h-5' />
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <Link href={'/newlist'} onClick={toggleSidebar} className="text-light font-normal mt-8 flex items-center gap-4 active:bg-secondary/20 py-3 px-3 rounded w-full">
                            <Plus />
                            <p>New List</p>
                        </Link>

                        <Link href={'/history'} onClick={toggleSidebar} className='text-light/70 font-normal mt-8 flex lg:hidden items-center gap-4 bg-secondary/20 active:bg-secondary/40 py-3 px-3 rounded w-full'>
                            <History />
                            <p className='font-medium'>
                                Todo History
                            </p>
                        </Link>
                    </div>

                    <button disabled={isloggingOut} onClick={handleLogout} className='w-full bg-warm py-2 px-3 rounded font-medium md:hover:bg-warm/80 disabled:bg-warm/60 duration-200 transition-colors flex gap-3 items-center justify-center'>
                        {
                            isloggingOut && (
                                <LoaderCircle className='animate-spin w-5 h-5' />
                            )
                        }
                        <p>
                            Logout
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
