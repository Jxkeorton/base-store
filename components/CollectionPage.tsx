import Container from '@/components/Container'
import ProductGrid from '@/components/ProductGrid'
import SectionHeading from '@/components/SectionHeading'
import type { Product } from '@/lib/types'

interface Props {
  title: string
  intro: React.ReactNode
  products: Product[]
  emptyMessage: React.ReactNode
}

export default function CollectionPage({ title, intro, products, emptyMessage }: Props) {
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading as="h1" eyebrow="BASE equipment" title={title} className="mb-10">
        {intro}
      </SectionHeading>
      <ProductGrid products={products} emptyMessage={emptyMessage} cardHeadingLevel="h2" />
    </Container>
  )
}
