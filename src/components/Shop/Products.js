import { useEffect, useState } from "react";
import "./Shop.scss";
import Product from "./Product";

const Products = ({ shop }) => {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    if (typeof products !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + shop.id + "/products", {
        method: "GET",
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setProducts(data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [products]);

  if (typeof products !== "object")
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
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
