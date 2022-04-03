import React, {useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useCart } from './useCart';
import { getImage } from './Extras';

const ShoppingCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartRef = useRef(null);

  const {cart,totalPrice} = useCart();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setShowCart(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) =>{
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
    <a className={`shopping-cart ${showCart ? 'active' :''}`} onClick={() => setShowCart(!showCart)}>
      <li><Icon icon="el:shopping-cart" width="25" height="25"/>
        <div className='shopping-cart-counter'>{cart.length}</div>
        {showCart && 
        (<div className='cart-items card-style-1 form' ref={cartRef}>
          {cart.length === 0 ? 
            'Prekių nėra' : (<React.Fragment>
              {cart.map(p => (<ProductPanel key={p.product.codename} cartProduct={p}/>))}
              <h4>Suma: {totalPrice(true)}</h4>
              <button className='btn-dark' onClick={() => navigate('/pirkti')}>Pirkti</button>
            </React.Fragment>)
          }
        </div>)
        }
      </li>
    </a>);
};

  
export const ProductPanel = ({cartProduct, removable = true}) => {
  const {removeFromCart, productPrice} = useCart();

  const removeProductFromCart = (e, cartProduct) => {
    removeFromCart(cartProduct, 1);
    e.stopPropagation();
  };

  return (<div className='cart-product'>
    <img src={getImage(cartProduct.product, 'image')}/>
    <div className='info'>
      <div>{cartProduct.product.name}</div>
      <div className='price-info'>
        <h4>{productPrice(cartProduct, true)}</h4>
        <div>Kiekis: {cartProduct.quantity}</div>
      </div>
    </div>
    {removable && (<div className='remove-btn' onClick={(e) => removeProductFromCart(e, cartProduct)}><Icon icon="emojione-monotone:heavy-multiplication-x" /></div>)}
  </div>);
};


export default ShoppingCart;
