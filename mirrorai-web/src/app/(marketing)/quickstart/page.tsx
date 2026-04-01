import type { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Package, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: '接入向导 — MirrorAI',
  description: '3步快速接入MirrorAI，让你的AI Agent在3分钟内获得安全评测',
};

const steps = [
  {
    number: 1,
    icon: <Package size={28} />,
    title: '安装 SDK',
    titleEn: 'Install SDK',
    desc: '通过 npm 安装 @mirrorai/blackbox SDK，零依赖、轻量级。',
    code: `npm install @mirrorai/blackbox`,
    note: '支持 Node.js 18+、TypeScript 原生支持',
  },
  {
    number: 2,
    icon: <Terminal size={28} />,
    title: '创建 Blackbox 实例',
    titleEn: 'Create Instance',
    desc: '用 API Key 初始化 MirrorBlackbox，配置你的 Agent 连接信息。',
    code: `import { MirrorBlackbox } from '@mirrorai/blackbox';

const blackbox = new MirrorBlackbox({
  apiKey: 'mk_live_your_key_here',
  agentConfig: {
    name: 'MyAgent',
    endpoint: 'http://localhost:3000/chat',
    model: 'gpt-4',
  },
});`,
    note: '支持 OpenAI、Claude、Gemini 等主流模型',
  },
  {
    number: 3,
    icon: <Play size={28} />,
    title: '运行评测',
    titleEn: 'Run Evaluation',
    desc: '一行代码启动 53 种攻击场景评测，获取详细安全报告。',
    code: `const result = await blackbox.evaluate({
  type: 'full',    // 完整评测
  scenarios: 53,   // 53种攻击场景
});

console.log(result.score);         // 87
console.log(result.level);         // { capability: 'L2', security: 'S2' }
console.log(result.scenarios);     // 详细场景结果`,
    note: '评测约 30 秒完成，支持流式返回',
  },
];

export default function QuickstartPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center text-center px-8 pt-28 pb-12 relative">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.25), transparent 70%)' }}
        />
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)] relative z-10">
          QUICKSTART
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight relative z-10">
          3 步接入 / <span className="bg-gradient-to-br from-orange to-[#ff9a5c] bg-clip-text text-transparent">Quick Start</span>
        </h1>
        <p className="text-base md:text-lg text-dim max-w-[600px] relative z-10">
          3 分钟让你的 AI Agent 获得安全评测
        </p>
      </section>

      {/* Steps */}
      <section className="py-16 px-8 max-w-[900px] mx-auto">
        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="glass rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/20 to-[#ff9a5c]/20 flex items-center justify-center text-orange font-black text-xl border border-orange/30">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    {step.title}
                    <span className="text-dim text-base font-medium ml-3">{step.titleEn}</span>
                  </h2>
                  <p className="text-dim text-sm mb-4">{step.desc}</p>

                  {/* Code Block */}
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono whitespace-pre">
                      <code>{step.code}</code>
                    </pre>
                  </div>

                  <p className="text-xs text-dim mt-3 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-orange" />
                    {step.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold mb-8">接下来做什么？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs" className="glass rounded-2xl p-6 hover:border-orange/30 transition-all duration-300 group">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-bold mb-2 group-hover:text-orange transition-colors">完整文档</h3>
              <p className="text-sm text-dim">深入了解所有 API 和配置选项</p>
            </Link>
            <Link href="/evaluation" className="glass rounded-2xl p-6 hover:border-orange/30 transition-all duration-300 group">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold mb-2 group-hover:text-orange transition-colors">在线评测</h3>
              <p className="text-sm text-dim">通过 Web Dashboard 运行你的第一次评测</p>
            </Link>
            <Link href="/algorithms" className="glass rounded-2xl p-6 hover:border-orange/30 transition-all duration-300 group">
              <div className="text-3xl mb-3">🧮</div>
              <h3 className="font-bold mb-2 group-hover:text-orange transition-colors">算法原理</h3>
              <p className="text-sm text-dim">了解熵动力学和博弈论评估方法</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

