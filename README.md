# SCDC LLC 项目交接文档

> **生成时间**: 2026-04-01  
> **文档版本**: v1.0  
> **总文件数**: 1,903 个文件，约 85MB  
> **适用于**: 新人入职 / Agent 接手开发

---

## 目录

- [一、公司概述](#一公司概述)
- [二、项目清单](#二项目清单)
  - [2.1 SCDC CarbonOS 官网](#21-scdc-carbonos-官网)
  - [2.2 双生图灵 Twinturing](#22-双生图灵-twinturing)
  - [2.3 MirrorAI SaaS 平台](#23-mirrorai-saas-平台)
  - [2.4 MirrorAI SDK (@mirrorai/blackbox)](#24-mirrorai-sdk-mirroraiblackbox)
- [三、技术架构](#三技术架构)
- [四、开发规范](#四开发规范)
- [五、已知问题和待办](#五已知问题和待办)
- [六、快速上手指南](#六快速上手指南)

---

## 一、公司概述

| 项目 | 信息 |
|------|------|
| **公司名称** | SCDC LLC（苏州创电云科技） |
| **品牌** | 创电云 \| scdc.cloud |
| **域名** | scdc.cloud, twinturing.com, mirrorai.run |
| **邮箱** | admin@scdc.cloud |
| **技术栈偏好** | Next.js (前端) + FastAPI/Prisma (后端) + PostgreSQL |

---

## 二、项目清单

### 2.1 SCDC CarbonOS 官网

**目录**: `./carbonos/` (202 文件)

#### 基本信息

| 项目 | 信息 |
|------|------|
| **定位** | CarbonOS™ 零碳园区智能运营平台 |
| **域名** | carbon.scdc.cloud |
| **前端** | Next.js 16.1.6 + React 19.2.3 + TypeScript + Tailwind CSS 4 |
| **后端** | Python FastAPI + SQLAlchemy 2.0 (async) + asyncpg |
| **数据库** | PostgreSQL 15 + Redis 7 + InfluxDB 2.7 |
| **部署** | Docker Compose |

#### 目录结构

```
carbonos/
├── backend/                  # Python FastAPI 后端
│   ├── app/
│   │   ├── api/             # API 路由
│   │   │   ├── auth.py      # 认证
│   │   │   ├── admin.py     # 管理
│   │   │   ├── ai.py        # AI 诊断
│   │   │   ├── carbon.py    # 碳排放
│   │   │   ├── dashboard.py # 仪表盘
│   │   │   ├── data.py      # 数据
│   │   │   ├── organization.py # 组织
│   │   │   ├── pcf.py       # 产品碳足迹
│   │   │   ├── simulation.py # 模拟
│   │   │   ├── survey.py    # 调研问卷
│   │   │   └── deps.py      # 依赖注入
│   │   ├── core/            # 核心模块
│   │   │   ├── config.py    # 配置
│   │   │   ├── database.py  # 数据库连接
│   │   │   ├── security.py  # 安全/JWT
│   │   │   ├── cache.py     # Redis 缓存
│   │   │   ├── permissions.py # 权限
│   │   │   ├── metrics.py   # Prometheus
│   │   │   └── middleware/  # 中间件
│   │   │       ├── ratelimit.py
│   │   │       └── tenant.py
│   │   ├── models/          # SQLAlchemy 模型
│   │   │   ├── user.py      # 用户
│   │   │   ├── tenant.py    # 租户
│   │   │   ├── organization.py # 组织
│   │   │   ├── carbon.py    # 碳排放
│   │   │   ├── energy.py    # 能源数据
│   │   │   ├── audit.py     # 审计日志
│   │   │   ├── settings.py  # 设置
│   │   │   └── survey.py    # 调研
│   │   ├── schemas/         # Pydantic 模式
│   │   ├── services/        # 业务逻辑
│   │   │   ├── carbon_engine.py # 碳计算引擎
│   │   │   ├── pcf.py       # PCF 服务
│   │   │   ├── simulation.py # 模拟服务
│   │   │   └── report_generator.py # 报告生成
│   │   ├── seed_prod.py     # 生产环境种子数据
│   │   └── main.py          # FastAPI 入口
│   ├── alembic/             # 数据库迁移
│   ├── scripts/             # 管理脚本
│   │   ├── create_superuser.py
│   │   ├── seed_demo.py
│   │   ├── seed_admin.py
│   │   └── seed_tenants.py
│   ├── tests/               # 测试
│   └── pyproject.toml       # Python 依赖
├── src/                     # Next.js 前端
│   ├── app/
│   │   ├── page.tsx         # 首页
│   │   ├── login/           # 登录
│   │   ├── pricing/         # 定价
│   │   ├── solutions/       # 解决方案
│   │   ├── products/        # 产品页
│   │   │   └── heat-management/ # 热管理产品
│   │   ├── digital-assets/  # 数字资产
│   │   ├── ai-computing/    # AI 算力
│   │   ├── ai-models/       # AI 模型
│   │   └── (system)/        # 系统内部页面（需登录）
│   │       ├── dashboard/   # 仪表盘
│   │       ├── carbon/      # 碳管理
│   │       ├── pcf/         # PCF
│   │       ├── data-input/  # 数据录入
│   │       ├── organizations/ # 组织管理
│   │       ├── ai-analysis/ # AI 分析
│   │       └── settings/    # 设置
│   ├── lib/                 # 工具库
│   │   ├── api-client.ts    # API 客户端
│   │   ├── utils.ts         # 工具函数
│   │   └── translations/    # 国际化翻译
│   └── hooks/               # React Hooks
├── docker-compose.yml       # Docker 编排
├── docker/                  # Dockerfile
├── public/                  # 静态资源
├── scripts/                 # 构建脚本
└── next.config.ts           # Next.js 配置
```

#### 核心功能

1. **碳排放管理** — 碳排放计算、统计、报告
2. **PCF 产品碳足迹** — 产品生命周期碳足迹追踪
3. **能源数据管理** — 时序数据采集与分析 (InfluxDB)
4. **AI 碳诊断** — AI 驱动的碳排放诊断建议
5. **调研问卷** — 碳排放数据采集
6. **零碳园区解决方案** — 园区级碳中和方案
7. **多租户管理** — 支持多个组织/园区
8. **仪表盘** — 数据可视化

#### API 路由清单

| 路由 | 方法 | 功能 |
|------|------|------|
| `/api/auth/*` | POST/GET | 登录、注册、JWT 管理 |
| `/api/organization/*` | CRUD | 组织管理 |
| `/api/data/*` | CRUD | 能源数据录入 |
| `/api/carbon/*` | CRUD | 碳排放数据 |
| `/api/dashboard/*` | GET | 仪表盘数据 |
| `/api/simulation/*` | POST | 碳减排模拟 |
| `/api/pcf/*` | CRUD | 产品碳足迹 |
| `/api/admin/*` | CRUD | 管理后台 |
| `/api/ai/*` | POST | AI 诊断 |
| `/api/survey/*` | CRUD | 调研问卷 |
| `/health` | GET | 健康检查 |

#### 环境变量 (.env.example)

```bash
# 数据库
DATABASE_URL=postgresql+asyncpg://carbonos:CHANGE_ME@postgres:5432/carbonos

# Redis
REDIS_URL=redis://redis:6379/0

# JWT 密钥（⚠️ 生产环境必须使用随机生成的强密钥）
# 生成: python3 -c "import secrets; print(secrets.token_urlsafe(64))"
SECRET_KEY=your_64_char_random_secret_here

# AI 模型配置
AI_PROVIDER=qwen
AI_API_KEY=your-ai-api-key

# 前端 URL
FRONTEND_URL=https://carbon.scdc.cloud
```

#### 启动命令

```bash
# 方式一：Docker Compose（推荐）
docker-compose up -d

# 方式二：本地开发
# 后端
cd backend
pip install -e .
alembic upgrade head
uvicorn app.main:app --reload --port 8000

# 前端
npm install
npm run dev
```

#### 管理员凭据 (seed 脚本创建)

| 用户 | 邮箱 | 密码 | 角色 |
|------|------|------|------|
| Super Admin | admin@scdc.cloud | `ScdC@2026!Prod` (可通过 `SEED_PASSWORD` 环境变量覆盖) | 超级管理员 |

#### 数据库模型 (SQLAlchemy)

- **User** — 用户（角色: admin/manager/auditor/viewer, 支持账户锁定）
- **Tenant** — 租户（方案: free/pro/enterprise）
- **Organization** — 组织（园区/工厂/企业/部门）
- **CarbonEmission** — 碳排放记录
- **CarbonInventory** — 碳排放清单
- **EmissionFactor** — 排放因子
- **EnergyData** — 能源时序数据
- **AuditLog** — 审计日志
- **TenantConfig** — 租户配置
- **Survey** — 调研问卷

---

### 2.2 双生图灵 Twinturing

**目录**: `./twinturing/` (1,159 文件)

#### 基本信息

| 项目 | 信息 |
|------|------|
| **定位** | 培育钻石珠宝电商（DTC 品牌） |
| **域名** | twinturing.com |
| **技术栈** | Next.js 16.2.1 + React 19 + TypeScript + Tailwind CSS 4 |
| **数据库** | PostgreSQL 16 (Prisma ORM) |
| **支付** | Stripe (Checkout + Webhooks) |
| **认证** | 自研 JWT (bcryptjs + jsonwebtoken) |
| **国际化** | 自研 i18n (中/英，基于 `[locale]` 路由) |
| **部署** | Docker Compose |

#### 目录结构

```
twinturing/
├── src/
│   ├── app/
│   │   ├── [locale]/           # 国际化路由
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── products/       # 产品列表 + 详情
│   │   │   ├── cart/           # 购物车
│   │   │   ├── checkout/       # 结账
│   │   │   ├── order-confirmation/ # 订单确认
│   │   │   ├── account/        # 用户中心
│   │   │   │   ├── orders/     # 订单
│   │   │   │   ├── addresses/  # 地址
│   │   │   │   └── wishlist/   # 收藏
│   │   │   ├── login/          # 登录
│   │   │   ├── register/       # 注册
│   │   │   ├── search/         # 搜索
│   │   │   ├── about/          # 关于
│   │   │   ├── contact/        # 联系
│   │   │   ├── faq/            # FAQ
│   │   │   └── blog/           # 博客
│   │   └── api/                # API 路由
│   │       ├── auth/           # 认证 API
│   │       ├── products/       # 产品 API
│   │       ├── cart/           # 购物车 API
│   │       ├── checkout/       # 结账 API
│   │       ├── orders/         # 订单 API
│   │       ├── addresses/      # 地址 API
│   │       ├── wishlist/       # 收藏 API
│   │       ├── coupons/        # 优惠券 API
│   │       ├── admin/          # 管理 API
│   │       ├── webhooks/stripe/ # Stripe Webhook
│   │       └── health/         # 健康检查
│   ├── lib/
│   │   ├── auth.ts             # JWT 认证
│   │   ├── prisma.ts           # Prisma 客户端
│   │   ├── stripe.ts           # Stripe 集成
│   │   ├── i18n.ts             # 国际化
│   │   ├── rate-limit.ts       # 限流
│   │   └── constants.ts        # 常量
│   ├── components/             # UI 组件
│   ├── data/                   # 静态数据
│   └── middleware.ts           # Next.js 中间件
├── prisma/
│   ├── schema.prisma           # 数据库模式
│   └── seed.ts                 # 种子数据
├── docs/                       # 项目文档
│   ├── 01-market-research.md
│   ├── 02-competitor-analysis.md
│   ├── 03-business-model.md
│   └── 04-PRD.md
├── public/                     # 静态资源
├── docker-compose.yml
└── next.config.ts
```

#### 核心功能

1. **商品浏览** — 分类（戒指/项链/耳环）、筛选、搜索
2. **购物车** — 添加、修改数量、删除
3. **结账流程** — 地址填写 → Stripe Checkout → 订单生成
4. **用户系统** — 注册、登录、地址管理、订单历史、收藏夹
5. **支付集成** — Stripe Checkout Sessions + Webhook 回调
6. **评价系统** — 商品评价（1-5 星）
7. **优惠券** — 百分比/固定金额折扣
8. **管理后台** — 订单管理、商品管理
9. **国际化** — 中文/英文，URL 路由级别 (`/zh/`, `/en/`)
10. **SEO** — Sitemap、Robots、结构化数据

#### API 路由清单

| 路由 | 方法 | 功能 |
|------|------|------|
| `/api/auth/register` | POST | 用户注册 |
| `/api/auth/login` | POST | 用户登录 |
| `/api/auth/me` | GET | 获取当前用户 |
| `/api/products` | GET | 产品列表 |
| `/api/products/featured` | GET | 精选产品 |
| `/api/products/[slug]` | GET | 产品详情 |
| `/api/products/[slug]/reviews` | GET/POST | 产品评价 |
| `/api/cart` | GET/POST | 购物车 |
| `/api/cart/[id]` | PUT/DELETE | 购物车项 |
| `/api/checkout` | POST | 创建结账 Session |
| `/api/orders` | GET | 订单列表 |
| `/api/orders/[id]` | GET | 订单详情 |
| `/api/addresses` | GET/POST | 地址管理 |
| `/api/addresses/[id]` | PUT/DELETE | 地址操作 |
| `/api/wishlist` | GET/POST | 收藏 |
| `/api/wishlist/[productId]` | DELETE | 取消收藏 |
| `/api/coupons/validate` | POST | 验证优惠券 |
| `/api/admin/orders` | GET | 管理订单列表 |
| `/api/admin/orders/[id]` | PUT | 管理更新订单 |
| `/api/admin/products` | GET | 管理产品列表 |
| `/api/webhooks/stripe` | POST | Stripe Webhook |
| `/api/health` | GET | 健康检查 |

#### 数据库表结构 (Prisma)

| Model | 说明 |
|-------|------|
| `User` | 用户（角色: customer/admin, 支持账户锁定） |
| `Address` | 收货地址 |
| `Product` | 产品（中英双语） |
| `ProductVariant` | 产品变体（尺寸/颜色/克拉） |
| `ProductImage` | 产品图片 |
| `CartItem` | 购物车项 |
| `WishlistItem` | 收藏 |
| `Order` | 订单 |
| `OrderItem` | 订单项 |
| `Payment` | Stripe 支付记录 |
| `Coupon` | 优惠券 |
| `Review` | 商品评价 |

#### 环境变量

```bash
DATABASE_URL="postgresql://twinturing:twinturing@localhost:5433/twinturing"
NEXTAUTH_SECRET="9d1a3241f1332edcac92d7d81c14120715af8874ebca6831e609aca7b14292ec"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_your_stripe_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

#### 启动命令

```bash
# 1. 启动数据库
docker-compose up -d

# 2. 安装依赖 + 初始化
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed

# 3. 启动开发服务器
npm run dev
```

#### 管理员凭据

| 用户 | 邮箱 | 密码 | 角色 |
|------|------|------|------|
| Admin | admin@twinturing.com | `Admin@2026!` | admin |

---

### 2.3 MirrorAI SaaS 平台

**目录**: `./mirrorai-web/` (112 文件)

#### 基本信息

| 项目 | 信息 |
|------|------|
| **定位** | MirrorAI — AI Agent 安全评估 SaaS 平台 |
| **域名** | mirrorai.run |
| **技术栈** | Next.js 16.2.1 + React 19 + TypeScript + Tailwind CSS 4 |
| **数据库** | PostgreSQL 16 (Prisma ORM) |
| **认证** | 自研 JWT + NextAuth 5 (beta) |
| **支付** | Stripe (订阅制) |
| **部署** | Docker Compose |

#### 目录结构

```
mirrorai-web/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # 营销页面（公开）
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── about/          # 关于
│   │   │   ├── pricing/        # 定价
│   │   │   ├── algorithms/     # 算法
│   │   │   ├── evaluation/     # 评测
│   │   │   ├── integrations/   # 集成
│   │   │   ├── login/          # 登录
│   │   │   ├── register/       # 注册
│   │   │   ├── quickstart/     # 快速开始
│   │   │   ├── blog/           # 博客
│   │   │   ├── comparison/     # 对比
│   │   │   ├── verify/         # 证书验证
│   │   │   └── docs/           # 文档中心
│   │   │       ├── algorithms/
│   │   │       ├── attacks/
│   │   │       ├── eval-standard/
│   │   │       ├── upgrade-guide/
│   │   │       └── whitepaper/
│   │   ├── dashboard/          # 用户仪表盘（需登录）
│   │   │   ├── page.tsx        # 总览
│   │   │   ├── agents/         # Agent 管理
│   │   │   ├── evaluations/    # 评测
│   │   │   ├── certificates/   # 证书
│   │   │   ├── billing/        # 账单
│   │   │   └── settings/       # 设置
│   │   └── api/                # API 路由
│   │       ├── auth/           # 认证
│   │       ├── agents/         # Agent CRUD
│   │       ├── evaluations/    # 评测
│   │       ├── certificates/   # 证书
│   │       ├── heartbeats/     # 心跳
│   │       ├── alerts/         # 告警
│   │       ├── api-keys/       # API Key
│   │       ├── audit-logs/     # 审计日志
│   │       ├── plugins/        # 插件
│   │       ├── billing/usage/  # 用量
│   │       ├── health/         # 健康检查
│   │       └── sdk/            # SDK 接口
│   │           ├── evaluations/
│   │           ├── records/
│   │           ├── reports/
│   │           └── verify/[certId]/
│   ├── lib/
│   │   ├── auth.ts             # 认证
│   │   ├── api-auth.ts         # API 认证
│   │   ├── prisma.ts           # Prisma
│   │   ├── rate-limit.ts       # 限流
│   │   ├── sdk-auth.ts         # SDK 认证
│   │   ├── score-utils.ts      # 评分工具
│   │   ├── algorithm-data.ts   # 算法数据
│   │   ├── comparison-data.ts  # 对比数据
│   │   ├── mock-data.ts        # 模拟数据
│   │   ├── mock-agents.ts      # 模拟 Agent
│   │   ├── mock-users.ts       # 模拟用户
│   │   ├── constants.ts        # 常量
│   │   ├── errors.ts           # 错误处理
│   │   ├── error-codes.ts      # 错误码
│   │   ├── format-date.ts      # 日期格式化
│   │   └── logger.ts           # 日志
│   ├── components/             # UI 组件
│   └── types/                  # TypeScript 类型
├── prisma/
│   ├── schema.prisma           # 数据库模式
│   └── seed.ts                 # 种子数据
├── docker-compose.yml
├── tailwind.config.ts
└── next.config.js
```

#### 核心功能

1. **Agent 管理** — 注册、管理 AI Agent
2. **安全评测** — 5 维度 25 指标评估
3. **攻击测试** — 53 种攻击场景测试
4. **证书系统** — 自动生成安全证书 + Merkle 链签名
5. **心跳监控** — Agent 持续监控 + 告警
6. **SDK 集成** — 开放 API 给 SDK 调用
7. **订阅计费** — Stripe 订阅制
8. **插件市场** — 插件提交与审核
9. **团队协作** — 多用户团队管理
10. **证书验证** — 公开证书验证页面

#### API 路由清单

| 路由 | 方法 | 功能 |
|------|------|------|
| `/api/auth/register` | POST | 注册 |
| `/api/auth/login` | POST | 登录 |
| `/api/auth/logout` | POST | 登出 |
| `/api/auth/me` | GET | 当前用户 |
| `/api/agents` | GET/POST | Agent CRUD |
| `/api/agents/[id]` | GET/PUT/DELETE | Agent 操作 |
| `/api/evaluations` | GET/POST | 评测 |
| `/api/certificates` | GET | 证书列表 |
| `/api/heartbeats` | GET/POST | 心跳 |
| `/api/alerts` | GET/PUT | 告警 |
| `/api/api-keys` | CRUD | API Key 管理 |
| `/api/audit-logs` | GET | 审计日志 |
| `/api/plugins` | GET/POST | 插件 |
| `/api/billing/usage` | GET | 用量 |
| `/api/sdk/evaluations` | POST | SDK 评测接口 |
| `/api/sdk/records` | POST | SDK 录制 |
| `/api/sdk/reports` | GET | SDK 报告 |
| `/api/sdk/verify/[certId]` | GET | SDK 证书验证 |
| `/api/health` | GET | 健康检查 |

#### 数据库表结构 (Prisma)

| Model | 说明 |
|-------|------|
| `User` | 用户（角色: user/admin） |
| `Account` | OAuth 账户 |
| `Session` | 会话 |
| `Team` | 团队 |
| `TeamMember` | 团队成员 |
| `Agent` | AI Agent |
| `Passport` | Agent 护照 |
| `Evaluation` | 评测任务 |
| `EvalResult` | 评测结果明细 |
| `Certificate` | 安全证书 |
| `Heartbeat` | 心跳记录 |
| `Alert` | 告警 |
| `ApiKey` | API 密钥 |
| `Order` | 订阅/订单 |
| `PluginSubmission` | 插件提交 |
| `Notification` | 通知 |
| `AuditLog` | 审计日志 |
| `Review` | 评价 |

#### 环境变量

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mirrorai"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
REDIS_PASSWORD="your-redis-password-here"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

#### 启动命令

```bash
# 1. 启动数据库
docker-compose up -d

# 2. 安装依赖 + 初始化
npm install
npx prisma generate
npx prisma db push
npm run db:seed

# 3. 启动开发服务器
npm run dev
```

#### 管理员凭据

| 用户 | 邮箱 | 密码 | 角色 |
|------|------|------|------|
| Admin | admin@mirrorai.run | `Admin@2026!` | admin |

---

### 2.4 MirrorAI SDK (@mirrorai/blackbox)

**目录**: `./mirrorai-sdk/` (430 文件)

#### 基本信息

| 项目 | 信息 |
|------|------|
| **定位** | AI Agent 安全评估 SDK — 黑盒录制 + 实时防护 |
| **npm 包名** | @mirrorai/blackbox v0.3.0 |
| **技术栈** | TypeScript + Node.js ≥20 |
| **存储** | PostgreSQL (Drizzle ORM) / In-Memory / S3 / Elasticsearch |
| **CLI** | lobster, lobster-check, lobster-report |
| **License** | Apache-2.0 |

#### 目录结构

```
mirrorai-sdk/
├── src/
│   ├── index.ts              # 主入口（导出所有模块）
│   ├── recorder.ts           # 行为录制器
│   ├── redactor.ts           # 数据脱敏器（200+ 种模式）
│   ├── redactor-v2.ts        # P0: Aho-Corasick 多模式匹配
│   ├── redactor-optimizer.ts # P1: 脱敏性能优化
│   ├── signer.ts             # Ed25519 签名
│   ├── reporter-v2.ts        # 报告生成器
│   ├── academy.ts            # 学院评测流程
│   ├── academy-flow.ts       # 学院流程控制
│   ├── types.ts              # 类型定义
│   ├── errors.ts             # 错误处理
│   ├── saas-client.ts        # SaaS 平台客户端
│   ├── version-tracker.ts    # 版本追踪
│   ├── dirichlet-model.ts    # Dirichlet 统计模型
│   ├── alert-explainer.ts    # 告警解释器
│   ├── response-analyzer.ts  # P0: 响应分析器
│   ├── merkle-chain.ts       # P0: Merkle 链
│   ├── bayesian-scorer.ts    # P0: 贝叶斯评分
│   ├── adversarial-engine.ts # 对抗性评测引擎
│   ├── attack-scenarios.ts   # 攻击场景库（53 种）
│   ├── storage/              # 存储适配器
│   │   ├── storage-adapter.ts # 基类
│   │   ├── in-memory-storage.ts
│   │   ├── pg-storage.ts     # PostgreSQL
│   │   ├── pg-schema.ts      # Drizzle Schema
│   │   ├── s3-storage.ts     # AWS S3
│   │   ├── elasticsearch-storage.ts
│   │   ├── tiered-storage.ts # 分级存储
│   │   └── storage-factory.ts
│   └── compliance/
│       └── eu-ai-act.ts      # EU AI Act 合规
├── plugins/                  # 框架插件
│   ├── openai.ts             # OpenAI 集成
│   ├── langchain.ts          # LangChain 集成
│   ├── crewai.ts             # CrewAI 集成
│   └── custom.ts             # 自定义插件
├── cli/                      # CLI 工具
├── dist/                     # 编译输出
├── tests/                    # 测试
├── migrations/               # 数据库迁移
├── docs/                     # 文档
└── website/                  # 官网静态页
```

#### 核心功能

1. **行为录制** — Agent 决策链录制 + Ed25519 签名
2. **数据脱敏** — 200+ 种敏感数据模式匹配（Aho-Corasick）
3. **安全评测** — 5 维度 25 指标
4. **攻击测试** — 53 种攻击场景（Prompt Injection, Jailbreak 等）
5. **Merkle 链** — 不可篡改的事件链
6. **贝叶斯评分** — 统计驱动的评分模型
7. **分级存储** — Memory → PostgreSQL → S3 → Elasticsearch
8. **插件系统** — OpenAI / LangChain / CrewAI 集成
9. **CLI 工具** — 命令行快速检查和报告
10. **EU AI Act 合规** — 欧盟 AI 法案合规检查

#### 启动命令

```bash
# 安装
npm install @mirrorai/blackbox

# 初始化数据库
npx lobster db:init

# 运行测试
npm test

# CLI 检查
npx lobster-check --agent my-agent
```

#### 导出模块

```typescript
// 核心
export { Recorder, Redactor, Signer, Reporter, Academy }

// P0 算法
export { RedactorV2, AhoCorasick }
export { ResponseAnalyzer, containsSensitiveInfo }
export { MerkleChain, computeEventHash }
export { BayesianScorer, HallucinationDetector }

// 对抗性
export { AdversarialEngine }
export { BUILTIN_SCENARIOS, getScenariosByCategory }

// 存储
export { StorageAdapter, InMemoryStorage, PgStorage, createStorage }

// 插件
// import from '@mirrorai/blackbox/plugins/openai'
// import from '@mirrorai/blackbox/plugins/langchain'
```

---

## 三、技术架构

### 3.1 前端架构模式

所有前端项目采用 **Next.js App Router** 架构：

- **Server Components** — 默认服务端渲染，减少客户端 JS
- **Client Components** — 用 `"use client"` 指令标记交互组件
- **Route Groups** — 用 `(groupName)` 组织路由不影响 URL
- **动态路由** — `[param]` 和 `[...slug]` 模式
- **API Routes** — Next.js Route Handlers (`route.ts`)
- **中间件** — 认证、国际化、限流

### 3.2 后端架构模式

| 项目 | 后端方案 |
|------|----------|
| CarbonOS | Python FastAPI (独立后端) |
| Twinturing | Next.js API Routes (全栈) |
| MirrorAI Web | Next.js API Routes (全栈) |
| MirrorAI SDK | Node.js 独立库 |

共性模式：
- **RESTful API** — 标准 CRUD
- **JWT 认证** — Bearer Token
- **ORM** — SQLAlchemy (CarbonOS), Prisma (Twinturing/MirrorAI)
- **限流** — 内存/Redis 滑动窗口
- **健康检查** — `/api/health` 或 `/health`

### 3.3 数据库设计

- **主数据库**: PostgreSQL 15/16
- **时序数据**: InfluxDB 2.7 (CarbonOS 能源数据)
- **缓存**: Redis 7
- **迁移**: Alembic (CarbonOS), Prisma Migrate (Twinturing/MirrorAI)
- **SDK 存储**: Drizzle ORM + 分级存储

### 3.4 认证机制

| 项目 | 方案 |
|------|------|
| CarbonOS | JWT (python-jose) + bcrypt |
| Twinturing | JWT (jsonwebtoken) + bcryptjs |
| MirrorAI Web | JWT + NextAuth 5 (beta) |
| MirrorAI SDK | API Key (bcrypt hash) |

### 3.5 国际化方案

- **Twinturing**: 自研 i18n，URL 路由级别 (`/[locale]/...`)，支持中/英
- **CarbonOS**: 翻译文件在 `src/lib/translations/`
- **MirrorAI**: 目前仅英文

### 3.6 支付集成 (Stripe)

- **Twinturing**: Stripe Checkout Sessions + Webhook (`/api/webhooks/stripe`)
- **MirrorAI Web**: Stripe 订阅制 (`@stripe/stripe-js` + `stripe`)
- 共用模式：创建 Session → 用户支付 → Webhook 回调 → 更新订单状态

---

## 四、开发规范

### 4.1 Git 分支策略

- 主分支 `main` 或 `master` — 生产环境
- 开发分支 `dev` — 开发环境
- 功能分支 `feature/xxx` — 新功能
- 修复分支 `fix/xxx` — Bug 修复

### 4.2 代码风格

- **TypeScript** — 严格模式
- **ESLint** — Next.js 默认配置
- **Ruff** — Python 代码风格 (CarbonOS)
- **格式化** — Prettier (如有配置)

### 4.3 测试

| 项目 | 测试框架 |
|------|----------|
| CarbonOS | pytest + pytest-asyncio + Playwright (E2E) |
| Twinturing | — (无测试配置) |
| MirrorAI Web | — (无测试配置) |
| MirrorAI SDK | 自定义测试套件 (`tests/suite.ts`) |

### 4.4 Docker 部署

所有项目均支持 Docker Compose 部署，包含 PostgreSQL + Redis 等依赖服务。

---

## 五、已知问题和待办

### CarbonOS

- ⚠️ **测试覆盖不足** — 仅有基本 API/认证/安全测试
- ⚠️ **无前端测试** — 前端无 Jest/Playwright 测试
- 📋 **待办**: InfluxDB 时序数据集成
- 📋 **待办**: AI 诊断功能完善
- 🔒 **安全**: SECRET_KEY 需在生产环境使用强随机密钥

### Twinturing

- ⚠️ **无测试** — 没有任何测试框架配置
- ⚠️ **产品数据硬编码** — 种子数据在 seed.ts 中硬编码
- ⚠️ **无管理后台 UI** — 仅有 API，无管理界面
- 📋 **待办**: 物流集成
- 📋 **待办**: 邮件通知
- 📋 **待办**: 库存管理

### MirrorAI Web

- ⚠️ **无测试** — 没有测试
- ⚠️ **NextAuth 5 是 beta 版** — 可能有 breaking changes
- ⚠️ **大量模拟数据** — mock-data.ts, mock-agents.ts 等需要替换为真实数据
- 📋 **待办**: 插件市场完善
- 📋 **待办**: 团队协作功能
- 📋 **待办**: 邮件通知

### MirrorAI SDK

- ⚠️ **v0.3.0 早期版本** — API 可能变动
- 📋 **待办**: 更多框架插件
- 📋 **待办**: 完善文档

### 通用安全注意事项

- 🔒 **所有 .env 文件中的密钥/密码都是示例值，不应用于生产**
- 🔒 **管理员密码 (Admin@2026!) 仅为种子数据默认值，生产环境必须修改**
- 🔒 **Stripe 密钥需要替换为真实密钥**
- 🔒 **JWT SECRET 必须使用强随机值**

---

## 六、快速上手指南

### 第一天：环境准备

#### 1. 确认开发环境

```bash
# 检查必备工具
node --version    # 需要 >= 20
npm --version     # 需要 >= 10
python3 --version # CarbonOS 需要 >= 3.11
docker --version  # 需要 Docker + Docker Compose
```

#### 2. 复制环境变量

每个项目目录中都有 `.env.example`，复制为 `.env` 并填写：

```bash
# CarbonOS
cd carbonos && cp .env.example .env

# Twinturing
cd twinturing && cp .env.example .env  # (如无 .env.example，参考上方环境变量章节)

# MirrorAI Web
cd mirrorai-web && cp .env.example .env
```

### 运行每个项目

#### CarbonOS

```bash
cd carbonos
# 启动所有服务
docker-compose up -d
# 等待服务启动后访问
# 前端: http://localhost:3000
# 后端: http://localhost:8000
# API 文档: http://localhost:8000/docs
```

#### Twinturing

```bash
cd twinturing
# 启动数据库
docker-compose up -d
# 安装依赖
npm install
# 初始化数据库
npx prisma generate
npx prisma db push
npm run db:seed
# 启动开发服务器
npm run dev
# 访问: http://localhost:3000
```

#### MirrorAI Web

```bash
cd mirrorai-web
# 启动数据库
docker-compose up -d
# 安装依赖
npm install
# 初始化数据库
npx prisma generate
npx prisma db push
npm run db:seed
# 启动开发服务器
npm run dev
# 访问: http://localhost:3000
```

#### MirrorAI SDK

```bash
cd mirrorai-sdk
# 安装依赖
npm install
# 编译
npm run build
# 运行测试
npm test
```

### 连接数据库

```bash
# CarbonOS PostgreSQL (端口 5433)
psql -h localhost -p 5433 -U carbonos -d carbonos

# Twinturing PostgreSQL (端口 5433)
psql -h localhost -p 5433 -U twinturing -d twinturing

# MirrorAI PostgreSQL (端口 5432)
psql -h localhost -p 5432 -U mirrorai -d mirrorai
```

### 运行 Seed 脚本

```bash
# CarbonOS (Python)
cd carbonos/backend
python -m app.seed_prod

# Twinturing
cd twinturing
npm run db:seed

# MirrorAI Web
cd mirrorai-web
npm run db:seed

# MirrorAI SDK
cd mirrorai-sdk
npm run db:seed
```

### 管理员登录快速参考

| 项目 | URL | 邮箱 | 密码 |
|------|-----|------|------|
| CarbonOS | http://localhost:3000/login | admin@scdc.cloud | ScdC@2026!Prod |
| Twinturing | http://localhost:3000/zh/login | admin@twinturing.com | Admin@2026! |
| MirrorAI | http://localhost:3000/login | admin@mirrorai.run | Admin@2026! |

---

> **文档结束**  
> 如有疑问，请联系 SCDC LLC 技术团队。
