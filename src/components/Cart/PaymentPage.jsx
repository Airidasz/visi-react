import React,{ useState, useEffect } from 'react';
import './CartStyles.scss';
import {  Link, useNavigate } from 'react-router-dom';
import { useCart } from '../useCart';

const PaymentPage = () => {
  const navigate = useNavigate();
  const {order,setOrder, getStep} = useCart();

  const [paymentMethod, setPaymentMethod] = useState(false);

  useEffect(() => {
    if(getStep() < 3)
      navigate('/pirkti/siuntimas',{replace:true});
  },[]);

  useEffect(() =>{
    if(paymentMethod)
      setOrder({...order, payment:'Mokėti pristatymo metu'});
    else {
      setOrder({...order, payment:null});
    }

  },[paymentMethod]);

  return (
    <React.Fragment>
      <div className='label mb-3 mt-2'>Mokėjimas</div>
      <div className='buy-page-content'>
        <input type="checkbox" id="shipping"  checked={paymentMethod} onChange={(e) => setPaymentMethod(e.target.checked)}/>
        <label htmlFor='shipping' className='ms-2'>Mokėti pristatymo metu</label>
      </div>
      <div className='cart-items-footer'>
        <Link to={-1} className="btn btn-dark-reverse w-25" >Atgal</Link>
        <Link to='/pirkti/perziura'  className={`btn btn-dark w-50${!paymentMethod ? ' disabled' : ''}`} >Toliau</Link>
      </div>
    </React.Fragment>
  );
};

export default PaymentPage;