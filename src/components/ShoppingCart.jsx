import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useCart } from './useCart';
import { formatPrice, getImage } from './Extras';

const ShoppingCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartRef = useRef(null);

  const { cart, totalPrice } = useCart();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setShowCart(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartRef]);

  return (
    <a
      className={`shopping-cart ${showCart ? 'active' : ''}`}
      onClick={() => setShowCart(!showCart)}
    >
      <li>
        <Icon icon="el:shopping-cart" width="25" height="25" />
        <div className="shopping-cart-counter">{cart.length}</div>
        {showCart && (
          <div className="cart-info card-style-1" ref={cartRef}>
            {cart.length === 0 ? (
              'Prekių nėra'
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((p) => (
                    <ProductPanel key={p.product.codename} cartProduct={p} />
                  ))}
                </div>
                <div className="cart-footer">
                  <h4 cLinklassName="sum">Suma: {totalPrice(true)}</h4>
                  <button
                    type="button"
                    className="btn-dark w-100"
                    onClick={() => navigate('/pirkti')}
                  >
                    Pirkti
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </li>
    </a>
  );
};

export const ProductPanel = ({ cartProduct, removable = true }) => {
  const { removeFromCart, addToCart } = useCart();

  return (
    <div className="cart-product" onClick={(e) => e.stopPropagation()}>
      <div className="aspect-1" style={{ width: '50px' }}>
        {getImage(cartProduct.product, 'image')}
      </div>
      <div className="info">
        <Link
          to={`/${cartProduct.product.codename}`}
          className="product-name hover-underline"
        >
          {cartProduct.product.name}
        </Link>
        <div className="price-info">
          <h4>
            {formatPrice(cartProduct.product?.price, true)}
            <span className="label-3"> /vnt</span> | x{cartProduct.quantity}
          </h4>
        </div>
      </div>
      {removable && (
        <div className="actions">
          <div>
            <Icon
              icon="fa-solid:plus"
              className="btn"
              onClick={() => addToCart(cartProduct.product, 1)}
            />
          </div>
          <div>
            <Icon
              icon="bxs:trash-alt"
              className="btn"
              onClick={() => removeFromCart(cartProduct, 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
