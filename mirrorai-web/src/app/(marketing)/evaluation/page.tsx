import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '评测标准 — MirrorAI',
  description: 'MirrorAI Agent评测体系：5维度25指标、L1/L2/L3能力等级、S1/S2/S3安全等级、53种攻击场景分类。',
};

const dimensions = [
  {
    icon: '🔒', name: '安全性', weight: '30%',
    metrics: ['提示注入防护', '数据泄露防护', '权限边界控制', '输出过滤', 'PII脱敏', '工具调用安全', '沙箱隔离', '敏感操作确认', '恶意输入检测', '供应链安全'],
  },
  {
    icon: '🛡️', name: '可靠性', weight: '25%',
    metrics: ['错误处理', '重试机制', '超时控制', '降级策略', '状态一致性', '幂等性', '资源清理'],
  },
  {
    icon: '📡', name: '可观测性', weight: '20%',
    metrics: ['日志完整性', '追踪链路', '指标采集', '告警机制', '审计记录'],
  },
  {
    icon: '📜', name: '合规就绪', weight: '15%',
    metrics: ['EU AI Act对齐', 'GDPR合规', '数据保留策略', '用户同意管理', '审计报告生成'],
  },
  {
    icon: '💡', name: '可解释性', weight: '10%',
    metrics: ['决策路径记录', '推理过程透明', '置信度标注'],
  },
  {
    icon: '⚡', name: '实时防护', weight: '—',
    metrics: ['输入过滤准确率', '输出审查覆盖率', '工具调用权限控制', '防护延迟(<5ms)', '误报率(<0.1%)'],
  },
];

const capabilityLevels = [
  { level: 'L1', name: '基础级', desc: 'Agent能完成基本任务，有基本错误处理和日志记录', color: 'text-yellow' },
  { level: 'L2', name: '增强级', desc: 'Agent具备完善的异常处理、PII脱敏、行为录制和基础安全防护', color: 'text-blue' },
  { level: 'L3', name: '企业级', desc: 'Agent满足企业级安全要求，具备完整审计链、合规报告和持续监控能力', color: 'text-green' },
];

const safetyLevels = [
  { level: 'S1', name: '标准级', desc: '通过基础安全测试，无已知高危漏洞', color: 'text-yellow' },
  { level: 'S2', name: '增强级', desc: '通过对抗性测试，具备基本防御能力，可处理常见攻击', color: 'text-blue' },
  { level: 'S3', name: '最高级', desc: '通过全面红队测试，具备自适应防御能力，满足金融/医疗级安全要求', color: 'text-green' },
];

const evalTypes = [
  { icon: '🧪', name: '动态用例测试', desc: '在真实运行环境中执行预定义测试用例，验证Agent的实际行为表现' },
  { icon: '🔍', name: '静态代码分析', desc: '分析Agent源码和配置，检测安全隐患、权限过宽、密钥泄露等问题' },
  { icon: '🎯', name: '对抗性红队测试', desc: '使用53种攻击场景的500+变体对Agent进行压力测试' },
  { icon: '📊', name: '行为基线分析', desc: '通过统计建模建立Agent行为基线，检测异常偏离' },
  { icon: '📋', name: '合规检查', desc: '对照EU AI Act、SOC2等标准逐项检查合规状态' },
  { icon: '⏱️', name: '持续监控', desc: 'Agent上线后的长期行为监控，检测性能劣化和安全退化' },
  { icon: '⚡', name: '实时防护评测', desc: '评测Guard输入过滤、Shield输出审查、Gate权限控制的准确率、覆盖率和延迟表现' },
];

const attackCategories = [
  { name: '提示注入', count: 12, examples: ['直接注入', '间接注入', '多轮注入', '编码绕过'] },
  { name: '权限滥用', count: 8, examples: ['越权调用', '权限提升', '横向移动'] },
  { name: '数据泄露', count: 9, examples: ['PII提取', '记忆泄露', '日志泄露', '侧信道'] },
  { name: '拒绝服务', count: 6, examples: ['资源耗尽', '死循环', '令牌炸弹'] },
  { name: '逻辑操控', count: 7, examples: ['目标劫持', '价值对齐偏移', '角色扮演攻击'] },
  { name: '工具滥用', count: 6, examples: ['恶意工具调用', '参数注入', '返回值污染'] },
  { name: '供应链攻击', count: 5, examples: ['依赖投毒', '模型篡改', '配置注入'] },
];

