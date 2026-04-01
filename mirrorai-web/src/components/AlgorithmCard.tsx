interface AlgorithmCardProps {
  icon: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
  badge?: string;
}

export default function AlgorithmCard({
  icon,
  name,
  nameEn,
  tagline,
  description,
  metrics,
  featured,
  badge,
}: AlgorithmCardProps) {
  return (
    <div
      className={`bg-card border rounded-2xl p-8 relative transition-all hover:-translate-y-1 ${
        featured
          ? 'border-orange bg-gradient-to-br from-[rgba(255,140,90,0.08)] to-[rgba(255,140,90,0.02)] shadow-[0_12px_40px_rgba(255,140,90,0.15)]'
          : 'border-border hover:border-orange'
      }`}
    >
      {badge && (
        <span className="absolute top-4 right-4 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] px-3 py-1 rounded-full text-xs font-bold tracking-wider">
          {badge}
        </span>
      )}
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-1">
        {name}
        <span className="block text-sm text-dim font-normal">{nameEn}</span>
      </h3>
      <p className="text-sm text-orange font-semibold mb-4">{tagline}</p>
      <p className="text-sm text-dim leading-relaxed mb-6">{description}</p>
      <div className="flex gap-6 flex-wrap">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center">
            <span className="text-xl font-extrabold text-green">{m.value}</span>
            <span className="text-xs text-dim uppercase tracking-wider mt-1">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

