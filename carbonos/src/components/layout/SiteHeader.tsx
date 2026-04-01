"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, ChevronDown, Zap, BrainCircuit, Gem, Building2, Database, Sparkles, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface NavGroup {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    items: { href: string; label: string; highlight?: boolean; external?: boolean }[];
}

const navGroups: NavGroup[] = [
    {
        label: "碳能",
        icon: Zap,
        items: [
            { href: "/solutions/zero-carbon-park", label: "零碳园区", highlight: true },
            { href: "/energy-solutions", label: "能源解决方案" },
            { href: "/core-tech", label: "核心技术" },
        ],
    },
    {
        label: "AI算力",
        icon: Cpu,
        items: [
            { href: "/ai-computing", label: "AI 算力" },
            { href: "/ai-models", label: "AI 模型" },
        ],
    },
    {
        label: "明镜AI",
        icon: Sparkles,
        items: [
            { href: "https://mirrorsaas.scdc.cloud", label: "MirrorAI SaaS", external: true },
            { href: "https://github.com/jiach72-oss/lobster-academy", label: "MirrorAI SDK", external: true },
            { href: "/mirrorai/code", label: "MirrorAI Code", highlight: true },
            { href: "/mirrorai/ide", label: "MirrorAI IDE", highlight: true },
        ],
    },
    {
        label: "金刚石",
        icon: Gem,
        items: [
            { href: "/products/heat-management", label: "散热产品" },
            { href: "https://twinturing.scdc.cloud", label: "人造饰品 · 双生图灵", external: true },
        ],
    },
    {
        label: "数字资产",
        icon: Database,
        items: [
            { href: "/digital-assets", label: "数字资产" },
        ],
    },
    {
        label: "公司",
        icon: Building2,
        items: [
            { href: "/pricing", label: "产品定价" },
            { href: "/diagnosis", label: "免费诊断", highlight: true },
            { href: "/about", label: "关于我们" },
        ],
    },
];

// Flat list for mobile drawer
const flatNavItems = navGroups.flatMap(g => g.items);

export function SiteHeader() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60">
                <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 lg:px-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 font-bold text-xl md:text-2xl tracking-tight text-white hover:opacity-90 transition-opacity">
                        <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg md:rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
                            <Leaf className="h-5 w-5 md:h-6 md:w-6 text-white" />
                        </div>
                        <span className="flex items-baseline gap-1 md:gap-1.5">
                            <span>创电云</span>
                            <span className="hidden sm:inline text-slate-500 text-base md:text-lg font-normal">|</span>
                            <span className="hidden sm:inline text-blue-400 text-sm md:text-lg font-medium tracking-wide">scdc.cloud</span>
                        </span>
                    </Link>

                    {/* 桌面端分组导航 */}
                    <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-400">
                        {navGroups.map((group) => {
                            const GroupIcon = group.icon;
                            const isGroupActive = group.items.some(item => pathname === item.href);
                            return (
                                <div
                                    key={group.label}
                                    className="relative"
                                    onMouseEnter={() => setOpenGroup(group.label)}
                                    onMouseLeave={() => setOpenGroup(null)}
                                >
                                    <button
                                        className={cn(
                                            "flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors",
                                            isGroupActive ? "text-white bg-slate-800/50" : "hover:text-white hover:bg-slate-800/30"
                                        )}
                                    >
                                        <GroupIcon className="w-4 h-4" />
                                        {group.label}
                                        <ChevronDown className={cn("w-3 h-3 transition-transform", openGroup === group.label && "rotate-180")} />
                                    </button>
                                    {openGroup === group.label && (
                                        <div className="absolute top-full left-0 pt-1 w-48">
                                            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                                                {group.items.map((item) => {
                                                    const isActive = pathname === item.href;
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            target={item.external ? "_blank" : undefined}
                                                            rel={item.external ? "noopener noreferrer" : undefined}
                                                            className={cn(
                                                                "block px-4 py-3 text-sm transition-colors",
                                                                isActive
                                                                    ? "text-white bg-slate-800"
                                                                    : item.highlight
                                                                        ? "text-emerald-400 hover:bg-slate-800 hover:text-emerald-300"
                                                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                            )}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* 右侧操作区 */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link href="/login" className="hidden sm:block">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-0">
                                CarbonOS™
                            </Button>
                        </Link>

                        {/* 移动端汉堡菜单按钮 */}
                        <button
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-slate-800 transition-colors"
                            onClick={() => setIsOpen(true)}
                            aria-label="打开菜单"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* 移动端抽屉导航 */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="left" className="w-72 p-0">
                    <SheetHeader className="p-6 border-b border-slate-800">
                        <SheetTitle className="flex items-center gap-3 text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
                                <Leaf className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">创电云</span>
                        </SheetTitle>
                    </SheetHeader>

                    <nav className="flex flex-col py-4">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <div className="px-6 pt-4 pb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <group.icon className="w-3 h-3" />
                                    {group.label}
                                </div>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                                                isActive
                                                    ? "bg-slate-800 text-white font-semibold border-l-2 border-blue-500"
                                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white",
                                                item.highlight && !isActive && "text-emerald-400"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>

                    {/* 底部登录按钮 */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                进入 CarbonOS™
                            </Button>
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
