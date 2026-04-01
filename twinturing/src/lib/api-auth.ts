import { NextRequest } from 'next/server'
import { verifyToken, TokenPayload } from '@/lib/auth'

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  // Fall back to cookie
  const cookie = request.cookies.get('token')
  return cookie?.value || null
}

export function getUserFromRequest(request: NextRequest): TokenPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null
  try {
    return verifyToken(token)
  } catch {
    return null
  }
}

export function createAuthResponse(data: unknown, status = 200) {
  return Response.json(data, { status })
}
