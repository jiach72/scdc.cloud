import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import AlgorithmCard from '@/components/AlgorithmCard';
import { CellValue } from '@/components/CellValue';
import { homeComparison } from '@/lib/comparison-data';
import { homeAlgorithms } from '@/lib/algorithm-data';

export const metadata: Metadata = {
  title: 'MirrorAI — 让每只 Agent 都经过系统化安全评估',
  description: 'AI Agent 行为证据平台。评测Agent能力、录制行为证据、持续监控异常。开源、免费、面向Agent的安全评估框架。',
};

const capabilities = [
  { icon: '🎥', title: '行为录制', desc: '自动记录每一次Agent决策、工具调用和推理过程，Ed25519签名防篡改' },
  { icon: '🔒', title: '智能脱敏', desc: '覆盖24个国家200+PII模式的自动脱敏引擎，保护用户隐私' },
  { icon: '📊', title: '多维评测', desc: '5大维度25项指标的标准化Agent能力评测，S/A/B/C/D五级评定' },
  { icon: '🎯', title: '对抗性测试', desc: '53种攻击场景500+变体，自适应红队测试发现安全漏洞' },
  { icon: '🔐', title: '防篡改签名', desc: 'O(log N)轻量审计链，分层哈希映射替代传统Merkle链' },
  { icon: '📡', title: '持续监控', desc: '熵动力学实时检测意图偏移，异常告警与性能劣化追踪' },
  { icon: '🪪', title: 'Agent护照', desc: '标准化能力证书，Ed25519签名可独立验证，建立信任' },
  { icon: '📋', title: '合规报告', desc: '一键生成EU AI Act、SOC2合规审计报告，满足监管要求' },
  { icon: '🛡️', title: '实时输入过滤', desc: 'Guard模块在Agent接收用户输入前实时过滤PII和恶意内容' },
  { icon: '🔍', title: '实时输出审查', desc: 'Shield模块在Agent输出前自动审查，防止泄露机密与不当内容' },
  { icon: '🚪', title: '调用权限控制', desc: 'Gate模块精细控制Agent可调用的工具和次数，防止权限滥用' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Ecosystem Logo Strip (New SaaS Feature) */}
      <section className="py-10 border-y border-white/5 bg-slate-900/30 backdrop-blur-sm overflow-hidden flex flex-col justify-center items-center">
        <p className="text-xs uppercase tracking-widest text-dim font-bold mb-6">无缝集成您的业务基础模型与编排框架</p>
        <div className="flex gap-12 sm:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 flex-wrap justify-center items-center px-4 max-w-5xl">
          <div className="text-xl font-black tracking-tighter text-slate-300 flex items-center gap-2"><div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[10px]">O</div> OpenAI</div>
          <div className="text-xl font-bold tracking-tight text-slate-300">🦜🔗 LangChain</div>
          <div className="text-xl font-serif font-bold text-slate-300 tracking-wider">Anthropic</div>
          <div className="text-xl font-extrabold tracking-tight text-blue-400">Dify<span className="text-[#ffffff]">.AI</span></div>
          <div className="text-xl font-black tracking-tight text-emerald-500">Auto<span className="font-light text-[#ffffff]">Gen</span></div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 px-8 max-w-[1200px] mx-auto relative" id="capabilities">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4 bg-orange/10 text-orange border border-orange/20 uppercase">
            核心能力 Core Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">企业级 Agent 安全治理全矩阵</h2>
          <p className="text-dim text-lg">从沙盒干预到实时防护，11大底层能力守护自动代理的完整生命周期</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {capabilities.map((c) => (
            <div key={c.title} className="group bg-card/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-orange/50 hover:bg-card hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(255,107,53,0.2)]">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:bg-orange/10">
                {c.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-text group-hover:text-orange transition-colors">{c.title}</h3>
              <p className="text-dim text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-8 relative overflow-hidden" id="comparison">
        <div className="absolute inset-0 bg-gradient-to-b from-bg2 via-[#11111a] to-[#1a1a2e] z-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
              横向评测 Benchmark
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">为何将底层栈迁移至 MirrorAI？</h2>
            <p className="text-dim text-lg">业界唯一完全开源且专注于全栈代理安全 (Full-chain Agent Security) 的评估平台</p>
          </div>
          
          <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-5 font-bold text-dim uppercase tracking-wider text-xs border-b border-white/10">核心特性对比</th>
                    <th className="p-5 font-bold text-dim border-b border-white/10">Lakera</th>
                    <th className="p-5 font-bold text-dim border-b border-white/10">Protect AI</th>
                    <th className="p-5 font-bold text-dim border-b border-white/10">Robust Intel</th>
                    <th className="p-5 font-extrabold text-orange border-b border-orange/40 bg-orange/5 text-lg">MirrorAI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {homeComparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 font-semibold text-text">{row.feature}</td>
                      <td className="p-5 text-center"><CellValue value={row.lakera} /></td>
                      <td className="p-5 text-center"><CellValue value={row.protectAI} /></td>
                      <td className="p-5 text-center"><CellValue value={row.robustIntel} /></td>
                      <td className="p-5 text-center bg-orange/[0.03] font-medium"><CellValue value={row.mirrorAI} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/comparison" className="inline-flex items-center space-x-2 text-orange font-bold text-sm hover:text-orange/80 transition-colors group">
              <span>查阅完整白皮书对比</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Algorithms */}
      <section className="py-24 px-8 max-w-[1100px] mx-auto" id="algorithms">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4 bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
            原创理论 Algorithms
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">深度防护模型</h2>
          <p className="text-dim text-lg">摒弃昂贵的 GPU 推理，采用纯数学实现零延迟的实时侦听校验</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {homeAlgorithms.map((a) => (
            <AlgorithmCard key={a.nameEn} {...a} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/algorithms" className="inline-flex items-center space-x-2 text-orange font-bold text-sm hover:text-orange/80 transition-colors group">
            <span>研读核心算法实现</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* How it works (Timeline Style) */}
      <section className="py-24 px-8 bg-slate-900/40 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase">
              接入流 Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">无感串接，极简投产</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-orange/10 via-orange/40 to-orange/10 z-0" />
            
            {[
              { num: '01', title: '探针埋入', desc: 'npm install @mirrorai\n单行代码挂载 Agent 运行时' },
              { num: '02', title: '异步录制', desc: '旁路自动捕捉每一次决策\n工具调参与链式推理过程' },
              { num: '03', title: '沙丘矩阵', desc: '5大维度 25项核心指标\n动态攻防 + 静态黑盒分析' },
              { num: '04', title: '颁发证书', desc: 'Ed25519 防篡改高强度签名\n输出 S/A/B/C 等级通证' },
            ].map((s, i) => (
              <div key={s.num} className="relative z-10 text-center group">
                <div className="w-14 h-14 bg-card border-2 border-orange/50 text-orange rounded-full flex items-center justify-center font-black text-xl mx-auto mb-6 shadow-[0_0_15px_rgba(255,107,53,0.2)] group-hover:scale-110 group-hover:bg-orange group-hover:text-[#ffffff] transition-all duration-300">
                  {s.num}
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#ffffff]">{s.title}</h3>
                <p className="text-dim text-sm whitespace-pre-line leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Demo */}
      <section className="py-24 px-8 max-w-[850px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold">体验 30 秒敏捷改造</h2>
        </div>
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5">
          <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-black">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
             </div>
             <div className="mx-auto text-xs font-mono text-dim">agent-bootstrap.ts</div>
             <div className="w-[44px]" />
          </div>
          <div className="p-6 font-mono text-sm sm:text-base leading-loose overflow-x-auto text-slate-300">
            <div><span className="text-slate-500 italic">// 1. 引入并实例化黑匣子模块</span></div>
            <div><span className="text-purple-400">const</span> box = <span className="text-purple-400">new</span> <span className="text-yellow-200">MirrorBlackbox</span><span className="text-blue-400">{'({'}</span></div>
            <div>&nbsp;&nbsp;agentId: <span className="text-orange-300">&apos;copilot-v1&apos;</span>,</div>
            <div>&nbsp;&nbsp;redact: {'{'} patterns: [<span className="text-orange-300">&apos;email&apos;</span>, <span className="text-orange-300">&apos;pii&apos;</span>] {'}'},</div>
            <div><span className="text-blue-400">{'}'}</span>;</div>
            <br />
            <div><span className="text-slate-500 italic">// 2. 在 Agent 执行钩子中调用</span></div>
            <div><span className="text-purple-400">await</span> box.<span className="text-blue-300">record</span><span className="text-blue-400">{'({'}</span></div>
            <div>&nbsp;&nbsp;input: {'{'} user: <span className="text-orange-300">&apos;清理财务报表数据&apos;</span> {'}'},</div>
            <div>&nbsp;&nbsp;reasoning: <span className="text-orange-300">&apos;调用 Python 沙盒&apos;</span>,</div>
            <div>&nbsp;&nbsp;output: {'{'} status: <span className="text-orange-300">&apos;executing&apos;</span> {'}'},</div>
            <div><span className="text-blue-400">{'}'}</span>;</div>
            <br />
            <div><span className="text-slate-500 italic">// 3. 输出强校验防伪报告</span></div>
            <div><span className="text-purple-400">const</span> report = box.<span className="text-blue-300">generateReport</span>();</div>
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> 风险过滤: 成功 | 篡改保护: 开启 | 评定: A-Class
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA block */}
      <section className="py-24 px-8 relative overflow-hidden" id="start">
        {/* Decorative Grid BG inside CTA */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        
        <div className="max-w-[850px] mx-auto text-center relative z-10 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 sm:p-20 shadow-[0_30px_100px_-20px_rgba(255,107,53,0.15)] ring-1 ring-white/5">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]" />
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#ffffff] drop-shadow-sm">建立对 Agent 的终极信赖</h2>
          <p className="text-xl text-slate-300 mb-10 font-light max-w-2xl mx-auto">完全开源，开箱即用。最快只需 5 分钟即可获取您第一个业务代理机体的多维评估通证。</p>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-[#ffffff] bg-gradient-to-r from-orange to-red-500 shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)] hover:-translate-y-1 transition-all duration-300">
              ⚡ 立即集成防护
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-text bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#ffffff] transition-all duration-300">
              浏览商业订阅指引
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

