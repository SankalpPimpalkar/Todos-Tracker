/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Link from 'next/link';
import useAuth from '@/context/useAuth';
import appwriteService from '@/appwrite/functions';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const { setAuthStatus } = useAuth();
    const router = useRouter()

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const user = await appwriteService.createAccount(form)

        if (user) {
            console.log(user);
            setAuthStatus(true);
            router.push('/')
        }

        setForm({ name: '', email: '', password: '' });
    };

    return (
        <div className="flex items-center justify-center min-h-screen md:bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded md:shadow-md">
                <h2 className="text-2xl font-bold text-start mb-4">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none caret-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none caret-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none caret-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-sm font-semibold px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-start text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link className="text-blue-500 hover:underline font-semibold" href="/auth/login">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
