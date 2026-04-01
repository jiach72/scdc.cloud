import Link from "next/link";
import { ArrowRight, Zap, Shield, Thermometer, Feather, Cpu, Radio, Wifi, Satellite, Microscope, Mail, Phone, MessageCircle, Globe } from "lucide-react";
import type { Metadata } from "next";
import InquiryForm from "@/components/heat/InquiryForm";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "金刚石散热产品 - CVD散热片/热沉/铜金刚石复合材料 | 创电云",
  description:
    "创电云提供CVD金刚石散热片、金刚石热沉、铜-金刚石复合材料等高端散热产品代理服务。热导率高达2200W/mK，适用于半导体、激光、射频等高功率器件。",
  keywords:
    "金刚石散热片,CVD金刚石,金刚石热沉,铜金刚石复合材料,高导热散热,半导体散热,GaN散热,SiC散热",
  openGraph: {
    title: "金刚石散热产品 - CVD散热片/热沉/铜金刚石复合材料 | 创电云",
    description:
      "创电云提供CVD金刚石散热片、金刚石热沉、铜-金刚石复合材料等高端散热产品代理服务。热导率高达2200W/mK，适用于半导体、激光、射频等高功率器件。",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "金刚石散热产品",
  description: "创电云代理的高端人造金刚石散热产品系列",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "CVD金刚石散热片",
      url: "https://scdc.cloud/products/heat-management/cvd",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "金刚石热沉",
      url: "https://scdc.cloud/products/heat-management/sink",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "铜-金刚石复合材料",
      url: "https://scdc.cloud/products/heat-management/composite",
    },
  ],
};

export default function HeatManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/15 via-blue-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-400/10 via-pink-500/5 to-transparent" />
          {/* Diamond sparkle effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.06)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_40%)]" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_100%)]" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-300">
            <Zap className="w-4 h-4" />
            CVD 人造金刚石 · 极致热管理
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              金刚石散热 · 为高功率器件而生
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            CVD金刚石热导率高达2200 W/mK，是铜的5倍。
            半导体、激光、射频器件的终极散热方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact">
              <span className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/25 transition-all">
                获取定制方案 <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
            <Link href="#comparison">
              <span className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-full border border-slate-700 text-slate-300 bg-transparent hover:text-white hover:bg-slate-800 transition-all">
                查看技术参数
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 bg-slate-950">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">核心优势</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdvantageCard icon={Zap} title="极致导热" desc="热导率 2000+ W/mK" sub="铜的5倍" color="text-cyan-400" />
            <AdvantageCard icon={Shield} title="电绝缘" desc="电阻率 >10¹⁴ Ω·cm" sub="无需额外绝缘层" color="text-blue-400" />
            <AdvantageCard icon={Thermometer} title="低热膨胀" desc="CTE 1.0 ppm/K" sub="完美匹配GaN/SiC" color="text-purple-400" />
            <AdvantageCard icon={Feather} title="轻量化" desc="密度仅 3.52 g/cm³" sub="比铜轻60%" color="text-pink-400" />
          </div>
        </div>
      </section>

      {/* 产品矩阵 */}
      <section className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">产品矩阵</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              icon={Zap}
              title="CVD金刚石散热片"
              desc="高端激光/射频器件首选。热导率1000-2200 W/mK，可定制尺寸与金属化。"
              href="/products/heat-management/cvd"
            />
            <ProductCard
              icon={Shield}
              title="金刚石热沉"
              desc="半导体封装标准方案。整体式/夹层式结构，多种安装方式。"
              href="/products/heat-management/sink"
            />
            <ProductCard
              icon={Feather}
              title="铜-金刚石复合材料"
              desc="性价比之选。可定制CTE，兼顾导热与加工性。"
              href="/products/heat-management/composite"
            />
          </div>
        </div>
      </section>

      {/* 应用场景 */}
      <section className="py-20 bg-slate-950">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">应用场景</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SceneCard icon={Cpu} title="半导体封装" desc="GaN / SiC / GaAs" />
            <SceneCard icon={Zap} title="高功率激光二极管" desc="医疗、工业、国防" />
            <SceneCard icon={Radio} title="射频功率放大器" desc="通信基站、雷达" />
            <SceneCard icon={Microscope} title="AI芯片 / GPU散热" desc="数据中心、边缘计算" />
            <SceneCard icon={Wifi} title="5G基站功放模块" desc="大规模MIMO天线" />
            <SceneCard icon={Satellite} title="航天电子器件" desc="卫星、深空探测" />
          </div>
        </div>
      </section>

      {/* 技术对比 */}
      <section id="comparison" className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">材料性能对比</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 px-6 text-slate-400 font-medium">参数</th>
                  <th className="py-4 px-6 text-slate-400 font-medium">铜</th>
                  <th className="py-4 px-6 text-slate-400 font-medium">铝</th>
                  <th className="py-4 px-6 font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">金刚石</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-6 text-slate-300">热导率 W/mK</td>
                  <td className="py-4 px-6 text-slate-400">400</td>
                  <td className="py-4 px-6 text-slate-400">237</td>
                  <td className="py-4 px-6 text-cyan-400 font-bold">2000+</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-6 text-slate-300">电阻率 Ω·cm</td>
                  <td className="py-4 px-6 text-slate-400">1.7×10⁻⁸</td>
                  <td className="py-4 px-6 text-slate-400">2.8×10⁻⁸</td>
                  <td className="py-4 px-6 text-cyan-400 font-bold">&gt;10¹⁴</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-6 text-slate-300">CTE ppm/K</td>
                  <td className="py-4 px-6 text-slate-400">16.5</td>
                  <td className="py-4 px-6 text-slate-400">23.1</td>
                  <td className="py-4 px-6 text-cyan-400 font-bold">1.0</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-slate-300">密度 g/cm³</td>
                  <td className="py-4 px-6 text-slate-400">8.96</td>
                  <td className="py-4 px-6 text-slate-400">2.70</td>
                  <td className="py-4 px-6 text-cyan-400 font-bold">3.52</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 代理优势 */}
      <section className="py-20 bg-slate-950">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">为什么选择我们</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <AdvantageCard icon={Globe} title="多家供应商资源整合" desc="全球优质CVD金刚石制造商直供" sub="" color="text-cyan-400" />
            <AdvantageCard icon={Microscope} title="定制化尺寸与规格" desc="按需切割、研磨、金属化" sub="" color="text-blue-400" />
            <AdvantageCard icon={Zap} title="快速响应与技术支持" desc="专业团队7×24小时服务" sub="" color="text-purple-400" />
            <AdvantageCard icon={Shield} title="批量采购价格优势" desc="规模化采购，成本更优" sub="" color="text-pink-400" />
          </div>
        </div>
      </section>

      {/* 询价表单 */}
      <InquiryForm />

      {/* CTA */}
      <section id="contact" className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">需要散热方案？联系我们</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">专业团队为您提供定制化金刚石散热解决方案</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <ContactCard icon={Mail} label="邮箱" value="sales@scdc.cloud" />
            <ContactCard icon={Phone} label="电话" value="400-XXX-XXXX" />
            <ContactCard icon={MessageCircle} label="微信" value="SCDC_2024" />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

function AdvantageCard({ icon: Icon, title, desc, sub, color }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; sub: string; color: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors">
      <Icon className={`w-8 h-8 ${color} mb-4`} />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{desc}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

function ProductCard({ icon: Icon, title, desc, href }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; href: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-cyan-500/30 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
      <Link href={href} className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        了解更多 <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
}

function SceneCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:border-cyan-500/20 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}


