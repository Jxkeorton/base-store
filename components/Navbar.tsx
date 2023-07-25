'use client'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

const Navbar = () => {

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

      <button type='button' className='cart-icon' onClick={handleButtonClick} >
        <AiOutlineShopping />
        <span className='cart-item-qty'>1</span>
      </button>
    </div>
  );
};

export default Navbar
