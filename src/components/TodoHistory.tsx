import React from 'react'

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
]


export default function TodoHistory() {
    return (
        <div className='w-full bg-black text-light md:p-10 hidden xl:block'>
            <h1 className='text-2xl text-light/90 font-bold'>
                Todo History
            </h1>

            <div className='mt-6 space-y-6 overflow-y-auto h-full max-h-[40rem]'>
                {
                    history.map(elem => (
                        <div key={elem.month}>
                            <h1 className='text-lg font-bold text-light/60'>
                                {elem.month}
                            </h1>

                            <ul className='space-y-2 mt-2'>
                                {
                                    elem.todos.map(todo => (
                                        <li className='w-full bg-primary px-4 py-3 rounded' key={todo.id}>
                                            <p className='text-light/80 font-medium'>
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
    )
}
