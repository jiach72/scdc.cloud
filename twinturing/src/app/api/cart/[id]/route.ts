import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'
import { getUserFromRequest } from '@/lib/api-auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { quantity } = body

    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: 'Quantity must be at least 1' }, { status: 400 })
    }

    // Transaction: verify ownership + check stock + update atomically
    const updated = await prisma.$transaction(async (tx) => {
      const cartItem = await tx.cartItem.findFirst({
        where: { id, userId: user.userId },
        include: { variant: true },
      })

      if (!cartItem) {
        throw new Error('CART_ITEM_NOT_FOUND')
      }

      if (cartItem.variant.stock < quantity) {
        throw new Error('INSUFFICIENT_STOCK')
      }

      return tx.cartItem.update({
        where: { id },
        data: { quantity },
        include: {
          product: {
            include: {
              images: { where: { isPrimary: true }, take: 1 },
            },
          },
          variant: true,
        },
      })
    })

    return NextResponse.json({ cartItem: updated })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'CART_ITEM_NOT_FOUND') {
        return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
      }
      if (error.message === 'INSUFFICIENT_STOCK') {
        return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
      }
    }
    logError('Update cart', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const cartItem = await prisma.cartItem.findFirst({
      where: { id, userId: user.userId },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
    }

    await prisma.cartItem.delete({ where: { id } })
    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    logError('Delete cart item', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
