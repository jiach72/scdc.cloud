import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免费零碳诊断",
  description: "3分钟获取零碳转型方案",
  openGraph: {
    title: "零碳就绪度诊断 | 创电云 SCDC",
    description: "5分钟问卷，获取专业碳中和评估报告。",
    url: "https://scdc.cloud/diagnosis",
  },
};

export default function DiagnosisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
