import React, { useState, useEffect } from 'react';
import './CartStyles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../useCart';
import { useAuth } from '../useAuth';

const ShippingPage = () => {
  const { order, setOrder, getStep } = useCart();
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [shippingType, setShippingType] = useState(0);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (getStep() < 1) navigate('/pirkti/krepselis', { replace: true });

    if (auth.user.isSet) {
      order.user = auth.user;
      order.user.temporary = false;

      setOrder({ ...order });
    } else if (!order.user.email) {
      navigate('/pirkti/prisijungti', { replace: true });
    }
  }, []);

  const onClick = () => {
    order.address = address;
    setOrder({ ...order });
  };

  useEffect(() => {
    order.shippingType = shippingType;
    setOrder({ ...order });
  }, [shippingType]);

  return (
    <>
      <div className="label mb-3 mt-2">Pristatymas</div>
      <div className="buy-page-content">
        <div>
          <div>
            <input
              type="checkbox"
              id="shipping"
              onChange={(e) => setShippingType(e.target.checked ? 1 : 0)}
            />

            <label htmlFor="shipping" className="ms-2">
              Pristatymas (y) namus
            </label>
          </div>
          {shippingType === 1 && (
            <>
              <div className="label-3 mt-2">Adresas</div>
              <input type="text" onChange={(e) => setAddress(e.target.value)} />
            </>
          )}
        </div>
      </div>
      <div className="cart-items-footer">
        <Link to={-1} className="btn btn-dark-reverse w-25">
          Atgal
        </Link>
        <Link
          onClick={onClick}
          to="/pirkti/mokejimas"
          className={`btn btn-dark w-50${!address ? ' disabled' : ''}`}
        >
          Toliau
        </Link>
      </div>
    </>
  );
};

export default ShippingPage;
