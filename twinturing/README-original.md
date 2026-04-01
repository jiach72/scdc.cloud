# Twinturing（双生图灵）- 人造金刚石饰品独立站

> **Same Sparkle, Smarter Choice**  
> 同样的闪耀，更智慧的选择

---

## 📋 项目概述

**品牌**: Twinturing（双生图灵）  
**产品**: 人造金刚石饰品（钻戒、项链、耳环）  
**市场**: 海外客户，中英文双版本  
**模式**: DTC独立站  
**状态**: 全功能电商独立站，支持用户注册、购物车、下单、Stripe支付

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router) |
| **语言** | TypeScript 6 |
| **UI** | Tailwind CSS 4, React 19 |
| **数据库** | PostgreSQL + Prisma ORM |
| **支付** | Stripe (Checkout + Webhooks) |
| **认证** | JWT (jsonwebtoken + bcryptjs) |
| **部署** | Vercel |

---

## 🚀 本地开发指南

### 前置条件

- Node.js 18+
- PostgreSQL 数据库
- Stripe 账号（测试模式）

### 环境变量

创建 `.env` 文件：

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/twinturing"

# Auth
JWT_SECRET="your-jwt-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXTAUTH_URL="http://localhost:3000"
```

### 启动步骤

```bash
# 1. 安装依赖
npm install

# 2. 初始化数据库
npx prisma migrate dev
npx prisma generate
npm run db:seed

# 3. 启动开发服务器
npm run dev

# 4. Stripe Webhook 测试（另开终端）
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 构建 & 部署

```bash
# 类型检查
npx tsc --noEmit

# 构建
npm run build

# 生产启动
npm start
```

---

## 📡 API 端点列表

### 认证

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 用户注册（限5次/15分钟） | 无 |
| POST | `/api/auth/login` | 用户登录 | 无 |
| GET | `/api/auth/me` | 获取当前用户信息 | ✅ |

### 产品

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/products` | 产品列表（分页/筛选/搜索） | 无 |
| GET | `/api/products/[slug]` | 产品详情 | 无 |
| GET | `/api/products/featured` | 推荐产品 | 无 |

### 购物车

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/cart` | 获取购物车 | ✅ |
| POST | `/api/cart` | 添加商品 | ✅ |
| DELETE | `/api/cart` | 清空购物车 | ✅ |
| PATCH | `/api/cart/[id]` | 更新数量 | ✅ |
| DELETE | `/api/cart/[id]` | 删除单项 | ✅ |

### 订单

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/orders` | 创建订单 | ✅ |
| GET | `/api/orders` | 订单列表 | ✅ |
| GET | `/api/orders/[id]` | 订单详情 | ✅ |

### 支付

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/checkout` | 创建Stripe支付会话 | ✅ |

### 优惠券

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/coupons/validate` | 验证优惠券（限20次/分钟） | ✅ |

### 收货地址

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/addresses` | 获取地址列表 | ✅ |
| POST | `/api/addresses` | 添加地址 | ✅ |
| PUT | `/api/addresses/[id]` | 更新地址 | ✅ |
| DELETE | `/api/addresses/[id]` | 删除地址 | ✅ |

### 收藏

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/wishlist` | 获取收藏列表 | ✅ |
| POST | `/api/wishlist/[productId]` | 添加收藏 | ✅ |
| DELETE | `/api/wishlist/[productId]` | 取消收藏 | ✅ |

### 评价

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/products/[slug]/reviews` | 获取评价 | 无 |
| POST | `/api/products/[slug]/reviews` | 提交评价 | ✅ |

### 管理后台

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/admin/orders` | 所有订单（管理员） | ✅ Admin |
| PATCH | `/api/admin/orders/[id]` | 更新订单状态 | ✅ Admin |
| GET | `/api/admin/products` | 产品管理 | ✅ Admin |
| POST | `/api/admin/products` | 创建产品 | ✅ Admin |
| PUT | `/api/admin/products/[id]` | 更新产品 | ✅ Admin |

### Webhook & 系统

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/webhooks/stripe` | Stripe Webhook（签名验证） | Stripe |
| GET | `/api/health` | 健康检查（数据库连接） | 无 |

---

## 🔒 安全特性

- **JWT 认证**: HttpOnly Cookie + Bearer Token 双模式
- **密码安全**: bcryptjs 哈希 + 复杂度校验（大小写+数字，≥8位）
- **Rate Limiting**: 注册端点 5次/15分钟，优惠券验证 20次/分钟
- **XSS 防护**: 搜索参数长度限制（100字符），Prisma 参数化查询
- **Stripe Webhook**: 签名验证防篡改
- **库存管理**: 事务保护的库存扣减与恢复（过期/退款自动恢复库存）

---

## 📊 数据库模型

核心模型: `User`, `Product`, `ProductVariant`, `ProductImage`, `Order`, `OrderItem`, `CartItem`, `Payment`, `Address`, `Coupon`, `Review`, `Wishlist`

---

## 📚 项目文档

| 文档 | 说明 |
|------|------|
| [01-市场调研](docs/01-market-research.md) | 行业概况、市场规模、竞争格局 |
| [02-竞品分析](docs/02-competitor-analysis.md) | 主要竞品详情、功能对比、定价策略 |
| [03-商业模式](docs/03-business-model.md) | 品牌定位、盈利模式、增长路径 |
| [04-PRD](docs/04-PRD.md) | 产品需求文档、功能清单、技术选型 |

---

## 🎯 产品定价

- **订婚钻戒**: $500 - $3,000
- **项链**: $300 - $1,500
- **耳环**: $200 - $800

---

*Twinturing - 用科技定义闪耀，用智慧选择永恒。*
