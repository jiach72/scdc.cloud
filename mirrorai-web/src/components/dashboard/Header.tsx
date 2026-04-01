'use client';

import Link from 'next/link';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifToast, setNotifToast] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-[rgba(9,9,15,0.88)] backdrop-blur-xl border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-dim hover:text-text"
            aria-label="切换侧边栏"
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="text-lg font-extrabold flex items-center gap-2 no-underline">
            <span>🪞</span>
            <em className="not-italic text-orange">明镜</em>
            <span className="text-text text-sm">Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setNotifToast(true); setTimeout(() => setNotifToast(false), 2000); }}
            className="relative p-2 text-dim hover:text-text transition-colors"
            aria-label="通知"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange rounded-full" />
          </button>
          {notifToast && (
            <div
              role="alert"
              aria-live="polite"
              className="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 bg-card border border-border px-6 py-3 rounded-lg shadow-lg text-sm text-dim"
            >
              暂无新通知
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-card transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center">
                <User size={16} className="text-orange" />
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-dim hover:text-text hover:bg-card-hover"
                  onClick={() => setShowMenu(false)}
                >
                  <User size={14} />
                  个人设置
                </Link>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-dim hover:text-text hover:bg-card-hover text-left"
                  onClick={async () => {
                    try {
                      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
                    } catch (error) {
                      console.error('Logout failed:', error)
                    } finally {
                      window.location.href = '/login'
                    }
                  }}
                >
                  <LogOut size={14} />
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

