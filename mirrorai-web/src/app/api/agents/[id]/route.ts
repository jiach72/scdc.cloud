import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/api-auth';
import { defaultLimiter } from '@/lib/rate-limit';
import { mockAgents } from '@/lib/mock-agents';
import { logger } from '@/lib/logger';
import { z } from 'zod';

function findAgent(userId: string, agentId: string) {
  const agents = mockAgents[userId] || [];
  return agents.find(a => a.id === agentId) || null;
}

const updateAgentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  framework: z.string().optional(),
  frameworkVersion: z.string().optional(),
  model: z.string().optional(),
  status: z.enum(['active', 'inactive', 'warning', 'restricted', 'suspended']).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const agent = findAgent(userId, id);

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json({ agent });
  } catch (error) {
    logger.error('Agent GET error', { error: (error as Error).message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const agents = mockAgents[userId] || [];
    const index = agents.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    const input = updateAgentSchema.parse(body);

    const updated = {
      ...agents[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    agents[index] = updated;

    return NextResponse.json({ agent: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    logger.error('Agent PUT error', { error: (error as Error).message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const agents = mockAgents[userId] || [];
    const index = agents.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    agents.splice(index, 1);

    return NextResponse.json({ message: 'Agent deleted' });
  } catch (error) {
    logger.error('Agent DELETE error', { error: (error as Error).message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
