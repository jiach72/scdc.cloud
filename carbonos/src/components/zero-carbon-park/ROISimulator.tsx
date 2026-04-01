"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function ROISimulator() {
    const [area, setArea] = useState(50); // 1000m2
    const [elec, setElec] = useState(100); // 10000kWh

    // 计算逻辑:
    // elec 单位是"万度"（万 kWh），area 单位是"万㎡"
    // 碳排放因子: 0.5703 kgCO₂/kWh（华东电网）
    // 假设节能率: 15%（综合能源管理）
    // 减碳量(吨) = elec × 10000(kWh) × 0.5703(kg/kWh) × 15%(节能率) ÷ 1000(kg→吨)
    const savingRate = 0.15; // 15% 节能率
    const carbonFactor = 0.5703; // kgCO₂/kWh
    const carbonReduction = Math.round(elec * 10000 * carbonFactor * savingRate / 1000 * 10) / 10;
    // 节支(元) = elec × 10000(kWh) × 0.8(元/kWh 工业电价) × 15%(节能率)
    const costSavings = Math.round(elec * 10000 * 0.8 * savingRate);

    return (
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Calculator className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">零碳收益模拟器</h3>
                    <p className="text-sm text-slate-400">只需拖动滑块，预估您的园区节能潜力</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    {/* Sliders */}
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300">园区面积 (万㎡)</span>
                            <span className="text-emerald-400 font-mono">{area} 万㎡</span>
                        </div>
                        <Slider
                            value={[area]}
                            onValueChange={(v) => setArea(v[0])}
                            max={500}
                            step={1}
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300">年用电量 (万度)</span>
                            <span className="text-blue-400 font-mono">{elec} 万度</span>
                        </div>
                        <Slider
                            value={[elec]}
                            onValueChange={(v) => setElec(v[0])}
                            max={1000}
                            step={10}
                            className="py-2"
                        />
                    </div>

                    <div className="pt-4 flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MousePointer2 className="w-3 h-3" /> 拖动滑块查看变化</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Results */}
                    <motion.div
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-center text-center"
                        key={carbonReduction}
                        initial={{ scale: 0.95, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="text-sm text-emerald-300 mb-2">预计年减碳</div>
                        <div className="text-3xl font-bold text-white mb-1">{carbonReduction}<span className="text-sm font-normal text-slate-400 ml-1">吨</span></div>
                        <div className="text-xs text-slate-500">相当于植树 {Math.round(carbonReduction * 50)} 棵</div>
                    </motion.div>

                    <motion.div
                        className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col justify-center text-center"
                        key={costSavings}
                        initial={{ scale: 0.95, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="text-sm text-blue-300 mb-2">预计年节支</div>
                        <div className="text-3xl font-bold text-white mb-1">{costSavings > 10000 ? (costSavings / 10000).toFixed(1) + 'w' : costSavings}<span className="text-sm font-normal text-slate-400 ml-1">元</span></div>
                        <div className="text-xs text-slate-500">基于综合能源管理</div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8">
                    获取详细诊断报告 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
