/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Link from 'next/link';
import appwriteService from '@/appwrite/functions';
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { setAuthStatus } = useAuth();
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const user = await appwriteService.login(form)

        if (user) {
            console.log(user);
            setAuthStatus(true);
            router.push("/")
        }

        setForm({ email: '', password: '' });
    };

    return (
        <div className="flex items-center justify-center min-h-screen md:bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded md:shadow-md">
                <h2 className="text-2xl font-bold text-start mb-4">
                    Login Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
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
                        className="w-full text-sm font-semibold px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Login
                    </button>
                </form>

                <p className="text-start text-sm text-gray-600 mt-4">
                    New User?{' '}
                    <Link className="text-blue-500 hover:underline font-semibold" href="/auth/signup">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
