import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/api-auth'
import { logError } from '@/lib/logger'

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

    // Verify address belongs to user
    const existing = await prisma.address.findFirst({ where: { id, userId: user.userId } })
    if (!existing) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    // If setting as default, unset other defaults
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    const address = await prisma.address.update({
      where: { id },
      data: {
        firstName: body.firstName ?? undefined,
        lastName: body.lastName ?? undefined,
        address1: body.address1 ?? undefined,
        address2: body.address2 ?? undefined,
        city: body.city ?? undefined,
        state: body.state ?? undefined,
        postalCode: body.postalCode ?? undefined,
        country: body.country ?? undefined,
        phone: body.phone ?? undefined,
        isDefault: body.isDefault ?? undefined,
      },
    })

    return NextResponse.json({ address })
  } catch (error) {
    logError('Update address', error)
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

    // Verify address belongs to user
    const existing = await prisma.address.findFirst({ where: { id, userId: user.userId } })
    if (!existing) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    await prisma.address.delete({ where: { id } })
    return NextResponse.json({ message: 'Address deleted' })
  } catch (error) {
    logError('Delete address', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
