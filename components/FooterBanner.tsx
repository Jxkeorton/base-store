import React from 'react';
import { HeroBannerProps } from '@/components/HeroBanner';
import Link from 'next/link'

import { urlFor } from '@/lib/sanity/image'



const FooterBanner: React.FC<HeroBannerProps>= ({firstBanner}) => {

  const {
    discount = "",
    largeText1 = "",
    largeText2 = "",
    saleTime = "",
    smallText = "",
    midText = "",
    product = "",
    buttonText = "",
    desc= "",
  } = firstBanner || {};

  const imageUrl = urlFor(firstBanner.image).url();
  
  return (
    <div className='footer-banner-container' >
      <div className='banner-desc'>
        <div className='left' >
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`} >
            <button type="button" >{buttonText}</button>
          </Link>
        </div>

        <img src={imageUrl} alt={midText} className='footer-banner-image'/>
      </div>
    </div>
  )
}

export default FooterBanner
