import './Header.scss';
import Login from '../Auth/Login';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useApi from '../useApi';
import { useStore } from '../useStore';
import { useAuth } from '../useAuth';
import { Icon } from '@iconify/react';
import ShoppingCart from '../ShoppingCart';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const { PostRequest } = useApi();
  const { store,setStore, isMobile } = useStore();
  const {auth, resetAuth} = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowMenu(false);
    setShowLoginMenu(false);
  }, [location]);

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOut = async () => {
    localStorage.clear();

    const response = await PostRequest('logout');
    if (!response)
      return;

    setStore({...store, cart:[]});
    resetAuth();
    setShowLoginMenu(false);
    navigate('/');
  };


  return (
    <header
      // className={offset > 10 || location.pathname !== '/' ? 'solid' : ''}
      className='solid'
    >
      <div className='header-top'>
        <div className="container">
          <div className="menu" style={showMenu ? { display: 'block' } : {}}>
            <ul>
              {auth.user.isSet ? (
                <React.Fragment>
                  {auth.permissions.isAdmin && (
                    <Link to="/kategorijos">
                      <li>Kategorijos</li>
                    </Link>
                  )}
                  {auth.permissions.isFarmer && (
                    <React.Fragment>
                      <Link to={auth.user.shop ? `/${auth.user.shop}` : '/nauja/parduotuve'}>
                        <li>Parduotuvė</li>
                      </Link>
                      <HashLink smooth={true} to="/profilis#uzsakymai">
                        <li>Užsakymai</li>
                      </HashLink>
                    </React.Fragment>
                  )}
            
                  <Link to="/" onClick={logOut}>
                    <li>Atsijungti</li>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link to="/registruotis">
                    <li>Registruotis</li>
                  </Link>

                  <a onClick={toggleLoginMenu}>
                    <li>Prisijungti</li>
                  </a>
                </React.Fragment>
              )}
              {isMobile && (
                <Link to="/prekes">
                  <li>Prekės</li>
                </Link>
              )}
            </ul>
            {showLoginMenu && <Login setShowLoginMenu={setShowLoginMenu}/>}
          </div>
        </div>
      </div>
      <div className='header-bottom container'>
        <div className="logo">
          <h1>
            <Link to="/">VisiŪkiai</Link>
          </h1>
        </div>
        {isMobile  ? (  
          <div className='mobile-menu'>
            {auth.permissions.isBuyer && <ShoppingCart/>}
            <Icon className="hamburger" icon="charm:menu-hamburger"  onClick={() => {
              setShowLoginMenu(false);
              toggleMenu();
            }}/>
          </div>
        ) : ( <div className="menu">
          <ul>
            <Link to="/prekes">
              <li>Prekės</li>
            </Link>
            {auth.permissions.isBuyer && <ShoppingCart/>}
          </ul></div>)}

      </div>
    </header>
  );
};

export default Header;
