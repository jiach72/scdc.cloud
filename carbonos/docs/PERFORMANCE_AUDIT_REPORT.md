# SCDC CarbonOS 性能审计报告

> 审计时间：2026-03-20 | 审计人：户部尚书 | 项目版本：v0.1.0

---

## 综合评分：6.2 / 10

| 维度 | 评分 | 说明 |
|------|------|------|
| Core Web Vitals 潜在风险 | 5.5 | 首页全客户端渲染，外部图片阻塞 LCP |
| 包大小 & Tree-shaking | 6.0 | framer-motion + recharts + lucide-react 体积大 |
| 代码分割 & 懒加载 | 6.5 | 仅 dashboard 做了 dynamic import，其余页面缺失 |
| 图片优化 | 4.0 | 首页直接引用外部 Unsplash 原图，未使用 next/image |
| 缓存策略 | 5.5 | 无 Cache-Control、无 Service Worker、无 CDN 配置 |
| 渲染性能 | 6.5 | Dashboard 3s 轮询无优化，SSR 缺失 |
| 网络优化 | 6.0 | 无 preload/preconnect，DNS prefetch 有配置 |
| 字体加载 | 8.0 | 使用 next/font/google，但缺少中文子集 |

---

## 🔴 严重影响（必须立即修复）

### 1. 首页 SSR 缺失 — 全页面客户端渲染

**问题描述：** `src/app/page.tsx` 标记了 `"use client"`，导致首页所有内容均在客户端渲染。Next.js 的 SSR/SSG 优势完全丧失，首次访问时用户看到白屏，LCP 和 FCP 严重受影响。

**文件位置：** `src/app/page.tsx`（第 1 行）

**性能影响：**
- LCP 预计 > 4s（需等 JS 下载、解析、执行后才能渲染）
- SEO 无法被爬虫抓取内容
- 用户在弱网环境下体验极差

**优化建议：**
- 移除 `"use client"`，将首页改为 Server Component
- 仅将需要交互的部分（如 ROI Calculator）提取为独立 Client Component
- 首屏静态内容（Hero、Business Matrix、Core Tech、About Us）完全可 SSR

```tsx
// 推荐结构：src/app/page.tsx (Server Component)
import { HeroSection } from '@/components/home/HeroSection'; // Server
import { ROICalculator } from '@/components/calculator/ROICalculator'; // Client
import { BusinessMatrix } from '@/components/home/BusinessMatrix'; // Server

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ROICalculator />  {/* 唯一的 "use client" 部分 */}
      <BusinessMatrix />
    </>
  );
}
```

---

### 2. 首页外部图片未优化 — 阻塞 LCP

**问题描述：** 首页 Hero 区域通过 CSS `bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072...')]` 直接引用外部 Unsplash 原图（未压缩、未使用现代格式、无法懒加载）。

**文件位置：** `src/app/page.tsx`（第 22 行）

**性能影响：**
- 外部图片文件巨大（预估 2-4MB），完全阻塞 LCP
- 无法利用 CDN 缓存
- 无法使用 `<link rel="preload">` 预加载
- 图片加载失败时 Hero 区域无降级方案

**优化建议：**
```tsx
// 方案 A：下载到本地，使用 next/image
import Image from 'next/image';

<Image
  src="/images/hero-bg.webp"  // 本地 WebP/AVIF
  alt="Hero background"
  fill
  priority
  quality={70}
  className="object-cover opacity-20 mix-blend-overlay"
/>

// 方案 B：如果必须用外部图片，至少添加 preload
// layout.tsx
<link rel="preload" as="image" href="https://images.unsplash.com/..." />
```

---

### 3. Dashboard 3 秒轮询无优化 — 持续消耗资源

**问题描述：** `src/app/(system)/dashboard/page.tsx` 使用 `setInterval(fetchRealtime, 3000)` 每 3 秒轮询 API，但存在多个问题：
1. 页面不可见时仍在轮询（浪费资源、耗电）
2. 无 AbortController 取消未完成请求
3. 无节流/防抖机制
4. 无 WebSocket/SSE 替代方案

**文件位置：** `src/app/(system)/dashboard/page.tsx`（第 68-71 行）

**性能影响：**
- 后台标签页持续消耗 CPU 和网络
- 移动端耗电严重
- 快速切换页面时可能出现内存泄漏

**优化建议：**
```tsx
useEffect(() => {
  const controller = new AbortController();

  const fetchRealtime = async () => {
    try {
      const data = await apiClient.get('/api/v1/simulation/realtime', {
        signal: controller.signal,
      });
      setSummary(prev => ({ ...prev, ... }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('实时数据获取失败', error);
      }
    }
  };

  fetchRealtime();
  const interval = setInterval(fetchRealtime, 3000);

  // 页面不可见时暂停轮询
  const handleVisibility = () => {
    if (document.hidden) {
      clearInterval(interval);
    } else {
      fetchRealtime();
      setInterval(fetchRealtime, 3000);
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  return () => {
    clearInterval(interval);
    controller.abort();
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}, []);
```

