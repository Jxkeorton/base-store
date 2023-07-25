import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

interface Children {
  children: React.ReactNode
}

const Layout:React.FC<Children> = ({children}) => {
  return (
    <div className='layout' >
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
