import { Recycle, Truck, Wrench } from 'lucide-react'
import Container from '@/components/Container'

const items = [
  { icon: Truck, text: 'Ships within the UK' },
  { icon: Recycle, text: 'Sell your used gear with us' },
  { icon: Wrench, text: 'Help choosing your canopy' },
]

export default function TrustStrip() {
  return (
    <Container>
      <ul className="-mt-2 grid gap-3 py-6 text-ink-700 sm:grid-cols-3 sm:gap-6">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 font-medium sm:justify-center">
            <Icon className="size-5 text-brand-600" />
            {text}
          </li>
        ))}
      </ul>
    </Container>
  )
}
