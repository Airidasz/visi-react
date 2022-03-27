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
import ProductPage from './components/Products/ProductPage';
import ProductsPage from './components/Products/ProductsPage';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { StoreProvider } from './components/useStore';
import { CartProvider } from './components/useCart';
import AlertTemplate from 'react-alert-template-basic';
import Status404Page from './components/Status404Page';
import CartPage from './components/Cart/CartPage';

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
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<FrontPage />} />

              <Route path="/:name" element={<Shop />} />
              <Route path="/nauja/parduotuve" element={<Shop isNew={true}/>} />
              <Route path="/registruotis" element={<Register />} />
              <Route path="/kategorijos" element={<Categories />} />
              <Route path="/prekes" element={<ProductsPage />} />
              <Route path="/pirkti" element={<CartPage />} />

              <Route path="/nauja/preke" element={<ProductPage isNew={true}/>} />
              <Route
                path="/preke/:productName"
                element={<ProductPage />}
              />

              <Route path="/404" element={<Status404Page />} />

              <Route path="*" exact={true} element={<Status404Page />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </StoreProvider>
  </AlertProvider>,
  document.getElementById('root')
);
