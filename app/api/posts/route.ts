import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Make sure prisma is correctly set up
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';




export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('Error fetching posts:', error.message, error.stack);
  return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description } = await req.json();

    const slug = slugify(title, { lower: true }) + '-' + uuidv4().slice(0, 6);

    const post = await prisma.post.create({
      data: {
        title,
        description,
        slug,
        author: {
          connect: {
            email: session.user.email, // You can also use `id` if available
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('POST ERROR:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
