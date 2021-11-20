import './Header.scss';
import  { Link } from "react-router-dom";
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Header = () => {
    const [showLoginMenu, setShowLoginMenu] = useState(false);

    const [, , removeCookie] = useCookies(['Access-Token', 'Refresh-Token']);

    const userID = localStorage.getItem('userID')

    const toggleLoginMenu = () => {
        setShowLoginMenu(!showLoginMenu)
    };

    const logOut = () => {
        localStorage.clear();
        removeCookie('Access-Token');
        removeCookie('Refresh-Token');
    }

    return (
        <header>
            <div className="container">
                <div className="headerLogo"> <h1 style={{color:"white"}}>VisiUkiai</h1> </div>
                {userID == null ? <div className="menu">
                    <ul>
                        <Link to="/register/"><li>Registruotis</li></Link>
                        <a onClick={toggleLoginMenu}>Prisijungti</a>
                    </ul>
                    {showLoginMenu && <Login setShowLoginMenu={setShowLoginMenu} />}
                </div> : 
                <ul>
                    <Link to='/' onClick={logOut}><li>Atsijungti</li></Link>
                </ul>
                }
                
            </div>
        </header>
    )
}

export default Header
