import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '技术白皮书 — MirrorAI',
  description: '明镜技术白皮书v1.0——三层架构设计、Blackbox技术架构、安全与隐私体系。',
};

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <div className="doc-content">
      <h1 className="text-4xl font-bold text-[#ffffff] mb-4">明镜技术白皮书 v1.0</h1>
      <p><strong>MirrorAI — AI Agent 行为证据平台</strong></p>
      <p>版本：1.0 | 发布日期：2026年3月 | 分类：技术白皮书 | 保密等级：公开</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">1. 摘要（Executive Summary）</h2>
      <p>AI Agent 正从实验室走向生产环境，但业界缺乏系统化的评测框架和行为审计能力。开发者面对&quot;黑盒&quot;问题：当 Agent 出现异常行为时，无法追溯根因；当需要证明 Agent 可靠性时，没有可量化的指标支撑。</p>
      <p>明镜提出一套三层架构方案——<strong>评测层</strong>（Evaluation）、<strong>证据层</strong>（Evidence）与<strong>监控层</strong>（Monitoring），以&quot;行为证据优于功能测试&quot;为核心理念，通过 Blackbox 录制引擎实现零侵入的行为捕获，结合 Ed25519 签名链确保证据不可篡改，为 AI Agent 提供从开发到生产的全生命周期可观测性保障。</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">2. 问题陈述</h2>
      <h3>2.1 AI Agent 从实验到生产的鸿沟</h3>
      <p>当前 AI Agent 开发面临严峻的工程化挑战。核心原因包括：</p>
      <ul>
        <li><strong>行为不可预测</strong>：Agent 具有自主决策能力，相同输入可能产生不同输出。</li>
        <li><strong>调试成本极高</strong>：单次请求可能包含 20-50 个中间步骤，人工审查不可行。</li>
        <li><strong>缺乏回归基线</strong>：模型更新后，无法快速判断 Agent 行为是否退化。</li>
      </ul>

      <h3>2.2 &quot;黑盒&quot;问题：出了事找不到原因</h3>
      <pre><code>用户投诉：&quot;Agent 给出了错误的退款建议&quot;
    ├── Prompt 变了？─────────────── 不确定
    ├── 模型版本更新了？────────────  可能
    ├── 工具调用参数错了？───────────  无法确认
    ├── 上下文窗口溢出了？───────────  没记录
    └── 系统提示词被绕过了？─────────  未知</code></pre>
      <p>没有完整的调用链记录，排查生产事故如同&quot;盲人摸象&quot;。</p>

      <h3>2.3 缺乏行业标准的评测方法</h3>
      <p>软件工程有成熟的测试体系，但 AI Agent 的评测仍处于&quot;手工评估&quot;阶段：</p>
      <div className="overflow-x-auto"><table className="w-full border-collapse mb-8">
        <thead><tr><th>现状</th><th>问题</th></tr></thead>
        <tbody>
          <tr><td>人工打分</td><td>主观性强，不可复现，成本高</td></tr>
          <tr><td>简单的正确性检查</td><td>只看最终答案，忽略推理过程</td></tr>
          <tr><td>竞赛榜单（Benchmarks）</td><td>静态数据集，与生产场景脱节</td></tr>
        </tbody>
      </table></div>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">3. 明镜方案</h2>
      <h3>3.1 三层架构</h3>
      <pre><code>┌─────────────────────────────────────────────────────────────┐
│                     明镜平台架构                         │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   评测层       │  │   证据层       │  │   监控层       │   │
│  │  Evaluation    │  │   Evidence    │  │  Monitoring   │   │
│  ├───────────────┤  ├───────────────┤  ├───────────────┤   │
│  │ • 25维指标体系 │  │ • Blackbox    │  │ • 实时仪表盘  │   │
│  │ • 自动化评分   │  │   录制引擎    │  │ • 异常告警    │   │
│  │ • 回归对比     │  │ • 脱敏引擎    │  │ • 趋势分析    │   │
│  │ • 基线管理     │  │ • Ed25519签名 │  │ • 事件关联    │   │
│  │ • 报告生成     │  │ • 证据链存储  │  │ • SLA 跟踪    │   │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘   │
│          └──────────────────┼──────────────────┘            │
│                    ┌────────▼────────┐                      │
│                    │   Agent 应用     │                      │
│                    └─────────────────┘                      │
└─────────────────────────────────────────────────────────────┘</code></pre>

      <h3>3.2 核心理念：行为证据 &gt; 功能测试</h3>
      <p>明镜的核心理念：<strong>与其问&quot;Agent 答对了没有&quot;，不如问&quot;Agent 是怎么做出决策的&quot;</strong>。</p>
      <ol>
        <li><strong>从结果评测到过程评测</strong>：记录 Agent 的完整推理链、工具调用序列。</li>
        <li><strong>从人工检查到自动化评分</strong>：基于 25 项可量化指标的自动评分。</li>
        <li><strong>从事后分析到实时监控</strong>：通过证据链实现生产环境的持续可观测性。</li>
      </ol>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">4. 评测方法论</h2>
      <h3>4.1 五个评测维度</h3>
      <div className="overflow-x-auto"><table className="w-full border-collapse mb-8">
        <thead><tr><th>维度</th><th>核心问题</th></tr></thead>
        <tbody>
          <tr><td><strong>安全性 (30%)</strong></td><td>Agent 是否会产生有害或越权行为？</td></tr>
          <tr><td><strong>可靠性 (25%)</strong></td><td>Agent 是否稳定地完成预期任务？</td></tr>
          <tr><td><strong>可观测性 (20%)</strong></td><td>出了事你能不能找到原因？</td></tr>
          <tr><td><strong>合规就绪 (15%)</strong></td><td>能不能通过 GDPR/PIPL 审计？</td></tr>
          <tr><td><strong>可解释性 (10%)</strong></td><td>Agent 做的决定你能不能理解？</td></tr>
        </tbody>
      </table></div>

      <h3>4.2 评分模型</h3>
      <p>综合评分采用加权计算，任何一项维度得分为 0 则总分受限：</p>
      <pre><code>总分 = (安全得分/44 × 30) + (可靠得分/29 × 25)
     + (可观测得分/20 × 20) + (合规得分/15 × 15)
     + (可解释得分/10 × 10)

