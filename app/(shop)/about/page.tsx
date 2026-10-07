import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/Container'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description: 'Traverse Base provides high-quality BASE jumping equipment at affordable prices, without overseas import costs.',
}

export default function About() {
  return (
    <Container className="py-12 md:py-20">
      <SectionHeading as="h1" eyebrow="What we are all about" title="BASE gear for the UK" />

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-wide uppercase italic text-ink-700">
            The goal
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            Our mission is to provide high-quality BASE jumping equipment at affordable prices, so you
            don&apos;t have to buy from overseas and pay excessive import taxes.
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-wide uppercase italic text-ink-700">
            There&apos;s more to us
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            We&apos;re not just here to sell you stuff. Need help choosing the right gear? Want to share
            a crazy jump story? We&apos;re all ears and ready to chat.
          </p>
        </div>
      </div>

      <Button asChild size="lg" className="mt-12">
        <Link href="/contact">
          Talk to us
          <ArrowRight />
        </Link>
      </Button>
    </Container>
  )
}
