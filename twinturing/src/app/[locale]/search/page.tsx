'use client'

import { useState, use, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { t, type Locale, locales } from '@/lib/i18n'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

interface SearchPageProps {
  params: Promise<{ locale: string }>
}

function SearchContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState(products)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    setResults(
      products.filter((p) =>
        (p.name[locale] || p.name.en).toLowerCase().includes(q) ||
        (p.name.en).toLowerCase().includes(q) ||
        (p.name.zh || '').toLowerCase().includes(q) ||
        (p.description[locale] || p.description.en).toLowerCase().includes(q)
      )
    )
  }, [query, locale])

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-2">
            {t('search.title', locale)}
          </h1>
          {query && (
            <p className="text-gray-600">
              {t('search.resultsFor', locale)} &quot;{query}&quot; — {results.length} {t('search.products', locale)}
            </p>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p className="text-gray-500 text-lg">
              {t('search.noResults', locale)} &quot;{query}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage({ params }: SearchPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale

  return (
    <Suspense fallback={<div className="py-12 text-center">{t('common.loading', locale)}</div>}>
      <SearchContent locale={locale} />
    </Suspense>
  )
}
