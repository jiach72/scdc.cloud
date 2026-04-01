import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent 管理 — MirrorAI',
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

