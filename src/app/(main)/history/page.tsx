import React from 'react';

const history = [
    {
        "month": "January 2023",
        "todos": [
            { "id": 1, "todo": "Complete project report" },
            { "id": 2, "todo": "Plan Q1 marketing strategy" }
        ]
    },
    {
        "month": "February 2023",
        "todos": [
            { "id": 3, "todo": "Update team on new policies" },
            { "id": 4, "todo": "Host client feedback meeting" }
        ]
    },
    {
        "month": "March 2023",
        "todos": [
            { "id": 5, "todo": "File annual taxes" },
            { "id": 6, "todo": "Complete product launch checklist" }
        ]
    },
    {
        "month": "April 2023",
        "todos": [
            { "id": 7, "todo": "Organize company retreat" },
            { "id": 8, "todo": "Review Q1 financials" }
        ]
    },
    {
        "month": "October 2023",
        "todos": [
            { "id": 9, "todo": "fake todo" }
        ]
    }
];

export default function TodoHistory() {
    return (
        <div className='bg-black text-light pt-20 px-6 w-full min-h-screen md:px-10 block lg:hidden'>
            <h1 className='text-3xl font-bold text-light/90 mb-5'>
                Todo History
            </h1>

            <div className='space-y-6 overflow-y-auto h-full max-h-[35rem]'>
                {
                    history.map(elem => (
                        <div key={elem.month} className='mb-6'>
                            <h2 className='text-xl font-semibold text-light/70'>
                                {elem.month}
                            </h2>

                            <ul className='space-y-3 mt-4'>
                                {
                                    elem.todos.map(todo => (
                                        <li className='w-full bg-primary px-4 py-3 rounded' key={todo.id}>
                                            <p className='text-light/90 font-medium'>
                                                {todo.todo}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
