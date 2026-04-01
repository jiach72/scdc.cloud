import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '博客 — MirrorAI',
  description: 'AI Agent安全最新洞察、技术深度文章和产品动态',
};

const posts = [
  {
    slug: 'ai-agent-security-trends-2026',
    title: 'AI Agent安全：2026年企业必须关注的5大趋势',
    titleEn: '5 AI Agent Security Trends for 2026',
    excerpt: '随着AI Agent在企业中的部署规模不断扩大，安全威胁也在快速演变。从提示注入到供应链攻击，本文深入分析2026年最值得关注的5大安全趋势。',
    category: '行业洞察',
    date: '2026-03-28',
    readTime: '8 分钟',
    icon: '📊',
  },
  {
    slug: 'mirrorai-v1-release',
    title: 'MirrorAI v1.0发布：开源Agent安全评估框架',
    titleEn: 'MirrorAI v1.0 Released: Open Source Agent Security Framework',
    excerpt: '我们正式发布MirrorAI v1.0，一个基于纯数学方法的AI Agent安全评估框架。53种攻击场景、Ed25519证书体系、熵动力学监控——一切从开源开始。',
    category: '产品发布',
    date: '2026-03-15',
    readTime: '6 分钟',
    icon: '🚀',
  },
  {
    slug: 'entropy-drift-detection',
    title: '如何用熵动力学监控检测Agent意图偏移',
    titleEn: 'Detecting Agent Intent Drift with Entropy Dynamics',
    excerpt: '本文介绍MirrorAI核心算法——基于KL散度和Jensen-Shannon散度的意图偏移检测。相比传统LLM-as-Judge方法，我们的方案无需GPU、延迟低于0.5ms。',
    category: '技术深度',
    date: '2026-03-01',
    readTime: '12 分钟',
    icon: '🔬',
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center text-center px-8 pt-28 pb-12 relative">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.25), transparent 70%)' }}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight relative z-10">
          博客 / <span className="bg-gradient-to-br from-orange to-[#ff9a5c] bg-clip-text text-transparent">Blog</span>
        </h1>
        <p className="text-base md:text-lg text-dim max-w-[600px] relative z-10">
          AI Agent安全最新洞察、技术深度文章和产品动态
        </p>
      </section>

      {/* Posts */}
      <section className="py-16 px-8 max-w-[900px] mx-auto">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="glass rounded-2xl p-8 hover:border-orange/30 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start gap-6">
                <div className="text-4xl flex-shrink-0">{post.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)]">
                      {post.category}
                    </span>
                    <span className="text-sm text-dim">{post.date}</span>
                    <span className="text-sm text-dim">· {post.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-orange transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-dim text-sm leading-relaxed mb-2">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-dim/60 font-medium">
                    {post.titleEn}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 text-center">
        <div className="glass rounded-2xl p-12 max-w-[600px] mx-auto">
          <h2 className="text-2xl font-bold mb-4">订阅更新</h2>
          <p className="text-dim mb-6">获取最新的 AI Agent 安全洞察和产品动态</p>
          <div className="flex gap-3 max-w-[400px] mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#ffffff] placeholder:text-dim/50 outline-none focus:border-orange/50 transition-colors"
            />
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange to-[#ff9a5c] text-[#ffffff] font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
              订阅
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

