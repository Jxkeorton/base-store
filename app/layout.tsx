import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import CartHydrator from '@/components/CartHydrator'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
// Display face for headings in the redesign (phase 4); loaded now so the tokens are in place.
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
})

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://www.traversebase.co.uk'

export const viewport: Viewport = { themeColor: '#324d67' }

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Traverse Base', template: '%s | Traverse Base' },
  description:
    'The first UK BASE jumping store: tailgates, bungees, closing loops, canopies and used gear.',
  openGraph: { siteName: 'Traverse Base', locale: 'en_GB', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable}`}>
        <CartHydrator />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
