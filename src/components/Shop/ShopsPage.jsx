import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Shops.scss';
import useApi from '../useApi';

const ShopsPage = () => {
  const { GetRequest } = useApi();
  const [shops, setShops] = useState();

  useEffect(() => {
    const getShops = async () => {
      if (shops) return;

      const response = await GetRequest('shops', null, false);
      if (!response) return;

      const data = await response.json();
      setShops(data);
    };

    getShops();
  }, [shops]);

  if (!shops) return <></>;

  return (
    <>
      <div className="page-title medium">Parduotuvės</div>
      <div className="container mt-2">
        {shops.map((shop) => (
          <Link to={'/parduotuve/' + shop.codename} key={shop.name}>
            <div className="card card-style-1 mb-2 p-4">
              <h1 className="wrap hover-underline">{shop.name}</h1>
              <p>{shop.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ShopsPage;
