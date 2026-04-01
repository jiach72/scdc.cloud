import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/api-auth'
import { logError } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const items = await prisma.wishlistItem.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    })

    const productIds = items.map((i) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        variants: { where: { isActive: true } },
      },
    })
    const productMap = new Map(products.map((p) => [p.id, p]))

    return NextResponse.json({
      items: items.map((item) => ({
        ...item,
        product: productMap.get(item.productId) || null,
      })),
    })
  } catch (error) {
    logError('Get wishlist', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 })
    }

    // Verify product exists
    const product = await prisma.product.findUnique({ where: { id: productId, isActive: true } })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const item = await prisma.wishlistItem.upsert({
      where: {
        userId_productId: { userId: user.userId, productId },
      },
      update: {},
      create: { userId: user.userId, productId },
    })

    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    logError('Add to wishlist', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.wishlistItem.deleteMany({ where: { userId: user.userId } })
    return NextResponse.json({ message: 'Wishlist cleared' })
  } catch (error) {
    logError('Clear wishlist', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
