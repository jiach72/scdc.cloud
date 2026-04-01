"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const energyTypes = [
    { value: "electricity", label: "电力", unit: "kWh" },
    { value: "natural_gas", label: "天然气", unit: "m³" },
    { value: "coal", label: "煤炭", unit: "吨" },
    { value: "diesel", label: "柴油", unit: "升" },
    { value: "water", label: "水", unit: "吨" },
];

// 模拟数据
const mockData = [
    { id: "1", date: "2026-01-15", type: "electricity", consumption: 12500, unit: "kWh", cost: 8750 },
    { id: "2", date: "2026-01-15", type: "natural_gas", consumption: 450, unit: "m³", cost: 1350 },
    { id: "3", date: "2026-01-14", type: "electricity", consumption: 11800, unit: "kWh", cost: 8260 },
];

export default function DataInputPage() {
    const [formData, setFormData] = useState({
        energyType: "electricity",
        dataDate: "",
        consumption: "",
        cost: "",
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: '正在验证数据完整性...',
            success: (data) => {
                setSubmitting(false);
                setFormData({ ...formData, consumption: "", cost: "" }); // 重置表单
                return `数据录入成功！新增 1 条${currentType?.label || ''}消耗记录`;
            },
            error: '提交失败',
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 文件格式校验
        const validExtensions = [".xlsx", ".xls"];
        const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        if (!validExtensions.includes(ext)) {
            toast.error("文件格式不支持", { description: "仅支持 .xlsx 和 .xls 格式" });
            e.target.value = "";
            return;
        }

        // 文件大小校验（最大 10MB）
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error("文件过大", { description: "最大支持 10MB 的文件" });
            e.target.value = "";
            return;
        }

        setUploading(true);
        toast.promise(new Promise(resolve => setTimeout(resolve, 3000)), {
            loading: `正在解析文件: ${file.name}`,
            success: () => {
                setUploading(false);
                return "Excel 导入成功！已处理 248 条记录。";
            },
            error: "解析失败，请检查文件格式",
        });
    };

    const currentType = energyTypes.find(t => t.value === formData.energyType);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="数据接入"
                    description="多源异构能耗数据采集与录入"
                    className="mb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* 手动录入表单 */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">手动录入</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">能源类型</Label>
                                    <Select
                                        value={formData.energyType}
                                        onValueChange={(value) => setFormData({ ...formData, energyType: value })}
                                    >
                                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-700 border-slate-600">
                                            {energyTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">日期</Label>
                                    <Input
                                        type="date"
                                        value={formData.dataDate}
                                        onChange={(e) => setFormData({ ...formData, dataDate: e.target.value })}
                                        className="bg-slate-700 border-slate-600 text-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">消耗量 ({currentType?.unit})</Label>
                                    <Input
                                        type="number"
                                        value={formData.consumption}
                                        onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
                                        placeholder="请输入消耗量"
                                        className="bg-slate-700 border-slate-600 text-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">费用（元）</Label>
                                    <Input
                                        type="number"
                                        value={formData.cost}
                                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                        placeholder="可选"
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                                <Button type="submit" disabled={submitting} className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 提交中</> : "提交数据"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Excel 导入 */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">Excel 导入</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    accept=".xlsx,.xls,.csv"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-slate-400 hover:text-white"
                                >
                                    <div className="text-4xl mb-2">📊</div>
                                    <p>点击或拖拽上传 Excel 文件</p>
                                    <p className="text-sm mt-1">支持 .xlsx, .xls · 最大 10MB</p>
                                </label>
                            </div>
                            {uploading && (
                                <p className="text-emerald-400 text-center">上传中...</p>
                            )}
                            <Button variant="outline" className="w-full border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800 hover:text-white">
                                下载模板
                            </Button>
                        </CardContent>
                    </Card>

                    {/* 统计卡片 */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">本月统计</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">电力消耗</span>
                                <span className="text-white font-semibold">125,000 kWh</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">天然气</span>
                                <span className="text-white font-semibold">4,500 m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">用水量</span>
                                <span className="text-white font-semibold">320 吨</span>
                            </div>
                            <div className="border-t border-slate-600 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">总费用</span>
                                    <span className="text-emerald-400 font-bold text-xl">¥ 98,500</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 数据列表 */}
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white">最近录入</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-700">
                                    <TableHead className="text-slate-400">日期</TableHead>
                                    <TableHead className="text-slate-400">能源类型</TableHead>
                                    <TableHead className="text-slate-400">消耗量</TableHead>
                                    <TableHead className="text-slate-400">费用</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockData.map((item) => (
                                    <TableRow key={item.id} className="border-slate-700">
                                        <TableCell className="text-white">{item.date}</TableCell>
                                        <TableCell className="text-white">
                                            {energyTypes.find(t => t.value === item.type)?.label}
                                        </TableCell>
                                        <TableCell className="text-white">
                                            {item.consumption.toLocaleString()} {item.unit}
                                        </TableCell>
                                        <TableCell className="text-emerald-400">
                                            ¥ {item.cost.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
