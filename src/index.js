import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

import App from "./App";
import FrontPage from "./components/FrontPage";
import Shop from "./components/Shop/Shop";
import Register from "./components/Auth/Register";
import CreateShop from "./components/Shop/CreateShop";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <BrowserRouter>
    <CookiesProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<FrontPage />} />

            <Route path="/shop/:id" element={<Shop />} />
            <Route path="/shop/:id/edit" element={<CreateShop />} />
            <Route path="/shop/new" element={<CreateShop />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Provider>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
