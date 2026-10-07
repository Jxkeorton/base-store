'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='products-heading'>
      <h2>Something went wrong</h2>
      <p>We couldn&apos;t load this page.</p>
      <button type='button' className='btn' onClick={reset}>Try again</button>
    </div>
  )
}
