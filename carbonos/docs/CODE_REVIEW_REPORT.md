# 🏛️ 刑部尚书 · 代码质量审查报告

## SCDC CarbonOS™ — 零碳园区智能运营平台

**审查时间**：2026-03-20  
**审查范围**：前后端全栈代码（Next.js 16 + FastAPI）  
**代码规模**：约 19,170 行（TypeScript + Python）

---

## 📊 总体评分：7.2 / 10

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码结构与组织 | 7.5 | 后端分层清晰，前端页面偏多但目录合理 |
| TypeScript 使用规范 | 7.0 | tsconfig strict 已开启，但前端类型定义偏弱 |
| 组件设计模式 | 7.0 | 后端依赖注入规范，前端组件粒度适中 |
| 错误处理 | 6.5 | 后端尚可，有安全信息泄露风险 |
| 代码风格一致性 | 7.5 | Python 风格统一，中文注释到位 |
| 逻辑正确性 | 7.5 | 核心逻辑正确，存在几处遗漏 |

---

## 🔴 阻塞问题（必须修复）

### 1. 生产 SECRET_KEY 硬编码在 .env 文件中
**文件**：`/mnt/c/Users/jiach/Documents/AntigravityCode/scdc/carbonos/.env`  
**问题**：`.env` 中的 `SECRET_KEY` 是一个固定值 `wG3kX9mQ2pR7vB4n...`，虽然 `.gitignore` 已包含 `.env*`，但该文件实际存在于工作目录中。如果仓库曾经提交过此文件，密钥已泄露。  
**风险**：攻击者可伪造任意 JWT Token，接管任何租户/超管账户。  
**修复建议**：
- 立即轮换 SECRET_KEY
- 检查 git 历史中是否曾提交过 `.env`（`git log --all -- .env`）
- 生产环境使用环境变量注入，不使用文件

### 2. 后端 .env 使用弱密钥
**文件**：`/mnt/c/Users/jiach/Documents/AntigravityCode/scdc/carbonos/backend/.env`  
**问题**：`SECRET_KEY=dev-secret-key`，如果此配置曾被部署到生产环境，所有 Token 可被轻易伪造。  
**修复建议**：确保生产部署时使用独立强密钥（≥64 字符随机字符串）。

### 3. 多个 API 端点缺少租户隔离
**文件**：`backend/app/api/organization.py`  
**问题**：`create_organization`、`list_organizations`、`get_organization_tree`、`update_organization`、`delete_organization` 等端点**完全没有租户过滤**，任何认证用户可读写/删除其他租户的组织数据。  
**修复建议**：
```python
# 在所有组织 API 中添加租户过滤
current_user: User = Depends(get_tenant_user)
query = query.where(Organization.tenant_id == current_user.tenant_id)
```

### 4. 数据导入 API 缺少认证和租户隔离
**文件**：`backend/app/api/data.py` — `batch_create_energy_data`、`get_energy_stats`、`import_excel`、`list_import_records`  
**问题**：
- `batch_create_energy_data` 无认证依赖（`Depends(get_db)` 但无 user 依赖）
- `get_energy_stats` 无认证依赖
- `import_excel` 无认证依赖，且未设置 `tenant_id`
- `list_import_records` 无租户隔离
**修复建议**：所有端点添加 `Depends(get_current_active_user)` 或 `Depends(get_tenant_user)`，并在写入时注入 `tenant_id`。

### 5. 后端 `echo=True` 数据库日志泄露敏感数据
**文件**：`backend/app/core/database.py`  
**问题**：`engine = create_async_engine(settings.database_url, echo=True)`，`echo=True` 会在日志中打印所有 SQL 语句，包括可能含敏感数据的查询。  
**修复建议**：
```python
engine = create_async_engine(
    settings.database_url, 
    echo=settings.debug  # 仅调试模式开启
)
```

---

## 🟡 重要问题（建议尽快修复）

