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
              {cart.map(p => (<ProductPanel key={p.codename} product={p}/>))}
              <h4>Suma: {totalPrice(true)}</h4>
              <button className='btn-dark' onClick={() => navigate('/pirkti')}>Pirkti</button>
            </React.Fragment>)
          }
        </div>)
        }
      </li>
    </a>);
};

  
export const ProductPanel = ({product}) => {
  const {removeFromCart, productPrice} = useCart();

  const removeProductFromCart = (e, product) => {
    removeFromCart(product, 1);
    e.stopPropagation();
  };

  return (<div className='cart-product'>
    <img src={getImage(product, 'image')}/>
    <div className='info'>
      <div>{product.name}</div>
      <div className='price-info'>
        <h4>{productPrice(product)}€</h4>
        <div>Kiekis: {product.selectedQuantity}</div>
      </div>
    </div>
    <div className='remove-btn' onClick={(e) => removeProductFromCart(e, product)}><Icon icon="emojione-monotone:heavy-multiplication-x" /></div>
  </div>);
};


export default ShoppingCart;
