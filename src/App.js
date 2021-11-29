import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import RefreshTokens from "./components/RefreshTokens";
import { useEffect } from "react";
import SetUserInfo from "./components/SetUserInfo";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    localStorage.clear();
    const refreshTokens = RefreshTokens(() => {
      Cookies.remove("Access-Token");
    });

    refreshTokens();
  }, []);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
