import Link from 'next/link'
import Container from '@/components/Container'
import Instagram from '@/components/icons/Instagram'

const shop = [
  { href: '/#gear', label: 'All gear' },
  { href: '/canopies', label: 'Canopies' },
  { href: '/used-gear', label: 'Used gear' },
]
const info = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const linkClass = 'py-1 text-ink-100 transition-colors hover:text-white'
const headingClass = 'mb-3 font-display text-lg font-bold tracking-widest uppercase italic text-brand-300'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div>
          <p className="font-display text-4xl font-extrabold tracking-tight uppercase italic">
            Traverse <span className="text-brand-500">Base</span>
          </p>
          <p className="mt-3 max-w-xs text-ink-100">
            BASE gear for the UK. The first UK BASE store, more products soon.
          </p>
        </div>

        <nav aria-label="Shop">
          <h2 className={headingClass}>Shop</h2>
          <ul>
            {shop.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Info">
          <h2 className={headingClass}>Info</h2>
          <ul>
            {info.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Follow</h2>
          <a
            href="https://www.instagram.com/traversebase/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Traverse Base on Instagram (opens in a new tab)"
            className="grid size-11 place-items-center rounded-full border border-ink-300/40 text-white transition-colors hover:border-brand-500 hover:bg-brand-500"
          >
            <Instagram className="size-5" />
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-sm text-ink-200">
          © {new Date().getFullYear()} Traverse Base. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
