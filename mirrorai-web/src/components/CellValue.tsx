export function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <span className="text-text text-sm font-medium">{value}</span>;
  if (value) return <span className="text-green font-bold" aria-label="支持">✅<span className="sr-only">支持</span></span>;
  return <span className="text-dim" aria-label="不支持">❌<span className="sr-only">不支持</span></span>;
}

