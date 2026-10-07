'use client'
import { useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { toast } from 'sonner'
import { urlFor } from '@/lib/sanity/image'
import { useCartStore } from '@/lib/cart-store'
import { MAX_QUANTITY } from '@/lib/constants'
import type { Product } from '@/lib/types'

export default function ProductDetails({ product }: { product: Product }) {
  const [index, setIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const add = useCartStore((s) => s.add)
  const setOpen = useCartStore((s) => s.setOpen)

  const addToCart = () => {
    add(product, qty)
    toast.success(`${qty} ${product.name} added to the cart`)
  }

  const buyNow = () => {
    add(product, qty)
    setOpen(true)
  }

  return (
    <div className='product-detail-container'>
      <div>
        <div className='image-container'>
          {product.image?.[index] && (
            <Image
              src={urlFor(product.image[index]).width(800).url()}
              alt={product.name}
              width={400}
              height={400}
              priority
              className='product-detail-image'
            />
          )}
        </div>
        <div className='small-images-container'>
          {product.image?.map((item, i) => (
            <Image
              key={i}
              src={urlFor(item).width(140).url()}
              alt={`${product.name} view ${i + 1}`}
              width={70}
              height={70}
              className={i === index ? 'small-image selected-image' : 'small-image'}
              onMouseEnter={() => setIndex(i)}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className='product-detail-desc'>
        <h2>{product.name}</h2>
        <h4>Details: </h4>
        <p>{product.details}</p>
        <p className='price'>£{product.price}</p>

        {!product.soldOut ? (
          <div>
            <div className='quantity'>
              <h3>Quantity: </h3>
              <p className='quantity-desc'>
                <span className='minus' onClick={() => setQty((q) => Math.max(1, q - 1))}><AiOutlineMinus /></span>
                <span className='num'>{qty}</span>
                <span className='plus' onClick={() => setQty((q) => Math.min(MAX_QUANTITY, q + 1))}><AiOutlinePlus /></span>
              </p>
            </div>
            <div className='buttons'>
              <button type='button' className='add-to-cart' onClick={addToCart}>Add To Cart</button>
              <button type='button' className='buy-now' onClick={buyNow}>Buy Now</button>
            </div>
          </div>
        ) : (
          <div className='buttons'>
            <h3>Sold Out</h3>
          </div>
        )}
      </div>
    </div>
  )
}
