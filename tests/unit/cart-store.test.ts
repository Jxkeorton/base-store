import { beforeEach, describe, expect, it } from 'vitest'
import { selectSubtotal, selectTotalQuantity, useCartStore } from '@/lib/cart-store'
import { MAX_QUANTITY } from '@/lib/constants'
import type { Product } from '@/lib/types'

const product = (overrides: Partial<Product> = {}): Product => ({
  _id: 'p1',
  name: 'Closing Loops ',
  slug: { current: 'closing-loops' },
  price: 2,
  details: '',
  soldOut: false,
  category: '',
  image: [{ asset: { _ref: 'image-abc-100x100-webp' } }],
  ...overrides,
})

const state = () => useCartStore.getState()

beforeEach(() => {
  localStorage.clear()
  useCartStore.setState({ items: [], isOpen: false })
})

describe('cart store', () => {
  it('adds a product with a snapshot of what the cart needs', () => {
    state().add(product(), 2)

    expect(state().items).toEqual([
      {
        _id: 'p1',
        name: 'Closing Loops ',
        slug: 'closing-loops',
        price: 2,
        image: { asset: { _ref: 'image-abc-100x100-webp' } },
        quantity: 2,
      },
    ])
  })

  it('merges repeated adds of the same product into one line', () => {
    state().add(product(), 1)
    state().add(product(), 3)

    expect(state().items).toHaveLength(1)
    expect(state().items[0].quantity).toBe(4)
  })

  it('never lets a line exceed the maximum quantity', () => {
    state().add(product(), MAX_QUANTITY)
    state().add(product(), 5)
    expect(state().items[0].quantity).toBe(MAX_QUANTITY)

    state().setQuantity('p1', 999)
    expect(state().items[0].quantity).toBe(MAX_QUANTITY)
  })

  it('never lets a line drop below one', () => {
    state().add(product(), 1)
    state().setQuantity('p1', 0)
    expect(state().items[0].quantity).toBe(1)

    state().setQuantity('p1', -4)
    expect(state().items[0].quantity).toBe(1)
  })

  it('removes a single line and clears everything', () => {
    state().add(product(), 1)
    state().add(product({ _id: 'p2', slug: { current: 'other' } }), 1)

    state().remove('p1')
    expect(state().items.map((i) => i._id)).toEqual(['p2'])

    state().clear()
    expect(state().items).toEqual([])
  })

  it('derives the quantity and subtotal from the lines', () => {
    state().add(product({ price: 2 }), 3)
    state().add(product({ _id: 'p2', slug: { current: 'toggles' }, price: 40 }), 2)

    expect(selectTotalQuantity(state())).toBe(5)
    expect(selectSubtotal(state())).toBe(86)
  })

  it('persists only the items, not the open/closed state of the bag', () => {
    state().add(product(), 1)
    state().setOpen(true)

    const stored = JSON.parse(localStorage.getItem('base-store-cart') ?? '{}')
    expect(stored.state.items).toHaveLength(1)
    expect(stored.state).not.toHaveProperty('isOpen')
  })
})
