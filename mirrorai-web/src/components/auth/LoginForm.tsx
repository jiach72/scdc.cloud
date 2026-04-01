'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const errorMessages: Record<string, string> = {
    'Invalid email': '邮箱格式不正确',
    'Password is required': '请输入密码',
    'Invalid credentials': '邮箱或密码错误',
    'User not found': '邮箱或密码错误',
    'Invalid password': '邮箱或密码错误',
    'Too many requests': '请求过于频繁，请稍后再试',
    'Invalid input': '输入信息格式不正确',
    'Internal server error': '服务器错误，请稍后再试',
    'Login failed': '登录失败，请重试',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(errorMessages[data.error] || data.error || '登录失败，请重试');
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
            placeholder="••••••••"
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
        登录
      </button>

      <p className="text-center text-sm text-dim">
        还没有账号？{' '}
        <Link href="/register" className="text-orange hover:underline">
          注册
        </Link>
      </p>
    </form>
  );
}

