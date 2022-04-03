import React, { useEffect, useState } from 'react';
import useApi from '../useApi';
import { useAuth } from '../useAuth';

const ProfilePage = () =>{ 
  const{GetRequest} = useApi();
  const [orders,setOrders] = useState();
  const {auth} = useAuth();


  useEffect(() => {
    const getPersonOrders = async () => {
      const response = await GetRequest('orders');
      if(!response)
        return;
    
      const data = await response.json();
      setOrders([...data]);
    };

    if(auth.permissions.isBuyer)
      getPersonOrders();
  },[]);



  return (<div className='page-view'>
    <div className='container'>
      <div className='card-style-1 p-3 mt-3'>
        <div className='label'>Profilio informacija</div>
        <div>{auth.user.email}</div>
        <div>{auth.user.name}</div>
      </div>

      {orders && <div className='card-style-1 p-3 mt-3'>
        <div className='label'>Užsakymai</div>
        {orders.map(x => x.number)}
      </div>}
    </div>
  </div>);};

export default ProfilePage;