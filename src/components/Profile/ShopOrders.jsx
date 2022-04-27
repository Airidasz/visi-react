import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ProductPanel } from '../ShoppingCart';
import useApi from '../useApi';

const ShopOrders = () => {
  const { GetRequest } = useApi();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getShopOrders = async () => {
      const response = await GetRequest('shop/orders');
      if (!response) return;

      const data = await response.json();
      setOrders([...data]);
    };

    getShopOrders();
  }, []);

  return (
    <>
      <div className="page-title small my-2">Užsakytos prekės</div>
      <div className="card-style-1 p-2 px-3">
        {!orders ? (
          <Skeleton />
        ) : (
          orders.map((p, i) => (
            <ProductPanel key={i} cartProduct={p} removable={false} />
          ))
        )}
      </div>
    </>
  );
};

export default ShopOrders;
