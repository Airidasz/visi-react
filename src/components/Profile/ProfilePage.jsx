import React from 'react';
import { useAuth } from '../useAuth';
import PlacedOrders from '../Orders/PlacedOrders';
import ShopOrders from '../Orders/ShopOrders';
import CourierOrders from '../Orders/CourierOrders';

const ProfilePage = () => {
  const { auth } = useAuth();

  return (
    <div className="container">
      <div className="page-title small mb-2">Profilio informacija</div>
      <div className="card-style-1 p-3 mb-3">
        <div className="label-3">Vardas</div>
        <div>{auth.user.name}</div>
        <div className="label-3 mt-2">Elektroninis paštas</div>
        <div>{auth.user.email}</div>
      </div>

      {auth.permissions.isFarmer && <ShopOrders />}

      {(auth.permissions.isBuyer || auth.permissions.isAdmin) && (
        <PlacedOrders editable={auth.permissions.isAdmin} />
      )}

      {auth.permissions.isCourier && <CourierOrders />}
    </div>
  );
};

export default ProfilePage;
