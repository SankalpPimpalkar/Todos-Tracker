/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import appwriteService from '@/appwrite/functions';
import useAuth from '@/context/useAuth';
import React, { useEffect, useState } from 'react';
import formatToHistory from '@/utils/formatToHistory'
import formatToDate from '@/utils/formatToDate';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function TodoHistory() {
    const { userData } = useAuth();
    const [history, setHistory] = useState<any>([]);
    const [expandedTodoId, setExpandedTodoId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            if (userData) {
                const todos = await appwriteService.getTodoByUserId(userData.$id);
                const formattedTodos = formatToHistory(todos.documents);
                setHistory(formattedTodos);
                console.log("History Todos", formattedTodos);
            }
        })();
    }, [userData]);

    // Toggle the expansion of a todo item
    const toggleExpand = (id: number) => {
        setExpandedTodoId(expandedTodoId === id ? null : id);
    };

    return (
        <div className='bg-black text-light pt-20 px-6 w-full min-h-dvh md:px-10 block lg:hidden'>
            <h1 className='text-3xl font-bold text-light/90 mb-5'>Todo History</h1>

            <div className='space-y-6 h-full'>
                {history.length > 0 ? history.map((elem: any) => (
                    <div key={elem.month} className='mb-6'>
                        <h2 className='text-xl font-semibold text-light/70'>{elem.month}</h2>

                        <ul className='space-y-3 mt-4'>
                            {elem.todos.map((todo: any) => (
                                <div key={todo.id}>
                                    <li
                                        className='w-full bg-primary px-4 py-3 rounded flex items-center justify-between cursor-pointer'
                                        onClick={() => toggleExpand(todo.id)}
                                    >
                                        <div className='flex items-center gap-2'>
                                            {todo.isCompleted ? (
                                                <Check className='text-green-400' />
                                            ) : (
                                                <X className='text-red-400' />
                                            )}
                                            <p className='text-light/80 font-medium'>{todo.todo}</p>
                                        </div>

                                        <div className='flex items-center gap-1'>
                                            {expandedTodoId === todo.id ? (
                                                <ChevronUp className='text-light/50' />
                                            ) : (
                                                <ChevronDown className='text-light/50' />
                                            )}
                                        </div>
                                    </li>

                                    {/* Expanded content for each todo item */}
                                    {expandedTodoId === todo.id && (
                                        <div className='mt-2 p-4 bg-primary rounded'>
                                            <span className='text-light/70 text-sm'>
                                                <p className='font-medium'>
                                                    Status: {' '}
                                                    {
                                                        todo.isCompleted ? 'Completed' : 'Pending'
                                                    }
                                                </p>
                                            </span>
                                            <p className='text-light/70 text-sm'>
                                                <span className='font-medium'>
                                                    CreatedAt: {' '}
                                                    {
                                                        formatToDate(todo.createdAt)
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ul>
                    </div>
                )) :
                    (
                        <p className='font-medium text-light/50'>
                            No Todos yet
                        </p>
                    )}
            </div>
        </div>
    );
}
