import { products, getProductBySlug } from '@/data/products'
import type { Locale } from '@/lib/i18n'

export function generateStaticParams() {
  const langLocales: Locale[] = ['en', 'zh']
  return langLocales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      slug: product.slug,
    }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = (['en', 'zh'].includes(localeParam) ? localeParam : 'en') as Locale
  const product = getProductBySlug(slug)
  
  if (!product) return {}
  
  const name = product.name[locale] || product.name.en
  const desc = (product.description[locale] || product.description.en).slice(0, 155)
  const url = `https://twinturing.com/${locale}/products/${slug}`
  const otherLocale = locale === 'en' ? 'zh' : 'en'
  
  return {
    title: `${name} | Twinturing - Lab-Grown Diamond Jewelry`,
    description: `${name} - ${desc}. Price: $${product.price}. IGI Certified lab-grown diamond.`,
    alternates: {
      canonical: url,
      languages: {
        en: `https://twinturing.com/en/products/${slug}`,
        zh: `https://twinturing.com/zh/products/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Twinturing`,
      description: desc,
      url,
      images: product.images?.[0] ? [{ url: `https://twinturing.com${product.images[0]}`, width: 800, height: 800 }] : [],
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      alternateLocale: [otherLocale === 'en' ? 'en_US' : 'zh_CN'],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
