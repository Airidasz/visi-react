import React from 'react';
import { useCart } from '../useCart';

const AddToCartBtn = ({className = '', product, quantity}) => {
  const {addToCart} = useCart();

  return <button className={className} onClick={() => addToCart(product, quantity)}>Pridėti į krepšėlį</button>;
};

export default AddToCartBtn;