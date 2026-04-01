import { SiteHeader } from "@/components/layout/SiteHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, ShieldCheck, Plug, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "金刚石热沉 - 半导体封装散热方案 | 创电云",
  description:
    "为半导体封装量身打造的高性能散热基座，有效提升器件寿命与可靠性。",
};

/* ── page ─────────────────────────────────────────────────── */
export default function SinkPage() {
  return (
    <>
      <SiteHeader />
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl">
          <Link
            href="/products/heat-management"
            className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> 返回散热产品总览
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            金刚石热沉
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            为半导体封装量身打造的高性能散热基座，有效提升器件寿命与可靠性。
          </p>
        </div>
      </section>

      {/* 核心参数表 */}
      <section className="py-20 bg-slate-950">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">核心参数</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 px-6 text-slate-400 font-medium">参数</th>
                  <th className="py-4 px-6 text-slate-400 font-medium">规格</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["热导率", "1200 ~ 2000 W/mK"],
                  ["结构类型", "整体式 / 夹层式"],
                  ["尺寸", "按需定制"],
                  ["安装方式", "焊接 / 烧结 / 导热胶"],
                  ["绝缘电阻", "> 10¹² Ω"],
                  ["工作温度", "-55°C ~ +300°C"],
                ].map(([param, spec], i) => (
                  <tr key={param} className={i < 5 ? "border-b border-slate-800" : ""}>
                    <td className="py-4 px-6 text-slate-300">{param}</td>
                    <td className="py-4 px-6 text-white font-medium">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 产品特点 */}
      <section className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">产品特点</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard
              icon={Layers}
              title="结构灵活"
              desc="整体式适合标准封装，夹层式可匹配不同 CTE，满足多样化封装需求。"
              color="text-cyan-400"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="高可靠性"
              desc="金刚石化学惰性，耐腐蚀、耐高温，长期使用无性能衰减。"
              color="text-blue-400"
            />
            <FeatureCard
              icon={Plug}
              title="即插即用"
              desc="多种安装方式（焊接/烧结/导热胶）适配主流封装工艺。"
              color="text-purple-400"
            />
          </div>
        </div>
      </section>

      {/* 典型应用 */}
      <section className="py-20 bg-slate-950">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">典型应用</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "IGBT/SiC 功率模块",
              "GaN射频器件",
              "高亮度LED封装",
              "航天电子模块",
            ].map((app) => (
              <div
                key={app}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:border-cyan-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <p className="text-slate-200 font-medium">{app}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">获取专业方案</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            我们的工程师团队将为您提供定制化金刚石热沉解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales@scdc.cloud"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Mail className="mr-2 w-5 h-5" /> 获取报价
            </a>
            <Link
              href="/products/heat-management"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-full border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              返回产品总览 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

/* ── sub-components ───────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors">
      <Icon className={`w-8 h-8 ${color} mb-4`} />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}