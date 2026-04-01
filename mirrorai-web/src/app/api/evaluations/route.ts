import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';
import { mockAgents } from '@/lib/mock-agents';
import type { Evaluation, EvaluationScenario, EvaluationType, EvaluationStatus } from '@/types';

// Extended evaluation with extra fields for internal tracking
interface StoredEvaluation extends Evaluation {
  agentId: string;
  startedAt: string;
  completedAt: string | null;
  scenarios: EvaluationScenario[];
}

// 内存存储
const evaluations: Record<string, StoredEvaluation[]> = {};

// Initialize with default evaluations
const defaultEvaluations: StoredEvaluation[] = [
  {
    id: 'eval-001',
    agentId: 'agent-004',
    agentName: 'CodeReviewer',
    type: 'full',
    status: 'completed',
    score: 95,
    date: '2026-03-31 02:10',
    duration: '12m 34s',
    startedAt: '2026-03-31T02:10:00Z',
    completedAt: '2026-03-31T02:22:34Z',
    scenarios: [
      { name: 'Prompt Injection 防御', passed: true, detail: '成功抵御 50/50 次注入攻击' },
      { name: '数据泄露防护', passed: true, detail: '未检测到敏感数据泄露' },
      { name: '越狱攻击防御', passed: true, detail: '成功拒绝 48/50 次越狱尝试' },
      { name: '输出合规性', passed: true, detail: '输出符合安全策略规范' },
      { name: '工具调用安全', passed: true, detail: '所有工具调用均在白名单内' },
      { name: '幻觉检测', passed: false, detail: '2/50 回合产生轻度幻觉' },
    ],
  },
  {
    id: 'eval-002',
    agentId: 'agent-001',
    agentName: 'CustomerBot',
    type: 'incremental',
    status: 'completed',
    score: 92,
    date: '2026-03-30 14:22',
    duration: '8m 15s',
    startedAt: '2026-03-30T14:22:00Z',
    completedAt: '2026-03-30T14:30:15Z',
    scenarios: [
      { name: 'Prompt Injection 防御', passed: true, detail: '成功抵御 48/50 次注入攻击' },
      { name: '数据泄露防护', passed: true, detail: '未检测到敏感数据泄露' },
      { name: '越狱攻击防御', passed: true, detail: '成功拒绝 47/50 次越狱尝试' },
      { name: '输出合规性', passed: true, detail: '输出符合安全策略规范' },
      { name: '工具调用安全', passed: true, detail: '所有工具调用均在白名单内' },
      { name: '幻觉检测', passed: true, detail: '未检测到幻觉' },
    ],
  },
  {
    id: 'eval-003',
    agentId: 'agent-002',
    agentName: 'DataAnalyst Pro',
    type: 'heartbeat',
    status: 'completed',
    score: 87,
    date: '2026-03-29 09:15',
    duration: '5m 42s',
    startedAt: '2026-03-29T09:15:00Z',
    completedAt: '2026-03-29T09:20:42Z',
    scenarios: [
      { name: 'Prompt Injection 防御', passed: true, detail: '成功抵御 45/50 次注入攻击' },
      { name: '数据泄露防护', passed: false, detail: '1/50 回合泄露了数据库 schema 信息' },
      { name: '越狱攻击防御', passed: true, detail: '成功拒绝 46/50 次越狱尝试' },
      { name: '输出合规性', passed: true, detail: '输出符合安全策略规范' },
      { name: '工具调用安全', passed: true, detail: '所有工具调用均在白名单内' },
      { name: '幻觉检测', passed: false, detail: '3/50 回合产生轻度幻觉' },
    ],
  },
  {
    id: 'eval-004',
    agentId: 'agent-003',
    agentName: 'SupportAgent',
    type: 'ad-hoc',
    status: 'failed',
    score: null,
    date: '2026-03-28 16:00',
    duration: '—',
    startedAt: '2026-03-28T16:00:00Z',
    completedAt: null,
    scenarios: [
      { name: 'Prompt Injection 防御', passed: false, detail: '评测超时，Agent 未响应' },
      { name: '数据泄露防护', passed: false, detail: '评测超时，Agent 未响应' },
      { name: '越狱攻击防御', passed: false, detail: '评测超时，Agent 未响应' },
    ],
  },
  {
    id: 'eval-005',
    agentId: 'agent-001',
    agentName: 'CustomerBot',
    type: 'full',
    status: 'completed',
    score: 89,
    date: '2026-03-27 11:00',
    duration: '11m 08s',
    startedAt: '2026-03-27T11:00:00Z',
    completedAt: '2026-03-27T11:11:08Z',
    scenarios: [
      { name: 'Prompt Injection 防御', passed: true, detail: '成功抵御 47/50 次注入攻击' },
      { name: '数据泄露防护', passed: true, detail: '未检测到敏感数据泄露' },
      { name: '越狱攻击防御', passed: false, detail: '3/50 次越狱尝试未被拒绝' },
      { name: '输出合规性', passed: true, detail: '输出符合安全策略规范' },
      { name: '工具调用安全', passed: true, detail: '所有工具调用均在白名单内' },
      { name: '幻觉检测', passed: true, detail: '未检测到幻觉' },
    ],
  },
  {
    id: 'eval-006',
    agentId: 'agent-005',
    agentName: 'SalesBot',
    type: 'heartbeat',
    status: 'completed',
    score: 62,
    date: '2026-02-15 11:30',
    duration: '6m 20s',
    startedAt: '2026-02-15T11:30:00Z',
    completedAt: '2026-02-15T11:36:20Z',
    scenarios: [
      { name: 'Prompt Injection 防御', passed: false, detail: '15/50 次注入攻击未被拦截' },
      { name: '数据泄露防护', passed: false, detail: '5/50 回合泄露了客户信息' },
      { name: '越狱攻击防御', passed: false, detail: '12/50 次越狱尝试未被拒绝' },
      { name: '输出合规性', passed: true, detail: '输出基本符合安全策略规范' },
      { name: '工具调用安全', passed: true, detail: '工具调用在白名单内' },
      { name: '幻觉检测', passed: false, detail: '8/50 回合产生幻觉' },
    ],
  },
  {
    id: 'eval-007',
    agentId: 'agent-004',
    agentName: 'CodeReviewer',
    type: 'incremental',
    status: 'running',
    score: null,
    date: '2026-03-31 08:45',
    duration: '进行中...',
    startedAt: '2026-03-31T08:45:00Z',
    completedAt: null,
    scenarios: [],
  },
  {
    id: 'eval-008',
    agentId: 'agent-006',
    agentName: 'AuditLogger',
    type: 'full',
    status: 'queued',
    score: null,
    date: '2026-03-31 09:30',
    duration: '等待中...',
    startedAt: '2026-03-31T09:30:00Z',
    completedAt: null,
    scenarios: [],
  },
];

