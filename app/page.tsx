'use client'
import React, { useEffect, useState } from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';
import { client } from '../lib/client';
import { Banner } from '@/components/HeroBanner';

export interface ProductData {
  _id: string,
  image: [
    {
      asset:{
        _ref: string,
      }
    }
  ],
  name: string,
  slug: {
    current:string,
  },
  price: number;
  details: string;
  quantity?: number;
}


const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [bannerData, setBannerData] = useState<Banner[]>([])
  
  useEffect(() => {
    async function fetchData() {

      try {
        const query = '*[_type == "product"]';
        const productsData = await client.fetch(query);
        setProducts(productsData);
        console.log('Fetched products:', productsData);

        const bannerQuery = '*[_type == "banner"]';
        const bannerData = await client.fetch(bannerQuery);
        setBannerData(bannerData);
        console.log('fetched banner data', bannerData)

      } catch (error: any) {
        console.error('Error fetching products:', error.message);
        setProducts([]);
        setBannerData([]);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {bannerData[0] && <HeroBanner firstBanner={bannerData[0]} />}

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Variety of BASE equipment</p>
      </div>

      <div className='products-container'>
      {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {bannerData[0] && <FooterBanner firstBanner={bannerData[0]} />}
    </div>
  );
};
export default Home;



