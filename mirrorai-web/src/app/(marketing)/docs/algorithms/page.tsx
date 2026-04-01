import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '原创算法详解 — MirrorAI',
  description: '熵动力学监控、狄利克雷行为建模、轻量防篡改审计——11个核心模块的原理和性能数据。纯数学，零GPU，实时。',
};

export default function AlgorithmsPage() {
  return (
    <div className="max-w-[900px] mx-auto px-8 pt-28 pb-16">
      <h1 className="text-3xl md:text-4xl font-black mb-2">
        原创算法详解 / <span className="bg-gradient-to-br from-orange to-[#ff9a5c] bg-clip-text text-transparent">Original Algorithms</span>
      </h1>
      <p className="text-dim mb-12 max-w-[700px]">
        我们的算法基于一个核心理念：<strong className="text-text">不需要额外的LLM调用，纯数学方法即可实时检测Agent的安全风险。</strong>以下是我们自主研发的11个核心模块。<br /><br />
        Our algorithms are based on one core principle: <strong className="text-text">No extra LLM calls needed — pure mathematical methods can detect Agent security risks in real-time.</strong> Here are our 11 core modules.
      </p>

      {/* Algorithm 1 */}
      <section className="bg-card border border-orange rounded-2xl p-10 mb-10 bg-gradient-to-br from-[rgba(255,140,90,0.06)] to-[rgba(255,140,90,0.02)]">
        <div className="flex items-start gap-4 mb-8">
          <div className="text-5xl shrink-0">⚡</div>
          <div>
            <h2 className="text-2xl font-extrabold mb-1">熵动力学监控</h2>
            <div className="text-dim text-base">Entropy Dynamics Monitor</div>
            <span className="inline-block px-3 py-0.5 rounded-md text-xs font-bold bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)] mt-2">
              🔑 关键创新 / Key Innovation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[rgba(248,113,113,0.12)] text-red mb-3">中文</span>
            <h4 className="text-base font-bold mb-2">核心思想</h4>
            <p className="text-dim text-sm">将AI Agent的推理过程视为一个物理动力系统。当Agent在推理时，底层语言模型每一步都会输出一个概率分布。我们不需要理解这些Token的具体语义，只需要监控概率分布的变化模式。</p>
            <h4 className="text-base font-bold mt-5 mb-2">为什么有效？</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li>正常推理时，Agent的概率分布变化<strong className="text-text">平稳</strong>（熵值稳定或缓慢变化）</li>
              <li>当Agent被攻击或&quot;走神&quot;时，概率分布会发生<strong className="text-text">剧烈波动</strong></li>
              <li>这种波动可以用物理学中的&quot;加速度&quot;和&quot;Jerk（加加速度）&quot;来捕捉</li>
            </ul>
            <h4 className="text-base font-bold mt-5 mb-2">关键指标</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li><strong className="text-text">熵速度</strong>：推理焦点变化的快慢</li>
              <li><strong className="text-text">熵加速度</strong>：不确定性增长的加速度——持续正向加速度是幻觉产生的早期预警信号</li>
              <li><strong className="text-text">熵Jerk</strong>：行为模式的相变信号——突然的Jerk反转意味着Agent的思维方式发生了根本性改变</li>
            </ul>
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[rgba(96,165,250,0.12)] text-blue mb-3">English</span>
            <h4 className="text-base font-bold mb-2">Core Idea</h4>
            <p className="text-dim text-sm">We treat the AI Agent&apos;s reasoning process as a physical dynamical system. At each step, the underlying language model outputs a probability distribution. Instead of understanding the semantics of each token, we monitor the patterns of how these distributions change.</p>
            <h4 className="text-base font-bold mt-5 mb-2">Why Does It Work?</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li>During normal reasoning, the Agent&apos;s probability distribution changes <strong className="text-text">smoothly</strong></li>
              <li>When the Agent is attacked or &quot;drifts,&quot; the distribution experiences <strong className="text-text">dramatic fluctuations</strong></li>
              <li>These fluctuations can be captured using physics concepts: &quot;acceleration&quot; and &quot;Jerk&quot; (3rd-order derivative)</li>
            </ul>
            <h4 className="text-base font-bold mt-5 mb-2">Key Metrics</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li><strong className="text-text">Entropy Velocity</strong>: How fast the reasoning focus shifts</li>
              <li><strong className="text-text">Entropy Acceleration</strong>: Rate of uncertainty growth — sustained positive acceleration is an early warning for hallucination</li>
              <li><strong className="text-text">Entropy Jerk</strong>: Phase transition signal — a sudden Jerk reversal means a fundamental shift in the Agent&apos;s &quot;thinking mode&quot;</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap pt-6 border-t border-border">
          {[
            { value: '87.3%', label: 'Recall / 召回率' },
            { value: '3.8%', label: 'False Positive / 误报率' },
            { value: '<0.5ms', label: 'Step Latency / 单步延迟' },
            { value: '1000×', label: 'vs LLM-as-Judge' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-extrabold text-green">{m.value}</span>
              <span className="text-xs text-dim uppercase tracking-wider mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithm 2 */}
      <section className="bg-card border border-border rounded-2xl p-10 mb-10 hover:border-[rgba(255,140,90,0.4)]">
        <div className="flex items-start gap-4 mb-8">
          <div className="text-5xl shrink-0">📊</div>
          <div>
            <h2 className="text-2xl font-extrabold mb-1">狄利克雷行为建模</h2>
            <div className="text-dim text-base">Dirichlet Behavior Model</div>
            <span className="inline-block px-3 py-0.5 rounded-md text-xs font-bold bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)] mt-2">
              🔑 关键创新 / Key Innovation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[rgba(248,113,113,0.12)] text-red mb-3">中文</span>
            <h4 className="text-base font-bold mb-2">核心思想</h4>
            <p className="text-dim text-sm">用统计学方法为Agent的&quot;正常行为&quot;建立数学模型。每个Agent在执行任务时，工具调用之间存在一定的转移概率。我们用狄利克雷分布来建模这些概率，定义出&quot;正常行为&quot;的数学边界。</p>
            <h4 className="text-base font-bold mt-5 mb-2">为什么有效？</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li><strong className="text-text">不需要预定义规则</strong>，从历史数据自动学习&quot;正常模式&quot;</li>
              <li>贝叶斯更新支持<strong className="text-text">在线学习</strong>，适应Agent行为的正常演变</li>
              <li>马氏距离提供严格的<strong className="text-text">统计学异常判定</strong></li>
            </ul>
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[rgba(96,165,250,0.12)] text-blue mb-3">English</span>
            <h4 className="text-base font-bold mb-2">Core Idea</h4>
            <p className="text-dim text-sm">We use statistical methods to build a mathematical model of an Agent&apos;s &quot;normal behavior.&quot; When an Agent executes tasks, there are specific transition probabilities between tool calls. We model these probabilities using Dirichlet distributions.</p>
            <h4 className="text-base font-bold mt-5 mb-2">Why Does It Work?</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li><strong className="text-text">No predefined rules needed</strong> — automatically learns &quot;normal patterns&quot; from historical data</li>
              <li>Bayesian updating supports <strong className="text-text">online learning</strong>, adapting to normal evolution of Agent behavior</li>
              <li>Mahalanobis distance provides rigorous <strong className="text-text">statistical anomaly detection</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Algorithm 3 */}
      <section className="bg-card border border-border rounded-2xl p-10 mb-12 hover:border-[rgba(255,140,90,0.4)]">
        <div className="flex items-start gap-4 mb-8">
          <div className="text-5xl shrink-0">🔐</div>
          <div>
            <h2 className="text-2xl font-extrabold mb-1">轻量防篡改审计</h2>
            <div className="text-dim text-base">Lightweight Audit Chain</div>
            <span className="inline-block px-3 py-0.5 rounded-md text-xs font-bold bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)] mt-2">
              🔑 关键创新 / Key Innovation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[rgba(248,113,113,0.12)] text-red mb-3">中文</span>
            <h4 className="text-base font-bold mb-2">核心思想</h4>
            <p className="text-dim text-sm">传统Merkle链在长序列下验证延迟线性增长。我们通过<strong className="text-text">分块+增量哈希</strong>的设计，将验证复杂度从O(N)降到O(log N)。</p>
            <h4 className="text-base font-bold mt-5 mb-2">关键设计</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li>事件分成固定大小的块（<strong className="text-text">64个事件/块</strong>）</li>
              <li>块内增量哈希，块间轻量Merkle树</li>
              <li>支持增量追加，<strong className="text-text">不需要重建历史</strong></li>
            </ul>
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[rgba(96,165,250,0.12)] text-blue mb-3">English</span>
            <h4 className="text-base font-bold mb-2">Core Idea</h4>
            <p className="text-dim text-sm">Traditional Merkle chains have linearly growing verification latency for long sequences. Our design uses <strong className="text-text">block-based + incremental hashing</strong> to reduce verification complexity from O(N) to O(log N).</p>
            <h4 className="text-base font-bold mt-5 mb-2">Key Design</h4>
            <ul className="text-dim text-sm list-disc pl-5 space-y-1">
              <li>Events are divided into fixed-size blocks (<strong className="text-text">64 events per block</strong>)</li>
              <li>Intra-block incremental hashing, inter-block lightweight Merkle tree</li>
              <li>Supports incremental append — <strong className="text-text">no need to rebuild history</strong></li>
            </ul>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap pt-6 border-t border-border">
          {[
            { value: '12ms', label: '1000 Events Append' },
            { value: '9ms', label: 'Single Event Verify' },
            { value: '2ms', label: 'Full Chain Verify' },
            { value: 'O(log N)', label: 'Complexity' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-extrabold text-green">{m.value}</span>
              <span className="text-xs text-dim uppercase tracking-wider mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-[rgba(255,140,90,0.08)] to-[rgba(255,160,100,0.03)] border border-[rgba(255,140,90,0.25)] rounded-2xl p-12">
        <h2 className="text-2xl font-extrabold mb-2">
          准备好用这些算法保护你的Agent了吗？
          <span className="block text-sm text-dim font-normal mt-1">Ready to protect your Agent with these algorithms?</span>
        </h2>
        <p className="text-dim mb-6">免费评测 · 纯数学 · 实时检测<br />Free evaluation · Pure math · Real-time detection</p>
        <Link href="/#start" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)]">
          🪞 免费评测 / Free Evaluation
        </Link>
      </div>
    </div>
  );
}

