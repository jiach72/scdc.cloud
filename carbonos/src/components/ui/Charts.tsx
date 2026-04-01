"use client";

/**
 * Recharts 共享配置组件
 * 封装常用图表配置，减少重复 import 和样板代码
 */
export {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    type TooltipProps,
} from "recharts";

/** 深色主题通用 tooltip 样式 */
export const darkTooltipStyle = {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    color: "#fff",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
} as const;

/** 深色主题通用坐标轴样式 */
export const darkAxisProps = {
    stroke: "#64748b",
    tickLine: false,
    axisLine: false,
};

/** 深色主题网格样式 */
export const darkGridProps = {
    strokeDasharray: "3 3",
    stroke: "#1e293b",
    vertical: false,
};

/** 常用渐变 ID 生成器 */
export function gradientId(prefix: string, index: number) {
    return `${prefix}-${index}`;
}
