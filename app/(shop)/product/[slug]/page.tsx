import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import ProductDetails from '@/components/ProductDetails'
import SectionHeading from '@/components/SectionHeading'
import { clean } from '@/lib/format'
import { getProduct, getProductSlugs, getRelatedProducts } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}

  return {
    title: clean(product.name),
    description: clean(product.details),
    openGraph: {
      title: clean(product.name),
      description: clean(product.details),
      images: product.image?.[0] ? [urlFor(product.image[0]).width(1200).url()] : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const related = (await getRelatedProducts(product._id)).slice(0, 4)

  return (
    <Container className="py-8 md:py-12">
      <Link
        href="/#gear"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-brand-600"
      >
        <ArrowLeft className="size-4" />
        All gear
      </Link>

      <ProductDetails product={product} />

      {related.length > 0 && (
        <section className="mt-20 border-t border-border pt-12 md:mt-28">
          <SectionHeading eyebrow="Keep looking" title="More gear" className="mb-8" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {related.map((item) => (
              <li key={item._id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  )
}
