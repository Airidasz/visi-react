/* eslint-disable no-undef */
import check from '../../assets/check.svg';
import mark from '../../assets/mark.svg';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import React, { useState } from 'react';
import useApi from '../useApi';
import { getImage } from '../Extras';
import EditableField from '../Products/components/EditableField';


const Category = ({ category, close = () => { }, reset = () => { }, edit, changeShowEdit = () => { } }) => {
  const [categoryName, setCategoryName] = useState(category ? category.name : '');
  const [file, setFile] = useState();

  const { PostRequest, PutRequest, DeleteRequest } = useApi();

  const tryAddEditCategory = async () => {
    var data = new FormData();
    data.append('name', categoryName);

    if(file)
      data.append('file', file);

    let response = null;

    if (category) // edit
      response = await PutRequest(`category/${category.id}`, data);
    else         // add
      response = await PostRequest('categories', data);

    if (response) {
      reset();
      setCategoryName('');
    }
  };

  const tryDeleteCategory = async () => {
    const shouldDeleteCategory = window.confirm(
      'Ar tikrai norite ištrinti šią parduotuvę?'
    );

    if (shouldDeleteCategory) {
      const response = await DeleteRequest(`category/${category.id}`);
      if (response) {
        reset();
      }
    }
  };

  const onInfoChange = (field, value) => {
    if(field == 'file') {
      setFile(value);
    }else{
      setCategoryName(value);
    } 
  };

  return (
    <div className="card">
      <div>
        <EditableField field="file" type="file" edit={edit} onChange={onInfoChange} >
          <img src={getImage(category,'file')} />
        </EditableField>
      </div>
      <div>
        <EditableField field="name" edit={edit} onChange={onInfoChange} editClassname="w-100">
          <h4>{category?.name}</h4>
        </EditableField>
      </div>
         
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
    </div>
  );
};

export default Category;
