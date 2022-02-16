import SetUserInfo from './SetUserInfo';

const RefreshTokens = () => {
  const setUserInfo = SetUserInfo();

  const refreshToken = async (nextHandler = () => {}) => {
    var response = await fetch(process.env.REACT_APP_API_URL + '/refresh', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      path: '/',
    });

    if (response.ok) {
      const jsonData = await response.json();
      setUserInfo(jsonData.AccessToken);
      return nextHandler(); 
    }

    return response;
  };

  return refreshToken;
};

export default RefreshTokens;
