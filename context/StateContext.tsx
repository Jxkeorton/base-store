'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface AppContext {
    showCart: boolean;
    cartItems: {
      name: string;
    }[];
    totalPrice: string | undefined;
    totalQuantities: number | undefined;
    qty: number;
    incQty: () => void; 
    decQty: () => void; 
  }
  
  const Context = createContext<AppContext | null>(null);

interface Children {
    children: React.ReactNode
  }
  

export const StateContext:React.FC<Children> = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(undefined);
    const [totalQuantities, setTotalQuantities] = useState(undefined);
    const [qty, setQty] = useState(1);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value= {{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
            }}
        >
            {children}
        </Context.Provider>
    )
}