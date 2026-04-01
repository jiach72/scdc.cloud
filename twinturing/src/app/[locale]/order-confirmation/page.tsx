'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  items: OrderItem[]
  createdAt: string
}

interface OrderConfirmationContentProps {
  locale: Locale
}

function OrderConfirmationContent({ locale }: OrderConfirmationContentProps) {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }

    const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
    if (!token) {
      setLoading(false)
      return
    }

    fetch(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setOrder(data.order)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">{t('common.loading', locale)}</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500">{t('orderConfirmation.notFound', locale)}</p>
        <Link href={`/${locale}`} className="mt-4 inline-block text-brand-gold hover:underline">
          {t('nav.home', locale)}
        </Link>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="font-serif text-4xl font-bold text-brand-black mb-3">
          {t('orderConfirmation.title', locale)}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('orderConfirmation.thankYou', locale)}
        </p>

        {/* Order Number */}
        <div className="inline-block px-6 py-3 bg-brand-gold/10 rounded-full mb-10">
          <span className="text-sm text-gray-600">{t('orderConfirmation.orderNumber', locale)}: </span>
          <span className="font-bold text-brand-black">{order.orderNumber}</span>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-left mb-10">
          {/* Items */}
          <h2 className="font-semibold text-lg mb-4">{t('orderConfirmation.items', locale)}</h2>
          <div className="space-y-3 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">&times; {item.quantity}</p>
                </div>
                <p className="font-medium">{formatPrice(item.total)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold text-brand-black">
              <span>{t('cart.total', locale)}</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <div>
              <p className="font-medium text-blue-900">{t('orderConfirmation.estimatedDelivery', locale)}</p>
              <p className="text-sm text-blue-700">{t('orderConfirmation.deliveryDate', locale)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300"
          >
            {t('orderConfirmation.continueShopping', locale)}
          </Link>
          <Link
            href={`/${locale}/account`}
            className="inline-flex items-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
          >
            {t('orderConfirmation.viewOrders', locale)}
          </Link>
        </div>
      </div>
    </div>
  )
}

interface OrderConfirmationPageProps {
  params: Promise<{ locale: string }>
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale

  return (
    <Suspense fallback={<div className="py-24 text-center">{t('common.loading', locale)}</div>}>
      <OrderConfirmationContent locale={locale} />
    </Suspense>
  )
}
