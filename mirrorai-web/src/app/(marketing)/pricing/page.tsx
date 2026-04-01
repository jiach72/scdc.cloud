import type { Metadata } from 'next';
import { Check, Zap, Building2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '定价 — MirrorAI',
  description: 'MirrorAI 定价方案 — 从免费开源到企业定制，选择适合你的方案',
};

const plans = [
  {
    key: 'opensource',
    name: 'Open Source',
    price: '$0',
    period: '',
    desc: '适合个人开发者和开源项目',
    features: [
      'SDK全量功能',
      '53种攻击场景',
      '本地评测运行',
      '社区支持',
      'GitHub Issues',
      'MIT 开源协议',
    ],
    cta: { label: '开始使用', href: 'https://github.com/mirrorai-ai/mirrorai', external: true },
    style: 'default' as const,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$99',
    period: '/月',
    desc: '适合团队和成长型企业',
    features: [
      'Web Dashboard 管理面板',
      '合规报告（EU AI Act / SOC2）',
      '团队协作（5人）',
      '优先技术支持',
      '每月100次评测',
      'API 访问权限',
    ],
    cta: { label: '立即升级', href: '/register' },
    style: 'featured' as const,
    badge: '最受欢迎',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: '联系我们',
    period: '',
    desc: '适合大型企业和高安全要求场景',
    features: [
      'SSO 单点登录',
      'SLA 99.9% 可用性保障',
      '专属客户成功经理',
      'On-Premise 私有部署',
      '无限评测次数',
      '定制集成与开发',
    ],
    cta: { label: '联系销售', href: 'mailto:dev@mirrorai.ai', external: true },
    style: 'default' as const,
    icon: <Building2 size={20} />,
  },
];

const faqs = [
  { q: 'Open Source 版本有什么限制？', a: 'Open Source 版本包含完整的 SDK 功能和53种攻击场景，可以在本地运行评测。区别在于没有 Web Dashboard 和团队协作功能。' },
  { q: 'Pro 版本的评测次数用完怎么办？', a: '超出100次评测后，可以按需购买额外评测包，或升级到 Enterprise 版本享受无限评测。' },
  { q: 'Enterprise 版本支持哪些部署方式？', a: '支持 On-Premise 私有部署、VPC 部署和混合云部署。我们提供完整的部署文档和专属技术支持。' },
  { q: '可以免费试用 Pro 版本吗？', a: '注册后即可获得14天 Pro 版本免费试用，无需信用卡。' },
  { q: '数据安全如何保障？', a: '所有数据加密存储（AES-256），Ed25519 签名防篡改，符合 GDPR 要求。Enterprise 版本支持完全私有部署。' },
  { q: '支持哪些付款方式？', a: '支持信用卡、银行转账和支付宝。Enterprise 版本支持对公转账和年度合同。' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-[60px]">
      {/* Header */}
      <section className="py-20 px-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)]">
          PRICING
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">简单透明的定价</h1>
        <p className="text-dim text-lg max-w-lg mx-auto">
          从免费开源开始，按需升级。所有方案包含核心评估能力。
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-[1100px] mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col ${
                plan.style === 'featured'
                  ? 'border-orange shadow-[0_0_40px_rgba(255,140,90,0.15)]'
                  : 'border-border hover:border-orange transition-colors'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)]">
                    <Zap size={12} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-extrabold mb-1">{plan.name}</h3>
              <p className="text-dim text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-dim text-sm">{plan.period}</span>}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-green flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.cta.external ? (
                <a
                  href={plan.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 rounded-xl font-bold text-sm text-center transition-opacity hover:opacity-90 ${
                    plan.style === 'featured'
                      ? 'bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_20px_rgba(255,140,90,0.2)]'
                      : 'border border-border text-text hover:border-orange'
                  }`}
                >
                  {plan.icon && <span className="inline-flex items-center gap-1">{plan.icon} </span>}
                  {plan.cta.label}
                </a>
              ) : (
                <Link
                  href={plan.cta.href}
                  className={`block w-full py-3 rounded-xl font-bold text-sm text-center transition-opacity hover:opacity-90 ${
                    plan.style === 'featured'
                      ? 'bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_20px_rgba(255,140,90,0.2)]'
                      : 'border border-border text-text hover:border-orange'
                  }`}
                >
                  {plan.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="max-w-[900px] mx-auto px-8 pb-16">
        <h2 className="text-2xl font-extrabold text-center mb-8">功能对比</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">MirrorAI 定价方案对比</caption>
            <thead>
              <tr>
                <th className="text-left p-4 bg-card border border-border text-dim font-semibold">功能</th>
                <th className="p-4 bg-card border border-border text-dim font-semibold text-center">Open Source</th>
                <th className="p-4 bg-card border border-border text-orange font-bold text-center">Pro</th>
                <th className="p-4 bg-card border border-border text-dim font-semibold text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['SDK 全量功能', '✅', '✅', '✅'],
                ['53种攻击场景', '✅', '✅', '✅'],
                ['本地评测', '✅', '✅', '✅'],
                ['Web Dashboard', '❌', '✅', '✅'],
                ['合规报告', '❌', '✅', '✅'],
                ['团队协作', '❌', '5人', '不限'],
                ['评测次数', '不限（本地）', '100次/月', '不限'],
                ['技术支持', '社区', '优先支持', '专属支持'],
                ['SSO', '❌', '❌', '✅'],
                ['SLA', '—', '—', '99.9%'],
                ['On-Premise', '本地运行', '❌', '✅'],
                ['定制集成', '❌', '❌', '✅'],
              ].map(([feature, oss, pro, ent]) => (
                <tr key={feature as string} className="hover:bg-card-hover transition-colors">
                  <td className="p-4 border border-border font-semibold">{feature}</td>
                  <td className="p-4 border border-border text-center">{oss}</td>
                  <td className="p-4 border border-border text-center bg-[rgba(255,140,90,0.03)]">{pro}</td>
                  <td className="p-4 border border-border text-center">{ent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[700px] mx-auto px-8 pb-20">
        <h2 className="text-2xl font-extrabold text-center mb-8">常见问题</h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold mb-2">{item.q}</h3>
              <p className="text-dim text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

