export interface AlgorithmMetric {
  value: string
  label: string
}

export interface AlgorithmDetail {
  principle: string
  innovations: string[]
  metrics_detail: { label: string; value: string }[]
  scenarios: string[]
}

export interface AlgorithmData {
  icon: string
  name: string
  nameEn: string
  tagline: string
  description: string
  metrics: AlgorithmMetric[]
  featured?: boolean
  badge?: string
  details?: AlgorithmDetail
}

/** Compact algorithm cards for homepage */
export const homeAlgorithms: AlgorithmData[] = [
  {
    icon: '⚡',
    name: '熵动力学监控',
    nameEn: 'EntropyMonitor',
    tagline: '三阶导数实时检测意图偏移',
    description: '监控Agent决策模式的变化率，通过熵的高阶导数在Agent做出有害行为之前检测意图偏移。纯数学方法，无需额外LLM调用。',
    metrics: [{ value: '87.3%', label: 'Recall' }, { value: '0.15ms', label: '延迟' }, { value: '1000×', label: 'vs LLM' }],
    featured: true,
    badge: '原创',
  },
  {
    icon: '📊',
    name: '狄利克雷行为建模',
    nameEn: 'DirichletModel',
    tagline: '贝叶斯分布+马氏距离异常检测',
    description: '基于狄利克雷分布对Agent行为模式进行概率建模，通过马氏距离度量检测偏离。在线学习，无需预训练。',
    metrics: [{ value: '3σ', label: '阈值' }, { value: '在线', label: '学习' }, { value: '2ms', label: '检测' }],
  },
  {
    icon: '🔐',
    name: '轻量防篡改审计',
    nameEn: 'LightweightAudit',
    tagline: 'O(log N) 验证延迟',
    description: '分层哈希映射替代完整Merkle链，基于块的增量哈希实现常量验证延迟。即使处理100K+事件序列也能保持高性能。',
    metrics: [{ value: 'O(log N)', label: '验证' }, { value: 'SHA-256', label: '加密' }, { value: '常量', label: '追加' }],
  },
  {
    icon: '🎯',
    name: '自适应攻击生成',
    nameEn: 'AdaptiveFuzzer',
    tagline: 'Bandit算法动态选择攻击策略',
    description: '基于多臂老虎机算法动态选择最有效的攻击策略。53种基础场景通过9种自动变异操作扩展为500+变体。',
    metrics: [{ value: '53→500+', label: '变体' }, { value: '9', label: '变异' }, { value: '自适应', label: '策略' }],
  },
]

