'use client'

import { useState, use, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { t, type Locale, locales } from '@/lib/i18n'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

type SortOption = 'newest' | 'priceAsc' | 'priceDesc'
const ITEMS_PER_PAGE = 12

interface ProductsPageProps {
  params: Promise<{ locale: string }>
}

function ProductsContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') as 'all' | 'rings' | 'necklaces' | 'earrings' | null
  const [filter, setFilter] = useState<'all' | 'rings' | 'necklaces' | 'earrings'>(categoryParam || 'all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (categoryParam && ['rings', 'necklaces', 'earrings'].includes(categoryParam)) {
      setFilter(categoryParam)
    }
  }, [categoryParam])

  // Reset to page 1 when filter or sort changes
  useEffect(() => {
    setPage(1)
  }, [filter, sort])

  const filteredProducts = filter === 'all'
    ? [...products]
    : products.filter(p => p.category === filter)

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'priceAsc': return a.price - b.price
      case 'priceDesc': return b.price - a.price
      case 'newest': return (b.new ? 1 : 0) - (a.new ? 1 : 0) || b.id.localeCompare(a.id)
      default: return 0
    }
  })

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-4">
            {t('products.title', locale)}
          </h1>
          <p className="text-gray-600">
            {t('products.subtitle', locale)}
          </p>
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { value: 'all', label: t('products.filter.all', locale) },
              { value: 'rings', label: t('products.filter.rings', locale) },
              { value: 'necklaces', label: t('products.filter.necklaces', locale) },
              { value: 'earrings', label: t('products.filter.earrings', locale) },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as typeof filter)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === option.value
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{t('products.sortBy', locale)}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent bg-white"
            >
              <option value="newest">{t('products.sort.newest', locale)}</option>
              <option value="priceAsc">{t('products.sort.priceAsc', locale)}</option>
              <option value="priceDesc">{t('products.sort.priceDesc', locale)}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        {/* Empty State */}
        {paginatedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {locale === 'en' ? 'No products found.' : '暂无产品。'}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('products.pagination.prev', locale)}
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                    page === p
                      ? 'bg-brand-gold text-brand-black'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('products.pagination.next', locale)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage({ params }: ProductsPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : "en") as Locale

  return (
    <Suspense fallback={<div className="py-12 text-center">{t('common.loading', locale)}</div>}>
      <ProductsContent locale={locale} />
    </Suspense>
  )
}
