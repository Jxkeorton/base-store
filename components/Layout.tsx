import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

interface Children {
  children: React.ReactNode
}

const Layout:React.FC<Children> = ({children}) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className='navbar-subtitle' ><p>The First UK BASE Store - More products soon</p></div>
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
