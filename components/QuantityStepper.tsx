'use client'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MAX_QUANTITY } from '@/lib/constants'

interface Props {
  value: number
  onChange: (value: number) => void
  label: string
  size?: 'default' | 'icon-sm'
}

export default function QuantityStepper({ value, onChange, label, size = 'default' }: Props) {
  const compact = size === 'icon-sm'
  return (
    <div
      role="group"
      aria-label={`Quantity of ${label}`}
      className="inline-flex items-center rounded-md border-2 border-surface-strong"
    >
      <Button
        type="button"
        variant="ghost"
        size={compact ? 'icon-sm' : 'icon'}
        aria-label={`Decrease quantity of ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus />
      </Button>
      <span
        aria-live="polite"
        className={`text-center font-display text-xl font-bold italic tabular-nums ${compact ? 'w-7' : 'w-10'}`}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size={compact ? 'icon-sm' : 'icon'}
        aria-label={`Increase quantity of ${label}`}
        disabled={value >= MAX_QUANTITY}
        onClick={() => onChange(value + 1)}
      >
        <Plus />
      </Button>
    </div>
  )
}
