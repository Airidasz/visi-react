import Header from './components/HeaderFooter/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Footer from './components/HeaderFooter/Footer';
import RefreshTokens from './components/RefreshTokens';
import React, { useEffect, useState } from 'react';

function App() {
  const [tokensRefreshed, setTokensRefreshed] = useState(false);

  const refreshToken = RefreshTokens();

  useEffect(() => {
    const init = async () => {
      // Refresh tokens
      localStorage.removeItem('accessToken');
      await refreshToken();
      setTokensRefreshed(true);
    };

    init();
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
