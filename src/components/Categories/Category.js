/* eslint-disable no-undef */
import check from '../../assets/check.svg';
import mark from '../../assets/mark.svg';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import useApi from '../useApi';


const Category = ({ category, close = () => {}, reset = () => {} , edit, changeShowEdit = () => {} }) => {
  const [categoryName, setCategoryName] = useState(category ? category.name : '');
  const [file, setFile] = useState();

  const { PostRequest, PutRequest, DeleteRequest }  = useApi();

  const tryAddEditCategory = async () => {
    var data = new FormData();
    data.append('file', file);
    data.append('name', categoryName);

    let response = null;

    if(category) // edit
      response = await PutRequest(`category/${category.id}`, data); 
    else         // add
      response = await PostRequest('categories', data); 

    if(response) {
      reset();
      setCategoryName('');
    }
  };

  const tryDeleteCategory = async (id) => {
    const shouldDeleteCategory = window.confirm(
      'Ar tikrai norite ištrinti šią parduotuvę?'
    );

    if (shouldDeleteCategory) {
      const response = await DeleteRequest(`category/${id}`);
      if(response) {
        reset();
      }
    }
  };

  const getImage = (category) => category && category.file !== '' ? `${process.env.REACT_APP_API_URL}/${category.file}` : '';

  return (
    <div className="card">
      <form action="" className="categoryForm">
        {edit ? (<div>
          <FileUpload setFile={setFile}/>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>):(
          <div className="flex items-center">
            <img src={getImage(category)} style={{width:'100px', height:'100px', background:'black'}}/>
            <h4>{category.name}</h4>
          </div>)
        }
        <div className="actions">
          <div
            className={`btn-circle me-1 ${(edit ? 'success' : 'warning')}`}
            onClick={() => edit ? tryAddEditCategory() : changeShowEdit(category.id)}
          >
            <img src={edit ? check : pencil} className="actionButton" />
          </div>
          <div className="btn-circle danger"
            onClick={() => edit ? close() : tryDeleteCategory(category.id)}
          >
            <img src={edit ? mark : trash} className="actionButton" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Category;
