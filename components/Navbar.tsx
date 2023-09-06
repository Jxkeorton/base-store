'use client'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import Image from 'next/image';

import Cart from './Cart'
import Menu from './Menu'
import { useStateContext } from '@/context/StateContext'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities, setShowMenu, showMenu} = useStateContext();

  const handleButtonClick = () => {
    // Your logic for handling the button click goes here
    console.log('Button clicked!');
  };

  return (
    <div className='navbar-container' >
      <p className='logo' >
          <Link href='/'>
            <Image
              height={200}
              width={200}
              priority
              src='/logo-svg.svg'
              alt='logo'
            />
          </Link>
      </p>
      <div className='icons-container' >
        <button type='button' className='cart-icon' onClick={() => setShowCart(true)} >
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        <button type='button' className='cart-icon' onClick={() => setShowMenu(true)} >
          <FaBars />
        </button>
      </div>
      

      {showCart && <Cart />}
      {showMenu && <Menu />}
    </div>
  );
};

export default Navbar
