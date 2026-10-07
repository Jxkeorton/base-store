import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  as?: 'h1' | 'h2'
  className?: string
  children?: React.ReactNode
}

/** Eyebrow + condensed italic title. The one heading style used across the site. */
export default function SectionHeading({ eyebrow, title, as: Tag = 'h2', className, children }: Props) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className="mb-2 font-display text-lg font-bold tracking-widest uppercase italic text-brand-600">
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase italic text-ink-900 md:text-6xl">
        {title}
      </Tag>
      {children && <div className="mt-4 text-lg text-muted-foreground">{children}</div>}
    </div>
  )
}
