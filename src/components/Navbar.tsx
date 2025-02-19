/* eslint-disable @typescript-eslint/no-explicit-any */
import { History, LoaderCircle, Plus, X } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import appwriteService from '@/appwrite/functions';
import useAuth from '@/context/useAuth';

export default function Navbar({ setIsModalOpen, setSelectedList }: any) {

    const router = useRouter();
    const [isloggingOut, setIsloggingOut] = useState(false);
    const { userData } = useAuth();
    const param = useParams();

    const handleRedirect = (id: string) => {
        router.push(`/list/${id}`)
    }

    const handleOpenModal = async (e: FormEvent, listId: string) => {
        e.stopPropagation();
        console.log("Propogation Stopped", listId)
        setSelectedList(listId);
        setIsModalOpen(true);
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
        <div className='bg-primary w-full max-w-xs hidden flex-col justify-between p-3 md:flex'>

            <div>
                <div className='border rounded-md border-secondary/20 bg-secondary/20 text-lg text-light px-6 py-3 font-semibold'>
                    😎 Next Todo
                </div>

                <div className='mt-4'>
                    <h2 className='text-light font-medium'>
                        My List
                    </h2>

                    <ul className='mt-2 space-y-2'>
                        {
                            userData?.list.map((li: any) => (
                                <li onClick={() => handleRedirect(String(li?.$id))} key={li?.$id} className={`w-full px-3 py-2 font-medium rounded flex items-center justify-between cursor-pointer ${param.id != li?.$id ? 'bg-secondary/30 text-light/60' : 'bg-warm text-secondary'}`}>
                                    <h6>
                                        {li.title}
                                    </h6>

                                    <button
                                        onClick={(e) => handleOpenModal(e, li.$id)} className='md:hover:rotate-90 duration-200 transition-all'>
                                        <X className={`w-5 h-5 ${param.id != li?.$id ? 'text-light/60' : ' text-primary'}`} />
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <button onClick={() => router.push('/')} className='text-light font-normal mt-8 flex items-center gap-4 hover:bg-secondary/20 py-2 px-3 rounded w-full'>
                    <Plus />
                    <p>
                        New List
                    </p>
                </button>

                <Link href={'/history'} className='text-light/70 font-normal mt-8 flex lg:hidden items-center gap-4 bg-secondary/20 active:bg-secondary/40 py-3 px-3 rounded w-full'>
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
    )
}
