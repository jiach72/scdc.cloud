'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  FlaskConical,
  Award,
  Settings,
  CreditCard,
  ChevronLeft,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: '仪表盘', icon: LayoutDashboard },
  { href: '/dashboard/agents', label: 'Agent 管理', icon: Bot },
  { href: '/dashboard/evaluations', label: '评测管理', icon: FlaskConical },
  { href: '/dashboard/certificates', label: '证书管理', icon: Award },
  { href: '/dashboard/settings', label: '设置', icon: Settings },
  { href: '/dashboard/billing', label: '账单', icon: CreditCard },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navContent = (
    <>
      <div className="p-4 flex-1">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[rgba(255,140,90,0.15)] text-orange'
                    : 'text-dim hover:text-text hover:bg-card'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-dim hover:text-text text-sm transition-colors"
        >
          <ChevronLeft size={16} />
          返回首页
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar - always visible on lg+ */}
      <aside className="hidden lg:flex flex-col w-64 bg-bg2 border-r border-border min-h-screen pt-[60px]">
        {navContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed top-0 left-0 z-50 flex flex-col w-64 bg-bg2 border-r border-border h-full lg:hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-lg font-extrabold text-orange">🪞 明镜</span>
              <button onClick={onClose} className="text-dim hover:text-text">
                <X size={20} />
              </button>
            </div>
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}

