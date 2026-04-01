import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ certNumber: string }> }): Promise<Metadata> {
  const { certNumber } = await params;
  return {
    title: `证书验证 — ${certNumber}`,
    description: `验证证书 ${certNumber} 的真实性`,
  };
}

export default function VerifyCertLayout({ children }: { children: React.ReactNode }) {
  return children;
}
