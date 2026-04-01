/**
 * GET /api/products
 * 获取产品列表（分页、筛选、搜索）
 *
 * @query {string} [category] - 产品分类 (rings | necklaces | earrings)
 * @query {number} [page=1] - 页码
 * @query {number} [limit=20] - 每页数量 (1-100)
 * @query {string} [search] - 搜索关键词 (最长100字符)
 * @response { products: Product[], pagination: { page, limit, total, totalPages } }
 * @public 无需认证
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20'), 1), 100)
    const search = searchParams.get('search')

    const where: Record<string, unknown> = { isActive: true }
    if (category) {
      const validCategories = ['rings', 'necklaces', 'earrings']
      if (!validCategories.includes(category)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
      }
      where.category = category
    }
    if (search) {
      // Limit search length to prevent abuse
      const safeSearch = search.slice(0, 100)
      where.OR = [
        { nameEn: { contains: safeSearch, mode: 'insensitive' } },
        { nameZh: { contains: safeSearch, mode: 'insensitive' } },
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { sortOrder: 'asc' } },
          variants: { where: { isActive: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    const response = NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return response
  } catch (error) {
    logError('Get products', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
