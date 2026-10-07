import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import CartHydrator from '@/components/CartHydrator'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://www.traversebase.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Traverse Base', template: '%s | Traverse Base' },
  description:
    'The first UK BASE jumping store: tailgates, bungees, closing loops, canopies and used gear.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartHydrator />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
