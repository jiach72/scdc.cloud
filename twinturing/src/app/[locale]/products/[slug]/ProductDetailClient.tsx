'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'
import { type Product, getProductsByCategory } from '@/data/products'

interface ProductDetailClientProps {
  product: Product
  locale: Locale
}

export default function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const [mainImage, setMainImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState(false)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const getGradient = () => {
    switch (product.category) {
      case 'rings': return 'from-amber-50 via-yellow-50 to-orange-50'
      case 'necklaces': return 'from-rose-50 via-pink-50 to-red-50'
      case 'earrings': return 'from-violet-50 via-purple-50 to-indigo-50'
      default: return 'from-gray-50 to-gray-100'
    }
  }

  const handleAddToCart = async () => {
    if (product.specs.sizes && !selectedSize) {
      showToast(locale === 'en' ? 'Please select a size' : '请选择尺寸')
      return
    }
    setAddingToCart(true)
    try {
      const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
      if (!token) {
        // Guest: use localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existing = cart.find((item: { id: string; size: string | null }) => item.id === product.id && item.size === selectedSize)
        if (existing) {
          existing.quantity += 1
        } else {
          cart.push({ id: product.id, name: product.name[locale] || product.name.en, price: product.price, size: selectedSize, quantity: 1, image: product.images?.[0] })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        window.dispatchEvent(new Event('cart-updated'))
        showToast(t('cart.added', locale))
        setAddingToCart(false)
        return
      }
      // Logged in: use API cart only — no localStorage fallback
      try {
        const prodRes = await fetch(`/api/products/${product.slug}`)
        if (prodRes.ok) {
          const prodData = await prodRes.json()
          const dbProduct = prodData.product
          const variant = dbProduct?.variants?.find((v: { name: string; isActive: boolean }) =>
            v.isActive && (!selectedSize || v.name === selectedSize || v.name.includes(selectedSize))
          ) || dbProduct?.variants?.find((v: { isActive: boolean }) => v.isActive)
          if (dbProduct && variant) {
            const res = await fetch('/api/cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ productId: dbProduct.id, variantId: variant.id, quantity: 1 }),
            })
            if (res.ok) {
              window.dispatchEvent(new Event('cart-updated'))
              showToast(t('cart.added', locale))
              setAddingToCart(false)
              return
            }
          }
        }
        // API failed for logged-in user — show error, do NOT fall back to localStorage
        showToast(locale === 'en' ? 'Failed to add to cart. Please try again.' : '添加失败，请重试')
      } catch {
        showToast(locale === 'en' ? 'Failed to add to cart. Please try again.' : '添加失败，请重试')
      }
    } catch {
      showToast(locale === 'en' ? 'Failed to add to cart' : '添加失败')
    } finally {
      setAddingToCart(false)
    }
  }

  const handleAddToWishlist = async () => {
    const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
    if (token) {
      // Logged in: try API wishlist
      try {
        const prodRes = await fetch(`/api/products/${product.slug}`)
        if (prodRes.ok) {
          const prodData = await prodRes.json()
          const dbProduct = prodData.product
          if (dbProduct) {
            const res = await fetch('/api/wishlist', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ productId: dbProduct.id }),
            })
            if (res.ok) {
              showToast(t('wishlist.added', locale))
              return
            }
          }
        }
      } catch { /* fall through to localStorage */ }
    }
    // Guest or fallback: localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    if (!wishlist.find((id: string) => id === product.id)) {
      wishlist.push(product.id)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
    showToast(t('wishlist.added', locale))
  }

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale] || product.name.en,
    description: (product.description[locale] || product.description.en).slice(0, 5000),
    image: product.images?.map(img => `https://twinturing.com${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Twinturing',
    },
    offers: {
      '@type': 'Offer',
      url: `https://twinturing.com/${locale}/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Twinturing',
      },
    },
  }

  return (
    <div className="py-12 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 px-6 py-3 bg-brand-black text-white rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href={`/${locale}`} className="text-gray-500 hover:text-brand-gold transition-colors">
            {t('nav.home', locale)}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/${locale}/products`} className="text-gray-500 hover:text-brand-gold transition-colors">
            {t('nav.products', locale)}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name[locale] || product.name.en}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className={`aspect-square bg-gradient-to-br ${getGradient()} rounded-2xl relative overflow-hidden`}>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[mainImage]}
                  alt={product.name[locale] || product.name.en}
                  className="w-full h-full object-contain p-8 transition-opacity duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-brand-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                  </svg>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.new && (
                  <span className="px-4 py-2 text-sm font-bold bg-brand-black text-white rounded-full">NEW</span>
                )}
                {discount > 0 && (
                  <span className="px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-full">-{discount}%</span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`aspect-square bg-gradient-to-br ${getGradient()} rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      i === mainImage
                        ? 'ring-2 ring-brand-gold shadow-lg'
                        : 'hover:ring-2 hover:ring-brand-gold/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name[locale] || product.name.en} - View ${i + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-brand-gold font-medium uppercase tracking-wider mb-2">
              {locale === 'en'
                ? (product.category === 'rings' ? 'Rings' : product.category === 'necklaces' ? 'Necklaces' : 'Earrings')
                : (product.category === 'rings' ? '戒指' : product.category === 'necklaces' ? '项链' : '耳环')
              }
            </p>

            <h1 className="font-serif text-4xl font-bold text-brand-black mb-4">
              {product.name[locale] || product.name.en}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">(48 {locale === 'en' ? 'reviews' : '评价'})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-brand-black">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-700 rounded-full">
                    {locale === 'en' ? `Save ${discount}%` : `节省${discount}%`}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description[locale] || product.description.en}
            </p>

            {/* Specifications */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <h2 className="font-semibold text-lg mb-4">
                {t('product.specifications', locale)}
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                {product.specs.carat && (
                  <>
                    <dt className="text-gray-500">{locale === 'en' ? 'Carat' : '克拉'}</dt>
                    <dd className="font-medium">{product.specs.carat}ct</dd>
                  </>
                )}
                {product.specs.clarity && (
                  <>
                    <dt className="text-gray-500">{locale === 'en' ? 'Clarity' : '净度'}</dt>
                    <dd className="font-medium">{product.specs.clarity}</dd>
                  </>
                )}
                {product.specs.color && (
                  <>
                    <dt className="text-gray-500">{locale === 'en' ? 'Color' : '颜色'}</dt>
                    <dd className="font-medium">{product.specs.color}</dd>
                  </>
                )}
                {product.specs.cut && (
                  <>
                    <dt className="text-gray-500">{locale === 'en' ? 'Cut' : '切工'}</dt>
                    <dd className="font-medium">{product.specs.cut}</dd>
                  </>
                )}
                {product.specs.metal && (
                  <>
                    <dt className="text-gray-500">{locale === 'en' ? 'Metal' : '材质'}</dt>
                    <dd className="font-medium">{product.specs.metal}</dd>
                  </>
                )}
              </dl>
            </div>

            {/* Size Selection */}
            {product.specs.sizes && (
              <div className="mb-8">
                <h2 className="font-semibold mb-4">
                  {t('product.selectSize', locale)}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.specs.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-brand-gold text-brand-gold bg-brand-gold/10 ring-2 ring-brand-gold/20'
                          : 'border-gray-200 hover:border-brand-gold hover:text-brand-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 px-8 py-4 bg-brand-gold text-brand-black font-bold text-lg rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 disabled:opacity-50"
              >
                {addingToCart ? t('common.loading', locale) : t('product.addToCart', locale)}
              </button>
              <button
                onClick={handleAddToWishlist}
                className="px-4 py-4 border-2 border-gray-200 rounded-lg hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
                aria-label={locale === 'en' ? 'Add to wishlist' : '加入心愿单'}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-sm text-gray-600">
                  {locale === 'en' ? 'IGI Certified' : 'IGI认证'}
                </span>
              </div>
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span className="text-sm text-gray-600">
                  {locale === 'en' ? 'Free Shipping' : '免费配送'}
                </span>
              </div>
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span className="text-sm text-gray-600">
                  {locale === 'en' ? '30-Day Returns' : '30天退换'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-3xl font-bold text-brand-black mb-8">
              {locale === 'en' ? 'You May Also Like' : '您可能还喜欢'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${locale}/products/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className={`aspect-square bg-gradient-to-br ${getGradient()} rounded-xl mb-4 relative overflow-hidden`}>
                    {relatedProduct.images && relatedProduct.images.length > 0 ? (
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name[locale] || relatedProduct.name.en}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-brand-gold transition-colors">
                    {relatedProduct.name[locale] || relatedProduct.name.en}
                  </h3>
                  <p className="text-brand-gold font-semibold">
                    {formatPrice(relatedProduct.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
