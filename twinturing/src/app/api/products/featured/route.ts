import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const response = NextResponse.json({ products })
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return response
  } catch (error) {
    logError('Get featured products', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
