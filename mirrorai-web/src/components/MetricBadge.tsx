interface MetricBadgeProps {
  value: string;
  label: string;
  color?: 'green' | 'orange' | 'blue' | 'red';
}

const colors: Record<string, string> = {
  green: 'text-green',
  orange: 'text-orange',
  blue: 'text-blue',
  red: 'text-red',
};

export default function MetricBadge({ value, label, color = 'green' }: MetricBadgeProps) {
  return (
    <div className="flex flex-col items-center min-w-[100px]">
      <span className={`text-xl font-extrabold ${colors[color]}`}>{value}</span>
      <span className="text-xs text-dim uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

