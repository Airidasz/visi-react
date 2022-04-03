/* eslint-disable no-undef */
import React from 'react';
import {useLocation} from 'react-router-dom';

export const getImage = (input, field) => input && input[field]  && input[field]  !== '' ? `${process.env.REACT_APP_API_URL}/${input[field]}` : '';

export const roundDecimal = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export const formatPrice = (price, showSign = false) => roundDecimal(Number(price)) + (showSign && '€');

export const useQuery = () => {
  const { search } = useLocation();
  
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const RemoveItemFromArray = (arr, item)=> {
  var array = [...arr]; // make a separate copy of the array
  var index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
};

