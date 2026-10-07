'use client'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Product, SanityImage } from '@/lib/types'

import { MAX_QUANTITY } from '@/lib/constants'

/** Minimal snapshot of a product kept in the cart. Prices are re-read from Sanity at checkout. */
export interface CartItem {
  _id: string
  name: string
  slug?: string
  price: number
  image: SanityImage
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  add: (product: Product, quantity: number) => void
  remove: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
  setOpen: (open: boolean) => void
}

const clamp = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(n)))

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (product, quantity) =>
        set((state) => {
          const existing = state.items.find((i) => i._id === product._id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i._id === product._id ? { ...i, quantity: clamp(i.quantity + quantity) } : i,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                _id: product._id,
                name: product.name,
                slug: product.slug.current,
                price: product.price,
                image: product.image[0],
                quantity: clamp(quantity),
              },
            ],
          }
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i._id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i._id === id ? { ...i, quantity: clamp(quantity) } : i)),
        })),
      clear: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'base-store-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
)

export const selectTotalQuantity = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0)
export const selectSubtotal = (s: CartState) => s.items.reduce((n, i) => n + i.price * i.quantity, 0)

/**
 * Rehydrates the persisted cart after mount (the server render always sees an empty cart,
 * so reading localStorage during the first render would cause a hydration mismatch).
 * Returns true once the stored cart has been loaded.
 */
export function useCartHydration() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    void Promise.resolve(useCartStore.persist.rehydrate()).then(() => setHydrated(true))
  }, [])
  return hydrated
}
