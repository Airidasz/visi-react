import React from 'react';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import mark from '../../assets/mark.svg';
import useApi from '../useApi';

import { Link } from 'react-router-dom';

const ProductModal = ({ product, setShow, setProducts, isOwner }) => {
  const { DeleteRequest } = useApi();

  const tryDeleteProduct = async () => {
    const shouldDeleteProduct = window.confirm(
      'Ar tikrai norite ištrinti šią prekę?'
    );

    if (!shouldDeleteProduct) 
      return;

    const response = await DeleteRequest(`shop/${product.shopID}/product${product.id}`);
    if(response) {
      setShow(false);
      setProducts(false);
    }
  };
  return (
    <div className="product-modal">
      <div className="product-modal-container">
        <div className="top-bar">
          <h3>{product.name}</h3>
          <div className="actions">
            {isOwner && (
              <Link
                to={'product/' + product.id + '/edit'}
                className="btn-circle"
                style={{
                  background: 'rgb(229, 139, 21)',
                  marginRight: '0.3rem',
                }}
              >
                <img src={pencil} className="actionButton" />
              </Link>
            )}
            {isOwner && (
              <div
                className="btn-circle"
                style={{
                  background: 'rgb(175, 19, 19)',
                  marginRight: '0.3rem',
                }}
                onClick={tryDeleteProduct}
              >
                <img src={trash} className="actionButton" />
              </div>
            )}
            <div
              className="btn-circle"
              style={{
                background: 'black',
              }}
              onClick={() => {
                setShow(false);
              }}
            >
              <img src={mark} className="actionButton" />
            </div>
          </div>
        </div>
        <p>{product.description}</p>
        <div className="categories">
          {typeof product.categories === 'object' &&
            product.categories.map((category) => {
              return (
                <div key={category.id} className="category">
                  {category.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
