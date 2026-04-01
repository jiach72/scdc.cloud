import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}, 5 * 60 * 1000).unref();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export function rateLimit(config: RateLimitConfig) {
  return {
    check(request: NextRequest): { success: boolean; remaining: number; resetTime: number } {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                 request.headers.get('x-real-ip') ||
                 'unknown';
      const key = `ratelimit:${ip}`;
      const now = Date.now();

      if (!store[key] || store[key].resetTime < now) {
        store[key] = {
          count: 1,
          resetTime: now + config.windowMs,
        };
        return { success: true, remaining: config.maxRequests - 1, resetTime: store[key].resetTime };
      }

      store[key].count++;

      if (store[key].count > config.maxRequests) {
        return { success: false, remaining: 0, resetTime: store[key].resetTime };
      }

      return {
        success: true,
        remaining: config.maxRequests - store[key].count,
        resetTime: store[key].resetTime,
      };
    },
  };
}

// Default rate limiter: 60 requests per minute
export const defaultLimiter = rateLimit({ windowMs: 60 * 1000, maxRequests: 60 });

// Strict rate limiter: 10 requests per minute (for auth endpoints)
export const authLimiter = rateLimit({ windowMs: 60 * 1000, maxRequests: 10 });