---

### 4. 大量页面使用 `"use client"` — 丧失 SSR 优势

**问题描述：** 20+ 个页面文件标记了 `"use client"`，其中许多页面内容完全可以 Server Render（如 about、core-tech、digital-assets、energy-solutions、products 等纯展示页面）。

**文件位置：** 
- `src/app/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/solutions/zero-carbon-park/page.tsx`
- `src/app/news/page.tsx`
- 以及 16+ 个其他页面

**性能影响：**
- 所有客户端组件必须等 JS bundle 下载执行后才渲染
- SEO 不友好（爬虫可能无法抓取客户端渲染内容）
- JavaScript 包体积增大

**优化建议：**
- 静态展示页面（about、core-tech、energy-solutions、products 等）应移除 `"use client"`
- 仅将需要交互的部分提取为独立的 Client Component
- 采用 Server Component + Client Component 混合模式

---

## 🟡 中等影响（建议尽快修复）

### 5. framer-motion 全量引入 — 包体积膨胀

**问题描述：** `framer-motion` 包体积约 120KB minified（~33KB gzipped），在多个页面全量引入 `motion`、`AnimatePresence`、`useMotionValue`、`useTransform`、`useSpring` 等。

**文件位置：**
- `src/app/diagnosis/page.tsx`（第 4 行）
- `src/app/pricing/page.tsx`（第 6 行）
- `src/app/solutions/zero-carbon-park/page.tsx`（第 8 行）

**性能影响：** 首次访问需下载约 33KB+ 额外的 gzip 数据

**优化建议：**
- 使用 `motion/react` 的懒加载版本
- 对简单动画考虑使用 CSS animation 替代
- 在 `next.config.ts` 中配置 `optimizePackageImports: ['framer-motion']`

---

### 6. lucide-react 大量图标导入

**问题描述：** 多个页面一次性导入 15-20 个 lucide-react 图标。

**文件位置：**
- `src/app/page.tsx`：9 个图标
- `src/app/diagnosis/page.tsx`：15 个图标
- `src/app/ai-models/page.tsx`：18 个图标
- `src/app/energy-solutions/page.tsx`：20 个图标

**性能影响：** lucide-react 虽已有 tree-shaking 支持，但大量导入仍增加 bundle 解析时间

**优化建议：**
- next.config.ts 已配置 `optimizePackageImports: ["lucide-react"]` ✅（部分缓解）
- 考虑按需导入或创建图标 barrel 文件统一管理

---

### 7. recharts 缺少懒加载

**问题描述：** `recharts` 包体积约 200KB+ minified（~60KB gzip）。Dashboard 页面已使用 `dynamic` 导入图表组件（✅），但 `recharts` 依赖本身可能仍被主 bundle 包含。

**文件位置：** `src/components/dashboard/charts/Charts.tsx`

**性能影响：** 主 bundle 增加约 60KB gzip

**优化建议：**
- 确认 recharts 通过 dynamic import 完全拆分
- 在 `next.config.ts` 中已配置 `optimizePackageImports: ["recharts"]` ✅
- 进一步确认 bundle analyzer 输出结果

---

### 8. HTTP 缓存头缺失

**问题描述：** `next.config.ts` 的 `headers()` 配置中只有安全相关的 header，缺少 `Cache-Control` 配置。

**文件位置：** `src/next.config.ts`（headers 函数）

**性能影响：**
- 静态资源每次请求都重新下载
- API 响应无法被浏览器缓存

**优化建议：**
```typescript
async headers() {
  return [
    // 静态资源缓存
    {
      source: '/_next/static/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    // API 响应短缓存
    {
      source: '/api/v1/:path*',
      headers: [{ key: 'Cache-Control', value: 'private, max-age=60, stale-while-revalidate=30' }],
    },
    // ...现有安全 headers
  ];
}
```

---

### 9. Solution Card 鼠标追踪动画 — 性能开销

**问题描述：** `SolutionCard` 组件为每个卡片创建 `useMotionValue`、`useTransform`、`useSpring` 三个 hook，在 `onMouseMove` 中实时更新。首页的 Business Matrix 区域也有类似 hover 动画。

**文件位置：** `src/app/solutions/zero-carbon-park/page.tsx`（第 27-48 行）

**性能影响：**
- 鼠标移动时持续触发 `requestAnimationFrame`
- 多个卡片同时存在时，内存开销增大
- 可能导致低端设备卡顿

