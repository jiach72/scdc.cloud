import { MetadataRoute } from 'next'
import { products } from '@/data/products'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://twinturing.com'
  const locales = ['en', 'zh'] as const
  
  const staticPages = ['', '/about', '/contact', '/blog', '/faq', '/products']
  
  const entries: MetadataRoute.Sitemap = []
  
  // Static pages
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}/`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }
  
  // Product pages
  for (const locale of locales) {
    for (const product of products) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${product.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  }
  
  return entries
}
