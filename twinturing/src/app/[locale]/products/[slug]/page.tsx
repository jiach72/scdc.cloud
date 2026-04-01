import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Locale, locales } from '@/lib/i18n'
import { getProductBySlug } from '@/data/products'
import ProductDetailClient from './ProductDetailClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found - Twinturing' }
  }

  return {
    title: `${product.name[locale] || product.name.en} - Twinturing`,
    description: (product.description[locale] || product.description.en).slice(0, 160),
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} locale={locale} />
}
