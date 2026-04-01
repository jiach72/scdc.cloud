'use client'

import { useState, use } from 'react'
import { t, type Locale, locales } from '@/lib/i18n'

interface FAQPageProps {
  params: Promise<{ locale: string }>
}

interface FAQItem {
  question: Record<string, string>
  answer: Record<string, string>
}

const faqs: FAQItem[] = [
  {
    question: {
      en: 'Are lab-grown diamonds real diamonds?',
      zh: '培育钻石是真钻石吗？'
    },
    answer: {
      en: 'Yes! Lab-grown diamonds are 100% real diamonds. They have the same physical, chemical, and optical properties as mined diamonds. The only difference is their origin — they\'re created in a laboratory rather than mined from the earth.',
      zh: '是的！培育钻石是100%的真钻石。它们与天然钻石具有完全相同的物理、化学和光学性质。唯一的区别是来源——它们是在实验室中培育的，而非从地下开采的。'
    }
  },
  {
    question: {
      en: 'How are lab-grown diamonds made?',
      zh: '培育钻石是如何制造的？'
    },
    answer: {
      en: 'There are two main methods: HPHT (High Pressure High Temperature) and CVD (Chemical Vapor Deposition). Both replicate the natural conditions under which diamonds form, but in a controlled laboratory environment.',
      zh: '主要有两种方法：HPHT（高温高压法）和CVD（化学气相沉积法）。两种方法都是模拟钻石形成的自然条件，但在受控的实验室环境中进行。'
    }
  },
  {
    question: {
      en: 'How much can I save with lab-grown diamonds?',
      zh: '选择培育钻石能节省多少？'
    },
    answer: {
      en: 'Typically, lab-grown diamonds cost 70-80% less than comparable mined diamonds. This means you can get a larger, higher-quality diamond for the same budget.',
      zh: '通常，培育钻石的价格比同等品质的天然钻石低70-80%。这意味着您可以用同样的预算获得更大、更高品质的钻石。'
    }
  },
  {
    question: {
      en: 'Do lab-grown diamonds have certification?',
      zh: '培育钻石有认证证书吗？'
    },
    answer: {
      en: 'Yes! All our diamonds come with IGI (International Gemological Institute) certification, just like mined diamonds. Each certificate includes the diamond\'s 4C grading: Cut, Clarity, Color, and Carat weight.',
      zh: '是的！我们所有的钻石都配有IGI（国际宝石学院）认证证书，与天然钻石一样。每份证书都包含钻石的4C评级：切工、净度、颜色和克拉重量。'
    }
  },
  {
    question: {
      en: 'What is your return policy?',
      zh: '你们的退换政策是什么？'
    },
    answer: {
      en: 'We offer a 30-day return policy for all unworn items in their original packaging. Refunds are processed within 5-7 business days after we receive the return.',
      zh: '我们为所有未佩戴、保持原包装的商品提供30天退换服务。收到退货后5-7个工作日内处理退款。'
    }
  },
  {
    question: {
      en: 'Do you ship internationally?',
      zh: '你们支持国际配送吗？'
    },
    answer: {
      en: 'Yes! We ship worldwide. Standard shipping is free for orders over $500. Express shipping options are available at checkout.',
      zh: '是的！我们支持全球配送。订单满$500免费标准配送。结账时可选择快递配送。'
    }
  },
  {
    question: {
      en: 'How do I choose the right ring size?',
      zh: '如何选择合适的戒指尺寸？'
    },
    answer: {
      en: 'We provide a printable ring sizer and a detailed size guide on our website. If you\'re unsure, we recommend ordering a ring sizer kit (free) or visiting a local jeweler for professional sizing.',
      zh: '我们网站提供可打印的戒指尺寸测量工具和详细的尺寸指南。如果您不确定，我们建议订购免费的尺寸测量套件或到当地珠宝店进行专业测量。'
    }
  },
  {
    question: {
      en: 'Can I customize a piece?',
      zh: '可以定制吗？'
    },
    answer: {
      en: 'Yes! We offer customization services for engagement rings and special pieces. Contact us to discuss your vision, and our design team will work with you to create something unique.',
      zh: '可以！我们为订婚戒指和特殊作品提供定制服务。联系我们讨论您的想法，我们的设计团队将与您一起打造独一无二的作品。'
    }
  }
]

export default function FAQPage({ params }: FAQPageProps) {
  const { locale: localeParam } = use(params)
  const locale = (locales.includes(localeParam as Locale) ? localeParam : "en") as Locale
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-4">
            {t('faq.title', locale)}
          </h1>
          <p className="text-gray-600">
            {t('faq.subtitle', locale)}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span id={`faq-question-${index}`} className="font-medium text-gray-900">
                  {faq.question[locale] || faq.question.en}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="px-6 pb-4 text-gray-600"
                >
                  {faq.answer[locale] || faq.answer.en}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 bg-gray-50 rounded-2xl">
          <h2 className="font-semibold text-lg mb-2">
            {locale === 'en' ? 'Still have questions?' : '还有其他问题？'}
          </h2>
          <p className="text-gray-600 mb-4">
            {locale === 'en'
              ? 'Our team is here to help. Reach out anytime!'
              : '我们的团队随时为您服务。'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-3 bg-brand-gold text-brand-black font-medium rounded hover:bg-brand-gold-light transition-colors"
          >
            {t('nav.contact', locale)}
          </a>
        </div>
      </div>
    </div>
  )
}
