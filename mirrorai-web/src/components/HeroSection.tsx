import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20 pb-12 relative overflow-hidden">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, rgba(167,139,250,0.1) 40%, transparent 70%)' }}
      />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: 'rgba(96,165,250,0.3)' }}
      />

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-8 bg-orange/10 text-orange border border-orange/20 shadow-[0_0_20px_rgba(255,107,53,0.15)] relative z-10 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
        面向企业级应用场景的底层隔离协议
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold leading-tight mb-6 tracking-tight relative z-10">
        下一代 AI Agent <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange via-[#ff9a5c] to-purple-400">
          安全免疫与治理中枢
        </span>
      </h1>
      <p className="text-base md:text-xl text-dim max-w-[750px] mb-10 relative z-10 leading-relaxed font-light">
        赋能企业构建零风险、可审计的自动代理生命周期体系。<br className="hidden md:block" />
        让每一次 Agent 大模型决策皆可追溯、每一行沙盒输出皆全程管控。
      </p>

      {/* Terminal demo - Mac Style Upgrade */}
      <div className="max-w-[650px] w-full mx-auto bg-[#0d0d14]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 text-left relative z-10 mb-12 ring-1 ring-white/5">
        <div className="px-4 py-3 bg-[#16162a]/80 backdrop-blur-sm flex items-center justify-between border-b border-black/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[11px] font-medium tracking-widest text-dim font-mono">NODE_ENV=production</div>
          <div className="w-[44px]" />
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          <div><span className="text-green mr-2">➜</span> <span className="text-blue">~/project</span> npm install @mirrorai/blackbox</div>
          <div className="text-dim pl-5 mb-2">+ @mirrorai/blackbox@2.0.0 installed securely.</div>
          <div><span className="text-green mr-2">➜</span> <span className="text-blue">~/project</span> npx mirrorai analyze agent-v2</div>
          <div className="text-green pl-5 mt-1">✔ Security Core: 99/100 (Pass)</div>
          <div className="text-green pl-5">✔ Anti-Prompt Injection: Protected</div>
          <div className="text-yellow pl-5">⚠ PII Compliance: 85/100 (1 Warning - Masking Applied)</div>
          <div className="text-dim pl-5 mt-2">=======================================</div>
          <div className="text-[#ffffff] font-bold pl-5">🎖️ MirrorAI Trust Certificate Issued: Grade S</div>
          <div className="text-dim pl-5 mb-2">Signature: ed25519_a7f9b8...</div>
          <div><span className="text-green mr-2">➜</span> <span className="text-blue">~/project</span> <span className="animate-pulse">_</span></div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap justify-center relative z-10 mb-14">
        <Link href="/#start" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-[#ffffff] bg-gradient-to-r from-orange to-red-500 shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)] hover:-translate-y-1 transition-all duration-300">
          🚀 免费评测您的首个 Agent
        </Link>
        <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-text bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-orange/50 hover:text-[#ffffff] transition-all duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          查看开源仓库
        </a>
      </div>

      <div className="flex gap-10 flex-wrap justify-center relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 shadow-2xl">
        {[
          { num: '25', label: '防护与评测维度' },
          { num: '5', label: '系统能力评级 S-D' },
          { num: '100+', label: '零日对抗动态用例' },
          { num: '99.9%', label: '脱敏/拦截准确率' },
        ].map((s, i) => (
          <div key={i} className="text-center px-4">
            <div className="text-3xl font-black bg-gradient-to-r from-orange to-red-400 bg-clip-text text-transparent mb-1 drop-shadow-sm">{s.num}</div>
            <div className="text-xs text-dim font-medium tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

