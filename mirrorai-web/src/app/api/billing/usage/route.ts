import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';

export async function GET(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    plan: 'free',
    usage: { agents: { used: 2, limit: 3 }, evaluations: { used: 7, limit: 10 }, storage: { used: 1.2, limit: 5, unit: 'GB' } },
    invoices: []
  });
}

