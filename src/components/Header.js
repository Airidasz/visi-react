import "./Header.scss";
import { Link } from "react-router-dom";
import Login from "./Auth/Login";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const location = useLocation();

  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    setShowMenu(false);
    setShowLoginMenu(false);
  }, [location]);

  useEffect(() => {
    window.onresize = () => {
      if (!isMobile && window.innerWidth < 769) setShowMenu(false);

      setIsMobile(window.innerWidth < 768);
    };

    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, [isMobile]);

  const [, , removeCookie] = useCookies(["Access-Token", "Refresh-Token"]);

  const userID = localStorage.getItem("userID");

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    localStorage.clear();
    removeCookie("Access-Token");
    removeCookie("Refresh-Token");
    setShowLoginMenu(false);
    navigate("/");
  };

  return (
    <header
      className={offset > 10 || location.pathname !== "/" ? "solid" : undefined}
    >
      <div className="container">
        <div className="logo">
          <h1>
            <Link to="/">VisiŪkiai</Link>
          </h1>
        </div>

        <div className="hamburger" onClick={toggleMenu}></div>

        {userID == null ? (
          <div className="menu" style={showMenu ? { display: "block" } : {}}>
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
          <div className="menu" style={showMenu ? { display: "block" } : {}}>
            <ul>
              <Link to="/shop/new/">
                <li>Sukurti naują parduotuvę</li>
              </Link>
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
