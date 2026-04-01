'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${encodeURIComponent(certId.trim())}`);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center text-center px-8 pt-28 pb-12 relative">
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.25), transparent 70%)' }}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight relative z-10">
          证书验证 /{' '}
          <span className="bg-gradient-to-br from-green to-[#6ee7b7] bg-clip-text text-transparent">
            Certificate Verification
          </span>
        </h1>
        <p className="text-base md:text-lg text-dim max-w-[600px] relative z-10">
          输入证书编号，验证 Agent 评测结果的真实性
          <br />
          Enter a certificate number to verify the authenticity of Agent evaluation results
        </p>
      </section>

      {/* Verify Form */}
      <section className="py-12 px-8 max-w-[600px] mx-auto">
        <form onSubmit={handleVerify} className="bg-card border border-border rounded-2xl p-8">
          <label htmlFor="certId" className="block text-sm font-semibold mb-2">
            证书编号 / Certificate Number
          </label>
          <input
            id="certId"
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="例: MA-2026-001234"
            className="w-full bg-[#0c0c14] border border-border rounded-lg px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-orange transition-colors placeholder:text-dim"
          />
          <button
            type="submit"
            disabled={!certId.trim()}
            className="w-full mt-4 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] py-3 rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            🔍 验证证书
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-dim text-xs">
            示例证书号：<code className="bg-card px-2 py-0.5 rounded font-mono">MA-2026-001234</code>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8">
        <div className="max-w-[600px] mx-auto text-center bg-gradient-to-br from-[rgba(255,140,90,0.08)] to-[rgba(255,160,100,0.03)] border border-[rgba(255,140,90,0.25)] rounded-2xl p-12">
          <h2 className="text-2xl font-extrabold mb-2">
            还没有证书？
            <span className="block text-sm text-dim font-normal mt-1">Don&apos;t have a certificate yet?</span>
          </h2>
          <p className="text-dim mb-6">免费评测你的 Agent，获得 S/A/B/C/D 评级证书</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)]"
          >
            🪞 免费评测
          </Link>
        </div>
      </section>
    </>
  );
}

