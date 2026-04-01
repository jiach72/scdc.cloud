import { CellValue } from '@/components/CellValue'

export interface ComparisonRow {
  feature: string
  lakera: boolean | string
  protectAI: boolean | string
  robustIntel: boolean | string
  mirrorAI: boolean | string
}

export interface ComparisonCategory {
  category: string
  items: ComparisonRow[]
}

/** Homepage quick comparison (6 rows) */
export const homeComparison: ComparisonRow[] = [
  { feature: 'Agent专项评估', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
  { feature: '开源', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
  { feature: '防篡改审计', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
  { feature: '24国PII脱敏', lakera: '基础', protectAI: '基础', robustIntel: '基础', mirrorAI: '200+模式' },
  { feature: 'EU AI Act报告', lakera: false, protectAI: '基础', robustIntel: '基础', mirrorAI: true },
  { feature: '价格', lakera: '$500+/月', protectAI: '$200/agent/月', robustIntel: '$50K+/年', mirrorAI: '$0—$99/月' },
]

/** Full comparison page data */
export const fullComparison: ComparisonCategory[] = [
  { category: '核心能力', items: [
    { feature: 'Agent专项评估', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
    { feature: '开源', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
    { feature: '行为录制SDK', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
    { feature: '防篡改审计链', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
    { feature: 'Agent护照/证书', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
  ]},
  { category: '安全检测', items: [
    { feature: '提示注入检测', lakera: true, protectAI: true, robustIntel: true, mirrorAI: true },
    { feature: 'PII脱敏', lakera: '基础', protectAI: '基础', robustIntel: '基础', mirrorAI: '24国200+模式' },
    { feature: '对抗性测试', lakera: '基础', protectAI: true, robustIntel: true, mirrorAI: '53种500+变体' },
    { feature: '自适应攻击生成', lakera: false, protectAI: false, robustIntel: false, mirrorAI: true },
    { feature: '实时行为监控', lakera: false, protectAI: '基础', robustIntel: true, mirrorAI: '熵动力学' },
  ]},
  { category: '评测体系', items: [
    { feature: '标准化评测框架', lakera: false, protectAI: false, robustIntel: false, mirrorAI: '5维25指标' },
    { feature: '能力等级评定', lakera: false, protectAI: false, robustIntel: false, mirrorAI: 'S/A/B/C/D' },
    { feature: '安全等级评定', lakera: false, protectAI: false, robustIntel: false, mirrorAI: 'S1/S2/S3' },
    { feature: '动态用例测试', lakera: false, protectAI: '基础', robustIntel: true, mirrorAI: true },
    { feature: '静态代码分析', lakera: false, protectAI: true, robustIntel: true, mirrorAI: true },
  ]},
  { category: '合规报告', items: [
    { feature: 'EU AI Act报告', lakera: false, protectAI: '基础', robustIntel: '基础', mirrorAI: true },
    { feature: 'SOC2合规', lakera: false, protectAI: false, robustIntel: '基础', mirrorAI: true },
    { feature: 'GDPR合规', lakera: '基础', protectAI: true, robustIntel: true, mirrorAI: true },
    { feature: '自定义报告', lakera: false, protectAI: false, robustIntel: true, mirrorAI: true },
  ]},
  { category: '集成能力', items: [
    { feature: 'OpenClaw集成', lakera: false, protectAI: false, robustIntel: false, mirrorAI: 'Plugin' },
    { feature: 'LangChain集成', lakera: true, protectAI: true, robustIntel: true, mirrorAI: 'Callback' },
    { feature: 'CrewAI集成', lakera: false, protectAI: false, robustIntel: false, mirrorAI: 'Wrapper' },
    { feature: '任意框架集成', lakera: false, protectAI: false, robustIntel: false, mirrorAI: 'Middleware' },
  ]},
  { category: '价格与支持', items: [
    { feature: '起步价', lakera: '$500+/月', protectAI: '$200/agent/月', robustIntel: '$50K+/年', mirrorAI: '$0（免费）' },
    { feature: '团队协作', lakera: true, protectAI: true, robustIntel: true, mirrorAI: true },
    { feature: 'SLA保障', lakera: true, protectAI: true, robustIntel: true, mirrorAI: 'Enterprise' },
    { feature: 'On-Premise部署', lakera: 'Enterprise', protectAI: false, robustIntel: true, mirrorAI: 'Enterprise' },
  ]},
]

