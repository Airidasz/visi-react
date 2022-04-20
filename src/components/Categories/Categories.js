/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './Categories.scss';
import Category from './Category';
import { useStore } from '../useStore';

const Categories = () => {
  const { store, setStore } = useStore();

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState({});

  const changeShowEdit = (id) => {
    setShowEdit((showEdit) => ({ ...showEdit, [id]: !showEdit[id] }));
  };

  useEffect(() => {
    const getCategories = async () => {
      if (store.categories) {
        setShowCreate(false);
        setShowEdit({});
      }
    };

    getCategories();

  }, [store.categories]);

  if (!store.categories)
    return <></>;

  return (
    <>
      <div className="page-title medium">
        Kategorijos
      </div>
      <div id="category-page" className="container">
        <input
          type="button"
          className="btn-dark-reverse my-2 w-100"
          value="Kurti naują"
          onClick={() => setShowCreate(!showCreate)}
        />
        <div className="categories-grid">
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
    </>
  );
};

export default Categories;
