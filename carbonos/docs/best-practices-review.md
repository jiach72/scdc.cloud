# SCDC CarbonOS 项目 - 最佳实践审查报告

**审查人**：工部尚书  
**审查日期**：2026-03-20  
**项目路径**：`/mnt/c/Users/jiach/Documents/AntigravityCode/scdc/carbonos`  
**框架版本**：Next.js 16.1.6 / React 19.2.3  
**审查依据**：nextjs-app-router-patterns + vercel-react-best-practices

---

## 一、总体评分

| 维度 | 评分 (10分制) | 说明 |
|------|:---:|------|
| Server/Client Components 使用 | 3 | 几乎全客户端渲染，丧失 App Router 核心优势 |
| 路由与布局组织 | 7 | 路由组使用合理，布局层次清晰 |
| 数据获取模式 | 5 | 仅客户端 fetch，无 Server 端数据获取 |
| 元数据 API | 3 | 仅有根 layout 的静态 metadata，页面级缺失 |
| 字体优化 | 8 | next/font/google 使用规范 |
| 组件设计 | 6 | 组件职责基本清晰，但粒度偏大 |
| Hooks 使用 | 7 | useMemo/useCallback 使用合理 |
| 状态管理 | 5 | 简单状态管理尚可，缺全局状态方案 |
| 性能优化 | 5 | dynamic import 有使用，但优化面窄 |
| 错误处理 | 2 | 无 Error Boundary、无 loading.tsx、无 error.tsx |
| 可访问性 | 5 | aria-label 有使用，但语义化HTML不足 |
| **综合评分** | **5.0** | 功能可用但工程化严重不足 |

---

## 二、问题清单

### 🔴 阻塞级问题（必须立即修复）

---

#### 🔴-1：所有页面标记为 "use client"，丧失 SSR/Streaming 优势

- **文件位置**：`src/app/` 下 26/33 个 page.tsx 及 2 个 layout.tsx
- **当前做法**：几乎所有页面组件（page.tsx）都以 `"use client"` 开头，包括内容完全静态的页面（如 about、core-tech、energy-solutions 等）
- **推荐做法**：
  - 静态内容页面（about、core-tech、energy-solutions、pricing、solutions、digital-assets、ai-models、ai-computing）应为 **Server Components**
  - 仅含交互逻辑的部分才应标记为 "use client"，可拆分为 Client 子组件
  - 数据获取应在 Server Component 中完成，通过 props 传给 Client Component
- **改进示例**：
  ```tsx
  // ✅ src/app/about/page.tsx — 应为 Server Component
  import { SiteHeader } from "@/components/layout/SiteHeader"; // 需改为 Server 兼容
  import { SiteFooter } from "@/components/layout/SiteFooter";
  
  export default function AboutPage() {
    // 直接渲染静态内容，享受 SSR + Streaming
    return <div>...</div>;
  }
  ```
  ```tsx
  // ✅ 仅交互部分拆分
  // components/about/TeamCarousel.tsx
  "use client";
  export function TeamCarousel() { /* 交互逻辑 */ }
  ```

---

#### 🔴-2：全站无 Error Boundary / error.tsx / not-found.tsx

- **文件位置**：整个 `src/app/` 目录
- **当前做法**：没有任何 `error.tsx`、`not-found.tsx` 文件。运行时错误会直接白屏
- **推荐做法**：
  - 在根 layout 下添加 `error.tsx`（全局错误边界）
  - 在 `(system)/` 和 `(admin)/` 路由组下添加专属 `error.tsx`
  - 添加 `not-found.tsx` 自定义 404 页面
- **改进示例**：
  ```tsx
  // src/app/error.tsx
  "use client";
  export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">系统出了点问题</h2>
          <p className="text-slate-400 mb-6">{error.message}</p>
          <button onClick={reset} className="bg-emerald-600 text-white px-6 py-2 rounded-lg">
            重试
          </button>
        </div>
      </div>
    );
  }
  ```

---

#### 🔴-3：全站无 loading.tsx，缺少 Suspense 加载状态

