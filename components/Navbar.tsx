'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image';
import Logo from '../dist/logo-png.webp'

import Cart from './Cart'
import { useStateContext } from '@/context/StateContext'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities } = useStateContext();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleItemClick = () => {
    if (isSmallScreen) {
      setIsSmallScreen(false); // Close the navbar list
    }
  };

  return (
    <div className='nav-div'>
      <div className='identity'>
        <p>
          <Link href='/'>
            <Image
              height={100}
              priority
              src={Logo}
              alt='logo'
              className='fa-logo'
            />
          </Link>
        </p>
        <div className='navbar-icon-container'>
          <a
            className="hamburger"
            aria-label="Open main menu"
            onClick={() => setIsSmallScreen(!isSmallScreen)}
          >
            {isSmallScreen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </a>
          <button
            type='button'
            className='cart-icon'
            aria-label='view shopping cart'
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping />
            <span className='cart-item-qty'>{totalQuantities}</span>
          </button>
        </div>
      </div>

      <nav id="navbar" className={`navbar ${isSmallScreen ? 'active' : ''}`}>
        <ul className='menu-list'>
          <li onClick={handleItemClick}>
            <Link href='/'>
              <span>Home</span>
            </Link>
          </li>
          <li onClick={handleItemClick}>
            <Link href='/canopies'>
              <span>Canopies</span>
            </Link>
          </li>
          <li onClick={handleItemClick}>
            <Link href='/used-gear'>
              <span>Used Gear</span>
            </Link>
          </li>
          <li onClick={handleItemClick}>
            <Link href='/contact'>
              <span>Contact</span> 
            </Link>
          </li>
          <li onClick={handleItemClick}>
            <Link href='/about'>
              <span>About</span>
            </Link>
          </li>         
        </ul>
      </nav>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
