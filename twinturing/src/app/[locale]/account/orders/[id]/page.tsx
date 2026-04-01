'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
  product: {
    images: { url: string }[]
  }
  variant: {
    name: string
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  currency: string
  shippingName: string
  shippingAddress: string
  shippingCity: string
  shippingState: string | null
  shippingZip: string
  shippingCountry: string
  shippingPhone: string | null
  notes: string | null
  createdAt: string
  items: OrderItem[]
}

interface OrderDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { locale: localeParam, id } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusLabel = (status: string) => {
    return t(`status.${status}`, locale) || status
  }

  useEffect(() => {
    const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
    if (!token) {
      router.push(`/${locale}/`)
      return
    }

    fetch(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setOrder(data?.order || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id, locale, router])

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
        <p className="text-gray-500 mb-4">{t('orderConfirmation.notFound', locale)}</p>
        <Link href={`/${locale}/account`} className="text-brand-gold hover:underline">
          {t('account.title', locale)}
        </Link>
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
          {t('orderDetail.backToOrders', locale)}
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-serif text-4xl font-bold text-brand-black">
            {t('orderDetail.title', locale)}
          </h1>
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">{t('orderDetail.items', locale)}</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.variant.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} &times; {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-black">{formatPrice(item.total)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Number */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {t('orderDetail.orderInfo', locale)}: <span className="font-medium text-gray-700">{order.orderNumber}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {t('account.orderDate', locale)}: <span className="font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">{t('orderDetail.priceSummary', locale)}</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>{t('orderDetail.subtotal', locale)}</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('orderDetail.shipping', locale)}</span>
                  <span>{order.shippingCost > 0 ? formatPrice(order.shippingCost) : t('orderDetail.free', locale)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t('orderDetail.discount', locale)}</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-brand-black border-t border-gray-100 pt-3">
                  <span>{t('orderDetail.total', locale)}</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">{t('orderDetail.shippingAddress', locale)}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingName}</p>
                <p>{order.shippingAddress}</p>
                <p>
                  {order.shippingCity}, {order.shippingState ? `${order.shippingState} ` : ''}{order.shippingZip}
                </p>
                <p>{order.shippingCountry}</p>
                {order.shippingPhone && <p className="text-gray-500 mt-2">{order.shippingPhone}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
