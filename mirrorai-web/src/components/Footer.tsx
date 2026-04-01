import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="text-xl font-extrabold flex items-center gap-2 mb-3">
            <span>🪞</span>
            <span className="text-orange">明镜</span>
            <span className="text-text">MirrorAI</span>
          </div>
          <p className="text-dim text-sm leading-relaxed">
            AI Agent 行为证据平台<br />
            让每只Agent都安全可信
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-bold text-text mb-3">产品</h4>
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-dim hover:text-text transition-colors">首页</Link>
            <Link href="/algorithms" className="text-dim hover:text-text transition-colors">原创算法</Link>
            <Link href="/evaluation" className="text-dim hover:text-text transition-colors">评测标准</Link>
            <Link href="/comparison" className="text-dim hover:text-text transition-colors">竞品对比</Link>
            <Link href="/pricing" className="text-dim hover:text-text transition-colors">定价</Link>
            <Link href="/integrations" className="text-dim hover:text-text transition-colors">框架集成</Link>
          </div>
        </div>

        {/* Docs */}
        <div>
          <h4 className="font-bold text-text mb-3">技术文档</h4>
          <div className="flex flex-col gap-2">
            <Link href="/docs" className="text-dim hover:text-text transition-colors">文档中心</Link>
            <Link href="/docs/whitepaper" className="text-dim hover:text-text transition-colors">白皮书</Link>
            <Link href="/docs/algorithms" className="text-dim hover:text-text transition-colors">算法详解</Link>
            <Link href="/docs/eval-standard" className="text-dim hover:text-text transition-colors">评测标准</Link>
            <Link href="/docs/attacks" className="text-dim hover:text-text transition-colors">攻击场景</Link>
            <Link href="/verify" className="text-dim hover:text-text transition-colors">证书验证</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-text mb-3">联系我们</h4>
          <div className="flex flex-col gap-2">
            <a href="mailto:dev@mirrorai.ai" className="text-dim hover:text-text transition-colors">dev@mirrorai.ai</a>
            <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-text transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/@mirrorai/blackbox" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-text transition-colors">npm</a>
            <span className="text-dim text-xs mt-2">MIT License</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-dim text-xs">
        <p>© 2026 明镜 MirrorAI · 每只Agent都该有一面明镜</p>
        <a href="https://scdc.ai" target="_blank" rel="noopener noreferrer"
          className="text-dim hover:text-orange transition-colors">
          ← 返回创电云
        </a>
      </div>
    </footer>
  );
}

