import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/sdk-auth';
import type { Certificate, CertificateGrade, CertificateStatus } from '@/types';

// Extended certificate with additional fields
interface StoredCertificate extends Certificate {
  capabilityLevel: string;
  securityLevel: string;
  merkleRoot: string;
  signature: string;
}

const certificates: StoredCertificate[] = [
  {
    id: 'cert-001',
    certNumber: 'MA-2026-001234',
    agentId: 'agent-004',
    agentName: 'CodeReviewer',
    grade: 'S',
    capabilityLevel: 'L3',
    securityLevel: 'S1',
    status: 'active',
    issuedAt: '2026-03-01',
    expiresAt: '2027-03-01',
    merkleRoot: '0x8a7b3c...f9e2d1',
    signature: 'ed25519:sig_a3b8c9d0e1f2...',
  },
  {
    id: 'cert-002',
    certNumber: 'MA-2026-001189',
    agentId: 'agent-001',
    agentName: 'CustomerBot',
    grade: 'A',
    capabilityLevel: 'L3',
    securityLevel: 'S2',
    status: 'active',
    issuedAt: '2026-02-15',
    expiresAt: '2027-02-15',
    merkleRoot: '0x5e4d2a...c8b7f3',
    signature: 'ed25519:sig_d4e5f6a7b8c9...',
  },
  {
    id: 'cert-003',
    certNumber: 'MA-2026-001156',
    agentId: 'agent-002',
    agentName: 'DataAnalyst Pro',
    grade: 'A',
    capabilityLevel: 'L3',
    securityLevel: 'S1',
    status: 'active',
    issuedAt: '2026-01-20',
    expiresAt: '2027-01-20',
    merkleRoot: '0x1f2e3d...a9b8c7',
    signature: 'ed25519:sig_g7h8i9j0k1l2...',
  },
  {
    id: 'cert-004',
    certNumber: 'MA-2025-000998',
    agentId: 'agent-003',
    agentName: 'SupportAgent',
    grade: 'B',
    capabilityLevel: 'L2',
    securityLevel: 'S3',
    status: 'expired',
    issuedAt: '2025-12-01',
    expiresAt: '2026-03-01',
    merkleRoot: '0x9c8b7a...e3d2f1',
    signature: 'ed25519:sig_m3n4o5p6q7r8...',
  },
  {
    id: 'cert-005',
    certNumber: 'MA-2026-001301',
    agentId: 'agent-007',
    agentName: 'ReportGen',
    grade: 'D',
    capabilityLevel: 'L1',
    securityLevel: 'S4',
    status: 'revoked',
    issuedAt: '2026-01-10',
    expiresAt: '2027-01-10',
    merkleRoot: '0x2b3c4d...f5e6a7',
    signature: 'ed25519:sig_x9y8z7w6v5u4...',
  },
];

export async function GET(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ certificates });
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as { securityLevel?: string; capabilityLevel?: string; agentId?: string; agentName?: string; grade?: CertificateGrade };
  const cert: StoredCertificate = {
    id: 'cert_' + Date.now(),
    certNumber: `MAI-2026-${String(certificates.length + 1).padStart(3, '0')}-${body.securityLevel || 'S1'}-${body.capabilityLevel || 'L1'}`,
    agentId: body.agentId || '',
    agentName: body.agentName || '',
    grade: body.grade || 'C',
    capabilityLevel: body.capabilityLevel || 'L1',
    securityLevel: body.securityLevel || 'S1',
    status: 'active' as CertificateStatus,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    merkleRoot: '0x' + Math.random().toString(16).slice(2).padStart(64, '0'),
    signature: 'ed25519_' + Math.random().toString(36).slice(2),
  };
  certificates.push(cert);
  return NextResponse.json({ certificate: cert }, { status: 201 });
}

