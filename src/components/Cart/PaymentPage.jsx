import React, { useState, useEffect } from 'react';
import './CartStyles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../useCart';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { order, setOrder, getStep } = useCart();

  const [paymentType, setPaymentMethod] = useState(false);

  useEffect(() => {
    if (getStep() < 3) navigate('/pirkti/siuntimas', { replace: true });
  }, []);

  useEffect(() => {
    setOrder({ ...order, paymentType: paymentType });
  }, [paymentType]);

  return (
    <>
      <div className="label mb-3 mt-2">Mokėjimas</div>
      <div className="buy-page-content">
        <input
          type="checkbox"
          id="shipping"
          onChange={(e) => setPaymentMethod(e.target.checked ? 1 : 0)}
        />
        <label htmlFor="shipping" className="ms-2">
          Mokėti pristatymo metu
        </label>
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
