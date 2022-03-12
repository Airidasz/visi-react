/* eslint-disable no-undef */
import { useContext } from 'react';
import { StoreContext } from './useStore';

const RefreshTokens = () => {
  const storeContext = useContext(StoreContext);

  const refreshToken = async (nextHandler = () => { }) => {
    var response = await fetch(process.env.REACT_APP_API_URL + '/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const jsonData = await response.json();
      storeContext.setAccessToken(jsonData.AccessToken);
      return nextHandler();
    }

    return response;
  };

  return refreshToken;
};

export default RefreshTokens;
