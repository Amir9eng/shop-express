import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
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
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity + quantity)
    if (itemInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id)
          return { ...cartProduct, quantity: cartProduct.quantity + quantity }
      })
      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} has been added to the cart.`)
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
        decQty,
        onAdd
      }}
    >
      {children}{' '}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
