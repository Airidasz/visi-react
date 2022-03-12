import './Header.scss';
import Login from './Auth/Login';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useApi from './useApi';
import { useStore } from './useStore';

const Header = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const location = useLocation();
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const { PostRequest } = useApi();
  const { store, resetStore } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowMenu(false);
    setShowLoginMenu(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="container">
        <div className="logo">
          <h1>
            <Link to="/">VisiŪkiai</Link>
          </h1>
        </div>

        <div
          className="hamburger"
          onClick={() => {
            setShowLoginMenu(false);
            toggleMenu();
          }}
        ></div>
        {!store.user.isSet ? (
          <div className="menu" style={showMenu ? { display: 'block' } : {}}>
            <ul>
              <Link to="/register/">
                <li>Registruotis</li>
              </Link>

              <a onClick={toggleLoginMenu}>
                <li>Prisijungti</li>
              </a>
            </ul>
            {showLoginMenu && <Login setShowLoginMenu={setShowLoginMenu} />}
          </div>
        ) : (
          <div className="menu" style={showMenu ? { display: 'block' } : {}}>
            <ul>
              {store.permissions.isAdmin && (
                <Link to="/categories">
                  <li>Kategorijos</li>
                </Link>
              )}
              {store.permissions.isFarmer && (
                <Link to={store.user.shop ? `/${store.user.shop}` : '/shop/new'}>
                  <li>Parduotuvė</li>
                </Link>)}
              <Link to="/" onClick={logOut}>
                <li>Atsijungti</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
