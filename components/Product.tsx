import React from 'react'
import Link from 'next/link';
import { ProductData } from '@/app/page';

import { urlFor } from '../lib/client'

interface Product {
  product: ProductData
}

const Product: React.FC<Product> = ({ product: {image, name, slug, price, soldOut} }) => {

  return (
    <div>
      
      <Link href={`/product/${slug.current}`} scroll={true}>
        <div className='product-card' >
        {image && (
            <>
              <img
                src={urlFor(image[0])}
                width={250}
                height={250}
                className="productImage"
              />
              {soldOut && <div className="soldOutLabel">Sold Out</div>}
            </>
          )}

          <p className='product-name'>{name}</p>
          <p className='product-price' >£{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
