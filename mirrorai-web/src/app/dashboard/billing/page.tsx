'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Check, Receipt, ArrowUpRight } from 'lucide-react';
import { PLANS } from '@/lib/constants';

export default function BillingPage() {
  const [currentPlan] = useState('free');
  const [usage, setUsage] = useState<{
    agentsUsed: number;
    agentsLimit: number;
    evalsUsed: number;
    evalsLimit: number;
  } | null>(null);

  useEffect(() => {
    fetch('/api/billing/usage', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setUsage(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold mb-1">账单</h1>
        <p className="text-dim text-sm">管理你的订阅和付款</p>
      </div>

      {/* Current Plan */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={18} className="text-orange" />
              <h2 className="text-lg font-bold">当前计划：Free</h2>
            </div>
            <p className="text-dim text-sm">3 Agents · 10 Evaluations/month · 社区支持</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[rgba(96,165,250,0.15)] text-blue">
              FREE
            </span>
            <span className="text-dim text-xs">下次续期：永久免费</span>
          </div>
        </div>

        {/* Usage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {usage ? (
            <>
              <div className="bg-bg2 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-dim text-xs">Agents 使用</span>
                  <span className="text-xs font-semibold">{usage.agentsUsed} / {usage.agentsLimit}</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange rounded-full"
                    style={{ width: `${Math.min(100, (usage.agentsUsed / Math.max(usage.agentsLimit, 1)) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-bg2 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-dim text-xs">本月评测</span>
                  <span className="text-xs font-semibold">{usage.evalsUsed} / {usage.evalsLimit}</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow rounded-full"
                    style={{ width: `${Math.min(100, (usage.evalsUsed / Math.max(usage.evalsLimit, 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-bg2 rounded-lg p-4">
                <div className="text-dim text-xs text-center py-2">加载中...</div>
              </div>
              <div className="bg-bg2 rounded-lg p-4">
                <div className="text-dim text-xs text-center py-2">加载中...</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Plan Comparison */}
      <h2 className="text-lg font-bold mb-4">升级计划</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(PLANS).map(([key, plan]) => (
          <div
            key={key}
            className={`bg-card border rounded-xl p-6 ${
              key === 'pro' ? 'border-orange shadow-[0_0_30px_rgba(255,140,90,0.1)]' : 'border-border'
            } ${key === currentPlan ? 'ring-2 ring-blue/30' : ''}`}
          >
            {key === 'pro' && (
              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] mb-3">
                推荐
              </span>
            )}
            <h3 className="text-xl font-extrabold mb-1">{plan.name}</h3>
            <div className="mb-4">
              {plan.price !== null ? (
                <>
                  <span className="text-3xl font-black">${plan.price}</span>
                  {plan.price > 0 && <span className="text-dim text-sm">/月</span>}
                </>
              ) : (
                <span className="text-xl font-bold">联系销售</span>
              )}
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-dim">
                  <Check size={14} className="text-green flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-lg font-bold text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-1 ${
                key === currentPlan
                  ? 'border border-blue/30 text-blue cursor-default'
                  : key === 'free'
                  ? 'border border-border text-dim'
                  : 'bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_15px_rgba(255,140,90,0.15)]'
              }`}
              disabled={key === currentPlan}
              onClick={() => {
                if (key !== currentPlan) {
                  alert('计费功能开发中，暂不可用');
                }
              }}
            >
              {key === currentPlan ? '当前计划' : key === 'free' ? '降级' : (
                <>
                  升级到 {plan.name} <ArrowUpRight size={14} />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Invoice History */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt size={18} className="text-orange" />
          <h2 className="text-lg font-bold">账单历史</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">账单历史</caption>
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-dim text-xs font-semibold">账单号</th>
                <th className="text-left py-3 text-dim text-xs font-semibold">日期</th>
                <th className="text-left py-3 text-dim text-xs font-semibold">计划</th>
                <th className="text-left py-3 text-dim text-xs font-semibold">金额</th>
                <th className="text-left py-3 text-dim text-xs font-semibold">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-8 text-center text-dim text-sm">暂无账单记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