**优化建议：**
- 考虑使用纯 CSS `:hover` 伪类 + CSS 变量实现类似效果
- 如果必须用 JS，添加 `will-change: transform` 和 `contain: layout`

---

## 🟢 轻微影响（可择机优化）

### 10. 字体未加载中文子集

**问题描述：** `src/app/layout.tsx` 中 Geist 和 Geist_Mono 字体仅配置了 `subsets: ["latin"]`，但页面大量使用中文内容。浏览器将回退到系统字体，导致字体切换闪烁（FOUT）。

**文件位置：** `src/app/layout.tsx`（第 5-11 行）

**性能影响：** 中文文本显示时字体闪烁，影响视觉稳定性（CLS）

**优化建议：**
```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // 中文内容使用系统字体栈，无需额外加载
});

// 在 globals.css 中为中文指定回退字体
body {
  font-family: var(--font-geist-sans), "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
}
```

---

### 11. AnimatedCounter 组件 — IntersectionObserver 滥用

**问题描述：** `AnimatedCounter` 组件为每个统计数据创建独立的 IntersectionObserver 和 setInterval，且动画结束后未清理 observer。

**文件位置：** `src/app/ai-models/page.tsx`（第 13-55 行）

**性能影响：** 4 个计数器 = 4 个 observer + 4 个 timer，轻微增加内存

**优化建议：**
- 复用单个 observer 实例
- 动画完成后断开 observer
- 考虑使用 CSS `@property` + `animation` 替代 JS 动画

---

### 12. API 客户端无响应缓存

**问题描述：** `apiClient` 实现了请求超时、重试、错误处理，但完全无响应缓存。Dashboard 每次切换回来都会重新请求历史数据。

**文件位置：** `src/lib/api-client.ts`

**性能影响：** 频繁的重复 API 请求增加服务器负载和用户等待时间

**优化建议：**
- 添加简单的内存缓存层（LRU cache）
- 对 GET 请求实现 SWR（stale-while-revalidate）模式
- 考虑使用 `swr` 或 `@tanstack/react-query` 替代手写 API 客户端

---

### 13. 预加载/预连接缺失

**问题描述：** 虽然 `X-DNS-Prefetch-Control: on` 已配置，但缺少关键的资源预加载。

**文件位置：** `src/next.config.ts`、`src/app/layout.tsx`

**性能影响：** 关键资源无法提前加载，增加渲染延迟

**优化建议：**
```tsx
// layout.tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
</head>
```

---

### 14. SiteHeader/SiteFooter 重复加载

**问题描述：** 几乎所有页面都重复导入 `SiteHeader` 和 `SiteFooter` 组件，这些组件在每个页面都重新创建 DOM。

**文件位置：** 所有页面

**性能影响：** 轻微，但代码冗余

**优化建议：**
- 将 SiteHeader/SiteFooter 移至根 layout.tsx
- 使用 Next.js Parallel Routes 或 Intercepting Routes 架构

---

## 优化优先级排序

| 优先级 | 问题 | 预期收益 | 工作量 |
|--------|------|----------|--------|
| P0 | 首页 SSR 改造 | LCP -2s+，SEO 大幅改善 | 中 |
| P0 | 外部图片本地化 | LCP -1s+ | 低 |
| P1 | Dashboard 轮询优化 | 减少后台资源消耗 90% | 低 |
| P1 | 静态页面移除 "use client" | 减少 JS 包体积，改善 FCP | 中 |
| P2 | 添加 Cache-Control headers | 二次访问速度提升 | 低 |
| P2 | framer-motion 优化 | 减少 bundle 体积 20-30KB | 低 |
| P2 | API 响应缓存 | 减少重复请求 | 中 |
| P3 | 字体子集优化 | 改善 CLS | 低 |
| P3 | 预加载/预连接 | 改善 LCP 0.2-0.5s | 低 |
| P3 | AnimatedCounter 优化 | 内存优化 | 低 |

---

## 亮点（做得好的地方）

1. ✅ **bundle-analyzer 已集成**：`@next/bundle-analyzer` 已配置，可通过 `npm run analyze` 分析
2. ✅ **optimizePackageImports 已配置**：lucide-react、recharts、radix-ui 的 tree-shaking 已启用
3. ✅ **Dashboard 图表使用 dynamic import**：`ssr: false` 避免 hydration mismatch
4. ✅ **API 客户端有完善的重试/超时机制**
5. ✅ **安全 headers 配置完善**：HSTS、X-Frame-Options 等
6. ✅ **使用 next/font/google**：字体自动优化，无 FOUT
7. ✅ **output: "standalone"**：Docker 部署友好

---

*报告完毕。建议优先处理 P0 级别的 SSR 改造和图片优化，预期可将 Lighthouse Performance 评分从当前预估 55-65 分提升至 80+ 分。*
