'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'

interface LoginPageProps {
  params: Promise<{ locale: string }>
}

export default function LoginPage({ params }: LoginPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || t('login.error', locale))
        return
      }

      // Token is set as httpOnly cookie by the API
      router.push(`/${locale}/account`)
    } catch {
      setError(t('login.error', locale))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-3">
            {t('login.title', locale)}
          </h1>
          <p className="text-gray-600">
            {t('login.subtitle', locale)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('login.email', locale)}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('login.password', locale)}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-brand-gold text-brand-black font-bold text-lg rounded-lg hover:bg-brand-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('login.signingIn', locale) : t('login.submit', locale)}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {t('login.noAccount', locale)}{' '}
          <Link href={`/${locale}/register`} className="text-brand-gold font-medium hover:underline">
            {t('login.register', locale)}
          </Link>
        </p>
      </div>
    </div>
  )
}
