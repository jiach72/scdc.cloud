import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '账单 — MirrorAI',
};

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

