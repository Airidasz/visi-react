import { useEffect, useState } from "react";
import "./Categories.scss";
import RefreshTokens from "../RefreshTokens";
import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";
import check from "../../assets/check.svg";
import mark from "../../assets/mark.svg";
import EditCategory from "./EditCategory";

const Categories = () => {
  const [categories, setCategories] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState({});
  const [categoryName, setCategoryName] = useState("");

  const changeShowEdit = (id) => {
    setShowEdit((showEdit) => ({ ...showEdit, [id]: !showEdit[id] }));
  };

  const tryCreateCategory = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + "/categories", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: categoryName,
      }),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setCategoryName("");
        setShowCreate(false);
        setCategories(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });

  const tryDeleteCategory = (id) => {
    const shouldDeleteCategory = window.confirm(
      "Ar tikrai norite ištrinti šią parduotuvę?"
    );

    if (shouldDeleteCategory) {
      const deleteCategory = RefreshTokens(() => {
        fetch(process.env.REACT_APP_API_URL + "/category/" + id, {
          method: "DELETE",
          credentials: "include",
        })
          .then(async (response) => {
            const data = await response;

            if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
            }

            setCategories(false);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      });

      deleteCategory();
    }
  };

  useEffect(() => {
    if (typeof categories !== "object") {
      fetch(process.env.REACT_APP_API_URL + "/categories", { method: "GET" })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          var showEdit = {};
          data.map((category) => {
            showEdit[category.id] = false;
          });
          setShowEdit(showEdit);
          setCategories(data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [categories]);

  if (typeof categories !== "object") return <div className="pageView"></div>;

  return (
    <div className="pageView">
      <div className="container">
        <div className="title">
          <h2>Kategorijos</h2>
          <input
            type="button"
            className="btn-dark"
            value="Kurti naują"
            onClick={() => setShowCreate(!showCreate)}
          />
        </div>

        <div className="categoriesGrid">
          {showCreate && (
            <div className="card">
              <form action="" className="categoryForm">
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />

                <div className="actions">
                  <div
                    className="btn-circle"
                    style={{
                      background: "rgb(19, 148, 15)",
                      marginRight: "5px",
                    }}
                    onClick={tryCreateCategory}
                  >
                    <img src={check} className="actionButton" />
                  </div>
                  <div
                    className="btn-circle"
                    style={{
                      background: "rgb(175, 19, 19)",
                    }}
                    onClick={() => setShowCreate(false)}
                  >
                    <img src={mark} className="actionButton" />
                  </div>
                </div>
              </form>
            </div>
          )}

          {categories.map((category) => {
            if (!showEdit[category.id]) {
              return (
                <div className="card" key={category.id}>
                  <h4>{category.name}</h4>

                  <div className="actions">
                    <div
                      className="btn-circle"
                      style={{
                        background: "rgb(229, 139, 21)",
                        marginRight: "5px",
                      }}
                      onClick={() => {
                        changeShowEdit(category.id);
                      }}
                    >
                      <img src={pencil} className="actionButton" />
                    </div>
                    <div
                      className="btn-circle"
                      style={{ background: "rgb(175, 19, 19)" }}
                      onClick={() => {
                        tryDeleteCategory(category.id);
                      }}
                    >
                      <img src={trash} className="actionButton" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <EditCategory
                category={category}
                changeShowEdit={changeShowEdit}
                setCategories={setCategories}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