/** Full algorithm data for algorithms page (with details) */
export const fullAlgorithms: AlgorithmData[] = [
  {
    ...homeAlgorithms[0],
    tagline: 'Semantic Kinematics — 物理学遇上AI安全',
    description: '将物理学中的"运动学"概念引入AI安全领域。通过追踪Agent决策概率分布的熵值变化，计算熵的一阶导数（变化速度）、二阶导数（加速度）和三阶导数（急动度），在Agent做出有害行为之前检测到意图偏移。',
    details: {
      principle: '监控Agent输出token概率分布的熵值 H(t) = -Σ p_i(t)·log(p_i(t))，通过滑动窗口计算熵的三阶导数（jerk）。当jerk超过阈值时，说明Agent的"思考模式"正在发生剧烈变化，可能正在偏离用户意图。',
      innovations: [
        '首次将运动学三阶导数（jerk）应用于AI行为分析',
        '纯数学方法，无需额外LLM调用，零GPU开销',
        '0.15ms单次检测延迟，支持10K+事件/秒',
        '87.3% Recall，显著优于传统规则引擎',
      ],
      metrics_detail: [
        { label: 'Recall', value: '87.3%' },
        { label: '单次延迟', value: '0.15ms' },
        { label: '吞吐量', value: '10K+ events/s' },
        { label: 'vs LLM Judge', value: '1000× 更快' },
      ],
      scenarios: ['Agent意图偏移检测', '实时行为异常告警', '生产环境持续监控', '长对话安全性保障'],
    },
  },
  {
    ...homeAlgorithms[1],
    tagline: 'Bayesian Agent Fingerprinting',
    description: '使用狄利克雷分布（Dirichlet Distribution）对Agent的行为模式进行概率建模。通过贝叶斯推断定义"正常行为"的统计边界，并利用马氏距离（Mahalanobis Distance）度量当前行为与正常模式的偏离程度。',
    details: {
      principle: '将Agent的每次决策建模为K维狄利克雷分布的采样。通过在线贝叶斯更新维护行为基线，使用马氏距离 d = √((x-μ)ᵀ Σ⁻¹ (x-μ)) 计算当前行为与基线的偏离。当 d > 3σ 时触发异常告警。',
      innovations: [
        '首次将狄利克雷分布应用于Agent行为建模',
        '在线贝叶斯学习，无需预训练数据',
        '自适应基线，自动适应Agent版本更新',
        '马氏距离考虑特征间相关性，减少误报',
      ],
      metrics_detail: [
        { label: '检测阈值', value: '3σ (99.7%)' },
        { label: '学习方式', value: '在线贝叶斯' },
        { label: '检测延迟', value: '2ms' },
        { label: '误报率', value: '<0.3%' },
      ],
      scenarios: ['Agent行为基线建立', '版本更新后行为对比', '多Agent一致性检测', '长期行为趋势分析'],
    },
  },
  {
    ...homeAlgorithms[2],
    tagline: 'O(log N) Tamper-Proof Verification',
    description: '创新的分层哈希映射方案，替代传统的O(N) Merkle链验证。通过将事件序列分块并构建层次化哈希索引，实现O(log N)的验证延迟。即使处理100K+事件序列，验证延迟也保持在毫秒级。',
    details: {
      principle: '将事件序列分为大小为B的块，每个块计算一个哈希。然后对块哈希构建二级索引，以此类推形成对数级层次结构。验证单个事件时，只需验证从该事件到根节点的O(log_B N)个哈希，而非整条链的O(N)个哈希。',
      innovations: [
        '分层哈希映射，验证复杂度从O(N)降至O(log N)',
        '常量时间追加，不影响录制性能',
        '支持增量验证，可验证任意子序列',
        'SHA-256加密强度，防篡改等级等同完整Merkle链',
      ],
      metrics_detail: [
        { label: '验证复杂度', value: 'O(log N)' },
        { label: '追加复杂度', value: 'O(1)' },
        { label: '空间开销', value: '+5%' },
        { label: '支持规模', value: '100K+ 事件' },
      ],
      scenarios: ['大规模Agent行为审计', '合规证据链保全', '跨系统行为追溯', '法律级电子证据'],
    },
  },
  {
    ...homeAlgorithms[3],
    tagline: 'Bandit算法动态选择攻击策略',
    description: '基于多臂老虎机（Multi-Armed Bandit）算法的自适应红队测试引擎。动态选择最有效的攻击策略，将53种基础攻击场景通过9种自动变异操作扩展为500+变体，最大化漏洞发现效率。',
    metrics: [{ value: '53→500+', label: '攻击变体' }, { value: '9种', label: '变异操作' }, { value: '自适应', label: '策略选择' }],
    details: {
      principle: '将每种攻击策略视为一个"臂"，使用UCB（Upper Confidence Bound）算法平衡探索与利用。根据历史成功率动态调整策略权重，优先使用对目标Agent最有效的攻击方式。9种变异操作（同义替换、角色扮演、语言切换等）自动生成变体。',
      innovations: [
        '首次将Bandit算法应用于Agent红队测试',
        '自适应策略选择，攻击效率提升3-5倍',
        '9种变异操作自动生成500+攻击变体',
        '持续学习，适应不同Agent的薄弱点',
      ],
      metrics_detail: [
        { label: '基础场景', value: '53种' },
        { label: '变异操作', value: '9种' },
        { label: '生成变体', value: '500+' },
        { label: '效率提升', value: '3-5×' },
      ],
      scenarios: ['Agent上线前安全评估', '持续红队测试', '新攻击模式发现', '安全防护效果验证'],
    },
  },
]

