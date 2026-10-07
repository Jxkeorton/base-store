'use client'
import { useCartHydration } from '@/lib/cart-store'

/** Loads the persisted cart once on the client. Renders nothing. */
export default function CartHydrator() {
  useCartHydration()
  return null
}
