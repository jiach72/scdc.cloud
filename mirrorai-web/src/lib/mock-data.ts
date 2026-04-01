/**
 * MirrorAI Dashboard — Shared Mock Data
 * All data is fictional and for demo purposes only.
 */

// ─── Status Label Mapping ────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  active: '活跃',
  warning: '警告',
  inactive: '未激活',
  completed: '已完成',
  running: '运行中',
  failed: '失败',
  expired: '已过期',
  revoked: '已吊销',
  pending: '待处理',
  queued: '待处理',
  paid: '已支付',
  restricted: '受限',
  suspended: '已暂停',
};

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status.toLowerCase()] || status;
}

const STATUS_UPPER_LABELS: Record<string, string> = {
  ACTIVE: '活跃',
  WARNING: '警告',
  INACTIVE: '未激活',
  COMPLETED: '已完成',
  RUNNING: '运行中',
  FAILED: '失败',
  EXPIRED: '已过期',
  REVOKED: '已吊销',
  PENDING: '待处理',
  QUEUED: '待处理',
  PAID: '已支付',
};

export function getStatusUpperLabel(status: string): string {
  return STATUS_UPPER_LABELS[status.toUpperCase()] || status;
}

// ─── Types ───────────────────────────────────────────────────────────────────────

export interface MockAgent {
  id: string;
  name: string;
  description: string;
  framework: string;
  model: string;
  status: 'active' | 'warning' | 'inactive' | 'restricted' | 'suspended';
  score: number;
  createdAt: string;
  updatedAt: string;
  evaluationCount: number;
  passport: {
    status: 'valid' | 'expiring' | 'expired';
    fingerprint: string;
    expiresAt: string;
  };
}

export interface MockEvaluation {
  id: string;
  agentId: string;
  agentName: string;
  type: 'full' | 'incremental' | 'heartbeat' | 'ad-hoc';
  status: 'completed' | 'running' | 'failed' | 'queued';
  score: number | null;
  date: string;
  duration: string;
  scenarios: {
    name: string;
    passed: boolean;
    detail: string;
  }[];
}

export interface MockCertificate {
  id: string;
  certNumber: string;
  agentId: string;
  agentName: string;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  capabilityLevel: string;
  securityLevel: string;
  status: 'active' | 'expired' | 'revoked';
  issuedAt: string;
  expiresAt: string;
  merkleRoot: string;
  signature: string;
}

export interface MockAlert {
  id: string;
  agentName: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface MockApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
}

export interface MockTeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar: string;
}

export interface MockInvoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: 'paid' | 'pending' | 'failed';
}

// ─── Data ────────────────────────────────────────────────────────────────────────

