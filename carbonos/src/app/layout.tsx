import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scdc.cloud"),
  title: {
    default: "创电云 SCDC - 绿色能源驱动智算未来",
    template: "%s | 创电云 SCDC",
  },
  description:
    "苏州创电云 (SCDC) — 连接物理能源世界与数字价值世界的桥梁。提供新能源管理、零碳园区、AI算力基建全栈解决方案。",
  keywords: [
    "碳管理",
    "零碳园区",
    "新能源",
    "AI算力",
    "碳中和",
    "EMS",
    "BMS",
    "虚拟电厂",
    "SCDC",
    "创电云",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "创电云 SCDC",
    title: "创电云 SCDC - 绿色能源驱动智算未来",
    description:
      "连接物理能源世界与数字价值世界的桥梁。新能源管理、零碳园区、AI算力基建全栈解决方案。",
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "创电云 SCDC - 绿色能源驱动智算未来",
    description:
      "连接物理能源世界与数字价值世界的桥梁。新能源管理、零碳园区、AI算力基建全栈解决方案。",
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://scdc.cloud",
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "苏州创电云科技有限公司",
              "alternateName": "SCDC",
              "url": "https://scdc.cloud",
              "logo": "https://scdc.cloud/favicon.ico",
              "description": "苏州创电云是专业的新能源资产管理者，提供零碳园区智能运营平台 CarbonOS。",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "创电云 CarbonOS",
              "url": "https://scdc.cloud",
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
