import type { Metadata } from 'next';
import Link from 'next/link';
import { CellValue } from '@/components/CellValue';
import { fullComparison } from '@/lib/comparison-data';

export const metadata: Metadata = {
  title: '竞品对比 — MirrorAI',
  description: 'MirrorAI vs Lakera vs Protect AI vs Robust Intelligence — 全方位功能对比，为什么选择MirrorAI。',
};

export default function ComparisonPage() {
  return (
    <div className="min-h-screen pt-[60px]">
      {/* Header */}
      <section className="py-20 px-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)]">
          COMPARISON
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">竞品对比</h1>
        <p className="text-dim text-lg max-w-lg mx-auto">
          MirrorAI vs Lakera vs Protect AI vs Robust Intelligence
        </p>
      </section>

      {/* Quick Summary */}
      <section className="max-w-[1100px] mx-auto px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Lakera', highlight: false, desc: '传统LLM安全网关' },
            { name: 'Protect AI', highlight: false, desc: '模型扫描与防护' },
            { name: 'Robust Intelligence', highlight: false, desc: '企业AI验证平台' },
            { name: 'MirrorAI', highlight: true, desc: '开源Agent行为证据平台' },
          ].map((c) => (
            <div key={c.name} className={`bg-card border rounded-xl p-5 text-center ${c.highlight ? 'border-orange shadow-[0_0_30px_rgba(255,140,90,0.15)]' : 'border-border'}`}>
              <h3 className={`font-bold mb-1 ${c.highlight ? 'text-orange' : ''}`}>{c.name}</h3>
              <p className="text-dim text-xs">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="max-w-[1100px] mx-auto px-8 pb-16">
        {fullComparison.map((group) => (
          <div key={group.category} className="mb-8">
            <h2 className="text-lg font-bold mb-3 text-orange">{group.category}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">MirrorAI 与竞品功能对比</caption>
                <thead>
                  <tr>
                    <th className="text-left p-3 bg-card border border-border text-dim font-semibold w-[200px]">功能</th>
                    <th className="p-3 bg-card border border-border text-dim font-semibold text-center">Lakera</th>
                    <th className="p-3 bg-card border border-border text-dim font-semibold text-center">Protect AI</th>
                    <th className="p-3 bg-card border border-border text-dim font-semibold text-center">Robust Intelligence</th>
                    <th className="p-3 bg-card border border-border text-orange font-bold text-center">MirrorAI</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((row) => (
                    <tr key={row.feature} className="hover:bg-card-hover transition-colors">
                      <td className="p-3 border border-border font-medium">{row.feature}</td>
                      <td className="p-3 border border-border text-center"><CellValue value={row.lakera} /></td>
                      <td className="p-3 border border-border text-center"><CellValue value={row.protectAI} /></td>
                      <td className="p-3 border border-border text-center"><CellValue value={row.robustIntel} /></td>
                      <td className="p-3 border border-border text-center bg-[rgba(255,140,90,0.03)]"><CellValue value={row.mirrorAI} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* Why MirrorAI */}
      <section className="py-16 px-8 bg-gradient-to-b from-bg2 to-[#1a1a2e]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-10">为什么选择 MirrorAI？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🪞', title: '业界唯一Agent专项平台', desc: '竞品聚焦LLM层安全，MirrorAI专注Agent行为层面的评估与监控' },
              { icon: '🔓', title: '100%开源', desc: 'MIT协议，完全透明。竞品均为闭源商业产品' },
              { icon: '💰', title: '价格优势', desc: '免费起步，Pro仅$99/月。竞品起步价$200-$500+/月或$50K+/年' },
              { icon: '🔬', title: '原创算法', desc: '熵动力学、狄利克雷建模等4大原创算法，纯数学实时检测' },
              { icon: '📋', title: '完整评测体系', desc: '5维25指标、L1-L3能力等级、S1-S3安全等级，竞品无标准化评测' },
              { icon: '🔗', title: '全框架集成', desc: 'OpenClaw/LangChain/CrewAI/任意框架，一行代码接入' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-dim text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 max-w-[700px] mx-auto text-center">
        <h2 className="text-2xl font-extrabold mb-3">亲自体验差异</h2>
        <p className="text-dim mb-6">免费注册，5分钟完成首次评测</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)]">
            免费开始
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-text border border-border hover:border-orange">
            查看定价
          </Link>
        </div>
      </section>
    </div>
  );
}