- **文件位置**：整个 `src/app/` 目录
- **当前做法**：数据加载时直接显示空白或自定义 spinner（DashboardPage 中有内联 spinner）
- **推荐做法**：使用 `loading.tsx` + Suspense 边界实现流式加载体验
- **改进示例**：
  ```tsx
  // src/app/(system)/dashboard/loading.tsx
  export default function DashboardLoading() {
    return (
      <div className="min-h-screen bg-slate-950 p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-slate-800 rounded w-64" />
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  ```

---

#### 🔴-4：页面级 metadata 完全缺失，SEO 极差

- **文件位置**：除根 layout 外的所有 page.tsx
- **当前做法**：仅有根 layout.tsx 的全局 metadata。`about`、`core-tech`、`solutions` 等页面完全无专属标题和描述
- **推荐做法**：为每个公共页面导出 `metadata` 或 `generateMetadata`
- **改进示例**：
  ```tsx
  // src/app/about/page.tsx
  import type { Metadata } from "next";
  
  export const metadata: Metadata = {
    title: "关于我们 - SCDC 创电云",
    description: "苏州创电云科技有限公司，深耕 BMS/EMS 研发，服务企业超 50 家",
    openGraph: {
      title: "关于 SCDC 创电云",
      description: "连接物理能源世界与数字价值世界的桥梁",
    },
  };
  
  export default function AboutPage() { /* ... */ }
  ```

---

#### 🔴-5：未使用 next/image，外部图片直接 CSS URL 加载

- **文件位置**：`src/app/page.tsx`、`src/app/news/page.tsx`
- **当前做法**：`page.tsx` 中使用 `bg-[url('https://images.unsplash.com/...')]` 加载背景图；`news/page.tsx` 用 `<img>` 直接加载 Unsplash 图片
- **推荐做法**：使用 `next/image` 享受自动优化（WebP/AVIF、懒加载、响应式尺寸）
- **改进示例**：
  ```tsx
  // ✅ 改用 next/image
  import Image from "next/image";
  
  <Image
    src="https://images.unsplash.com/photo-1451187580459..."
    alt="科技背景"
    fill
    className="object-cover opacity-20 mix-blend-overlay"
    priority // Hero 区域图片优先加载
  />
  ```

---

### 🟡 重要问题（优先修复）

---

#### 🟡-1：useUser Hook 每个使用处重复调用，无全局状态共享

- **文件位置**：`src/hooks/useUser.ts`、`src/app/(system)/layout.tsx`、`src/components/layout/DashboardSidebar.tsx`
- **当前做法**：`useUser()` 在 SystemLayout 和 DashboardSidebar 中各自独立调用，各自独立解码 JWT，导致同一次渲染周期重复计算
- **推荐做法**：使用 React Context 提供全局 User 状态，在根级别 Provider 一次解码
- **改进示例**：
  ```tsx
  // src/contexts/UserContext.tsx
  "use client";
  import { createContext, useContext, useState, useEffect, ReactNode } from "react";
  
  interface User { id: string; email: string; name?: string; role: string; tenant_id?: string | null; }
  const UserContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });
  
  export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // 一次解码，全局共享
    useEffect(() => { /* 解码逻辑 */ }, []);
    return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
  }
  
  export const useUser = () => useContext(UserContext);
  ```

---

#### 🟡-2：Login 页面直接使用 fetch 而非统一 api-client

- **文件位置**：`src/app/login/page.tsx` 第 52-65 行、第 93-110 行
- **当前做法**：登录和注册使用原生 `fetch()`，绕过了 `api-client.ts` 的超时、重试、错误处理机制
- **推荐做法**：统一使用 `apiClient` 或创建专门的 `authClient`
- **改进示例**：
  ```tsx
  // 在 api-client.ts 中增加 auth 方法
  export const authClient = {
    login: (email: string, password: string) =>
      apiClient.post<LoginResponse>("/api/v1/auth/login", { email, password }),
    register: (data: RegisterData) =>
      apiClient.post<RegisterResponse>("/api/v1/auth/register", data),
  };
  ```

---

#### 🟡-3：Dashboard 实时轮询 3 秒，无节流/防抖

