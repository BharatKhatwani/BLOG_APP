'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send data');
      }

      // Optionally: await res.json() if you need the response

      router.push('/blog');
    } catch (error) {
      setError('Failed to publish blog. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          ✍️ Write a New Blog
        </h1>
        <p className="text-gray-500 text-lg">
          Share your thoughts, tutorials, or stories with the world.
        </p>
      </div>

      <form
        className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border"
        onSubmit={handleSubmit}
        aria-label="Create Blog Form"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xl font-semibold text-gray-800 mb-2">
            Title
          </label>
          <Input
            id="title"
            placeholder="e.g. How I built a blog with Next.js and Prisma"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base"
            aria-required="true"
          />
          <div className="text-sm text-gray-400 mt-1 text-right">
            {title.length}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xl font-semibold text-gray-800 mb-2">
            Story...
          </label>
          <Textarea
            id="description"
            placeholder="Write your blog content here..."
            className="min-h-[200px] text-base"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-required="true"
          />
          <div className="text-sm text-gray-400 mt-1 text-right">
            {description.length}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 font-semibold text-center">{error}</div>
        )}

        {/* Publish Button */}
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-4 transition-all duration-200"
          disabled={!title || !description || loading}
          aria-disabled={!title || !description || loading}
        >
          {loading ? 'Publishing...' : '🚀 Publish Blog'}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
