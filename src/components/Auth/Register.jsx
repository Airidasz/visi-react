/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';
import useApi from '../useApi';
import { useQuery } from '../Extras';
import { useStore } from '../useStore';

const Register = () => {
  useEffect(() => {
    document.title = 'Registruotis';
  }, []);
  
  let query = useQuery();
  const navigate = useNavigate();

  const { PostRequest } = useApi();
  const { setAccessToken } = useStore();
  
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    password:'',
    repeatPassword: '',
    farmer:false
  });

  const  handleSubmit = async (evt) => {
    evt.preventDefault();

    const body = JSON.stringify(userInfo);

    const response = await PostRequest('register', body, false);
    if (!response)
      return;

    const data = await response.json();

    setAccessToken(data.AccessToken);

    const ref = query.get('ref') ?? -1;
    navigate(ref);
  };

  return (
    <div className="page-view">
      <div className='page-title'>
        <h5>Registracija</h5>
      </div>
      <form
        onSubmit={handleSubmit}
        className="form mt-5"
      >
        <div className="form-control">
          <label htmlFor='name'>Prisijungimo vardas</label>
          <input
            id="name"
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({...userInfo, name:e.target.value})}
            required
            autoFocus
          />
        </div>
        <div className="form-control">
          <label htmlFor='email'>Elektroninis paštas</label>
          <input
            id="email"
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({...userInfo, email:e.target.value})}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor='password'>Slaptažodis</label>
          <input
            id="password"
            type="password"
            value={userInfo.password}
            onChange={(e) => setUserInfo({...userInfo, password:e.target.value})}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor='repeat-pasword'>Pakartokite slaptažodį</label>
          <input
            id="repeat-pasword"
            type="password"
            value={userInfo.repeatPassword}
            onChange={(e) => setUserInfo({...userInfo, repeatPassword:e.target.value})}
            required
          />
        </div>
        <div className='d-flex'>
          <input
            id="is-farmer"
            type="checkbox"
            value={userInfo.farmer}
            onChange={(e) => setUserInfo({...userInfo, farmer:e.target.checked})}
          />
          <label className='ms-2' htmlFor='is-farmer'>Registruojuosi kaip ūkininkas</label>
        </div>
        <div className="form-control">
          <input type="submit" className="btn-dark" value="Registruotis" />
        </div>
      </form>
    </div>
  );
};

export default Register;
