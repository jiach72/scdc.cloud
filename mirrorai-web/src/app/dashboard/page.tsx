'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsCard from '@/components/dashboard/StatsCard';
import {
  Bot,
  FlaskConical,
  Award,
  Shield,
  Clock,
  ChevronRight,
  Loader,
} from 'lucide-react';
import { getStatusUpperLabel, getStatusLabel } from '@/lib/mock-data';
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

interface Alert {
  id: string;
  agentName: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved?: boolean;
  acknowledged?: boolean;
}

export default function DashboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/agents', { credentials: 'include' }).then(r => r.json()).catch(() => ({ agents: [] })),
      fetch('/api/evaluations', { credentials: 'include' }).then(r => r.json()).catch(() => ({ evaluations: [] })),
      fetch('/api/alerts', { credentials: 'include' }).then(r => r.json()).catch(() => ({ alerts: [] })),
    ]).then(([agentsData, evalsData, alertsData]) => {
      setAgents(agentsData.agents || []);
      setEvaluations(evalsData.evaluations || []);
      setAlerts(alertsData.alerts || []);
    }).finally(() => setLoading(false));
  }, []);

  const resolveAlert = (id: string) => {
    fetch('/api/alerts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then(() => {
      setAlerts(prev =>
        prev.map(a => (a.id === id ? { ...a, resolved: true, acknowledged: true } : a))
      );
    });
  };

  // Compute stats from real data
  const totalAgents = agents.length;
  const activeEvaluations = evaluations.filter(e => e.status === 'running' || e.status === 'queued').length;
  const activeAgents = agents.filter(a => a.status === 'active');
  const avgScore = activeAgents.length > 0
    ? Math.round(activeAgents.reduce((sum, a) => sum + (a.score || 0), 0) / activeAgents.length)
    : 0;
  const totalCertificates = agents.filter(a => a.status === 'active' && a.score >= 80).length;

  const recentEvaluations = evaluations.slice(0, 5);
  const recentAlerts = alerts.slice(0, 5);

  // Agent status distribution
  const statusCounts = {
    active: agents.filter(a => a.status === 'active').length,
    warning: agents.filter(a => a.status === 'warning').length,
    inactive: agents.filter(a => a.status === 'inactive').length,
    restricted: agents.filter(a => a.status === 'restricted').length,
  };
  const maxStatusCount = Math.max(...Object.values(statusCounts), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader size={32} className="text-orange animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold mb-1">Dashboard</h1>
        <p className="text-dim text-sm">欢迎回来，查看你的 Agent 安全状态</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Agent 总数"
          value={totalAgents}
          subtitle="已注册"
          icon={Bot}
        />
        <StatsCard
          title="活跃评测"
          value={activeEvaluations}
          subtitle="进行中"
          icon={FlaskConical}
        />
        <StatsCard
          title="平均安全评分"
          value={avgScore}
          subtitle="活跃 Agent"
          icon={Shield}
          trend={avgScore >= 80 ? 'up' : 'down'}
          trendValue={avgScore >= 80 ? '良好' : '需关注'}
        />
        <StatsCard
          title="有效证书"
          value={totalCertificates}
          subtitle="已签发"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Evaluations */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">最近评测</h2>
            <Link
              href="/dashboard/evaluations"
              className="flex items-center gap-1 text-dim hover:text-orange text-xs transition-colors"
            >
              查看全部 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentEvaluations.map((ev) => (
              <div
                key={ev.id}
                className="flex items-center justify-between p-3 bg-bg2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FlaskConical size={16} className="text-orange flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{ev.agentName}</div>
                    <div className="text-dim text-xs">
                      {ev.type} · {ev.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {ev.score !== null ? (
                    <span className={`font-bold text-sm ${getScoreColor(ev.score)}`}>
                      {ev.score}/100
                    </span>
                  ) : (
                    <span className="text-xs text-blue font-semibold flex items-center gap-1">
                      <Clock size={12} />
                      {ev.status === 'running' ? '进行中' : getStatusUpperLabel(ev.status)}
                    </span>
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
                    {ev.status === 'completed' ? '✓' : ev.status === 'running' ? '◉' : '✗'}
                  </span>
                </div>
              </div>
            ))}
            {recentEvaluations.length === 0 && (
              <p className="text-dim text-sm text-center py-4">暂无评测记录</p>
            )}
          </div>
        </div>

        {/* Agent Status Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">Agent 状态分布</h2>
          <div className="space-y-4">
            {[
              { label: 'Active', count: statusCounts.active, color: 'bg-green' },
              { label: 'Warning', count: statusCounts.warning, color: 'bg-yellow' },
              { label: 'Inactive', count: statusCounts.inactive, color: 'bg-dim' },
              { label: 'Restricted', count: statusCounts.restricted, color: 'bg-red' },
            ].map((status) => (
              <div key={status.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm">{getStatusLabel(status.label.toLowerCase())}</span>
                  <span className="text-dim text-xs font-medium">{status.count}</span>
                </div>
                <div className="h-3 bg-bg2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${status.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(status.count / maxStatusCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Score Distribution Mini Chart */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold mb-3 text-dim">安全评分分布</h3>
            <div className="flex items-end gap-1.5 h-20">
              {agents.map((agent) => (
                <div key={agent.id} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t transition-all duration-500"
                    style={{
                      height: `${agent.score}%`,
                      background:
                        agent.score >= 90
                          ? 'var(--color-green)'
                          : agent.score >= 70
                          ? 'var(--color-yellow)'
                          : 'var(--color-red)',
                    }}
                  />
                  <span className="text-[10px] text-dim truncate w-full text-center">
                    {agent.name.slice(0, 6)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">告警列表</h2>
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-[rgba(248,113,113,0.15)] text-red">
            {alerts.filter(a => !a.resolved && !a.acknowledged).length} 未解决
          </span>
        </div>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                alert.resolved || alert.acknowledged ? 'bg-bg2 opacity-60' : 'bg-bg2'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    alert.level === 'critical'
                      ? 'bg-red'
                      : alert.level === 'warning'
                      ? 'bg-yellow'
                      : 'bg-blue'
                  }`}
                />
                <div>
                  <div className="font-medium text-sm">
                    {alert.agentName}
                    <span className="text-dim font-normal ml-2">{alert.message}</span>
                  </div>
                  <div className="text-dim text-xs">
                    {new Date(alert.timestamp).toLocaleString('zh-CN')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {alert.resolved || alert.acknowledged ? (
                  <span className="text-xs text-green font-semibold">已解决</span>
                ) : (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="px-2 py-1 text-xs border border-border rounded hover:border-orange hover:text-orange transition-colors"
                  >
                    解决
                  </button>
                )}
              </div>
            </div>
          ))}
          {recentAlerts.length === 0 && (
            <p className="text-dim text-sm text-center py-4">暂无告警</p>
          )}
        </div>
      </div>
    </div>
  );
}

