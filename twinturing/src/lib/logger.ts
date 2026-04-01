export function logError(context: string, error: unknown) {
  const timestamp = new Date().toISOString()
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[${timestamp}] ${context}: ${message}`)

  // 生产环境可接入 Sentry 等
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    // Sentry.captureException(error)
  }
}
