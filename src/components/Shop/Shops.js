import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Shops.scss";
import { useAlert } from "react-alert";

const Shops = () => {
  const [shopData, setShopData] = useState(false);
  const alert = useAlert();
  useEffect(() => {
    if (typeof shopData !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/shops", { method: "GET" })
        .then(async (response) => {
          const data = await response;

          if (!response.ok) {
            const jsonData = await data.json();
            const error = (data && jsonData.message) || response.statusText;
            return Promise.reject(error);
          }

          const jsonData = await data.json();
          setShopData(jsonData);
        })
        .catch((error) => {
          alert.error(error);
        });
    }
  }, [shopData]);

  if (typeof shopData !== "object") return <div></div>;

  return (
    <div className="shopsPage">
      <div className="title">
        <h2>Parduotuvės</h2>
      </div>

      <div className="grid">
        {shopData.map((data) => {
          return (
            <Link to={"/shop/" + data.id} key={data.id}>
              <div className="card">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Shops;
