import jwt_decode from 'jwt-decode';

const SetUserInfo = () => {
  function setUserInfo(accessToken) {
    localStorage.clear();

    var decodedToken = jwt_decode(accessToken);
    localStorage.setItem('userID', decodedToken['id']);
    localStorage.setItem('userEmail', decodedToken['email']);
    localStorage.setItem('isAdmin', decodedToken['admin']);
  }

  return setUserInfo;
};

export default SetUserInfo;
