/* eslint-disable no-undef */
import check from '../../assets/check.svg';
import mark from '../../assets/mark.svg';
import { useState } from 'react';
import RefreshTokens from '../RefreshTokens';
import { useAlert } from 'react-alert';
import FileUpload from '../FileUpload';

const EditCategory = ({ category, changeShowEdit, setCategories }) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [file, setFile] = useState(category.name);

  const alert = useAlert();

  const tryEditCategory = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + '/category/' + category.id, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        name: categoryName,
        file: file
      }),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        changeShowEdit(category.id);
        setCategories(false);
      })
      .catch((error) => {
        alert.error(error);
      });
  });

  return (
    <div className="card" key={category.id}>
      <form action="" className="categoryForm">
        <div>
          <FileUpload setFile={setFile}/>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="actions">
          <div
            className="btn-circle"
            style={{
              background: 'rgb(19, 148, 15)',
              marginRight: '5px',
            }}
            onClick={tryEditCategory}
          >
            <img src={check} className="actionButton" />
          </div>
          <div
            className="btn-circle"
            style={{
              background: 'rgb(175, 19, 19)',
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
