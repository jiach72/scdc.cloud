import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { AuthError } from '@/lib/errors';

export { AuthError };

const JWT_SECRET = process.env.NEXTAUTH_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'your-secret-key-change-in-production') {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXTAUTH_SECRET must be set to a strong random value in production');
  }
}
const jwtSecret = JWT_SECRET || 'dev-secret-only-for-local-testing';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try cookie first
  const cookieToken = request.cookies.get('auth-token')?.value;
  if (cookieToken) return cookieToken;

  // Try Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}

export function getUserFromRequest(request: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export function requireAuth(request: NextRequest): JwtPayload {
  const user = getUserFromRequest(request);
  if (!user) {
    throw new AuthError('Unauthorized');
  }
  return user;
}

export function requireAdmin(request: NextRequest): JwtPayload {
  const user = requireAuth(request);
  if (user.role !== 'admin') {
    throw new AuthError('Forbidden', 403);
  }
  return user;
}

