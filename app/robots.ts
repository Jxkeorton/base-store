import type { MetadataRoute } from 'next'

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://www.traversebase.co.uk'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/', '/success'] },
    sitemap: `${base}/sitemap.xml`,
  }
}
