import React, { useEffect, useState } from 'react';
import './ShopStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';
import ShopMap from '../ShopMap';
import Products from '../Products/Products';
import useApi from '../useApi';
import { useStore } from '../useStore';
import {useAuth} from '../useAuth';

const Shop = ({ isNew }) => {
  useEffect(() => {
    document.title = 'Parduotuvė';
  }, []);
  let { name } = useParams();
  const navigate = useNavigate();
  const { store } = useStore();
  const {auth} = useAuth();

  const { GetRequest, PostRequest, PutRequest } = useApi();

  const [shop, setShop] = useState();
  const [editing, setEditing] = useState(false);
  const [createLocations, setCreateLocations] = useState(false);

  useEffect(() => {
    if (isNew) {
      const newShop = {};
      newShop.name = '';
      newShop.description = '';

      setShop(newShop);
    }
  }, []);

  useEffect(() => {
    const getShop = async () => {
      if (shop || isNew) return;

      const response = await GetRequest(`shop/${name}`, null, false);
      if (!response) {
        return;
      }

      const data = await response.json();
      setShop({ ...data });
    };

    getShop();
  }, [shop]);

  const addEditShop = async () => {
    const body = JSON.stringify({
      name: shop.name,
      description: shop.description,
    });

    let response = null;
    if (isNew) response = await PostRequest('shops', body);
    else response = await PutRequest('shop', body);

    if (response) {
      const data = await response.json();
      setShop({ ...data });
      setCreateLocations(true);
    }
  };

  const inEditMode = () => {
    return isNew || editing;
  };

  const onAddEditFinish = () => {
    auth.user.shop = shop.codename;
    navigate(`/${shop.codename}`, { replace: true });
    setEditing(false);
  };

  const addProduct = () => {
    navigate('/nauja/preke');
  };

  const editSaveBtn = () => {
    if (inEditMode()) addEditShop();
    else setEditing(true);
  };

  if (!shop) return <div className="page-view"></div>;

  return (
    <div className="page-view">
      <div id="shop-page" className="container">
        <div className="title">
          {inEditMode() ? (
            <input
              type="text"
              value={shop.name}
              onChange={(e) => setShop({ ...shop, name: e.target.value })}
            />
          ) : (
            <h1>{shop.name}</h1>
          )}
          {(isNew || name === store?.user?.shop) && (
            <div className="shop-buttons">

              
              <button onClick={editSaveBtn} className="btn-dark">
                {inEditMode() ? 'Išsaugoti' : 'Koreguoti'}
              </button>

              {!inEditMode() && name === store?.user?.shop && (
                <button onClick={addProduct} className="btn-dark">
                  Pridėti prekę
                </button>)}
              
            </div>
          )}
        </div>
        <div className="shop">
          <div className="mb-3">
            {inEditMode() ? (
              <textarea
                style={{ resize: 'none', height: '220px', width: '100%' }}
                value={shop.description}
                onChange={(e) =>
                  setShop({ ...shop, description: e.target.value })
                }
              />
            ) : (
              <p>{shop.description}</p>
            )}
          </div>
          <ShopMap
            shop={shop}
            editable={inEditMode()}
            shouldLoad={!isNew}
            createLocations={createLocations}
            onDone={onAddEditFinish}
          />
          {!inEditMode() && (
            <div className='mt-2'>
              <Products
                shops={[shop.codename]}
                categories={[]}
                className="mt-3"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
