import { NextResponse } from 'next/server'
import { z } from 'zod'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getProductsForCheckout } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { MAX_QUANTITY } from '@/lib/constants'

// Fallback keeps the previous behaviour until STRIPE_SHIPPING_RATE_ID is set in Vercel.
const DEFAULT_SHIPPING_RATE = 'shr_1NYG4iES6bGARFv6cKmlruHG'

const bodySchema = z.object({
  items: z
    .array(z.object({ id: z.string().min(1), quantity: z.number().int().min(1).max(MAX_QUANTITY) }))
    .min(1)
    .max(50),
})

const fail = (error: string, status: number) => NextResponse.json({ error }, { status })

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return fail('Invalid cart.', 400)

  // Merge duplicate ids so a product can't appear twice with different quantities.
  const quantities = new Map<string, number>()
  for (const { id, quantity } of parsed.data.items) {
    quantities.set(id, Math.min(MAX_QUANTITY, (quantities.get(id) ?? 0) + quantity))
  }

  try {
    // Name, price and availability always come from Sanity, never from the browser.
    const products = await getProductsForCheckout([...quantities.keys()])
    const byId = new Map(products.map((p) => [p._id, p]))

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    for (const [id, quantity] of quantities) {
      const product = byId.get(id)
      if (!product) return fail('An item in your cart is no longer available.', 409)
      if (product.soldOut) return fail(`${product.name} is sold out.`, 409)

      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: product.name,
            images: product.image?.[0] ? [urlFor(product.image[0]).width(800).url()] : [],
          },
          unit_amount: Math.round(product.price * 100),
        },
        adjustable_quantity: { enabled: true, minimum: 1 },
        quantity,
      })
    }

    const origin = new URL(request.url).origin
    const session = await getStripe().checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      allowed_payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ['GB'] },
      shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID ?? DEFAULT_SHIPPING_RATE }],
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      automatic_tax: { enabled: true },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout failed', error)
    return fail('Could not start checkout. Please try again.', 500)
  }
}
