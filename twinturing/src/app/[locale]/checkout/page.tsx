'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'

interface Address {
  id: string
  firstName: string
  lastName: string
  address1: string
  address2: string | null
  city: string
  state: string | null
  postalCode: string
  country: string
  phone: string | null
  isDefault: boolean
}

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
  }
}

interface CheckoutPageProps {
  params: Promise<{ locale: string }>
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<string | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    phone: '',
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  useEffect(() => {
    const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]

    const loadGuestCart = () => {
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
        },
      }))
      setCartItems(items)
      setSubtotal(items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0))
      setUseNewAddress(true)
      setLoading(false)
    }

    if (!token) {
      loadGuestCart()
      return
    }

    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([
      fetch('/api/cart', { headers }).then(r => r.json()),
      fetch('/api/addresses', { headers }).then(r => r.json()),
    ])
      .then(([cartData, addrData]) => {
        setCartItems(cartData.cartItems || [])
        setSubtotal(cartData.subtotal || 0)
        setAddresses(addrData.addresses || [])
        const defaultAddr = addrData.addresses?.find((a: Address) => a.isDefault)
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id)
        } else if (addrData.addresses?.length > 0) {
          setSelectedAddressId(addrData.addresses[0].id)
        } else {
          setUseNewAddress(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [locale, router])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (useNewAddress) {
      if (!form.firstName.trim()) newErrors.firstName = locale === 'en' ? 'First name is required' : '名不能为空'
      if (!form.lastName.trim()) newErrors.lastName = locale === 'en' ? 'Last name is required' : '姓不能为空'
      if (!form.address1.trim()) newErrors.address1 = locale === 'en' ? 'Address is required' : '地址不能为空'
      if (!form.city.trim()) newErrors.city = locale === 'en' ? 'City is required' : '城市不能为空'
      if (!form.postalCode.trim()) newErrors.postalCode = locale === 'en' ? 'Postal code is required' : '邮编不能为空'
      if (!form.country.trim()) newErrors.country = locale === 'en' ? 'Country is required' : '国家不能为空'
    } else {
      if (!selectedAddressId) newErrors.address = locale === 'en' ? 'Please select an address' : '请选择地址'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponError('')
    setCouponApplied(false)
    try {
      const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

  const handleSubmit = async () => {
    if (!validateForm()) return
    setSubmitting(true)
    try {
      const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
      if (!token) return

      let shippingData: {
        shippingName: string
        shippingAddress: string
        shippingCity: string
        shippingState: string
        shippingZip: string
        shippingCountry: string
        shippingPhone: string
      }

      if (useNewAddress) {
        shippingData = {
          shippingName: `${form.firstName} ${form.lastName}`.trim(),
          shippingAddress: [form.address1, form.address2].filter(Boolean).join(', '),
          shippingCity: form.city,
          shippingState: form.state,
          shippingZip: form.postalCode,
          shippingCountry: form.country,
          shippingPhone: form.phone,
        }
      } else {
        const addr = addresses.find(a => a.id === selectedAddressId)
        if (!addr) return
        shippingData = {
          shippingName: `${addr.firstName} ${addr.lastName}`.trim(),
          shippingAddress: [addr.address1, addr.address2].filter(Boolean).join(', '),
          shippingCity: addr.city,
          shippingState: addr.state || '',
          shippingZip: addr.postalCode,
          shippingCountry: addr.country,
          shippingPhone: addr.phone || '',
        }
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...shippingData,
          ...(couponApplied && couponCode ? { couponCode } : {}),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const orderId = data.order.id

        // Try to create a Stripe checkout session
        try {
          const checkoutRes = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
          })

          if (checkoutRes.ok) {
            const checkoutData = await checkoutRes.json()
            if (checkoutData.url) {
              // Redirect to Stripe payment
              window.location.href = checkoutData.url
              return
            }
          }
        } catch {
          // Stripe not configured or failed — fall through to direct confirmation
        }

        // Fallback: no Stripe, go straight to order confirmation
        router.push(`/${locale}/order-confirmation?orderId=${orderId}`)
      } else {
        const errData = await res.json().catch(() => ({}))
        showToast(errData.error || (locale === 'en' ? 'Failed to place order' : '下单失败'))
      }
    } catch {
      // handle error
    } finally {
      setSubmitting(false)
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
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 px-6 py-3 bg-brand-black text-white rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-brand-black mb-8">
          {t('checkout.title', locale)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Address */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Addresses */}
            {addresses.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-brand-black mb-4">
                  {t('checkout.shipping', locale)}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {t('checkout.shipping.select', locale)}
                </p>
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        !useNewAddress && selectedAddressId === addr.id
                          ? 'border-brand-gold bg-brand-gold/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={!useNewAddress && selectedAddressId === addr.id}
                        onChange={() => {
                          setSelectedAddressId(addr.id)
                          setUseNewAddress(false)
                        }}
                        className="mt-1 accent-brand-gold"
                      />
                      <div>
                        <p className="font-medium">
                          {addr.firstName} {addr.lastName}
                          {addr.isDefault && (
                            <span className="ml-2 text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full">
                              {t('account.addresses.default', locale)}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state ? `${addr.state} ` : ''}{addr.postalCode}, {addr.country}
                        </p>
                        {addr.phone && <p className="text-sm text-gray-500">{addr.phone}</p>}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.address && <p className="text-sm text-red-500 mt-2">{errors.address}</p>}
              </div>
            )}

            {/* New Address Form */}
            <div>
              {!useNewAddress && addresses.length > 0 && (
                <button
                  onClick={() => setUseNewAddress(true)}
                  className="text-sm text-brand-gold hover:underline mb-4"
                >
                  {t('checkout.shipping.new', locale)}
                </button>
              )}
              {(useNewAddress || addresses.length === 0) && (
                <div>
                  <h2 className="text-xl font-semibold text-brand-black mb-4">
                    {t('checkout.shipping.new', locale)}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.firstName', locale)} *
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${errors.firstName ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-brand-gold'}`}
                      />
                      {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.lastName', locale)} *
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${errors.lastName ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-brand-gold'}`}
                      />
                      {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.address1', locale)} *
                      </label>
                      <input
                        type="text"
                        value={form.address1}
                        onChange={(e) => setForm({ ...form, address1: e.target.value })}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${errors.address1 ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-brand-gold'}`}
                      />
                      {errors.address1 && <p className="text-sm text-red-500 mt-1">{errors.address1}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.address2', locale)}
                      </label>
                      <input
                        type="text"
                        value={form.address2}
                        onChange={(e) => setForm({ ...form, address2: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.city', locale)} *
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${errors.city ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-brand-gold'}`}
                      />
                      {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.state', locale)}
                      </label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.postalCode', locale)} *
                      </label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${errors.postalCode ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-brand-gold'}`}
                      />
                      {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.country', locale)} *
                      </label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${errors.country ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-brand-gold'}`}
                      />
                      {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('checkout.phone', locale)}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Placeholder */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-semibold text-brand-black mb-3">
                {t('checkout.payment', locale)}
              </h2>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-sm text-yellow-800">
                  {t('checkout.payment.placeholder', locale)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-brand-black mb-6">
                {t('checkout.orderSummary', locale)}
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0].url}
                          alt={locale === 'zh' ? item.product.nameZh : item.product.nameEn}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {locale === 'zh' ? item.product.nameZh : item.product.nameEn}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.variant.name} &times; {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.variant.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                {/* Coupon */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.coupon', locale)}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t('cart.coupon.placeholder', locale)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
                <div className="flex justify-between text-lg font-bold text-brand-black border-t border-gray-100 pt-2">
                  <span>{t('cart.total', locale)}</span>
                  <span>{formatPrice(subtotal - couponDiscount)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || cartItems.length === 0}
                className="mt-6 w-full py-4 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t('checkout.ordering', locale) : t('checkout.placeOrder', locale)}
              </button>

              <Link
                href={`/${locale}/cart`}
                className="mt-3 block w-full py-3 text-center text-gray-600 hover:text-brand-gold transition-colors text-sm"
              >
                {t('common.back', locale)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
