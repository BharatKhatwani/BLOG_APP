'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";


type Post = {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
    email: string;
  };
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingSlug, setViewingSlug] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const { data: session } = useSession();
  const [confirmingPost, setConfirmingPost] = useState<Post | null>(null);


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

  const handleDelete = async (id: string) => {
  setDeletingId(id);
  try {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } else {
      console.error('Failed to delete post.');
    }
  } catch (err) {
    console.error('Delete failed:', err);
  } finally {
    setDeletingId(null);
    setConfirmingPost(null);
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        <span className="ml-2 text-gray-700">Loading posts...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => {
          const isAuthor = session?.user?.id === post.authorId;

          return (
            <div key={post.id} className="border p-4 mb-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <p className="text-sm text-gray-500 mt-2">By: {post.author.name}</p>

              <div className="mt-4 flex gap-2 cursor-pointer">
                <Button
                  onClick={() => {
                    setViewingSlug(post.slug);
                    router.push(`/blog/${post.slug}`);
                  }}
                  variant="outline"
                  className='cursor-pointer'
                >
                  {viewingSlug === post.slug ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  View
                </Button>

              {isAuthor && (
  <>
   <Button
  onClick={() => {
    setEditingSlug(post.slug); // start spinner
    router.push(`/blog/${post.slug}/edit`);
  }}
  variant="secondary"
  className="cursor-pointer"
>
  {editingSlug === post.slug && (
    <Loader2 className="animate-spin h-4 w-4 mr-2" />
  )}
  Edit
</Button>


    {/* 🧠 Trigger modal */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => setConfirmingPost(post)}
          className='cursor-pointer'
        >
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmingPost(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deletingId === confirmingPost?.id}
            onClick={() => confirmingPost && handleDelete(confirmingPost.id)}
          >
            {deletingId === confirmingPost?.id ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
)}

              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
