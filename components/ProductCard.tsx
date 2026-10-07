'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { urlFor } from '@/lib/sanity/image'
import { categoryLabel, clean, formatPrice } from '@/lib/format'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
  priority?: boolean
  /** Heading level for the product name: h3 under a section heading, h2 directly under the page's h1. */
  headingLevel?: 'h2' | 'h3'
}

export default function ProductCard({ product, priority = false, headingLevel: Heading = 'h3' }: Props) {
  const add = useCartStore((s) => s.add)
  const name = clean(product.name)
  const href = `/product/${product.slug.current}`
  const image = product.image?.[0]
  const canQuickAdd = !product.soldOut && Boolean(image)

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-xl bg-surface">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block aspect-square">
          {image && (
            <Image
              src={urlFor(image).width(700).url()}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </Link>
        {product.soldOut && (
          <Badge className="absolute top-3 left-3 rounded-sm bg-ink-800 px-2.5 py-1 font-display text-sm tracking-widest text-white uppercase italic">
            Sold out
          </Badge>
        )}
        {canQuickAdd && (
          <Button
            type="button"
            size="icon"
            aria-label={`Add ${name} to bag`}
            className="absolute right-3 bottom-3 shadow-md transition-all md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            onClick={() => {
              add(product, 1)
              toast.success(`${name} added to your bag`)
            }}
          >
            <Plus />
          </Button>
        )}
      </div>

      <Link href={href} className="mt-3 block">
        <div className="flex items-baseline justify-between gap-3">
          <Heading className="font-sans text-base leading-snug font-semibold normal-case not-italic tracking-normal group-hover:underline">
            {name}
          </Heading>
          <p className="shrink-0 font-display text-2xl leading-none font-extrabold italic text-ink-700">
            {formatPrice(product.price)}
          </p>
        </div>
        {product.category && (
          <p className="mt-0.5 text-xs font-semibold tracking-widest text-ink-400 uppercase">
            {categoryLabel(product.category)}
          </p>
        )}
      </Link>
    </article>
  )
}
