import React, { useState, useEffect } from 'react';
import './CartStyles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';

import { useCart } from '../useCart';
import { useAuth } from '../useAuth';
import { addressModel } from '../Models';
import { buildAddress } from '../Extras';

const ShippingPage = () => {
  const { order, setOrder, getStep } = useCart();
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [address, setAddress] = useState({ ...addressModel });

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

  const addressFilled = () =>
    address.city && address.postalCode && address.street;

  const onClick = () => {
    order.address = buildAddress(address);
    setOrder({ ...order });
  };

  return (
    <>
      <div className="label mb-3 mt-2">Pristatymas</div>
      <div className="buy-page-content">
        <div>
          <div className="label-3 mt-2">
            Vietovė{' '}
            <Tooltip title="Miesto arba kaimo pavadinimas" placement="top">
              <Icon icon="material-symbols:info-rounded" className="ms-1" />
            </Tooltip>
          </div>
          <input
            type="text"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            style={{ width: '10rem' }}
          />
        </div>
        <div className="d-flex">
          <div>
            <div className="label-3 mt-2">Pašto kodas</div>
            <input
              type="text"
              onChange={(e) =>
                setAddress({ ...address, postalCode: e.target.value })
              }
              style={{ width: '6rem' }}
            />
          </div>
          <div className="ms-2">
            <div className="label-3 mt-2">Gatvė, namo numeris</div>
            <input
              type="text"
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              style={{ width: '15rem' }}
            />
          </div>
        </div>
      </div>
      <div className="cart-items-footer mt-4">
        <Link to={-1} className="btn btn-dark-reverse w-25">
          Atgal
        </Link>
        <Link
          onClick={onClick}
          to="/pirkti/mokejimas"
          className={`btn btn-dark w-50${!addressFilled() ? ' disabled' : ''}`}
        >
          Toliau
        </Link>
      </div>
    </>
  );
};

export default ShippingPage;
