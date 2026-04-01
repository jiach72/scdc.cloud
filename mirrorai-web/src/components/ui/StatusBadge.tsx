const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-green/15', text: 'text-green', label: '活跃' },
  inactive: { bg: 'bg-dim/15', text: 'text-dim', label: '未激活' },
  warning: { bg: 'bg-yellow/15', text: 'text-yellow', label: '警告' },
  suspended: { bg: 'bg-red/15', text: 'text-red', label: '已暂停' },
  restricted: { bg: 'bg-dim/15', text: 'text-dim', label: '受限' },
  completed: { bg: 'bg-green/15', text: 'text-green', label: '已完成' },
  running: { bg: 'bg-blue/15', text: 'text-blue', label: '运行中' },
  failed: { bg: 'bg-red/15', text: 'text-red', label: '失败' },
  pending: { bg: 'bg-yellow/15', text: 'text-yellow', label: '待处理' },
  queued: { bg: 'bg-yellow/15', text: 'text-yellow', label: '待处理' },
  expired: { bg: 'bg-red/15', text: 'text-red', label: '已过期' },
  revoked: { bg: 'bg-red/15', text: 'text-red', label: '已吊销' },
  paid: { bg: 'bg-green/15', text: 'text-green', label: '已支付' },
  valid: { bg: 'bg-green/15', text: 'text-green', label: '有效' },
  expiring: { bg: 'bg-yellow/15', text: 'text-yellow', label: '即将过期' },
}

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status.toLowerCase()] || statusStyles.inactive
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}

