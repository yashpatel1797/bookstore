import { getRequestDataFromServer } from "utilities";
import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { cartReducer } from 'reducer';

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartState, cartDispatch] = useReducer(cartReducer, {
      productsData: [],
    })

  const { productsData } = cartState
  useEffect(() => {
    getRequestDataFromServer("http://localhost:3000/api/products", cartDispatch)
  }, [])
  return(
    <CartContext.Provider value={{ productsData, cartDispatch }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext);

export { useCart, CartProvider }