等级: S(90+) A(75-89) B(60-74) C(40-59) D(0-39)</code></pre>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">5. Blackbox 技术架构</h2>
      <h3>5.1 录制引擎</h3>
      <p><strong>零侵入原则</strong>：Agent 应用无需修改业务代码，通过 SDK 的 monkey-patching 或 middleware 注入机制实现自动录制。</p>
      <ul>
        <li>事件写入采用<strong>无锁环形缓冲区</strong>（Ring Buffer），默认 4096 事件</li>
        <li>序列化采用<strong>二进制格式</strong>（MessagePack），比 JSON 快 3-5 倍</li>
        <li>异步写入：录制操作不阻塞 Agent 主线程，延迟 &lt; 0.5ms（P99）</li>
      </ul>

      <h3>5.2 Ed25519 签名体系</h3>
      <p><strong>设计目标</strong>：确保每条录制事件不可篡改、可独立验证、可形成签名链。</p>
      <ul>
        <li>私钥生成后存储在本地安全存储（macOS Keychain / Linux Secret Service / Windows DPAPI）</li>
        <li>私钥<strong>永不离开用户设备</strong>，明镜服务端只接收公钥</li>
        <li>支持密钥轮换：每 90 天自动提醒，旧公钥保留用于历史记录验证</li>
      </ul>

      <h3>5.3 脱敏引擎</h3>
      <p>三层 PII 检测策略：</p>
      <ol>
        <li><strong>正则模式层</strong>：检测邮箱、手机号、身份证号等结构化 PII</li>
        <li><strong>NER 模型层</strong>：识别人名、地址、组织名等非结构化 PII</li>
        <li><strong>上下文推断层</strong>：通过字段名推断敏感字段</li>
      </ol>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">6. 安全与隐私</h2>
      <ul>
        <li><strong>数据最小化</strong>：脱敏引擎在本地处理，仅上传脱敏后数据</li>
        <li><strong>私钥永不上传</strong>：签名操作在本地完成</li>
        <li><strong>PIPL/GDPR 合规</strong>：支持区域化部署，数据不跨境</li>
      </ul>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">7. 路线图</h2>
      <ul>
        <li><strong>v0.1（当前）</strong>：核心评测框架、Blackbox 录制引擎、Ed25519 签名体系</li>
        <li><strong>v0.5（Q2 2026）</strong>：JavaScript SDK、云端仪表盘、CI/CD 集成</li>
        <li><strong>v1.0（Q3 2026）</strong>：多 Agent 协作评测、合规报告自动生成、企业级部署</li>
        <li><strong>v2.0（Q4 2026）</strong>：Agent 行为保险、联邦评测、Agent 信誉系统</li>
      </ul>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">8. 结论</h2>
      <p>我们相信，<strong>可评测的 AI 才是可信赖的 AI</strong>。明镜致力于成为 AI Agent 时代的评测基础设施，让每一个 Agent 都有据可查、有证可验。</p>
      <p><em>明镜 — 让 AI Agent 的每一个决策都经得起审视。</em></p>

      <div className="flex justify-between mt-12 pt-8 border-t border-border">
        <Link href="/docs" className="px-6 py-3 border border-border rounded-lg text-text hover:border-orange">← 返回文档中心</Link>
        <a href="https://github.com/mirrorai-ai/mirrorai/blob/main/sdk/docs/" target="_blank" rel="noopener noreferrer"
          className="px-6 py-3 border border-border rounded-lg text-text hover:border-orange">
          GitHub 源文件 ↗
        </a>
      </div>
    </div>
    </div>
  );
}

