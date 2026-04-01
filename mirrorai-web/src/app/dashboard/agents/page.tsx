'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Bot,
  Loader,
} from 'lucide-react';
import { AGENT_FRAMEWORKS } from '@/lib/constants';
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
}

type FilterStatus = 'all' | 'active' | 'warning' | 'inactive' | 'restricted' | 'suspended';
type FilterFramework = 'all' | 'langchain' | 'crewai' | 'openclaw' | 'custom';

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterFramework, setFilterFramework] = useState<FilterFramework>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    framework: 'langchain',
    model: '',
  });

  useEffect(() => {
    fetch('/api/agents', { credentials: 'include' })
      .then(r => r.json())
      .then(data => setAgentList(data.agents || []))
      .catch(() => setAgentList([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = agentList.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.description || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchFramework = filterFramework === 'all' || (a.framework || '').toLowerCase() === filterFramework;
    return matchSearch && matchStatus && matchFramework;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;

    fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: createForm.name,
        description: createForm.description,
        framework: createForm.framework,
        model: createForm.model || 'gpt-4',
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.agent) {
          const newAgent: Agent = {
            ...data.agent,
            score: 0,
            evaluationCount: 0,
          };
          setAgentList(prev => [newAgent, ...prev]);
        }
        setCreateForm({ name: '', description: '', framework: 'langchain', model: '' });
        setShowCreate(false);
      })
      .catch(() => {
        // Fallback: add locally
        const newAgent: Agent = {
          id: `agent-${Date.now()}`,
          name: createForm.name,
          description: createForm.description,
          framework: AGENT_FRAMEWORKS.find(f => f.value === createForm.framework)?.label || createForm.framework,
          model: createForm.model || 'gpt-4',
          status: 'active',
          score: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          evaluationCount: 0,
        };
        setAgentList(prev => [newAgent, ...prev]);
        setCreateForm({ name: '', description: '', framework: 'langchain', model: '' });
        setShowCreate(false);
      });
  };

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
          <h1 className="text-2xl font-extrabold mb-1">Agent 管理</h1>
          <p className="text-dim text-sm">管理你的 AI Agent，查看评测状态</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,140,90,0.2)]"
        >
          <Plus size={16} />
          创建 Agent
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索 Agent 名称或描述..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange"
        >
          <option value="all">全部</option>
          <option value="active">活跃</option>
          <option value="warning">警告</option>
          <option value="inactive">未激活</option>
          <option value="restricted">受限</option>
          <option value="suspended">已暂停</option>
        </select>
        <select
          value={filterFramework}
          onChange={(e) => setFilterFramework(e.target.value as FilterFramework)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange"
        >
          <option value="all">所有框架</option>
          {AGENT_FRAMEWORKS.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Agent Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((agent) => (
            <Link
              key={agent.id}
              href={`/dashboard/agents/${agent.id}`}
              className="block bg-card border border-border rounded-xl p-6 hover:border-orange hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bot size={20} className="text-orange" />
                  <h3 className="font-bold text-text">{agent.name}</h3>
                </div>
                <StatusBadge status={agent.status} />
              </div>

              <p className="text-dim text-sm mb-4 line-clamp-2">{agent.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-bg2 rounded-lg p-2.5 text-center">
                  <div className="text-dim text-xs mb-0.5">安全评分</div>
                  <div
                    className={`font-bold text-lg ${agent.score > 0 ? getScoreColor(agent.score) : ''}`}
                  >
                    {agent.score > 0 ? agent.score : '—'}
                  </div>
                </div>
                <div className="bg-bg2 rounded-lg p-2.5 text-center">
                  <div className="text-dim text-xs mb-0.5">评测次数</div>
                  <div className="font-bold text-lg">{agent.evaluationCount || 0}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-dim">
                <span className="px-2 py-0.5 bg-bg2 rounded">{agent.framework}</span>
                <span>{agent.model}</span>
              </div>
              <div className="text-dim text-xs mt-2">
                最近更新：{formatDate(agent.updatedAt)}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Bot size={48} className="mx-auto text-dim mb-4" />
          <h3 className="text-lg font-bold mb-2">没有找到 Agent</h3>
          <p className="text-dim text-sm mb-4">
            {search || filterStatus !== 'all' || filterFramework !== 'all'
              ? '没有匹配的搜索结果，请调整筛选条件'
              : '添加你的第一个 Agent 开始评测'}
          </p>
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="创建 Agent" maxWidth="max-w-md">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dim mb-1">
              名称 <span className="text-red">*</span>
            </label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="例如：CustomerBot"
              required
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dim mb-1">描述</label>
            <textarea
              value={createForm.description}
              onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Agent 的用途描述..."
              rows={3}
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange resize-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dim mb-1">框架</label>
            <select
              value={createForm.framework}
              onChange={(e) => setCreateForm(prev => ({ ...prev, framework: e.target.value }))}
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text focus:outline-none focus:border-orange"
            >
              {AGENT_FRAMEWORKS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dim mb-1">模型名称</label>
            <input
              type="text"
              value={createForm.model}
              onChange={(e) => setCreateForm(prev => ({ ...prev, model: e.target.value }))}
              placeholder="例如：gpt-4, claude-3-opus"
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="flex-1 py-2.5 border border-border rounded-lg text-dim hover:text-text transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              创建
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

