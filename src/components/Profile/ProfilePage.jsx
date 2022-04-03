import React from 'react';
import { useStore } from '../useStore';

const ProfilePage = () =>{ 
  const {store} = useStore();

  return (<div className='page-view'>
    <div className='container'>
      <div className='card-style-1 p-3 mt-3'>
        <div className='label'>Profilio informacija</div>
        <div>{store.user.email}</div>
        <div>{store.user.name}</div>
        
        
      </div>

      <div className='card-style-1 p-3 mt-3'>
        <div className='label'>Užsakymai</div>
      </div>
    </div>
  </div>);};

export default ProfilePage;