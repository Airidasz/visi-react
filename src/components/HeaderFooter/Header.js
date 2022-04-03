import './Header.scss';
import Login from '../Auth/Login';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useApi from '../useApi';
import { useStore } from '../useStore';
import { Icon } from '@iconify/react';
import ShoppingCart from '../ShoppingCart';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const { PostRequest } = useApi();
  const { store, resetStore, isMobile } = useStore();

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

    resetStore();
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
              {store.user.isSet? (
                <React.Fragment>
                  {store.permissions.isAdmin && (
                    <Link to="/kategorijos">
                      <li>Kategorijos</li>
                    </Link>
                  )}
                  {store.permissions.isFarmer && (
                    <React.Fragment>
                      <Link to={store.user.shop ? `/${store.user.shop}` : '/nauja/parduotuve'}>
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
            {store.permissions.isBuyer && <ShoppingCart/>}
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
            {store.permissions.isBuyer && <ShoppingCart/>}
          </ul></div>)}

      </div>
    </header>
  );
};

export default Header;
