import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSheet from '@/components/CartSheet'
import Container from '@/components/Container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="bg-ink-900 py-2 text-center text-sm font-medium text-white">
        <Container>The first UK BASE store. More products soon.</Container>
      </div>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartSheet />
    </>
  )
}
