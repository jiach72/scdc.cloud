import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'
import { getUserFromRequest } from '@/lib/api-auth'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 20 requests per minute per user (anti-brute-force coupon enumeration)
    if (!checkRateLimit(`coupon:${user.userId}`, 20, 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const { code, subtotal } = body

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 })
    }

    const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } })

    if (!coupon) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 })
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: 'Coupon is not active' }, { status: 400 })
    }

    if (coupon.startsAt && coupon.startsAt > new Date()) {
      return NextResponse.json({ error: 'Coupon is not yet active' }, { status: 400 })
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 })
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 })
    }

    if (coupon.minOrderAmount && subtotal && subtotal < coupon.minOrderAmount) {
      return NextResponse.json(
        { error: `Minimum order amount is $${coupon.minOrderAmount}` },
        { status: 400 }
      )
    }

    // Calculate discount
    let discount = 0
    if (coupon.type === 'percentage') {
      discount = ((subtotal || 0) * coupon.value) / 100
    } else if (coupon.type === 'fixed') {
      discount = coupon.value
    }

    return NextResponse.json({
      coupon: {
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
      },
    })
  } catch (error) {
    logError('Validate coupon', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
