import type { Metadata } from 'next'
import Link from 'next/link'
import CollectionPage from '@/components/CollectionPage'
import { getProducts } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Canopies',
  description: 'BASE canopies for UK jumpers. Contact us to talk through your options.',
}

const link = 'font-semibold text-brand-600 underline underline-offset-4'

export default async function Canopies() {
  const products = await getProducts('canopies')

  return (
    <CollectionPage
      title="Canopies"
      products={products}
      intro={
        <>
          <Link href="/contact" className={link}>Contact us</Link> about selecting your canopy options.
        </>
      }
      emptyMessage="No canopies are listed right now."
    />
  )
}
