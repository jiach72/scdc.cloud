import Link from 'next/link';

interface DocCardProps {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  href: string;
  tag: string;
  tagColor: 'orange' | 'green' | 'blue' | 'purple' | 'red';
}

const tagColors: Record<string, string> = {
  orange: 'bg-[rgba(255,140,90,0.15)] text-orange',
  green: 'bg-[rgba(52,211,153,0.15)] text-green',
  blue: 'bg-[rgba(96,165,250,0.15)] text-blue',
  purple: 'bg-[rgba(167,139,250,0.15)] text-purple',
  red: 'bg-[rgba(248,113,113,0.15)] text-red',
};

export default function DocCard({ icon, title, titleEn, description, descriptionEn, href, tag, tagColor }: DocCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col bg-card border border-border rounded-xl p-8 transition-all hover:border-orange hover:-translate-y-1 hover:bg-card-hover no-underline text-text"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-text">
        {title}<br />
        <span className="text-sm text-dim font-normal">{titleEn}</span>
      </h3>
      <p className="text-dim text-sm mb-5 flex-1">
        {description}<br />
        <span className="text-dim">{descriptionEn}</span>
      </p>
      <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold self-start ${tagColors[tagColor]}`}>
        {tag}
      </span>
    </Link>
  );
}

