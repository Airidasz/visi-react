import Cookies from "js-cookie";
import SetUserInfo from "./SetUserInfo";

const RefreshTokens = (nextHandler) => {
  const setUserInfo = SetUserInfo();

  async function refreshToken() {
    if (typeof Cookies.get("Access-Token") === "undefined") {
      const response = await fetch(process.env.REACT_APP_API_URL + "/refresh", {
        method: "POST",
        credentials: "include",
      });

      setUserInfo();
    }

    nextHandler();
  }
  return refreshToken;
};

export default RefreshTokens;
