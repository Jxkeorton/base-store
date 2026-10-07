// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const getProductsForCheckout = vi.fn()
const createSession = vi.fn()

vi.mock('@/lib/sanity/queries', () => ({ getProductsForCheckout }))
vi.mock('@/lib/stripe', () => ({ getStripe: () => ({ checkout: { sessions: { create: createSession } } }) }))
vi.mock('@/lib/sanity/image', () => ({
  urlFor: () => ({ width: () => ({ url: () => 'https://cdn.example/product.jpg' }) }),
}))

const { POST } = await import('@/app/api/checkout/route')

const sanityProduct = (over: Record<string, unknown> = {}) => ({
  _id: 'p1',
  name: 'Toggles - Yellow',
  price: 40,
  soldOut: false,
  image: [{ asset: { _ref: 'image-abc-1x1-webp' } }],
  ...over,
})

const post = (body: unknown, url = 'https://www.example.com/api/checkout') =>
  POST(
    new Request(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  )

beforeEach(() => {
  getProductsForCheckout.mockResolvedValue([sanityProduct()])
  createSession.mockResolvedValue({ url: 'https://checkout.stripe.com/pay/cs_test_123' })
  delete process.env.STRIPE_SHIPPING_RATE_ID
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => vi.clearAllMocks())

describe('POST /api/checkout: validation', () => {
  it.each([
    ['malformed JSON', 'not json'],
    ['an empty cart', { items: [] }],
    ['a missing items array', {}],
    ['a quantity of zero', { items: [{ id: 'p1', quantity: 0 }] }],
    ['a fractional quantity', { items: [{ id: 'p1', quantity: 1.5 }] }],
    ['a quantity over the limit', { items: [{ id: 'p1', quantity: 21 }] }],
    ['an empty product id', { items: [{ id: '', quantity: 1 }] }],
  ])('rejects %s with a 400', async (_label, body) => {
    const res = await post(body)
    expect(res.status).toBe(400)
    expect(createSession).not.toHaveBeenCalled()
  })
})

describe('POST /api/checkout: products', () => {
  it('rejects a product that no longer exists', async () => {
    getProductsForCheckout.mockResolvedValue([])
    const res = await post({ items: [{ id: 'gone', quantity: 1 }] })

    expect(res.status).toBe(409)
    expect(createSession).not.toHaveBeenCalled()
  })

  it('rejects a sold-out product and names it', async () => {
    getProductsForCheckout.mockResolvedValue([sanityProduct({ soldOut: true })])
    const res = await post({ items: [{ id: 'p1', quantity: 1 }] })

    expect(res.status).toBe(409)
    expect((await res.json()).error).toContain('Toggles - Yellow')
    expect(createSession).not.toHaveBeenCalled()
  })
})

describe('POST /api/checkout: Stripe session', () => {
  it('uses the price from Sanity and ignores any price the browser sends', async () => {
    const res = await post({ items: [{ id: 'p1', quantity: 2, price: 0.01, name: 'Free toggles' }] })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ url: 'https://checkout.stripe.com/pay/cs_test_123' })

    const [params] = createSession.mock.calls[0]
    expect(params.line_items).toHaveLength(1)
    expect(params.line_items[0].quantity).toBe(2)
    expect(params.line_items[0].price_data.unit_amount).toBe(4000)
    expect(params.line_items[0].price_data.product_data.name).toBe('Toggles - Yellow')
    expect(params.line_items[0].price_data.currency).toBe('gbp')
  })

  it('converts fractional pound prices to whole pence without float drift', async () => {
    getProductsForCheckout.mockResolvedValue([sanityProduct({ price: 19.99 })])
    await post({ items: [{ id: 'p1', quantity: 1 }] })

    expect(createSession.mock.calls[0][0].line_items[0].price_data.unit_amount).toBe(1999)
  })

  it('merges duplicate product ids into a single line', async () => {
    await post({ items: [{ id: 'p1', quantity: 2 }, { id: 'p1', quantity: 3 }] })

    expect(getProductsForCheckout).toHaveBeenCalledWith(['p1'])
    const lines = createSession.mock.calls[0][0].line_items
    expect(lines).toHaveLength(1)
    expect(lines[0].quantity).toBe(5)
  })

  it('caps merged quantities at the maximum', async () => {
    await post({ items: [{ id: 'p1', quantity: 20 }, { id: 'p1', quantity: 20 }] })

    expect(createSession.mock.calls[0][0].line_items[0].quantity).toBe(20)
  })

  it('builds return URLs from the request origin and asks Stripe for the session id', async () => {
    await post({ items: [{ id: 'p1', quantity: 1 }] }, 'https://www.traversebase.co.uk/api/checkout')

    const [params] = createSession.mock.calls[0]
    expect(params.success_url).toBe(
      'https://www.traversebase.co.uk/success?session_id={CHECKOUT_SESSION_ID}',
    )
    expect(params.cancel_url).toBe('https://www.traversebase.co.uk/')
  })

  it('keeps checkout UK-only with card payments and tax', async () => {
    await post({ items: [{ id: 'p1', quantity: 1 }] })

    const [params] = createSession.mock.calls[0]
    expect(params.mode).toBe('payment')
    expect(params.allowed_payment_method_types).toEqual(['card'])
    expect(params.shipping_address_collection.allowed_countries).toEqual(['GB'])
    expect(params.automatic_tax).toEqual({ enabled: true })
  })

  it('uses the configured shipping rate, falling back to the original one', async () => {
    await post({ items: [{ id: 'p1', quantity: 1 }] })
    expect(createSession.mock.calls[0][0].shipping_options[0].shipping_rate).toBe(
      'shr_1NYG4iES6bGARFv6cKmlruHG',
    )

    process.env.STRIPE_SHIPPING_RATE_ID = 'shr_custom'
    await post({ items: [{ id: 'p1', quantity: 1 }] })
    expect(createSession.mock.calls[1][0].shipping_options[0].shipping_rate).toBe('shr_custom')
  })

  it('returns a 500 with a safe message when Stripe fails', async () => {
    createSession.mockRejectedValue(new Error('sk_live_secret exploded'))
    const res = await post({ items: [{ id: 'p1', quantity: 1 }] })

    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).not.toContain('sk_live')
  })
})
