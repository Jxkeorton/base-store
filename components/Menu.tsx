import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import Link from 'next/link'

import { useStateContext } from '@/context/StateContext'

const Menu = () => {
    const { setShowMenu } = useStateContext()

  return (
    <div className='cart-wrapper' >
        <div className='cart-container' >
            <button 
            type='button' 
            className='cart-heading' 
            onClick={(() => setShowMenu(false))} 
            >
                <AiOutlineLeft />
            </button>

            <div className='empty-cart' >
                <ul className='menu-list'>
                    <li>
                        <Link href='/' onClick={(() => setShowMenu(false))} >
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/used-gear' onClick={() => setShowMenu(false)} >
                            <p>Used Gear</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/contact' onClick={() => setShowMenu(false)} >
                            <p>Contact</p> 
                        </Link>
                    </li>
                    <li>
                        <Link href='/about' onClick={() => setShowMenu(false)} >
                            <p>About</p>
                        </Link>
                    </li>
                    
                </ul>
            </div>

        </div>
    </div>
  )
}

export default Menu
