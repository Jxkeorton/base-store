import Link from 'next/link'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container className="grid min-h-[50vh] place-items-center py-16 text-center">
      <div>
        <p className="font-display text-xl font-bold tracking-widest uppercase italic text-brand-600">404</p>
        <h1 className="mt-1 font-display text-5xl font-extrabold tracking-tight uppercase italic text-ink-900">
          Page not found
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">That page doesn&apos;t exist or has moved.</p>
        <Button asChild className="mt-6">
          <Link href="/">Back to the shop</Link>
        </Button>
      </div>
    </Container>
  )
}
