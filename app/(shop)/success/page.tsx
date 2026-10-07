import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import ClearCart from '@/components/ClearCart'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { getStripe } from '@/lib/stripe'

export const metadata: Metadata = { title: 'Order confirmed', robots: { index: false } }

type Props = { searchParams: Promise<{ session_id?: string }> }

function CouldNotConfirm() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase italic text-ink-900">
          We couldn&apos;t confirm your order
        </h1>
        <p className="mt-4 text-lg text-ink-700">
          If you completed payment, Stripe will have emailed you a receipt. If it hasn&apos;t arrived, email{' '}
          <a href="mailto:traversebase@gmail.com" className="font-semibold text-brand-600 underline underline-offset-4">
            traversebase@gmail.com
          </a>{' '}
          and we&apos;ll sort it out.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Back to the shop</Link>
        </Button>
      </div>
    </Container>
  )
}

export default async function Success({ searchParams }: Props) {
  const { session_id } = await searchParams
  if (!session_id) redirect('/')

  // Only show the confirmation for a real, paid Checkout Session.
  let session: Awaited<ReturnType<ReturnType<typeof getStripe>['checkout']['sessions']['retrieve']>>
  try {
    session = await getStripe().checkout.sessions.retrieve(session_id)
  } catch (error) {
    // Stripe says the session doesn't exist: nothing to confirm.
    if ((error as { statusCode?: number }).statusCode === 404) redirect('/')
    // Anything else (outage, misconfiguration): the customer may well have paid, so don't dump them on the home page.
    console.error('Could not retrieve Checkout Session', error)
    return <CouldNotConfirm />
  }
  if (session.payment_status !== 'paid') redirect('/')

  const email = session.customer_details?.email

  return (
    <Container className="grid min-h-[60vh] place-items-center py-16">
      <ClearCart />
      <div className="animate-rise max-w-lg text-center">
        <CircleCheck className="mx-auto size-20 text-brand-500" strokeWidth={1.5} />
        <h1 className="mt-6 font-display text-6xl leading-[0.95] font-extrabold tracking-tight uppercase italic text-ink-900">
          Order confirmed
        </h1>
        <p className="mt-4 text-lg text-ink-700">
          {email ? (
            <>
              Thank you. A receipt is on its way to <strong className="break-all">{email}</strong>.
            </>
          ) : (
            'Thank you. Check your inbox for the receipt.'
          )}
        </p>
        <p className="mt-2 text-muted-foreground">
          Questions about your order? Email{' '}
          <a href="mailto:traversebase@gmail.com" className="font-semibold text-brand-600 underline underline-offset-4">
            traversebase@gmail.com
          </a>
          .
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Continue shopping</Link>
        </Button>
      </div>
    </Container>
  )
}
