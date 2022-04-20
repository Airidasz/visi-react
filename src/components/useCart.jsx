/* eslint-disable no-empty */
import { useState, useEffect } from 'react';
import { useContext, createContext, createElement, useMemo } from 'react';
import { roundDecimal } from './Extras';

const CartStore = () => {
  const initState = [];

  const [cart, setInternalCart] = useState(initState);
  const [order, setOrder] = useState({
    orderedProducts: null,
    shippingType: null,
    address: null,
    paymentType: null,
    note: null,
    user: {
      temporary: null,
      email: null,
    },
  });

  useEffect(() => {
    var cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      try {
        const cart = JSON.parse(cartFromStorage);
        setCart(cart);
      } catch {}
    }
  }, []);

  const getStep = () => {
    let step = 0;

    if (order?.orderedProducts?.length > 0) step += 1;

    if (order?.user?.email) step += 1;

    if (order?.shippingType && order?.address) step += 1;

    if (order?.paymentType) step += 1;

    return step;
  };

  const setCart = (arr) => {
    localStorage.setItem('cart', JSON.stringify(arr));
    setInternalCart(arr);
  };

  const getProductByCodename = (codename) =>
    cart.find((c) => c.product.codename == codename);

  const addToCart = (product, quantity) => {
    if (product.quantity <= 0) return;

    const productInCart = getProductByCodename(product.codename);

    if (!productInCart) {
      var cartProduct = { product, quantity };

      setCart([...cart, cartProduct]);
      return;
    }

    productInCart.quantity += quantity;

    if (productInCart.quantity > productInCart.product.quantity)
      productInCart.quantity = productInCart.product.quantity;

    setCart([...cart]);
  };
  const removeFromCart = (cartProduct, quantity) => {
    const productInCart = getProductByCodename(cartProduct.product.codename);
    if (!productInCart) {
      return;
    }

    productInCart.quantity -= quantity;
    setCart([...cart]);

    if (productInCart.quantity <= 0) {
      const filteredCart = cart.filter(
        (c) => c.product.codename != cartProduct.product.codename
      );
      setCart([...filteredCart]);
    }
  };

  const totalPrice = (useSign = false) =>
    roundDecimal(cart.map((p) => productPrice(p)).reduce((p, c) => p + c, 0)) +
    (useSign && '€');

  const productPrice = (p, useSign = false) =>
    roundDecimal(Number(p.product.price) * Number(p.quantity)) +
    (useSign && '€');

  return {
    cart,
    setCart,
    order,
    setOrder,
    addToCart,
    removeFromCart,
    totalPrice,
    productPrice,
    getStep,
  };
};

export const CartContext = createContext(null);

export const useCart = () => {
  const store = useContext(CartContext);
  if (!store) {
    throw new Error('cartStore must be used within CartProvider');
  }

  return store;
};

export const CartProvider = ({ children }) => {
  const {
    cart,
    setCart,
    order,
    setOrder,
    addToCart,
    removeFromCart,
    totalPrice,
    productPrice,
    getStep,
  } = CartStore();
  const memo = useMemo(
    () => ({
      cart,
      setCart,
      order,
      setOrder,
      addToCart,
      removeFromCart,
      totalPrice,
      productPrice,
      getStep,
    }),
    [
      cart,
      setCart,
      order,
      setOrder,
      addToCart,
      removeFromCart,
      totalPrice,
      productPrice,
      getStep,
    ]
  );

  return createElement(CartContext.Provider, { value: memo }, children);
};
