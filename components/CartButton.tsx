'use client'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { selectTotalQuantity, useCartStore } from '@/lib/cart-store'

export default function CartButton() {
  const count = useCartStore(selectTotalQuantity)
  const setOpen = useCartStore((s) => s.setOpen)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={count > 0 ? `Open bag, ${count} ${count === 1 ? 'item' : 'items'}` : 'Open bag'}
      onClick={() => setOpen(true)}
    >
      <ShoppingBag className="size-6" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-xs leading-5 font-bold text-white not-italic"
        >
          {count}
        </span>
      )}
    </Button>
  )
}
