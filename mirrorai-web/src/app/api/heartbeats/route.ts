import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';

interface Heartbeat {
  id: string;
  agentId: string;
  status: string;
  latency: number;
  score: number;
  details: Record<string, unknown> | null;
  createdAt: string;
}

const heartbeats: Record<string, Heartbeat[]> = {};

export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body;
  try {
    body = await request.json() as { agentId: string; status?: string; latency?: number; score?: number; details?: Record<string, unknown> };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const hb: Heartbeat = {
    id: 'hb_' + Date.now(),
    agentId: body.agentId,
    status: body.status || 'healthy',
    latency: body.latency || 0,
    score: body.score || 100,
    details: body.details || null,
    createdAt: new Date().toISOString(),
  };

  if (!heartbeats[body.agentId]) heartbeats[body.agentId] = [];
  heartbeats[body.agentId].push(hb);

  return NextResponse.json({ heartbeat: hb }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agentId');

  if (agentId) return NextResponse.json({ heartbeats: heartbeats[agentId] || [] });

  const all = Object.values(heartbeats).flat();
  return NextResponse.json({ heartbeats: all });
}

