import type { Metadata } from 'next';
import Header from '@/components/dashboard/Header';

export const metadata: Metadata = {
  title: 'Dashboard — MirrorAI',
  description: 'MirrorAI Agent management dashboard',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Header />
      <main className="flex-1 pt-[60px] p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

