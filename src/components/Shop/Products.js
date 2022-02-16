import React, { useEffect, useState } from "react";
import "./Shop.scss";
import Product from "./Product";
import { useAlert } from "react-alert";

const Products = ({ shop }) => {
  const [products, setProducts] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    if (typeof products !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + shop.id + "/products", {
        method: "GET",
      })
        .then(async (response) => {
          const data = await response;

          if (!response.ok) {
            const jsonData = await data.json();
            const error = (data && jsonData.message) || response.statusText;
            return Promise.reject(error);
          }

          setProducts(await data.json());
        })
        .catch((error) => {
          alert.error(error);
        });
    }
  }, [products]);

  if (typeof products !== "object") return <div></div>;

  return (
    <div className="products">
      {typeof products === "object" &&
        products.map((product) => {
          return (
            <Product shop={shop} product={product} setProducts={setProducts} />
          );
        })}
    </div>
  );
};

export default Products;
