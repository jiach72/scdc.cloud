import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Product data from existing frontend
const products = [
  { id: 'rings-1', slug: 'eternal-solitaire-ring', nameEn: 'Eternal Solitaire Ring', nameZh: '永恒独钻戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 599, comparePrice: 2396, material: '18K White Gold', isFeatured: true, images: ['/images/products/processed/rings-1-1.png', '/images/products/processed/rings-1-2.png', '/images/products/processed/rings-1-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-2', slug: 'halo-dream-ring', nameEn: 'Halo Dream Ring', nameZh: '光环之梦戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 599, comparePrice: 2396, material: '18K Rose Gold', isFeatured: true, images: ['/images/products/processed/rings-2-1.png', '/images/products/processed/rings-2-2.png', '/images/products/processed/rings-2-3.png'], specs: { carat: 1.2, clarity: 'VS1', color: 'E', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-3', slug: 'princess-cut-elegance', nameEn: 'Princess Cut Elegance', nameZh: '公主方优雅戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 399, comparePrice: 1596, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/rings-3-1.png', '/images/products/processed/rings-3-2.png', '/images/products/processed/rings-3-3.png'], specs: { carat: 0.5, clarity: 'VS2', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-4', slug: 'three-stone-trilogy', nameEn: 'Three Stone Trilogy', nameZh: '三石传奇戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 499, comparePrice: 1996, material: 'Platinum', isFeatured: false, images: ['/images/products/processed/rings-4-1.png', '/images/products/processed/rings-4-2.png', '/images/products/processed/rings-4-3.png'], specs: { carat: 1.8, clarity: 'VVS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-5', slug: 'vintage-marquise', nameEn: 'Vintage Marquise', nameZh: '复古马眼戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 499, comparePrice: 1996, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/rings-5-1.png', '/images/products/processed/rings-5-2.png', '/images/products/processed/rings-5-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-6', slug: 'infinity-band', nameEn: 'Infinity Band', nameZh: '无限之环戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 499, comparePrice: 1996, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/rings-6-1.png', '/images/products/processed/rings-6-2.png', '/images/products/processed/rings-6-3.png'], specs: { carat: 1.2, clarity: 'VS1', color: 'E', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-7', slug: 'pav-diamond-ring', nameEn: 'Pavé Diamond Ring', nameZh: '密钉钻石戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 499, comparePrice: 1996, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/rings-7-1.png', '/images/products/processed/rings-7-2.png', '/images/products/processed/rings-7-3.png'], specs: { carat: 0.5, clarity: 'VS2', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-8', slug: 'cushion-cut-classic', nameEn: 'Cushion Cut Classic', nameZh: '枕形切割经典戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 299, comparePrice: 1196, material: 'Platinum', isFeatured: false, images: ['/images/products/processed/rings-8-1.png', '/images/products/processed/rings-8-2.png', '/images/products/processed/rings-8-3.png'], specs: { carat: 1.8, clarity: 'VVS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-9', slug: 'emerald-cut-statement', nameEn: 'Emerald Cut Statement', nameZh: '祖母绿切割宣言戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 399, comparePrice: 1596, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/rings-9-1.png', '/images/products/processed/rings-9-2.png', '/images/products/processed/rings-9-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-10', slug: 'oval-solitaire', nameEn: 'Oval Solitaire', nameZh: '椭圆形独钻戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 599, comparePrice: 2396, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/rings-10-1.png', '/images/products/processed/rings-10-2.png', '/images/products/processed/rings-10-3.png'], specs: { carat: 1.2, clarity: 'VS1', color: 'E', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-11', slug: 'minimalist-band', nameEn: 'Minimalist Band', nameZh: '极简戒环', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 199, comparePrice: 796, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/rings-11-1.png', '/images/products/processed/rings-11-2.png', '/images/products/processed/rings-11-3.png'], specs: { carat: 0.5, clarity: 'VS2', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-12', slug: 'twisted-pav-', nameEn: 'Twisted Pavé', nameZh: '扭臂密钉戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 499, comparePrice: 1996, material: 'Platinum', isFeatured: false, images: ['/images/products/processed/rings-12-1.png', '/images/products/processed/rings-12-2.png', '/images/products/processed/rings-12-3.png'], specs: { carat: 1.8, clarity: 'VVS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-13', slug: 'pear-shape-halo', nameEn: 'Pear Shape Halo', nameZh: '梨形光环戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 599, comparePrice: 2396, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/rings-13-1.png', '/images/products/processed/rings-13-2.png', '/images/products/processed/rings-13-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'rings-14', slug: 'round-brilliant-classic', nameEn: 'Round Brilliant Classic', nameZh: '圆形明亮式经典戒指', descriptionEn: 'Exquisite lab-grown diamond ring featuring brilliant cut stones set in premium metal. Each piece is crafted to perfection.', descriptionZh: '精美培育钻石戒指，采用优质金属镶嵌璀璨切工宝石。每一件作品都精心打造至臻完美。', category: 'rings', basePrice: 399, comparePrice: 1596, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/rings-14-1.png', '/images/products/processed/rings-14-2.png', '/images/products/processed/rings-14-3.png'], specs: { carat: 1.2, clarity: 'VS1', color: 'E', cut: 'Excellent', sizes: ['4', '5', '6', '7', '8'] } },
  { id: 'necklaces-1', slug: 'floating-diamond-pendant', nameEn: 'Floating Diamond Pendant', nameZh: '悬浮钻石吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K Rose Gold', isFeatured: true, images: ['/images/products/processed/necklaces-1-1.png', '/images/products/processed/necklaces-1-2.png', '/images/products/processed/necklaces-1-3.png'], specs: { carat: 0.75, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-2', slug: 'tennis-necklace', nameEn: 'Tennis Necklace', nameZh: '网球项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 499, comparePrice: 1996, material: '18K White Gold', isFeatured: true, images: ['/images/products/processed/necklaces-2-1.png', '/images/products/processed/necklaces-2-2.png', '/images/products/processed/necklaces-2-3.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
  { id: 'necklaces-3', slug: 'heart-diamond-pendant', nameEn: 'Heart Diamond Pendant', nameZh: '心形钻石吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/necklaces-3-1.png', '/images/products/processed/necklaces-3-2.png', '/images/products/processed/necklaces-3-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-4', slug: 'elegant-drop-necklace', nameEn: 'Elegant Drop Necklace', nameZh: '优雅垂坠项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/necklaces-4-1.png', '/images/products/processed/necklaces-4-2.png', '/images/products/processed/necklaces-4-3.png'], specs: { carat: 0.75, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-5', slug: 'infinity-loop-pendant', nameEn: 'Infinity Loop Pendant', nameZh: '无限环吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 299, comparePrice: 1196, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/necklaces-5-1.png', '/images/products/processed/necklaces-5-2.png', '/images/products/processed/necklaces-5-3.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
  { id: 'necklaces-6', slug: 'cluster-diamond-necklace', nameEn: 'Cluster Diamond Necklace', nameZh: '群镶钻石项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/necklaces-6-1.png', '/images/products/processed/necklaces-6-2.png', '/images/products/processed/necklaces-6-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-7', slug: 'pearl-diamond-pendant', nameEn: 'Pearl & Diamond Pendant', nameZh: '珍珠钻石吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 299, comparePrice: 1196, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/necklaces-7-1.png', '/images/products/processed/necklaces-7-2.png', '/images/products/processed/necklaces-7-3.png'], specs: { carat: 0.75, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-8', slug: 'solitaire-station', nameEn: 'Solitaire Station', nameZh: '独钻驿站项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/necklaces-8-1.png', '/images/products/processed/necklaces-8-2.png', '/images/products/processed/necklaces-8-3.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
  { id: 'necklaces-9', slug: 'layered-chain-pendant', nameEn: 'Layered Chain Pendant', nameZh: '层叠链吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 199, comparePrice: 796, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/necklaces-9-1.png', '/images/products/processed/necklaces-9-2.png', '/images/products/processed/necklaces-9-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-10', slug: 'emerald-cut-pendant', nameEn: 'Emerald Cut Pendant', nameZh: '祖母绿切割吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 499, comparePrice: 1996, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/necklaces-10-1.png', '/images/products/processed/necklaces-10-2.png', '/images/products/processed/necklaces-10-3.png'], specs: { carat: 0.75, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-11', slug: 'butterfly-diamond-necklace', nameEn: 'Butterfly Diamond Necklace', nameZh: '蝴蝶钻石项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 299, comparePrice: 1196, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/necklaces-11-1.png', '/images/products/processed/necklaces-11-2.png', '/images/products/processed/necklaces-11-3.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
  { id: 'necklaces-12', slug: 'marquise-drop-necklace', nameEn: 'Marquise Drop Necklace', nameZh: '马眼垂坠项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/necklaces-12-1.png', '/images/products/processed/necklaces-12-2.png', '/images/products/processed/necklaces-12-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-13', slug: 'vintage-locket-pendant', nameEn: 'Vintage Locket Pendant', nameZh: '复古盒式吊坠', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 299, comparePrice: 1196, material: '18K Rose Gold', isFeatured: false, images: ['/images/products/processed/necklaces-13-1.png', '/images/products/processed/necklaces-13-2.png', '/images/products/processed/necklaces-13-3.png'], specs: { carat: 0.75, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'necklaces-14', slug: 'halo-pendant-necklace', nameEn: 'Halo Pendant Necklace', nameZh: '光环吊坠项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/necklaces-14-1.png', '/images/products/processed/necklaces-14-2.png', '/images/products/processed/necklaces-14-3.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
  { id: 'necklaces-15', slug: 'princess-cut-station', nameEn: 'Princess Cut Station', nameZh: '公主方驿站项链', descriptionEn: 'Stunning lab-grown diamond necklace that adds elegance to any outfit. Perfect for special occasions or everyday luxury.', descriptionZh: '惊艳的培育钻石项链，为任何装扮增添优雅。适合特殊场合或日常奢华。', category: 'necklaces', basePrice: 399, comparePrice: 1596, material: '18K Yellow Gold', isFeatured: false, images: ['/images/products/processed/necklaces-15-1.png', '/images/products/processed/necklaces-15-2.png', '/images/products/processed/necklaces-15-3.png'], specs: { carat: 1.0, clarity: 'VS1', color: 'D', cut: 'Excellent' } },
  { id: 'earrings-1', slug: 'classic-diamond-studs', nameEn: 'Classic Diamond Studs', nameZh: '经典钻石耳钉', descriptionEn: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.', descriptionZh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。', category: 'earrings', basePrice: 199, comparePrice: 796, material: '18K White Gold', isFeatured: true, images: ['/images/products/processed/earrings-1-1.png', '/images/products/processed/earrings-1-2.png', '/images/products/processed/earrings-1-3.png'], specs: { carat: 1.0, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'earrings-2', slug: 'elegant-drop-earrings', nameEn: 'Elegant Drop Earrings', nameZh: '优雅垂坠耳环', descriptionEn: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.', descriptionZh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。', category: 'earrings', basePrice: 299, comparePrice: 1196, material: '14K White Gold', isFeatured: true, images: ['/images/products/processed/earrings-2-1.png', '/images/products/processed/earrings-2-2.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
  { id: 'earrings-3', slug: 'diamond-hoop-earrings', nameEn: 'Diamond Hoop Earrings', nameZh: '钻石圈形耳环', descriptionEn: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.', descriptionZh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。', category: 'earrings', basePrice: 249, comparePrice: 996, material: '14K Yellow Gold', isFeatured: false, images: ['/images/products/processed/earrings-3-1.png', '/images/products/processed/earrings-3-2.png', '/images/products/processed/earrings-3-3.png'], specs: { carat: 0.75, clarity: 'VS2', color: 'F', cut: 'Very Good' } },
  { id: 'earrings-4', slug: 'halo-stud-earrings', nameEn: 'Halo Stud Earrings', nameZh: '光环耳钉', descriptionEn: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.', descriptionZh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。', category: 'earrings', basePrice: 199, comparePrice: 796, material: '18K White Gold', isFeatured: false, images: ['/images/products/processed/earrings-4-1.png', '/images/products/processed/earrings-4-2.png'], specs: { carat: 1.0, clarity: 'VVS1', color: 'D', cut: 'Excellent' } },
  { id: 'earrings-5', slug: 'chandelier-drops', nameEn: 'Chandelier Drops', nameZh: '枝形吊灯耳环', descriptionEn: 'Beautiful lab-grown diamond earrings that catch the light with every movement. Timeless elegance for the modern woman.', descriptionZh: '美丽的培育钻石耳环，随光影摇曳生姿。现代女性的永恒优雅。', category: 'earrings', basePrice: 399, comparePrice: 1596, material: '14K White Gold', isFeatured: false, images: ['/images/products/processed/earrings-5-1.png', '/images/products/processed/earrings-5-2.png', '/images/products/processed/earrings-5-3.png'], specs: { carat: 0.5, clarity: 'VS1', color: 'E', cut: 'Excellent' } },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.cartItem.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.coupon.deleteMany()
  console.log('✅ Cleared existing data')

  // Seed products
  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        id: p.id,
        slug: p.slug,
        nameEn: p.nameEn,
        nameZh: p.nameZh,
        descriptionEn: p.descriptionEn,
        descriptionZh: p.descriptionZh,
        category: p.category,
        basePrice: p.basePrice,
        comparePrice: p.comparePrice || null,
        material: p.material || null,
        isFeatured: p.isFeatured,
      },
    })

    // Create images
    for (let i = 0; i < p.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: p.images[i],
          alt: p.nameEn,
          sortOrder: i,
          isPrimary: i === 0,
        },
      })
    }

    // Create variants based on specs
    if (p.specs.sizes && p.specs.sizes.length > 0) {
      for (const size of p.specs.sizes) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            sku: `${p.id}-${size}`,
            name: `Size ${size}`,
            price: p.basePrice,
            stock: 10,
            carat: p.specs.carat || null,
            clarity: p.specs.clarity || null,
            color: p.specs.color || null,
            cut: p.specs.cut || null,
            size,
          },
        })
      }
    } else {
      // Single variant for non-ring products
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          sku: `${p.id}-default`,
          name: 'One Size',
          price: p.basePrice,
          stock: 10,
          carat: p.specs.carat || null,
          clarity: p.specs.clarity || null,
          color: p.specs.color || null,
          cut: p.specs.cut || null,
        },
      })
    }

    console.log(`  📦 Created product: ${p.nameEn}`)
  }

  // Create sample coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minOrderAmount: 100,
      isActive: true,
    },
  })

  await prisma.coupon.create({
    data: {
      code: 'SAVE50',
      type: 'fixed',
      value: 50,
      minOrderAmount: 200,
      isActive: true,
    },
  })

  console.log('✅ Created sample coupons')

  // --- Admin User ---
  const adminEmail = 'admin@twinturing.com'
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@2026!', 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Twinturing Admin',
        role: 'admin',
      },
    })
    console.log(`✅ Created admin user: ${adminEmail}`)
  } else {
    console.log(`⏭️  Admin user already exists: ${adminEmail}`)
  }

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
