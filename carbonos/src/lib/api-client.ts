/**
 * CarbonOS API 客户端
 *
 * 功能特性：
 * - 请求超时 (默认 15s)
 * - 自动重试 (GET/DELETE 最多 2 次，指数退避)
 * - 统一错误处理 & 类型安全
 * - 401 自动跳转登录
 * - Token 刷新 ready（预留接口）
 */

// ============ 类型定义 ============

/** API 错误结构（与后端 FastAPI HTTPException.detail 对齐） */
export class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly detail: string,
        public readonly raw?: unknown
    ) {
        super(detail);
        this.name = "ApiError";
    }

    /** 是否为客户端错误 (4xx) */
    get isClientError(): boolean {
        return this.status >= 400 && this.status < 500;
    }

    /** 是否为服务端错误 (5xx) */
    get isServerError(): boolean {
        return this.status >= 500;
    }
}

interface RequestConfig extends Omit<RequestInit, "body"> {
    /** 请求超时 (毫秒)，默认 15000 */
    timeout?: number;
    /** 最大重试次数（仅幂等请求），默认 2 */
    maxRetries?: number;
    /** 是否跳过认证 header */
    skipAuth?: boolean;
}

// ============ 内部工具 ============

/** 获取 API 路径（通过 Next.js rewrites 代理） */
const resolveUrl = (path: string): string =>
    path.startsWith("/") ? path : `/${path}`;

/** 获取认证 headers */
const getAuthHeaders = (skipAuth = false): HeadersInit => {
    if (skipAuth) return { "Content-Type": "application/json" };

    // TODO: 生产环境移除 localStorage fallback（Cookie 由后端 HttpOnly 设置）
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null;

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

/** 带超时的 fetch，支持外部 signal 组合取消 */
const fetchWithTimeout = (
    url: string,
    init: RequestInit,
    timeoutMs: number
): Promise<Response> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    // 组合外部 signal 与超时 signal
    const signals: AbortSignal[] = [controller.signal];
    if (init.signal) signals.push(init.signal);
    const combinedSignal =
        signals.length > 1 && "any" in AbortSignal
            ? (AbortSignal as any).any(signals)
            : controller.signal;

    // 外部 signal 取消时也取消 controller
    if (init.signal) {
        init.signal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    return fetch(url, { ...init, signal: combinedSignal }).finally(() =>
        clearTimeout(timer)
    );
};

/** 指数退避延迟 */
const backoffDelay = (attempt: number): Promise<void> =>
    new Promise((resolve) =>
        setTimeout(resolve, Math.min(1000 * 2 ** attempt, 8000))
    );

/** 是否为可重试的 HTTP 状态码 */
const isRetryableStatus = (status: number): boolean =>
    status === 429 || status >= 500;

/** 处理 401 — 跳转登录页（Cookie 已过期或无效） */
const handleUnauthorized = (): void => {
    if (typeof window === "undefined") return;

    // TODO: 生产环境移除 localStorage 清理（不再使用 localStorage 存储 token）
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("tenant_id");

    // 避免在登录页死循环
    const currentPath = window.location.pathname;
    if (!currentPath.includes("login") && !currentPath.includes("sys-portal")) {
        window.location.href = "/login";
    }
};

// ============ 核心请求方法 ============

/**
 * 统一请求方法
 * @param method HTTP 方法
 * @param path API 路径
 * @param body 请求体 (自动 JSON 序列化)
 * @param config 配置项
 */
async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    config: RequestConfig = {}
): Promise<T> {
    const {
        timeout = 15_000,
        maxRetries = method === "GET" || method === "DELETE" ? 2 : 0,
        skipAuth = false,
        ...restInit
    } = config;

    const url = resolveUrl(path);
    const init: RequestInit = {
        method,
        headers: getAuthHeaders(skipAuth),
        credentials: "include", // 自动携带 Cookie（HttpOnly JWT）
        body: body ? JSON.stringify(body) : undefined,
        ...restInit,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            // 重试时等待（首次不等待）
            if (attempt > 0) {
                await backoffDelay(attempt - 1);
            }

            const response = await fetchWithTimeout(url, init, timeout);

            // 401 特殊处理
            if (response.status === 401) {
                handleUnauthorized();
                const errorBody = await response.json().catch(() => ({ detail: "认证已过期，请重新登录" }));
                throw new ApiError(401, errorBody.detail || "认证已过期", errorBody);
            }

            // 非 OK 响应
            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({ detail: `请求失败 (${response.status})` }));
                const apiError = new ApiError(
                    response.status,
                    errorBody.detail || `HTTP ${response.status}`,
                    errorBody
                );

                // 可重试的错误 → 继续循环
                if (isRetryableStatus(response.status) && attempt < maxRetries) {
                    lastError = apiError;
                    continue;
                }

                throw apiError;
            }

            // 204 No Content
            if (response.status === 204) {
                return undefined as T;
            }

            return (await response.json()) as T;
        } catch (err) {
            // AbortError = 超时
            if (err instanceof DOMException && err.name === "AbortError") {
                lastError = new ApiError(0, `请求超时 (${timeout}ms)`);
                if (attempt < maxRetries) continue;
                throw lastError;
            }

            // 网络错误 → 重试
            if (err instanceof TypeError && attempt < maxRetries) {
                lastError = new ApiError(0, "网络连接失败，请检查网络");
                continue;
            }

            // ApiError 直接抛出
            if (err instanceof ApiError) throw err;

            // 其他未知错误
            throw err;
        }
    }

    // 重试耗尽
    throw lastError || new ApiError(0, "请求失败");
}

// ============ 公开 API ============

export const apiClient = {
    /** GET 请求（幂等，自动重试） */
    get: <T>(path: string, config?: RequestConfig) =>
        request<T>("GET", path, undefined, config),

    /** POST 请求（非幂等，不自动重试） */
    post: <T>(path: string, body?: unknown, config?: RequestConfig) =>
        request<T>("POST", path, body, config),

    /** PUT 请求（幂等，自动重试） */
    put: <T>(path: string, body?: unknown, config?: RequestConfig) =>
        request<T>("PUT", path, body, config),

    /** PATCH 请求（非幂等，不自动重试） */
    patch: <T>(path: string, body?: unknown, config?: RequestConfig) =>
        request<T>("PATCH", path, body, config),

    /** DELETE 请求（幂等，自动重试） */
    delete: <T>(path: string, config?: RequestConfig) =>
        request<T>("DELETE", path, undefined, config),

    /** 原始 fetch（不含重试/超时，用于特殊场景如文件上传） */
    raw: (path: string, options?: RequestInit): Promise<Response> =>
        fetch(resolveUrl(path), {
            headers: getAuthHeaders(),
            ...options,
        }),
};

export default apiClient;
