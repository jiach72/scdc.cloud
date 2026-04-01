# 🔒 SCDC CarbonOS 安全审计报告

> **审计日期**：2026-03-20  
> **审计范围**：CarbonOS™ 全栈应用（Next.js 前端 + FastAPI 后端 + Docker 部署）  
> **审计方法**：静态代码审查、配置审查、架构分析  
> **审计依据**：OWASP Top 10 (2021)、OWASP ASVS、NIST 网络安全框架

---

## 📊 安全评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 认证与授权 | 6.5/10 | JWT 实现规范，但存在硬编码默认密码等严重问题 |
| 数据保护 | 5.5/10 | 租户隔离机制良好，但传输加密和密钥管理有缺陷 |
| 依赖安全 | 7/10 | 依赖版本较新，但需持续监控 |
| OWASP Top 10 | 5/10 | 多个接口缺少认证，存在注入和配置错误风险 |
| API 安全 | 6/10 | 有限流和输入验证，但部分端点权限缺失 |
| 基础设施安全 | 5.5/10 | Docker 配置合理，但默认密码和端口暴露问题严重 |
| 安全头部 | 6/10 | 有基本安全头，但缺少 CSP 和 CSRF 防护 |

### 🏆 综合评分：**5.9 / 10**

---

## 🔴 Critical 漏洞（必须立即修复）

### C-01：超级管理员硬编码弱密码 `123456`

- **漏洞类型**：硬编码凭据 / 弱密码
- **文件位置**：
  - `backend/app/core/init_superuser.py:24` — `SUPERUSER_DEFAULT_PASSWORD = "123456"`
  - `backend/app/seed_prod.py:35,45,89,178` — 多处使用 `get_password_hash("123456")`
  - `backend/scripts/seed_tenants.py:91,107` — 默认租户密码 `123456`
- **风险描述**：超级管理员账户 `admin@scdc.cloud` 使用硬编码弱密码 `123456`。生产环境部署后，攻击者可直接使用此凭据登录获取全部系统权限。seed_prod.py 中所有测试/演示账户也使用相同弱密码。
- **修复方案**：
  1. 将默认密码改为从环境变量读取：`SUPERUSER_DEFAULT_PASSWORD = os.getenv("SUPERUSER_PASSWORD")`
  2. 首次启动时强制要求修改密码
  3. 在 seed 脚本中使用强随机密码并输出到安全位置
  4. 移除所有硬编码密码

### C-02：组织管理 API 完全无认证保护

- **漏洞类型**：失效的访问控制（OWASP A01）
- **文件位置**：`backend/app/api/organization.py`
- **风险描述**：以下端点**完全没有认证和授权检查**，任何人无需登录即可：
  - `POST /api/v1/organizations/` — 创建组织（可注入任意数据）
  - `GET /api/v1/organizations/` — 列出所有组织
  - `GET /api/v1/organizations/tree` — 获取组织树
  - `GET /api/v1/organizations/{id}` — 查看任意组织详情
  - `PUT /api/v1/organizations/{id}` — 修改任意组织信息
  - `DELETE /api/v1/organizations/{id}` — 删除组织
- **修复方案**：为所有端点添加 `Depends(get_current_active_user)` 依赖，并根据租户隔离数据访问权限

### C-03：数据批量录入 API 无认证

- **漏洞类型**：失效的访问控制（OWASP A01）
- **文件位置**：`backend/app/api/data.py`
- **风险描述**：
  - `POST /api/v1/data/energy/batch` — 无认证，任何人可批量注入数据
  - `GET /api/v1/data/energy/stats` — 无认证，泄露任意组织能源统计
  - `POST /api/v1/data/import/excel` — 无认证，可上传任意文件
  - `GET /api/v1/data/import/records` — 无认证，泄露导入记录
- **修复方案**：为所有数据操作端点添加认证依赖和租户隔离

### C-04：`.env` 文件包含明文 SECRET_KEY 和数据库密码

- **漏洞类型**：敏感数据暴露（OWASP A02）
- **文件位置**：
  - `.env:7` — `SECRET_KEY=wG3kX9mQ2pR7vB4nL8hY5jU0zF6cA1dS9eW3tI7oN2xK4bV8mP5lH6gJ0qE9rT`
  - `.env:1` — `DATABASE_URL=postgresql+asyncpg://carbonos:carbonos@postgres:5432/carbonos`
  - `backend/.env:1` — `SECRET_KEY=dev-secret-key`
