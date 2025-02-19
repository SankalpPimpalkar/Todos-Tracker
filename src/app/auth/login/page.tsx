/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Link from 'next/link';
import appwriteService from '@/appwrite/functions';
import useAuth from '@/context/useAuth';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { setAuthStatus } = useAuth();
    const router = useRouter();
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoggingIn(true);
        const user = await appwriteService.login(form);

        if (user) {
            console.log(user);
            setAuthStatus(true);
            router.push("/");
        }

        setIsLoggingIn(false);
        setForm({ email: '', password: '' });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
            <div className="w-full max-w-md p-8 md:bg-secondary/20 rounded-lg md:shadow-lg">
                <h2 className="text-2xl font-bold text-light text-start mb-6">
                    Login Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-light/80 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg bg-primary text-light/90 border-secondary/40 focus:outline-none focus:border-secondary/60"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-light/80 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg bg-primary text-light/90 border-secondary/40 focus:outline-none focus:border-secondary/60"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full flex gap-4 items-center justify-center py-2 px-4 font-semibold text-primary disabled:bg-warm/70 bg-warm rounded-lg transition-all hover:bg-warm/80">
                        {
                            isLoggingIn && (
                                <LoaderCircle className='animate-spin w-5 h-5' />
                            )
                        }
                        <p>
                            Login
                        </p>
                    </button>
                </form>

                <p className="text-start text-sm text-light/70 mt-6">
                    New User?{' '}
                    <Link className="text-warm font-semibold hover:underline" href="/auth/signup">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
