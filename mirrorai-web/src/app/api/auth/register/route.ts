import { NextRequest, NextResponse } from 'next/server';
import { registerUser, AuthError } from '@/lib/auth';
import { signToken } from '@/lib/api-auth';
import { authLimiter } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { ErrorCode } from '@/lib/error-codes';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(ErrorCode.INVALID_EMAIL),
  password: z.string()
    .min(8, ErrorCode.PASSWORD_TOO_SHORT)
    .regex(/[a-z]/, ErrorCode.PASSWORD_MISSING_LOWERCASE)
    .regex(/[A-Z]/, ErrorCode.PASSWORD_MISSING_UPPERCASE)
    .regex(/[0-9]/, ErrorCode.PASSWORD_MISSING_NUMBER),
  name: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateResult = authLimiter.check(request);
    if (!rateResult.success) {
      return NextResponse.json(
        { error: ErrorCode.TOO_MANY_REQUESTS },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateResult.resetTime - Date.now()) / 1000)) } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: ErrorCode.INVALID_INPUT }, { status: 400 });
    }
    const input = registerSchema.parse(body);

    const user = await registerUser(input);
    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({ user, token }, { status: 201 });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      const code = error.message === 'Email already registered'
        ? ErrorCode.EMAIL_ALREADY_EXISTS
        : ErrorCode.INTERNAL_ERROR;
      return NextResponse.json({ error: code }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      // Return the first validation error code
      const firstError = error.issues[0]?.message as ErrorCode || ErrorCode.INVALID_INPUT;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }
    logger.error('Register error', { error: (error as Error).message });
    return NextResponse.json({ error: ErrorCode.INTERNAL_ERROR }, { status: 500 });
  }
}

