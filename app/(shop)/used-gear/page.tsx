import type { Metadata } from 'next'
import Link from 'next/link'
import { Product } from '@/components'
import { getProducts } from '@/lib/sanity/queries'

export const metadata: Metadata = { title: 'Used Gear' }

export default async function UsedGear() {
  const products = await getProducts('used gear')

  return (
    <>
      <div className='products-heading'>
        <h2>Used Gear</h2>
        <p><Link href='/contact' className='used-gear-link'>Contact us</Link> about selling your used gear</p>
      </div>

      <div className='products-container'>
        {products.length > 0 ? (
          products.map((product) => <Product key={product._id} product={product} />)
        ) : (
          <p className='no-used-gear'>No used gear available at this time.</p>
        )}
      </div>
    </>
  )
}
