"use client";
import appwriteService from '@/appwrite/functions';
import useAuth from '@/context/useAuth';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData, reFetchUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const newList = await appwriteService.createNewList({ userId: userData?.$id, title });

    console.log(newList);

    if (newList) {
      reFetchUser()
      router.push(`/list/${newList.$id}`)
    }

    setTitle("");
    setIsLoading(false);
  };

  return (
    <div className='w-full min-h-dvh bg-black text-light p-6 md:p-10 select-none pt-20 md:pt-10 flex flex-col items-start'>
      <p className='font-bold text-3xl text-pretty text-light/80 mb-6'>
        Ready to start a new list?
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md md:pt-6 rounded-lg">
        <label className='block text-light/70 font-semibold mb-2 text-lg' htmlFor="title">
          Give a title
        </label>

        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-secondary/10 text-light placeholder-light/40 border border-secondary/30 rounded outline-none"
          placeholder="Enter your list title..."
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-fit py-2 px-4 bg-warm active:bg-warm/80 text-sm text-black font-semibold rounded hover:bg-pretty/90 transition-colors disabled:bg-warm/70 flex items-center gap-2">
          {
            isLoading && (
              <LoaderCircle className='animate-spin w-5 h-5' />
            )
          }
          <p>
            Create List
          </p>
        </button>
      </form>
    </div>
  );
}
