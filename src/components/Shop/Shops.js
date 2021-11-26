import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Shops.scss";

const Shops = () => {
  const [shopData, setShopData] = useState(false);

  useEffect(() => {
    if (typeof shopData !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/shops", { method: "GET" })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          setShopData(data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [shopData]);

  if (typeof shopData !== "object")
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

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
