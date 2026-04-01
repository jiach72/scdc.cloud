import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { requireAuth, AuthError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: user.userId },
      select: { id: true, name: true, prefix: true, createdAt: true, lastUsedAt: true, expiresAt: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ apiKeys });
  } catch (error: unknown) {
    if (error instanceof AuthError || (error instanceof Error && 'status' in error && (error as { status: number }).status === 401)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const body = await request.json() as { name?: string };
    const name = (body.name || 'New Key').toString().slice(0, 100);

    const rawKey = 'mk_live_' + crypto.randomBytes(24).toString('hex');
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    const apiKey = await prisma.apiKey.create({
      data: {
        userId: user.userId,
        name,
        keyHash,
        prefix: rawKey.slice(0, 15),
      },
    });

    return NextResponse.json({
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        prefix: apiKey.prefix,
        key: rawKey, // Only returned on creation
        createdAt: apiKey.createdAt,
      },
    }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof AuthError || (error instanceof Error && 'status' in error && (error as { status: number }).status === 401)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    // Only delete keys owned by the authenticated user
    const deleted = await prisma.apiKey.deleteMany({
      where: { id, userId: user.userId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    }

    return NextResponse.json({ deleted: true });
  } catch (error: unknown) {
    if (error instanceof AuthError || (error instanceof Error && 'status' in error && (error as { status: number }).status === 401)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

