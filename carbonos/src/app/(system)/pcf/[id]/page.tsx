"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Box, CheckCircle, Truck, Factory, Hammer, Leaf, AlertTriangle } from "lucide-react";
import apiClient from "@/lib/api-client";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

interface PCFStage {
    name: string;
    value: number;
    color: string;
}

interface PCFMaterial {
    name: string;
    footprint: number;
}

interface PCFProduct {
    name: string;
    model: string;
    status: string;
    total_footprint: number;
    unit: string;
    stages?: PCFStage[];
    materials?: PCFMaterial[];
}

export default function PCFDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<PCFProduct | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiClient.get<PCFProduct>(`/api/v1/pcf/products/${params.id}`);
                setProduct(data);
            } catch (err) {
                if (err instanceof Error && err.message.includes("not found")) {
                    setError("not_found");
                } else {
                    setError("fetch_error");
                }
                console.error(err);
            }
        };
        if (params.id) fetchProduct();
    }, [params.id]);

    if (error === "not_found") {
        return (
            <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center">
                <div className="text-center space-y-4">
                    <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto" />
                    <h1 className="text-2xl font-bold text-white">产品不存在</h1>
                    <p className="text-slate-400">该产品 ID ({params.id}) 未找到，请检查链接是否正确。</p>
                    <Button onClick={() => router.push("/pcf")} className="bg-emerald-600 hover:bg-emerald-700">
                        返回产品列表
                    </Button>
                </div>
            </div>
        );
    }

    if (error === "fetch_error") {
        return (
            <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center">
                <div className="text-center space-y-4">
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
                    <h1 className="text-2xl font-bold text-white">加载失败</h1>
                    <p className="text-slate-400">获取产品数据时发生错误，请稍后重试。</p>
                    <Button onClick={() => router.push("/pcf")} className="bg-emerald-600 hover:bg-emerald-700">
                        返回产品列表
                    </Button>
                </div>
            </div>
        );
    }

    if (!product) return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <Skeleton className="h-8 w-32" />
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-5 w-40" />
                    </div>
                    <div className="space-y-2 text-right">
                        <Skeleton className="h-4 w-20 ml-auto" />
                        <Skeleton className="h-10 w-32 ml-auto" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
                        <Skeleton className="h-6 w-48" />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-[300px] rounded-xl" />
                        <Skeleton className="h-[200px] rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* 头部 */}
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-slate-400 hover:text-white mb-4 pl-0"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> 返回列表
                    </Button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 text-slate-400">
                                <span className="bg-slate-800 px-2 py-1 rounded text-xs">{product.model}</span>
                                <span className="flex items-center gap-1 text-xs">
                                    <CheckCircle className="h-3 w-3 text-emerald-500" /> {product.status}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-400">足迹总量</p>
                            <p className="text-3xl font-bold text-emerald-400">{product.total_footprint}</p>
                            <p className="text-xs text-slate-500">kgCO₂e / {product.unit}</p>
                        </div>
                    </div>
                </div>

                {/* BOM 解析 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">生命周期阶段分析 (LCA Stages)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {product.stages?.map((stage: PCFStage, idx: number) => (
                                    <div key={idx} className="relative pl-8 pb-1 last:pb-0">
                                        {/* Timeline Line */}
                                        <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-slate-800 last:hidden"></div>
                                        {/* Dot */}
                                        <div
                                            className="absolute left-[5px] top-2 h-4 w-4 rounded-full border-2 border-slate-950"
                                            style={{ backgroundColor: stage.color }}
                                        ></div>

                                        <div className="bg-slate-800/40 rounded-lg p-4 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                {/* Icons based on stage name simple mapping */}
                                                <div className="h-8 w-8 rounded bg-slate-700/50 flex items-center justify-center">
                                                    {stage.name.includes("原材料") ? <Box className="h-4 w-4 text-slate-400" /> :
                                                        stage.name.includes("制造") ? <Factory className="h-4 w-4 text-slate-400" /> :
                                                            stage.name.includes("运输") ? <Truck className="h-4 w-4 text-slate-400" /> :
                                                                <Leaf className="h-4 w-4 text-slate-400" />}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{stage.name}</p>
                                                    <p className="text-xs text-slate-500">ISO 14067 Stage {idx + 1}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold">{stage.value}</p>
                                                <p className="text-xs text-slate-500">kgCO₂e</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {/* 环形图 */}
                        <Card className="bg-slate-900/50 border-slate-800 h-[300px]">
                            <CardHeader>
                                <CardTitle className="text-white text-sm">排放占比</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={product.stages}
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {product.stages?.map((entry: PCFStage, index: number) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#fff" }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* 核心物料清单 */}
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white text-sm">关键物料清单 (Top Contributors)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {product.materials?.map((mat: PCFMaterial, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span className="text-slate-300">{mat.name}</span>
                                            <div className="text-right">
                                                <span className="block text-white font-medium">{mat.footprint.toLocaleString()} <span className="text-xs text-slate-500">kg</span></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
