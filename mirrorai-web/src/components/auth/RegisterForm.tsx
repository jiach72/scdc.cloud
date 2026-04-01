'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { ErrorCode, errorCodeMessages } from '@/lib/error-codes';

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }

    if (password.length < 8) {
      setError('密码至少8个字符');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('密码必须包含小写字母');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('密码必须包含大写字母');
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError('密码必须包含数字');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const code = data.error as ErrorCode;
        setError(errorCodeMessages[code] || data.error || '注册失败，请重试');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('网络错误，请检查网络后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <div>
        <label className="block text-sm font-medium text-dim mb-1.5">名称</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="你的名称"
          className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dim mb-1.5">邮箱</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dim mb-1.5">密码</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="8+字符，含大小写和数字"
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "隐藏密码" : "显示密码"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-text"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-dim">密码需至少8个字符，包含大小写字母和数字</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-dim mb-1.5">确认密码</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="再次输入密码"
          className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      {error && (
        <div className="p-3 bg-red/10 border border-red/20 rounded-lg text-red text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        注册
      </button>

      <p className="text-center text-sm text-dim">
        已有账号？{' '}
        <Link href="/login" className="text-orange hover:underline">
          登录
        </Link>
      </p>
    </form>
  );
}

