import React from 'react';

const BankAccount = ({ total, orderNumber, children }) => {
  return (
    <div className="card-style-1 my-3 p-4">
      <div className="label mb-2">Bankinio pavedimo duomenys</div>
      <div className="bank-info">
        <div className="bank-row">
          <div className="label-3 me-2">Gavėjo pavadinimas</div>
          <input type="text" readOnly value="UAB Visiūkiai" />
        </div>
        <div className="bank-row">
          <div className="label-3 me-2">Gavėjo sąskaita</div>
          <input type="text" readOnly value="LT601010012345678901" />
        </div>
        <div className="bank-row">
          <div className="label-3 me-2">Suma</div>
          <input type="text" readOnly value={total} />
        </div>
        <div className="bank-row">
          <div className="label-3 me-2">Pervedimo paskirtis</div>
          <input type="text" readOnly value={orderNumber} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default BankAccount;
