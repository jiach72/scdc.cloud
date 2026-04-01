# ============================================
# MirrorAI-Web Next.js 多阶段构建 Dockerfile
# ============================================
FROM node:20-alpine AS base

# 安装依赖阶段
FROM base AS deps
WORKDIR /app
COPY package*.json ./
# 使用国内镜像加速
RUN npm config set registry https://registry.npmmirror.com
RUN npm ci

# Prisma 生成阶段
COPY prisma ./prisma
RUN npx prisma generate

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 生产阶段
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Prisma 客户端需要 schema 文件
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs
EXPOSE 3002
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
