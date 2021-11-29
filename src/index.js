import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./fonts.css";
import "./index.css";

import App from "./App";
import FrontPage from "./components/FrontPage";
import Shop from "./components/Shop/Shop";
import Register from "./components/Auth/Register";
import CreateShop from "./components/Shop/CreateShop";
import Categories from "./components/Categories/Categories";
import CreateProduct from "./components/CreateProduct";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<FrontPage />} />

        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/shop/:id/edit" element={<CreateShop />} />
        <Route path="/shop/new" element={<CreateShop />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop/:shopid/product/new" element={<CreateProduct />} />
        <Route
          path="/shop/:shopid/product/:productid/edit"
          element={<CreateProduct />}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
