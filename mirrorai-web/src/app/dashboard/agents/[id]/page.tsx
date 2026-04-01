'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Bot,
  Shield,
  Clock,
  Activity,
  FlaskConical,
  Play,
  Trash2,
  Key,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Monitor,
  Loader,
} from 'lucide-react';
import { getStatusLabel } from '@/lib/mock-data';
import { formatDate } from '@/lib/format-date';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getScoreColor } from '@/lib/score-utils';

interface Agent {
  id: string;
  name: string;
  description: string;
  framework: string;
  model: string;
  status: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  evaluationCount: number;
  passport?: {
    status: string;
    fingerprint: string;
    expiresAt: string;
  };
}

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

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [agent, setAgent] = useState<Agent | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEval, setExpandedEval] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRunEval, setShowRunEval] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/agents/${id}`, { credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`/api/evaluations?agentId=${id}`, { credentials: 'include' }).then(r => r.json()).catch(() => ({ evaluations: [] })),
    ]).then(([agentData, evalsData]) => {
      setAgent(agentData?.agent || null);
      setEvaluations(evalsData?.evaluations || []);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    fetch(`/api/agents/${id}`, { method: 'DELETE', credentials: 'include' })
      .then(() => router.push('/dashboard/agents'))
      .catch(() => {
        setShowDeleteConfirm(false);
        router.push('/dashboard/agents');
      });
  };

  const handleRunEval = (type: string) => {
    fetch('/api/evaluations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ agentId: id, type }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.evaluation) {
          setEvaluations(prev => [data.evaluation, ...prev]);
        }
        setShowRunEval(false);
      })
      .catch(() => setShowRunEval(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader size={32} className="text-orange animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="text-center py-16">
        <Bot size={48} className="mx-auto text-dim mb-4" />
        <h2 className="text-xl font-bold mb-2">Agent 未找到</h2>
        <p className="text-dim text-sm mb-4">该 Agent 可能已被删除</p>
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center gap-2 text-orange hover:underline"
        >
          <ArrowLeft size={16} /> 返回列表
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/agents"
        className="inline-flex items-center gap-2 text-dim hover:text-text text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        返回 Agent 列表
      </Link>

      {/* Agent Header */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
              <Bot size={24} className="text-orange" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">{agent.name}</h1>
              <p className="text-dim text-sm">{agent.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={agent.status} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-bg2 rounded-lg p-3">
            <div className="flex items-center gap-2 text-dim text-xs mb-1">
              <Shield size={12} />
              框架
            </div>
            <div className="font-medium text-sm">{agent.framework}</div>
          </div>
          <div className="bg-bg2 rounded-lg p-3">
            <div className="flex items-center gap-2 text-dim text-xs mb-1">
              <Activity size={12} />
              模型
            </div>
            <div className="font-medium text-sm">{agent.model}</div>
          </div>
          <div className="bg-bg2 rounded-lg p-3">
            <div className="flex items-center gap-2 text-dim text-xs mb-1">
              <Clock size={12} />
              创建时间
            </div>
            <div className="font-medium text-sm">
              {formatDate(agent.createdAt)}
            </div>
          </div>
          <div className="bg-bg2 rounded-lg p-3">
            <div className="flex items-center gap-2 text-dim text-xs mb-1">
              <FlaskConical size={12} />
              评测次数
            </div>
            <div className="font-medium text-sm">{agent.evaluationCount || evaluations.length}</div>
          </div>
        </div>
      </div>

      {/* Passport Status */}
      {agent.passport && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Key size={18} className="text-orange" />
            护照状态
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-bg2 rounded-lg p-4">
              <div className="text-dim text-xs mb-1">状态</div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    agent.passport.status === 'valid'
                      ? 'bg-green'
                      : agent.passport.status === 'expiring'
                      ? 'bg-yellow'
                      : 'bg-red'
                  }`}
                />
                <span className="font-medium text-sm">
                  {agent.passport.status === 'valid' ? '有效' : agent.passport.status === 'expiring' ? '即将过期' : '已过期'}
                </span>
              </div>
            </div>
            <div className="bg-bg2 rounded-lg p-4">
              <div className="text-dim text-xs mb-1">指纹</div>
              <div className="font-mono text-xs break-all">{agent.passport.fingerprint}</div>
            </div>
            <div className="bg-bg2 rounded-lg p-4">
              <div className="text-dim text-xs mb-1">有效期至</div>
              <div className="font-medium text-sm">
                {formatDate(agent.passport.expiresAt)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Monitoring */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Monitor size={18} className="text-orange" />
          实时监控
        </h2>
        <p className="text-dim text-sm text-center py-4">监控功能开发中，暂无数据</p>
      </div>

      {/* Evaluation History */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">评测历史</h2>
          <button
            onClick={() => setShowRunEval(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] border-none font-bold rounded-lg text-xs hover:opacity-90 transition-opacity"
          >
            <Play size={12} />
            发起评测
          </button>
        </div>

        {evaluations.length > 0 ? (
          <div className="space-y-3">
            {evaluations.map((ev) => (
              <div key={ev.id} className="bg-bg2 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedEval(expandedEval === ev.id ? null : ev.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-card-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FlaskConical size={14} className="text-orange flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm capitalize">{ev.type} Evaluation</span>
                      <span className="text-dim text-xs ml-2">{ev.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ev.score !== null ? (
                      <span className={`font-bold text-sm ${getScoreColor(ev.score)}`}>
                        {ev.score}/100
                      </span>
                    ) : (
                      <span className="text-dim text-sm">—</span>
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        ev.status === 'completed'
                          ? 'text-green'
                          : ev.status === 'running'
                          ? 'text-blue'
                          : 'text-red'
                      }`}
                    >
                      {getStatusLabel(ev.status)}
                    </span>
                    {expandedEval === ev.id ? (
                      <ChevronUp size={14} className="text-dim" />
                    ) : (
                      <ChevronDown size={14} className="text-dim" />
                    )}
                  </div>
                </button>
                {expandedEval === ev.id && ev.scenarios && ev.scenarios.length > 0 && (
                  <div className="px-3 pb-3 space-y-2">
                    {ev.scenarios.map((scenario, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2 rounded bg-bg"
                      >
                        {scenario.passed ? (
                          <CheckCircle size={14} className="text-green flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle size={14} className="text-red flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{scenario.name}</div>
                          <div className="text-dim text-xs">{scenario.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-dim text-sm text-center py-8">暂无评测记录</p>
        )}
      </div>

      {/* Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">操作</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowRunEval(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] border-none font-bold rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            <Play size={14} /> 发起评测
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-red/30 text-red font-bold rounded-lg text-sm hover:bg-red/10 transition-colors"
          >
            <Trash2 size={14} /> 删除 Agent
          </button>
        </div>
      </div>

      {/* Run Eval Modal */}
      <Modal isOpen={showRunEval} onClose={() => setShowRunEval(false)} title="发起评测" maxWidth="max-w-md">
        <p className="text-dim text-sm mb-4">
          为 <strong className="text-text">{agent.name}</strong> 发起安全评测
        </p>
        <div className="space-y-3 mb-6">
          {['full', 'incremental', 'heartbeat'].map((type) => (
            <button
              key={type}
              onClick={() => handleRunEval(type)}
              className="w-full flex items-center gap-3 p-3 bg-bg2 rounded-lg cursor-pointer hover:bg-card-hover transition-colors text-left"
            >
              <div>
                <div className="font-medium text-sm capitalize">{type} Evaluation</div>
                <div className="text-dim text-xs">
                  {type === 'full' && '完整安全评估，耗时约 10-15 分钟'}
                  {type === 'incremental' && '增量评估，只测试变更部分'}
                  {type === 'heartbeat' && '快速心跳检测，约 5 分钟'}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRunEval(false)}
            className="flex-1 py-2.5 border border-border rounded-lg text-dim hover:text-text transition-colors"
          >
            取消
          </button>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="确认删除" maxWidth="max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={24} className="text-red" />
        </div>
        <p className="text-dim text-sm mb-6">
          确定要删除 <strong className="text-text">{agent.name}</strong> 吗？
          此操作不可撤销，所有相关评测数据和证书将被永久删除。
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="flex-1 py-2.5 border border-border rounded-lg text-dim hover:text-text transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-2.5 bg-red text-[#ffffff] font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            确认删除
          </button>
        </div>
      </Modal>
    </div>
  );
}
