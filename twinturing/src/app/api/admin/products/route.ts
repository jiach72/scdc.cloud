import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/api-auth'
import { logError } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20'), 1), 100)

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        include: {
          images: { orderBy: { sortOrder: 'asc' } },
          variants: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count(),
    ])

    return NextResponse.json({
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    logError('Admin get products', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { slug, nameEn, nameZh, descriptionEn, descriptionZh, category, basePrice, comparePrice, material, isActive, isFeatured } = body

    if (!slug || !nameEn || !nameZh || !descriptionEn || !descriptionZh || !category || basePrice == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Input validation
    if (typeof basePrice !== 'number' || basePrice <= 0) {
      return NextResponse.json({ error: 'basePrice must be a positive number' }, { status: 400 })
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: 'Slug must be lowercase alphanumeric with hyphens only' }, { status: 400 })
    }

    if (nameEn.length > 200 || nameZh.length > 200) {
      return NextResponse.json({ error: 'Name must be 200 characters or less' }, { status: 400 })
    }

    if (descriptionEn.length > 5000 || descriptionZh.length > 5000) {
      return NextResponse.json({ error: 'Description must be 5000 characters or less' }, { status: 400 })
    }

    const validCategories = ['rings', 'necklaces', 'earrings']
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        slug,
        nameEn,
        nameZh,
        descriptionEn,
        descriptionZh,
        category,
        basePrice,
        comparePrice: comparePrice || null,
        material: material || null,
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    logError('Admin create product', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Product slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
