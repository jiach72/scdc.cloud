import Link from 'next/link'
import { t, type Locale, locales } from '@/lib/i18n'
import { getFeaturedProducts } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const featuredProducts = getFeaturedProducts()

  return (
    <>
      {/* Hero Section with Diamond Background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-white to-gray-50 diamond-pattern" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full mb-6">
                {locale === 'en' ? '✨ Lab-Grown Diamond Jewelry' : '✨ 实验室培育钻石珠宝'}
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-black leading-tight">
                {locale === 'en' ? (
                  <>
                    Same Sparkle,<br />
                    <span className="text-gold-gradient">Smarter Choice</span>
                  </>
                ) : (
                  <>
                    同样的闪耀，<br />
                    <span className="text-gold-gradient">更智慧的选择</span>
                  </>
                )}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-lg">
                {locale === 'en'
                  ? 'Premium lab-grown diamond jewelry that shines just as bright — at 70-80% less than mined diamonds.'
                  : '高品质实验室培育钻石珠宝，同样的璀璨——价格仅为天然钻石的20-30%。'}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
                >
                  {t('hero.cta', locale)}
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
                >
                  {t('hero.cta.secondary', locale)}
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {locale === 'en' ? 'IGI Certified' : 'IGI认证'}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {locale === 'en' ? 'Free Shipping' : '免费配送'}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {locale === 'en' ? '30-Day Returns' : '30天退换'}
                </div>
              </div>
            </div>
            
            {/* Hero Image / Diamond Visual */}
            <div className="relative animate-scale-in delay-200">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative ring */}
                <div className="absolute inset-0 border-2 border-brand-gold/20 rounded-full animate-float" />
                <div className="absolute inset-4 border border-brand-gold/10 rounded-full animate-float delay-100" />
                
                {/* Center diamond */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    {/* Diamond shape using CSS */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark transform rotate-45 rounded-lg shadow-2xl shadow-brand-gold/30 animate-sparkle" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-tr from-white via-brand-gold-light to-white transform rotate-45 rounded-lg" />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-brand-gold rounded-full animate-float delay-200" />
                <div className="absolute bottom-20 left-10 w-3 h-3 bg-brand-gold-light rounded-full animate-float delay-300" />
                <div className="absolute top-1/3 left-5 w-2 h-2 bg-brand-gold rounded-full animate-float delay-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              {locale === 'en' ? 'Why Choose Twinturing?' : '为什么选择双生图灵？'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'We combine cutting-edge technology with timeless elegance to bring you diamonds that are indistinguishable from nature\'s finest.'
                : '我们将尖端技术与永恒优雅相结合，为您带来与自然最精美钻石别无二致的珠宝。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/10">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'en' ? 'Identical Quality' : '完全相同品质'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'en'
                  ? 'Our diamonds are physically, chemically, and optically identical to mined diamonds. Even expert gemologists need specialized equipment to tell the difference.'
                  : '我们的钻石在物理、化学和光学性质上与天然钻石完全相同。即使是专业宝石学家也需要专业设备才能区分。'}
              </p>
            </div>

            {/* Value 2 */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/10">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'en' ? '70-80% Savings' : '节省70-80%'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'en'
                  ? 'Get a larger, higher-quality diamond for your budget. Our direct-to-consumer model eliminates middlemen, passing the savings directly to you.'
                  : '用同样的预算获得更大、更高品质的钻石。我们的直销模式消除中间商，直接将节省传递给您。'}
              </p>
            </div>

            {/* Value 3 */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/10">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'en' ? 'Ethical & Sustainable' : '伦理与可持续'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'en'
                  ? '100% conflict-free. Zero environmental damage from mining. Our lab-grown diamonds are the responsible choice for conscious consumers.'
                  : '100%零冲突。零采矿环境破坏。我们的培育钻石是具有环保意识消费者的负责任选择。'}
              </p>
            </div>

            {/* Value 4 */}
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/10">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'en' ? 'Certified & Guaranteed' : '认证与保障'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'en'
                  ? 'Every diamond comes with IGI certification. Plus, enjoy lifetime warranty and our 30-day no-questions-asked return policy.'
                  : '每颗钻石均附IGI认证。此外，享受终身保修和30天无理由退换政策。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full mb-4">
              {locale === 'en' ? 'Curated Selection' : '精选系列'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              {locale === 'en' ? 'Our Most Loved Pieces' : '我们最受欢迎的作品'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Each piece is meticulously crafted to perfection, designed to be cherished for generations.'
                : '每一件作品都经过精心打造至臻完美，旨在成为世代相传的珍藏。'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={`animate-fade-in delay-${(index + 1) * 100}`}>
                <ProductCard product={product} locale={locale} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-8 py-4 bg-brand-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 group"
            >
              {t('common.viewAll', locale)}
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              {locale === 'en' ? 'How Lab-Grown Diamonds Work' : '培育钻石是如何诞生的'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Science meets artistry. Our diamonds are created using advanced technology that replicates nature\'s process.'
                : '科学与艺术的结合。我们的钻石采用先进技术培育，完美复制自然的过程。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-brand-gold text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'en' ? 'Carbon Foundation' : '碳元素基础'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'en'
                    ? 'We start with a tiny diamond seed — a thin slice of carbon that will grow into a full diamond.'
                    : '我们从微小的钻石种子开始——一片薄薄的碳片，它将成长为完整的钻石。'}
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-brand-gold text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'en' ? 'Extreme Conditions' : '极端条件'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'en'
                    ? 'The seed is placed in a chamber replicating Earth\'s mantle — extreme heat and pressure that nature uses over billions of years.'
                    : '种子被放置在模拟地球地幔的环境中——极端的高温高压，这是自然界需要数十亿年的过程。'}
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-brand-gold text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'en' ? 'Perfect Diamond' : '完美钻石'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'en'
                  ? 'After weeks of growth, the rough diamond is cut and polished by master craftsmen into a brilliant gemstone.'
                  : '经过数周的培育，原石由大师级工匠切割打磨，成为璀璨的宝石。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              {locale === 'en' ? 'What Our Customers Say' : '客户评价'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                {locale === 'en'
                  ? '"I was skeptical at first, but the diamond is absolutely stunning. My fiancée couldn\'t believe it wasn\'t mined. The savings allowed us to put more toward our wedding!"'
                  : '"起初我持怀疑态度，但这颗钻石绝对令人惊艳。我未婚妻不敢相信这不是天然钻石。省下的钱让我们能花更多在婚礼上！"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-semibold">
                  S
                </div>
                <div>
                  <div className="font-medium">Sarah M.</div>
                  <div className="text-sm text-gray-500">
                    {locale === 'en' ? 'New York, USA' : '美国纽约'}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                {locale === 'en'
                  ? '"The quality is exceptional. I compared it side-by-side with my friend\'s natural diamond and no one could tell the difference. Twinturing gained a customer for life!"'
                  : '"品质超群。我和朋友的天然钻石放在一起比较，没人能分辨出区别。双生图灵赢得了我这个终身客户！"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-semibold">
                  J
                </div>
                <div>
                  <div className="font-medium">James L.</div>
                  <div className="text-sm text-gray-500">
                    {locale === 'en' ? 'London, UK' : '英国伦敦'}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                {locale === 'en'
                  ? '"As someone who cares deeply about sustainability, Twinturing aligned perfectly with my values. Beautiful jewelry without the environmental guilt."'
                  : '"作为一个非常注重可持续发展的人，双生图灵完全符合我的价值观。美丽的珠宝，没有环境负罪感。"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-semibold">
                  E
                </div>
                <div>
                  <div className="font-medium">Emily C.</div>
                  <div className="text-sm text-gray-500">
                    {locale === 'en' ? 'Toronto, Canada' : '加拿大多伦多'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            {locale === 'en'
              ? 'Ready to Find Your Perfect Piece?'
              : '准备好找到您的完美之选了吗？'}
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Join thousands of smart shoppers who discovered that brilliance doesn\'t have to break the bank.'
              : '加入数千名聪明消费者，他们发现璀璨不必掏空钱包。'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-10 py-5 bg-brand-gold text-brand-black font-bold text-lg rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/30"
            >
              {t('hero.cta', locale)}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              {locale === 'en' ? 'Contact Us' : '联系我们'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
