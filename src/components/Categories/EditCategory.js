import check from "../../assets/check.svg";
import mark from "../../assets/mark.svg";
import { useState } from "react";
import RefreshTokens from "../RefreshTokens";

const EditCategory = ({ category, changeShowEdit, setCategories }) => {
  const [categoryName, setCategoryName] = useState(category.name);

  const tryEditCategory = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + "/category/" + category.id, {
      method: "PUT",
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

        changeShowEdit(category.id);
        setCategories(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });

  return (
    <div className="card" key={category.id}>
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
            onClick={tryEditCategory}
          >
            <img src={check} className="actionButton" />
          </div>
          <div
            className="btn-circle"
            style={{
              background: "rgb(175, 19, 19)",
            }}
            onClick={() => changeShowEdit(category.id)}
          >
            <img src={mark} className="actionButton" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
