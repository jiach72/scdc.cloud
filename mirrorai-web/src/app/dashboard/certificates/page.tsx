'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  ExternalLink,
  Download,
  FileText,
  FileJson,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Loader,
} from 'lucide-react';
import { getStatusLabel } from '@/lib/mock-data';

interface Certificate {
  id: string;
  certNumber: string;
  agentId: string;
  agentName: string;
  grade: string;
  capabilityLevel: string;
  securityLevel: string;
  status: string;
  issuedAt: string;
  expiresAt: string;
  merkleRoot: string;
  signature: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showExport, setShowExport] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/certificates', { credentials: 'include' })
      .then(r => r.json())
      .then(data => setCertificates(data.certificates || []))
      .catch(() => setCertificates([]))
      .finally(() => setLoading(false));
  }, []);

  const copyLink = (certNumber: string, id: string) => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/verify/${certNumber}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const handleExport = (cert: Certificate, format: 'pdf' | 'json') => {
    if (format === 'json') {
      const data = JSON.stringify(cert, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${cert.certNumber}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const content = `Certificate: ${cert.certNumber}\nAgent: ${cert.agentName}\nCapability: ${cert.capabilityLevel}\nSecurity: ${cert.securityLevel}\nIssued: ${cert.issuedAt}\nExpires: ${cert.expiresAt}\nStatus: ${cert.status}\nMerkle Root: ${cert.merkleRoot}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${cert.certNumber}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setShowExport(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader size={32} className="text-orange animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold mb-1">证书管理</h1>
        <p className="text-dim text-sm">查看和管理 Agent 安全评估证书</p>
      </div>

      <div className="space-y-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-orange/50 transition-colors"
          >
            <button
              onClick={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    cert.status === 'active' ? 'bg-orange/10' : 'bg-dim/10'
                  }`}
                >
                  <Award size={24} className={cert.status === 'active' ? 'text-orange' : 'text-dim'} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{cert.agentName}</h3>
                    <span className="font-mono text-xs text-dim">{cert.certNumber}</span>
                  </div>
                  <div className="text-dim text-xs mt-0.5">
                    签发: {cert.issuedAt} · 过期: {cert.expiresAt}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`text-3xl font-black ${
                    cert.grade === 'S'
                      ? 'text-green'
                      : cert.grade === 'A'
                      ? 'text-blue'
                      : cert.grade === 'B'
                      ? 'text-yellow'
                      : cert.grade === 'C'
                      ? 'text-[#fb923c]'
                      : 'text-red'
                  }`}
                >
                  {cert.grade}
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    cert.status === 'active'
                      ? 'bg-[rgba(52,211,153,0.15)] text-green'
                      : cert.status === 'expired'
                      ? 'bg-[rgba(248,113,113,0.15)] text-red'
                      : 'bg-[rgba(120,120,160,0.15)] text-dim'
                  }`}
                >
                  {getStatusLabel(cert.status)}
                </span>
                {expandedCert === cert.id ? (
                  <ChevronUp size={16} className="text-dim" />
                ) : (
                  <ChevronDown size={16} className="text-dim" />
                )}
              </div>
            </button>

            {expandedCert === cert.id && (
              <div className="px-6 pb-6 border-t border-border pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-bg2 rounded-lg p-3 text-center">
                    <div className="text-dim text-xs mb-1">能力等级</div>
                    <div className="font-bold text-orange">{cert.capabilityLevel}</div>
                  </div>
                  <div className="bg-bg2 rounded-lg p-3 text-center">
                    <div className="text-dim text-xs mb-1">安全等级</div>
                    <div className="font-bold text-green">{cert.securityLevel}</div>
                  </div>
                  <div className="bg-bg2 rounded-lg p-3 text-center">
                    <div className="text-dim text-xs mb-1">签发时间</div>
                    <div className="font-medium text-sm">{cert.issuedAt}</div>
                  </div>
                  <div className="bg-bg2 rounded-lg p-3 text-center">
                    <div className="text-dim text-xs mb-1">过期时间</div>
                    <div className="font-medium text-sm">{cert.expiresAt}</div>
                  </div>
                </div>

                <div className="bg-bg2 rounded-lg p-4 mb-4">
                  <div className="text-dim text-xs mb-1">Merkle Root</div>
                  <div className="font-mono text-xs break-all">{cert.merkleRoot}</div>
                  <div className="text-dim text-xs mt-2 mb-1">Ed25519 Signature</div>
                  <div className="font-mono text-xs break-all">{cert.signature}</div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/verify/${cert.certNumber}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-bg2 rounded-lg text-sm hover:bg-card-hover transition-colors"
                  >
                    <ExternalLink size={14} /> 验证链接
                  </Link>
                  <button
                    onClick={() => copyLink(cert.certNumber, cert.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-bg2 rounded-lg text-sm hover:bg-card-hover transition-colors"
                  >
                    {copiedId === cert.id ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                    {copiedId === cert.id ? '已复制' : '复制链接'}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowExport(showExport === cert.id ? null : cert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-sm hover:bg-orange/20 transition-colors"
                    >
                      <Download size={14} /> 导出
                    </button>
                    {showExport === cert.id && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-lg shadow-lg py-1 z-10">
                        <button
                          onClick={() => handleExport(cert, 'pdf')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-card-hover transition-colors"
                        >
                          <FileText size={14} className="text-red" /> 导出文本
                        </button>
                        <button
                          onClick={() => handleExport(cert, 'json')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-card-hover transition-colors"
                        >
                          <FileJson size={14} className="text-blue" /> 导出 JSON
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-16">
          <Award size={48} className="mx-auto text-dim mb-4" />
          <h3 className="text-lg font-bold mb-2">暂无证书</h3>
          <p className="text-dim text-sm">完成 Agent 评测后将自动生成证书</p>
        </div>
      )}
    </div>
  );
}

