import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './CartStyles.scss';
import { useCart } from '../useCart';
import { paymentOptions } from '../Options';
import { getOption } from '../Extras';
import { useAuth } from '../useAuth';
import { useAlert } from 'react-alert';

const BuyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const alert = useAlert();

  const { totalPrice, order } = useCart();

  useEffect(() => {
    if (auth.user.isSet && !auth.permissions.isBuyer) {
      alert.error('Tik žmonės su pirkėjų paskyromis gali pirkti prekes');
      navigate('/', { replace: true });
    }
  }, [auth.user.isSet]);

  useEffect(() => {
    if (location.pathname === '/pirkti')
      navigate('/pirkti/krepselis', { replace: true });
  }, [location]);

  return (
    <div id="cart-page" className="container mt-4">
      <div className="cart-items card-style-1 buy-page">
        <Outlet />
      </div>
      <div className="order-details">
        <div className="card-style-1 p-3 card-sticky">
          <div className="label">Užsakymas</div>
          <div className="label-2 mt-4">Pristatymas</div>
          <span>{order.address ?? 'Nepasirinkta'}</span>
          <div className="label-2 mt-4">Mokėjimas</div>
          <span>
            {getOption(paymentOptions, order?.paymentType)?.label ??
              'Nepasirinkta'}
          </span>
          <div className="label-2 mt-4">Suma</div>
          <div>{totalPrice(true)}</div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
