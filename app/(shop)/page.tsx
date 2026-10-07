import { Product, HeroBanner } from '@/components'
import { getHeroBanner, getProducts } from '@/lib/sanity/queries'

export default async function Home() {
  const [products, banner] = await Promise.all([getProducts(), getHeroBanner()])

  return (
    <div>
      {banner && <HeroBanner firstBanner={banner} />}

      <div className='products-heading'>
        <h2>Products</h2>
        <p>BASE equipment</p>
      </div>

      <div className='products-container'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
