import { Plus, X, Menu } from 'lucide-react'
import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function NavbarMobile({ isOpen, toggleSidebar }) {
    const router = useRouter();

    const handleRedirect = (id: string) => {
        router.push(`/list/${id}`)
    }

    const handleDeleteList = async (e: FormEvent) => {
        e.stopPropagation();
        console.log("Propagation Stopped");
    }

    return (
        <div className='block md:hidden'>
            <div onClick={toggleSidebar} className="w-full fixed top-0 md:hidden flex items-center justify-between px-5 py-4 bg-primary">
                <div className="text-lg text-light font-bold">
                    😎 Next Todo
                </div>

                <button onClick={toggleSidebar}>
                    <Menu className="text-light w-6 h-6" />
                </button>
            </div>

            <div className={`fixed top-0 right-0 h-full bg-primary w-full max-w-xs p-3 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } md:translate-x-0 md:flex md:static`}>

                {/* Close Button for Mobile */}
                <button onClick={toggleSidebar} className="md:hidden self-end">
                    <X className="text-light w-6 h-6" />
                </button>

                <div>
                    <div className="mt-4">
                        <h2 className="text-light font-medium">
                            My List
                        </h2>

                        <ul className="mt-2 space-y-2">
                            {[1, 2, 3, 4, 5, 6].map(li => (
                                <li
                                    onClick={() => handleRedirect(String(li))}
                                    key={li}
                                    className="w-full bg-warm text-secondary px-3 py-2 font-medium rounded flex items-center justify-between"
                                >
                                    <h6>List {li}</h6>

                                    <button
                                        onClick={handleDeleteList}
                                        className="md:hover:rotate-90 duration-200 transition-all"
                                    >
                                        <X className="text-primary w-5 h-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="text-light font-normal mt-8 flex items-center gap-4 hover:bg-secondary/20 py-2 px-3 rounded w-full">
                        <Plus />
                        <p>New List</p>
                    </button>
                </div>

                <button className="w-full bg-warm py-2 px-3 rounded font-medium md:hover:bg-warm/80 duration-200 transition-colors">
                    Logout
                </button>
            </div>
        </div>
    );
}
