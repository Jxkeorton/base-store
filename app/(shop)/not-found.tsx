import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='products-heading'>
      <h2>Page not found</h2>
      <p>We couldn&apos;t find what you were looking for.</p>
      <Link href='/' className='used-gear-link'>Back to the shop</Link>
    </div>
  )
}
