import React, { useEffect, useState } from 'react';
import { toShortDateString } from '../Extras';
import useApi from '../useApi';
import Order from './Order';
import ShopOrder from './ShopOrder';

const CourierOrders = () => {
  const { GetRequest } = useApi();
  const [tab, setTab] = useState(0);

  const [pickups, setPickups] = useState(null);
  const [deliveries, setDeliveries] = useState(null);

  const groupByPickupDate = (data = []) => {
    const grouped = {};

    data.forEach((o) => {
      let pickupDate = null;

      if (o.order.pickupDate) {
        try {
          const date = new Date(o.order.pickupDate);
          pickupDate = toShortDateString(date);
        } catch {}
      }

      if (!grouped[pickupDate]) {
        grouped[pickupDate] = [];
      }

      grouped[pickupDate] = [...grouped[pickupDate], o];
    });

    setPickups([...Object.entries(grouped)]);
  };

  useEffect(() => {
    const getPickups = async () => {
      const response = await GetRequest('courier/pickups');
      if (!response) return;

      const data = await response.json();
      groupByPickupDate(data);
    };

    if (!pickups) getPickups();
  }, [pickups]);

  useEffect(() => {
    const getDeliveries = async () => {
      const response = await GetRequest('courier/deliveries');
      if (!response) return;

      const data = await response.json();
      setDeliveries([...data]);
    };

    if (!deliveries) getDeliveries();
  }, [deliveries]);

  return (
    <>
      <div className="page-title small mt-2">Užsakymai</div>
      <div className="actions mb-2 d-flex">
        <div
          className={`btn btn-tab${tab === 0 ? ' active' : ''}`}
          onClick={() => setTab(0)}
        >
          Surinkti
        </div>
        <div
          className={`btn btn-tab ms-2${tab === 1 ? ' active' : ''}`}
          onClick={() => setTab(1)}
        >
          Išvežioti
        </div>
      </div>
      {tab === 0 && (
        <>
          {pickups && (
            <>
              {pickups.map(([k, or]) => (
                <div key={k} className="shop-order">
                  {tab === 0 && (
                    <>
                      <div className="label-3">Paėmimo data</div>
                      <div className="shop-order-title">{k}</div>
                    </>
                  )}

                  {or?.length > 0 ? (
                    or.map((o) => (
                      <div className="card-style-1 p-2 px-3" key={o.id}>
                        <ShopOrder order={o} reset={() => setPickups(null)} />
                      </div>
                    ))
                  ) : (
                    <>Užsakymų nėra</>
                  )}
                </div>
              ))}
            </>
          )}
        </>
      )}

      {tab === 1 && (
        <div id="placed-orders">
          {deliveries &&
            deliveries.map((order) => (
              <Order
                order={order}
                key={order.codename}
                editable={true}
                reset={() => setDeliveries(true)}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CourierOrders;
