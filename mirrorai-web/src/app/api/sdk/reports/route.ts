import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';
import { z } from 'zod';

const reportSchema = z.object({
  agentId: z.string(),
  report: z.object({
    id: z.string().optional(),
    agentId: z.string().optional(),
    period: z.object({
      from: z.string(),
      to: z.string(),
    }).optional(),
    summary: z.object({
      totalDecisions: z.number(),
      totalToolCalls: z.number(),
      totalErrors: z.number(),
      avgDuration: z.number(),
      uniqueTools: z.number(),
    }).optional(),
    records: z.array(z.any()).default([]),
    anomalies: z.array(z.any()).default([]),
    // 兼容两种格式
    scores: z.any().optional(),
    signature: z.string().optional(),
    generatedAt: z.string().optional(),
    timestamp: z.string().optional(),
  }),
});

export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = reportSchema.parse(body);
    
    return NextResponse.json({
      reportId: 'rpt_' + Date.now(),
      agentId: data.agentId,
      status: 'received',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}

