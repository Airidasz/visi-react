import React, { useEffect, useState } from 'react';
import useApi from '../useApi';
import { toShortDateString } from '../Extras';
import ShopOrder from './ShopOrder';

const ShopOrders = () => {
  const { GetRequest } = useApi();
  const [orders, setOrders] = useState(null);

  const [tab, setTab] = useState(0);

  const groupByPickupDate = (data = []) => {
    const grouped = [{}, { Visi: [] }];

    data.forEach((o) => {
      if (o.order.status < 3) {
        let pickupDate = 'Nepriskirta';

        if (o.order.pickupDate) {
          try {
            const date = new Date(o.order.pickupDate);
            pickupDate = toShortDateString(date);
          } catch {}
        }

        if (!grouped[0][pickupDate]) {
          grouped[0][pickupDate] = [];
        }

        grouped[0][pickupDate] = [...grouped[0][pickupDate], o];
      } else {
        grouped[1].Visi = [...grouped[1].Visi, o];
      }
    });

    setOrders({ ...grouped });
  };

  useEffect(() => {
    const getShopOrders = async () => {
      const response = await GetRequest('shop/orders');
      if (!response) return;

      const data = await response.json();
      groupByPickupDate(data);
    };

    if (orders) return;

    getShopOrders();
  }, [orders]);

  if (!orders) return <></>;

  return (
    <>
      <div className="page-title small my-2">Užsakytos prekės</div>
      <div className="actions mb-2 d-flex">
        <div
          className={`btn btn-tab${tab === 0 ? ' active' : ''}`}
          onClick={() => setTab(0)}
        >
          Vykdomi
        </div>
        <div
          className={`btn btn-tab ms-2${tab === 1 ? ' active' : ''}`}
          onClick={() => setTab(1)}
        >
          Užbaigti
        </div>
      </div>
      <div className="shop-order">
        {Object.entries(orders[tab]).map(([k, or]) => (
          <div key={k}>
            {tab === 0 && (
              <>
                <div className="label-3">Paėmimo data</div>
                <div className="shop-order-title">{k}</div>
              </>
            )}

            {or?.length > 0 ? (
              or.map((o) => (
                <div className="card-style-1 p-2 px-3" key={o.id}>
                  <ShopOrder order={o} reset={() => setOrders(null)} />
                </div>
              ))
            ) : (
              <>Užsakymų nėra</>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ShopOrders;
