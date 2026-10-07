import type { Metadata } from 'next'
import Link from 'next/link'
import CollectionPage from '@/components/CollectionPage'
import { getProducts } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Used gear',
  description: 'Used BASE gear for UK jumpers. Contact us about selling yours.',
}

const link = 'font-semibold text-brand-600 underline underline-offset-4'

export default async function UsedGear() {
  const products = await getProducts('used gear')

  return (
    <CollectionPage
      title="Used gear"
      products={products}
      intro={
        <>
          <Link href="/contact" className={link}>Contact us</Link> about selling your used gear.
        </>
      }
      emptyMessage={
        <>
          No used gear is listed right now. Got kit to sell?{' '}
          <Link href="/contact" className={link}>Get in touch</Link>.
        </>
      }
    />
  )
}
