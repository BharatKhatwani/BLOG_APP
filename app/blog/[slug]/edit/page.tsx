// app/blog/[slug]/edit/page.tsx
import { prisma } from '@/lib/prisma'; // Adjust path based on your project
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import NotFound from '@/app/not-found';

export const dynamic = 'force-dynamic'; // ensures SSR each time


type Props = {
  params: { slug: string };
};

export default async function EditPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return {NotFound}; 

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form action={updatePost}>
        <input type="hidden" name="id" value={post.id} />
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={post.description}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <Button type="submit" className="mt-2 cursor-pointer">
          Update Post
        </Button>
      </form>
    </div>
  );
}

async function updatePost(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  if (!id || !title || !description) return;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      description,
    },
  });

  revalidatePath('/blog'); // refresh blog list
  redirect('/blog');
}
