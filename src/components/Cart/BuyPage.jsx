import React , {useEffect,}from 'react';
import {Outlet, useNavigate,useLocation } from 'react-router-dom';
import './CartStyles.scss';
import { useCart } from '../useCart';

const BuyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/pirkti')
      navigate('/pirkti/krepselis', {replace:true});

  },[location]);

  const { totalPrice, order }= useCart();

  return <div className='page-view'>
    <div id="cart-page" className='container mt-4'>
      <div className='cart-items pt-2 card-style-1 p-4 pb-3 buy-page'>
        <Outlet/>
      </div>
      <div className='order-details'>
        <div className='card-style-1 p-3 card-sticky'>
          <div className='label'>Užsakymas</div>
          <div className='label-2 mt-4'>Pristatymas</div>
          <span>{order.shipping ?? 'Nepasirinkta'}</span>
          <div className='label-2 mt-4'>Mokėjimas</div>
          <span>{order.payment ?? 'Nepasirinkta'}</span>
          <div className='label-2 mt-4'>Suma</div>
          <div>{totalPrice(true)}</div>
        </div>
      </div>

    </div>
  </div>;
};

export default BuyPage;