export const mockAgents: MockAgent[] = [
  {
    id: 'agent-001',
    name: 'CustomerBot',
    description: '智能客服 Agent，处理邮件和在线聊天支持请求，支持多语言',
    framework: 'LangChain',
    model: 'gpt-4-turbo',
    status: 'active',
    score: 92,
    createdAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-03-30T14:22:00Z',
    evaluationCount: 12,
    passport: {
      status: 'valid',
      fingerprint: 'sha256:a3f8c1d2e4b5...7f9e',
      expiresAt: '2027-02-10T00:00:00Z',
    },
  },
  {
    id: 'agent-002',
    name: 'DataAnalyst Pro',
    description: '数据分析 Agent，自动生成报表、趋势分析和可视化图表',
    framework: 'CrewAI',
    model: 'claude-3-opus',
    status: 'active',
    score: 87,
    createdAt: '2026-01-15T10:30:00Z',
    updatedAt: '2026-03-29T09:15:00Z',
    evaluationCount: 8,
    passport: {
      status: 'valid',
      fingerprint: 'sha256:b7e2f4a1c9d8...3e2a',
      expiresAt: '2027-01-15T00:00:00Z',
    },
  },
  {
    id: 'agent-003',
    name: 'SupportAgent',
    description: '技术支持 Agent，解答产品使用问题和故障排查',
    framework: 'OpenClaw',
    model: 'gpt-4o',
    status: 'warning',
    score: 71,
    createdAt: '2025-12-01T12:00:00Z',
    updatedAt: '2026-03-25T18:40:00Z',
    evaluationCount: 15,
    passport: {
      status: 'expiring',
      fingerprint: 'sha256:c5d9e8b2a7f1...9d4c',
      expiresAt: '2026-04-15T00:00:00Z',
    },
  },
  {
    id: 'agent-004',
    name: 'CodeReviewer',
    description: '代码审查 Agent，自动检测安全漏洞和代码质量问题',
    framework: 'LangChain',
    model: 'claude-3-sonnet',
    status: 'active',
    score: 95,
    createdAt: '2026-03-01T06:00:00Z',
    updatedAt: '2026-03-31T02:10:00Z',
    evaluationCount: 5,
    passport: {
      status: 'valid',
      fingerprint: 'sha256:d1a3b7c5e9f2...6b8e',
      expiresAt: '2027-03-01T00:00:00Z',
    },
  },
  {
    id: 'agent-005',
    name: 'SalesBot',
    description: '销售助手 Agent，处理询价、报价和客户跟进',
    framework: 'Custom',
    model: 'gpt-4',
    status: 'inactive',
    score: 58,
    createdAt: '2025-11-20T09:00:00Z',
    updatedAt: '2026-02-15T11:30:00Z',
    evaluationCount: 3,
    passport: {
      status: 'expired',
      fingerprint: 'sha256:e2f4a8c6b1d3...4a7f',
      expiresAt: '2026-02-20T00:00:00Z',
    },
  },
  {
    id: 'agent-006',
    name: 'AuditLogger',
    description: '审计日志 Agent，负责记录和分析系统操作日志',
    framework: 'LangChain',
    model: 'gpt-4-turbo',
    status: 'restricted',
    score: 45,
    createdAt: '2025-10-05T08:00:00Z',
    updatedAt: '2026-03-20T16:30:00Z',
    evaluationCount: 7,
    passport: {
      status: 'valid',
      fingerprint: 'sha256:f1a2b3c4d5e6...7g8h',
      expiresAt: '2026-10-05T00:00:00Z',
    },
  },
  {
    id: 'agent-007',
    name: 'ReportGen',
    description: '报告生成 Agent，自动生成各类业务报表',
    framework: 'CrewAI',
    model: 'claude-3-sonnet',
    status: 'suspended',
    score: 32,
    createdAt: '2025-09-15T14:00:00Z',
    updatedAt: '2026-03-15T09:00:00Z',
    evaluationCount: 4,
    passport: {
      status: 'expired',
      fingerprint: 'sha256:h9i8j7k6l5m4...3n2o',
      expiresAt: '2026-03-10T00:00:00Z',
    },
  },
];

export const mockEvaluations: MockEvaluation[] = [
  {
    id: 'eval-001',
    agentId: 'agent-004',
    agentName: 'CodeReviewer',
    type: 'full',
    status: 'completed',
    score: 95,
    date: '2026-03-31 02:10',
    duration: '12m 34s',
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
    scenarios: [],
  },
];

export const mockCertificates: MockCertificate[] = [
  {
    id: 'cert-001',
    certNumber: 'MA-2026-001234',
    agentId: 'agent-004',
    agentName: 'CodeReviewer',
    grade: 'S',
    capabilityLevel: 'L3',
    securityLevel: 'S1',
    status: 'active',
    issuedAt: '2026-03-01',
    expiresAt: '2027-03-01',
    merkleRoot: '0x8a7b3c...f9e2d1',
    signature: 'ed25519:sig_a3b8c9d0e1f2...',
  },
  {
    id: 'cert-002',
    certNumber: 'MA-2026-001189',
    agentId: 'agent-001',
    agentName: 'CustomerBot',
    grade: 'A',
    capabilityLevel: 'L3',
    securityLevel: 'S2',
    status: 'active',
    issuedAt: '2026-02-15',
    expiresAt: '2027-02-15',
    merkleRoot: '0x5e4d2a...c8b7f3',
    signature: 'ed25519:sig_d4e5f6a7b8c9...',
  },
  {
    id: 'cert-003',
    certNumber: 'MA-2026-001156',
    agentId: 'agent-002',
    agentName: 'DataAnalyst Pro',
    grade: 'A',
    capabilityLevel: 'L3',
    securityLevel: 'S1',
    status: 'active',
    issuedAt: '2026-01-20',
    expiresAt: '2027-01-20',
    merkleRoot: '0x1f2e3d...a9b8c7',
    signature: 'ed25519:sig_g7h8i9j0k1l2...',
  },
  {
    id: 'cert-004',
    certNumber: 'MA-2025-000998',
    agentId: 'agent-003',
    agentName: 'SupportAgent',
    grade: 'B',
    capabilityLevel: 'L2',
    securityLevel: 'S3',
    status: 'expired',
    issuedAt: '2025-12-01',
    expiresAt: '2026-03-01',
    merkleRoot: '0x9c8b7a...e3d2f1',
    signature: 'ed25519:sig_m3n4o5p6q7r8...',
  },
  {
    id: 'cert-005',
    certNumber: 'MA-2026-001301',
    agentId: 'agent-007',
    agentName: 'ReportGen',
    grade: 'D',
    capabilityLevel: 'L1',
    securityLevel: 'S4',
    status: 'revoked',
    issuedAt: '2026-01-10',
    expiresAt: '2027-01-10',
    merkleRoot: '0x2b3c4d...f5e6a7',
    signature: 'ed25519:sig_x9y8z7w6v5u4...',
  },
];

