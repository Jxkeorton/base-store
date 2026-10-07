'use client'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="grid min-h-[50vh] place-items-center py-16 text-center">
      <div>
        <h1 className="font-display text-5xl font-extrabold tracking-tight uppercase italic text-ink-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">This page didn&apos;t load. Try again.</p>
        <Button className="mt-6" onClick={reset}>Try again</Button>
      </div>
    </Container>
  )
}