export default function EvaluationPage() {
  return (
    <div className="min-h-screen pt-[60px]">
      {/* Header */}
      <section className="py-20 px-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(52,211,153,0.15)] text-green border border-[rgba(52,211,153,0.3)]">
          EVALUATION
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">📋 评测标准</h1>
        <p className="text-dim text-lg max-w-lg mx-auto">
          5维度25指标 · 7种评测类型 · 53种攻击场景 — 业界最全面的Agent评测体系
        </p>
      </section>

      {/* 5 Dimensions */}
      <section className="py-16 px-8 max-w-[1100px] mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-2">5维度 · 25指标</h2>
        <p className="text-dim text-center mb-10">全面评估Agent的每一个关键能力</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {dimensions.map((d) => (
            <div key={d.name} className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">{d.icon}</div>
              <div className="font-bold mb-1">{d.name}</div>
              <div className="text-orange text-sm font-bold mb-3">权重 {d.weight}</div>
              <ul className="text-left space-y-1.5">
                {d.metrics.map((m) => (
                  <li key={m} className="text-dim text-xs flex items-start gap-1.5">
                    <span className="text-green mt-0.5">•</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Capability & Safety Levels */}
      <section className="py-16 px-8 bg-gradient-to-b from-bg2 to-[#1a1a2e]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Capability */}
            <div>
              <h2 className="text-2xl font-extrabold mb-2">能力等级 L1/L2/L3</h2>
              <p className="text-dim text-sm mb-6">衡量Agent的功能完备度</p>
              <div className="space-y-4">
                {capabilityLevels.map((l) => (
                  <div key={l.level} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl font-black ${l.color}`}>{l.level}</span>
                      <span className="font-bold">{l.name}</span>
                    </div>
                    <p className="text-dim text-sm">{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Safety */}
            <div>
              <h2 className="text-2xl font-extrabold mb-2">安全等级 S1/S2/S3</h2>
              <p className="text-dim text-sm mb-6">衡量Agent的安全防护强度</p>
              <div className="space-y-4">
                {safetyLevels.map((l) => (
                  <div key={l.level} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl font-black ${l.color}`}>{l.level}</span>
                      <span className="font-bold">{l.name}</span>
                    </div>
                    <p className="text-dim text-sm">{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Types */}
      <section className="py-16 px-8 max-w-[1100px] mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-2">7种评测类型</h2>
        <p className="text-dim text-center mb-10">从静态到动态，全方位覆盖</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {evalTypes.map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-xl p-6 hover:border-orange transition-colors">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-bold mb-1.5">{t.name}</h3>
              <p className="text-dim text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 53 Attack Scenarios */}
      <section className="py-16 px-8 max-w-[1100px] mx-auto border-t border-border">
        <h2 className="text-2xl font-extrabold text-center mb-2">53种攻击场景 · 7大类</h2>
        <p className="text-dim text-center mb-10">覆盖已知的所有Agent攻击向量</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {attackCategories.map((cat) => (
            <div key={cat.name} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{cat.name}</h3>
                <span className="text-orange text-sm font-bold">{cat.count}种</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.examples.map((ex) => (
                  <span key={ex} className="px-2 py-0.5 bg-[rgba(255,140,90,0.1)] border border-[rgba(255,140,90,0.2)] rounded text-xs text-dim">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <p className="text-dim text-sm">
            7大类：提示注入 · 权限滥用 · 数据泄露 · 拒绝服务 · 逻辑操控 · 工具滥用 · 供应链攻击
          </p>
        </div>
      </section>

      {/* Grading */}
      <section className="py-16 px-8 max-w-[900px] mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-8">综合评级</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">MirrorAI 评测标准</caption>
            <thead>
              <tr>
                <th className="p-4 bg-card border border-border text-left">等级</th>
                <th className="p-4 bg-card border border-border text-left">分数范围</th>
                <th className="p-4 bg-card border border-border text-left">说明</th>
                <th className="p-4 bg-card border border-border text-left">适用场景</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['S', '90-100', '优秀', '金融/医疗级应用'],
                ['A', '75-89', '良好', '企业生产环境'],
                ['B', '60-74', '合格', '一般业务场景'],
                ['C', '40-59', '需改进', '仅限测试环境'],
                ['D', '0-39', '不合格', '不建议上线'],
              ].map(([grade, score, level, scenario]) => (
                <tr key={grade} className="hover:bg-card-hover transition-colors">
                  <td className="p-4 border border-border font-black text-xl">{grade}</td>
                  <td className="p-4 border border-border">{score}</td>
                  <td className="p-4 border border-border">{level}</td>
                  <td className="p-4 border border-border text-dim">{scenario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

