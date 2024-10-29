/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import appwriteService from '@/appwrite/functions';
import { useEffect, useState } from 'react'
import formatToMonthYear from '@/utils/formatToMonthYear'

export default function List({ params }: { params: { id: string } }) {

    const [todos, setTodos] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const todos = await appwriteService.getTodosByListId(params.id)
            console.log(todos)
            setTodos(todos)
        })()
    }, [])

    return (
        <div className='w-full min-h-dvh bg-black text-light p-6 md:p-10 select-none pt-20 md:pt-10'>
            <div className='flex items-start gap-8'>
                <span className='font-bold text-3xl text-light/90 hidden flex-col items-center md:flex'>
                    <p className='text-pretty text-start w-32'>
                        {formatToMonthYear(todos?.$createdAt)}
                    </p>
                </span>

                <span>
                    <h1 className='font-bold text-3xl text-light/90'>
                        Good Afternoon.
                    </h1>
                    <p className='font-bold text-3xl text-pretty text-light/40'>
                        What&apos;s your plan for today ?
                    </p>
                </span>
            </div>

            <ul className="w-full max-w-xl space-y-2 mt-8">
                {
                    ['1', '2', '3', '4', '5', '6'].map(todo => (
                        <li key={todo} className="bg-primary px-5 py-4 rounded ">

                            <label htmlFor={todo} className="flex items-center justify-between cursor-pointer">
                                <div className='flex items-center gap-5'>
                                    <div>
                                        <input type="checkbox" name={todo} id={todo} className="peer hidden" />
                                        <span className="w-5 h-5 border border-warm rounded-full bg-transparent peer-checked:bg-warm flex items-center justify-center transition-all">
                                        </span>
                                    </div>

                                    <p className='text-light/80 font-medium'>
                                        Todo Text
                                    </p>
                                </div>

                                <p className='text-sm text-light/60'>
                                    2024-10-23
                                </p>
                            </label>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}
