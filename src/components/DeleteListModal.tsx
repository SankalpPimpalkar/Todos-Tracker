/* eslint-disable @typescript-eslint/no-explicit-any */
import appwriteService from '@/appwrite/functions';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';

export default function DeleteListModal({ isOpen, setIsModalOpen, setSelectedList, selectedList }: any) {

    const [isDeletingList, setIsDeletingList] = useState(false);
    const router = useRouter();
    const { reFetchUser } = useAuth();

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedList('');
    }

    const handleDeleteList = async () => {
        console.log("Deleted", selectedList)
        setIsDeletingList(true);
        if (selectedList) {
            const status = await appwriteService.deleteList(selectedList);
            console.log("Status", status);
        }

        setIsDeletingList(false);
        setIsModalOpen(false);
        setSelectedList('');
        reFetchUser();
        router.push('/')
    }

    if (!isOpen) return null

    return (
        <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-primary p-6 rounded-md shadow-lg w-11/12 max-w-sm">
                <h2 className="font-medium text-pretty mb-4 text-light">
                    Are you sure you want to delete this list ?
                </h2>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        disabled={isDeletingList}
                        className="px-4 py-2 w-full sm:w-fit bg-secondary active:bg-secondary/70 text-sm text-light rounded-md disabled:bg-secondary/70"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isDeletingList}
                        className="px-4 py-2 w-full sm:w-fit bg-warm active:bg-warm/80 text-black text-sm font-medium rounded-md flex items-center justify-center gap-2 disabled:bg-warm/80"
                        onClick={handleDeleteList}>
                        {
                            isDeletingList && (
                                <LoaderCircle className='animate-spin w-5 h-5' />
                            )
                        }
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

