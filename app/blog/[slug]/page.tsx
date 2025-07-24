import { prisma } from '@/lib/prisma';


type Props = {
  params: { slug: string };
};

export default async function BlogDetails({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.description}</p>
      <p className="mt-6 text-sm text-gray-500">By {post.author.name}</p>
    </div>
  );
}
