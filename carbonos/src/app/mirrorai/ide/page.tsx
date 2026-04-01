import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MonitorPlay, Layers, FileCode2, Terminal as TerminalIcon, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "MirrorAI IDE - 轻量级全能开发环境",
    description: "Lightweight AI-powered Web IDE. 基于 Electron + Vite 构建的无桌面边界新生态。",
};

export default function MirrorAIIDEPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white font-sans selection:bg-purple-500/30">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-4">
                    <div className="absolute inset-0 z-0 bg-gradient-to-tr from-slate-950 via-purple-950/20 to-blue-950/20" />
                    
                    <div className="container relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center">
                        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                            <MonitorPlay className="w-4 h-4" /> Lightweight AI-powered Web IDE
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
                            MirrorAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">IDE</span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-slate-300 font-light mb-12 max-w-3xl leading-relaxed">
                            打破重度编辑器的性能负担，利用基于 Vite + Electron 的跨平台能力，
                            打造极致响应速度的专属本地 AI 代码环境。
                        </p>

                        <div className="flex gap-4">
                            <button className="px-8 py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all">
                                了解内测详情
                            </button>
                            <button className="px-8 py-3.5 rounded-xl font-bold text-slate-300 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-all">
                                访问文档
                            </button>
                        </div>
                    </div>
                </section>

                {/* Core Architecture Matrix */}
                <section className="py-20 relative bg-slate-900/60 border-t border-slate-800">
                    <div className="container px-4 mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl font-bold mb-4 text-white">架构与生态</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            <TechMatrixCard
                                icon={FileCode2}
                                title="Monaco Editor"
                                desc="内置与 VS Code 同源的 Monaco 编辑器核心，提供顶级的语法高亮与智能代码补全体验。"
                                color="text-blue-400"
                            />
                            <TechMatrixCard
                                icon={TerminalIcon}
                                title="Xterm.js"
                                desc="无缝集成的 PTY 响应终端面板，实时执行构建脚本与项目部署，性能媲美原生命令行。"
                                color="text-emerald-400"
                            />
                            <TechMatrixCard
                                icon={Layers}
                                title="Electron IPC"
                                desc="主进程与渲染进程深度协同，安全调用 OS 底层 API 文件系统，支持超大项目秒级加载。"
                                color="text-yellow-400"
                            />
                            <TechMatrixCard
                                icon={ShieldCheck}
                                title="Vite 极速热重载"
                                desc="依托于 Vite 的超快 HMR 守护，修改可视化配置或扩展插件所见即所得，拒绝等待。"
                                color="text-purple-400"
                            />
                        </div>
                    </div>
                </section>

                {/* Preview / Mockup Section */}
                <section className="py-24 bg-slate-950">
                    <div className="container px-4 mx-auto max-w-5xl">
                        <div className="rounded-2xl border border-slate-800 bg-[#1e1e1e] shadow-2xl overflow-hidden ring-1 ring-white/10">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-black bg-[#2d2d2d]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="text-xs text-slate-400 font-medium tracking-wide">mirrorai-workspace - IDE</div>
                                <div className="w-12" />
                            </div>
                            
                            {/* Editor Body Simulator */}
                            <div className="flex h-[400px]">
                                {/* Sidebar */}
                                <div className="w-64 bg-[#252526] border-r border-black p-4">
                                    <div className="text-xs font-bold text-slate-400 mb-4 tracking-wider">EXPLORER</div>
                                    <div className="space-y-2 text-sm text-slate-300 font-mono">
                                        <div className="flex items-center gap-2"><span>📁</span> src</div>
                                        <div className="flex items-center gap-2 pl-4"><span>📄</span> main.ts</div>
                                        <div className="flex items-center gap-2 pl-4 text-purple-400 bg-purple-500/10 rounded px-1"><span>📄</span> agent.ts</div>
                                        <div className="flex items-center gap-2"><span>📄</span> package.json</div>
                                    </div>
                                </div>
                                
                                {/* Code / Terminal Area */}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex-1 bg-[#1e1e1e] p-6 font-mono text-sm leading-relaxed overflow-hidden">
                                        <div className="text-blue-400">import</div> {"{ AgentContext }"} <div className="text-blue-400 inline">from</div> <div className="text-orange-300">&apos;@mirrorai/core&apos;</div>;
                                        <br/><br/>
                                        <div className="text-purple-400 inline">export async function</div> runWorkflow(ctx: AgentContext) {"{"}<br/>
                                        &nbsp;&nbsp;<div className="text-slate-500 italic">// AI assist injection point</div><br/>
                                        &nbsp;&nbsp;<div className="text-blue-400 inline">const</div> res = <div className="text-purple-400 inline">await</div> ctx.model.predict(<div className="text-orange-300">&apos;Analyze this repo&apos;</div>);<br/>
                                        &nbsp;&nbsp;<div className="text-blue-400 inline">return</div> res.data;<br/>
                                        {"}"}
                                    </div>
                                    <div className="h-48 bg-[#181818] border-t border-black p-4 font-mono text-sm">
                                        <div className="text-emerald-400">➜</div> <div className="text-blue-400 inline">mirrorai-workspace</div> <span className="opacity-70">git:(main) ✗</span> npm run dev
                                        <br/>
                                        <span className="text-slate-400">VITE v5.3.1  ready in 240 ms</span><br/>
                                        <span className="text-emerald-400">➜</span>  <span className="text-slate-300">Local:   http://localhost:5173/</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}

function TechMatrixCard({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
    return (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 transition-all hover:border-slate-700 group">
            <div className={`w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-800 group-hover:scale-110 transition-transform ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
