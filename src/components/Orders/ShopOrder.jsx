import React, { useState } from 'react';
import { ProductPanel } from '../ShoppingCart';
import Tooltip from '@mui/material/Tooltip';

import useApi from '../useApi';
import Select from 'react-select';

import { shopOrderOptions } from '../Options';
import { Link } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { useStore } from '../useStore';

const ShopOrder = ({
  order,
  reset = () => {},
  className = '',
  inOrderComponent = false,
}) => {
  const [editing, setEditing] = useState(false);

  const { PutRequest } = useApi();
  const { auth } = useAuth();

  const [status] = useState(
    shopOrderOptions.find((x) => x.value == order.status)
  );

  const tryCancelOrder = async () => {
    const shoudCancel = window.confirm(
      'Ar tikrai norite atšaukti šį užsakymą?'
    );

    if (shoudCancel) sendRequest({ status: 3 });
  };

  const sendRequest = async (data) => {
    const body = JSON.stringify(data);

    const response = await PutRequest(`shop/orders/${order.id}`, body);
    if (response) reset();
  };

  const canSeeAddress = () =>
    (auth.permissions.isCourier && !inOrderComponent) ||
    auth.permissions.isAdmin;

  const canSeeEdit = () =>
    canSeeAddress() || (auth.permissions.isFarmer && order.status < 3);

  return (
    <div className={className}>
      {editing && (
        <EditModal
          permissions={auth.permissions}
          complete={sendRequest}
          close={() => setEditing(false)}
          order={order}
        />
      )}
      <div className="shop-order-info d-block">
        {!auth.permissions.isFarmer && (
          <div className="mb-1">
            Pardavėjas:{' '}
            <Link
              to={`/parduotuve/${order?.shop?.codename}`}
              className="hover-underline"
            >
              {order?.shop?.name}
            </Link>
          </div>
        )}
        <div className="d-flex">
          <div className="me-3 categories">
            <div className="label-3 mb-1">Užsakymo būsena</div>
            <div className="category" style={{ background: status.color }}>
              {status.label}
            </div>
          </div>
          <div>
            <div className="label-3 mb-1 me-3">Papildoma žinutė</div>
            <div>{order.message || 'Nėra'}</div>
          </div>
          {canSeeAddress() && (
            <div>
              <div className="label-3 mb-1">Paėmimo adresas</div>
              <div>{order?.shop.address || 'Nėra'}</div>
            </div>
          )}
          {!auth.permissions.isBuyer && (
            <div className="edit-btn">
              {order.status === 0 && !auth.permissions.isCourier && (
                <Tooltip
                  title="Prieš atšaukiant užsakymą rekomenduojame parašyti priežastį žinutės skiltyje"
                  placement="top"
                >
                  <button
                    type="button"
                    onClick={tryCancelOrder}
                    className="btn btn-dark me-2"
                  >
                    Atšaukti užsakymą
                  </button>
                </Tooltip>
              )}
              {canSeeEdit() && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="btn btn-dark"
                >
                  Redaguoti
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {order.orderedProducts.map((p, i) => (
        <ProductPanel cartProduct={p} removable={false} key={i} />
      ))}
    </div>
  );
};

const EditModal = ({
  complete = () => {},
  close = () => {},
  order = {},
  permissions = {},
}) => {
  const [data, setData] = useState({});

  const { store } = useStore();

  const onChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const [collector] = useState(order?.collector?.name && order.collector);

  const canSeeStatus = () => permissions.isFarmer || permissions.isCourier;

  return (
    <div className="modal">
      <div
        className="card-style-1 p-3"
        style={{
          gridGap: '0.6rem',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '34rem',
        }}
      >
        <div>
          <div className="label-2 mb-1">Papildoma žinutė</div>
          <textarea
            defaultValue={order.message}
            onChange={(e) => onChange('message', e.target.value)}
          />
        </div>
        {permissions.isAdmin && (
          <div>
            <div className="label-2 mb-1">Surinkėjas</div>
            <Select
              className="w-100"
              options={store.couriers}
              defaultValue={collector}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.email}
              onChange={(o) => setData({ ...data, collector: o.email })}
            />
          </div>
        )}
        {canSeeStatus() && (
          <div style={{ minWidth: '15rem' }}>
            <div className="label-2 mb-1">Statusas</div>
            {permissions.isFarmer && (
              <div>
                <input
                  type="checkbox"
                  id="confirm-order"
                  defaultChecked={order.status > 0}
                  onChange={(e) => onChange('status', e.target.checked ? 1 : 0)}
                  disabled={order.status}
                />
                <label className="ms-2 select-none" htmlFor="confirm-order">
                  Patvirtinti
                </label>
              </div>
            )}
            {permissions.isCourier && (
              <div>
                <input
                  type="checkbox"
                  id="confirm-pickup"
                  defaultChecked={order.status > 1}
                  onChange={(e) => onChange('status', e.target.checked ? 2 : 1)}
                  disabled={order.status < 1}
                />
                <label className="ms-2 select-none" htmlFor="confirm-pickup">
                  Patvirtinti paėmimą
                </label>
              </div>
            )}
          </div>
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

export default ShopOrder;
