import React, { useRef } from 'react';
import './QuantityPickerStyle.scss';
import { Icon } from '@iconify/react';
import { useAuth } from '../useAuth';

const QuantityPicker = ({
  min = 1,
  max = 9999999999999,
  value,
  onChange = () => {},
  disabled = false,
}) => {
  const { auth } = useAuth();
  const inputRef = useRef(null);

  const onInternalChange = (value) => {
    if (disabled) return;

    value = value > max ? max : value < min ? min : value;
    onChange(value);
  };

  if (!auth.permissions?.isBuyer) return <></>;

  return (
    <div className="quantity-picker">
      <Icon
        icon="fe:arrow-left"
        className={`arrow${disabled ? ' disabled' : ''}`}
        onClick={() => onInternalChange(value - 1)}
      />
      <input
        ref={inputRef}
        type="number"
        min={min}
        max={max}
        value={value ?? ''}
        onChange={(e) => onInternalChange(e.target.value)}
        disabled={disabled}
      />
      <Icon
        icon="fe:arrow-right"
        className={`arrow${disabled ? ' disabled' : ''}`}
        onClick={() => onInternalChange(value + 1)}
      />
    </div>
  );
};

export default QuantityPicker;
