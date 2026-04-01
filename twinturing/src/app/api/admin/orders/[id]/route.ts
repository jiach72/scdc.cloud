import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/api-auth'
import { logError } from '@/lib/logger'

const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, { status: 400 })
    }

    const order = await prisma.order.findUnique({ where: { id } })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // If cancelling or refunding, restore stock
    const isCancellation = status === 'cancelled' || status === 'refunded'
    const wasPending = ['pending', 'paid', 'processing'].includes(order.status)

    if (isCancellation && wasPending) {
      const orderItems = await prisma.orderItem.findMany({ where: { orderId: id } })
      const updatedOrder = await prisma.$transaction(async (tx) => {
        for (const item of orderItems) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { increment: item.quantity } },
          })
        }
        return tx.order.update({
          where: { id },
          data: { status },
          include: { items: true },
        })
      })
      return NextResponse.json({ order: updatedOrder })
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    })

    return NextResponse.json({ order: updatedOrder })
  } catch (error) {
    logError('Admin update order status', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
