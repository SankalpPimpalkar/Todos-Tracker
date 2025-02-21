/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import appwriteService from '@/appwrite/functions';
import { useEffect, useState } from 'react'
import formatToMonthYear from '@/utils/formatToMonthYear'
import formatToDate from '@/utils/formatToDate'
import { useParams } from 'next/navigation';
import greetByTime from '@/utils/greetByTime'
import ListSkeleton from '@/components/ListSkeleton';
import useAuth from '@/context/useAuth';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function List() {

    const [todos, setTodos] = useState<any>([]);
    const params: any = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [newTodoContent, setNewTodoContent] = useState("");
    const { userData } = useAuth();
    const [isAddingNewTodo, setIsAddingNewTodo] = useState(false);

    const fetchTodos = async () => {
        const todosData = await appwriteService.getTodosByListId(params.id);
        setTodos(todosData.todos);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchTodos()
    }, [params.id]);

    const handleToggleStatus = async (todoId: string, status: boolean) => {

        if (todoId.trim()) {
            const updatedTodo = await appwriteService.toggleCompletionStatus({ todoId, status });

            console.log("UpdatedTodo", updatedTodo);
            await fetchTodos();
        }
    }

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Handle", newTodoContent)
        if (!newTodoContent.trim() || !userData) return;

        setIsAddingNewTodo(true);
        const newTodoList = await appwriteService.createNewTodo({
            content: newTodoContent,
            listId: params.id,
            user: userData.$id
        });

        if (newTodoList) {
            setTodos(newTodoList.todos);
            setNewTodoContent("");
            toast.success('New todo created')
        }
        setIsAddingNewTodo(false);
    };

    return (
        <div className='w-full min-h-dvh bg-black text-light p-6 md:p-10 select-none pt-20 md:pt-10'>
            {
                isLoading ? (
                    <ListSkeleton />
                ) : (
                    <>
                        <div className='flex items-start gap-8'>
                            <span className='font-bold text-3xl text-light/90 hidden flex-col items-center md:flex'>
                                <p className='text-pretty text-start w-32'>
                                    {formatToMonthYear(new Date())}
                                </p>
                            </span>

                            <span>
                                <h1 className='font-bold text-3xl text-light/90'>
                                    {greetByTime(new Date())}
                                </h1>
                                <p className='font-bold text-3xl text-pretty text-light/40'>
                                    What&apos;s your plan for today?
                                </p>
                            </span>
                        </div>

                        <form onSubmit={handleAddTodo} className="w-full mt-8 mb-4">
                            <label htmlFor="newTodo" className="block text-light/70 font-semibold mb-2">
                                Add a New Todo
                            </label>
                            <div className="flex flex-col items-start gap-3">
                                <input
                                    type="text"
                                    id="newTodo"
                                    name="newTodo"
                                    value={newTodoContent}
                                    onChange={(e) => setNewTodoContent(e.target.value)}
                                    className="w-full flex-1 px-4 py-2 bg-secondary/10 text-light placeholder-light/40 border border-secondary/30 rounded outline-none"
                                    placeholder="Enter your todo..."
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isAddingNewTodo}
                                    className="py-2 px-4 bg-pretty text-black font-semibold rounded bg-warm transition-colors flex items-center gap-3 disabled:bg-warm/70 text-sm"
                                >
                                    {
                                        isAddingNewTodo && (
                                            <LoaderCircle className='animate-spin w-5 h-5' />
                                        )
                                    }
                                    <p>
                                        Add
                                    </p>
                                </button>
                            </div>
                        </form>

                        {/* Todo list */}
                        <ul className="w-full max-w-xl space-y-2">
                            {
                                todos?.map((todo: any) => (
                                    <li key={todo?.$id} className="bg-primary px-5 py-4 rounded">
                                        <label htmlFor={todo?.$id} className="flex items-center justify-between cursor-pointer">
                                            <div className='flex items-center gap-5'>
                                                <div>
                                                    <input
                                                        defaultChecked={todo?.isCompleted}
                                                        type="checkbox"
                                                        name={todo?.$id}
                                                        id={todo?.$id}
                                                        className="peer hidden"
                                                        onClick={() => handleToggleStatus(todo?.$id, todo?.isCompleted)}
                                                    />
                                                    <span className="w-5 h-5 border border-warm rounded-full bg-transparent peer-checked:bg-warm flex items-center justify-center transition-all"></span>
                                                </div>
                                                <p className='text-light/80 font-medium'>
                                                    {todo?.content}
                                                </p>
                                            </div>
                                            <p className='text-sm text-light/60'>
                                                {formatToDate(todo?.$createdAt)}
                                            </p>
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                )
            }
        </div>
    );
}
