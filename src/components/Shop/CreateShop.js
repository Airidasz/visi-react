import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./Shop.scss";
import ShopMap from "../ShopMap";
import RefreshTokens from "../RefreshTokens";

const CreateShop = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createLocations, setCreateLocations] = useState(false);
  const [shopID, setShopID] = useState(id);
  const navigate = useNavigate();
  const createShop = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + "/shops", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setShopID(data.id);
        setCreateLocations(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });

  useEffect(() => {
    if (typeof id !== "undefined") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id, { method: "GET" })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setName(data.name);
          setDescription(data.description);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createShop();
  };

  return (
    <div className="pageView" style={{ marginTop: "59px" }}>
      <div className="container">
        <div className="createShopGrid">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="formControl" style={{ marginTop: "0" }}>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formControl">
                <label>Aprašymas</label>

                <textarea
                  style={{ resize: "vertical" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="formControl">
                <input
                  type="submit"
                  className="btn-dark"
                  value="Kurti parduotuvę"
                />
              </div>
            </form>
          </div>
          <div>
            <ShopMap id={shopID} createLocations={createLocations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
