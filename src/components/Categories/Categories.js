/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import './Categories.scss';
import RefreshTokens from '../RefreshTokens';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import check from '../../assets/check.svg';
import mark from '../../assets/mark.svg';
import EditCategory from './EditCategory';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';

const Categories = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/');

    document.title = 'Kategorijos';
  }, []);
  const alert = useAlert();
  const [categories, setCategories] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState({});
  const [categoryName, setCategoryName] = useState('');

  const changeShowEdit = (id) => {
    setShowEdit((showEdit) => ({ ...showEdit, [id]: !showEdit[id] }));
  };

  const tryCreateCategory = RefreshTokens(() => {
    fetch(process.env.REACT_APP_API_URL + '/categories', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: categoryName,
      }),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const jsonData = await data.json();
          const error = (data && jsonData.message) || response.statusText;
          return Promise.reject(error);
        }

        setCategoryName('');
        setShowCreate(false);
        setCategories(false);
      })
      .catch((error) => {
        console.log(error);
        //alert.error(error);
      });
  });

  const tryDeleteCategory = (id) => {
    const shouldDeleteCategory = window.confirm(
      'Ar tikrai norite ištrinti šią parduotuvę?'
    );

    if (shouldDeleteCategory) {
      const deleteCategory = RefreshTokens(() => {
        fetch(process.env.REACT_APP_API_URL + '/category/' + id, {
          method: 'DELETE',
          credentials: 'include',
        })
          .then(async (response) => {
            const data = await response;

            if (!response.ok) {
              const jsonData = await data.json();
              const error = (data && jsonData.message) || response.statusText;
              return Promise.reject(error);
            }

            setCategories(false);
          })
          .catch((error) => {
            alert.error(error);
          });
      });

      deleteCategory();
    }
  };

  useEffect(() => {
    if (typeof categories !== 'object') {
      fetch(process.env.REACT_APP_API_URL + '/categories', { method: 'GET' })
        .then(async (response) => {
          const data = await response;

          if (!response.ok) {
            const jsonData = await data.json();
            const error = (data && jsonData.message) || response.statusText;
            return Promise.reject(error);
          }
          const jsonData = await data.json();

          var showEdit = {};
          jsonData.forEach((category) => {
            showEdit[category.id] = false;
          });
          setShowEdit(showEdit);
          setCategories(jsonData);
        })
        .catch((error) => {
          alert.error(error);
        });
    }
  }, [categories]);

  if (typeof categories !== 'object') return <div className="pageView"></div>;

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
                      background: 'rgb(19, 148, 15)',
                      marginRight: '5px',
                    }}
                    onClick={tryCreateCategory}
                  >
                    <img src={check} className="actionButton" />
                  </div>
                  <div
                    className="btn-circle"
                    style={{
                      background: 'rgb(175, 19, 19)',
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
                
                  <div className="flex items-center">
                    <div className="ml-2" style={{width:'100px', height:'100px', background:'black'}}></div>
                    <h4>{category.name}</h4>
                  </div>
                  <div className="actions">
                    <div
                      className="btn-circle"
                      style={{
                        background: 'rgb(229, 139, 21)',
                        marginRight: '5px',
                      }}
                      onClick={() => {
                        changeShowEdit(category.id);
                      }}
                    >
                      <img src={pencil} className="actionButton" />
                    </div>
                    <div
                      className="btn-circle"
                      style={{ background: 'rgb(175, 19, 19)' }}
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
              <EditCategory key={category.id}
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
