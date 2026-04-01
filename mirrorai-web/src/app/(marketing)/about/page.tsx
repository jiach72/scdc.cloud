import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于我们 — MirrorAI',
  description: '了解MirrorAI的使命、团队和核心价值观。让每只AI Agent都安全可信。',
};

const team = [
  {
    name: '李明',
    role: '创始人 & CEO',
    roleEn: 'Founder & CEO',
    desc: '前大厂AI安全负责人，10年AI/ML经验。',
    avatar: '👨‍💻',
  },
  {
    name: '张华',
    role: '首席科学家',
    roleEn: 'Chief Scientist',
    desc: '密码学与统计学博士，专注AI行为分析研究。',
    avatar: '👩‍🔬',
  },
  {
    name: '王强',
    role: 'CTO',
    roleEn: 'CTO',
    desc: '全栈工程师，分布式系统专家，开源贡献者。',
    avatar: '🧑‍💻',
  },
];

const values = [
  {
    icon: '🔍',
    title: '透明',
    titleEn: 'Transparency',
    desc: '开源代码，公开算法，让每个人都能审查我们的工作。',
  },
  {
    icon: '🧮',
    title: '纯数学',
    titleEn: 'Pure Math',
    desc: '用数学而非魔法解决问题。不依赖黑盒LLM，所有方法可验证。',
  },
  {
    icon: '🤝',
    title: '可信',
    titleEn: 'Trustworthy',
    desc: 'Ed25519签名、不可篡改审计链、零知识证明——我们用技术建立信任。',
  },
  {
    icon: '⚡',
    title: '极致性能',
    titleEn: 'Performance',
    desc: '亚毫秒级延迟，零GPU依赖。安全不应该牺牲性能。',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 pt-28 pb-12 relative">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.25), transparent 70%)' }}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight relative z-10">
          关于我们 / <span className="bg-gradient-to-br from-orange to-[#ff9a5c] bg-clip-text text-transparent">About Us</span>
        </h1>
        <p className="text-base md:text-lg text-dim max-w-[600px] relative z-10">
          让每只AI Agent都安全可信
        </p>
      </section>

      {/* Mission */}
      <section className="py-16 px-8 max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)]">
            MISSION
          </span>
          <h2 className="text-3xl font-extrabold mb-2">我们的使命</h2>
          <p className="text-dim">让每只Agent都安全可信 / Make Every Agent Safe and Trustworthy</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-lg text-dim leading-relaxed mb-6">
            AI Agent 正在改变世界，但<span className="text-text font-semibold">安全问题</span>也随之而来。
            我们相信，<span className="text-text font-semibold">可评测的 AI 才是可信赖的 AI</span>。
          </p>
          <p className="text-lg text-dim leading-relaxed mb-6">
            MirrorAI 致力于成为 AI Agent 时代的<span className="text-text font-semibold">评测基础设施</span>，
            通过纯数学方法、开源工具和标准化评测，让每一个 Agent 都有据可查、有证可验。
          </p>
          <p className="text-lg text-dim leading-relaxed">
            我们的核心理念：<strong className="text-text">行为证据优于功能测试。</strong>
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-8 max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(96,165,250,0.15)] text-blue border border-[rgba(96,165,250,0.3)]">
            TEAM
          </span>
          <h2 className="text-3xl font-extrabold mb-2">核心团队</h2>
          <p className="text-dim">我们是一群热爱AI安全的工程师和研究者</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-card border border-border rounded-xl p-8 text-center transition-all hover:border-orange hover:-translate-y-1">
              <div className="text-6xl mb-4">{m.avatar}</div>
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <p className="text-orange text-sm font-semibold mb-1">{m.role}</p>
              <p className="text-dim text-xs mb-3">{m.roleEn}</p>
              <p className="text-dim text-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-8 max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(52,211,153,0.15)] text-green border border-[rgba(52,211,153,0.3)]">
            VALUES
          </span>
          <h2 className="text-3xl font-extrabold mb-2">核心价值观</h2>
          <p className="text-dim">驱动我们前进的原则</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card border border-border rounded-xl p-8 transition-all hover:border-orange hover:-translate-y-0.5">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="text-lg font-bold mb-1">
                {v.title}
                <span className="text-dim text-sm font-normal ml-2">{v.titleEn}</span>
              </h3>
              <p className="text-dim text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8">
        <div className="max-w-[700px] mx-auto text-center bg-gradient-to-br from-[rgba(255,140,90,0.08)] to-[rgba(255,160,100,0.03)] border border-[rgba(255,140,90,0.25)] rounded-2xl p-14">
          <h2 className="text-2xl font-extrabold mb-2">
            加入我们，一起构建可信的AI未来
            <span className="block text-base text-dim font-normal mt-1">Join us in building a trustworthy AI future</span>
          </h2>
          <p className="text-dim mb-6">
            开源 · 开放 · 可信赖<br />
            Open Source · Open · Trustworthy
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://github.com/mirrorai-ai/mirrorai" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)]">
              💻 GitHub
            </a>
            <Link href="/#start"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-text border border-border hover:border-orange">
              🪞 免费评测
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

