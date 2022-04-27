import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap-utilities.css';
import './fonts.css';
import './index.css';

import App from './App';
import FrontPage from './components/FrontPage';
import ShopPage from './components/Shop/ShopPage';
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
import BuyPage from './components/Cart/BuyPage';
import BuyLoginPage from './components/Cart/BuyLoginPage';
import ShippingPage from './components/Cart/ShippingPage';
import PaymentPage from './components/Cart/PaymentPage';
import PurchaseCompletePage from './components/Cart/PurchaseCompletePage';
import OverviewPage from './components/Cart/OverviewPage';
import ProfilePage from './components/Profile/ProfilePage';
import { AuthProvider } from './components/useAuth';
import ShopsPage from './components/Shop/ShopsPage';

const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  containerStyle: {
    zIndex: 99999999999999,
    top: '2.8rem',
  },
  transition: transitions.FADE,
};

render(
  <AlertProvider template={AlertTemplate} {...options}>
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<FrontPage />} />

                <Route path="/parduotuve/:name" element={<ShopPage />} />
                <Route
                  path="/nauja/parduotuve"
                  element={<ShopPage isNew={true} />}
                />
                <Route path="/registruotis" element={<Register />} />
                <Route path="/kategorijos" element={<Categories />} />
                <Route path="/prekes" element={<ProductsPage />} />
                <Route path="/parduotuves" element={<ShopsPage />} />
                <Route path="/profilis" element={<ProfilePage />} />
                <Route path="/pirkti" element={<BuyPage />}>
                  <Route path="/pirkti/krepselis" element={<CartPage />} />
                  <Route
                    path="/pirkti/prisijungti"
                    element={<BuyLoginPage />}
                  />
                  <Route path="/pirkti/siuntimas" element={<ShippingPage />} />
                  <Route path="/pirkti/mokejimas" element={<PaymentPage />} />
                  <Route path="/pirkti/perziura" element={<OverviewPage />} />
                </Route>
                <Route
                  path="/pirkti/pavyko"
                  element={<PurchaseCompletePage />}
                />
                <Route
                  path="/nauja/preke"
                  element={<ProductPage isNew={true} />}
                />
                <Route path="/:productName" element={<ProductPage />} />
                <Route path="/404" element={<Status404Page />} />
                <Route path="*" exact={true} element={<Status404Page />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  </AlertProvider>,
  document.getElementById('root')
);
