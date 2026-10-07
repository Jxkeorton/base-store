const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
const gbpWhole = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
})

/** £2, £40, £12.50: whole pounds drop the pence. */
export const formatPrice = (n: number) => (Number.isInteger(n) ? gbpWhole : gbp).format(n)

/** Sanity strings often carry stray whitespace ("Closing Loops "). */
export const clean = (s?: string | null) => (s ?? '').trim()

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase())
export const categoryLabel = (s?: string | null) => (s ? titleCase(clean(s)) : '')
