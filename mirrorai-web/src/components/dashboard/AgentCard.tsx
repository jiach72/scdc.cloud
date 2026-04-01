'use client';

import Link from 'next/link';
import { Bot, Clock, Shield } from 'lucide-react';
import { STATUS_COLORS } from '@/lib/constants';

interface AgentCardProps {
  id: string;
  name: string;
  description?: string | null;
  framework?: string | null;
  status: string;
  createdAt: string;
  evaluationCount?: number;
}

export default function AgentCard({
  id,
  name,
  description,
  framework,
  status,
  createdAt,
  evaluationCount = 0,
}: AgentCardProps) {
  const statusColor = STATUS_COLORS[status] || 'text-dim';

  return (
    <Link
      href={`/dashboard/agents/${id}`}
      className="block bg-card border border-border rounded-xl p-6 hover:border-orange hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-orange" />
          <h3 className="font-bold text-text">{name}</h3>
        </div>
        <span className={`text-xs font-semibold ${statusColor}`}>
          {status.toUpperCase()}
        </span>
      </div>

      {description && (
        <p className="text-dim text-sm mb-4 line-clamp-2">{description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-dim">
        {framework && (
          <span className="flex items-center gap-1">
            <Shield size={12} />
            {framework}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {new Date(createdAt).toLocaleDateString('zh-CN')}
        </span>
        {evaluationCount > 0 && (
          <span>{evaluationCount} 次评测</span>
        )}
      </div>
    </Link>
  );
}

