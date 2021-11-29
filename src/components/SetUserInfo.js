import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const SetUserInfo = () => {
  function setUserInfo() {
    if (typeof Cookies.get("Access-Token") !== "undefined") {
      var decodedToken = jwt_decode(Cookies.get("Access-Token"));
      localStorage.setItem("userID", decodedToken["id"]);
      localStorage.setItem("userEmail", decodedToken["email"]);
      localStorage.setItem("isAdmin", decodedToken["admin"]);
    }
  }

  return setUserInfo;
};

export default SetUserInfo;
