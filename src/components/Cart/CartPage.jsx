import React from 'react';
import './CartStyles.scss';
import { ProductPanel } from '../ShoppingCart';
import { useCart } from '../useCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';

const CartPage = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { cart, order, setOrder } = useCart();

  const setProducts = () => {
    order.orderedProducts = cart;
    setOrder({ ...order });

    navigate(`/pirkti/${auth.user.isSet ? 'siuntimas' : 'prisijungti'}`);
  };

  return (
    <>
      <div className="label mb-3 mt-2">Prekės</div>
      {cart.length > 0 ? (
        <>
          <div className="buy-page-content">
            {cart.map((p) => (
              <ProductPanel key={p.product.codename} cartProduct={p} />
            ))}
          </div>
          <div className="cart-items-footer">
            <div></div>
            <button className="btn btn-dark w-50" onClick={setProducts} >
              Toliau
            </button>
          </div>
        </>
      ) : (
        <div>Prekių nėra</div>
      )}
    </>
  );
};

export default CartPage;
