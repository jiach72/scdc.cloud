import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/api-auth'
import { logError } from '@/lib/logger'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await params

    await prisma.wishlistItem.deleteMany({
      where: { userId: user.userId, productId },
    })

    return NextResponse.json({ message: 'Item removed from wishlist' })
  } catch (error) {
    logError('Remove wishlist item', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
