'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { ProductData } from '@/app/page'

  interface AppContext {
    showCart: boolean;
    cartItems: ProductData[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: ProductData, quantity: number) => void; 
    setShowCart: (value: boolean) => void;
    toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void;
    onRemove: (product: ProductData) => void;
    setCartItems: React.Dispatch<React.SetStateAction<ProductData[]>>;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
  }

  interface Children {
    children: React.ReactNode
    }
  
  const Context = createContext<AppContext | null>(null);
  

export const StateContext:React.FC<Children> = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState<ProductData[]>([]); 
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState<number>(0);
    const [qty, setQty] = useState<number>(1);

    const onAdd = (product: ProductData, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id ) return {
                    ...cartProduct, 
                    quantity: cartProduct.quantity ? cartProduct.quantity + quantity : quantity,
                }
            })
            const filteredUpdatedCartItems = updatedCartItems.filter((cartProduct) => cartProduct !== undefined) as ProductData[];

            setCartItems(filteredUpdatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} added to the cart`);
    }

    const onRemove = (product: ProductData) => {
        const foundCartItem = cartItems.find((item) => item._id === product._id);
        if (!foundCartItem) {
            return; 
        }
    
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundCartItem.price * (foundCartItem.quantity || 0)));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - (foundCartItem.quantity || 0));
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
        const updatedCartItems = cartItems.map((cartProduct) => {
          if (cartProduct._id === id) {
            const updatedQuantity = value === 'inc' ? (cartProduct.quantity || 0) + 1 : Math.max((cartProduct.quantity || 1) - 1, 1);
            return { ...cartProduct, quantity: updatedQuantity };
          }
          return cartProduct;
        });
      
        const updatedTotalQuantities = updatedCartItems.reduce((total, cartProduct) => total + (cartProduct.quantity || 0), 0);
        const updatedTotalPrice = updatedCartItems.reduce((total, cartProduct) => total + (cartProduct.price * (cartProduct.quantity || 0)), 0);
      
        setCartItems(updatedCartItems);
        setTotalQuantities(updatedTotalQuantities);
        setTotalPrice(updatedTotalPrice);
      };
      

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
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useStateContext must be used within a StateContext Provider');
    }
    return context;
  };