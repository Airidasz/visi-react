/* eslint-disable no-undef */
import React, { useState } from 'react';
import './Auth.scss';
import { useNavigate } from 'react-router-dom';
import useApi from '../useApi';
import { useStore } from '../useStore';

const Login = ({ setShowLoginMenu }) => {
  const navigate = useNavigate();

  const { setAccessToken } = useStore();
  const { PostRequest } = useApi();

  const loginFields = {
    name:'',
    password:''
  };

  const [loginInfo, setLoginInfo] = useState(loginFields);

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

    navigate('/');
  };

  return (
    <form className="form loginForm" onSubmit={handleSubmit}>
      <div className="formControl">
        <label>Prisijungimo vardas</label>
        <input
          autoFocus={true}
          type="text"
          value={loginInfo.name}
          onChange={(e) => setLoginInfo({...loginInfo, name:e.target.value})}
        />
      </div>
      <div className="formControl">
        <label>Slaptažodis</label>
        <input
          type="password"
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({...loginInfo, password:e.target.value})}
        />
      </div>

      <div className="formControl">
        <input type="submit" className="btn-dark" value="Prisijungti" />
      </div>
    </form>
  );
};

export default Login;
