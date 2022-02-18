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
import CreateShop from './components/Shop/CreateShop';
import Categories from './components/Categories/Categories';
import CreateProduct from './components/CreateProduct';

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

            <Route path="/shop/:name" element={<Shop />} />
            <Route path="/shop/:name/edit" element={<CreateShop />} />
            <Route path="/shop/new" element={<CreateShop />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shop/:shopid/product/new" element={<CreateProduct />} />
            <Route
              path="/shop/:shopid/product/:productid/edit"
              element={<CreateProduct />}
            />
          </Route>

          <Route path="*" exact={true} element={<Status404Page />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </AlertProvider>,
  document.getElementById('root')
);
