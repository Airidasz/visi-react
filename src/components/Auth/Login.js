/* eslint-disable no-undef */
import React, { useState } from 'react';
import './Auth.scss';
import { useNavigate } from 'react-router-dom';
import SetUserInfo from '../SetUserInfo';
import useApi from '../useApi';

const Login = ({ setShowLoginMenu }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUserInfo = SetUserInfo();

  const {PostRequest} = useApi();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const body = JSON.stringify({
      email: email,
      password: password,
    });

    const response = await PostRequest('login', body, false);
    if(!response)
      return;

    setEmail('');
    setPassword('');

    setUserInfo(data.AccessToken);
    setShowLoginMenu(false);

    navigate('/');
  };

  return (
    <form className="form loginForm" onSubmit={handleSubmit}>
      <div className="formControl">
        <label>Elektroninis paštas</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Slaptažodis</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="formControl">
        <input type="submit" className="btn-dark" value="Prisijungti" />
      </div>
    </form>
  );
};

export default Login;
