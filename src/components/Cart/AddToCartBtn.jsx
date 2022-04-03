import React from 'react';
import { useCart } from '../useCart';
import { useStore } from '../useStore';

const AddToCartBtn = ({className = '', product, quantity}) => {
  const {store} = useStore();
  const {addToCart} = useCart();

  if(!store.permissions?.isBuyer)
    return <React.Fragment></React.Fragment>;

  return <button className={className} onClick={() => addToCart(product, quantity)}>Pridėti į krepšėlį</button>;
};

export default AddToCartBtn;