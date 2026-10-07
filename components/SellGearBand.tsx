import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'

export default function SellGearBand() {
  return (
    <section className="clip-slant-t bg-brand-500 pt-24 pb-16 text-white md:pt-28 md:pb-20">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase italic md:text-6xl">
            Got used gear to sell?
          </h2>
          <p className="mt-3 max-w-lg text-xl font-bold text-white">
            Contact us about selling your used gear.
          </p>
        </div>
        <Button asChild size="lg" variant="secondary" className="bg-ink-900 hover:bg-ink-700">
          <Link href="/contact">
            Get in touch
            <ArrowRight />
          </Link>
        </Button>
      </Container>
    </section>
  )
}
