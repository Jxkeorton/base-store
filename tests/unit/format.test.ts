import { describe, expect, it } from 'vitest'
import { categoryLabel, clean, formatPrice } from '@/lib/format'

describe('formatPrice', () => {
  it('drops the pence for whole pounds', () => {
    expect(formatPrice(2)).toBe('£2')
    expect(formatPrice(40)).toBe('£40')
  })

  it('keeps two decimals for fractional prices', () => {
    expect(formatPrice(12.5)).toBe('£12.50')
    expect(formatPrice(0.99)).toBe('£0.99')
  })
})

describe('clean', () => {
  it('trims whitespace and tolerates missing values', () => {
    expect(clean('Closing Loops ')).toBe('Closing Loops')
    expect(clean(undefined)).toBe('')
    expect(clean(null)).toBe('')
  })
})

describe('categoryLabel', () => {
  it('title-cases a category for display', () => {
    expect(categoryLabel('used gear')).toBe('Used Gear')
    expect(categoryLabel('canopies')).toBe('Canopies')
  })

  it('returns an empty string when there is no category', () => {
    expect(categoryLabel(null)).toBe('')
    expect(categoryLabel(undefined)).toBe('')
  })
})
