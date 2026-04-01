import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scdc.cloud';
  const now = new Date();

  return [
    // 首页
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    // 核心业务
    { url: `${baseUrl}/core-tech`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/energy-solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ai-computing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ai-models`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/digital-assets`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // 解决方案
    { url: `${baseUrl}/solutions/zero-carbon-park`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // 产品
    { url: `${baseUrl}/products/heat-management`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/products/heat-management/cvd`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/products/heat-management/sink`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/products/heat-management/composite`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // 其他
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/diagnosis`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
