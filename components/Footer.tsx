import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer-container' >
      <p>2023 all rights reserved</p>
      <p className='icons' >
        <Link href='https://www.instagram.com/jakeorton_/' >
          <AiFillInstagram />
        </Link>
      </p>
    </div>
  )
}

export default Footer
