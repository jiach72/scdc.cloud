import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: string;
  downloadCount: number;
  createdAt: string;
}

const plugins: Plugin[] = [
  { id: 'plugin-1', name: 'OpenAI Guard', description: 'OpenAI API 集成安全插件', category: 'integration', version: '1.0.0', status: 'approved', downloadCount: 156, createdAt: '2026-02-15T00:00:00Z' },
  { id: 'plugin-2', name: 'LangChain Monitor', description: 'LangChain 链路监控插件', category: 'monitoring', version: '0.9.0', status: 'approved', downloadCount: 89, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'plugin-3', name: 'Custom Attack Pack', description: '自定义攻击场景包', category: 'attack', version: '0.1.0', status: 'pending', downloadCount: 0, createdAt: '2026-03-28T00:00:00Z' },
];

export async function GET(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let result = plugins;
  if (status) result = plugins.filter(p => p.status === status);

  return NextResponse.json({ plugins: result });
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body;
  try {
    body = await request.json() as { name?: string; description?: string; category?: string; version?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const plugin: Plugin = {
    id: 'plugin_' + Date.now(),
    name: body.name || '',
    description: body.description || '',
    category: body.category || '',
    version: body.version || '0.1.0',
    status: 'pending',
    downloadCount: 0,
    createdAt: new Date().toISOString(),
  };
  plugins.push(plugin);

  return NextResponse.json({ plugin }, { status: 201 });
}

