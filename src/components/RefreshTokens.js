/* eslint-disable no-undef */
import { useContext } from 'react';
import { AuthContext } from './useAuth';

const RefreshTokens = () => {
  const authContext = useContext(AuthContext);

  const refreshToken = async (nextHandler = () => { }) => {
    var response = await fetch(process.env.REACT_APP_API_URL + '/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const jsonData = await response.json();
      authContext.setAccessToken(jsonData.AccessToken);
      return nextHandler();
    }

    return response;
  };

  return refreshToken;
};

export default RefreshTokens;
