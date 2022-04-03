import React from 'react';
import { useEffect } from 'react';
import { useCart } from '../useCart';
import { Link } from 'react-router-dom';

const PurchaseCompletePage = () => {
  const {setCart} = useCart();

  useEffect(() =>{
    setCart([]);
  },[]);


  return (
    <div className='page-view'>
      <div className='label mb-3 mt-4 d-flex justify-content-center h-100'>Užsakymas sėkmingai atliktas</div>
      <Link className='btn-dark' to="/">Grįžti į pagrindinį puslapį</Link>
    </div>
  );
};

export default PurchaseCompletePage;