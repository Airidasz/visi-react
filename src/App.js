import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import RefreshTokens from "./components/RefreshTokens";
import { useEffect, useState } from "react";

function App() {
  const [tokensRefreshed, setTokensRefreshed] = useState(false);
  useEffect(() => {
    localStorage.clear();

    const refreshTokens = RefreshTokens(() => {
      setTokensRefreshed(true);
    });
    refreshTokens();
  }, []);

  if (!tokensRefreshed) return <div></div>;

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
