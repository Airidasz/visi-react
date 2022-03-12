/* eslint-disable no-undef */

export const getImage = (input, field) => input && input[field]  && input[field]  !== '' ? `${process.env.REACT_APP_API_URL}/${input[field]}` : '';
