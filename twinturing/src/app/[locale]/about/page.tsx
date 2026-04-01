import Link from 'next/link'
import type { Metadata } from 'next'
import { t, type Locale, locales } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'zh' ? '关于我们 - 双生图灵' : 'About Us - Twinturing',
    description: locale === 'zh'
      ? '双生图灵（Twinturing）— 用科技定义闪耀，用智慧选择永恒。高品质实验室培育钻石珠宝品牌。'
      : 'Twinturing — Where technology meets timeless elegance. Premium lab-grown diamond jewelry brand.',
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-cream via-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 diamond-pattern opacity-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full mb-6">
              {locale === 'en' ? 'Our Story' : '我们的故事'}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-brand-black mb-6">
              {t('about.title', locale)}
            </h1>
            <p className="text-xl text-gray-600">
              {t('about.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brand-black mb-6">
                {locale === 'en' ? 'Why We Started' : '我们为何而始'}
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                {locale === 'en' ? (
                  <>
                    <p>
                      <strong className="text-brand-black">Twinturing</strong> was born from a simple question: <em>Why should brilliance come at such a high cost?</em>
                    </p>
                    <p>
                      Our founder, after years in the tech industry, witnessed firsthand how lab-grown diamond technology had reached a point where even expert gemologists couldn't tell the difference — yet consumers were still paying premium prices for mined stones.
                    </p>
                    <p>
                      We saw an opportunity to disrupt an industry built on artificial scarcity and bring truly accessible luxury to everyone. Not cheap jewelry, but real diamonds at real prices.
                    </p>
                    <p>
                      The name <strong>Twinturing</strong> combines two ideas — <strong>Twin</strong>, representing the identical nature of lab-grown and mined diamonds, and <strong>Turing</strong>, honoring Alan Turing, the father of computer science, symbolizing our belief in technology's power to make the world better.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong className="text-brand-black">双生图灵</strong>诞生于一个简单的问题：<em>为什么璀璨必须付出如此高昂的代价？</em>
                    </p>
                    <p>
                      我们的创始人在科技行业深耕多年后，亲眼见证了培育钻石技术已达到连专业宝石学家都无法分辨的程度——然而消费者仍在为天然钻石支付高昂溢价。
                    </p>
                    <p>
                      我们看到了颠覆一个建立在人为稀缺性上的行业的机会，将真正的奢华带给每个人。不是廉价珠宝，而是以真实价格拥有真正的钻石。
                    </p>
                    <p>
                      <strong>双生图灵</strong>这个名字融合了两个理念——<strong>双生</strong>，代表培育钻石与天然钻石本质相同；<strong>图灵</strong>，致敬计算机科学之父艾伦·图灵，象征我们对科技改变世界的信念。
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 9L12 22L22 9L12 2Z" />
                    </svg>
                  </div>
                  <p className="text-brand-gold font-serif text-2xl font-bold">Twinturing</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 text-brand-gold text-sm font-medium rounded-full mb-6">
            {locale === 'en' ? 'Our Mission' : '我们的使命'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            {t('about.mission.title', locale)}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t('about.mission.text', locale)}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              {t('about.values.title', locale)}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sustainability */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('about.values.sustainability', locale)}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'Zero mining. Zero conflict. Our diamonds are grown in controlled environments using renewable energy where possible. Every purchase supports a cleaner future.'
                  : '零开采。零冲突。我们的钻石在受控环境中培育，尽可能使用可再生能源。每次购买都在支持更清洁的未来。'}
              </p>
            </div>

            {/* Transparency */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('about.values.transparency', locale)}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'Every price breakdown is public. Every certification is verifiable. We believe informed customers make better decisions.'
                  : '每项价格公开透明。每份认证可验证。我们相信知情的客户能做出更好的决定。'}
              </p>
            </div>

            {/* Innovation */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('about.values.innovation', locale)}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'From lab to finger, we leverage cutting-edge technology. We embrace innovation not for its own sake, but to create better products and experiences.'
                  : '从实验室到指尖，我们利用尖端技术。我们拥抱创新并非为了创新本身，而是为了创造更好的产品和体验。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-brand-cream to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-gold mb-2">100%</div>
              <div className="text-gray-600">
                {locale === 'en' ? 'Lab-Grown' : '实验室培育'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-gold mb-2">70-80%</div>
              <div className="text-gray-600">
                {locale === 'en' ? 'Cost Savings' : '成本节省'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-gold mb-2">IGI</div>
              <div className="text-gray-600">
                {locale === 'en' ? 'Certified' : '国际认证'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-gold mb-2">30</div>
              <div className="text-gray-600">
                {locale === 'en' ? 'Day Returns' : '天退换'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            {locale === 'en' ? 'Ready to Experience the Difference?' : '准备好体验不同了吗？'}
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {locale === 'en'
              ? 'Discover our collections and find your perfect piece.'
              : '探索我们的系列，找到您的完美之选。'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-brand-gold-light transition-all duration-300"
            >
              {t('hero.cta', locale)}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              {t('nav.contact', locale)}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
