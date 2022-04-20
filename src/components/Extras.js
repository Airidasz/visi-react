/* eslint-disable no-undef */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';

export const getImage = (input, field) =>
  input && input[field] && input[field] !== ''
    ? `${process.env.REACT_APP_API_URL}/${input[field]}`
    : '';

export const roundDecimal = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const formatPrice = (price, showSign = false) => {
  let formattedPrice = roundDecimal(Number(price));

  if (isNaN(formattedPrice)) formattedPrice = '';

  return formattedPrice + (showSign && ' €');
};

export const isNil = (value) => value == null;

export const AddToBody = (body = new FormData(), key, value) => {
  if (value) body.append(key, value);

  return body;
};

export const useSkeleton = (value, style = {}, count = 1) => {
  if (isNil(value)) return <Skeleton style={style} count={count} />;

  return value;
};

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const RemoveItemFromArray = (arr, item) => {
  var array = [...arr]; // make a separate copy of the array
  var index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
};

export const getOption = (options, value) =>
  options.find((o) => o.value == value);

export const toArray = (value) => (Array.isArray(value) ? value : [value]);
