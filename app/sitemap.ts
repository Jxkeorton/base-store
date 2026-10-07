import type { MetadataRoute } from 'next'
import { getProductSlugs } from '@/lib/sanity/queries'

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://www.traversebase.co.uk'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProductSlugs()
  const pages = ['', '/canopies', '/used-gear', '/about', '/contact']

  return [
    ...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: 'weekly' as const })),
    ...slugs.map((slug) => ({ url: `${base}/product/${slug}`, changeFrequency: 'weekly' as const })),
  ]
}
