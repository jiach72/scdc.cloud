'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'

interface WishlistItem {
  id: string
  productId: string
  product: {
    id: string
    nameEn: string
    nameZh: string
    slug: string
    basePrice: number
    comparePrice: number | null
    images: { url: string }[]
    variants: { price: number }[]
  } | null
}

interface WishlistPageProps {
  params: Promise<{ locale: string }>
}

export default function WishlistPage({ params }: WishlistPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getToken = () => document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push(`/${locale}/`)
      return
    }

    fetch('/api/wishlist', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => setWishlist(data.items || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [locale, router])

  const removeFromWishlist = async (productId: string) => {
    try {
      const token = getToken()
      if (!token) return
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setWishlist(prev => prev.filter(item => item.productId !== productId))
      }
    } catch {
      // handle
    }
  }

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">{t('common.loading', locale)}</p>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${locale}/account`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-gold transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {t('account.title', locale)}
        </Link>

        <h1 className="font-serif text-4xl font-bold text-brand-black mb-8">
          {t('account.wishlist', locale)}
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">{t('account.wishlist.empty', locale)}</p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300"
            >
              {t('cart.shopNow', locale)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <Link href={item.product ? `/${locale}/products/${item.product.slug}` : '#'}>
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                    {item.product?.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0].url}
                        alt={locale === 'zh' ? item.product.nameZh : item.product.nameEn}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link
                    href={item.product ? `/${locale}/products/${item.product.slug}` : '#'}
                    className="font-medium text-gray-900 hover:text-brand-gold transition-colors line-clamp-1 block"
                  >
                    {item.product ? (locale === 'zh' ? item.product.nameZh : item.product.nameEn) : 'Unknown'}
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-lg font-bold text-brand-black">
                      {item.product ? formatPrice(item.product.variants[0]?.price || item.product.basePrice) : ''}
                    </p>
                    {item.product?.comparePrice && (
                      <p className="text-sm text-gray-400 line-through">
                        {formatPrice(item.product.comparePrice)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <Link
                      href={item.product ? `/${locale}/products/${item.product.slug}` : '#'}
                      className="text-sm text-brand-gold hover:underline"
                    >
                      {t('products.view', locale)}
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      {t('account.wishlist.remove', locale)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
