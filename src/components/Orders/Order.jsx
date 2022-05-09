import React, { useState } from 'react';
import './OrderStyles.scss';
import useApi from '../useApi';
import Select from 'react-select';
import { orderCancelOptions, orderOptions, paymentOptions } from '../Options';
import {
  formatPrice,
  getOption,
  removeEmpty,
  toShortDateString,
} from '../Extras';
import ShopOrder from './ShopOrder';
import { useStore } from '../useStore';
import { useAuth } from '../useAuth';
import BankAccount from '../Cart/BankAccount';

const Order = ({ order, editable = false, reset = () => {} }) => {
  const { PutRequest } = useApi();
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);

  const [status] = useState(getOption(orderOptions, order.status));

  const [cancelIfMissing] = useState(
    getOption(orderCancelOptions, order.cancelIfMissing)
  );

  const complete = async (data) => {
    setEditing(false);

    data = removeEmpty(data);
    const body = JSON.stringify(data);

    const response = await PutRequest(`orders/${order.codename}`, body);
    if (response) reset();
  };

  const tryCancelOrder = async () => {
    const shoudCancel = window.confirm(
      'Ar tikrai norite atšaukti šį užsakymą?'
    );

    if (shoudCancel) {
      if (auth.permissions.isBuyer) {
        const response = await PutRequest(`orders/${order.codename}/cancel`);
        if (response) reset();
      } else complete({ status: 5 });
    }
  };

  const [payment] = useState(getOption(paymentOptions, order.paymentType));
  const [bankModal, setBankModal] = useState(false);

  const showBankModal = () => {
    if (payment.value == 3) setBankModal(true);
  };

  const canCancel = () =>
    (auth.permissions.isBuyer || auth.permissions.isAdmin) && order.status < 4;

  return (
    <div className="order card-style-1">
      {bankModal && (
        <div className="modal">
          <BankAccount total={order.totalPrice} orderNumber={order.codename}>
            <button
              onClick={() => setBankModal(false)}
              className="btn btn-dark mt-2"
            >
              Išjungti
            </button>
          </BankAccount>
        </div>
      )}
      <div className="order-info">
        <div>
          <div className="label-3 mb-1">Užsakymo kodas</div>
          {order.codename}
        </div>
        <div>
          <div className="label-3 mb-1">Užsakymo būsena</div>
          <div>
            <div className="category" style={{ background: status.color }}>
              {status.label}
            </div>
          </div>
        </div>
        <div>
          <div className="label-3 mb-1">Pristatymo adresas</div>
          {order.address || 'nėra'}
        </div>
        <div>
          <div className="label-3 mb-1">Mokėjimas</div>
          <div
            className={
              payment.value === 3 ? 'pointer hover-underline fst-italic' : ''
            }
            onClick={showBankModal}
          >
            {payment?.label || 'nėra'}
          </div>
        </div>
        <div>
          <div className="label-3 mb-1">
            Atšaukti negavus prekių iš pardavėjo
          </div>
          <div>
            <div
              className="category"
              style={{ background: cancelIfMissing.color }}
            >
              {cancelIfMissing.label}
            </div>
          </div>
        </div>
        <div>
          <div className="label-3 mb-1">Papildoma žinutė</div>
          {order.note || 'nėra'}
        </div>
        {editing && (
          <EditModal
            complete={complete}
            close={() => setEditing(false)}
            order={order}
            permissions={auth.permissions}
          />
        )}

        <div className="edit-btn">
          {canCancel() && (
            <button
              type="button"
              className="btn btn-dark me-2"
              onClick={tryCancelOrder}
            >
              Atšaukti užsakymą
            </button>
          )}
          {editable && (
            <button
              className="btn btn-dark"
              type="button"
              onClick={() => setEditing(true)}
            >
              Redaguoti
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="label-2 mb-2">Prekės</div>
        {order.shopOrders.map((o, j) => (
          <ShopOrder
            inOrderComponent={true}
            order={o}
            key={j}
            reset={reset}
            className="mb-3 card-style-2"
          />
        ))}
      </div>
      <div>
        <b>Bendra suma: {formatPrice(order.totalPrice, true)}</b>
      </div>
    </div>
  );
};

const EditModal = ({
  complete = () => {},
  close = () => {},
  order = {},
  permissions = {},
}) => {
  const { store } = useStore();

  const [status] = useState(orderOptions.find((x) => x.value == order.status));

  const [deliveryDate] = useState(
    order.pickupDate && toShortDateString(new Date(order.pickupDate))
  );

  const [deliverer] = useState(order?.deliverer?.name && order.deliverer);

  const [data, setData] = useState({});

  return (
    <div className="modal">
      <div
        className="card-style-1 p-3"
        style={{ gridGap: '0.6rem', display: 'flex', flexDirection: 'column' }}
      >
        <div>
          <div className="label-2 mb-1">Užsakymo būsena</div>

          <Select
            className="w-100"
            defaultValue={status}
            options={orderOptions.filter((x) => x.value > 2)}
            onChange={(o) => setData({ ...data, status: o.value })}
          />
        </div>
        {permissions.isAdmin && (
          <>
            <div style={{ minWidth: '15rem' }}>
              <div className="label-2 mb-1">Išvežiotojas</div>

              <Select
                className="w-100"
                options={store.couriers}
                defaultValue={deliverer}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.email}
                onChange={(o) => setData({ ...data, deliverer: o.email })}
              />
            </div>
            <div>
              <div className="label-2 mb-1">Surinkimo data</div>
              <input
                style={{ height: '2.2rem', paddingLeft: '10px' }}
                type="date"
                className="w-100"
                defaultValue={deliveryDate}
                onChange={(e) =>
                  setData({ ...data, pickupDate: e.target.value })
                }
              />
            </div>
          </>
        )}
        <div className="edit-btn mt-2">
          <button
            className="btn btn-dark-reverse me-2"
            type="button"
            onClick={close}
          >
            Atšaukti
          </button>
          <button
            className="btn btn-dark"
            type="button"
            onClick={() => complete(data)}
          >
            Išsaugoti
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
