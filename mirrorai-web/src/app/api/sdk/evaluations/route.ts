import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';
import { z } from 'zod';

const evalSchema = z.object({
  agentId: z.string(),
  evalType: z.enum(['full', 'incremental', 'heartbeat', 'ad-hoc']).optional().default('full'),
  // 兼容 SDK 的 dimensions 格式
  dimensions: z.object({
    security: z.object({ score: z.number(), max: z.number() }),
    reliability: z.object({ score: z.number(), max: z.number() }),
    observability: z.object({ score: z.number(), max: z.number() }),
    compliance: z.object({ score: z.number(), max: z.number() }),
    explainability: z.object({ score: z.number(), max: z.number() }),
  }).optional(),
  // 兼容 SDK 的总分和等级
  totalScore: z.number(),
  grade: z.enum(['S', 'A', 'B', 'C', 'D']).optional(),
  // 兼容 SaaS 原有的 results 格式
  results: z.object({
    overallScore: z.number(),
    securityScore: z.number().optional(),
    reliabilityScore: z.number().optional(),
    capabilityLevel: z.string().optional(),
    securityLevel: z.string().optional(),
    passedScenarios: z.number().optional(),
    totalScenarios: z.number().optional(),
    scenarios: z.array(z.object({
      name: z.string(),
      type: z.string(),
      passed: z.boolean(),
      score: z.number(),
      details: z.string().optional(),
    })).optional(),
  }).optional(),
  signature: z.string().optional(),
  merkleRoot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = evalSchema.parse(body);
    
    const overallScore = data.totalScore || data.results?.overallScore || 0;
    const grade = data.grade || 'C';
    
    console.log(`[SDK] Received evaluation for agent ${data.agentId}: ${overallScore}/100`);
    
    return NextResponse.json({
      evaluationId: 'eval_' + Date.now(),
      agentId: data.agentId,
      score: overallScore,
      grade,
      status: 'received',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}

