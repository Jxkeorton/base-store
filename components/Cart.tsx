'use client'
import React, {useRef, useState} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'


import { selectSubtotal, selectTotalQuantity, useCartStore } from '@/lib/cart-store'
import { urlFor } from '@/lib/sanity/image'

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const totalPrice = useCartStore(selectSubtotal);
  const totalQuantities = useCartStore(selectTotalQuantity);
  const setShowCart = useCartStore((s) => s.setOpen);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const onRemove = useCartStore((s) => s.remove);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems.map((i) => ({ id: i._id, quantity: i.quantity })) }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        toast.error(data.error ?? 'Something went wrong. Please try again.');
        setCheckingOut(false);
        return;
      }

      toast.loading('Redirecting...');
      window.location.href = data.url;
    } catch {
      toast.error('Could not reach checkout. Please try again.');
      setCheckingOut(false);
    }
  }

  return (
    <div className='cart-wrapper' ref={cartRef} >
      <div className='cart-container' >
        <button 
          type='button' 
          className='cart-heading' 
          onClick={(() => setShowCart(false))} 
        >
          <AiOutlineLeft />
          <span className='heading' >Your Cart</span>
          <span className='cart-num-items' >({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href='/' >
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container' >
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id} >
              <img src={urlFor(item.image).width(360).url()} alt={item.name} className='cart-product-image' />
              <div className='item-desc' >
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>£{item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc' >
                        <span className='minus' onClick={() => setQuantity(item._id, item.quantity - 1)} ><AiOutlineMinus /></span>
                        <span className='num'  >{item.quantity}</span>
                        <span className='plus' onClick={() => setQuantity(item._id, item.quantity + 1)} ><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item._id)} >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total' >
              <h3>Subtotal: </h3>
              <h3>£{totalPrice}</h3>
            </div>
            <div className='btn-container' >
              <button type='button' className='btn' onClick={handleCheckout} disabled={checkingOut} >
                {checkingOut ? 'Please wait...' : 'Pay with Stripe'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
