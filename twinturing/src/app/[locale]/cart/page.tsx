'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { t, type Locale, locales } from '@/lib/i18n'

interface CartItem {
  id: string
  productId: string
  variantId: string
  quantity: number
  product: {
    id: string
    nameEn: string
    nameZh: string
    slug: string
    images: { url: string }[]
  }
  variant: {
    id: string
    name: string
    price: number
    stock: number
  }
}

interface CartPageProps {
  params: Promise<{ locale: string }>
}

export default function CartPage({ params }: CartPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const fetchCart = async () => {
    try {
      const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
      if (!token) {
        // Guest: read from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const items: CartItem[] = cart.map((item: { id: string; name: string; price: number; size: string | null; quantity: number; image?: string }, index: number) => ({
          id: `local-${index}`,
          productId: item.id,
          variantId: item.id,
          quantity: item.quantity,
          product: {
            id: item.id,
            nameEn: item.name,
            nameZh: item.name,
            slug: item.id,
            images: item.image ? [{ url: item.image }] : [],
          },
          variant: {
            id: item.id,
            name: item.size || 'Default',
            price: item.price,
            stock: 99,
          },
        }))
        setCartItems(items)
        setSubtotal(items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0))
        setLoading(false)
        return
      }
      const res = await fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setCartItems(data.cartItems)
        setSubtotal(data.subtotal)
      }
    } catch {
      // silently handle
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
    if (!token) {
      // Guest: update localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const index = parseInt(itemId.replace('local-', ''), 10)
      if (cart[index]) {
        cart[index].quantity = quantity
        localStorage.setItem('cart', JSON.stringify(cart))
        window.dispatchEvent(new Event('cart-updated'))
        fetchCart()
      }
      return
    }
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      })
      if (res.ok) {
        fetchCart()
      }
    } catch {
      // silently handle
    }
  }

  const removeItem = async (itemId: string) => {
    const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
    if (!token) {
      // Guest: remove from localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const index = parseInt(itemId.replace('local-', ''), 10)
      cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('cart-updated'))
      fetchCart()
      return
    }
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        fetchCart()
      }
    } catch {
      // silently handle
    }
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponError('')
    setCouponApplied(false)
    try {
      const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
      if (!token) return
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: couponCode, subtotal }),
      })
      const data = await res.json()
      if (res.ok) {
        setCouponDiscount(data.coupon.discount)
        setCouponApplied(true)
      } else {
        setCouponError(data.error || t('cart.coupon.invalid', locale))
      }
    } catch {
      setCouponError(t('cart.coupon.invalid', locale))
    }
  }

  const total = subtotal - couponDiscount

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">{t('common.loading', locale)}</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-brand-black mb-4">
            {t('cart.empty', locale)}
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {t('cart.empty.subtitle', locale)}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300"
          >
            {t('cart.shopNow', locale)}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-brand-black mb-8">
          {t('cart.title', locale)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                  {item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0].url}
                      alt={locale === 'zh' ? item.product.nameZh : item.product.nameEn}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${locale}/products/${item.product.slug}`}
                    className="font-semibold text-gray-900 hover:text-brand-gold transition-colors line-clamp-1"
                  >
                    {locale === 'zh' ? item.product.nameZh : item.product.nameEn}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.variant.name}</p>
                  <p className="text-lg font-bold text-brand-black mt-2">
                    {formatPrice(item.variant.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-brand-gold transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-brand-gold transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      {t('cart.remove', locale)}
                    </button>
                  </div>
                </div>

                {/* Item Subtotal */}
                <div className="hidden sm:block text-right">
                  <p className="text-lg font-bold text-brand-black">
                    {formatPrice(item.variant.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-brand-black mb-6">
                {t('cart.summary', locale)}
              </h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('cart.coupon', locale)}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={t('cart.coupon.placeholder', locale)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {t('cart.coupon.apply', locale)}
                  </button>
                </div>
                {couponApplied && (
                  <p className="mt-2 text-sm text-green-600">{t('cart.coupon.applied', locale)}</p>
                )}
                {couponError && (
                  <p className="mt-2 text-sm text-red-500">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal', locale)}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t('cart.discount', locale)}</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-brand-black border-t border-gray-100 pt-3">
                  <span>{t('cart.total', locale)}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href={`/${locale}/checkout`}
                className="mt-6 block w-full py-4 bg-brand-gold text-brand-black font-bold text-center rounded-lg hover:bg-brand-gold-light transition-all duration-300"
              >
                {t('cart.checkout', locale)}
              </Link>

              <Link
                href={`/${locale}/products`}
                className="mt-3 block w-full py-3 text-center text-gray-600 hover:text-brand-gold transition-colors text-sm"
              >
                {t('cart.continueShopping', locale)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
