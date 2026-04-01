import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string | null;
  ip: string;
  userAgent: string;
  timestamp: string;
  details: Record<string, unknown> | null;
}

// 内存存储
const auditLogs: AuditLogEntry[] = [
  { id: 'log-1', userId: 'mock_user_1', action: 'agent.created', resource: 'agent-001', ip: '192.168.1.10', userAgent: 'MirrorAI-SDK/1.0.0', timestamp: '2026-03-31T10:00:00Z', details: { name: 'CustomerBot' } },
  { id: 'log-2', userId: 'mock_user_1', action: 'evaluation.started', resource: 'eval-001', ip: '192.168.1.10', userAgent: 'MirrorAI-SDK/1.0.0', timestamp: '2026-03-31T10:05:00Z', details: { type: 'full' } },
  { id: 'log-3', userId: 'mock_user_1', action: 'evaluation.completed', resource: 'eval-001', ip: '192.168.1.10', userAgent: 'MirrorAI-SDK/1.0.0', timestamp: '2026-03-31T10:05:03Z', details: { score: 87 } },
  { id: 'log-4', userId: 'mock_user_1', action: 'certificate.issued', resource: 'cert-001', ip: '192.168.1.10', userAgent: 'MirrorAI-Web/1.0.0', timestamp: '2026-03-31T11:00:00Z', details: { certNumber: 'MAI-2026-001-S-A' } },
  { id: 'log-5', userId: 'mock_user_1', action: 'plugin.installed', resource: 'plugin-1', ip: '192.168.1.10', userAgent: 'MirrorAI-Web/1.0.0', timestamp: '2026-03-31T12:00:00Z', details: { name: 'OpenAI Guard' } },
];

// GET /api/audit-logs — 获取审计日志
export async function GET(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const resource = searchParams.get('resource');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let result = [...auditLogs];

  if (action) result = result.filter(l => l.action.includes(action));
  if (resource) result = result.filter(l => l.resource === resource);

  // 按时间倒序
  result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const total = result.length;
  const offset = (page - 1) * limit;
  const paginated = result.slice(offset, offset + limit);

  return NextResponse.json({
    auditLogs: paginated,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

// POST /api/audit-logs — 创建审计日志
export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body;
  try {
    body = await request.json() as { action: string; resource?: string; details?: Record<string, unknown> };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const log: AuditLogEntry = {
    id: 'log_' + Date.now(),
    userId: auth.userId || 'unknown',
    action: body.action,
    resource: body.resource || null,
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1',
    userAgent: request.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString(),
    details: body.details || null,
  };

  auditLogs.push(log);
  return NextResponse.json({ auditLog: log }, { status: 201 });
}