- **风险描述**：虽然 `.env` 在 `.gitignore` 中，但文件权限为 `777`（`-rwxrwxrwx`），任何本地用户可读取。`backend/.env` 使用极弱的 `dev-secret-key`，若被部署到生产环境将导致 JWT 签名可被伪造。
- **修复方案**：
  1. 设置 `.env` 文件权限为 `600`（仅所有者可读写）
  2. 移除 `backend/.env` 或确保生产环境不使用它
  3. 考虑使用 Docker Secrets 或 Vault 管理敏感配置
  4. 添加部署检查：若 `SECRET_KEY` 包含 `dev-` 或 `change` 则拒绝启动

---

## 🟡 Medium 漏洞（应在近期修复）

### M-01：JWT Token 存储在 localStorage（XSS 风险）

- **漏洞类型**：不安全的数据存储（OWASP A02）
- **文件位置**：
  - `src/lib/api-client.ts:67` — `localStorage.getItem("access_token")`
  - `src/app/login/page.tsx:71` — `localStorage.setItem("access_token", data.access_token)`
  - `src/hooks/useUser.ts:18` — `localStorage.getItem("access_token")`
- **风险描述**：JWT Token 存储在 `localStorage` 中，任何 XSS 攻击都可窃取 Token。虽然当前未发现直接 XSS 漏洞，但 `localStorage` 对所有页面脚本可见，攻击面较大。
- **修复方案**：
  1. 将 Token 改为 HttpOnly Cookie 存储（需后端配合设置 `Set-Cookie` 头）
  2. 若必须使用 localStorage，添加 Token 过期检查和指纹验证
  3. 实施严格的 CSP 策略降低 XSS 风险

### M-02：缺少 Content-Security-Policy 头

- **漏洞类型**：安全配置错误（OWASP A05）
- **文件位置**：`next.config.ts`（`headers()` 函数）；`backend/app/core/middleware/ratelimit.py`（`SecurityHeadersMiddleware`）
- **风险描述**：前端和后端均未设置 `Content-Security-Policy` 响应头。CSP 是防御 XSS 攻击的最重要防线，缺少 CSP 意味着一旦存在注入漏洞，攻击者可执行任意脚本。
- **修复方案**：
  ```typescript
  // next.config.ts headers() 中添加
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self';" }
  ```

### M-03：缺少 CSRF 防护

- **漏洞类型**：跨站请求伪造（OWASP A01）
- **文件位置**：全栈应用
- **风险描述**：API 无 CSRF Token 验证机制。虽然使用 Bearer Token（非 Cookie）认证有一定天然防护，但如果未来迁移到 Cookie 认录（建议 M-01），将面临严重 CSRF 风险。
- **修复方案**：
  1. 后端添加 CSRF Token 生成和验证中间件
  2. 前端在请求头中携带 CSRF Token
  3. 或使用 SameSite=Strict Cookie 属性配合 Origin 检查

### M-04：Docker Compose 中数据库和缓存使用默认弱密码

- **漏洞类型**：安全配置错误（OWASP A05）
- **文件位置**：`docker-compose.yml`
- **风险描述**：
  - PostgreSQL：用户名和密码均为 `carbonos`（第 40-42 行）
  - InfluxDB：用户名和密码均为 `carbonos`（第 64-65 行）
  - Redis：无密码保护（第 73 行）
  - PostgreSQL 端口 5433 和 InfluxDB 端口 8086 暴露到宿主机
- **修复方案**：
  1. 使用 Docker Secrets 或 `.env` 注入强密码
  2. Redis 添加 `--requirepass` 配置
  3. 移除不必要的端口映射，仅在内部网络通信

### M-05：登录错误信息泄露异常类型

- **漏洞类型**：信息泄露（OWASP A09）
- **文件位置**：`backend/app/api/auth.py:157`
- **风险描述**：登录失败时返回 `f"登录失败: {type(e).__name__}: {str(e)}"`，泄露了内部异常类型和消息，可能暴露系统架构信息。
- **修复方案**：统一返回通用错误信息 `"登录失败，请稍后重试"`，将详细错误记录到日志

### M-06：数据库 `echo=True` 开启 SQL 日志

- **漏洞类型**：信息泄露
- **文件位置**：`backend/app/core/database.py:8`
- **风险描述**：`create_async_engine(settings.database_url, echo=True)` 会在日志中输出所有 SQL 语句，可能泄露敏感数据（如密码哈希、用户信息）。
- **修复方案**：生产环境关闭 `echo`，或根据 `settings.debug` 动态设置

### M-07：前端 JWT 解码无签名验证

