'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Truck } from 'lucide-react'
import { toast } from 'sonner'
import QuantityStepper from '@/components/QuantityStepper'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { urlFor } from '@/lib/sanity/image'
import { categoryLabel, clean, formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'

export default function ProductDetails({ product }: { product: Product }) {
  const [index, setIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const add = useCartStore((s) => s.add)
  const setOpen = useCartStore((s) => s.setOpen)
  const name = clean(product.name)
  const images = product.image ?? []

  const addToBag = () => {
    add(product, qty)
    toast.success(`${qty} × ${name} added to your bag`)
  }
  const buyNow = () => {
    add(product, qty)
    setOpen(true)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
          {images[index] && (
            <Image
              key={index}
              src={urlFor(images[index]).width(1200).url()}
              alt={name}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="animate-rise object-cover"
            />
          )}
        </div>
        {images.length > 1 && (
          <ul className="mt-3 flex gap-3" aria-label="Product photos">
            {images.map((img, i) => (
              <li key={i}>
                <button
                  type="button"
                  aria-label={`Show photo ${i + 1} of ${images.length}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'relative block size-20 overflow-hidden rounded-lg bg-surface ring-offset-2 transition-shadow',
                    i === index ? 'ring-2 ring-brand-500' : 'hover:ring-2 hover:ring-ink-200',
                  )}
                >
                  <Image src={urlFor(img).width(200).url()} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        {product.category && (
          <p className="mb-2 font-display text-lg font-bold tracking-widest uppercase italic text-brand-600">
            {categoryLabel(product.category)}
          </p>
        )}
        <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase italic text-ink-900 md:text-6xl">
          {name}
        </h1>
        <p className="mt-4 font-display text-4xl font-extrabold italic text-ink-700">
          {formatPrice(product.price)}
        </p>
        {product.details && <p className="mt-6 text-lg leading-relaxed text-ink-700">{clean(product.details)}</p>}

        {product.soldOut ? (
          <div className="mt-8 rounded-xl bg-surface p-5">
            <p className="font-display text-2xl font-bold tracking-wide uppercase italic">Sold out</p>
            <p className="mt-1 text-muted-foreground">
              <Link href="/contact" className="font-semibold text-brand-600 underline underline-offset-4">
                Contact us
              </Link>{' '}
              to ask about availability.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-display text-xl font-bold tracking-wide uppercase italic">Quantity</span>
              <QuantityStepper value={qty} onChange={setQty} label={name} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" size="lg" className="flex-1" onClick={addToBag}>
                Add to bag
              </Button>
              <Button type="button" size="lg" variant="secondary" className="flex-1" onClick={buyNow}>
                Buy now
              </Button>
            </div>
          </div>
        )}

        <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-ink-700">
          <li className="flex items-center gap-3">
            <Truck className="size-5 shrink-0 text-ink-500" />
            Ships within the UK. Shipping and tax are added at checkout.
          </li>
          <li className="flex items-center gap-3">
            <MessageCircle className="size-5 shrink-0 text-ink-500" />
            <span>
              Need help choosing?{' '}
              <Link href="/contact" className="font-semibold text-brand-600 underline underline-offset-4">
                Ask us
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
