import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { BsBagCheckFill } from 'react-icons/bs'
import ClearCart from '@/components/ClearCart'
import { getStripe } from '@/lib/stripe'

export const metadata: Metadata = { title: 'Order confirmed', robots: { index: false } }

type Props = { searchParams: Promise<{ session_id?: string }> }

export default async function Success({ searchParams }: Props) {
  const { session_id } = await searchParams
  if (!session_id) redirect('/')

  // Only show the confirmation for a real, paid Checkout Session.
  const session = await getStripe()
    .checkout.sessions.retrieve(session_id)
    .catch(() => null)
  if (!session || session.payment_status !== 'paid') redirect('/')

  const email = session.customer_details?.email

  return (
    <div className='success-wrapper'>
      <ClearCart />
      <div className='success'>
        <p className='icon'><BsBagCheckFill /></p>
        <h2>Thank you for your order</h2>
        <p className='email.msg'>
          {email ? `A receipt has been sent to ${email}.` : 'Check your email inbox for the receipt.'}
        </p>
        <p className='description'>
          If you have any questions, please email
          <a className='email' href='mailto:traversebase@gmail.com'>traversebase@gmail.com</a>
        </p>
        <Link href='/'>
          <button type='button' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}