- **文件位置**：`src/app/(system)/dashboard/page.tsx` 第 38-56 行
- **当前做法**：`setInterval(fetchRealtime, 3000)` 固定 3 秒轮询，用户不在当前页面时仍然请求
- **推荐做法**：使用 `requestAnimationFrame` 或基于页面可见性 API 的轮询；考虑改用 Server-Sent Events (SSE) 或 WebSocket
- **改进示例**：
  ```tsx
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const poll = async () => {
      if (document.hidden) { timeoutId = setTimeout(poll, 3000); return; }
      await fetchRealtime();
      timeoutId = setTimeout(poll, 3000);
    };
    poll();
    return () => clearTimeout(timeoutId);
  }, []);
  ```

---

#### 🟡-4：根 layout html lang="en" 但内容全为中文

- **文件位置**：`src/app/layout.tsx` 第 22 行
- **当前做法**：`<html lang="en">`
- **推荐做法**：`<html lang="zh-CN">`

---

#### 🟡-5：SiteHeader / SiteFooter 是 Client Component 但内容几乎全是静态链接

- **文件位置**：`src/components/layout/SiteHeader.tsx`、`src/components/layout/SiteFooter.tsx`
- **当前做法**：整个 SiteHeader 标记为 "use client"，仅因移动端 menu 的 `useState` 和 `usePathname`
- **推荐做法**：将静态导航部分拆为 Server Component，仅移动端 Sheet 部分为 Client Component
- **改进示例**：
  ```tsx
  // components/layout/NavigationServer.tsx — Server Component
  // 包含所有 <Link> 和桌面端导航
  
  // components/layout/MobileMenu.tsx — "use client"
  // 仅包含 Sheet + useState 逻辑
  ```

---

#### 🟡-6：useUser Hook 在 SSR 环境调用 window/localStorage

- **文件位置**：`src/hooks/useUser.ts` 第 16-17 行
- **当前做法**：直接访问 `localStorage.getItem("access_token")` 和 `window.atob()`
- **推荐做法**：虽然已有 `typeof window` 判断，但 useEffect 中无 guard。应更明确地处理 SSR 场景
- **改进示例**：添加 `typeof window === 'undefined'` 早期 return

---

### 🟢 建议级问题（可选优化）

---

#### 🟢-1：关于页面（about）中硬编码团队数据

- **文件位置**：`src/app/about/page.tsx`
- **当前做法**：团队成员数据、时间线、合作方列表全部硬编码在组件内部
- **推荐做法**：抽取为独立的 `data/about.ts` 常量文件，或通过 CMS/API 获取

---

#### 🟢-2：ROICalculator 中的计算常量应提取

- **文件位置**：`src/components/calculator/ROICalculator.tsx`
- **当前做法**：排放因子、碳价、汇率等常量定义在组件文件顶部
- **推荐做法**：移至 `lib/constants/carbon.ts`，便于维护和国际化

---

#### 🟢-3：DashboardSidebar 有重复的 import 语句

- **文件位置**：`src/components/layout/DashboardSidebar.tsx`
- **当前做法**：`import { toast } from "sonner"` 和 `import { useRouter } from "next/navigation"` 在组件中间重复声明（有 `// ... (navItems definition)` 注释）
- **推荐做法**：所有 import 统一放在文件顶部

---

#### 🟢-4：News 页面使用 Unsplash URL 但无 alt 属性

- **文件位置**：`src/app/news/page.tsx`
- **当前做法**：图片无 `alt` 描述
- **推荐做法**：添加有意义的 alt 文本

---

#### 🟢-5：Products Layout 引入了 ChevronRight 但未使用

- **文件位置**：`src/app/products/layout.tsx` 第 2 行
- **当前做法**：`import { ChevronRight } from "lucide-react"` 但模板中未引用
- **推荐做法**：移除未使用的 import

---

#### 🟢-6：navigation.tsx（sys-portal）混用 router.push 和 window.location.href

- **文件位置**：`src/app/login/page.tsx` 第 72 行 vs 第 78 行
- **当前做法**：超级管理员用 `window.location.href = "/admin"`，普通用户用 `window.location.href = "/dashboard"`
- **推荐做法**：统一使用 `router.push()` 进行客户端导航（除非需要刷新 token 等强制 reload 场景）

