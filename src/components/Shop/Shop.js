import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import ShopMap from "../ShopMap";
import Products from "./Products";
import RefreshTokens from "../RefreshTokens";

const Shop = () => {
  let { id } = useParams();
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
        console.error("There was an error!", error);
      });
  });

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

  const tryDeleteShop = () => {
    const shouldDeleteShop = window.confirm(
      "Ar tikrai norite ištrinti šią parduotuvę?"
    );

    if (shouldDeleteShop) deleteShop();
  };

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
            <div style={{ display: "flex" }}>
              <a
                onClick={tryDeleteShop}
                className="btn-dark"
                style={{
                  width: "10rem",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Ištrinti
              </a>
              <Link
                to="edit"
                className="btn-dark"
                style={{
                  width: "10rem",
                  textAlign: "center",
                  display: "block",
                  marginLeft: "0.7rem",
                }}
              >
                Koreguoti
              </Link>
            </div>
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
