import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./Shop.scss";
import ShopMap from "../ShopMap";
import RefreshTokens from "../RefreshTokens";
import { useAlert } from "react-alert";

const CreateShop = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createLocations, setCreateLocations] = useState(false);
  const [shopID, setShopID] = useState(id);
  const navigate = useNavigate();
  const alert = useAlert();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) navigate("/shop/" + shopID);
  }, [done]);

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
        const data = await response;

        if (!response.ok) {
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        const jsonData = await data.json();
        setShopID(jsonData.id);
        setCreateLocations(true);
      })
      .catch((error) => {
        alert.error(error);
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
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        setCreateLocations(true);
      })
      .catch((error) => {
        alert.error(error);
      });
  });

  useEffect(() => {
    if (localStorage.getItem("userID") === null) navigate("/");

    if (typeof id !== "undefined") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id, { method: "GET" })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          if (data.userID != localStorage.getItem("userID")) navigate("/");

          setName(data.name);
          setDescription(data.description);
        })
        .catch((error) => {
          alert.error(error);
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
            <ShopMap
              id={shopID}
              createLocations={createLocations}
              setDone={setDone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
