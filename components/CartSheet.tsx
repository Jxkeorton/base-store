'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import QuantityStepper from '@/components/QuantityStepper'
import { selectSubtotal, selectTotalQuantity, useCartStore } from '@/lib/cart-store'
import { urlFor } from '@/lib/sanity/image'
import { clean, formatPrice } from '@/lib/format'

export default function CartSheet() {
  const [checkingOut, setCheckingOut] = useState(false)
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const setOpen = useCartStore((s) => s.setOpen)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const remove = useCartStore((s) => s.remove)
  const subtotal = useCartStore(selectSubtotal)
  const count = useCartStore(selectTotalQuantity)

  const checkout = async () => {
    setCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((i) => ({ id: i._id, quantity: i.quantity })) }),
      })
      const data = await response.json()

      if (!response.ok || !data.url) {
        toast.error(data.error ?? 'Checkout failed. Try again in a moment.')
        setCheckingOut(false)
        return
      }

      toast.loading('Taking you to secure payment…')
      window.location.href = data.url
    } catch {
      toast.error('Could not reach checkout. Check your connection and try again.')
      setCheckingOut(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-3xl font-extrabold tracking-wide uppercase italic">
            Your bag
            {count > 0 && <span className="ml-2 text-xl text-ink-400">({count})</span>}
          </SheetTitle>
          <SheetDescription className="sr-only">Items in your bag and checkout</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="size-14 text-ink-200" strokeWidth={1.25} />
            <p className="font-display text-2xl font-bold tracking-wide uppercase italic">
              Your bag is empty
            </p>
            <p className="text-sm text-muted-foreground">Add some gear and it will show up here.</p>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/#gear">Browse gear</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item._id} className="flex gap-4 py-5">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-surface">
                    <Image
                      src={urlFor(item.image).width(240).url()}
                      alt={clean(item.name)}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      {item.slug ? (
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="font-medium leading-snug hover:underline"
                        >
                          {clean(item.name)}
                        </Link>
                      ) : (
                        <p className="font-medium leading-snug">{clean(item.name)}</p>
                      )}
                      <p className="font-display text-xl font-bold italic text-ink-700">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <QuantityStepper
                        size="icon-sm"
                        label={clean(item.name)}
                        value={item.quantity}
                        onChange={(q) => setQuantity(item._id, q)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Remove ${clean(item.name)} from bag`}
                        className="text-ink-500 hover:text-brand-600"
                        onClick={() => remove(item._id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="gap-3 border-t border-border bg-surface/40 p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl font-bold tracking-wide uppercase italic">
                  Subtotal
                </span>
                <span className="font-display text-3xl font-extrabold italic">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping (UK only) and tax are added at checkout.
              </p>
              <Button size="lg" className="w-full" disabled={checkingOut} onClick={checkout}>
                {checkingOut ? 'Please wait…' : 'Checkout'}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
