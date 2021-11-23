import { useCookies } from "react-cookie";

const RefreshTokens = (nextHandler) => {
  const [cookies, ,] = useCookies(["Access-Token"]);

  async function refreshToken() {
    console.log(cookies["Access-Token"]);
    if (typeof cookies["Access-Token"] === "undefined") {
      const response = await fetch(process.env.REACT_APP_API_URL + "/refresh", {
        method: "POST",
        credentials: "include",
      });
    }

    console.log("going to next handler");
    nextHandler();
  }
  return refreshToken;
};

export default RefreshTokens;
