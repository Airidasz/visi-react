import React, {useEffect} from 'react';
import './CartStyles.scss';
import {  useNavigate, Link } from 'react-router-dom';
import useApi from '../useApi';
import { useCart } from '../useCart';
import { ProductPanel } from '../ShoppingCart';

const OverviewPage = () => {
  const navigate = useNavigate();
  const { PostRequest } = useApi();

  const {order, getStep} = useCart();

  useEffect(() => {
    if(getStep() < 4)
      navigate('/pirkti/siuntimas',{replace:true});
  },[]);

  const placeOrder = async () => {
    const body = JSON.stringify(order);

    const response = await PostRequest('orders', body);
    if (!response)
      return;

  };

  return (
    <React.Fragment>
      <div className='label mb-3 mt-2'>Peržiūra</div>
      <div className='buy-page-content'>
        <div>
          <div className='label-2 mt-2'>Užsakovas</div>
        Elektroninis paštas: <b>{order.user.email}</b>
        </div>
        <div>
          <div className='label-2 mt-4'>Prekės</div>
          {order.orderedProducts && order.orderedProducts.map(p => (<ProductPanel key={p.product.codename} cartProduct={p} removable={false}/>))}
        </div>
        <div>
          <div className='label-2 mt-4'>Pristatymas</div>
          {order.shipping}
        </div>
        <div>
          <div className='label-2 mt-4'>Mokėjimas</div>
          {order.payment}
        </div>
      </div>
      <div className='cart-items-footer  mt-3'>
        <Link to={-1}  className="btn btn-dark-reverse w-25" >Atgal</Link>
        <button className="btn btn-dark w-50" onClick={placeOrder}>Baigti užsakymą</button>
      </div>
    </React.Fragment>
  );
};

export default OverviewPage;