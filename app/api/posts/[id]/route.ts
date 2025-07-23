import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const postId = params.id;

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}


export async function PUT(req : NextResponse, { params} : Params) {
  const postId = params.id;
  const body = await req.json();
  const { title, description } = body;

  try {
    const updated = await prisma.post.update({
      where: { id: postId },
      data: { title, description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
