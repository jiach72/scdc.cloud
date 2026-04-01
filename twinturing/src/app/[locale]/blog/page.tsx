import Link from 'next/link'
import type { Metadata } from 'next'
import { t, type Locale, locales } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'zh' ? '资讯 - 双生图灵' : 'Journal - Twinturing',
    description: locale === 'zh'
      ? '来自培育钻石世界的见解、指南和故事。'
      : 'Insights, guides, and stories from the world of lab-grown diamonds.',
  }
}

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

interface BlogPost {
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  date: string
  category: string
}

const posts: BlogPost[] = [
  {
    slug: 'lab-grown-vs-mined-diamonds',
    title: {
      en: 'Lab-Grown vs. Mined Diamonds: What\'s the Difference?',
      zh: '培育钻石 vs 天然钻石：有什么区别？'
    },
    excerpt: {
      en: 'Everything you need to know about the key differences between lab-grown and mined diamonds — from price to ethics to quality.',
      zh: '关于培育钻石与天然钻石的关键区别，您需要知道的一切——从价格到伦理到品质。'
    },
    date: '2026-03-15',
    category: 'Education'
  },
  {
    slug: 'how-to-choose-engagement-ring',
    title: {
      en: 'How to Choose the Perfect Engagement Ring',
      zh: '如何选择完美的订婚戒指'
    },
    excerpt: {
      en: 'A comprehensive guide to finding the engagement ring that perfectly matches your partner\'s style and your budget.',
      zh: '全面指南，帮您找到完美匹配伴侣风格和预算的订婚戒指。'
    },
    date: '2026-03-10',
    category: 'Guides'
  },
  {
    slug: 'understanding-4cs',
    title: {
      en: 'Understanding the 4Cs: A Beginner\'s Guide',
      zh: '了解4C：初学者指南'
    },
    excerpt: {
      en: 'Learn how Cut, Clarity, Color, and Carat affect a diamond\'s beauty and value.',
      zh: '了解切工、净度、颜色和克拉如何影响钻石的美观和价值。'
    },
    date: '2026-03-05',
    category: 'Education'
  },
  {
    slug: 'sustainable-jewelry-trends-2026',
    title: {
      en: 'Sustainable Jewelry Trends to Watch in 2026',
      zh: '2026年可持续珠宝趋势'
    },
    excerpt: {
      en: 'From lab-grown diamonds to recycled metals, discover the trends shaping the future of ethical jewelry.',
      zh: '从培育钻石到回收金属，发现塑造伦理珠宝未来的趋势。'
    },
    date: '2026-02-28',
    category: 'Trends'
  }
]

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: localeParam } = await params
  const locale = (locales.includes(localeParam as Locale) ? localeParam : "en") as Locale

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-4">
            {t('nav.blog', locale)}
          </h1>
          <p className="text-gray-600">
            {locale === 'en'
              ? 'Insights, guides, and stories from the world of lab-grown diamonds.'
              : '来自培育钻石世界的见解、指南和故事。'}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Placeholder Image */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <time className="text-xs text-gray-500">{post.date}</time>
                </div>

                <h2 className="font-semibold text-lg text-gray-900 group-hover:text-brand-gold transition-colors mb-2">
                  {post.title[locale] || post.title.en}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.excerpt[locale] || post.excerpt.en}
                </p>

                <span className="inline-block mt-4 text-sm font-medium text-brand-gold">
                  {locale === 'en' ? 'Read More →' : '阅读更多 →'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
