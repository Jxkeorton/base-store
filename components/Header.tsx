'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import Logo from '../public/logo-png.webp'
import Container from '@/components/Container'
import CartButton from '@/components/CartButton'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/canopies', label: 'Canopies' },
  { href: '/used-gear', label: 'Used gear' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu if the viewport grows past the breakpoint where it is replaced by the nav bar.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link href="/" aria-label="Traverse Base, home" className="shrink-0">
          <Image src={Logo} alt="Traverse Base" priority className="h-10 w-auto md:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={cn(
                    'relative inline-block py-2 font-display text-xl font-bold tracking-wide uppercase italic text-ink-700 transition-colors hover:text-foreground',
                    // the lean: a skewed red underline draws in on hover and stays on the current page
                    'after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:-skew-x-[24deg] after:scale-x-0 after:bg-brand-500 after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:text-foreground aria-[current=page]:after:scale-x-100',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <CartButton />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl font-extrabold tracking-wide uppercase italic">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="divide-y divide-border">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className="flex h-14 items-center font-display text-3xl font-extrabold tracking-wide uppercase italic text-ink-700 aria-[current=page]:text-brand-600"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
