import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Terminal, Box, Zap, Code2, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "MirrorAI Code - 终端智能全栈助手",
    description: "基于 Bun 运行时，带完整 Ink TUI，支持本地无缝接入大模型代理的下一代终端智能助手。",
};

export default function MirrorAICodePage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white font-sans selection:bg-blue-500/30">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-emerald-950/20" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

                    <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium tracking-wide mb-6 bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <Terminal className="w-4 h-4" /> 终端智能重构
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                            MirrorAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Code</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
                            基于极致原生性能打造。支持完整的终端可视化 TUI 和 MCP 无缝插件接入，
                            让大模型 Agent 与你的本地工作流融为一体。
                        </p>

                        {/* Terminal Mockup */}
                        <div className="mx-auto max-w-2xl bg-black/60 rounded-xl overflow-hidden border border-slate-800 shadow-2xl text-left">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-xs text-slate-500 font-mono">mirror-ai --session init</span>
                            </div>
                            <div className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                <span className="text-blue-400">$</span> npm install -g @mirrorai/code
                                {"\n"}<span className="text-slate-500 opacity-60">added 184 packages in 2s</span>
                                {"\n"}
                                {"\n"}<span className="text-emerald-400">✓</span> MirrorAI Code runtime initialized
                                {"\n"}<span className="text-blue-400">?</span> What would you like to build today? <span className="animate-pulse">_</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Features */}
                <section className="py-24 bg-slate-900/50 border-y border-slate-800/50">
                    <div className="container px-4 mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={Box}
                                title="完整 Ink TUI 架构"
                                desc="摒弃传统枯燥的命令行流输出，基于 React Ink 提供丰富可视化的进度追踪、选择菜单和状态交互。"
                            />
                            <FeatureCard
                                icon={Cpu}
                                title="Bun 高能驱动"
                                desc="采用最新的 Bun 运行时环境代替 Node.js，提供极速响应效率与出色的 TypeScript 原生解析性能。"
                            />
                            <FeatureCard
                                icon={Code2}
                                title="高级 MCP 支持"
                                desc="内置 Model Context Protocol (MCP) 服务器客户端体系，无缝连接私有数据和企业级安全隔离环境。"
                            />
                        </div>
                    </div>
                </section>

                {/* Modes section */}
                <section className="py-24">
                    <div className="container px-4 mx-auto max-w-5xl">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-slate-200">全场景运行模式</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-500/30 transition-colors">
                                <div className="bg-blue-500/10 p-3 rounded-xl mb-4 text-blue-400">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">无头命令行 (--print)</h3>
                                <p className="text-slate-400">支持完全静默模式与 CI/CD 环境。一键融入您的自动化测试与部署工作流，让代码审查全自动进行。</p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-start hover:border-red-500/30 transition-colors">
                                <div className="bg-red-500/10 p-3 rounded-xl mb-4 text-red-400">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">降级 Recovery CLI 保护</h3>
                                <p className="text-slate-400">面对极端环境，自动降级为简单的 Readline 文本界面，保证关键任务不会因图形依赖缺失而中断。</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800/80 hover:-translate-y-1 transition-transform duration-300">
            <Icon className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-slate-100 mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
        </div>
    );
}
