'use client';

import { useState, useEffect } from 'react';
import {
  FlaskConical,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Play,
  Loader,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getScoreColor } from '@/lib/score-utils';

interface Evaluation {
  id: string;
  agentId: string;
  agentName: string;
  type: string;
  status: string;
  score: number | null;
  date: string;
  duration: string;
  scenarios: { name: string; passed: boolean; detail: string }[];
}

interface Agent {
  id: string;
  name: string;
}

type FilterStatus = 'all' | 'completed' | 'running' | 'failed' | 'queued';
type FilterType = 'all' | 'full' | 'incremental' | 'heartbeat' | 'ad-hoc';

export default function EvaluationsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterAgent, setFilterAgent] = useState('all');
  const [expandedEval, setExpandedEval] = useState<string | null>(null);
  const [showNewEval, setShowNewEval] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedType, setSelectedType] = useState('full');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/evaluations', { credentials: 'include' }).then(r => r.json()).catch(() => ({ evaluations: [] })),
      fetch('/api/agents', { credentials: 'include' }).then(r => r.json()).catch(() => ({ agents: [] })),
    ]).then(([evalsData, agentsData]) => {
      setEvaluations(evalsData.evaluations || []);
      setAgents(agentsData.agents || []);
    }).finally(() => setLoading(false));
  }, []);

  const handleStartEval = () => {
    if (!selectedAgent) return;
    const agent = agents.find(a => a.id === selectedAgent);

    fetch('/api/evaluations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ agentId: selectedAgent, type: selectedType }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.evaluation) {
          setEvaluations(prev => [data.evaluation, ...prev]);
        }
        setShowNewEval(false);
        setSelectedAgent('');
      })
      .catch(() => {
        // Fallback: add locally
        const newEval: Evaluation = {
          id: `eval-${Date.now()}`,
          agentId: selectedAgent,
          agentName: agent?.name || 'Unknown',
          type: selectedType,
          status: 'running',
          score: null,
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          duration: '进行中...',
          scenarios: [],
        };
        setEvaluations(prev => [newEval, ...prev]);
        setShowNewEval(false);
        setSelectedAgent('');
      });
  };

  const filtered = evaluations.filter((ev) => {
    const matchStatus = filterStatus === 'all' || ev.status === filterStatus;
    const matchType = filterType === 'all' || ev.type === filterType;
    const matchAgent = filterAgent === 'all' || ev.agentName === filterAgent;
    return matchStatus && matchType && matchAgent;
  });

  const uniqueAgents = Array.from(new Set(evaluations.map(e => e.agentName)));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader size={32} className="text-orange animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">评测管理</h1>
          <p className="text-dim text-sm">查看和管理所有 Agent 评测任务</p>
        </div>
        <button
          onClick={() => setShowNewEval(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,140,90,0.2)]"
        >
          <Plus size={16} />
          发起新评测
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange"
        >
          <option value="all">全部</option>
          <option value="completed">已完成</option>
          <option value="running">运行中</option>
          <option value="failed">失败</option>
          <option value="queued">待处理</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange"
        >
          <option value="all">全部</option>
          <option value="full">完整评测</option>
          <option value="incremental">增量评测</option>
          <option value="heartbeat">心跳监控</option>
          <option value="ad-hoc">专项测试</option>
        </select>
        <select
          value={filterAgent}
          onChange={(e) => setFilterAgent(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange"
        >
          <option value="all">所有 Agent</option>
          {uniqueAgents.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Evaluations List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((ev) => (
            <div key={ev.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedEval(expandedEval === ev.id ? null : ev.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      ev.status === 'completed'
                        ? 'bg-[rgba(52,211,153,0.15)]'
                        : ev.status === 'running'
                        ? 'bg-[rgba(96,165,250,0.15)]'
                        : 'bg-[rgba(248,113,113,0.15)]'
                    }`}
                  >
                    {ev.status === 'completed' && <CheckCircle size={18} className="text-green" />}
                    {ev.status === 'running' && <Loader size={18} className="text-blue animate-spin" />}
                    {ev.status === 'failed' && <XCircle size={18} className="text-red" />}
                    {ev.status === 'queued' && <Clock size={18} className="text-yellow" />}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{ev.agentName}</div>
                    <div className="text-dim text-xs flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-bg2 rounded text-xs capitalize">{ev.type}</span>
                      <span>{ev.date}</span>
                      <span>· 耗时 {ev.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {ev.score !== null ? (
                    <span className={`font-bold text-lg ${getScoreColor(ev.score)}`}>
                      {ev.score}
                    </span>
                  ) : (
                    <span className="text-dim text-sm">—</span>
                  )}
                  <StatusBadge status={ev.status} />
                  {expandedEval === ev.id ? (
                    <ChevronUp size={16} className="text-dim" />
                  ) : (
                    <ChevronDown size={16} className="text-dim" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedEval === ev.id && (
                <div className="px-4 pb-4 border-t border-border pt-4">
                  {ev.scenarios && ev.scenarios.length > 0 ? (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-dim mb-3">场景详情</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {ev.scenarios.map((scenario, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2 p-3 rounded-lg ${
                              scenario.passed ? 'bg-[rgba(52,211,153,0.06)]' : 'bg-[rgba(248,113,113,0.06)]'
                            }`}
                          >
                            {scenario.passed ? (
                              <CheckCircle size={14} className="text-green flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle size={14} className="text-red flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="text-sm font-medium">{scenario.name}</div>
                              <div className="text-dim text-xs mt-0.5">{scenario.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-xs text-dim">
                        <span>
                          通过: <span className="text-green font-semibold">
                            {ev.scenarios.filter(s => s.passed).length}
                          </span>/{ev.scenarios.length}
                        </span>
                        <span>
                          失败: <span className="text-red font-semibold">
                            {ev.scenarios.filter(s => !s.passed).length}
                          </span>/{ev.scenarios.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-dim text-sm text-center py-4">
                      {ev.status === 'running' ? '评测进行中，场景详情待生成...' : '暂无场景数据'}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <FlaskConical size={48} className="mx-auto text-dim mb-4" />
            <h3 className="text-lg font-bold mb-2">没有找到评测记录</h3>
            <p className="text-dim text-sm">调整筛选条件或发起新的评测</p>
          </div>
        )}
      </div>

      {/* New Evaluation Modal */}
      <Modal isOpen={showNewEval} onClose={() => setShowNewEval(false)} title="发起新评测" maxWidth="max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dim mb-1">选择 Agent</label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange"
            >
              <option value="">请选择...</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dim mb-1">评测类型</label>
            <div className="space-y-2">
              {[
                { value: 'full', label: 'Full Evaluation', desc: '完整安全评估，约 10-15 分钟' },
                { value: 'incremental', label: 'Incremental', desc: '增量评估，只测试变更' },
                { value: 'heartbeat', label: 'Heartbeat', desc: '快速心跳检测，约 5 分钟' },
              ].map((type) => (
                <label
                  key={type.value}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedType === type.value
                      ? 'bg-orange/10 border border-orange/30'
                      : 'bg-bg2 border border-transparent hover:bg-card-hover'
                  }`}
                >
                  <input
                    type="radio"
                    name="evalType"
                    value={type.value}
                    checked={selectedType === type.value}
                    onChange={() => setSelectedType(type.value)}
                    className="accent-orange mt-0.5"
                  />
                  <div>
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-dim text-xs">{type.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowNewEval(false)}
            className="flex-1 py-2.5 border border-border rounded-lg text-dim hover:text-text transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleStartEval}
            disabled={!selectedAgent}
            className="flex-1 py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Play size={14} /> 开始评测
          </button>
        </div>
      </Modal>
    </div>
  );
}

