export function getLanguageFromPath(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    json: 'json', html: 'html', htm: 'html', css: 'css', scss: 'scss',
    md: 'markdown', py: 'python', rb: 'ruby', go: 'go', rs: 'rust',
    java: 'java', c: 'c', cpp: 'cpp', h: 'c', hpp: 'cpp',
    sh: 'shell', bash: 'shell', yml: 'yaml', yaml: 'yaml',
    xml: 'xml', sql: 'sql', php: 'php', swift: 'swift', kt: 'kotlin',
    dockerfile: 'dockerfile', toml: 'ini', ini: 'ini',
  };
  return map[ext] || 'plaintext';
}

export function getFileIcon(filename: string, isDirectory: boolean): string {
  if (isDirectory) return '📁';
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const icons: Record<string, string> = {
    ts: '🔷', tsx: '⚛️', js: '🟨', jsx: '⚛️', json: '📋',
    html: '🌐', css: '🎨', scss: '🎨', md: '📝', py: '🐍',
    rb: '💎', go: '🐹', rs: '🦀', java: '☕', sh: '🐚',
    yml: '⚙️', yaml: '⚙️', xml: '📄', sql: '🗄️', git: '🌿',
    lock: '🔒', env: '🔐', dockerfile: '🐳', txt: '📄',
  };
  if (filename.startsWith('.')) return '⚙️';
  if (filename === 'Dockerfile') return '🐳';
  if (filename === 'Makefile') return '🔧';
  return icons[ext] || '📄';
}

export function formatPath(basePath: string, fullPath: string): string {
  return fullPath.replace(basePath, '').replace(/^\//, '') || fullPath;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
