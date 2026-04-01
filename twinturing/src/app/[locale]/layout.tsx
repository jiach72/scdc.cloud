import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { locales, type Locale } from '@/lib/i18n'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://twinturing.com'),
  title: {
    default: 'Twinturing | Lab-Grown Diamond Jewelry - Same Sparkle, Smarter Choice',
    template: '%s | Twinturing',
  },
  description: 'Premium lab-grown diamond jewelry at 70-80% less than mined diamonds. IGI Certified. Free shipping. 30-day returns. Rings, necklaces, earrings.',
  keywords: ['lab-grown diamond', 'jewelry', 'engagement ring', 'sustainable jewelry', 'ethical diamond', 'diamond ring', 'diamond necklace', '培育钻石', '人造钻石'],
  openGraph: {
    type: 'website',
    siteName: 'Twinturing',
    images: [{ url: '/images/og-default.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@twinturing',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en'
  const otherLocale = validLocale === 'en' ? 'zh' : 'en'

  return (
    <html lang={validLocale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`https://twinturing.com/en/`} />
        <link rel="alternate" hrefLang="zh" href={`https://twinturing.com/zh/`} />
        <link rel="alternate" hrefLang="x-default" href={`https://twinturing.com/en/`} />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header locale={validLocale} />
        <main className="flex-1">
          {children}
        </main>
        <Footer locale={validLocale} />
      </body>
    </html>
  )
}
