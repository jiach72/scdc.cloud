'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t, type Locale, locales } from '@/lib/i18n'

export default function NotFound() {
  const pathname = usePathname()
  const localeFromPath = pathname.split('/')[1]
  const locale = (locales.includes(localeFromPath as Locale) ? localeFromPath : 'en') as Locale

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-serif text-6xl font-bold text-brand-black mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('notFound.message', locale)}
        </p>
        <Link
          href={`/${locale}/`}
          className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-2xl hover:bg-brand-gold-light transition-all duration-300"
        >
          {t('notFound.backHome', locale)}
        </Link>
      </div>
    </div>
  )
}
