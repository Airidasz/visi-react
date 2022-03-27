import React, { useEffect, useState } from 'react';
import useApi from '../useApi';
import Product from './Product'; 

const Products = ({ categories, shops, className }) => {
  const [products, setProducts] = useState();

  const { GetRequest } = useApi();

  useEffect(() => {
    const getProducts = async () => {
      if (products)
        return;

      const parameters = [];

      categories.map(category => parameters.push(`category=${encodeURIComponent(category)}`));
      shops.map(shop => parameters.push(`shop=${encodeURIComponent(shop)}`));

      const response = await GetRequest(`products?${parameters.join('&')}`, null, false);
      if (!response)
        return;

      const data = await response.json();

      setProducts(data);
    };

    getProducts();

  }, [products]);

  useEffect(() => {
    setProducts(undefined);
  }, [categories, shops]);
  
  // Show placeholders while loading
  if(!products) {
    return (
      <div id="products" className={className}>
        {Array.from(Array(10)).map((_, i) => (<Product key={i} loading={true}/>))}
      </div>
    );
  }

  if(products.length == 0) 
    return (<div className='d-flex justify-content-center'><h2>Prekių nerasta</h2></div>);

  return (
    <div id="products" className={className}>
      {products.map(p => (<Product product={p} key={p.codename}/>))}
    </div>
  );
};

export default Products;
