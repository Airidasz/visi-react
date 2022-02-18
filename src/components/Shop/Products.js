import React, { useEffect, useState } from 'react';
import './Shop.scss';
import Product from './Product';
import useApi from '../useApi';

const Products = ({ shop }) => {
  const {GetRequest} = useApi();
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      if(products)
        return;

      const response = await GetRequest(`products`);
      if(!response)
        return;

      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, [products]);

  if (!products) return <div></div>;

  return (
    <div className="products">
      {products.map((product) => (<Product key={product.name} shop={shop} product={product} setProducts={setProducts} />))}
    </div>
  );
};

export default Products;
