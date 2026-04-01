import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/api-auth';
import { defaultLimiter } from '@/lib/rate-limit';
import { mockAgents } from '@/lib/mock-agents';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import type { Agent } from '@/types';

function generateId(): string {
  return 'agent_' + randomUUID().replace(/-/g, '').slice(0, 24);
}

const createAgentSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
  framework: z.string().optional(),
  frameworkVersion: z.string().optional(),
  model: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const rateResult = defaultLimiter.check(request);
    if (!rateResult.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const agents = mockAgents[user.userId] || [];
    return NextResponse.json({ agents });
  } catch (error) {
    logger.error('Agents GET error', { error: (error as Error).message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rateResult = defaultLimiter.check(request);
    if (!rateResult.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = user.userId;

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    const input = createAgentSchema.parse(body);

    const now = new Date().toISOString();
    const agent: Agent = {
      id: generateId(),
      name: input.name,
      description: input.description || null,
      framework: input.framework || null,
      frameworkVersion: input.frameworkVersion || null,
      model: input.model || null,
      modelHash: null,
      configHash: null,
      toolManifestHash: null,
      status: 'active',
      score: null,
      evaluationCount: 0,
      userId,
      createdAt: now,
      updatedAt: now,
    };

    if (!mockAgents[userId]) {
      mockAgents[userId] = [];
    }
    mockAgents[userId].push(agent);

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    logger.error('Agents POST error', { error: (error as Error).message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

