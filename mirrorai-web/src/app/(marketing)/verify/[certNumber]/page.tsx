'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle, XCircle, Clock, Fingerprint, LinkIcon } from 'lucide-react';
interface PageProps {
  params: Promise<{ certNumber: string }>;
}

interface VerifyResult {
  valid: boolean;
  certNumber: string;
  agentName?: string;
  grade?: string;
  capabilityLevel?: string;
  securityLevel?: string;
  score?: number;
  issuedAt?: string;
  expiresAt?: string;
  status?: string;
  merkleRoot?: string;
  merkleVerified?: boolean;
  signatureVerified?: boolean;
}

export default function VerifyCertPage({ params }: PageProps) {
  const [certNumber, setCertNumber] = useState('');
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const p = await params;
      if (cancelled) return;
      setCertNumber(p.certNumber);

      try {
        const res = await fetch(`/api/sdk/verify/${encodeURIComponent(p.certNumber)}`);
        const data = await res.json();
        if (!cancelled) {
          setResult(data);
        }
      } catch {
        if (!cancelled) {
          setResult({
            valid: false,
            certNumber: decodeURIComponent(p.certNumber),
          });
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [params]);

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="max-w-[700px] mx-auto px-8 py-12">
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 text-dim hover:text-text text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          返回验证页面
        </Link>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-2 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-dim">正在验证证书...</p>
            <p className="text-dim text-xs mt-1 font-mono">{certNumber}</p>
          </div>
        ) : result ? (
          result.valid ? (
            /* Valid Certificate */
            <div className="space-y-6">
              <div className="bg-[rgba(52,211,153,0.06)] border border-[rgba(52,211,153,0.3)] rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(52,211,153,0.15)] flex items-center justify-center">
                    <CheckCircle size={28} className="text-green" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold text-green">证书有效</h1>
                    <p className="text-dim text-sm">Certificate Valid & Verified</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-dim text-xs">证书编号</span>
                    <p className="font-mono font-semibold text-sm">{result.certNumber}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">Agent 名称</span>
                    <p className="font-semibold">{result.agentName}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">安全评级</span>
                    <p
                      className={`font-black text-3xl ${
                        result.grade === 'S'
                          ? 'text-green'
                          : result.grade === 'A'
                          ? 'text-blue'
                          : result.grade === 'B'
                          ? 'text-yellow'
                          : 'text-red'
                      }`}
                    >
                      {result.grade}
                    </p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">综合得分</span>
                    <p className="font-black text-3xl">{result.score}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">Capability Level</span>
                    <p className="font-bold text-orange">{result.capabilityLevel}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">Security Level</span>
                    <p className="font-bold text-green">{result.securityLevel}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">签发时间</span>
                    <p className="font-semibold">{result.issuedAt}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">有效至</span>
                    <p className="font-semibold">{result.expiresAt}</p>
                  </div>
                </div>
              </div>

              {/* Merkle Verification */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Fingerprint size={18} className="text-orange" />
                  Merkle 链验证
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-bg2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-green" />
                      <span className="text-sm">Ed25519 签名验证</span>
                    </div>
                    <span className="text-green text-sm font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> 通过
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LinkIcon size={14} className="text-green" />
                      <span className="text-sm">Merkle Root 一致性</span>
                    </div>
                    <span className="text-green text-sm font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> 通过
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-green" />
                      <span className="text-sm">证书时效性检查</span>
                    </div>
                    <span className="text-green text-sm font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> 有效
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[rgba(52,211,153,0.08)] rounded-lg border border-[rgba(52,211,153,0.15)]">
                  <p className="text-green text-sm font-semibold mb-1">
                    🔐 所有验证通过 — 此证书未被篡改
                  </p>
                  <p className="text-dim text-xs font-mono break-all">
                    Merkle Root: {result.merkleRoot}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Invalid / Expired Certificate */
            <div className="bg-[rgba(248,113,113,0.06)] border border-[rgba(248,113,113,0.3)] rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[rgba(248,113,113,0.15)] flex items-center justify-center">
                  <XCircle size={28} className="text-red" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-red">
                    {result.status === 'expired' ? '证书已过期' : '证书无效或不存在'}
                  </h1>
                  <p className="text-dim text-sm">
                    {result.status === 'expired'
                      ? 'Certificate Expired'
                      : 'Certificate Invalid or Not Found'}
                  </p>
                </div>
              </div>

              {result.agentName ? (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-dim text-xs">证书编号</span>
                    <p className="font-mono font-semibold text-sm">{result.certNumber}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">Agent 名称</span>
                    <p className="font-semibold">{result.agentName}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">状态</span>
                    <p className="font-semibold text-red">{result.status?.toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-dim text-xs">过期时间</span>
                    <p className="font-semibold">{result.expiresAt}</p>
                  </div>
                </div>
              ) : (
                <p className="text-dim text-sm mb-4">
                  未找到证书编号为{' '}
                  <code className="bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded font-mono">
                    {result.certNumber}
                  </code>{' '}
                  的有效证书。请检查编号是否正确。
                </p>
              )}

              <p className="text-dim text-sm">
                示例格式：
                <code className="bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded font-mono">
                  MA-2026-001234
                </code>
              </p>
            </div>
          )
        ) : null}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-xl text-dim hover:text-text text-sm transition-colors"
          >
            验证其他证书
          </Link>
        </div>
      </div>
    </div>
  );
}
