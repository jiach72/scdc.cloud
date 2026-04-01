# API 版本控制策略

## 当前版本

| 项目 | 说明 |
|------|------|
| 当前版本 | **v1** |
| 前缀 | `/api/v1/` |
| 状态 | Stable（稳定版） |
| 引入日期 | 2025-12 |

## 版本管理方式

CarbonOS API 采用 **URL 路径版本控制** 策略：

```
https://api.carbonos.com/api/v1/...
https://api.carbonos.com/api/v2/...   (未来)
```

### 为什么选择 URL 版本控制？

- **明确性**：版本号在 URL 中显式可见，无需解析 header
- **缓存友好**：不同版本天然不同 URL，无需 Vary 头处理
- **文档清晰**：API 文档和 SDK 可以直接引用具体路径
- **行业通用**：GitHub、Google、Stripe 等主流 API 均采用此方案

## 版本演进规则

### 非破坏性变更（不升版本）

以下变更可直接在当前版本中进行：

- 新增 API 端点
- 新增可选请求参数
- 新增响应字段
- 修复错误返回码

### 破坏性变更（必须升版本）

以下变更需要创建新版本：

- 删除或重命名端点
- 修改必选参数
- 修改响应字段的数据类型
- 修改认证方式
- 修改错误码体系

## 版本生命周期

```
v1 发布 → v2 发布 → v1 标记 Deprecated → v1 下线
         ↑                                    ↑
     新功能开发                          至少维护12个月
```

| 阶段 | 说明 | 时限 |
|------|------|------|
| **Active** | 正常服务，接受 bug 修复和新功能 | - |
| **Deprecated** | 不再接受新功能，仅安全修复 | 至少 12 个月 |
| **Sunset** | 停止服务，返回 410 Gone | 公告后 6 个月 |

## 当前 API 端点清单（v1）

### 认证
- `POST /api/v1/auth/login` — 用户登录
- `POST /api/v1/auth/register` — 企业注册

### 产品碳足迹 (PCF)
- `GET /api/v1/pcf/products` — 产品列表
- `GET /api/v1/pcf/products/:id` — 产品详情

### 能耗数据
- `GET /api/v1/energy/records` — 能耗记录
- `POST /api/v1/energy/records` — 录入数据

### AI 模拟
- `GET /api/v1/simulation/prediction` — 能耗预测

### 组织管理
- `GET /api/v1/organizations` — 组织列表
- `POST /api/v1/organizations` — 创建组织
- `DELETE /api/v1/organizations/:id` — 删除组织

## 未来升级路径

### v2 规划方向

1. **GraphQL 支持**：考虑为复杂查询场景提供 GraphQL 端点
2. **分页标准化**：统一 Cursor-based 分页（替代当前 Offset 分页）
3. **批量操作 API**：批量创建、批量更新端点
4. **Webhook 事件通知**：异步事件回调机制
5. **国际化错误信息**：错误响应支持多语言

### 客户端适配建议

```typescript
// 建议使用环境变量管理 API 版本
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api/v1";

// SDK 中抽象版本层
const apiClient = axios.create({
  baseURL: API_BASE,
  // 未来只需修改 baseURL 即可升级版本
});
```

## 版本迁移指南（v1 → v2，未来）

迁移清单发布后将包含：

1. 破坏性变更列表
2. 逐条迁移说明
3. 自动化迁移脚本（如适用）
4. 兼容性测试用例
5. 回滚方案

---

*最后更新：2026-03-30 | 文档维护：CarbonOS 平台组*
