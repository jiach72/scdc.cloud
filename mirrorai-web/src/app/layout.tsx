import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090f',
};

export const metadata: Metadata = {
  title: {
    default: 'MirrorAI — 开源 AI Agent 安全评估框架',
    template: '%s | MirrorAI',
  },
  description: '让每只 Agent 都经过系统化安全评估。行为录制、智能脱敏、多维评测、对抗性测试、防篡改审计。',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪞</text></svg>",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mirrorai.run'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'MirrorAI',
    title: 'MirrorAI — 开源 AI Agent 安全评估框架',
    description: '让每只 Agent 都经过系统化安全评估',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MirrorAI — 开源 AI Agent 安全评估框架',
    description: '让每只 Agent 都经过系统化安全评估',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-bg text-text min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MirrorAI",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Web",
              "description": "开源 AI Agent 安全评估框架 — 让每只 Agent 都经过系统化安全评估",
              "offers": [
                { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Open Source" },
                { "@type": "Offer", "price": "99", "priceCurrency": "USD", "name": "Pro", "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" } }
              ],
              "publisher": { "@type": "Organization", "name": "MirrorAI" },
            }),
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange focus:text-[#ffffff] focus:rounded">
          跳转到主要内容
        </a>
        {children}
      </body>
    </html>
  );
}

