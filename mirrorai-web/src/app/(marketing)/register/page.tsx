import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: '注册 — MirrorAI',
  description: '注册 MirrorAI 账户',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[60px]">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <div className="text-5xl mb-4">🪞</div>
          <h1 className="text-2xl font-extrabold mb-2">
            注册 <span className="text-orange">MirrorAI</span>
          </h1>
          <p className="text-dim text-sm">免费开始，管理你的 AI Agent</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

