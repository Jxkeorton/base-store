import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer-container' >
      <p>2023 all rights reserved</p>
      <p className='icons' >
        <Link aria-label='visit instagram page' href='https://www.instagram.com/traversebase/' >
          <AiFillInstagram />
        </Link>
      </p>
    </div>
  )
}

export default Footer
