import React, { useState, useEffect } from 'react';
import { useCart } from '../useCart';
import { Link } from 'react-router-dom';
import { useQuery } from '../Extras';
import BankAccount from './BankAccount';

const PurchaseCompletePage = () => {
  const [orderNumber, setOrderNumber] = useState();
  const [total, setTotal] = useState();
  const { setCart } = useCart();

  let query = useQuery();

  useEffect(() => {
    setOrderNumber(query.get('uzsakymas'));
    setTotal(query.get('suma'));
    setCart([]);
  }, []);

  return (
    <>
      <div className="label mt-4 d-flex justify-content-center h-100">
        Užsakymas sėkmingai atliktas
      </div>
      {orderNumber && (
        <BankAccount total={total} orderNumber={orderNumber}>
          <div className="mt-2">
            Šią informaciją taip pat galite rasti užsakymų puslapyje
          </div>
        </BankAccount>
      )}
      <Link className="btn-dark" to="/">
        Grįžti į pagrindinį puslapį
      </Link>
    </>
  );
};

export default PurchaseCompletePage;
