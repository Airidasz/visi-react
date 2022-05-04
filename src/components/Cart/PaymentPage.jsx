import React, { useState, useEffect } from 'react';
import './CartStyles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../useCart';
import { paymentOptions } from '../Options';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { order, setOrder, getStep } = useCart();

  const [paymentType, setPaymentMethod] = useState(false);

  useEffect(() => {
    setOrder({ ...order, paymentType: null });
    if (getStep() < 3) navigate('/pirkti/siuntimas', { replace: true });
  }, []);

  useEffect(() => {
    setOrder({ ...order, paymentType: paymentType });
  }, [paymentType]);

  return (
    <>
      <div className="label">Mokėjimas</div>
      <div className="buy-page-content">
        {paymentOptions.map((o) => (
          <div key={o.value} className="d-flex aling-items-center">
            <input
              type="checkbox"
              checked={paymentType === o.value}
              id={`shipping_${o.value}`}
              onChange={(e) => setPaymentMethod(e.target.checked ? o.value : 0)}
            />
            <label htmlFor={`shipping_${o.value}`} className="ms-2">
              {o.label}
            </label>
            {o.info && (
              <Tooltip title={o.info}>
                <Icon
                  icon="material-symbols:info-rounded"
                  className="ms-1 gray"
                />
              </Tooltip>
            )}
          </div>
        ))}
      </div>
      <div className="cart-items-footer">
        <Link to={-1} className="btn btn-dark-reverse w-25">
          Atgal
        </Link>
        <Link
          to="/pirkti/perziura"
          className={`btn btn-dark w-50${!paymentType ? ' disabled' : ''}`}
        >
          Toliau
        </Link>
      </div>
    </>
  );
};

export default PaymentPage;
