import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import ShopMap from "../ShopMap";
import Products from "./Products";
import RefreshTokens from "../RefreshTokens";
import { useAlert } from "react-alert";

const Shop = () => {
  useEffect(() => {
    document.title = "Parduotuvė";
  }, []);
  const alert = useAlert();
  let { shopid } = useParams();
  const id = shopid;
  const [shop, setShop] = useState(false);
  const navigate = useNavigate();
  const deleteShop = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + "/shop/" + id, {
      method: "DELETE",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        navigate("/");
      })
      .catch((error) => {
        alert.error(error);
      });
  });

  useEffect(() => {
    if (typeof shop !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id, { method: "GET" })
        .then(async (response) => {
          const data = await response;

          if (!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
          }

          setShop(await data.json());
        })
        .catch((error) => {
          alert.error(error);
        });
    }
  }, [shop]);

  const tryDeleteShop = () => {
    const shouldDeleteShop = window.confirm(
      "Ar tikrai norite ištrinti šią parduotuvę?"
    );

    if (shouldDeleteShop) deleteShop();
  };

  if (typeof shop !== "object") return <div className="pageView"></div>;

  return (
    <div className="pageView">
      <div className="container">
        <div className="title">
          <h1>{shop.name}</h1>
          {localStorage.getItem("userID") == shop.userID && (
            <div className="shop-buttons">
              <a onClick={tryDeleteShop} className="btn-dark">
                Ištrinti
              </a>
              <Link to="edit" className="btn-dark">
                Koreguoti
              </Link>
            </div>
          )}
        </div>
        <div className="shop">
          <p style={{ marginBottom: "15px" }}>{shop.description}</p>

          <ShopMap id={id} editable={false} />
          <div className="products-title">
            <h2>Ūkio siūlomi produktai</h2>
            {localStorage.getItem("userID") == shop.userID && (
              <Link to="product/new" className="btn-dark">
                Kurti naują prekę
              </Link>
            )}
          </div>
          <Outlet />
          <Products shop={shop} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
