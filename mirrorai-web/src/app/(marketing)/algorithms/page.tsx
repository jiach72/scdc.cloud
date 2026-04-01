import type { Metadata } from 'next';
import AlgorithmCard from '@/components/AlgorithmCard';
import { fullAlgorithms } from '@/lib/algorithm-data';

export const metadata: Metadata = {
  title: '原创算法 — MirrorAI',
  description: 'MirrorAI 四大原创算法：熵动力学监控、狄利克雷行为建模、轻量防篡改审计、自适应攻击生成。纯数学、零GPU、实时检测。',
};

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen pt-[60px]">
      {/* Header */}
      <section className="py-20 px-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(96,165,250,0.15)] text-blue border border-[rgba(96,165,250,0.3)]">
          ALGORITHMS
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🔬 四大原创算法</h1>
        <p className="text-dim text-lg max-w-lg mx-auto">
          纯数学 · 零GPU · 实时检测 — 源自前沿研究的创新算法
        </p>
      </section>

      {/* Algorithm Cards */}
      <section className="max-w-[1100px] mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fullAlgorithms.map((a) => (
            <AlgorithmCard key={a.nameEn} {...a} />
          ))}
        </div>
      </section>

      {/* Detailed Sections */}
      {fullAlgorithms.filter(a => a.details).map((a) => {
        const details = a.details!;
        return (
        <section key={a.nameEn} className="py-16 px-8 max-w-[900px] mx-auto border-t border-border" id={a.nameEn.toLowerCase()}>
          <h2 className="text-2xl font-extrabold mb-1">
            {a.icon} {a.name}
          </h2>
          <p className="text-dim text-sm mb-6">{a.nameEn}</p>

          <h3 className="text-lg font-bold mb-3 text-orange">原理简介</h3>
          <p className="text-dim leading-relaxed mb-8">{details.principle}</p>

          <h3 className="text-lg font-bold mb-3 text-orange">核心创新</h3>
          <ul className="space-y-2 mb-8">
            {details.innovations.map((inn, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dim">
                <span className="text-green mt-0.5">✦</span>
                <span>{inn}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mb-3 text-orange">技术指标</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {details.metrics_detail.map((m) => (
              <div key={m.label} className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-green">{m.value}</div>
                <div className="text-xs text-dim mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-3 text-orange">适用场景</h3>
          <div className="flex flex-wrap gap-2">
            {details.scenarios.map((s) => (
              <span key={s} className="px-3 py-1 bg-card border border-border rounded-full text-sm text-dim">
                {s}
              </span>
            ))}
          </div>
        </section>
        );
      })}

      {/* Paper */}
      <section className="py-12 px-8 max-w-[800px] mx-auto">
        <div className="p-6 bg-[rgba(255,140,90,0.08)] rounded-xl border border-[rgba(255,140,90,0.2)] text-center">
          <p className="text-text">
            📄 研究论文：<strong>Semantic Kinematics — Real-time Intent Drift Detection via Entropy Dynamics</strong>
          </p>
          <p className="text-dim text-sm mt-2">可通过邮件索取完整论文</p>
        </div>
      </section>

      {/* Real-time Protection Modules */}
      <section className="py-16 px-8 max-w-[1100px] mx-auto border-t border-border">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(255,140,90,0.15)] text-orange border border-[rgba(255,140,90,0.3)]">
            实时防护模块
          </span>
          <h2 className="text-3xl font-extrabold mb-2">🛡️ Guard · Shield · Gate</h2>
          <p className="text-dim max-w-lg mx-auto">
            基于四大原创算法的实时防护体系，在Agent运行时提供输入过滤、输出审查和权限控制
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🛡️', name: 'Guard', subtitle: '实时输入过滤',
              desc: '在用户输入到达Agent之前进行实时过滤。基于PII检测引擎和恶意内容识别，自动脱敏敏感信息、拦截攻击载荷。',
              metrics: [
                { label: 'PII模式', value: '200+' },
                { label: '检测延迟', value: '<1ms' },
                { label: '支持语言', value: '24国' },
                { label: '误报率', value: '<0.1%' },
              ],
              features: ['PII自动脱敏', '恶意输入拦截', '编码攻击检测', '上下文感知过滤'],
            },
            {
              icon: '🔍', name: 'Shield', subtitle: '实时输出审查',
              desc: '在Agent输出到达用户之前进行自动审查。防止机密数据泄露、不当内容输出和越权信息暴露。',
              metrics: [
                { label: '审查规则', value: '50+' },
                { label: '审查延迟', value: '<2ms' },
                { label: '覆盖类型', value: '12类' },
                { label: '准确率', value: '99.5%' },
              ],
              features: ['机密数据检测', '不当内容过滤', 'URL/密钥审查', '自定义规则引擎'],
            },
            {
              icon: '🚪', name: 'Gate', subtitle: '工具调用权限控制',
              desc: '精细控制Agent可调用的工具和资源访问。防止权限滥用、资源耗尽和横向移动攻击。',
              metrics: [
                { label: '调用限额', value: '可配置' },
                { label: '工具白名单', value: '支持' },
                { label: '速率限制', value: '内置' },
                { label: '审计日志', value: '全链路' },
              ],
              features: ['工具白名单', '调用次数限制', '参数校验', '权限分级控制'],
            },
          ].map((mod) => (
            <div key={mod.name} className="bg-card border border-border rounded-2xl p-6 hover:border-orange transition-colors">
              <div className="text-4xl mb-3">{mod.icon}</div>
              <h3 className="text-xl font-extrabold">{mod.name}</h3>
              <p className="text-orange text-sm font-bold mb-3">{mod.subtitle}</p>
              <p className="text-dim text-sm leading-relaxed mb-4">{mod.desc}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {mod.metrics.map((m) => (
                  <div key={m.label} className="bg-bg2 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-green">{m.value}</div>
                    <div className="text-xs text-dim">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {mod.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 text-xs text-dim">
                    <span className="text-green">✓</span> {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

