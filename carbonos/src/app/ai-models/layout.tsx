import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI模型服务",
  description: "大模型推理与训练管理平台",
  openGraph: {
    title: "AI大模型服务 | 创电云 SCDC",
    description: "行业垂直模型训练、模型压缩优化、边缘部署方案。",
    url: "https://scdc.cloud/ai-models",
  },
};

export default function AIModelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
