import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import type { Product as ProductType } from '@/lib/types'
import { urlFor } from '@/lib/sanity/image'

interface Props {
  product: ProductType
}

const Product: React.FC<Props> = ({ product: {image, name, slug, price, soldOut} }) => {

  return (
    <div className='product-card' >
      <Link href={`/product/${slug.current}`} scroll={true}>
        {image?.[0] && (
            <>
              <Image
                src={urlFor(image[0]).width(500).url()}
                width={250}
                height={250}
                className="product-image"
                alt={name}
              />
              {soldOut && <div className="soldOutLabel">Sold Out</div>}
            </>
          )}
          <p className='product-name'>{name}</p>
          <p className='product-price' >£{price}</p>
      </Link>
    </div>
  )
}

export default Product