export const mockAlerts: MockAlert[] = [
  {
    id: 'alert-001',
    agentName: 'SupportAgent',
    level: 'critical',
    message: '安全评分下降至 71，低于安全阈值 (80)',
    timestamp: '2026-03-30T18:40:00Z',
    resolved: false,
  },
  {
    id: 'alert-002',
    agentName: 'DataAnalyst Pro',
    level: 'warning',
    message: '数据泄露防护场景检测到 1 次泄露',
    timestamp: '2026-03-29T09:20:00Z',
    resolved: false,
  },
  {
    id: 'alert-003',
    agentName: 'SalesBot',
    level: 'critical',
    message: 'Agent 连接超时，评测任务失败',
    timestamp: '2026-03-28T16:05:00Z',
    resolved: true,
  },
  {
    id: 'alert-004',
    agentName: 'SupportAgent',
    level: 'warning',
    message: '护照即将过期（剩余 15 天），请及时续期',
    timestamp: '2026-03-27T10:00:00Z',
    resolved: false,
  },
  {
    id: 'alert-005',
    agentName: 'CustomerBot',
    level: 'info',
    message: '增量评测完成，安全评分 92',
    timestamp: '2026-03-30T14:25:00Z',
    resolved: true,
  },
];

export const mockApiKeys: MockApiKey[] = [
  {
    id: 'key-001',
    name: 'Production API Key',
    key: 'mk_live_a3b8c9d0e1f2g3h4...x7y8z9',
    createdAt: '2026-02-01T00:00:00Z',
    lastUsed: '2026-03-31T08:30:00Z',
  },
  {
    id: 'key-002',
    name: 'Development Key',
    key: 'mk_test_d4e5f6a7b8c9d0e1...a2b3c4',
    createdAt: '2026-03-10T00:00:00Z',
    lastUsed: '2026-03-30T22:15:00Z',
  },
];

export const mockTeamMembers: MockTeamMember[] = [
  { id: 'user-001', name: '李明', email: 'liming@example.com', role: 'owner', avatar: 'LM' },
  { id: 'user-002', name: '王芳', email: 'wangfang@example.com', role: 'admin', avatar: 'WF' },
  { id: 'user-003', name: '张伟', email: 'zhangwei@example.com', role: 'member', avatar: 'ZW' },
];

export const mockInvoices: MockInvoice[] = [
  { id: 'inv-20260301', date: '2026-03-01', amount: 0, plan: 'Free', status: 'paid' },
  { id: 'inv-20260201', date: '2026-02-01', amount: 0, plan: 'Free', status: 'paid' },
  { id: 'inv-20260101', date: '2026-01-01', amount: 0, plan: 'Free', status: 'paid' },
  { id: 'inv-20251201', date: '2025-12-01', amount: 29, plan: 'Pro', status: 'paid' },
  { id: 'inv-20251101', date: '2025-11-01', amount: 29, plan: 'Pro', status: 'paid' },
];

// ─── Derived Stats ───────────────────────────────────────────────────────────────

export const dashboardStats = {
  totalAgents: mockAgents.length,
  activeEvaluations: mockEvaluations.filter(e => e.status === 'running' || e.status === 'queued').length,
  avgScore: Math.round(
    mockAgents.filter(a => a.status === 'active').reduce((sum, a) => sum + a.score, 0)
    / mockAgents.filter(a => a.status === 'active').length
  ),
  totalCertificates: mockCertificates.filter(c => c.status === 'active').length,
};

export const agentStatusDistribution = [
  { label: 'Active', count: mockAgents.filter(a => a.status === 'active').length, color: 'bg-green' },
  { label: 'Warning', count: mockAgents.filter(a => a.status === 'warning').length, color: 'bg-yellow' },
  { label: 'Inactive', count: mockAgents.filter(a => a.status === 'inactive').length, color: 'bg-dim' },
  { label: 'Restricted', count: mockAgents.filter(a => a.status === 'restricted').length, color: 'bg-red' },
];

