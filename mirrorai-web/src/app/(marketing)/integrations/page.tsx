import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '框架集成 — MirrorAI',
  description: 'MirrorAI 支持 OpenClaw、LangChain、CrewAI 及任意框架集成。一行代码接入Agent安全评估。',
};

const integrations = [
  {
    icon: '🦞',
    name: 'OpenClaw',
    method: 'Plugin 自动拦截',
    desc: '作为 OpenClaw Plugin 直接挂载，自动拦截 Agent 的所有工具调用和决策过程。零代码侵入，即插即用。',
    code: `import { MirrorAIPlugin } from '@mirrorai/openclaw-plugin';

const agent = new OpenClawAgent({
  plugins: [
    new MirrorAIPlugin({
      agentId: 'my-agent',
      apiKey: 'mai_xxxx',
      redact: ['email', 'phone', 'ssn'],
      recordDecisions: true,
      tamperProof: true,
    }),
  ],
});

// Agent 自动录制，无需额外代码
await agent.run('帮我分析用户数据');`,
    features: ['自动拦截所有工具调用', '决策过程自动录制', 'PII自动脱敏', 'Ed25519签名防篡改'],
  },
  {
    icon: '🦜',
    name: 'LangChain',
    method: 'Callback Handler',
    desc: '通过 LangChain 的 Callback 机制一行接入。自动捕获 Chain 执行、LLM 调用和 Tool 使用的完整轨迹。',
    code: `from mirrorai import MirrorAICallbackHandler

handler = MirrorAICallbackHandler(
    agent_id="my-agent",
    api_key="mai_xxxx",
    redact_patterns=["email", "phone"],
)

chain = LLMChain(llm=llm, prompt=prompt)
result = chain.invoke(
    {"input": "分析销售数据"},
    config={"callbacks": [handler]}
)

# 自动生成签名审计报告
report = handler.generate_report()`,
    features: ['一行代码接入', '自动捕获LLM调用链', 'Tool使用记录', '异步批量上报'],
  },
  {
    icon: '🤖',
    name: 'CrewAI',
    method: 'Crew Wrapper',
    desc: '包装整个 Crew 和 Agent，透明拦截 CrewAI 的任务分配、Agent 协作和工具调用全过程。',
    code: `from mirrorai.crewai import MirrorAICrewWrapper
from crewai import Agent, Task, Crew

wrapper = MirrorAICrewWrapper(
    agent_id="my-crew",
    api_key="mai_xxxx",
)

# 包装 Agent 和 Crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
)

# 自动录制整个 Crew 执行过程
monitored_crew = wrapper.wrap(crew)
result = monitored_crew.kickoff()`,
    features: ['包装Agent和Crew', '任务分配追踪', '多Agent协作录制', '工具调用全链路'],
  },
  {
    icon: '🔧',
    name: '任意框架',
    method: 'createMiddleware()',
    desc: '不使用以上框架？通用 Middleware 适配任何 Agent 实现。手动标记关键决策点，灵活控制录制粒度。',
    code: `import { 
  MirrorBlackbox, 
  Guard,       // 输入过滤
  Shield,      // 输出审查  
  Gate,        // 权限网关
  Interceptor, // 自动拦截器
  MirrorAIClient // SaaS客户端
} from '@mirrorai/blackbox';

// 方式一：使用 Interceptor 自动拦截
const interceptor = new Interceptor({
  agentId: 'my-agent',
  apiKey: 'mai_xxxx',
  redact: { patterns: ['email', 'phone'] },
});

const safeAgent = interceptor.wrap(async (input) => {
  const reasoning = await llm.think(input);
  const action = await llm.decide(reasoning);
  return await execute(action);
});

// 方式二：使用 Guard/Shield/Gate 精细控制
const guard = new Guard({ filters: ['pii', 'toxic'] });
const shield = new Shield({ rules: ['no-secrets', 'no-urls'] });
const gate = new Gate({ maxToolCalls: 10, allowedTools: ['search'] });

const filteredInput = await guard.filter(userInput);
const result = await myAgent(filteredInput);
const safeOutput = await shield.review(result);`,
    features: ['适配任何Agent实现', '输入过滤 + 输出审查', '权限网关控制', '支持流式输出'],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen pt-[60px]">
      {/* Header */}
      <section className="py-20 px-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 bg-[rgba(167,139,250,0.15)] text-purple border border-[rgba(167,139,250,0.3)]">
          INTEGRATIONS
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🔗 框架集成</h1>
        <p className="text-dim text-lg max-w-lg mx-auto">
          一行代码接入你喜爱的 Agent 框架
        </p>
      </section>

      {/* Integration Cards */}
      <section className="max-w-[1100px] mx-auto px-8 pb-16">
        <div className="space-y-12">
          {integrations.map((int, i) => (
            <div key={int.name} className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-border">
                <div className="flex items-start gap-4 flex-wrap">
                  <span className="text-4xl">{int.icon}</span>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-extrabold">{int.name}</h2>
                      <span className="px-2 py-0.5 bg-[rgba(255,140,90,0.15)] border border-[rgba(255,140,90,0.3)] rounded text-xs font-bold text-orange">
                        {int.method}
                      </span>
                    </div>
                    <p className="text-dim mt-2 leading-relaxed">{int.desc}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {int.features.map((f) => (
                        <span key={f} className="flex items-center gap-1 text-sm text-dim">
                          <span className="text-green">✓</span> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Code */}
              <div className="p-0">
                <div className="terminal rounded-none border-0">
                  <div className="term-bar">
                    <div className="dot dot-r" />
                    <div className="dot dot-y" />
                    <div className="dot dot-g" />
                    <span className="term-title">{int.name.toLowerCase()}-example</span>
                  </div>
                  <div className="term-body">
                    <pre className="text-sm leading-relaxed whitespace-pre-wrap">{int.code}</pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NPM Packages */}
      <section className="py-16 px-8 bg-gradient-to-b from-bg2 to-[#1a1a2e]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-8">安装包</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: '@mirrorai/blackbox', desc: '核心SDK — 行为录制、Guard/Shield/Gate/Interceptor' },
              { name: '@mirrorai/openclaw-plugin', desc: 'OpenClaw Plugin 集成' },
              { name: '@mirrorai/langchain', desc: 'LangChain Callback Handler' },
              { name: '@mirrorai/crewai', desc: 'CrewAI Crew Wrapper' },
              { name: '@mirrorai/middleware', desc: '通用 Middleware' },
              { name: 'mirrorai (Python)', desc: 'Python 核心包' },
            ].map((pkg) => (
              <div key={pkg.name} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
                <div>
                  <code className="text-orange text-sm font-bold">{pkg.name}</code>
                  <p className="text-dim text-xs mt-1">{pkg.desc}</p>
                </div>
                <code className="text-dim text-xs bg-[#0c0c14] px-2 py-1 rounded">
                  npm i {pkg.name.split(' ')[0]}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 max-w-[700px] mx-auto text-center">
        <h2 className="text-2xl font-extrabold mb-3">30秒接入你的Agent</h2>
        <p className="text-dim mb-6">选择你的框架，一行代码开始录制</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)]">
            免费开始
          </Link>
          <a href="https://github.com/mirrorai-ai/mirrorai" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-text border border-border hover:border-orange">
            查看文档
          </a>
        </div>
      </section>
    </div>
  );
}

