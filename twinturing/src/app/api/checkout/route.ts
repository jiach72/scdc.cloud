/**
 * POST /api/checkout
 * 创建 Stripe 支付会话
 *
 * @requires Authentication (Bearer Token or Cookie)
 * @body { orderId: string } - 订单ID
 * @response { sessionId: string, url: string } - Stripe Checkout URL
 * @errors 401 - Unauthorized | 400 - Missing orderId | 404 - Order not found | 400 - Order not pending
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'
import { getUserFromRequest } from '@/lib/api-auth'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.userId },
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
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status !== 'pending') {
      return NextResponse.json({ error: 'Order is not in pending status' }, { status: 400 })
    }

    const origin = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const referer = request.headers.get('referer') || ''
    const localeMatch = referer.match(/\/(en|zh)\//)
    const locale = localeMatch ? localeMatch[1] : 'en'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.product.images.length > 0 ? [item.product.images[0].url] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/${locale}/order-confirmation?orderId=${order.id}`,
      cancel_url: `${origin}/${locale}/cart`,
      metadata: {
        orderId: order.id,
        userId: user.userId,
      },
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    logError('Checkout', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
