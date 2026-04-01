export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green'
  if (score >= 60) return 'text-yellow'
  return 'text-red'
}

export function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-green/15'
  if (score >= 60) return 'bg-yellow/15'
  return 'bg-red/15'
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return '优秀'
  if (score >= 80) return '良好'
  if (score >= 60) return '一般'
  return '需改进'
}

