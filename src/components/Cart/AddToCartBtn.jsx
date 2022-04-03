import React from 'react';
import { useCart } from '../useCart';
import { useAuth } from '../useAuth';

const AddToCartBtn = ({className = '', product, quantity}) => {
  const {auth} = useAuth();
  const {addToCart} = useCart();

  if(!auth.permissions?.isBuyer)
    return <React.Fragment></React.Fragment>;

  return <button className={className} onClick={() => addToCart(product, quantity)}>Pridėti į krepšėlį</button>;
};

export default AddToCartBtn;