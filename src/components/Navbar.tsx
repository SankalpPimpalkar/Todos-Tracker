import { Plus, X } from 'lucide-react'
import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {

    const router = useRouter();

    const handleRedirect = (id: string) => {
        router.push(`/list/${id}`)
    }

    const handleDeleteList = async (e: FormEvent) => {
        e.stopPropagation();
        console.log("Propogation Stopped")
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
                            [1, 2, 3, 4, 5, 6].map(li => (
                                <li onClick={() => handleRedirect(String(li))} key={li} className='w-full bg-warm text-secondary px-3 py-2 font-medium rounded flex items-center justify-between'>
                                    <h6>
                                        List {li}
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

                <button className='text-light font-normal mt-8 flex items-center gap-4 hover:bg-secondary/20 py-2 px-3 rounded w-full'>
                    <Plus />
                    <p>
                        New List
                    </p>
                </button>
            </div>

            <button className='w-full bg-warm py-2 px-3 rounded font-medium md:hover:bg-warm/80 duration-200 transition-colors'>
                Logout
            </button>
        </div>
    )
}
