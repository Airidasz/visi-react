import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ShopMap from "../ShopMap";
import Products from "./Products";

const Shop = () => {
  let { id } = useParams();
  const [shop, setShop] = useState(false);

  useEffect(() => {
    if (typeof shop !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id, { method: "GET" })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setShop(data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [shop]);

  if (typeof shop !== "object")
    return (
      <div className="pageView">
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className="pageView">
      <div className="container">
        <div className="title">
          <h1>{shop.name}</h1>
          {localStorage.getItem("userID") == shop.userID && (
            <Link
              to="edit"
              className="btn-dark"
              style={{ width: "10rem", textAlign: "center" }}
            >
              Koreguoti
            </Link>
          )}
        </div>
        <div className="shop">
          <p style={{ marginBottom: "15px" }}>{shop.description}</p>
          <ShopMap id={id} editable={false} />
          <h2>Ūkio siūlomi produktai</h2>
          <Products shopID={id} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
