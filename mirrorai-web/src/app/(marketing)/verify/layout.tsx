import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '证书验证 | MirrorAI',
  description: '验证 MirrorAI 安全认证证书的真实性',
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

