import type { Metadata } from 'next'
import Link from 'next/link'
import Product from '@/components/Product'
import { getProducts } from '@/lib/sanity/queries'

export const metadata: Metadata = { title: 'Canopies' }

export default async function Canopies() {
  const products = await getProducts('canopies')

  return (
    <>
      <div className='products-heading'>
        <h2>Canopies</h2>
        <p><Link href='/contact' className='used-gear-link'>Contact us</Link> about selecting your canopy options</p>
      </div>

      <div className='products-container'>
        {products.length > 0 ? (
          products.map((product) => <Product key={product._id} product={product} />)
        ) : (
          <p className='no-used-gear'>No canopies available at this time.</p>
        )}
      </div>
    </>
  )
}
