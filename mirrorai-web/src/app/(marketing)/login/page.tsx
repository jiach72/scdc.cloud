import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: '登录 — MirrorAI',
  description: '登录 MirrorAI 账户',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[60px]">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <div className="text-5xl mb-4">🪞</div>
          <h1 className="text-2xl font-extrabold mb-2">
            登录 <span className="text-orange">MirrorAI</span>
          </h1>
          <p className="text-dim text-sm">管理你的 AI Agent 安全评估</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

