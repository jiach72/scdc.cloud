import { NextRequest } from 'next/server';
import crypto from 'crypto';
import prisma from './prisma';

// SDK API Key 验证
export async function verifyApiKey(request: NextRequest): Promise<{ valid: boolean; userId?: string; agentId?: string }> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false };
  }

  const apiKey = authHeader.slice(7);
  if (!apiKey) {
    return { valid: false };
  }

  // Hash the raw key to compare against stored hash
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  try {
    const keyRecord = await prisma.apiKey.findUnique({
      where: { keyHash },
    });

    if (!keyRecord) {
      return { valid: false };
    }

    // Check expiration
    if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
      return { valid: false };
    }

    // Update lastUsedAt (fire-and-forget, don't block response)
    prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    }).catch(() => {});

    return {
      valid: true,
      userId: keyRecord.userId,
    };
  } catch {
    return { valid: false };
  }
}