---

## 三、架构优化建议

### 3.1 Server Component 改造路线图

```
当前状态（全 Client SPA）         目标状态（混合渲染）

┌─────────────────────┐     ┌─────────────────────────┐
│  "use client"        │     │  Server Component (默认)  │
│  ├── 路由获取        │     │  ├── metadata 导出        │
│  ├── 数据 fetch      │  →  │  ├── async 数据获取       │
│  ├── 渲染            │     │  ├── 流式 Suspense        │
│  └── 交互逻辑        │     │  └── <ClientInteractive /> │
└─────────────────────┘     └─────────────────────────┘
```

**优先改造清单**：
1. `about/page.tsx` → 纯 Server Component（零交互）
2. `core-tech/page.tsx` → 纯 Server Component
3. `energy-solutions/page.tsx` → 纯 Server Component
4. `pricing/page.tsx` → Server Component + Client 表格交互
5. `page.tsx`（首页）→ Server Component + Client ROICalculator 子组件
6. `(system)/dashboard/page.tsx` → Server Component shell + Client 数据获取子组件

### 3.2 数据获取架构

```
推荐模式：

Server Component           Client Component
┌──────────────────┐      ┌──────────────────┐
│ async fetch(...) │─────→│ props 接收数据    │
│ const data = ... │      │ useState 仅用于   │
│ <View data={…} />│      │ 本地交互状态     │
└──────────────────┘      └──────────────────┘
        ↓
  Suspense boundary
        ↓
  loading.tsx (骨架屏)
```

### 3.3 推荐的路由结构优化

```
src/app/
├── layout.tsx              # 根布局 (Server, metadata)
├── page.tsx                # 首页 (Server → 拆 Client 子组件)
├── error.tsx               # 🔴 新增：全局错误边界
├── not-found.tsx           # 🔴 新增：404 页面
├── loading.tsx             # 🔴 新增：全局加载状态
│
├── (marketing)/            # 🟢 新增：营销页面路由组
│   ├── layout.tsx          # SiteHeader + SiteFooter 包裹
│   ├── about/page.tsx      # Server Component
│   ├── core-tech/page.tsx  # Server Component
│   └── pricing/page.tsx    # Server + Client 混合
│
├── (system)/               # 现有：系统页面路由组
│   ├── layout.tsx          # "use client" (鉴权合理)
│   ├── dashboard/page.tsx
│   └── ...
│
└── (admin)/                # 现有：管理后台路由组
    ├── layout.tsx          # "use client" (鉴权合理)
    └── ...
```

### 3.4 性能优化建议

| 优化项 | 优先级 | 预期收益 |
|--------|:---:|------|
| 首页改 Server Component | 🔴 | FCP -40%, TTI -30% |
| next/image 替代 CSS url() | 🔴 | LCP -50%, 带宽 -30% |
| Suspense + loading.tsx | 🔴 | 感知加载速度显著提升 |
| 字体 subset: ["latin"] → 补充 "chinese" | 🟡 | 中文字符渲染一致性 |
| recharts dynamic import 已有，保持 | ✅ | 已达标 |
| next.config optimizePackageImports | ✅ | 已达标 |
| 安全 headers 配置 | ✅ | 已达标 |

---

## 四、总结

CarbonOS 项目在 **Next.js 配置层面**做得较好（安全 headers、bundle analyzer、package import 优化、API rewrite 代理），但在 **App Router 核心模式**上几乎没有利用：

1. **全站 Client-Side Rendering** 浪费了 Next.js 16 的 SSR/Streaming/Server Components 能力
2. **无错误边界/加载状态** 导致运行时错误白屏、数据加载无骨架屏
3. **SEO 严重缺失**（无页面级 metadata、html lang 错误）
4. **图片未优化**（未使用 next/image）

好消息是路由组布局设计合理、api-client 封装良好、hooks 使用基本规范。改造的核心是**将静态页面从 "use client" 迁移为 Server Component**，这能以最小改动获得最大性能收益。
