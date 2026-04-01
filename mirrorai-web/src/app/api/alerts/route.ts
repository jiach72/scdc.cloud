import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';
import type { AlertLevel } from '@/types';

interface AlertItem {
  id: string;
  agentId: string;
  agentName: string;
  type: string;
  level: AlertLevel;
  severity: string;
  message: string;
  acknowledged: boolean;
  resolved: boolean;
  timestamp: string;
  createdAt: string;
}

const alerts: AlertItem[] = [
  { id: 'alert-001', agentId: 'agent-003', agentName: 'SupportAgent', type: 'anomaly', level: 'critical', severity: 'medium', message: '安全评分下降至 71，低于安全阈值 (80)', acknowledged: false, resolved: false, timestamp: '2026-03-30T18:40:00Z', createdAt: '2026-03-30T18:40:00Z' },
  { id: 'alert-002', agentId: 'agent-002', agentName: 'DataAnalyst Pro', type: 'data_leak', level: 'warning', severity: 'medium', message: '数据泄露防护场景检测到 1 次泄露', acknowledged: false, resolved: false, timestamp: '2026-03-29T09:20:00Z', createdAt: '2026-03-29T09:20:00Z' },
  { id: 'alert-003', agentId: 'agent-005', agentName: 'SalesBot', type: 'connection', level: 'critical', severity: 'critical', message: 'Agent 连接超时，评测任务失败', acknowledged: true, resolved: true, timestamp: '2026-03-28T16:05:00Z', createdAt: '2026-03-28T16:05:00Z' },
  { id: 'alert-004', agentId: 'agent-003', agentName: 'SupportAgent', type: 'cert_expiry', level: 'warning', severity: 'medium', message: '护照即将过期（剩余 15 天），请及时续期', acknowledged: false, resolved: false, timestamp: '2026-03-27T10:00:00Z', createdAt: '2026-03-27T10:00:00Z' },
  { id: 'alert-005', agentId: 'agent-001', agentName: 'CustomerBot', type: 'eval_complete', level: 'info', severity: 'info', message: '增量评测完成，安全评分 92', acknowledged: true, resolved: true, timestamp: '2026-03-30T14:25:00Z', createdAt: '2026-03-30T14:25:00Z' },
];

export async function GET(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const acknowledged = searchParams.get('acknowledged');
  const resolved = searchParams.get('resolved');

  let result = alerts;
  if (acknowledged === 'false') result = alerts.filter(a => !a.acknowledged);
  if (resolved === 'false') result = result.filter(a => !a.resolved);

  return NextResponse.json({ alerts: result });
}

export async function PUT(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json() as { id: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const alert = alerts.find(a => a.id === body.id);
  if (alert) {
    alert.acknowledged = true;
    alert.resolved = true;
  }

  return NextResponse.json({ alert });
}

