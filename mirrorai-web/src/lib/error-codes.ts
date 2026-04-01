/**
 * Shared error codes for API responses.
 * Backend returns error codes; frontend maps to localized messages.
 */

export const ErrorCode = {
  // Auth
  INVALID_EMAIL: 'INVALID_EMAIL',
  PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT',
  PASSWORD_MISSING_LOWERCASE: 'PASSWORD_MISSING_LOWERCASE',
  PASSWORD_MISSING_UPPERCASE: 'PASSWORD_MISSING_UPPERCASE',
  PASSWORD_MISSING_NUMBER: 'PASSWORD_MISSING_NUMBER',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  INVALID_INPUT: 'INVALID_INPUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

// Chinese error messages for frontend display
export const errorCodeMessages: Record<ErrorCode, string> = {
  [ErrorCode.INVALID_EMAIL]: '邮箱格式不正确',
  [ErrorCode.PASSWORD_TOO_SHORT]: '密码至少8个字符',
  [ErrorCode.PASSWORD_MISSING_LOWERCASE]: '密码必须包含小写字母',
  [ErrorCode.PASSWORD_MISSING_UPPERCASE]: '密码必须包含大写字母',
  [ErrorCode.PASSWORD_MISSING_NUMBER]: '密码必须包含数字',
  [ErrorCode.INVALID_CREDENTIALS]: '邮箱或密码错误',
  [ErrorCode.EMAIL_ALREADY_EXISTS]: '该邮箱已被注册',
  [ErrorCode.TOO_MANY_REQUESTS]: '请求过于频繁，请稍后再试',
  [ErrorCode.INVALID_INPUT]: '输入信息格式不正确',
  [ErrorCode.UNAUTHORIZED]: '未授权，请先登录',
  [ErrorCode.FORBIDDEN]: '权限不足',
  [ErrorCode.INTERNAL_ERROR]: '服务器错误，请稍后再试',
};

