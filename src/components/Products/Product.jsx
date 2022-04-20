import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, getImage } from '../Extras';
import AddToCartBtn from '../Cart/AddToCartBtn';
import { useSkeleton } from '../Extras';

const Products = ({ product }) => {
  const [showAdd, setShowAdd] = useState(false);

  const changeShow = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div
      className="product"
      onMouseEnter={changeShow}
      onMouseLeave={changeShow}
    >
      <div className="aspect-1">
        <div className="product-image">
          <Link to={`/${product?.codename}`}>
            <img src={getImage(product, 'image')} />
          </Link>
        </div>
      </div>

      <div className="product-info">
        <Link to={`/${product?.codename}`}>{useSkeleton(product?.name)}</Link>
        <div className="price">
          Kaina: {useSkeleton(formatPrice(product?.price, true))}
        </div>
      </div>
      {showAdd && (
        <div className="add-to-cart">
          <div className="p-3">
            <AddToCartBtn
              className="btn-dark w-100"
              product={product}
              quantity={1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