### 6. 错误处理泄露内部信息
**文件**：`backend/app/api/auth.py` — `login` 端点  
**问题**：`except Exception as e` 最后返回 `detail=f"登录失败: {type(e).__name__}: {str(e)}"`，会将 Python 异常类名和内部错误信息暴露给客户端。  
**修复建议**：
```python
except Exception as e:
    logger.exception(f"Login error for {user_data.email}")
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="登录服务暂时不可用，请稍后重试"
    )
```

### 7. 注册端点泄露异常详情
**文件**：`backend/app/api/auth.py` — `register` 端点  
**问题**：`raise HTTPException(status_code=500, detail=f"注册失败: {str(e)}")`，数据库异常信息直接返回给用户。  
**修复建议**：日志记录详细错误，返回通用错误消息。

### 8. 前端 useUser Hook 手动解析 JWT（不安全）
**文件**：`src/hooks/useUser.ts`  
**问题**：直接从 localStorage 读取 token 并手动 base64 解码 payload，**不验证签名**。这意味着：
- Token 过期后仍显示为已登录
- 用户可手动修改 localStorage 中的 payload 内容
- 没有 token 刷新机制  
**修复建议**：添加 token 过期检查，至少验证 `exp` 字段；考虑实现 token 刷新逻辑。

### 9. 前端 api-client 401 处理不完善
**文件**：`src/lib/api-client.ts` — `handleUnauthorized`  
**问题**：`window.location.href = "/login"` 硬编码跳转，但 `access_token`、`user_role`、`tenant_id` 都存储在 localStorage，存在 XSS 窃取风险。  
**修复建议**：考虑使用 httpOnly cookie 存储 token，或至少添加 token 过期自动刷新机制。

### 10. 组织树查询 N+1 问题
**文件**：`backend/app/api/organization.py` — `get_organization_tree`  
**问题**：`build_tree` 递归函数对每个组织都执行一次独立查询获取子节点，深度为 N 的树将产生 O(N) 次数据库查询。  
**修复建议**：一次性加载所有组织到内存，用 Python 在内存中构建树结构：
```python
all_orgs = (await db.execute(select(Organization))).scalars().all()
org_map = {org.id: org for org in all_orgs}
# 在内存中递归构建
```

### 11. 仪表盘趋势接口存在 N+1 问题
**文件**：`backend/app/api/dashboard.py` — `get_dashboard_trends`  
**问题**：`period == "year"` 时循环 12 次，`period == "month"` 时循环 30 次，每次都执行独立 SQL 查询。  
**修复建议**：用单个聚合查询获取数据后在内存中分组。

### 12. docker-compose.yml 中硬编码数据库密码
**文件**：`docker-compose.yml`  
**问题**：`POSTGRES_PASSWORD=carbonos`、`POSTGRES_USER=carbonos` 硬编码在 compose 文件中。  
**修复建议**：使用 Docker secrets 或 `${POSTGRES_PASSWORD}` 环境变量引用。

### 13. 前端组件内定义子组件（不利于代码分割）
**文件**：`src/app/page.tsx`  
**问题**：`MatrixCard`、`TechItem`、`TeamCard` 组件定义在 page 文件中而非独立文件，增加单文件体积且不利于 tree-shaking。  
**修复建议**：提取到 `src/components/home/` 目录。

### 14. `Admin.py` 文件过大（567 行）
**文件**：`backend/app/api/admin.py`  
**问题**：单文件包含租户管理、统计、平台设置、员工管理等多个不相关模块。  
**修复建议**：拆分为 `admin_tenants.py`、`admin_stats.py`、`admin_settings.py`、`admin_staff.py`。

---

## 🟢 轻微问题（可择机优化）

### 15. datetime.utcnow() 已弃用
**文件**：多处（`security.py`、`auth.py`、`admin.py` 等）  
**问题**：Python 3.12+ 已弃用 `datetime.utcnow()`，推荐使用 `datetime.now(timezone.utc)`。  
**修复建议**：全局替换。

