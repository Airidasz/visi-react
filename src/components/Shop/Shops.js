import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Shops.scss';
import useApi from '../useApi';

const Shops = () => {
  const { GetRequest } = useApi();
  const [shops, setShops] = useState();

  useEffect(() => {
    const getShops = async () => {
      if (shops)
        return;

      const response = await GetRequest('shops', null, false);
      if (!response)
        return;

      const data = await response.json();
      setShops(data);
    };

    getShops();
  }, [shops]);

  if (!shops) return <div></div>;

  return (
    <div className="shopsPage">
      <div className="title">
        <h2>Parduotuvės</h2>
      </div>
      <div className="grid">
        {shops.map((shop) => (
          <Link to={'/shop/' + shop.codename} key={shop.name}>
            <div className="card">
              <h1>{shop.name}</h1>
              <p>{shop.description}</p>
            </div>
          </Link>
        )
        )}
      </div>
    </div>
  );
};

export default Shops;
