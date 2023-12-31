'use client'
import React, {useEffect, useState} from 'react'
import { client, urlFor } from '../../../lib/client'
import { ProductData } from '@/app/page';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import Product from '../../../components/Product'

import { useStateContext } from '../../../context/StateContext'


const ProductDetails = ({ params }: { params: { slug: string } }) => {
    const [product, setProduct] = useState<ProductData | null>(null);
    const [similarProducts, setSimilarProducts] = useState<ProductData[]>([])
    const [index, setIndex] = useState<number>(0);

    const context = useStateContext();

    if (!context) {
      // Handle the case when context is null
      return <div>Loading...</div>;
    }

    // Now TypeScript knows that the context is not null
    const { qty, incQty, decQty, onAdd, setShowCart } = context;

    useEffect(() => {
      window.scrollTo(0, 0);

        async function fetchData() {
            try {
              // Fetch the specific product using the slug
              const query = `*[_type == "product" && slug.current == $slug][0]`;
              const productsQuery = '*[_type == "product"]'
              const productsData = await client.fetch(query, { slug: params.slug });
              const similarProductsData = await client.fetch(productsQuery)
      
              if (productsData) {
                setProduct(productsData);
                setSimilarProducts(similarProductsData)
                console.log(similarProductsData)
              } else {
                // If the product with the specified slug is not found, set product state to null or handle the situation accordingly.
                setProduct(null);
                setSimilarProducts([])
                console.warn('Product not found for slug:', params.slug);
              }
            } catch (error: any) {
              console.error('Error fetching product:', error.message);
              setProduct(null);
              setSimilarProducts([]);
            }
          }
      
          fetchData();
        }, [params.slug]);


        const handlebuyNow = () => {
          if (product) {
            onAdd(product, qty);
            setShowCart(true);
          } else {
            console.warn('Product is null. Cannot add to cart.');
          }
        };

  return (
    <div>
        {product && <div className='product-detail-container' >
            <div>
                <div className='image-container' >
                    <img src={urlFor(product.image[index])} className='product-detail-image' />
                </div>
                <div className='small-images-container' >
                    {product.image.map((item, i) => (
                        <img 
                            key={i}
                            src={urlFor(item)}
                            className={i == index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => (setIndex(i))}
                        />
                    ))}
                </div>
            </div>
            
            <div className='product-detail-desc' >
                <h2>{product.name}</h2>
                <h4>Details: </h4>
                <p>{product.details}</p>
                <p className='price'>£{product.price}</p>
        
                {!product.soldOut ? (
                  <div>
                  <div className='quantity' >
                    <h3>Quantity: </h3>
                    <p className='quantity-desc' >
                        <span className='minus' onClick={decQty} ><AiOutlineMinus /></span>
                        <span className='num'  >{qty}</span>
                        <span className='plus' onClick={incQty} ><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add To Cart</button>
                    <button type='button' className='buy-now' onClick={handlebuyNow} >Buy Now</button>
                  </div>
                  </div>
                ) : (
                  <div className='buttons'>
                    <h3>Sold Out</h3>
                  </div>
                )}
            
            </div>
        </div>}
        <div className='maylike-products-wrapper' >
                <h2>You May Also Like</h2>
                <div className='marquee' >
                    <div className='maylike-products-container track'>{similarProducts.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}</div>
                </div>
        </div>
    </div>
  )
}

export default ProductDetails
