import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [totalQuantity, setTotalQuantity] = useState()
  const [qty, setQty] = useState(1)

  const incQty = () => {
    setQty(prevQty => prevQty + 1)
  }

  const decQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }

  const onAdd = (product, quantity) => {
    const itemInCart = cartItems.find(item => item._id === product._id)
    if (itemInCart) {
      setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
      setTotalQuantity(prevTotalQuantity => prevTotalQuantity + quantity)
    }
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty
      }}
    >
      {children}{' '}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
