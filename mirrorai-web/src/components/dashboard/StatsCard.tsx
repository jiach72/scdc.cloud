import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: StatsCardProps) {
  const trendColors = {
    up: 'text-green',
    down: 'text-red',
    neutral: 'text-dim',
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-dim text-sm">{title}</span>
        <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
          <Icon size={20} className="text-orange" />
        </div>
      </div>
      <div className="text-2xl font-bold text-text mb-1">{value}</div>
      <div className="flex items-center gap-2">
        {subtitle && <span className="text-dim text-xs">{subtitle}</span>}
        {trend && trendValue && (
          <span className={`text-xs font-medium ${trendColors[trend]}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}

