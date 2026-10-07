import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity/image'
import { clean } from '@/lib/format'
import type { Banner } from '@/lib/types'

export default function HeroBanner({ banner }: { banner: Banner }) {
  const title = clean(banner.midText)
  const href = banner.product ? `/product/${clean(banner.product)}` : '/product/tailgate-kit'

  return (
    <section className="clip-slant-b relative isolate overflow-hidden bg-ink-900 text-white">
      <Image
        src="/images/HeroImage.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-90"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />

      <Container className="grid items-center gap-6 pt-10 pb-24 md:grid-cols-2 md:pt-14 md:pb-28">
        <div>
          <p
            className="animate-rise mb-4 font-display text-xl font-bold tracking-widest uppercase italic text-brand-300"
            style={{ '--delay': '0ms' } as React.CSSProperties}
          >
            The first UK BASE store
          </p>
          <h1
            className="animate-rise font-display text-7xl leading-[0.88] font-extrabold tracking-tight uppercase italic sm:text-8xl lg:text-9xl"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            {title}
          </h1>
          <p
            className="animate-rise mt-6 max-w-md text-lg text-ink-50"
            style={{ '--delay': '220ms' } as React.CSSProperties}
          >
            {[clean(banner.smallText), clean(banner.desc)].filter(Boolean).join('. ')}.
          </p>
          <div
            className="animate-rise mt-8 flex flex-wrap gap-3"
            style={{ '--delay': '340ms' } as React.CSSProperties}
          >
            <Button asChild size="lg">
              <Link href={href}>
                {clean(banner.buttonText) || 'Shop now'}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/#gear">Browse all gear</Link>
            </Button>
          </div>
        </div>

        <div
          className="animate-rise relative mx-auto aspect-square w-full max-w-xs md:max-w-[440px] md:justify-self-end"
          style={{ '--delay': '260ms' } as React.CSSProperties}
        >
          <Image
            src={urlFor(banner.image).width(1000).url()}
            alt={title}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 80vw"
            className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
      </Container>
    </section>
  )
}
