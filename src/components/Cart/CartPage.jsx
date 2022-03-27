import React from 'react';
import './CartStyles.scss';
import { ProductPanel } from '../ShoppingCart';
import { useCart } from '../useCart';
import { useState } from 'react';
import Login from '../Auth/Login';
import { useStore } from '../useStore';
import { useOutlet } from 'react-router-dom';

const CartPage = () => {
  const {cart , totalPrice }= useCart();
  const outlet = useOutlet();
  const {store} = useStore();

  const [page, setPage] = useState('cart');

  const SelectedPage = () => {
    switch(page) {

    case 'login':
      if(store.user.isSet) {
        setPage('shipping');
        break;
      }

      return (
        <React.Fragment>
          <div className='label mb-3 mt-2'>Prisijungimas</div>
          <div>
            <Login />

          </div>
          <div>
            <button className='btn-dark mt-3 w-100' onClick={buttonAction}>Registruotis</button>

            <button className='btn-dark-reverse mt-3 w-100' onClick={buttonAction}>Pirkti be registracijos</button>
          </div>
        </React.Fragment>
      );

    case 'shipping':
      return (<div></div>);
    
    default:
      return (
        <React.Fragment>
          <div className='label mb-3 mt-2'>Prekės</div>
          {cart.map(p => (<ProductPanel key={p.codename} product={p}/>))}
        </React.Fragment>
      );
    }
  };

  const buttonAction = () => {
    switch(page)  {
    default:
      return setPage('login');
    }
  };

  return <div className='page-view'>
    <div id="cart-page" className='container mt-4'>
      <div className='cart-items p-2 card-style-1 px-4'>
        <SelectedPage />
      </div>

      <div className='card-style-1 p-3 card-sticky order-details'>
        <div className='label'>Užsakymas</div>
        <div className='label-2 mt-4'>Pristatymas</div>
        <span>Bus, nebijokit</span>
        <div className='label-2 mt-4'>Suma</div>
        <div>{totalPrice(true)}</div>
        <div><button className='btn-dark mt-3 w-100' onClick={buttonAction}>Toliau</button></div>
      </div>

    </div>
  </div>;
};

export default CartPage;