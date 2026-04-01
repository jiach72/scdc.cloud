import type { Metadata } from 'next';
import DocCard from '@/components/DocCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '技术文档 — MirrorAI',
  description: '深入了解MirrorAI的技术原理、评测方法和实现细节。白皮书、算法详解、评测标准、攻击场景、提升指南。',
};

const coreDocs = [
  {
    icon: '🏗️',
    title: '技术架构白皮书',
    titleEn: 'Technical Whitepaper',
    description: '三层架构设计——评测层、证据层、监控层。从Agent行为录制到防篡改审计的完整技术链路。',
    descriptionEn: 'Three-layer architecture: Evaluation, Evidence, and Monitoring.',
    href: '/docs/whitepaper',
    tag: '核心 / Core',
    tagColor: 'orange' as const,
  },
  {
    icon: '🔬',
    title: '原创算法详解',
    titleEn: 'Original Algorithms',
    description: '熵动力学监控、狄利克雷行为建模、轻量防篡改——3个原创算法的原理和性能数据。',
    descriptionEn: 'Entropy Dynamics, Dirichlet Model, Lightweight Audit Chain — principles and performance.',
    href: '/docs/algorithms',
    tag: '新 / New',
    tagColor: 'green' as const,
  },
  {
    icon: '📊',
    title: '评测标准',
    titleEn: 'Evaluation Standard',
    description: '5维度25项指标的完整方法论。如何给Agent打分？为什么这些指标重要？',
    descriptionEn: 'Complete methodology of 5 dimensions and 25 indicators.',
    href: '/docs/eval-standard',
    tag: '方法论 / Methodology',
    tagColor: 'blue' as const,
  },
];

const guideDocs = [
  {
    icon: '🚀',
    title: 'Agent提升指南',
    titleEn: 'Upgrade Guide',
    description: '从D级到S级的完整路径。每个等级需要什么？怎么改进？',
    descriptionEn: 'Complete path from D to S grade.',
    href: '/docs/upgrade-guide',
    tag: '开发者 / Developer',
    tagColor: 'purple' as const,
  },
  {
    icon: '🛡️',
    title: '攻击场景库',
    titleEn: 'Attack Scenarios',
    description: '53种Agent攻击场景全览——提示注入、数据泄露、权限越权、逻辑绕过。',
    descriptionEn: '53 Agent attack scenarios — prompt injection, data leakage, privilege escalation.',
    href: '/docs/attacks',
    tag: '安全 / Security',
    tagColor: 'red' as const,
  },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 pt-28 pb-12 relative">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.25), transparent 70%)' }}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight relative z-10">
          技术文档 / <span className="bg-gradient-to-br from-orange to-[#ff9a5c] bg-clip-text text-transparent">Documentation</span>
        </h1>
        <p className="text-base md:text-lg text-dim max-w-[600px] relative z-10">
          深入了解MirrorAI的技术原理、评测方法和实现细节<br />
          Deep dive into our technology, evaluation methodology, and implementation details
        </p>
      </section>

      {/* Core Docs */}
      <section className="py-16 px-8 max-w-[1100px] mx-auto">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)]">
            CORE / 核心
          </span>
          <h2 className="text-2xl font-extrabold mb-1">核心技术文档</h2>
          <p className="text-dim text-sm">理解我们的技术，从这里开始 / Understand our technology, start here</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreDocs.map((d) => (
            <DocCard key={d.href} {...d} />
          ))}
        </div>
      </section>

      {/* Guide Docs */}
      <section className="py-16 px-8 max-w-[1100px] mx-auto">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 bg-[rgba(96,165,250,0.15)] text-blue border border-[rgba(96,165,250,0.3)]">
            GUIDES / 指南
          </span>
          <h2 className="text-2xl font-extrabold mb-1">实用指南</h2>
          <p className="text-dim text-sm">从理解到实践 / From understanding to practice</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {guideDocs.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="flex items-start gap-5 bg-card border border-border rounded-xl p-6 transition-all hover:border-orange hover:-translate-y-0.5 no-underline text-text"
            >
              <div className="text-4xl shrink-0">{d.icon}</div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-text">
                  {d.title}
                  <span className="block text-xs text-dim font-normal">{d.titleEn}</span>
                </h3>
                <p className="text-dim text-sm mb-2">{d.description}<br />{d.descriptionEn}</p>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                  d.tagColor === 'purple' ? 'bg-[rgba(167,139,250,0.15)] text-purple' :
                  d.tagColor === 'red' ? 'bg-[rgba(248,113,113,0.15)] text-red' : ''
                }`}>
                  {d.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8">
        <div className="max-w-[700px] mx-auto text-center bg-gradient-to-br from-[rgba(255,140,90,0.08)] to-[rgba(255,160,100,0.03)] border border-[rgba(255,140,90,0.25)] rounded-2xl p-14">
          <h2 className="text-2xl font-extrabold mb-2">
            准备好评估你的Agent了吗？
            <span className="block text-base text-dim font-normal mt-1">Ready to evaluate your Agent?</span>
          </h2>
          <p className="text-dim mb-6">免费 · 5分钟 · 获得 S/A/B/C/D 评级<br />Free · 5 minutes · Get your S/A/B/C/D rating</p>
          <Link href="/#start" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)]">
            🪞 免费评测 / Free Evaluation
          </Link>
        </div>
      </section>
    </>
  );
}

