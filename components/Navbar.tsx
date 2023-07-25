'use client'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart'
import { useStateContext } from '@/context/StateContext'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();

  const handleButtonClick = () => {
    // Your logic for handling the button click goes here
    console.log('Button clicked!');
  };

  return (
    <div className='navbar-container' >
      <p className='logo' >
        <Link href='/' >
          BASE Gear
        </Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)} >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar
