export interface SanityImage {
  asset: { _ref: string }
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  details: string
  soldOut: boolean
  category: string
  image: SanityImage[]
}

export interface Banner {
  smallText: string
  midText: string
  product: string
  largeText1: string
  largeText2: string
  buttonText: string
  desc: string
  discount: string
  saleTime: string
  image: SanityImage
}
