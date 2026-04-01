import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行业资讯",
  description: "新能源/AI算力/绿色金融最新动态",
  openGraph: {
    title: "行业资讯 | 创电云 SCDC",
    description: "新能源、AI算力、碳管理、零碳园区最新动态。",
    url: "https://scdc.cloud/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
