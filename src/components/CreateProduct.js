import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import RefreshTokens from "./RefreshTokens";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAlert } from "react-alert";

const CreateProduct = () => {
  const animatedComponents = makeAnimated();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shopid } = useParams();
  const { productid } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categoryOptions, setCategoryOptions] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(false);

  const getSelectedCategories = () => {
    let selectedCategoriesArr = [];
    if (typeof productid !== "undefined" && typeof shopid !== "undefined") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + shopid, {
        method: "GET",
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          if (data.userID != localStorage.getItem("userID")) navigate("/");
        })
        .catch((error) => {
          alert.error(error);
        });

      fetch(
        process.env.REACT_APP_API_URL +
          "/shop/" +
          shopid +
          "/product/" +
          productid,
        { method: "GET" }
      )
        .then(async (response) => {
          const data = await response;

          if (!response.ok) {
            const jsonData = await data.json();
            const error = (data && jsonData.message) || response.statusText;
            return Promise.reject(error);
          }

          const jsonData = await data.json();
          setName(jsonData.name);
          setDescription(jsonData.description);

          jsonData.categories.forEach((category) => {
            selectedCategoriesArr.push({
              value: category.id,
              label: category.name,
            });
          });
        })
        .catch((error) => {
          alert.error(error);
        });
    }
    setSelectedCategories(selectedCategoriesArr);
    return selectedCategoriesArr;
  };

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
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        navigate(-1);
      })
      .catch((error) => {
        alert.error(error);
      });
  });

  const editProduct = RefreshTokens(() => {
    const selectedCategoriesIDs = selectedCategories.map((cc) => {
      return cc.value;
    });
    fetch(
      process.env.REACT_APP_API_URL +
        "/shop/" +
        shopid +
        "/product/" +
        productid,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          name: name,
          description: description,
          categories: selectedCategoriesIDs,
        }),
      }
    )
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        navigate(-1);
      })
      .catch((error) => {
        alert.error(error);
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
        data.forEach((category) => {
          arr.push({ value: category.id, label: category.name });
        });

        setCategoryOptions(arr);
      })
      .catch((error) => {
        alert.error(error);
      });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (typeof productid === "undefined") createProduct();
    else editProduct();
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
              components={animatedComponents}
              defaultValue={getSelectedCategories}
              isMulti
              options={categoryOptions}
              closeMenuOnSelect={false}
              onChange={(categories) => {
                setSelectedCategories(categories);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
