import Container from '@/components/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Container className="py-12 md:py-16" role="status" aria-label="Loading">
      <Skeleton className="mb-10 h-14 w-64" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="mt-3 h-5 w-3/4" />
          </div>
        ))}
      </div>
    </Container>
  )
}
