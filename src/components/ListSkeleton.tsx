import React from 'react'

export default function ListSkeleton() {
    return (
        <div className="space-y-8">
            {/* Skeleton for date */}
            <div className='flex items-start gap-8'>
                <span className='font-bold text-3xl text-light/90 hidden flex-col items-center md:flex'>
                    <div className="h-6 w-32 bg-primary rounded animate-pulse"></div>
                </span>
                <span>
                    <div className="h-8 w-48 bg-primary rounded animate-pulse mb-2"></div>
                    <div className="h-6 w-64 bg-primary rounded animate-pulse"></div>
                </span>
            </div>

            {/* Skeleton for todo list */}
            <ul className="w-full max-w-xl space-y-2 mt-8">
                {[...Array(3)].map((_, index) => (
                    <li key={index} className="bg-primary px-5 py-4 rounded animate-pulse">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="w-5 h-5 border border-warm rounded-full bg-primary flex items-center justify-center"></div>
                                <div className="h-5 w-48 bg-primary rounded"></div>
                            </div>
                            <div className="h-4 w-20 bg-primary rounded"></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
