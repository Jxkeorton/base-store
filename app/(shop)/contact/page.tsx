import React from 'react';
import { AiTwotonePhone } from 'react-icons/ai'

const Contact = () => {

  return (
    <div className='contact-container'>
        <div>
            <h1>CONTACT</h1>
            <p className='contact-title-text' >Lets talk BASE</p>
            <br />
            <div className='contact-text-container' >
                <AiTwotonePhone  className='phone-icon' />
                <p>Phone: (+44) 7986273803</p>
                <p>Email: <a href='mailto:traversebase@gmail.com' className='email' >Traversebase@gmail.com</a></p>
            </div>
            
        </div> 
    </div>
  )
}

export default Contact
