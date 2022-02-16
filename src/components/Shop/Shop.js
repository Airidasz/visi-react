import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import ShopMap from '../ShopMap';
import Products from './Products';
import { useAlert } from 'react-alert';
import useApi from '../useApi';

const Shop = () => {
  useEffect(() => {
    document.title = 'Parduotuvė';
  }, []);
  const alert = useAlert();
  let { shopid } = useParams();
  const id = shopid;
  const [shop, setShop] = useState();
  const navigate = useNavigate();

  const {GetRequest, DeleteRequest} = useApi();
  
  const deleteShop = async () => {
    const response = await DeleteRequest(`shop/${id}`);

    if(response)
      navigate('/');
    
  };

  useEffect(() => {
    const getShop = async () => {
      if(shop)
        return;

      const response = await GetRequest(`shop/${id}`);
      if(!response)
        return;

      const data = await response.json();
      setShop({...data});
    };

    getShop();
  }, [shop]);

  const tryDeleteShop = () => {
    const shouldDeleteShop = window.confirm(
      'Ar tikrai norite ištrinti šią parduotuvę?'
    );

    if (shouldDeleteShop) deleteShop();
  };

  if (typeof shop !== 'object') return <div className="pageView"></div>;

  return (
    <div className="pageView">
      <div className="container">
        <div className="title">
          <h1>{shop.name}</h1>
          {localStorage.getItem('userID') == shop.userID && (
            <div className="shop-buttons">
              <a onClick={tryDeleteShop} className="btn-dark">
                Ištrinti
              </a>
              <Link to="edit" className="btn-dark">
                Koreguoti
              </Link>
            </div>
          )}
        </div>
        <div className="shop">
          <p style={{ marginBottom: '15px' }}>{shop.description}</p>

          <ShopMap id={id} editable={false} />
          <div className="products-title">
            <h2>Ūkio siūlomi produktai</h2>
            {localStorage.getItem('userID') == shop.userID && (
              <Link to="product/new" className="btn-dark">
                Kurti naują prekę
              </Link>
            )}
          </div>
          <Outlet />
          <Products shop={shop} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
