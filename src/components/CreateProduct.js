import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import RefreshTokens from "./RefreshTokens";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const CreateProduct = () => {
  const { shopid } = useParams();
  const { productid } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const animatedComponents = makeAnimated();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const createProduct = RefreshTokens(() => {
    const selectedCategoriesIDs = selectedCategories.map((cc) => {
      return cc.value;
    });
    fetch(process.env.REACT_APP_API_URL + "/shop/" + shopid + "/products", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        description: description,
        categories: selectedCategoriesIDs,
      }),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        navigate(-1);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/categories", {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        let arr = [];
        data.map((category) => {
          arr.push({ value: category.id, label: category.name });
        });

        setCategoryOptions(arr);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const navigate = useNavigate();
  const selectCategories = (categories) => {
    setSelectedCategories(categories);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    createProduct();
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
                    typeof productid === "undefined"
                      ? "Kurti prekę"
                      : "Koreguoti prekę"
                  }
                />
              </div>
            </form>
          </div>
          <div>
            <Select
              options={categoryOptions}
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={selectCategories}
              isMulti
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
