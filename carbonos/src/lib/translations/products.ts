/**
 * Product page translations — zh / en content for i18n preparation.
 * Not imported by any page yet. Will be wired up when i18n routing is ready.
 */

export const productTranslations = {
  zh: {
    heatManagement: {
      hero: {
        badge: "CVD 人造金刚石 · 极致热管理",
        title: "金刚石散热 · 为高功率器件而生",
        subtitle: "CVD金刚石热导率高达2200 W/mK，是铜的5倍。半导体、激光、射频器件的终极散热方案。",
        ctaPrimary: "获取定制方案",
        ctaSecondary: "查看技术参数",
      },
      advantages: {
        title: "核心优势",
        items: [
          { title: "极致导热", desc: "热导率 2000+ W/mK", sub: "铜的5倍" },
          { title: "电绝缘", desc: "电阻率 >10¹⁴ Ω·cm", sub: "无需额外绝缘层" },
          { title: "低热膨胀", desc: "CTE 1.0 ppm/K", sub: "完美匹配GaN/SiC" },
          { title: "轻量化", desc: "密度仅 3.52 g/cm³", sub: "比铜轻60%" },
        ],
      },
      products: {
        title: "产品矩阵",
        items: [
          {
            title: "CVD金刚石散热片",
            desc: "高端激光/射频器件首选。热导率1000-2200 W/mK，可定制尺寸与金属化。",
            href: "/products/heat-management/cvd",
          },
          {
            title: "金刚石热沉",
            desc: "半导体封装标准方案。整体式/夹层式结构，多种安装方式。",
            href: "/products/heat-management/sink",
          },
          {
            title: "铜-金刚石复合材料",
            desc: "性价比之选。可定制CTE，兼顾导热与加工性。",
            href: "/products/heat-management/composite",
          },
        ],
      },
      scenes: {
        title: "应用场景",
        items: [
          { title: "半导体封装", desc: "GaN / SiC / GaAs" },
          { title: "高功率激光二极管", desc: "医疗、工业、国防" },
          { title: "射频功率放大器", desc: "通信基站、雷达" },
          { title: "AI芯片 / GPU散热", desc: "数据中心、边缘计算" },
          { title: "5G基站功放模块", desc: "大规模MIMO天线" },
          { title: "航天电子器件", desc: "卫星、深空探测" },
        ],
      },
      comparison: {
        title: "材料性能对比",
        headers: ["参数", "铜", "铝", "金刚石"],
        rows: [
          { param: "热导率 W/mK", values: ["400", "237", "2000+"] },
          { param: "电阻率 Ω·cm", values: ["1.7×10⁻⁸", "2.8×10⁻⁸", ">10¹⁴"] },
          { param: "CTE ppm/K", values: ["16.5", "23.1", "1.0"] },
          { param: "密度 g/cm³", values: ["8.96", "2.70", "3.52"] },
        ],
      },
      whyUs: {
        title: "为什么选择我们",
        items: [
          { title: "多家供应商资源整合", desc: "全球优质CVD金刚石制造商直供" },
          { title: "定制化尺寸与规格", desc: "按需切割、研磨、金属化" },
          { title: "快速响应与技术支持", desc: "专业团队7×24小时服务" },
          { title: "批量采购价格优势", desc: "规模化采购，成本更优" },
        ],
      },
      inquiry: {
        title: "询价 / 技术咨询",
        subtitle: "填写以下表单，我们将尽快回复您",
        fields: {
          name: "姓名",
          company: "公司",
          email: "邮箱",
          phone: "电话",
          product: "感兴趣的产品",
          dimensions: "尺寸需求",
          quantity: "数量",
          message: "详细需求",
        },
        submit: "发送询价",
        products: ["CVD金刚石散热片", "金刚石热沉", "铜-金刚石复合材料", "其他"],
      },
      cta: {
        title: "需要散热方案？联系我们",
        subtitle: "专业团队为您提供定制化金刚石散热解决方案",
        email: "邮箱",
        phone: "电话",
        wechat: "微信",
      },
    },
  },

  en: {
    heatManagement: {
      hero: {
        badge: "CVD Synthetic Diamond · Ultimate Thermal Management",
        title: "Diamond Thermal Management · Built for High-Power Devices",
        subtitle:
          "CVD diamond thermal conductivity up to 2200 W/mK — 5× that of copper. The ultimate heat-dissipation solution for semiconductors, lasers, and RF devices.",
        ctaPrimary: "Get a Custom Solution",
        ctaSecondary: "View Specs",
      },
      advantages: {
        title: "Core Advantages",
        items: [
          { title: "Extreme Conductivity", desc: "2000+ W/mK", sub: "5× copper" },
          { title: "Electrically Insulating", desc: "Resistivity >10¹⁴ Ω·cm", sub: "No extra insulation layer" },
          { title: "Low CTE", desc: "1.0 ppm/K", sub: "Perfect GaN/SiC match" },
          { title: "Lightweight", desc: "Density 3.52 g/cm³", sub: "60% lighter than copper" },
        ],
      },
      products: {
        title: "Product Lineup",
        items: [
          {
            title: "CVD Diamond Heat Spreaders",
            desc: "Top choice for high-power laser/RF devices. 1000–2200 W/mK, customizable size & metallization.",
            href: "/products/heat-management/cvd",
          },
          {
            title: "Diamond Heat Sinks",
            desc: "Standard semiconductor packaging solution. Monolithic / sandwich structures, various mounting options.",
            href: "/products/heat-management/sink",
          },
          {
            title: "Cu-Diamond Composites",
            desc: "Cost-effective option. Tailorable CTE, balancing thermal conductivity and machinability.",
            href: "/products/heat-management/composite",
          },
        ],
      },
      scenes: {
        title: "Applications",
        items: [
          { title: "Semiconductor Packaging", desc: "GaN / SiC / GaAs" },
          { title: "High-Power Laser Diodes", desc: "Medical, industrial, defense" },
          { title: "RF Power Amplifiers", desc: "Telecom base stations, radar" },
          { title: "AI Chip / GPU Cooling", desc: "Data centers, edge computing" },
          { title: "5G Base-Station PA Modules", desc: "Massive MIMO antennas" },
          { title: "Space Electronics", desc: "Satellites, deep-space probes" },
        ],
      },
      comparison: {
        title: "Material Performance Comparison",
        headers: ["Parameter", "Copper", "Aluminum", "Diamond"],
        rows: [
          { param: "Thermal Conductivity (W/mK)", values: ["400", "237", "2000+"] },
          { param: "Resistivity (Ω·cm)", values: ["1.7×10⁻⁸", "2.8×10⁻⁸", ">10¹⁴"] },
          { param: "CTE (ppm/K)", values: ["16.5", "23.1", "1.0"] },
          { param: "Density (g/cm³)", values: ["8.96", "2.70", "3.52"] },
        ],
      },
      whyUs: {
        title: "Why Choose Us",
        items: [
          { title: "Multi-Supplier Integration", desc: "Direct from top global CVD diamond manufacturers" },
          { title: "Custom Sizes & Specs", desc: "Cutting, grinding & metallization on demand" },
          { title: "Fast Response & Tech Support", desc: "Professional team, 7×24 service" },
          { title: "Volume Pricing Advantage", desc: "Large-scale procurement for better cost" },
        ],
      },
      inquiry: {
        title: "Inquiry / Technical Consultation",
        subtitle: "Fill out the form below and we will get back to you shortly.",
        fields: {
          name: "Name",
          company: "Company",
          email: "Email",
          phone: "Phone",
          product: "Product of Interest",
          dimensions: "Dimensions",
          quantity: "Quantity",
          message: "Detailed Requirements",
        },
        submit: "Send Inquiry",
        products: [
          "CVD Diamond Heat Spreader",
          "Diamond Heat Sink",
          "Cu-Diamond Composite",
          "Other",
        ],
      },
      cta: {
        title: "Need a Thermal Solution? Contact Us",
        subtitle: "Our team provides custom diamond thermal-management solutions.",
        email: "Email",
        phone: "Phone",
        wechat: "WeChat",
      },
    },
  },
} as const;

/** Convenience type helpers for future i18n hook */
export type ProductLocale = keyof typeof productTranslations;
export type ProductSection = keyof (typeof productTranslations)["zh"]["heatManagement"];
