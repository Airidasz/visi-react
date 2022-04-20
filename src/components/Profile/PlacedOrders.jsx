import React, { useEffect, useState } from 'react';
import './ProfileStyles.scss';
import { ProductPanel } from '../ShoppingCart';
import useApi from '../useApi';
import Select from 'react-select';
import { orderOptions } from '../Options';

export const OrderStatus = ({ status }) => {
  const [info, setInfo] = useState({ text: '', color: '' });

  useEffect(() => {
    switch (status) {
      case 1:
        info.text = 'Užsakytas';
        info.color = '#f3b748';
        break;
      case 2:
        info.text = 'Patvirtintas';
        info.color = '#30b679';
        break;
      case 3:
        info.text = 'Išsiųstas';
        info.color = '#a848f3';
        break;
      case 4:
        info.text = 'Pristatytas';
        info.color = '#78a52f';
        break;
      default:
        info.text = 'Klaida';
        info.color = '#e72727';
        break;
    }

    setInfo({ ...info });
  }, [status]);

  return (
    <div className="category select-none" style={{ background: info.color }}>
      {info.text}
    </div>
  );
};

const Order = ({ order, editable = false, setOrders = () => {} }) => {
  const { PutRequest } = useApi();

  const [editing, setEditing] = useState(false);

  const [status, setStatus] = useState(
    orderOptions.find((x) => x.value == order.status)
  );

  const onChange = async (o) => {
    setStatus(o);
    // // todo: set order status
    // setEditing(false);

    const body = JSON.stringify({
      status: Number(o.value),
      codename: order.codename,
    });

    const response = await PutRequest('orders', body);
    if (!response) return;

    setOrders(null);
  };

  const onClick = () => {
    if (editable) setEditing(true);
  };

  return (
    <div className="order card-style-1">
      <div className="order-info">
        <div>
          <div className="label-3 mb-1">Užsakymo kodas</div>
          {order.codename}
        </div>
        <div className="categories">
          <div className="label-3 mb-1">Užsakymo būsena</div>
          {!editing ? (
            <div className={editable ? 'pointer' : ''} onClick={onClick}>
              <OrderStatus status={order.status} />
            </div>
          ) : (
            <Select
              className="w-100"
              value={status}
              options={orderOptions}
              onChange={onChange}
            />
          )}
        </div>
        <div>
          <div className="label-3 mb-1">Žinutė vežėjams</div>
          {order.note || 'nėra'}
        </div>
      </div>
      <div>
        <div className="label-3 mb-1">Prekės</div>
        {order.orderedProducts.map((p, j) => (
          <ProductPanel key={j} cartProduct={p} removable={false} />
        ))}
      </div>
    </div>
  );
};

const PlacedOrders = ({ className = '', editable = false }) => {
  const { GetRequest } = useApi();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getPersonOrders = async () => {
      const response = await GetRequest('orders');
      if (!response) return;

      const data = await response.json();
      setOrders([...data]);
    };
    if (!orders) getPersonOrders();
  }, [orders]);

  return (
    <div id="placed-orders" className={`categories ${className}`}>
      {orders &&
        orders.map((order) => (
          <Order
            order={order}
            key={order.codename}
            editable={editable}
            setOrders={setOrders}
          />
        ))}
    </div>
  );
};

export default PlacedOrders;
