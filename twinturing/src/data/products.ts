export interface Product {
  id: string
  slug: string
  name: Record<string, string>
  description: Record<string, string>
  category: 'rings' | 'necklaces' | 'earrings'
  price: number
  originalPrice?: number
  images: string[]
  specs: {
    carat?: number
    clarity?: string
    color?: string
    cut?: string
    metal?: string
    sizes?: string[]
  }
  featured?: boolean
  new?: boolean
}

export const products: Product[] = [
  {
    id: 'rings-1',
    slug: 'eternal-solitaire-ring',
    name: { en: 'Eternal Solitaire Ring', zh: '永恒独钻戒指' },
    description: {
      en: 'The Eternal Solitaire Ring showcases a magnificent 1.0ct D-color lab-grown diamond in a classic solitaire setting. Set in 18K white gold, this ring features an Excellent cut that maximizes brilliance and fire — a timeless symbol of eternal love.',
      zh: '永恒独钻戒指以经典独钻镶嵌工艺，展现一颗璀璨的1.0克拉D色培育钻石。18K白金镶嵌，卓越切工最大程度释放火彩与光芒——永恒之爱的不朽象征。'
    },
    category: 'rings',
    price: 599,
    originalPrice: 2396,
    images: ["/images/products/processed/rings-1-1.png", "/images/products/processed/rings-1-2.png", "/images/products/processed/rings-1-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K White Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: true,
    new: false
  },
  {
    id: 'rings-2',
    slug: 'halo-dream-ring',
    name: { en: 'Halo Dream Ring', zh: '光环之梦戒指' },
    description: {
      en: 'The Halo Dream Ring features a stunning 1.2ct E-color center diamond encircled by a delicate halo of smaller stones. Crafted in 18K rose gold, the halo design amplifies the diamond\'s sparkle, creating an unforgettable display of radiance.',
      zh: '光环之梦戒指以一圈精致的小钻环绕1.2克拉E色主钻，营造梦幻光晕效果。18K玫瑰金镶嵌，光环设计放大钻石光芒，绽放令人难忘的璀璨。'
    },
    category: 'rings',
    price: 599,
    originalPrice: 2396,
    images: ["/images/products/processed/rings-2-1.png", "/images/products/processed/rings-2-2.png", "/images/products/processed/rings-2-3.png"],
    specs: {"carat": 1.2, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K Rose Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: true,
    new: false
  },
  {
    id: 'rings-3',
    slug: 'princess-cut-elegance',
    name: { en: 'Princess Cut Elegance', zh: '公主方优雅戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/rings-3-1.png", "/images/products/processed/rings-3-2.png", "/images/products/processed/rings-3-3.png"],
    specs: {"carat": 0.5, "clarity": "VS2", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-4',
    slug: 'three-stone-trilogy',
    name: { en: 'Three Stone Trilogy', zh: '三石传奇戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/rings-4-1.png", "/images/products/processed/rings-4-2.png", "/images/products/processed/rings-4-3.png"],
    specs: {"carat": 1.8, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "Platinum", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-5',
    slug: 'vintage-marquise',
    name: { en: 'Vintage Marquise', zh: '复古马眼戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/rings-5-1.png", "/images/products/processed/rings-5-2.png", "/images/products/processed/rings-5-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K White Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-6',
    slug: 'infinity-band',
    name: { en: 'Infinity Band', zh: '无限之环戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/rings-6-1.png", "/images/products/processed/rings-6-2.png", "/images/products/processed/rings-6-3.png"],
    specs: {"carat": 1.2, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K Rose Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-7',
    slug: 'pav-diamond-ring',
    name: { en: 'Pavé Diamond Ring', zh: '密钉钻石戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/rings-7-1.png", "/images/products/processed/rings-7-2.png", "/images/products/processed/rings-7-3.png"],
    specs: {"carat": 0.5, "clarity": "VS2", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-8',
    slug: 'cushion-cut-classic',
    name: { en: 'Cushion Cut Classic', zh: '枕形切割经典戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 299,
    originalPrice: 1196,
    images: ["/images/products/processed/rings-8-1.png", "/images/products/processed/rings-8-2.png", "/images/products/processed/rings-8-3.png"],
    specs: {"carat": 1.8, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "Platinum", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-9',
    slug: 'emerald-cut-statement',
    name: { en: 'Emerald Cut Statement', zh: '祖母绿切割宣言戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/rings-9-1.png", "/images/products/processed/rings-9-2.png", "/images/products/processed/rings-9-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K White Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-10',
    slug: 'oval-solitaire',
    name: { en: 'Oval Solitaire', zh: '椭圆形独钻戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 599,
    originalPrice: 2396,
    images: ["/images/products/processed/rings-10-1.png", "/images/products/processed/rings-10-2.png", "/images/products/processed/rings-10-3.png"],
    specs: {"carat": 1.2, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K Rose Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-11',
    slug: 'minimalist-band',
    name: { en: 'Minimalist Band', zh: '极简戒环' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 199,
    originalPrice: 796,
    images: ["/images/products/processed/rings-11-1.png", "/images/products/processed/rings-11-2.png", "/images/products/processed/rings-11-3.png"],
    specs: {"carat": 0.5, "clarity": "VS2", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-12',
    slug: 'twisted-pav-',
    name: { en: 'Twisted Pavé', zh: '扭臂密钉戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/rings-12-1.png", "/images/products/processed/rings-12-2.png", "/images/products/processed/rings-12-3.png"],
    specs: {"carat": 1.8, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "Platinum", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-13',
    slug: 'pear-shape-halo',
    name: { en: 'Pear Shape Halo', zh: '梨形光环戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 599,
    originalPrice: 2396,
    images: ["/images/products/processed/rings-13-1.png", "/images/products/processed/rings-13-2.png", "/images/products/processed/rings-13-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K White Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: false
  },
  {
    id: 'rings-14',
    slug: 'round-brilliant-classic',
    name: { en: 'Round Brilliant Classic', zh: '圆形明亮式经典戒指' },
    description: {
      en: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.',
      zh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。'
    },
    category: 'rings',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/rings-14-1.png", "/images/products/processed/rings-14-2.png", "/images/products/processed/rings-14-3.png"],
    specs: {"carat": 1.2, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K Rose Gold", "sizes": ["4", "5", "6", "7", "8"]},
    featured: false,
    new: true
  },
  {
    id: 'necklaces-1',
    slug: 'floating-diamond-pendant',
    name: { en: 'Floating Diamond Pendant', zh: '悬浮钻石吊坠' },
    description: {
      en: 'The Floating Diamond Pendant appears to defy gravity — a 0.75ct D-color diamond suspended delicately on an 18K rose gold chain. The minimalist design lets the diamond\'s natural brilliance take center stage, perfect for both everyday elegance and special occasions.',
      zh: '悬浮钻石吊坠仿佛挑战重力——0.75克拉D色钻石轻盈悬于18K玫瑰金链上。极简设计让钻石的天然光芒成为主角，日常优雅与特殊场合皆宜。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-1-1.png", "/images/products/processed/necklaces-1-2.png", "/images/products/processed/necklaces-1-3.png"],
    specs: {"carat": 0.75, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K Rose Gold"},
    featured: true,
    new: false
  },
  {
    id: 'necklaces-2',
    slug: 'tennis-necklace',
    name: { en: 'Tennis Necklace', zh: '网球项链' },
    description: {
      en: 'The Tennis Necklace is a continuous line of meticulously matched 0.5ct E-color diamonds set in 18K white gold. Each stone is carefully selected for consistent brilliance, creating an unbroken river of light that drapes elegantly across the neckline.',
      zh: '网球项链由一串精心匹配的0.5克拉E色钻石连缀而成，18K白金镶嵌。每颗钻石都经过严格筛选，确保一致的光彩，形成一条优雅环绕颈间的璀璨光河。'
    },
    category: 'necklaces',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/necklaces-2-1.png", "/images/products/processed/necklaces-2-2.png", "/images/products/processed/necklaces-2-3.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K White Gold"},
    featured: true,
    new: false
  },
  {
    id: 'necklaces-3',
    slug: 'heart-diamond-pendant',
    name: { en: 'Heart Diamond Pendant', zh: '心形钻石吊坠' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-3-1.png", "/images/products/processed/necklaces-3-2.png", "/images/products/processed/necklaces-3-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-4',
    slug: 'elegant-drop-necklace',
    name: { en: 'Elegant Drop Necklace', zh: '优雅垂坠项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-4-1.png", "/images/products/processed/necklaces-4-2.png", "/images/products/processed/necklaces-4-3.png"],
    specs: {"carat": 0.75, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K Rose Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-5',
    slug: 'infinity-loop-pendant',
    name: { en: 'Infinity Loop Pendant', zh: '无限环吊坠' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 299,
    originalPrice: 1196,
    images: ["/images/products/processed/necklaces-5-1.png", "/images/products/processed/necklaces-5-2.png", "/images/products/processed/necklaces-5-3.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K White Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-6',
    slug: 'cluster-diamond-necklace',
    name: { en: 'Cluster Diamond Necklace', zh: '群镶钻石项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-6-1.png", "/images/products/processed/necklaces-6-2.png", "/images/products/processed/necklaces-6-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-7',
    slug: 'pearl-diamond-pendant',
    name: { en: 'Pearl & Diamond Pendant', zh: '珍珠钻石吊坠' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 299,
    originalPrice: 1196,
    images: ["/images/products/processed/necklaces-7-1.png", "/images/products/processed/necklaces-7-2.png", "/images/products/processed/necklaces-7-3.png"],
    specs: {"carat": 0.75, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K Rose Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-8',
    slug: 'solitaire-station',
    name: { en: 'Solitaire Station', zh: '独钻驿站项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-8-1.png", "/images/products/processed/necklaces-8-2.png", "/images/products/processed/necklaces-8-3.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K White Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-9',
    slug: 'layered-chain-pendant',
    name: { en: 'Layered Chain Pendant', zh: '层叠链吊坠' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 199,
    originalPrice: 796,
    images: ["/images/products/processed/necklaces-9-1.png", "/images/products/processed/necklaces-9-2.png", "/images/products/processed/necklaces-9-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-10',
    slug: 'emerald-cut-pendant',
    name: { en: 'Emerald Cut Pendant', zh: '祖母绿切割吊坠' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 499,
    originalPrice: 1996,
    images: ["/images/products/processed/necklaces-10-1.png", "/images/products/processed/necklaces-10-2.png", "/images/products/processed/necklaces-10-3.png"],
    specs: {"carat": 0.75, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K Rose Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-11',
    slug: 'butterfly-diamond-necklace',
    name: { en: 'Butterfly Diamond Necklace', zh: '蝴蝶钻石项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 299,
    originalPrice: 1196,
    images: ["/images/products/processed/necklaces-11-1.png", "/images/products/processed/necklaces-11-2.png", "/images/products/processed/necklaces-11-3.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K White Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-12',
    slug: 'marquise-drop-necklace',
    name: { en: 'Marquise Drop Necklace', zh: '马眼垂坠项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-12-1.png", "/images/products/processed/necklaces-12-2.png", "/images/products/processed/necklaces-12-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-13',
    slug: 'vintage-locket-pendant',
    name: { en: 'Vintage Locket Pendant', zh: '复古盒式吊坠' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 299,
    originalPrice: 1196,
    images: ["/images/products/processed/necklaces-13-1.png", "/images/products/processed/necklaces-13-2.png", "/images/products/processed/necklaces-13-3.png"],
    specs: {"carat": 0.75, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K Rose Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-14',
    slug: 'halo-pendant-necklace',
    name: { en: 'Halo Pendant Necklace', zh: '光环吊坠项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-14-1.png", "/images/products/processed/necklaces-14-2.png", "/images/products/processed/necklaces-14-3.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "18K White Gold"},
    featured: false,
    new: false
  },
  {
    id: 'necklaces-15',
    slug: 'princess-cut-station',
    name: { en: 'Princess Cut Station', zh: '公主方驿站项链' },
    description: {
      en: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.',
      zh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。'
    },
    category: 'necklaces',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/necklaces-15-1.png", "/images/products/processed/necklaces-15-2.png", "/images/products/processed/necklaces-15-3.png"],
    specs: {"carat": 1.0, "clarity": "VS1", "color": "D", "cut": "Excellent", "metal": "18K Yellow Gold"},
    featured: false,
    new: true
  },
  {
    id: 'earrings-1',
    slug: 'classic-diamond-studs',
    name: { en: 'Classic Diamond Studs', zh: '经典钻石耳钉' },
    description: {
      en: 'The Classic Diamond Studs feature a perfectly matched pair of 1.0ct D-color diamonds in 18K white gold four-prong settings. With VVS1 clarity and Excellent cut, these studs capture maximum light from every angle — the essential foundation of any jewelry collection.',
      zh: '经典钻石耳钉以一对完美匹配的1.0克拉D色钻石镶嵌于18K白金四爪底座中。VVS1净度搭配卓越切工，从每个角度捕捉最大光线——任何珠宝收藏的必备之选。'
    },
    category: 'earrings',
    price: 199,
    originalPrice: 796,
    images: ["/images/products/processed/earrings-1-1.png", "/images/products/processed/earrings-1-2.png", "/images/products/processed/earrings-1-3.png"],
    specs: {"carat": 1.0, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K White Gold"},
    featured: true,
    new: false
  },
  {
    id: 'earrings-2',
    slug: 'elegant-drop-earrings',
    name: { en: 'Elegant Drop Earrings', zh: '优雅垂坠耳环' },
    description: {
      en: 'The Elegant Drop Earrings dangle 0.5ct E-color diamonds from sleek 14K white gold posts, creating graceful movement with every turn of the head. The elongated silhouette flatters the face and adds a touch of red-carpet glamour to any ensemble.',
      zh: '优雅垂坠耳环以0.5克拉E色钻石悬垂于精巧的14K白金耳柱下，随着头部转动呈现优雅律动。修长的轮廓修饰脸型，为任何装扮增添红毯级的华丽感。'
    },
    category: 'earrings',
    price: 299,
    originalPrice: 1196,
    images: ["/images/products/processed/earrings-2-1.png", "/images/products/processed/earrings-2-2.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "14K White Gold"},
    featured: true,
    new: false
  },
  {
    id: 'earrings-3',
    slug: 'diamond-hoop-earrings',
    name: { en: 'Diamond Hoop Earrings', zh: '钻石圈形耳环' },
    description: {
      en: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.',
      zh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。'
    },
    category: 'earrings',
    price: 249,
    originalPrice: 996,
    images: ["/images/products/processed/earrings-3-1.png", "/images/products/processed/earrings-3-2.png", "/images/products/processed/earrings-3-3.png"],
    specs: {"carat": 0.75, "clarity": "VS2", "color": "F", "cut": "Very Good", "metal": "14K Yellow Gold"},
    featured: false,
    new: false
  },
  {
    id: 'earrings-4',
    slug: 'halo-stud-earrings',
    name: { en: 'Halo Stud Earrings', zh: '光环耳钉' },
    description: {
      en: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.',
      zh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。'
    },
    category: 'earrings',
    price: 199,
    originalPrice: 796,
    images: ["/images/products/processed/earrings-4-1.png", "/images/products/processed/earrings-4-2.png"],
    specs: {"carat": 1.0, "clarity": "VVS1", "color": "D", "cut": "Excellent", "metal": "18K White Gold"},
    featured: false,
    new: false
  },
  {
    id: 'earrings-5',
    slug: 'chandelier-drops',
    name: { en: 'Chandelier Drops', zh: '枝形吊灯耳环' },
    description: {
      en: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.',
      zh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。'
    },
    category: 'earrings',
    price: 399,
    originalPrice: 1596,
    images: ["/images/products/processed/earrings-5-1.png", "/images/products/processed/earrings-5-2.png", "/images/products/processed/earrings-5-3.png"],
    specs: {"carat": 0.5, "clarity": "VS1", "color": "E", "cut": "Excellent", "metal": "14K White Gold"},
    featured: false,
    new: true
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}
