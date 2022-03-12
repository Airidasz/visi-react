/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';
import { useAlert } from 'react-alert';

const Register = () => {
  useEffect(() => {
    document.title = 'Registruotis';
  }, []);

  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    password:'',
    repeatPassword: '',
    farmer:false
  });

  const alert = useAlert();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(process.env.REACT_APP_API_URL + '/register', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        navigate(-1);
      })
      .catch((error) => {
        alert.error(error);
      });
  };
  return (
    <div className="pageView">
      <form
        onSubmit={handleSubmit}
        className="form"
        style={{ marginTop: '59px' }}
      >
        <div className="formControl">
          <label>Prisijungimo vardas</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({...userInfo, name:e.target.value})}
          />
        </div>
        <div className="formControl">
          <label>Elektroninio paštas</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({...userInfo, email:e.target.value})}
          />
        </div>
        <div className="formControl">
          <label>Slaptažodis</label>

          <input
            type="password"
            value={userInfo.password}
            onChange={(e) => setUserInfo({...userInfo, password:e.target.value})}

          />
        </div>

        <div className="formControl">
          <label>Pakartokite slaptažodį</label>

          <input
            type="password"
            value={userInfo.repeatPassword}
            onChange={(e) => setUserInfo({...userInfo, repeatPassword:e.target.value})}

          />
        </div>

        <div className='d-flex'>
          <input
            type="checkbox"
            value={userInfo.farmer}
            onChange={(e) => setUserInfo({...userInfo, farmer:e.target.checked})}

          />
          <label className='ms-2'>Registruojuosi kaip ūkininkas</label>


        </div>
   

        <div className="formControl">
          <input type="submit" className="btn-dark" value="Registruotis" />
        </div>
      </form>
    </div>
  );
};

export default Register;
