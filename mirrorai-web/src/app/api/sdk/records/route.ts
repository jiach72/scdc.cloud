import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';
import { z } from 'zod';

const recordSchema = z.object({
  agentId: z.string(),
  records: z.array(z.object({
    id: z.string().optional(),
    type: z.string(),
    input: z.any(),
    reasoning: z.string().optional(),
    output: z.any(),
    toolCalls: z.array(z.any()).optional(),
    duration: z.number().optional(),
    timestamp: z.string(),
    signature: z.string().optional(),
    hash: z.string().optional(),
    metadata: z.any().optional(),
  })),
});

// POST /api/sdk/records — SDK 上报决策记录
export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = recordSchema.parse(body);
    
    // Mock: 存储到内存
    console.log(`[SDK] Received ${data.records.length} records from agent ${data.agentId}`);
    
    return NextResponse.json({
      received: data.records.length,
      agentId: data.agentId,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}

