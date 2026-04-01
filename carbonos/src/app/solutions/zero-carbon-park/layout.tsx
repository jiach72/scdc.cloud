import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "零碳园区方案",
  description: "零碳园区全栈智能运营方案",
  openGraph: {
    title: "零碳园区解决方案 | 创电云 SCDC",
    description: "源网荷储一体化建设，CarbonOS碳足迹全流程追踪。",
    url: "https://scdc.cloud/solutions/zero-carbon-park",
  },
};

export default function ZeroCarbonParkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