- **漏洞类型**：不安全的 Token 验证
- **文件位置**：`src/hooks/useUser.ts:22-34`
- **风险描述**：前端使用 `atob()` 手动解码 JWT payload，完全不验证签名。攻击者可伪造一个包含 `role: admin` 的 JWT，在前端界面中获得管理员视图（虽然后端会拒绝，但可导致 UI 状态混乱）。
- **修复方案**：
  1. 前端不依赖 JWT payload 做权限判断
  2. 使用 `/api/v1/auth/me` 接口获取真实用户信息
  3. 权限判断应始终以服务端验证为准

### M-08：无 Token 刷新机制

- **漏洞类型**：会话管理缺陷
- **文件位置**：`src/lib/api-client.ts`（注释中提到"Token 刷新 ready（预留接口）"）
- **风险描述**：JWT 过期后直接跳转登录页，用户体验差。同时，无 Refresh Token 机制意味着 Token 有效期设置较长（30分钟），增加了 Token 被盗后的利用窗口。
- **修复方案**：实现 Refresh Token 旋转机制，Access Token 缩短至 5-10 分钟

---

## 🟢 Low 漏洞（建议改进）

### L-01：密码策略缺少特殊字符要求

- **漏洞类型**：弱密码策略
- **文件位置**：`backend/app/schemas/user.py:24-30`
- **风险描述**：密码验证仅要求大小写字母 + 数字，未要求特殊字符。OWASP 建议密码至少包含四种字符类型中的三种。
- **修复方案**：添加特殊字符验证：`if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v): raise ValueError('密码必须包含至少一个特殊字符')`

### L-02：注册端点无邮箱验证

- **漏洞类型**：身份验证缺陷
- **文件位置**：`backend/app/api/auth.py`（register 端点）
- **风险描述**：用户注册后即可直接登录，未验证邮箱所有权。攻击者可使用他人邮箱注册账户。
- **修复方案**：添加邮箱验证流程（发送验证码/链接）

### L-03：`X-Frame-Options` 前后端不一致

- **漏洞类型**：安全配置不一致
- **文件位置**：
  - `next.config.ts` — `X-Frame-Options: SAMEORIGIN`
  - `backend/app/core/middleware/ratelimit.py` — `X-Frame-Options: DENY`
- **风险描述**：前端允许同源 iframe 嵌入，后端拒绝所有 iframe。不一致的配置可能导致部分页面被嵌入攻击。
- **修复方案**：统一使用 `DENY`（更严格）

### L-04：`/metrics` 端点通过 Next.js rewrite 暴露

- **漏洞类型**：信息泄露
- **文件位置**：`next.config.ts:32` — `/metrics` 重定向到后端
- **风险描述**：Prometheus 指标端点 `/metrics` 被暴露到前端路由。指标数据可能泄露系统性能、请求量等敏感信息。
- **修复方案**：
  1. 移除 `/metrics` 的 rewrite 规则，或限制为内网访问
  2. 添加认证保护或 IP 白名单

### L-05：`UserPasswordUpdate` 缺少新密码强度验证

- **漏洞类型**：输入验证不足
- **文件位置**：`backend/app/schemas/user.py:34-36`
- **风险描述**：`UserPasswordUpdate` schema 只要求 `old_password` 和 `new_password` 两个字段，但 `new_password` 没有复用 `UserCreate` 中的密码强度验证器。
- **修复方案**：为 `new_password` 字段添加与 `UserCreate` 相同的 `@field_validator`

### L-06：`database.py` 中 `echo=True` 在生产环境输出 SQL

- **漏洞类型**：信息泄露
- **文件位置**：`backend/app/core/database.py:8`
- **风险描述**：SQLAlchemy 的 `echo=True` 会将所有 SQL 语句打印到标准输出，包括含有用户密码哈希、Token 等敏感数据的查询。
- **修复方案**：`echo=settings.debug` 或直接移除

### L-07：`dangerouslySetInnerHTML` 使用

- **漏洞类型**：潜在 XSS
- **文件位置**：`src/app/products/heat-management/page.tsx:50`
- **风险描述**：使用 `dangerouslySetInnerHTML` 输出 JSON-LD 结构化数据。虽然当前数据来自硬编码的 `jsonLd` 对象，但若未来改为动态数据，存在注入风险。
- **修复方案**：确保 `jsonLd` 始终为可信数据源，或使用 `<script type="application/ld+json">` 直接渲染

### L-08：`/api/v1/info` 端点暴露系统信息

- **漏洞类型**：信息泄露
- **文件位置**：`backend/app/main.py`（`api_info` 函数）
- **风险描述**：`/api/v1/info` 返回系统名称、版本号和功能列表，帮助攻击者了解系统能力。
- **修复方案**：移除此端点或添加认证保护

