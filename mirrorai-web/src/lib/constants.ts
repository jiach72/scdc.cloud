export const SITE_CONFIG = {
  name: 'MirrorAI',
  description: 'AI Agent 行为证据平台 — 评测Agent能力、录制行为证据、持续监控异常',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mirrorai.run',
  ogImage: '/og-image.svg',
  links: {
    github: 'https://github.com/jiach72-oss/lobster-academy',
    npm: 'https://www.npmjs.com/package/@mirrorai/blackbox',
    email: 'dev@mirrorai.ai',
  },
} as const;

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    agents: 3,
    evaluations: 10,
    features: ['3 Agents', '10 Evaluations/month', 'Basic reports', 'Community support'],
  },
  pro: {
    name: 'Pro',
    price: 99,
    agents: 20,
    evaluations: 100,
    features: ['20 Agents', '100 Evaluations/month', 'Advanced reports', 'Priority support', 'API access'],
  },
  enterprise: {
    name: 'Enterprise',
    price: null, // 联系销售
    agents: -1, // unlimited
    evaluations: -1,
    features: ['Unlimited Agents', 'Unlimited Evaluations', 'Custom reports', 'Dedicated support', 'SLA', 'SSO'],
  },
} as const;

export const AGENT_FRAMEWORKS = [
  { value: 'openclaw', label: 'OpenClaw' },
  { value: 'langchain', label: 'LangChain' },
  { value: 'crewai', label: 'CrewAI' },
  { value: 'autogen', label: 'AutoGen' },
  { value: 'custom', label: 'Custom' },
] as const;

export const STATUS_COLORS: Record<string, string> = {
  active: 'text-green',
  warning: 'text-yellow',
  restricted: 'text-orange',
  revoked: 'text-red',
  healthy: 'text-green',
  degraded: 'text-yellow',
  unhealthy: 'text-red',
};

