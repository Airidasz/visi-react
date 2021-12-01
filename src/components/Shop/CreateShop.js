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
        navigate("/shop/" + data.id);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });

  const editShop = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + "/shop/" + id, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        //setCreateLocations(true);
        navigate("/shop/" + data.id);
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

  useEffect(() => {
    if (typeof id === "undefined") document.title = "Kurti parduotuvę";
    else document.title = "Redaguoti parduotuvę";
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (typeof id === "undefined") createShop();
    else editShop();
  };

  return (
    <div className="pageView">
      <div className="container" style={{ marginTop: "59px" }}>
        <div className="createShopGrid">
          <div>
            <form onSubmit={handleSubmit} className="form">
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
                  style={{ resize: "vertical", minHeight: "120px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="formControl">
                <input
                  type="submit"
                  className="btn-dark"
                  value={
                    typeof id === "undefined"
                      ? "Kurti parduotuvę"
                      : "Koreguoti parduotuvę"
                  }
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
