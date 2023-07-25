import Link from 'next/link'
import {urlFor} from '../lib/client'

export interface Banner {
  smallText: string,
  midText: string,
  product: string,
  largeText1: string,
  largeText2: string,
  buttonText:string,
  desc: string,
  discount: string,
  saleTime: string,
  image: {
    asset:{
      _ref: string
    }
  }
}


export interface HeroBannerProps {
  firstBanner: Banner;
}

const HeroBanner: React.FC<HeroBannerProps> = ({firstBanner}) => {
  const imageUrl = urlFor(firstBanner.image);

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo' >{firstBanner.product}</p>
        <h3>{firstBanner.midText}</h3>
        <h1>{firstBanner.largeText1}</h1>
        <img src={imageUrl} alt='headphones' className='hero-banner-image' />

        <div>
          <Link href={`/product/${firstBanner.product}`} >
            <button type="button" >{firstBanner.buttonText}</button>
          </Link>

          <div className='desc'>
            <h5>Description</h5>
            <p>{firstBanner.desc}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroBanner
