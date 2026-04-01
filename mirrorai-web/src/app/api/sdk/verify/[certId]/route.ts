import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ certId: string }> }
) {
  const { certId } = await params;

  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: certId },
      include: {
        agent: { select: { name: true } },
      },
    });

    if (!cert) {
      return NextResponse.json({
        certId,
        valid: false,
        error: 'Certificate not found',
      }, { status: 404 });
    }

    // Check if certificate is still valid
    const now = new Date();
    const isExpired = cert.expiresAt < now;
    const isRevoked = cert.status === 'revoked';
    const isValid = cert.status === 'active' && !isExpired;

    return NextResponse.json({
      certId: cert.id,
      valid: isValid,
      agentName: cert.agent?.name || 'Unknown',
      capabilityLevel: cert.capabilityLevel,
      securityLevel: cert.securityLevel,
      issuedAt: cert.issuedAt.toISOString(),
      expiresAt: cert.expiresAt.toISOString(),
      merkleRoot: cert.merkleRoot,
      signatureValid: !!cert.signature,
      status: isRevoked ? 'revoked' : isExpired ? 'expired' : cert.status,
    });
  } catch {
    return NextResponse.json({
      certId,
      valid: false,
      error: 'Verification failed',
    }, { status: 500 });
  }
}
