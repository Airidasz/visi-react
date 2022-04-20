import React, { useEffect, useState } from 'react';
import Header from './components/HeaderFooter/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-multi-carousel/lib/styles.css';
import Footer from './components/HeaderFooter/Footer';
import RefreshTokens from './components/RefreshTokens';
import Status404Page from './components/Status404Page';
import { useLocation } from 'react-router-dom';
import { useAuth } from './components/useAuth';

function App() {
  
  const {auth} = useAuth();
  const [initComplete, setInitComplete] = useState(false);
  const refreshToken = RefreshTokens();
  const location = useLocation();

  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Refresh tokens
      localStorage.removeItem('accessToken');
      await refreshToken();
      setInitComplete(true);
    };

    init();
  }, []);


  useEffect(() => {
    let access = true;

    switch(location.pathname){
      case '/profilis':
        access = Boolean(auth.user.isSet);
        break;

      case '/kategorijos':
        access = Boolean(auth.permissions.isAdmin);
        break;

      default:
        break;
    }

    setHasAccess(access);
  }, [location, auth]);


  if (!initComplete) return <div></div>;

  return (
    <div className="App">
      <Header />
      <div className='page-view'>
        {initComplete && <>
          {hasAccess ? <Outlet /> :  <Status404Page />}
        </>}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
