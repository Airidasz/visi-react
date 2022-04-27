import React, { useEffect, useState } from 'react';
import './ShopStyle.scss';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useApi from '../useApi';
import { useAuth } from '../useAuth';
import { useSkeleton } from '../Extras';

import Form from '../Extras/Form';
import Status404Page from '../Status404Page';
import ShopMap from '../ShopMap';
import Products from '../Products/Products';
import { shopModel } from '../Models';
import Skeleton from 'react-loading-skeleton';

const Shop = ({ isNew }) => {
  const { GetRequest, PostRequest, PutRequest } = useApi();
  const { auth, isShopOwner } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let { name } = useParams();

  const [shop, setShop] = useState(null);
  const [categories] = useState([]); // Need this to not trigger rerenders

  const [load, setLoad] = useState(true);
  const [editing, setEditing] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const reset = () => {
    setShop(null);
    setLoad(true);
    setNotFound(false);
    setEditing(false);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [name, location]);

  useEffect(() => {
    const getShop = async () => {
      const response = await GetRequest(`shop/${name}`, null, false);
      if (!response) {
        setNotFound(true);
        return;
      }

      const data = await response.json();
      setShop({ ...data });
    };

    if (!load) return;
    else if (isNew) setShop({ ...shopModel });
    else getShop();

    setLoad(false);
  }, [load]);

  const addEditShop = async () => {
    const body = JSON.stringify(shop);

    let response = null;
    if (isNew) response = await PostRequest('shops', body);
    else response = await PutRequest('shop', body);

    if (response) {
      const data = await response.json();
      onAddEditFinish(data.codename);
    }
  };

  const onAddEditFinish = (codename) => {
    auth.user.shop = codename;
    navigate(`/parduotuve/${codename}`, { replace: true });
  };

  const inEditMode = () => {
    return isNew || editing;
  };

  const addProduct = () => {
    navigate('/nauja/preke');
  };

  const editSaveBtn = () => {
    if (inEditMode()) addEditShop();
    else setEditing(true);
  };

  if (notFound) return <Status404Page />;

  return (
    <div id="shop-page" className="container">
      <Form onSubmit={editSaveBtn}>
        <div className="title">
          {inEditMode() ? (
            <div className="w-100">
              <div className="label-3 mb-1">Pavadinimas</div>
              <input
                className="w-100"
                type="text"
                value={shop?.name}
                required
                maxLength="80"
                onChange={(e) => setShop({ ...shop, name: e.target.value })}
              />
            </div>
          ) : (
            <h1 className="w-100 wrap">{useSkeleton(shop?.name)}</h1>
          )}
          {(isShopOwner(name) || isNew) && (
            <div className="ms-2 shop-buttons">
              <input
                type="submit"
                className="btn-dark text-nowrap"
                value={inEditMode() ? 'Išsaugoti' : 'Koreguoti'}
              />
              {!inEditMode() && name === auth?.user?.shop && (
                <button
                  onClick={addProduct}
                  className="btn-dark text-nowrap"
                  type="button"
                >
                  Pridėti prekę
                </button>
              )}
            </div>
          )}
        </div>
        <div className="shop">
          <div className="mb-3">
            {inEditMode() ? (
              <>
                <div className="label-3 mb-1">Aprašymas</div>
                <textarea
                  style={{ resize: 'none', height: '220px', width: '100%' }}
                  value={shop?.description}
                  onChange={(e) =>
                    setShop({ ...shop, description: e.target.value })
                  }
                />
              </>
            ) : (
              <p>{shop?.description}</p>
            )}
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            {shop?.locations ? (
              <ShopMap
                editable={inEditMode()}
                locations={shop?.locations}
                setLocations={(o) => setShop({ ...shop, locations: o })}
              />
            ) : (
              <Skeleton className="w-100 h-100" />
            )}
          </div>
          {!inEditMode() && (
            <div className="mt-2">
              <Products
                shops={shop?.codename}
                categories={categories}
                className="mt-3"
              />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Shop;
