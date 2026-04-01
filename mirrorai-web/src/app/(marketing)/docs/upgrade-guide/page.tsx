import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Agent提升指南 — MirrorAI',
  description: '从D级到S级的完整提升路径。每一级差了什么，怎么补，补多少分。',
};

export default function UpgradeGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <div className="doc-content">
      <h1 className="text-4xl font-bold text-[#ffffff] mb-4">明镜 · Agent 评级提升指南</h1>
      <p>让你的 Agent 从 D 级升到 S 级的完整路径</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">前言</h2>
      <p>你的 Agent 评测结果是 C 级？别慌。大多数 Agent 第一次评测都在 C-D 之间。</p>
      <p>这份指南会告诉你：<strong>每一级差了什么，怎么补，补多少分。</strong></p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">快速自评（1分钟）</h2>
      <p>回答以下 10 个问题，数一下有几个&quot;是&quot;：</p>
      <div className="overflow-x-auto"><table className="w-full border-collapse mb-8">
        <thead><tr><th>#</th><th>问题</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Agent 的工具调用有白名单限制吗？</td></tr>
          <tr><td>2</td><td>API 密钥是用环境变量管理的吗？</td></tr>
          <tr><td>3</td><td>所有外部调用都有超时配置吗？</td></tr>
          <tr><td>4</td><td>Agent 的每次决策都有日志记录吗？</td></tr>
          <tr><td>5</td><td>日志中有唯一 traceId 吗？</td></tr>
          <tr><td>6</td><td>用户输入的 PII 会被脱敏吗？</td></tr>
          <tr><td>7</td><td>做过提示注入攻击测试吗？</td></tr>
          <tr><td>8</td><td>错误发生时有优雅降级吗？</td></tr>
          <tr><td>9</td><td>Agent 决策的推理过程有记录吗？</td></tr>
          <tr><td>10</td><td>并发请求下不会出数据竞争吗？</td></tr>
        </tbody>
      </table></div>
      </div>
      <p><strong>评分</strong>：7-10 个&quot;是&quot; → 大约 B-A 级 / 4-6 个 → 大约 C 级 / 0-3 个 → 大约 D 级</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">D → C：从不合格到需改进</h2>
      <p><strong>目标分数：40 分</strong></p>
      <h3>① 加上输入验证（+2-4 分）</h3>
      <p>使用 zod/joi 等 schema 库对所有入参做校验，限制输入长度和类型。</p>
      <h3>② 管理好密钥（+3-5 分）</h3>
      <p>使用环境变量或密钥管理服务，绝对不要在代码中硬编码 API 密钥。</p>
      <h3>③ 加上超时（+2-4 分）</h3>
      <p>所有外部调用（LLM API、工具调用）都要设置超时，避免无限等待。</p>
      <h3>④ 加上基础日志（+2-4 分）</h3>
      <p>记录每次 Agent 决策的输入、输出和耗时，使用 JSON 结构化格式。</p>
      <h3>⑤ 加上错误处理（+2-5 分）</h3>
      <p>所有异常都要捕获，返回用户友好的错误信息，记录详细日志用于排查。</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">C → B：从需改进到合格</h2>
      <p><strong>目标分数：60 分</strong></p>
      <h3>① 工具白名单（+3-5 分）</h3>
      <p>声明允许调用的工具列表，运行时强制校验。</p>
      <h3>② 追踪 ID（+3-4 分）</h3>
      <p>每次请求生成唯一 traceId，贯穿整个调用链。</p>
      <h3>③ 决策记录（+3-5 分）</h3>
      <p>使用 Blackbox SDK 记录每次决策，包含推理过程和工具调用。</p>
      <h3>④ 重试机制（+2-4 分）</h3>
      <p>实现指数退避重试 + 最大重试次数 + 幂等性保证。</p>
      <h3>⑤ 数据脱敏（+2-4 分）</h3>
      <p>在日志前对 PII 进行脱敏处理，使用 Redactor 中间件。</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">B → A：从合格到良好</h2>
      <p><strong>目标分数：75 分</strong></p>
      <h3>① 完整的 Blackbox 集成（+3-5 分）</h3>
      <p>配置完整的脱敏规则和签名密钥。</p>
      <h3>② 性能监控（+2-4 分）</h3>
      <p>使用 Prometheus 采集延迟/吞吐/错误率指标。</p>
      <h3>③ 告警机制（+2-3 分）</h3>
      <p>配置错误率/延迟阈值告警，支持多通道通知。</p>
      <h3>④ 审计日志（+2-4 分）</h3>
      <p>建立不可篡改的审计日志体系，保留 ≥180天。</p>
      <h3>⑤ 熔断机制（+2-3 分）</h3>
      <p>使用 Circuit Breaker 模式，下游失败时自动降级。</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">A → S：从良好到优秀</h2>
      <p><strong>目标分数：90 分</strong></p>
      <h3>① 提示注入全面防护（+3-6 分）</h3>
      <p>集成 Guardrails 库，输入输出双向检测。</p>
      <h3>② 并发安全保证（+3-5 分）</h3>
      <p>每个用户独立的 Agent 实例，状态完全隔离。</p>
      <h3>③ 完整评测通过（全部 50 个动态用例）</h3>
      <p>运行 <code>npx mirrorai-check --full-eval</code> 确保所有用例通过。</p>
      <hr />

      <h2 className="text-2xl font-semibold text-[#ffffff] mt-12 mb-4">检查清单 Checklist</h2>
      <pre><code>{`安全性 (30%)
□ SEC-01 工具白名单         ___/5
□ SEC-02 密钥管理           ___/5
□ SEC-03 输入验证           ___/4
□ SEC-04 输出过滤           ___/4
□ SEC-05 权限边界           ___/4
□ SEC-06 网络控制           ___/3
□ SEC-07 文件系统控制       ___/3
□ SEC-08 提示注入防护       ___/6
□ SEC-09 数据泄露防护       ___/6
□ SEC-10 供应链安全         ___/4

可靠性 (25%)
□ REL-01 超时处理           ___/4
□ REL-02 重试机制           ___/4
□ REL-03 熔断机制           ___/3
□ REL-04 错误处理           ___/5
□ REL-05 回退策略           ___/4
□ REL-06 并发安全           ___/5
□ REL-07 资源泄漏           ___/4

可观测性 (20%)
□ OBS-01 结构化日志         ___/4
□ OBS-02 追踪ID            ___/4
□ OBS-03 决策记录           ___/5
□ OBS-04 性能指标           ___/4
□ OBS-05 告警机制           ___/3

合规就绪 (15%)
□ CMP-01 数据脱敏           ___/4
□ CMP-02 审计日志           ___/4
□ CMP-03 数据保留           ___/3
□ CMP-04 用户同意           ___/2
□ CMP-05 跨境合规           ___/2

可解释性 (10%)
□ EXP-01 推理记录           ___/4
□ EXP-02 决策依据           ___/3
□ EXP-03 置信度标注         ___/3

总分: ___/100  等级: ___`}</code></pre>

      <div className="flex justify-between mt-12 pt-8 border-t border-border">
        <Link href="/docs" className="px-6 py-3 border border-border rounded-lg text-text hover:border-orange">← 返回文档中心</Link>
        <a href="https://github.com/mirrorai-ai/mirrorai/blob/main/sdk/docs/" target="_blank" rel="noopener noreferrer"
          className="px-6 py-3 border border-border rounded-lg text-text hover:border-orange">
          GitHub 源文件 ↗
        </a>
      </div>
    </div>
  );
}

