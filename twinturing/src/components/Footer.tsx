'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'
import { SITE_CONFIG } from '@/lib/constants'

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="bg-brand-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 9L12 22L22 9L12 2Z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold">Twinturing</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {locale === 'en' 
                ? 'Premium lab-grown diamond jewelry. Same sparkle, smarter choice. Ethically crafted for the conscious consumer.'
                : '高品质实验室培育钻石珠宝。同样的闪耀，更智慧的选择。为具有环保意识的消费者精心打造。'}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href={SITE_CONFIG.socials.instagram} aria-label="Follow us on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={SITE_CONFIG.socials.tiktok} aria-label="Follow us on TikTok" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href={SITE_CONFIG.socials.twitter} aria-label="Follow us on Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href={SITE_CONFIG.socials.youtube} aria-label="Follow us on YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('footer.shop', locale)}</h4>
            <ul className="space-y-3">
              <li className="group">
                <Link href={`/${locale}/products?category=rings`} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.rings', locale)}
                </Link>
              </li>
              <li className="group">
                <Link href={`/${locale}/products?category=necklaces`} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.necklaces', locale)}
                </Link>
              </li>
              <li className="group">
                <Link href={`/${locale}/products?category=earrings`} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.earrings', locale)}
                </Link>
              </li>
              <li className="group">
                <Link href={`/${locale}/products`} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.products', locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('footer.company', locale)}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-brand-gold transition-colors">
                  {t('nav.about', locale)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-brand-gold transition-colors">
                  {t('nav.blog', locale)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="text-gray-400 hover:text-brand-gold transition-colors">
                  {t('nav.faq', locale)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-brand-gold transition-colors">
                  {t('nav.contact', locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('footer.newsletter', locale)}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {locale === 'en'
                ? 'Subscribe for exclusive offers and diamond education.'
                : '订阅获取独家优惠和钻石知识。'}
            </p>
            {subscribed ? (
              <p className="text-brand-gold font-medium">
                {locale === 'en' ? '✓ Thanks for subscribing!' : '✓ 感谢订阅！'}
              </p>
            ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.email.placeholder', locale)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-brand-gold-light transition-colors"
              >
                {t('footer.subscribe', locale)}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {t('footer.copyright', locale)}
            </p>
            
            {/* Trust badges */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {locale === 'en' ? 'IGI Certified' : 'IGI认证'}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h4.05a1 1 0 01.95.684l1.5 4.5A1 1 0 0119.5 13h-2.05a2.5 2.5 0 00-4.9 0H11a1 1 0 01-1-1V7h4z" />
                </svg>
                {locale === 'en' ? 'Free Shipping' : '免费配送'}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                {locale === 'en' ? '30-Day Returns' : '30天退换'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