### 16. `health_check` 接口 Redis 异常吞掉
**文件**：`backend/app/main.py` — `health_check`  
**问题**：Redis 连接失败时 `status["redis"] = "disconnected"` 但仍返回 HTTP 200，监控系统无法区分健康状态。  
**修复建议**：Redis 不可用时返回 HTTP 503。

### 17. 前端 `lang="en"` 应为 `lang="zh-CN"`
**文件**：`src/app/layout.tsx`  
**问题**：项目为中文产品，但 `<html lang="en">`。  
**修复建议**：改为 `<html lang="zh-CN">`。

### 18. `SimulationService` 无认证保护
**文件**：`backend/app/api/simulation.py`  
**问题**：三个端点均无认证依赖，任何人可访问仿真数据。  
**修复建议**：添加 `Depends(get_current_active_user)`。

### 19. `passlib` 仍在依赖中但已弃用
**文件**：`backend/pyproject.toml`  
**问题**：`passlib[bcrypt]>=1.7.4` 仍在依赖列表中，但 `security.py` 已直接使用 `bcrypt`。  
**修复建议**：移除 `passlib` 依赖。

### 20. 缺少输入长度校验
**文件**：多个 Pydantic schema  
**问题**：`UserCreate`、`SurveyCreate` 等 schema 中 `name`、`company`、`phone` 等字段未设置 `max_length`，可能导致数据库插入超长字符串。  
**修复建议**：在 Pydantic 字段上添加 `max_length` 约束。

### 21. 前端硬编码外部图片 URL
**文件**：`src/app/page.tsx`  
**问题**：`bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa...')]` 依赖外部 Unsplash 服务，加载慢或不可用时影响页面。  
**修复建议**：下载图片到本地 `public/` 目录。

### 22. CORS 配置中硬编码域名
**文件**：`backend/app/main.py`  
**问题**：`allow_origins` 列表硬编码了 `scdc.cloud` 等域名，扩展性差。  
**修复建议**：从环境变量读取，支持逗号分隔多域名。

---

## ✅ 项目亮点总结

1. **多租户架构设计到位**：JWT 注入 tenant_id、中间层 tenant 过滤、`tenant_filter` 工具函数形成完整的租户隔离体系（P0-002/004）

2. **安全中间件丰富**：ASGI 纯中间件实现（避免 Starlette BaseHTTPMiddleware 的 POST body 消费 bug），包含限流、认证限流、安全头、请求日志、Prometheus 监控

3. **API 客户端质量高**：`api-client.ts` 实现了超时、指数退避重试、401 自动跳转、类型安全错误类，是前端最佳实践

4. **结构化日志 + Prometheus 监控**：使用 `structlog` 和 `prometheus-client`，生产级可观测性就绪

5. **Redis 缓存管理层完善**：`CacheManager` 支持命名空间、模式删除、装饰器缓存，业务缓存方法（仪表盘、排放因子）粒度合理

6. **TypeScript strict 模式已启用**：`tsconfig.json` 中 `"strict": true`，前端类型安全有基础

7. **依赖注入模式规范**：FastAPI 的 `Depends` 使用正确，权限检查、数据库会话、当前用户获取都有清晰的依赖链

8. **安全响应头完整**：HSTS、X-Frame-Options、X-Content-Type-Options、Permissions-Policy 均已配置

9. **数据库迁移就绪**：使用 Alembic 管理 schema 变更，移除了 `create_all` 自动建表

10. **代码注释质量高**：中文注释清晰，P0/P1/P2 优先级标记便于追踪迭代进度

---

## 📋 修复优先级建议

| 优先级 | 问题编号 | 预估工时 |
|--------|----------|----------|
| P0 立即 | #1 #2 #3 #4 #5 | 4-6 小时 |
| P1 本周 | #6 #7 #8 #9 #10 #11 | 6-8 小时 |
| P2 迭代 | #12-#22 | 4-6 小时 |

---

**审查结论**：项目整体架构扎实，安全意识较强（多租户隔离、限流、安全头），但存在几处**数据隔离遗漏**和**信息泄露**的阻塞问题，需立即修复后方可上线。前端 token 管理和后端 N+1 查询是中长期优化重点。
