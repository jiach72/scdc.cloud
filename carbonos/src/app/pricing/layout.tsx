import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "定价方案",
  description: "CarbonOS 四档灵活定价，从¥3,800起/年",
  openGraph: {
    title: "定价方案 | 创电云 SCDC",
    description: "从入门版到企业版，灵活的SaaS订阅模式。",
    url: "https://scdc.cloud/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
