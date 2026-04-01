import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  locale: Locale
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  // Generate a unique gradient based on product category
  const getGradient = () => {
    switch (product.category) {
      case 'rings':
        return 'from-amber-50 via-yellow-50 to-orange-50'
      case 'necklaces':
        return 'from-rose-50 via-pink-50 to-red-50'
      case 'earrings':
        return 'from-violet-50 via-purple-50 to-indigo-50'
      default:
        return 'from-gray-50 to-gray-100'
    }
  }

  // Generate diamond icon based on category
  const getCategoryIcon = () => {
    switch (product.category) {
      case 'rings':
        return (
          <svg className="w-16 h-16 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L2 9L12 22L22 9L12 2Z" />
            <path d="M2 9H22" />
            <path d="M12 2L9 9L12 22" />
            <path d="M12 2L15 9L12 22" />
          </svg>
        )
      case 'necklaces':
        return (
          <svg className="w-16 h-16 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="18" r="4" />
            <path d="M6 6C6 6 8 3 12 3C16 3 18 6 18 6" />
            <path d="M6 6L12 14L18 6" />
          </svg>
        )
      case 'earrings':
        return (
          <svg className="w-16 h-16 text-brand-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="8" cy="18" r="3" />
            <circle cx="16" cy="18" r="3" />
            <path d="M8 15V8" />
            <path d="M16 15V8" />
            <circle cx="8" cy="6" r="2" />
            <circle cx="16" cy="6" r="2" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Product Image */}
        <div className={`aspect-square bg-gradient-to-br ${getGradient()} relative overflow-hidden`}>
          {/* Real product image */}
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name[locale] || product.name.en}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <>
              {/* Fallback decorative pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 diamond-pattern" />
              </div>
              
              {/* Category icon */}
              <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                {getCategoryIcon()}
              </div>
            </>
          )}
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 animate-shimmer" />
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.new && (
              <span className="px-3 py-1 text-xs font-bold bg-brand-black text-white rounded-full">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                -{discount}%
              </span>
            )}
            {product.featured && !product.new && discount === 0 && (
              <span className="px-3 py-1 text-xs font-bold bg-brand-gold text-brand-black rounded-full">
                {locale === 'en' ? 'Featured' : '精选'}
              </span>
            )}
          </div>
          
          {/* Quick view button */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <div
              role="button"
              tabIndex={0}
              className="w-full py-3 bg-white/90 backdrop-blur-sm text-brand-black text-center font-medium rounded-lg shadow-lg"
            >
              {locale === 'en' ? 'Quick View' : '快速查看'}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Category */}
          <p className="text-xs text-brand-gold font-medium uppercase tracking-wider mb-2">
            {locale === 'en' 
              ? (product.category === 'rings' ? 'Rings' : product.category === 'necklaces' ? 'Necklaces' : 'Earrings')
              : (product.category === 'rings' ? '戒指' : product.category === 'necklaces' ? '项链' : '耳环')
            }
          </p>
          
          {/* Name */}
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-gold transition-colors duration-300 mb-2 line-clamp-1">
            {product.name[locale] || product.name.en}
          </h3>

          {/* Specs */}
          {product.specs.carat && (
            <p className="text-sm text-gray-500 mb-3">
              {product.specs.carat}ct · {product.specs.cut} · {product.specs.color}
              {product.specs.metal && ` · ${product.specs.metal}`}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-brand-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
