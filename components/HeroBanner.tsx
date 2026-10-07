import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import type { Banner } from '@/lib/types'


export interface HeroBannerProps {
  firstBanner: Banner;
}

const HeroBanner: React.FC<HeroBannerProps> = ({firstBanner}) => {
  const imageUrl = urlFor(firstBanner.image).url();

  return (
    <div className='hero-banner-container' style={{ backgroundImage: `url(/images/HeroImage.webp)`, backgroundSize: 'cover' }}>

      <div className='banner-content'>
        <div className='banner-text'>
          <h1>{firstBanner.midText}</h1>
          <p>{firstBanner.smallText}</p>
          <Link href={`/product/tailgate-kit`}>
            <button type="button">{firstBanner.buttonText}</button>
          </Link>
          
        </div>

        <div className='banner-product'>
          <img src={imageUrl} alt={firstBanner.midText} className='hero-banner-image' />
        </div>

        
      </div>
    </div>
  )
}

export default HeroBanner
