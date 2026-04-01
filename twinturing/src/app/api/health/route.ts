import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const checks: Record<string, string> = {}

  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = 'ok'
  } catch {
    checks.database = 'error'
    return NextResponse.json({ status: 'unhealthy', checks }, { status: 503 })
  }

  return NextResponse.json({ status: 'healthy', checks })
}
