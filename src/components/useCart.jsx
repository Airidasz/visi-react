/* eslint-disable no-empty */
import { useState, useEffect } from 'react';
import { useContext, createContext, createElement, useMemo } from 'react';
import { roundDecimal } from './Extras';

const CartStore = () => {
  const initState = [];
  const [cart, setInternalCart] = useState(initState);

  const setCart = (arr) => {
    localStorage.setItem('cart', JSON.stringify(arr));
    setInternalCart(arr);
  };

  useEffect(() => {
    var cartFromStorage = localStorage.getItem('cart');
    if(cartFromStorage){
      try {
        const cart = JSON.parse(cartFromStorage);
        setCart(cart);
      }
      catch {}
    }
  },[]);

  const addToCart = (product, quantity) => {
    const productInCart = cart.find(p => p.codename == product.codename);
    if(!productInCart) {
      product.selectedQuantity = quantity;
      setCart([...cart, product]);
      return;
    }

    productInCart.selectedQuantity += quantity;

    if(productInCart.selectedQuantity > productInCart.quantity)
      productInCart.quantity = productInCart.selectedQuantity;

    setCart([...cart]);

  };
  const removeFromCart = (product, quantity) => {
    const productInCart = cart.find(p => p.codename == product.codename);
    if(!productInCart) {
      return;
    }

    productInCart.selectedQuantity -= quantity;
    setCart([...cart]);

    if(productInCart.selectedQuantity <= 0) {
      const filteredCart = cart.filter(p => p.codename != product.codename);
      setCart([...filteredCart]);
    }
  };

  const totalPrice = (useSign = false) => roundDecimal(cart.map(p => productPrice(p)).reduce((p,c) => p+c, 0)) + (useSign && '€');

  const productPrice = (p, useSign = false) => roundDecimal(Number(p.amount) * Number(p.selectedQuantity))  + (useSign && '€');

  return { cart, setCart, addToCart, removeFromCart, totalPrice, productPrice};
};

export const StoreContext = createContext(null);

export const useCart = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('cartStore must be used within CartProvider');
  }

  return store;
};

export const CartProvider = ({ children }) => {
  const { cart, setCart, addToCart, removeFromCart, totalPrice, productPrice } = CartStore();
  const memo = useMemo(() => ({ cart, setCart, addToCart, removeFromCart, totalPrice, productPrice }), [cart, setCart, addToCart, removeFromCart, totalPrice, productPrice]);
  return createElement(StoreContext.Provider, { value: memo }, children);
};