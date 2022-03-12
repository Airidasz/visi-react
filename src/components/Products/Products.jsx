import React, { useEffect, useState } from 'react';
import useApi from '../useApi';
import { Link } from 'react-router-dom';
import { getImage } from '../Extras';

const Products = ({ categories, className }) => {
  const [products, setProducts] = useState();

  const { GetRequest } = useApi();

  useEffect(() => {
    const getProducts = async () => {
      if (products)
        return;

      const requestedCategories = categories.map(category => `category=${encodeURIComponent(category)}`).join('&');

      const response = await GetRequest(`products?${requestedCategories}`, null, false);
      if (!response)
        return;

      const data = await response.json();
      setProducts(data);
    };

    getProducts();

  }, [products]);

  useEffect(() => {
    setProducts(undefined);
  }, [categories]);

  if (!products) return <div></div>;

  return (
    <div id="products" className={className}>
      {products.map(p => (
        <div className='product' key={p.name}>
          <div className='product-image'>
            <Link to={`/product/${p.codename}`}><img src={getImage(p, 'image')} /></Link>
          </div>
          <div className='product-info'>    
            <Link to={`/product/${p.codename}`}>{p.name}</Link></div>
        </div>
      ))}
    </div>
  );
};

export default Products;
