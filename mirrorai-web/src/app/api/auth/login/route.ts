import { NextRequest, NextResponse } from 'next/server';
import { loginUser, AuthError } from '@/lib/auth';
import { signToken } from '@/lib/api-auth';
import { authLimiter } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const rateResult = authLimiter.check(request);
    if (!rateResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateResult.resetTime - Date.now()) / 1000)) } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    const input = loginSchema.parse(body);

    const result = await loginUser(input);
    const token = signToken({ userId: result.id, email: result.email, role: result.role });

    const response = NextResponse.json({ user: { id: result.id, email: result.email, name: result.name, role: result.role }, token });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    logger.error('Login error', { error: (error as Error).message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

