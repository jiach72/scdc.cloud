"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/api-client";

interface User {
    id: string;
    email: string;
    name?: string;
    full_name?: string;
    role: string;
    tenant_id?: string | null;
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // 优先通过 API 获取用户信息（Cookie 已由后端 HttpOnly 设置）
                const data = await apiClient.get<User>("/api/v1/auth/me");

                let role = data.role;
                if (typeof role === "string") {
                    role = role.toLowerCase();
                }

                setUser({
                    id: data.id,
                    email: data.email,
                    name: data.full_name || data.name,
                    role: role,
                    tenant_id: data.tenant_id,
                });
            } catch (e) {
                console.error("Failed to fetch user info", e);
                // TODO: 生产环境移除 localStorage fallback
                localStorage.removeItem("access_token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
