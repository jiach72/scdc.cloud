/**
 * /api/orders
 * 订单管理
 *
 * POST - 创建订单（从购物车）
 * GET  - 获取当前用户订单列表
 *
 * @requires Authentication (Bearer Token or Cookie)
 * @POST body { shippingName, shippingAddress, shippingCity, shippingState?, shippingZip, shippingCountry, shippingPhone?, notes? }
 * @response POST { order: Order } (status 201)
 * @response GET { orders: Order[] }
 * @errors 400 - Cart empty / Insufficient stock / Missing shipping info
 */

import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'
import { getUserFromRequest } from '@/lib/api-auth'

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()
  return `TT${date}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { shippingName, shippingAddress, shippingCity, shippingState, shippingZip, shippingCountry, shippingPhone, notes } = body

    if (!shippingName || !shippingAddress || !shippingCity || !shippingZip || !shippingCountry) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 })
    }

    // Create order in a transaction — stock validation happens inside to prevent TOCTOU race
    const order = await prisma.$transaction(async (tx) => {
      // Re-fetch cart items inside the transaction
      const txCartItems = await tx.cartItem.findMany({
        where: { userId: user.userId },
        include: {
          product: true,
          variant: true,
        },
      })

      if (txCartItems.length === 0) {
        throw new Error('Cart is empty')
      }

      // Verify stock and calculate totals
      let subtotal = 0
      for (const item of txCartItems) {
        if (item.variant.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.product.nameEn}`)
        }
        subtotal += item.variant.price * item.quantity
      }

      const total = subtotal // Can add shipping/discount logic later

      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: user.userId,
          status: 'pending',
          subtotal,
          shippingCost: 0,
          discount: 0,
          total,
          currency: 'USD',
          shippingName,
          shippingAddress,
          shippingCity,
          shippingState: shippingState || null,
          shippingZip,
          shippingCountry,
          shippingPhone: shippingPhone || null,
          notes: notes || null,
          items: {
            create: txCartItems.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              name: item.product.nameEn,
              price: item.variant.price,
              quantity: item.quantity,
              total: item.variant.price * item.quantity,
            })),
          },
        },
        include: {
          items: true,
        },
      })

      // Decrement stock
      for (const item of txCartItems) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { userId: user.userId } })

      return newOrder
    })

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    logError('Create order', error)
    if (error instanceof Error && (error.message === 'Cart is empty' || error.message.startsWith('Insufficient stock'))) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    logError('Get orders', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
