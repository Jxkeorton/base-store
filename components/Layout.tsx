import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

interface Children {
  children: React.ReactNode
}

const Layout:React.FC<Children> = ({children}) => {
  return (
    <div className='layout' >
      <Head>
        <title>BASE Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container' >
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
