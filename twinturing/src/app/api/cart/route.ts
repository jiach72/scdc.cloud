/**
 * /api/cart
 * 购物车管理
 *
 * GET  - 获取当前用户购物车
 * POST - 添加商品到购物车
 * DELETE - 清空购物车
 *
 * @requires Authentication (Bearer Token or Cookie)
 * @POST body { productId: string, variantId: string, quantity?: number }
 * @response GET { cartItems: CartItem[], subtotal: number }
 * @response POST { cartItem: CartItem }
 */

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

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
        variant: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.variant.price * item.quantity
    }, 0)

    return NextResponse.json({ cartItems, subtotal })
  } catch (error) {
    logError('Get cart', error)
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
    const { productId, variantId, quantity = 1 } = body

    if (!productId || !variantId) {
      return NextResponse.json({ error: 'productId and variantId are required' }, { status: 400 })
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return NextResponse.json({ error: 'Quantity must be an integer between 1 and 99' }, { status: 400 })
    }

    // Verify product and variant exist
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId, productId, isActive: true },
    })
    if (!variant) {
      return NextResponse.json({ error: 'Product variant not found' }, { status: 404 })
    }

    // Atomically check stock + upsert cart item + verify total <= stock
    const result = await prisma.$transaction(async (tx) => {
      // Re-fetch variant inside transaction for consistent read
      const txVariant = await tx.productVariant.findUnique({
        where: { id: variantId },
      })
      if (!txVariant || txVariant.stock < quantity) {
        throw new Error('Insufficient stock')
      }

      // Upsert cart item
      const cartItem = await tx.cartItem.upsert({
        where: {
          userId_variantId: { userId: user.userId, variantId },
        },
        update: { quantity: { increment: quantity } },
        create: {
          userId: user.userId,
          productId,
          variantId,
          quantity,
        },
        include: {
          product: {
            include: {
              images: { where: { isPrimary: true }, take: 1 },
            },
          },
          variant: true,
        },
      })

      // Post-upsert: check total quantity in cart <= stock
      if (cartItem.quantity > txVariant.stock) {
        throw new Error('Cart quantity exceeds stock')
      }

      return cartItem
    })

    return NextResponse.json({ cartItem: result }, { status: 201 })
  } catch (error) {
    logError('Add to cart', error)
    if (error instanceof Error && (error.message === 'Insufficient stock' || error.message === 'Cart quantity exceeds stock')) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.cartItem.deleteMany({ where: { userId: user.userId } })
    return NextResponse.json({ message: 'Cart cleared' })
  } catch (error) {
    logError('Clear cart', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
