import Container from '@/components/Container'
import HeroBanner from '@/components/HeroBanner'
import ProductGrid from '@/components/ProductGrid'
import SectionHeading from '@/components/SectionHeading'
import SellGearBand from '@/components/SellGearBand'
import TrustStrip from '@/components/TrustStrip'
import { getHeroBanner, getProducts } from '@/lib/sanity/queries'

export default async function Home() {
  const [products, banner] = await Promise.all([getProducts(), getHeroBanner()])

  return (
    <>
      {banner && <HeroBanner banner={banner} />}
      <TrustStrip />

      <section id="gear" className="scroll-mt-24 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="BASE equipment" title="All gear" className="mb-10" />
          <ProductGrid products={products} filters emptyMessage="No products are listed right now. Check back soon." />
        </Container>
      </section>

      <SellGearBand />
    </>
  )
}
