/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './Categories.scss';
import Category from './Category';
import { useNavigate } from 'react-router';
import { useStore } from '../useStore';


const Categories = () => {
  const navigate = useNavigate();
  const { store, setStore, loadCategories } = useStore();

  useEffect(() => {
    if (!store.permissions.isAdmin) navigate('/');

    document.title = 'Kategorijos';
  }, []);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState({});

  const changeShowEdit = (id) => {
    setShowEdit((showEdit) => ({ ...showEdit, [id]: !showEdit[id] }));
  };

  useEffect(() => {
    const getCategories = async () => {
      if (!store.categories)
        await loadCategories();

      else {
        setShowCreate(false);
        setShowEdit({});
      }
    };

    getCategories();

  }, [store.categories]);

  if (!store.categories)
    return <div className="pageView"></div>;

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
            <Category
              reset={() => setStore({ ...store, categories: null })}
              close={() => setShowCreate(false)}
              edit={true}
            />
          )}
          {store.categories.map((category) => (
            <Category key={category.id}
              category={category}
              reset={() => setStore({ ...store, categories: null })}
              close={() => changeShowEdit(category.id)}
              changeShowEdit={changeShowEdit}
              edit={showEdit[category.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
