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
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

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

interface User {
  userId: string
  email: string
  role: string
}

interface AccountPageProps {
  params: Promise<{ locale: string }>
}

export default function AccountPage({ params }: AccountPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('profile')

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

    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([
      fetch('/api/auth/me', { headers }).then(r => r.ok ? r.json() : null),
      fetch('/api/orders', { headers }).then(r => r.ok ? r.json() : { orders: [] }),
      fetch('/api/addresses', { headers }).then(r => r.ok ? r.json() : { addresses: [] }),
      fetch('/api/wishlist', { headers }).then(r => r.ok ? r.json() : { items: [] }),
    ])
      .then(([userData, orderData, addrData, wishData]) => {
        if (!userData) {
          router.push(`/${locale}/`)
          return
        }
        setUser(userData)
        setOrders(orderData.orders || [])
        setAddresses(addrData.addresses || [])
        setWishlist(wishData.items || [])
      })
      .catch(() => {
        router.push(`/${locale}/`)
      })
      .finally(() => setLoading(false))
  }, [locale, router])

  const removeFromWishlist = async (productId: string) => {
    try {
      const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
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

  if (!user) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-4">
          {t('account.signInRequired', locale)}
        </h1>
        <Link href={`/${locale}`} className="text-brand-gold hover:underline">
          {t('nav.home', locale)}
        </Link>
      </div>
    )
  }

  const tabs = [
    { id: 'profile' as const, label: t('account.profile', locale) },
    { id: 'orders' as const, label: t('account.orders', locale) },
    { id: 'addresses' as const, label: t('account.addresses', locale) },
    { id: 'wishlist' as const, label: t('account.wishlist', locale) },
  ]

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-brand-black mb-2">
          {t('account.title', locale)}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('account.welcome', locale)}, {user.email}
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-semibold text-xl mb-6">{t('account.profile', locale)}</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm text-gray-500">{t('account.email', locale)}</dt>
                <dd className="mt-1 text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">{locale === 'en' ? 'Role' : '角色'}</dt>
                <dd className="mt-1 text-gray-900 capitalize">{user.role}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">{t('account.orders.empty', locale)}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('account.orderNumber', locale)}</p>
                        <p className="font-bold text-brand-black">{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('account.orderDate', locale)}</p>
                        <p>{new Date(order.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('account.orderTotal', locale)}</p>
                        <p className="font-bold text-brand-black">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <Link
                      href={`/${locale}/account/orders/${order.id}`}
                      className="text-sm text-brand-gold hover:underline"
                    >
                      {t('account.viewDetails', locale)} &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div>
            {addresses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">{t('account.addresses.empty', locale)}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold">
                        {addr.firstName} {addr.lastName}
                      </p>
                      {addr.isDefault && (
                        <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full">
                          {t('account.addresses.default', locale)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{addr.address1}</p>
                    {addr.address2 && <p className="text-sm text-gray-600">{addr.address2}</p>}
                    <p className="text-sm text-gray-600">
                      {addr.city}, {addr.state ? `${addr.state} ` : ''}{addr.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{addr.country}</p>
                    {addr.phone && <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">{t('account.wishlist.empty', locale)}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative">
                      {item.product?.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0].url}
                          alt={locale === 'zh' ? item.product.nameZh : item.product.nameEn}
                          className="w-full h-full object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link
                        href={item.product ? `/${locale}/products/${item.product.slug}` : '#'}
                        className="font-medium text-gray-900 hover:text-brand-gold transition-colors line-clamp-1"
                      >
                        {item.product ? (locale === 'zh' ? item.product.nameZh : item.product.nameEn) : 'Unknown'}
                      </Link>
                      <p className="text-lg font-bold text-brand-black mt-1">
                        {item.product ? formatPrice(item.product.variants[0]?.price || item.product.basePrice) : ''}
                      </p>
                      <button
                        onClick={() => removeFromWishlist(item.productId)}
                        className="mt-3 text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        {t('account.wishlist.remove', locale)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
