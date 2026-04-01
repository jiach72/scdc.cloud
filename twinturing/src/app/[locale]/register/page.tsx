'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'

interface RegisterPageProps {
  params: Promise<{ locale: string }>
}

export default function RegisterPage({ params }: RegisterPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordStrength = (pw: string): number => {
    let score = 0
    if (pw.length >= 8) score++
    if (/[a-z]/.test(pw)) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^a-zA-Z0-9]/.test(pw)) score++
    return score
  }

  const strength = passwordStrength(password)
  const strengthLabel = locale === 'en'
    ? ['', 'Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][strength]
    : ['', '弱', '弱', '一般', '强', '非常强'][strength]
  const strengthColor = ['', 'bg-red-400', 'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'][strength]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError(t('register.error.passwordMismatch', locale))
      return
    }

    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError(t('register.error.passwordWeak', locale))
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          setError(t('register.error.emailExists', locale))
        } else {
          setError(data.error || t('register.error.emailExists', locale))
        }
        return
      }

      // Token is set as httpOnly cookie by the API; auto-login
      router.push(`/${locale}/account`)
    } catch {
      setError(t('register.error.emailExists', locale))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-3">
            {t('register.title', locale)}
          </h1>
          <p className="text-gray-600">
            {t('register.subtitle', locale)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('register.name', locale)}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('register.email', locale)}
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
              {t('register.password', locale)}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
            {password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{strengthLabel}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              {t('register.confirmPassword', locale)}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent ${
                confirmPassword && confirmPassword !== password
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300'
              }`}
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="mt-1 text-xs text-red-500">
                {t('register.error.passwordMismatch', locale)}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-brand-gold text-brand-black font-bold text-lg rounded-lg hover:bg-brand-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('register.creating', locale) : t('register.submit', locale)}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {t('register.hasAccount', locale)}{' '}
          <Link href={`/${locale}/login`} className="text-brand-gold font-medium hover:underline">
            {t('register.signIn', locale)}
          </Link>
        </p>
      </div>
    </div>
  )
}
