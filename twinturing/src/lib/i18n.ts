export const locales = ['en', 'zh'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Collections',
    'nav.rings': 'Rings',
    'nav.necklaces': 'Necklaces',
    'nav.earrings': 'Earrings',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Journal',
    'nav.faq': 'FAQ',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.logout': 'Logout',

    // Hero
    'hero.title': 'Same Sparkle, Smarter Choice',
    'hero.subtitle': 'Lab-grown diamond jewelry that shines just as bright — at a fraction of the price.',
    'hero.cta': 'Explore Collections',
    'hero.cta.secondary': 'Our Story',

    // Products
    'products.title': 'Our Collections',
    'products.subtitle': 'Each piece crafted with precision, designed to last forever.',
    'products.filter.all': 'All',
    'products.filter.rings': 'Rings',
    'products.filter.necklaces': 'Necklaces',
    'products.filter.earrings': 'Earrings',
    'products.price': 'Price',
    'products.view': 'View Details',
    'products.from': 'From',

    // Product Detail
    'product.addToCart': 'Add to Cart',
    'product.selectSize': 'Select Size',
    'product.description': 'Description',
    'product.specifications': 'Specifications',
    'product.certification': 'Certification',
    'product.shipping': 'Shipping & Returns',

    // About
    'about.title': 'The Twinturing Story',
    'about.subtitle': 'Where technology meets timeless elegance.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'We believe everyone deserves to experience the brilliance of diamonds without compromise — on price, ethics, or quality.',
    'about.values.title': 'Our Values',
    'about.values.sustainability': 'Sustainability',
    'about.values.transparency': 'Transparency',
    'about.values.innovation': 'Innovation',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'d love to hear from you.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about lab-grown diamonds.',

    // Footer
    'footer.tagline': 'Same Sparkle, Smarter Choice',
    'footer.copyright': '© 2026 Twinturing. All rights reserved.',
    'footer.shop': 'Shop',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.newsletter': 'Subscribe to our newsletter',
    'footer.email.placeholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.empty.subtitle': 'Looks like you haven\'t added any items yet. Start exploring our collections!',
    'cart.shopNow': 'Shop Now',
    'cart.product': 'Product',
    'cart.price': 'Price',
    'cart.quantity': 'Quantity',
    'cart.subtotal': 'Subtotal',
    'cart.remove': 'Remove',
    'cart.coupon': 'Coupon Code',
    'cart.coupon.placeholder': 'Enter coupon code',
    'cart.coupon.apply': 'Apply',
    'cart.coupon.applied': 'Coupon applied!',
    'cart.coupon.invalid': 'Invalid coupon code',
    'cart.summary': 'Order Summary',
    'cart.discount': 'Discount',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.continueShopping': 'Continue Shopping',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shipping': 'Shipping Address',
    'checkout.shipping.select': 'Select a saved address',
    'checkout.shipping.new': 'Or enter a new address',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.address1': 'Address Line 1',
    'checkout.address2': 'Address Line 2 (Optional)',
    'checkout.city': 'City',
    'checkout.state': 'State / Province',
    'checkout.postalCode': 'Postal Code',
    'checkout.country': 'Country',
    'checkout.phone': 'Phone (Optional)',
    'checkout.orderSummary': 'Order Summary',
    'checkout.payment': 'Payment',
    'checkout.payment.placeholder': 'Payment functionality is under development. You can place the order directly.',
    'checkout.placeOrder': 'Place Order',
    'checkout.ordering': 'Placing Order...',

    // Order Confirmation
    'orderConfirmation.title': 'Order Confirmed!',
    'orderConfirmation.thankYou': 'Thank you for your order',
    'orderConfirmation.orderNumber': 'Order Number',
    'orderConfirmation.items': 'Items Ordered',
    'orderConfirmation.estimatedDelivery': 'Estimated Delivery',
    'orderConfirmation.deliveryDate': '7-14 business days',
    'orderConfirmation.continueShopping': 'Continue Shopping',
    'orderConfirmation.viewOrders': 'View My Orders',
    'orderConfirmation.notFound': 'Order not found.',

    // Account
    'account.title': 'My Account',
    'account.welcome': 'Welcome back',
    'account.orders': 'My Orders',
    'account.orders.empty': 'No orders yet',
    'account.orders.viewAll': 'View All Orders',
    'account.addresses': 'My Addresses',
    'account.addresses.empty': 'No saved addresses',
    'account.addresses.add': 'Add Address',
    'account.addresses.edit': 'Edit Address',
    'account.addresses.delete': 'Delete',
    'account.addresses.default': 'Default',
    'account.addresses.setDefault': 'Set as Default',
    'account.wishlist': 'My Wishlist',
    'account.wishlist.empty': 'Your wishlist is empty',
    'account.wishlist.remove': 'Remove',
    'account.orderNumber': 'Order #',
    'account.orderDate': 'Date',
    'account.orderStatus': 'Status',
    'account.orderTotal': 'Total',
    'account.viewDetails': 'View Details',
    'account.signIn': 'Sign In',
    'account.signInRequired': 'Please sign in to access your account.',
    'account.profile': 'Profile',
    'account.email': 'Email',

    // Order Status
    'status.pending': 'Pending',
    'status.processing': 'Processing',
    'status.shipped': 'Shipped',
    'status.delivered': 'Delivered',
    'status.cancelled': 'Cancelled',

    // Order Detail
    'orderDetail.title': 'Order Detail',
    'orderDetail.backToOrders': 'Back to Orders',
    'orderDetail.orderInfo': 'Order Information',
    'orderDetail.shippingAddress': 'Shipping Address',
    'orderDetail.items': 'Order Items',
    'orderDetail.priceSummary': 'Price Summary',
    'orderDetail.subtotal': 'Subtotal',
    'orderDetail.shipping': 'Shipping',
    'orderDetail.discount': 'Discount',
    'orderDetail.total': 'Total',
    'orderDetail.free': 'Free',

    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.close': 'Close',
    'common.back': 'Back',

    // Login
    'login.title': 'Sign In',
    'login.subtitle': 'Welcome back to Twinturing',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign In',
    'login.signingIn': 'Signing In...',
    'login.error': 'Invalid email or password',
    'login.noAccount': "Don't have an account?",
    'login.register': 'Create one',

    // Register
    'register.title': 'Create Account',
    'register.subtitle': 'Join Twinturing for exclusive offers',
    'register.name': 'Full Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.submit': 'Create Account',
    'register.creating': 'Creating Account...',
    'register.error.emailExists': 'This email is already registered',
    'register.error.passwordMismatch': 'Passwords do not match',
    'register.error.passwordWeak': 'Password must be at least 8 characters with uppercase, lowercase, and a number',
    'register.hasAccount': 'Already have an account?',
    'register.signIn': 'Sign in',

    // Search
    'search.title': 'Search Results',
    'search.placeholder': 'Search products...',
    'search.noResults': 'No products found for',
    'search.resultsFor': 'Results for',
    'search.products': 'products found',

    // Contact
    'contact.success': 'Your message has been sent successfully!',

    // Products Sort & Pagination
    'products.sortBy': 'Sort by',
    'products.sort.newest': 'Newest',
    'products.sort.priceAsc': 'Price: Low to High',
    'products.sort.priceDesc': 'Price: High to Low',
    'products.pagination.prev': 'Previous',
    'products.pagination.next': 'Next',
    'products.pagination.page': 'Page',

    // 404
    'notFound.title': 'Page Not Found',
    'notFound.message': 'The page you are looking for does not exist.',
    'notFound.backHome': 'Back to Home',

    // Wishlist
    'wishlist.added': 'Added to wishlist!',
    'cart.added': 'Added to cart!',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.products': '全部系列',
    'nav.rings': '戒指',
    'nav.necklaces': '项链',
    'nav.earrings': '耳环',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.blog': '资讯',
    'nav.faq': '常见问题',
    'nav.cart': '购物车',
    'nav.account': '账户',
    'nav.logout': '退出登录',

    // Hero
    'hero.title': '同样的闪耀，更智慧的选择',
    'hero.subtitle': '实验室培育钻石珠宝，同样的璀璨，更优的价格。',
    'hero.cta': '探索系列',
    'hero.cta.secondary': '了解我们',

    // Products
    'products.title': '精选系列',
    'products.subtitle': '每一件作品都经过精心打造，只为永恒闪耀。',
    'products.filter.all': '全部',
    'products.filter.rings': '戒指',
    'products.filter.necklaces': '项链',
    'products.filter.earrings': '耳环',
    'products.price': '价格',
    'products.view': '查看详情',
    'products.from': '起',

    // Product Detail
    'product.addToCart': '加入购物车',
    'product.selectSize': '选择尺寸',
    'product.description': '产品描述',
    'product.specifications': '产品参数',
    'product.certification': '认证证书',
    'product.shipping': '配送与退换',

    // About
    'about.title': '双生图灵的故事',
    'about.subtitle': '当科技遇见永恒优雅。',
    'about.mission.title': '我们的使命',
    'about.mission.text': '我们相信每个人都值得拥有钻石的璀璨，无需在价格、伦理或品质上妥协。',
    'about.values.title': '我们的价值观',
    'about.values.sustainability': '可持续发展',
    'about.values.transparency': '透明公开',
    'about.values.innovation': '创新科技',

    // Contact
    'contact.title': '联系我们',
    'contact.subtitle': '我们期待听到您的声音。',
    'contact.form.name': '姓名',
    'contact.form.email': '邮箱',
    'contact.form.message': '留言',
    'contact.form.submit': '发送',

    // FAQ
    'faq.title': '常见问题',
    'faq.subtitle': '关于实验室培育钻石，您需要知道的一切。',

    // Footer
    'footer.tagline': '同样的闪耀，更智慧的选择',
    'footer.copyright': '© 2026 Twinturing 双生图灵 版权所有',
    'footer.shop': '选购',
    'footer.company': '公司',
    'footer.support': '支持',
    'footer.newsletter': '订阅我们的资讯',
    'footer.email.placeholder': '输入您的邮箱',
    'footer.subscribe': '订阅',

    // Cart
    'cart.title': '购物车',
    'cart.empty': '购物车是空的',
    'cart.empty.subtitle': '您还没有添加任何商品。快去探索我们的系列吧！',
    'cart.shopNow': '去购物',
    'cart.product': '商品',
    'cart.price': '单价',
    'cart.quantity': '数量',
    'cart.subtotal': '小计',
    'cart.remove': '移除',
    'cart.coupon': '优惠码',
    'cart.coupon.placeholder': '输入优惠码',
    'cart.coupon.apply': '使用',
    'cart.coupon.applied': '优惠码已使用！',
    'cart.coupon.invalid': '无效的优惠码',
    'cart.summary': '订单摘要',
    'cart.discount': '优惠',
    'cart.total': '合计',
    'cart.checkout': '去结算',
    'cart.continueShopping': '继续购物',

    // Checkout
    'checkout.title': '结算',
    'checkout.shipping': '收货地址',
    'checkout.shipping.select': '选择已保存的地址',
    'checkout.shipping.new': '或填写新地址',
    'checkout.firstName': '名',
    'checkout.lastName': '姓',
    'checkout.address1': '详细地址',
    'checkout.address2': '补充地址（选填）',
    'checkout.city': '城市',
    'checkout.state': '省/州',
    'checkout.postalCode': '邮编',
    'checkout.country': '国家',
    'checkout.phone': '电话（选填）',
    'checkout.orderSummary': '订单摘要',
    'checkout.payment': '支付方式',
    'checkout.payment.placeholder': '支付功能开发中，您可以直接下单。',
    'checkout.placeOrder': '提交订单',
    'checkout.ordering': '提交中...',

    // Order Confirmation
    'orderConfirmation.title': '下单成功！',
    'orderConfirmation.thankYou': '感谢您的订购',
    'orderConfirmation.orderNumber': '订单号',
    'orderConfirmation.items': '已购商品',
    'orderConfirmation.estimatedDelivery': '预计送达',
    'orderConfirmation.deliveryDate': '7-14 个工作日',
    'orderConfirmation.continueShopping': '继续购物',
    'orderConfirmation.viewOrders': '查看我的订单',
    'orderConfirmation.notFound': '订单未找到。',

    // Account
    'account.title': '我的账户',
    'account.welcome': '欢迎回来',
    'account.orders': '我的订单',
    'account.orders.empty': '暂无订单',
    'account.orders.viewAll': '查看全部订单',
    'account.addresses': '收货地址',
    'account.addresses.empty': '暂无保存的地址',
    'account.addresses.add': '新增地址',
    'account.addresses.edit': '编辑地址',
    'account.addresses.delete': '删除',
    'account.addresses.default': '默认',
    'account.addresses.setDefault': '设为默认',
    'account.wishlist': '我的心愿单',
    'account.wishlist.empty': '心愿单是空的',
    'account.wishlist.remove': '移除',
    'account.orderNumber': '订单号',
    'account.orderDate': '日期',
    'account.orderStatus': '状态',
    'account.orderTotal': '合计',
    'account.viewDetails': '查看详情',
    'account.signIn': '登录',
    'account.signInRequired': '请登录以访问您的账户。',
    'account.profile': '个人信息',
    'account.email': '邮箱',

    // Order Status
    'status.pending': '待处理',
    'status.processing': '处理中',
    'status.shipped': '已发货',
    'status.delivered': '已送达',
    'status.cancelled': '已取消',

    // Order Detail
    'orderDetail.title': '订单详情',
    'orderDetail.backToOrders': '返回订单列表',
    'orderDetail.orderInfo': '订单信息',
    'orderDetail.shippingAddress': '收货地址',
    'orderDetail.items': '商品列表',
    'orderDetail.priceSummary': '价格明细',
    'orderDetail.subtotal': '小计',
    'orderDetail.shipping': '运费',
    'orderDetail.discount': '优惠',
    'orderDetail.total': '合计',
    'orderDetail.free': '免费',

    // Common
    'common.learnMore': '了解更多',
    'common.viewAll': '查看全部',
    'common.loading': '加载中...',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.add': '新增',
    'common.close': '关闭',
    'common.back': '返回',

    // Login
    'login.title': '登录',
    'login.subtitle': '欢迎回到双生图灵',
    'login.email': '邮箱',
    'login.password': '密码',
    'login.submit': '登录',
    'login.signingIn': '登录中...',
    'login.error': '邮箱或密码错误',
    'login.noAccount': '还没有账号？',
    'login.register': '立即注册',

    // Register
    'register.title': '注册',
    'register.subtitle': '加入双生图灵，享受专属优惠',
    'register.name': '姓名',
    'register.email': '邮箱',
    'register.password': '密码',
    'register.confirmPassword': '确认密码',
    'register.submit': '注册',
    'register.creating': '注册中...',
    'register.error.emailExists': '该邮箱已注册',
    'register.error.passwordMismatch': '两次密码不一致',
    'register.error.passwordWeak': '密码至少8位，需包含大写字母、小写字母和数字',
    'register.hasAccount': '已有账号？',
    'register.signIn': '去登录',

    // Search
    'search.title': '搜索结果',
    'search.placeholder': '搜索产品...',
    'search.noResults': '未找到相关产品',
    'search.resultsFor': '搜索结果',
    'search.products': '个产品',

    // Contact
    'contact.success': '您的消息已成功发送！',

    // Products Sort & Pagination
    'products.sortBy': '排序',
    'products.sort.newest': '最新',
    'products.sort.priceAsc': '价格：低到高',
    'products.sort.priceDesc': '价格：高到低',
    'products.pagination.prev': '上一页',
    'products.pagination.next': '下一页',
    'products.pagination.page': '第',

    // 404
    'notFound.title': '页面未找到',
    'notFound.message': '您访问的页面不存在。',
    'notFound.backHome': '返回首页',

    // Wishlist
    'wishlist.added': '已加入心愿单！',
    'cart.added': '已添加到购物车！',
  }
}

export function t(key: string, locale: Locale = defaultLocale): string {
  return translations[locale][key] || translations[defaultLocale][key] || key
}
