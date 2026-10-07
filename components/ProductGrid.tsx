'use client'
import { useMemo, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { categoryLabel, clean } from '@/lib/format'
import type { Product } from '@/lib/types'

interface Props {
  products: Product[]
  /** Show category filter chips (only appears when there is more than one category to filter by). */
  filters?: boolean
  emptyMessage?: React.ReactNode
  cardHeadingLevel?: 'h2' | 'h3'
}

export default function ProductGrid({ products, filters = false, emptyMessage, cardHeadingLevel }: Props) {
  const [active, setActive] = useState<string>('all')

  const categories = useMemo(
    () => [...new Set(products.map((p) => clean(p.category)).filter(Boolean))].sort(),
    [products],
  )
  const visible = active === 'all' ? products : products.filter((p) => clean(p.category) === active)
  const showChips = filters && categories.length > 0

  if (products.length === 0) {
    return <div className="rounded-xl bg-surface/60 p-10 text-center text-muted-foreground">{emptyMessage}</div>
  }

  return (
    <div>
      {showChips && (
        <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
          {['all', ...categories].map((c) => (
            <Button
              key={c}
              type="button"
              size="sm"
              variant={active === c ? 'secondary' : 'outline'}
              aria-pressed={active === c}
              onClick={() => setActive(c)}
            >
              {c === 'all' ? 'All gear' : categoryLabel(c)}
            </Button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {visible.map((product, i) => (
          <li key={product._id}>
            <ProductCard product={product} priority={i < 4} headingLevel={cardHeadingLevel} />
          </li>
        ))}
      </ul>
    </div>
  )
}
