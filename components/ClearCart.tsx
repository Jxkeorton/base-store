'use client'
import { useEffect } from 'react'
import { useCartStore } from '@/lib/cart-store'
import { runFireworks } from '@/lib/fireworks'

/** Empties the cart and celebrates once a paid order has been confirmed server-side. */
export default function ClearCart() {
  const clear = useCartStore((s) => s.clear)

  useEffect(() => {
    clear()
    runFireworks()
  }, [clear])

  return null
}
