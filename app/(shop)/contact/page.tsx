import type { Metadata } from 'next'
import { Mail, Phone } from 'lucide-react'
import Container from '@/components/Container'
import SectionHeading from '@/components/SectionHeading'
import Instagram from '@/components/icons/Instagram'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Call, email or message Traverse Base on Instagram.',
}

const contacts = [
  { icon: Phone, label: 'Phone', value: '(+44) 7986 273803', href: 'tel:+447986273803' },
  { icon: Mail, label: 'Email', value: 'traversebase@gmail.com', href: 'mailto:traversebase@gmail.com' },
  { icon: Instagram, label: 'Instagram', value: '@traversebase', href: 'https://www.instagram.com/traversebase/' },
]

export default function Contact() {
  return (
    <Container className="py-12 md:py-20">
      <SectionHeading as="h1" eyebrow="Get in touch" title="Let's talk BASE" />

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {contacts.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex h-full flex-col gap-4 rounded-2xl border-2 border-surface-strong p-6 transition-colors hover:border-brand-500"
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink-50 text-ink-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold tracking-widest uppercase italic text-ink-400">
                  {label}
                </span>
                <span className="block text-lg font-semibold break-words text-ink-900">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  )
}
