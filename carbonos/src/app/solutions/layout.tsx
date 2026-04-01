import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "零碳解决方案",
  description: "工厂/建筑/园区/城镇零碳转型解决方案",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