---

## ✅ 安全亮点（做得好的方面）

1. **JWT 实现规范**：使用 HS256 签名，包含 issuer/audience 验证，Token 过期时间合理（30 分钟）
2. **密码哈希安全**：使用 bcrypt 进行密码哈希，算法强度足够
3. **账户锁定机制**：5 次失败登录后锁定 15 分钟，有效防止暴力破解
4. **租户数据隔离**：碳排放数据查询已实现 `tenant_id` 过滤，防止跨租户数据泄露
5. **API 限流中间件**：实现了基于 Redis 的多层限流（匿名/认证/认证端点）
6. **安全响应头**：后端 `SecurityHeadersMiddleware` 添加了 HSTS、X-Content-Type-Options 等
7. **纯 ASGI 中间件**：避免了 `BaseHTTPMiddleware` 的 POST body 消费问题
8. **结构化日志**：使用 `structlog` 进行安全审计日志
9. **Docker 非 root 用户**：前端和后端 Docker 镜像均使用非 root 用户运行
10. **前端安全头配置**：Next.js `headers()` 配置了 HSTS、X-Frame-Options 等

---

## 📋 合规性评估

### OWASP Top 10 (2021) 合规性

| OWASP 分类 | 状态 | 说明 |
|-------------|------|------|
| A01: 失效的访问控制 | ❌ 不合规 | organization.py 和 data.py 多个端点无认证 |
| A02: 加密机制失效 | ⚠️ 部分合规 | 密码哈希安全，但 SECRET_KEY 管理和 Token 存储有缺陷 |
| A03: 注入 | ✅ 合规 | 使用 SQLAlchemy ORM，参数化查询 |
| A04: 不安全设计 | ⚠️ 部分合规 | 密码策略可加强，缺少邮箱验证 |
| A05: 安全配置错误 | ❌ 不合规 | 缺少 CSP、Docker 默认密码、SQL echo=True |
| A06: 易受攻击和过时的组件 | ✅ 合规 | 依赖版本较新（Next.js 16、FastAPI 0.109+） |
| A07: 身份认证和鉴别失败 | ⚠️ 部分合规 | 有账户锁定，但硬编码弱密码和无邮箱验证 |
| A08: 软件和数据完整性失效 | ⚠️ 部分合规 | 无 CI/CD 安全扫描集成 |
| A09: 安全日志和监控失败 | ✅ 合规 | 结构化日志 + Prometheus 监控 |
| A10: 服务端请求伪造 | ✅ 合规 | 未发现 SSRF 风险点 |

### 数据保护合规性

| 要求 | 状态 | 说明 |
|------|------|------|
| 传输加密 (TLS) | ⚠️ 需确认 | 配置了 HSTS，但需确认生产环境是否启用 HTTPS |
| 静态数据加密 | ❌ 未实现 | PostgreSQL 未配置 TDE，文件存储未加密 |
| 租户数据隔离 | ✅ 实现 | 碳排放数据已实现租户隔离 |
| 审计日志 | ✅ 实现 | 有 AuditLog 模型和结构化日志 |
| 数据备份 | ⚠️ 需确认 | Docker volumes 挂载，但未见备份策略 |

---

## 🎯 修复优先级建议

### 立即修复（本周内）
1. 🔴 C-01：移除所有硬编码密码，使用环境变量
2. 🔴 C-02：为 organization.py 所有端点添加认证
3. 🔴 C-03：为 data.py 未认证端点添加认证
4. 🔴 C-04：修复 .env 文件权限，确保生产环境不使用 dev 密钥

### 短期修复（2 周内）
5. 🟡 M-02：添加 Content-Security-Policy 头
6. 🟡 M-04：Docker Compose 使用强密码和 Secrets
7. 🟡 M-05：修复登录错误信息泄露
8. 🟡 M-06：关闭生产环境 SQL 日志

### 中期改进（1 个月内）
9. 🟡 M-01：Token 存储迁移到 HttpOnly Cookie
10. 🟡 M-03：实现 CSRF 防护
11. 🟡 M-08：实现 Refresh Token 机制
12. 🟢 L-01：加强密码策略

---

> **审计结论**：CarbonOS 在多租户隔离、API 限流和基本安全头方面有良好实践，但存在**严重的访问控制缺失**（多个核心 API 无认证）和**硬编码弱密码**问题，综合评分 5.9/10。建议优先修复 Critical 级别漏洞后再部署到生产环境。
