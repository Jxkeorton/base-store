import React from 'react';
import {Product, FooterBanner, HeroBanner} from '../components';

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading' >
        <h2>Best Selling Products</h2>
        <p>Variety of BASE equipment</p>
      </div>

      <div className='products-container' >
      {['product1', 'product2'].map((product) => (
        <Product key={product} />
      ))}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home
