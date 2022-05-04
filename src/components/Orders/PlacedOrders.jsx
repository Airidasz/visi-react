import React, { useEffect, useState } from 'react';
import './OrderStyles.scss';
import useApi from '../useApi';

import Order from './Order';

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
    <>
      <div className="page-title small my-2">Užsakymai</div>
      <div id="placed-orders" className={`categories ${className}`}>
        {orders &&
          orders.map((order) => (
            <Order
              order={order}
              key={order.codename}
              editable={editable}
              reset={() => setOrders(null)}
            />
          ))}
      </div>
    </>
  );
};

export default PlacedOrders;
