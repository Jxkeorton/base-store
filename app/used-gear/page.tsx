'use client'
import React, { useEffect, useState } from 'react'
import { ProductData } from '../page';
import { client } from '@/lib/client';
import { Product } from '@/components'

const UsedGear = () => {
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const query = '*[_type == "product"]';
                const productsData = await client.fetch(query);

                 // Filter products by category 'used gear'
                 const usedGearProducts = productsData.filter((product: ProductData) => product.category === 'used gear');

                setProducts(usedGearProducts);
                console.log('Fetched products:', productsData);
            } catch (error: any) {
                console.error('Error fetching products:', error.message);
                setProducts([]);
            }
        }

        
        fetchData();
    }, []);

    return (
        <>
            <div className='products-heading'>
                <h2>Used Gear</h2>
                <p><a href='/contact' className='used-gear-link'>Contact us</a> about selling your used gear</p>
            </div>

            <div className='products-container'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))
                ) : (
                    <p className='no-used-gear'>No used gear available at this time.</p>
                )}
            </div>
        </>
    );
};

export default UsedGear;