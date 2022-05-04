import React, { useEffect } from 'react';
import './CartStyles.scss';
import { useNavigate, Link } from 'react-router-dom';
import useApi from '../useApi';
import { useCart } from '../useCart';
import { ProductPanel } from '../ShoppingCart';
import { getOption } from '../Extras';
import { paymentOptions } from '../Options';

import Info from '../Info';

const OverviewPage = () => {
  const navigate = useNavigate();
  const { PostRequest } = useApi();

  const { order, getStep, setOrder } = useCart();

  useEffect(() => {
    if (getStep() < 4) navigate('/pirkti/siuntimas', { replace: true });
  }, []);

  const placeOrder = async () => {
    const body = JSON.stringify(order);

    const response = await PostRequest('orders', body, false);
    if (!response) return;

    let url = '/pirkti/pavyko';
    const json = await response.json();

    if (json.paymentType === 3)
      url = `${url}?uzsakymas=${json.codename}&suma=${json.totalPrice}`;

    navigate(url, { replace: true });
  };

  return (
    <>
      <div className="label">Peržiūra</div>
      <div className="buy-page-content">
        <div>
          <div className="label-2 mt-2">Užsakovas</div>
          Elektroninis paštas: <b>{order.user.email}</b>
        </div>
        <div>
          <div className="label-2 mt-4">Prekės</div>
          {order.orderedProducts &&
            order.orderedProducts.map((p) => (
              <ProductPanel
                key={p.product.codename}
                cartProduct={p}
                removable={false}
              />
            ))}
        </div>
        <div>
          <div className="label-2 mt-4">Pristatymas</div>
          {order.address}
        </div>
        <div>
          <div className="label-2 mt-4">Mokėjimas</div>
          {getOption(paymentOptions, order.paymentType)?.label}
        </div>
        <div>
          <div className="label-2 mt-4">
            <input
              id="cancel-missing"
              className="me-2"
              type="checkbox"
              onChange={(e) =>
                setOrder({
                  ...order,
                  cancelIfMissing: e.target.checked,
                })
              }
            ></input>
            <label htmlFor="cancel-missing">
              Atšaukti negavus prekių iš pardavėjo
            </label>
            <Info
              title="Pažymėjus šį langelį jūsų užsakymas bus atšauktas jei bent vienas iš pardavėjų nepristatys savo prekių."
              placement="top"
              className="ms-1 gray"
            />
          </div>
        </div>
        <div>
          <div className="label-2 mt-4">Papildoma žinutė</div>
          <textarea
            onChange={(e) => setOrder({ ...order, note: e.target.value })}
          />
        </div>
      </div>
      <div className="cart-items-footer  mt-3">
        <Link to={-1} className="btn btn-dark-reverse w-25">
          Atgal
        </Link>
        <button className="btn btn-dark w-50" onClick={placeOrder}>
          Baigti užsakymą
        </button>
      </div>
    </>
  );
};

export default OverviewPage;
