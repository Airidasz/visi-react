import React, { useState, useEffect } from 'react';
import { buildAddress } from '../Extras';
import Info from '../Info';
import { addressModel } from '../Models';

const AddressInput = ({
  classname = '',
  onChange = () => {},
  defaultValue = '',
}) => {
  const [address, setAddressState] = useState({ ...addressModel });

  useEffect(() => {
    if (!defaultValue) return;

    const addressParts = defaultValue.split(',');

    const addressFromValue = {
      street: addressParts[0].trim(),
      postalCode: addressParts[1].trim(),
      city: addressParts[2].trim(),
    };

    setAddressState(addressFromValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange(buildAddress(address));
  }, [address]);

  return (
    <div className={classname}>
      <div>
        <div className="label-3 mt-2">
          Vietovė{' '}
          <Info
            title="Miesto arba kaimo pavadinimas"
            placement="top"
            className="ms-1"
          />
        </div>
        <input
          type="text"
          value={address.city}
          onChange={(e) =>
            setAddressState({ ...address, city: e.target.value })
          }
          style={{ width: '10rem' }}
        />
      </div>
      <div className="d-flex">
        <div>
          <div className="label-3 mt-2">Pašto kodas</div>
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) =>
              setAddressState({ ...address, postalCode: e.target.value })
            }
            style={{ width: '6rem' }}
          />
        </div>
        <div className="ms-2">
          <div className="label-3 mt-2">Gatvė, namo numeris</div>
          <input
            type="text"
            value={address.street}
            onChange={(e) =>
              setAddressState({ ...address, street: e.target.value })
            }
            style={{ width: '15rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
