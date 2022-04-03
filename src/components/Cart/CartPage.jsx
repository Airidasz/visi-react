import React from 'react';
import './CartStyles.scss';
import { ProductPanel } from '../ShoppingCart';
import { useCart } from '../useCart';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../useStore';

const CartPage = () => {
  const navigate = useNavigate();

  const { store } = useStore();
  const { cart, order, setOrder }= useCart();

  const setProducts = () => {
    order.orderedProducts = cart;
    setOrder({...order});

    navigate(`/pirkti/${store.user.isSet ? 'siuntimas' : 'prisijungti'}`);
  };

  return (
    <React.Fragment>
      <div className='label mb-3 mt-2'>Prekės</div>
      {cart.length > 0 ?  (
        <React.Fragment>
          <div className='buy-page-content'>
            {cart.map(p => (<ProductPanel key={p.product.codename} cartProduct={p}/>))}
          </div>
          <div className='cart-items-footer'>
            <div></div>
            <button className='btn btn-dark w-50' onClick={setProducts}>Toliau</button>
          </div>
        </React.Fragment>
      ) : (<div>
        Prekių nėra
      </div>)}
    </React.Fragment>
  );
};

export default CartPage;