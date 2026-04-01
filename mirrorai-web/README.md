# MirrorAI — 开源 AI Agent 安全评估框架

MirrorAI 是一个开源的 AI Agent 安全评估平台，为每只 Agent 提供系统化的安全评估、行为证据记录和审计报告生成，帮助企业满足 EU AI Act 合规要求。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript 5.9 |
| UI | React 19 + Tailwind CSS 4 |
| 认证 | next-auth 5 (Beta) + JWT |
| 数据库 | Prisma ORM + SQLite/PostgreSQL |
| 支付 | Stripe |
| 密码 | bcryptjs |
| 校验 | Zod 4 |
| 图标 | Lucide React |

## 功能列表

- **用户系统** — 注册/登录/会话管理/角色权限
- **Agent 管理** — 创建、查看、删除 AI Agent
- **安全评估** — 多维度安全评分（S/A/B/C/D 等级）
- **Dashboard** — 统计概览、Agent 列表、评估记录、告警管理
- **账单管理** — Stripe 支付集成、订阅管理
- **证书系统** — 评估证书生成与验证
- **竞品对比** — 与 Lakera/Protect AI/Robust Intelligence 全方位对比
- **原创算法** — 熵动力学、狄利克雷建模等4大原创算法详解
- **文档中心** — 算法说明、攻击向量、评估标准、白皮书
- **安全加固** — CSP 头、Rate Limiting、XSS/CSRF 防护
- **共享组件** — Modal、StatusBadge 等可复用 UI 组件
- **数据共享** — 竞品数据、算法数据跨页面共享，避免重复

## 本地开发

### 前置要求

- Node.js ≥ 18
- npm ≥ 9

### 安装与运行

```bash
# 克隆项目
git clone <repo-url>
cd mirrorai-web

# 安装依赖
npm install

# 配置环境变量（见下方）
cp .env.example .env

# 初始化数据库
npx prisma generate
npx prisma db push

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看项目。

### 构建与部署

```bash
# 类型检查
npx tsc --noEmit

# 生产构建
npm run build

# 启动生产服务
npm start
```

## 环境变量

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `DATABASE_URL` | 数据库连接字符串 | ✅ |
| `JWT_SECRET` | JWT 签名密钥（≥32字符） | ✅ |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL（如 https://mirrorai.dev） | ❌ |
| `STRIPE_SECRET_KEY` | Stripe 密钥 | ❌ |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 密钥 | ❌ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 | ❌ |
| `NEXTAUTH_SECRET` | next-auth 密钥 | ❌ |
| `NEXTAUTH_URL` | next-auth 回调 URL | ❌ |

## API 端点

### 认证

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| POST | `/api/auth/logout` | 用户登出 |
| GET | `/api/auth/me` | 获取当前用户 |

### Agent

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/agents` | 获取 Agent 列表 |
| POST | `/api/agents` | 创建 Agent |
| GET | `/api/agents/:id` | 获取 Agent 详情 |
| DELETE | `/api/agents/:id` | 删除 Agent |

### 系统

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |

## 项目结构

```
src/
├── app/
│   ├── (marketing)/     # 营销页面（含 Navbar + Footer）
│   │   ├── page.tsx      # 首页
│   │   ├── about/        # 关于
│   │   ├── algorithms/   # 原创算法详情
│   │   ├── comparison/   # 竞品对比
│   │   ├── pricing/      # 定价
│   │   ├── docs/         # 文档
│   │   ├── login/        # 登录
│   │   └── register/     # 注册
│   ├── dashboard/        # 控制台（独立布局，含 Sidebar + Header）
│   │   ├── page.tsx      # Dashboard 概览
│   │   ├── agents/       # Agent 管理（含详情页）
│   │   ├── evaluations/  # 评估记录
│   │   ├── certificates/ # 证书管理
│   │   ├── billing/      # 账单
│   │   └── settings/     # 设置
│   ├── api/              # API 路由
│   └── layout.tsx        # 根布局
├── components/
│   ├── ui/               # 通用 UI 组件
│   │   ├── Modal.tsx     # 模态框组件
│   │   └── StatusBadge.tsx # 状态标签组件
│   ├── auth/             # 认证组件
│   ├── dashboard/        # Dashboard 组件
│   ├── AlgorithmCard.tsx # 算法卡片
│   ├── CellValue.tsx     # 表格单元格
│   ├── Navbar.tsx        # 导航栏
│   └── Footer.tsx        # 页脚
└── lib/
    ├── algorithm-data.ts # 算法数据（首页+算法页共享）
    ├── comparison-data.ts # 竞品对比数据（首页+对比页共享）
    ├── score-utils.ts    # 评分颜色/标签工具函数
    ├── auth.ts           # 认证逻辑
    ├── constants.ts      # 常量定义
    ├── format-date.ts    # 日期格式化
    ├── mock-data.ts      # 模拟数据
    ├── prisma.ts         # 数据库客户端
    └── rate-limit.ts     # 速率限制
```

## 部署指南

### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 环境变量配置

部署时在平台配置以下环境变量：
- `DATABASE_URL` — 生产数据库连接
- `JWT_SECRET` — 强密钥（≥32字符）
- `NEXT_PUBLIC_SITE_URL` — 生产域名

## 安全特性

- **Content-Security-Policy** — 严格的 CSP 头配置
- **Rate Limiting** — 登录/注册 API 速率限制
- **HttpOnly Cookie** — Token 通过 HttpOnly Cookie 传输
- **XSS 防护** — X-XSS-Protection + X-Content-Type-Options
- **Frame 防护** — X-Frame-Options: DENY
- **密码安全** — bcryptjs 哈希 + 强密码策略

## 许可证

MIT License
