import { client, freshClient } from './client'
import type { Banner, Product } from '@/lib/types'

const REVALIDATE_SECONDS = 60

const productFields = `_id, name, slug, price, details, soldOut, category, image`

const fetchOptions = (tags: string[]) => ({ next: { revalidate: REVALIDATE_SECONDS, tags } })

export function getProducts(category?: string) {
  return client.fetch<Product[]>(
    `*[_type == "product" && (!defined($category) || category == $category)]{${productFields}}`,
    { category: category ?? null },
    fetchOptions(['products']),
  )
}

export function getProductSlugs() {
  return client.fetch<string[]>(
    `*[_type == "product" && defined(slug.current)].slug.current`,
    {},
    fetchOptions(['products']),
  )
}

export function getProduct(slug: string) {
  return client.fetch<Product | null>(
    `*[_type == "product" && slug.current == $slug][0]{${productFields}}`,
    { slug },
    fetchOptions(['products']),
  )
}

export function getRelatedProducts(excludeId: string) {
  return client.fetch<Product[]>(
    `*[_type == "product" && _id != $excludeId]{${productFields}}`,
    { excludeId },
    fetchOptions(['products']),
  )
}

export function getHeroBanner() {
  return client.fetch<Banner | null>(
    `*[_type == "banner"][0]`,
    {},
    fetchOptions(['banner']),
  )
}

/** Uncached lookup used by checkout: prices must come from Sanity, never the browser. */
export function getProductsForCheckout(ids: string[]) {
  return freshClient.fetch<Pick<Product, '_id' | 'name' | 'price' | 'soldOut' | 'image'>[]>(
    `*[_type == "product" && _id in $ids]{_id, name, price, soldOut, image}`,
    { ids },
    { cache: 'no-store' },
  )
}
