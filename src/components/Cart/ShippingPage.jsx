import React, { useState, useEffect } from 'react';
import './CartStyles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../useCart';
import { useAuth } from '../useAuth';
import { addressModel } from '../Models';
import { buildAddress } from '../Extras';
import Info from '../Info';
import AddressInput from '../Extras/AddressInput';

const ShippingPage = () => {
  const { order, setOrder, getStep } = useCart();
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [address, setAddress] = useState('');

  useEffect(() => {
    order.address = null;
    setOrder({ ...order });

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

  return (
    <>
      <div className="label">Pristatymas</div>
      <AddressInput classname="buy-page-content" onChange={setAddress} />
      <div className="cart-items-footer mt-4">
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
