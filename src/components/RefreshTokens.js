import SetUserInfo from "./SetUserInfo";

const RefreshTokens = (nextHandler) => {
  const setUserInfo = SetUserInfo();

  function refreshToken() {
    fetch(process.env.REACT_APP_API_URL + "/refresh", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      path: "/",
    }).then(async (response) => {
      const data = await response;

      if (response.ok) {
        const jsonData = await data.json();
        setUserInfo(jsonData.AccessToken);
      }

      nextHandler();
    });
  }
  return refreshToken;
};

export default RefreshTokens;
