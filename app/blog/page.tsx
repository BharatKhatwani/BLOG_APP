'use client';

import { useEffect, useState } from 'react';

// Define the Post type structure (same as your Prisma model)
type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-500 mt-2">By: {post.author.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
