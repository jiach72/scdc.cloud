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

interface AddressesPageProps {
  params: Promise<{ locale: string }>
}

export default function AddressesPage({ params }: AddressesPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
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
    isDefault: false,
  })

  const getToken = () => document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]

  const fetchAddresses = async () => {
    try {
      const token = getToken()
      if (!token) return
      const res = await fetch('/api/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setAddresses(data.addresses || [])
      }
    } catch {
      // handle
    }
  }

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push(`/${locale}/`)
      return
    }
    fetchAddresses().finally(() => setLoading(false))
  }, [locale, router])

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      phone: '',
      isDefault: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (addr: Address) => {
    setForm({
      firstName: addr.firstName,
      lastName: addr.lastName,
      address1: addr.address1,
      address2: addr.address2 || '',
      city: addr.city,
      state: addr.state || '',
      postalCode: addr.postalCode,
      country: addr.country,
      phone: addr.phone || '',
      isDefault: addr.isDefault,
    })
    setEditingId(addr.id)
    setShowForm(true)
  }

  const handleSubmit = async () => {
    const token = getToken()
    if (!token) return

    const url = editingId ? `/api/addresses/${editingId}` : '/api/addresses'
    const method = editingId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        await fetchAddresses()
        resetForm()
      }
    } catch {
      // handle
    }
  }

  const handleDelete = async (id: string) => {
    const token = getToken()
    if (!token) return
    try {
      const res = await fetch(`/api/addresses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        await fetchAddresses()
      }
    } catch {
      // handle
    }
  }

  const handleSetDefault = async (id: string) => {
    const token = getToken()
    if (!token) return
    try {
      const res = await fetch(`/api/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDefault: true }),
      })
      if (res.ok) {
        await fetchAddresses()
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

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold text-brand-black">
            {t('account.addresses', locale)}
          </h1>
          <button
            onClick={() => { resetForm(); setShowForm(true) }}
            className="px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300"
          >
            {t('account.addresses.add', locale)}
          </button>
        </div>

        {/* Address Form Modal */}
        {showForm && (
          <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">
              {editingId ? t('account.addresses.edit', locale) : t('account.addresses.add', locale)}
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                />
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                />
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                />
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                />
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                />
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                />
              </div>
              <div>
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
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                    className="accent-brand-gold w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{t('account.addresses.setDefault', locale)}</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300"
              >
                {t('common.save', locale)}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('common.cancel', locale)}
              </button>
            </div>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 && !showForm ? (
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
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>{addr.address1}</p>
                  {addr.address2 && <p>{addr.address2}</p>}
                  <p>{addr.city}, {addr.state ? `${addr.state} ` : ''}{addr.postalCode}</p>
                  <p>{addr.country}</p>
                  {addr.phone && <p className="text-gray-500">{addr.phone}</p>}
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openEdit(addr)}
                    className="text-sm text-brand-gold hover:underline"
                  >
                    {t('common.edit', locale)}
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    {t('common.delete', locale)}
                  </button>
                  {!addr.isDefault && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-sm text-gray-500 hover:text-brand-gold transition-colors"
                      >
                        {t('account.addresses.setDefault', locale)}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
