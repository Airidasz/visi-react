import React from 'react';
import { useAuth } from '../useAuth';
import PlacedOrders from './PlacedOrders';
import ShopOrders from './ShopOrders';

const ProfilePage = () => {
  const { auth } = useAuth();

  return (
    <div className="container">
      <div className="page-title small mb-2">Profilio informacija</div>
      <div className="card-style-1 p-3 mb-3">
        <div className="label-3">Elektroninis paštas</div>
        <div>{auth.user.email}</div>
        <div className="label-3 mt-2">Vardas</div>
        <div>{auth.user.name}</div>
      </div>

      <div className="page-title small my-2">Užsakymai</div>

      {auth.permissions.isFarmer && <ShopOrders />}

      {(auth.permissions.isBuyer || auth.permissions.isAdmin) && (
        <PlacedOrders editable={auth.permissions.isAdmin} />
      )}
    </div>
  );
};

export default ProfilePage;
