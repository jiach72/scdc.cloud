'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/algorithms', label: '算法' },
  { href: '/evaluation', label: '评测标准' },
  { href: '/pricing', label: '定价' },
  { href: '/comparison', label: '竞品对比' },
  { href: '/integrations', label: '集成' },
  { href: '/docs', label: '文档' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(9,9,15,0.88)] backdrop-blur-xl border-b border-border h-[60px] px-8 flex items-center justify-between">
      <Link href="/" className="text-xl font-extrabold flex items-center gap-2 no-underline">
        <span>🪞</span>
        <span className="text-orange">明镜</span>
        <span className="text-text">MirrorAI</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-5">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive(link.href) ? 'text-orange' : 'text-dim hover:text-text'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer"
          className="text-dim text-sm font-medium hover:text-text">
          GitHub
        </a>
        <Link href="/login" className="text-dim text-sm font-medium hover:text-text transition-colors">
          登录
        </Link>
        <Link href="/register" className="bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] px-4 py-1.5 rounded-lg font-bold text-sm hover:opacity-90">
          注册
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden text-text"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-bg border-b border-border p-4 flex flex-col gap-3 lg:hidden max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${isActive(link.href) ? 'text-orange' : 'text-dim'}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer"
            className="text-dim text-sm font-medium" onClick={() => setMobileOpen(false)}>
            GitHub
          </a>
          <Link href="/login" className="text-dim text-sm font-medium" onClick={() => setMobileOpen(false)}>
            登录
          </Link>
          <Link href="/register" className="bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] px-4 py-2 rounded-lg font-bold text-sm text-center" onClick={() => setMobileOpen(false)}>
            注册
          </Link>
        </div>
      )}
    </nav>
  );
}

