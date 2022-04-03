/* eslint-disable no-undef */
import React, { useState, useRef,useEffect } from 'react';
import './Auth.scss';
import { useAuth } from '../useAuth';
import useApi from '../useApi';

const Login = ({ setShowLoginMenu = () => {}, onSuccess = () => {}}) => {
  const loginRef = useRef(null);

  const { setAccessToken } = useAuth();
  const { PostRequest } = useApi();

  const loginFields = {
    name:'',
    password:''
  };

  const [loginInfo, setLoginInfo] = useState(loginFields);

  useEffect(() => {
    const handleClickOutside = (event) =>{
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loginRef]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const body = JSON.stringify(loginInfo);

    const response = await PostRequest('login', body, false);
    if (!response)
      return;

    setLoginInfo({...loginFields});

    const data = await response.json();

    setAccessToken(data.AccessToken);
    setShowLoginMenu(false);

    onSuccess();
  };

  return (
    <form className="form login-form" onSubmit={handleSubmit} ref={loginRef}>
      <div className="form-control">
        <label>Prisijungimo vardas</label>
        <input
          autoFocus={true}
          type="text"
          value={loginInfo.name}
          onChange={(e) => setLoginInfo({...loginInfo, name:e.target.value})}
        />
      </div>
      <div className="form-control">
        <label>Slaptažodis</label>
        <input
          type="password"
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({...loginInfo, password:e.target.value})}
        />
      </div>

      <div className="form-control">
        <input type="submit" className="btn-dark" value="Prisijungti" />
      </div>
    </form>
  );
};

export default Login;
