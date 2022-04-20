import React, { useEffect, useState } from 'react';
import useApi from '../useApi';
import Product from './Product';
import { Link } from 'react-router-dom';
import { toArray } from '../Extras';

const Products = ({ categories, shops, className, limit = false }) => {
  const { GetRequest } = useApi();

  const defaultArray = Array.from(Array(10));

  const [products, setProducts] = useState(defaultArray);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories && shops) {
      setLoading(true);
      setProducts(defaultArray);
    }
  }, [categories, shops]);

  useEffect(() => {
    const getProducts = async () => {
      if (!loading) return;

      const parameters = [];

      toArray(categories).forEach((category) =>
        parameters.push(`category=${encodeURIComponent(category)}`)
      );

      toArray(shops).forEach((shop) =>
        parameters.push(`shop=${encodeURIComponent(shop)}`)
      );

      const response = await GetRequest(
        `products?${parameters.join('&')}`,
        null,
        false
      );
      if (!response) return;

      let data = await response.json();

      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, [loading]);

  if (products.length == 0)
    return (
      <div className="d-flex justify-content-center">
        <h2>Prekių nerasta</h2>
      </div>
    );

  return (
    <div id="products" className={className}>
      <div className={`product-grid${limit ? ' limit-products' : ''}`}>
        {products.map((p, i) => (
          <Product product={p} key={i} />
        ))}
      </div>
      {limit && (
        <Link to="/prekes" className="btn btn-dark w-100 d-block mt-3">
          Rodyti visus produktus
        </Link>
      )}
    </div>
  );
};

export default Products;
