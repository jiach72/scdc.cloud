"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
    "dashboard": "工作台",
    "pcf": "产品碳足迹",
    "ai-analysis": "AI 智算分析",
    "organizations": "组织管理",
    "data-input": "数据接入",
    "carbon": "碳核算",
    "diagnostic": "碳诊断",
    "settings": "系统设置",
};

export function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    const crumbs = segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const label = routeLabels[seg] || seg;
        const isLast = i === segments.length - 1;
        return { href, label, isLast };
    });

    return (
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 px-8 pt-6 pb-2">
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
                <Home className="h-3.5 w-3.5" />
            </Link>
            {crumbs.map((crumb) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3" />
                    {crumb.isLast ? (
                        <span className="text-slate-300">{crumb.label}</span>
                    ) : (
                        <Link href={crumb.href} className="hover:text-slate-300 transition-colors">
                            {crumb.label}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
}
