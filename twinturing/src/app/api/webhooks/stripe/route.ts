import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err) {
    logError('Webhook signature verification', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (orderId) {
          // Idempotency check: skip if order already processed
          const order = await prisma.order.findUnique({ where: { id: orderId } })
          if (!order || order.status !== 'pending') {
            break
          }

          // Amount validation: ensure Stripe amount matches order total
          const stripeAmount = (session.amount_total || 0) / 100
          if (Math.abs(stripeAmount - order.total) > 0.01) {
            logError('Webhook amount mismatch', { orderId, stripeAmount, orderTotal: order.total })
            break
          }

          // Create payment + update order in a transaction
          await prisma.$transaction(async (tx) => {
            await tx.payment.create({
              data: {
                orderId,
                stripePaymentId: session.payment_intent as string,
                amount: stripeAmount,
                currency: session.currency?.toUpperCase() || 'USD',
                status: 'succeeded',
              },
            })

            await tx.order.update({
              where: { id: orderId },
              data: {
                status: 'paid',
                stripePaymentId: session.payment_intent as string,
              },
            })
          })
        }
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (orderId) {
          const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
          })
          if (order) {
            await prisma.$transaction(async (tx) => {
              for (const item of order.items) {
                await tx.productVariant.update({
                  where: { id: item.variantId },
                  data: { stock: { increment: item.quantity } },
                })
              }
              await tx.order.update({
                where: { id: orderId },
                data: { status: 'cancelled' },
              })
            })
          }
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        if (paymentIntentId) {
          const order = await prisma.order.findFirst({
            where: { stripePaymentId: paymentIntentId },
            include: { items: true },
          })
          if (order) {
            await prisma.$transaction(async (tx) => {
              for (const item of order.items) {
                await tx.productVariant.update({
                  where: { id: item.variantId },
                  data: { stock: { increment: item.quantity } },
                })
              }
              await tx.order.update({
                where: { id: order.id },
                data: { status: 'refunded' },
              })
            })
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    logError('Webhook handler', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
