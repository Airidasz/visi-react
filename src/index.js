import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap-utilities.css';
import './fonts.css';
import './index.css';

import App from './App';
import FrontPage from './components/FrontPage';
import Shop from './components/Shop/Shop';
import Register from './components/Auth/Register';
import Categories from './components/Categories/Categories';
import Product from './components/Products/Product';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { StoreProvider } from './components/useStore';
import AlertTemplate from 'react-alert-template-basic';
import Status404Page from './components/Status404Page';

const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  containerStyle: {
    zIndex: 99999999999999,
    top: '2.8rem',
  },
  transition: transitions.FADE,
};

render(
 
  <AlertProvider template={AlertTemplate} {...options}>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<FrontPage />} />

            <Route path="/:name" element={<Shop />} />
            <Route path="/shop/new" element={<Shop isNew={true}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/new" element={<Product isNew={true}/>} />
            <Route
              path="/product/:productName"
              element={<Product />}
            />

            <Route path="/404" element={<Status404Page />} />

            <Route path="*" exact={true} element={<Status404Page />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </AlertProvider>,
  document.getElementById('root')
);
