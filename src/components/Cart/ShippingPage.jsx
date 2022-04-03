import React,{ useState ,useEffect} from 'react';
import './CartStyles.scss';
import {  Link, useNavigate } from 'react-router-dom';
import { useCart } from '../useCart';
import { useStore } from '../useStore';

const ShippingPage = () => {
  const {order,setOrder,getStep} = useCart();
  const {store} = useStore();

  const navigate = useNavigate();

  const [shipping, setInternalShipping] = useState(null);

  useEffect(() =>{
    if(getStep() < 1)
      navigate('/pirkti/krepselis',{replace:true});

    if(store.user.isSet){
      order.user = store.user;
      order.user.temporary = false;
  
      setOrder({...order});
    } else if(!order.user.email) {
      navigate('/pirkti/prisijungti',{replace:true});
    }
  },[]);
  
  useEffect(() =>{
    const value = shipping ? 'Pristatymas į namus' : null;

    setOrder({...order, shipping:value});
  },[shipping]);

  return (
    <React.Fragment>
      <div className='label mb-3 mt-2'>Pristatymas</div>
      <div className='buy-page-content'>
        <input type="checkbox" id="shipping"  onChange={(e) => setInternalShipping(e.target.checked)}/>
        <label htmlFor='shipping' className='ms-2'>Pristatymas (y) namus</label>
      </div>
      <div className='cart-items-footer'>
        <Link to={-1}  className="btn btn-dark-reverse w-25" >Atgal</Link>
        <Link to='/pirkti/mokejimas'  className={`btn btn-dark w-50${!shipping ? ' disabled' : ''}`} >Toliau</Link>
      </div>
    </React.Fragment>
  );
};

export default ShippingPage;