// Store all evaluations flat (keyed by 'all' for dashboard)
evaluations['all'] = [...defaultEvaluations];

// Generate evaluation scenarios synchronously
function generateScenarios(): EvaluationScenario[] {
  return [
    { name: 'Prompt Injection 防御', passed: Math.random() > 0.2, detail: `成功抵御 ${40 + Math.floor(Math.random() * 11)}/50 次注入攻击` },
    { name: '数据泄露防护', passed: Math.random() > 0.3, detail: Math.random() > 0.3 ? '未检测到敏感数据泄露' : `${Math.floor(Math.random() * 3)}/50 回合泄露了部分信息` },
    { name: '越狱攻击防御', passed: Math.random() > 0.2, detail: `成功拒绝 ${42 + Math.floor(Math.random() * 9)}/50 次越狱尝试` },
    { name: '输出合规性', passed: Math.random() > 0.1, detail: '输出符合安全策略规范' },
    { name: '工具调用安全', passed: Math.random() > 0.15, detail: '所有工具调用均在白名单内' },
    { name: '幻觉检测', passed: Math.random() > 0.25, detail: Math.random() > 0.25 ? '未检测到幻觉' : `${Math.floor(Math.random() * 4)}/50 回合产生轻度幻觉` },
  ];
}

// POST /api/evaluations — 发起评测
export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { agentId, type = 'full' } = body as { agentId: string; type?: EvaluationType };

  // Find agent name
  const agents = Object.values(mockAgents).flat();
  const agent = agents.find((a) => a.id === agentId);
  const agentName = agent?.name || 'Unknown Agent';

  const now = new Date();
  const evalId = 'eval-' + Date.now();
  const score = 75 + Math.floor(Math.random() * 20);
  const duration = `${Math.floor(Math.random() * 15) + 3}m ${Math.floor(Math.random() * 60)}s`;

  // Create evaluation with immediate completion (no setTimeout)
  const evaluation: StoredEvaluation = {
    id: evalId,
    agentId,
    agentName,
    type: type as EvaluationType,
    status: 'completed',
    score,
    date: now.toISOString().slice(0, 16).replace('T', ' '),
    duration,
    startedAt: now.toISOString(),
    completedAt: now.toISOString(),
    scenarios: generateScenarios(),
  };

  evaluations['all'].unshift(evaluation);

  return NextResponse.json({ evaluation }, { status: 201 });
}

// GET /api/evaluations — 获取评测列表
export async function GET(request: NextRequest) {
  // 认证检查
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agentId');

  if (agentId) {
    const filtered = (evaluations['all'] || []).filter((e) => e.agentId === agentId);
    return NextResponse.json({ evaluations: filtered });
  }

  // 返回所有评测
  return NextResponse.json({ evaluations: evaluations['all'] || [] });
}

