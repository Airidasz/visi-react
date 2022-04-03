import React, { useEffect, useState } from 'react';
import useApi from '../useApi';
import Product from './Product'; 
import { useStore } from '../useStore';

const Products = ({ categories, shops, className }) => {
  const { GetRequest } = useApi();
  const {store} = useStore();

  const [products, setProducts] = useState();

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

      let data = await response.json();
      
      // data = data.filter(p => p.Public  || (store?.user?.shop && store?.user?.shop == p.shop.codename));

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
