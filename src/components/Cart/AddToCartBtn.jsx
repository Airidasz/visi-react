import React from 'react';
import { useCart } from '../useCart';
import { useAuth } from '../useAuth';
import Skeleton from 'react-loading-skeleton';

const AddToCartBtn = ({ className = '', product, quantity }) => {
  const { auth } = useAuth();
  const { addToCart } = useCart();

  if (!auth.permissions?.isBuyer) return <></>;

  if (!product)
    return <Skeleton style={{ width: '13rem', height: '2.375rem' }} />;

  return (
    <button
      type="button"
      className={className + ' tooltip-disabled'}
      onClick={() => addToCart(product, quantity)}
      disabled={product?.quantity === 0}
    >
      {product?.quantity > 0 ? 'Pridėti į krepšėlį' : 'Išpirkta'}
    </button>
  );
};

export default AddToCartBtn;
