import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Product from '@/components/Product'
import ProductDetails from '@/components/ProductDetails'
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
    title: product.name,
    description: product.details,
    openGraph: {
      title: product.name,
      description: product.details,
      images: product.image?.[0] ? [urlFor(product.image[0]).width(1200).url()] : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product._id)

  return (
    <div>
      <ProductDetails product={product} />
      <div className='maylike-products-wrapper'>
        <h2>You May Also Like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {related.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
