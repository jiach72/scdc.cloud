'use client';

import { useState, useEffect } from 'react';
import {
  Key,
  Bell,
  Users,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Check,
  UserPlus,
  Shield,
  Loader,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface ApiKey {
  id: string;
  name: string;
  prefix?: string;
  key?: string;
  createdAt: string;
  lastUsedAt?: string | null;
}

interface UserProfile {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({ name: '', email: '' });
  const [profileName, setProfileName] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    evalComplete: true,
    certExpiry: true,
    securityAlert: true,
    systemNotify: false,
  });
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    // Fetch user profile
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.user) {
          setProfile({ name: data.user.name || '', email: data.user.email || '' });
          setProfileName(data.user.name || '');
        } else {
          setProfile({ name: '', email: '' });
          setProfileName('');
        }
      })
      .catch(() => {
        setProfile({ name: '', email: '' });
        setProfileName('');
      });

    // Fetch API keys
    fetch('/api/api-keys', { credentials: 'include' })
      .then(r => r.json())
      .then(data => setApiKeys(data.apiKeys || []))
      .catch(() => setApiKeys([]))
      .finally(() => setLoadingKeys(false));
  }, []);

  const saveProfile = () => {
    fetch('/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: profileName }),
    })
      .then(r => {
        if (!r.ok) throw new Error('保存失败');
        return r.json();
      })
      .then(() => {
        setProfile(prev => ({ ...prev, name: profileName }));
        setProfileSaved(true);
        showToast('资料已保存');
      })
      .catch(() => {
        showToast('保存失败，请重试', 'error');
      });
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyKey = (key: string, id: string) => {
    try {
      navigator.clipboard.writeText(key);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const createKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    fetch('/api/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: newKeyName }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.apiKey) {
          setApiKeys(prev => [data.apiKey, ...prev]);
        }
        setNewKeyName('');
        setShowCreateKey(false);
      })
      .catch(() => {
        showToast('创建密钥失败，请重试', 'error');
        setShowCreateKey(false);
      });
  };

  const deleteKey = (id: string) => {
    fetch(`/api/api-keys?id=${id}`, { method: 'DELETE', credentials: 'include' })
      .then(() => setApiKeys(prev => prev.filter(k => k.id !== id)))
      .catch(() => setApiKeys(prev => prev.filter(k => k.id !== id)));
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    // Team invite API not yet implemented
    showToast('团队邀请功能开发中，暂不可用', 'error');
    setInviteEmail('');
    setShowInvite(false);
  };

  return (
    <div>
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          className={`fixed top-[72px] left-1/2 -translate-x-1/2 z-50 text-[#ffffff] px-6 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
            toastType === 'error' ? 'bg-red/90' : 'bg-green/90'
          }`}
        >
          {toast}
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold mb-1">设置</h1>
        <p className="text-dim text-sm">管理你的账户、API 密钥和通知</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">个人资料</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-dim mb-1">邮箱</label>
              <input
                type="email"
                value={profile.email || '未登录'}
                disabled
                className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-dim text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dim mb-1">名称</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => {
                  setProfileName(e.target.value);
                  setProfileSaved(false);
                }}
                className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
            <button
              onClick={saveProfile}
              className="px-4 py-2 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              {profileSaved ? '✓ 已保存' : '保存修改'}
            </button>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Key size={18} className="text-orange" />
              <h2 className="text-lg font-bold">API 密钥</h2>
            </div>
            <button
              onClick={() => setShowCreateKey(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg text-xs hover:opacity-90 transition-opacity"
            >
              <Plus size={12} /> 创建密钥
            </button>
          </div>

          {loadingKeys ? (
            <div className="flex items-center justify-center py-8">
              <Loader size={24} className="text-orange animate-spin" />
            </div>
          ) : apiKeys.length > 0 ? (
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-3 bg-bg2 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{apiKey.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="font-mono text-xs text-dim">
                        {visibleKeys.has(apiKey.id) ? (apiKey.key || apiKey.prefix || '••••••••') : '••••••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="text-dim hover:text-text transition-colors"
                      >
                        {visibleKeys.has(apiKey.id) ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                      <button
                        onClick={() => copyKey(apiKey.key || apiKey.prefix || '', apiKey.id)}
                        className="text-dim hover:text-text transition-colors"
                      >
                        {copiedKeyId === apiKey.id ? <Check size={12} className="text-green" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <div className="text-dim text-xs mt-1">
                      创建: {new Date(apiKey.createdAt).toLocaleDateString('zh-CN')}
                      {apiKey.lastUsedAt && ` · 最近使用: ${new Date(apiKey.lastUsedAt).toLocaleDateString('zh-CN')}`}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteKey(apiKey.id)}
                    className="p-2 text-dim hover:text-red transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-dim text-sm">暂无 API 密钥</p>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-orange" />
            <h2 className="text-lg font-bold">通知设置</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: 'evalComplete' as const, label: '评测完成通知', desc: 'Agent 评测完成时发送邮件通知' },
              { key: 'certExpiry' as const, label: '证书到期提醒', desc: '证书即将到期前 30 天发送提醒' },
              { key: 'securityAlert' as const, label: '安全告警', desc: '检测到安全异常时立即通知' },
              { key: 'systemNotify' as const, label: '系统通知', desc: '平台更新和维护通知' },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between p-3 bg-bg2 rounded-lg cursor-pointer hover:bg-card-hover transition-colors"
              >
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-dim text-xs">{item.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={(e) => {
                    setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }));
                    showToast('通知设置已更新');
                  }}
                  className="accent-orange w-4 h-4"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-orange" />
              <h2 className="text-lg font-bold">团队管理</h2>
            </div>
            <button
              onClick={() => setShowInvite(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-dim hover:text-text font-bold rounded-lg text-xs transition-colors"
            >
              <UserPlus size={12} /> 邀请成员
            </button>
          </div>

          <p className="text-dim text-sm text-center py-4">团队功能开发中，暂不可用</p>
        </div>
      </div>

      {/* Create Key Modal */}
      <Modal isOpen={showCreateKey} onClose={() => setShowCreateKey(false)} title="创建 API 密钥" maxWidth="max-w-md">
        <form onSubmit={createKey} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dim mb-1">密钥名称</label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="例如：Production API Key"
              required
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowCreateKey(false)}
              className="flex-1 py-2.5 border border-border rounded-lg text-dim hover:text-text transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              创建
            </button>
          </div>
        </form>
      </Modal>

      {/* Invite Modal */}
      <Modal isOpen={showInvite} onClose={() => setShowInvite(false)} title="邀请团队成员" maxWidth="max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dim mb-1">邮箱地址</label>
            <input
              type="email"
              placeholder="colleague@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text placeholder:text-dim/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dim mb-1">角色</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg2 border border-border rounded-lg text-text focus:outline-none focus:border-orange"
            >
              <option value="member">成员</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          <p className="text-dim text-xs flex items-center gap-1">
            <Shield size={12} /> 团队功能需要 Pro 或 Enterprise 计划
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowInvite(false); setInviteEmail(''); }}
              className="flex-1 py-2.5 border border-border rounded-lg text-dim hover:text-text transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleInvite}
              className="flex-1 py-2.5 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              发送邀请
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

