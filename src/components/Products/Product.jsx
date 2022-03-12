
import React, { useState, useEffect } from 'react';
import './ProductStyles.scss';
 
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useStore } from '../useStore';
import useApi from '../useApi';
import EditableField from './components/EditableField';
import { getImage } from '../Extras';

const Product = ({isNew}) => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const { productName } = useParams();

  const { store, loadCategories, isMobile } = useStore();
  const { GetRequest, PutRequest, PostRequest } = useApi();

  const [editing, setEditing] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    codename:'',
    description: '',
    categories: []
  });

  const [file, setFile] = useState();

  useEffect(() => {
    const getProductInfo = async () => {
      if (!productName)
        return;

      const getProductResponse = await GetRequest(`product/${productName}`, null, false);
      if (!getProductResponse)
        return;

      const productJson = await getProductResponse.json();

      product.name = productJson.name;
      product.description = productJson.description;
      product.categories = productJson.categories.map((category) => ({ value: category.id, label: category.name, }));
      product.image = productJson.image;
      product.codename = productJson.codename;

      setProduct({ ...product });
    };

    getProductInfo();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      if (store.categories) {
        const categoryOptions = store.categories.map((category) => ({ value: category.id, label: category.name }));
        setCategoryOptions([...categoryOptions]);
        return;
      }

      await loadCategories();
    };

    getCategories();
  }, [store.categories]);

  const addEditProduct = async () => {
    const selectedCategoryIDs = product.categories.map(cc => cc.value);

    // const body = JSON.stringify({
    //   name: product.name,
    //   description: product.description,
    //   categories: selectedCategoryIDs,
    // });

    var body = new FormData();
    body.append('name', product.name);
    body.append('description', product.description);
    body.append('categories', JSON.stringify(selectedCategoryIDs));
    body.append('file', file);

    let response = null;
    if (!productName)
      response = await PostRequest('products', body);
    else
      response = await PutRequest(`product/${productName}`, body);

    if (response) {
      const data = await response.json();
      onAddEditFinish(data.codename);
    }
  };

  const inEditMode = ()=> {
    return isNew || editing;
  };

  const editSaveBtn = () => {
    if(inEditMode()) 
      addEditProduct();
    else 
      setEditing(true);
  };

  const onInfoChange = (field, value) => {
    if(field == 'file') {
      setFile(value);
    }else{
      product[field] = value;
      setProduct({...product});
    } 
  };

  const onAddEditFinish = (codename) => {
    navigate(`/product/${codename}`, {replace:true});
    setEditing(false);
  };

  return (
    <div className="pageView">
      <div className="container">
        <div id="product-layout" className={isMobile ? 'mobile': ''}>
          <EditableField field="file" type="file" edit={inEditMode()} onChange={onInfoChange} >
            <img src={getImage(product, 'image')} style={{width:'100%', height:'auto'}}/>
          </EditableField>
          <div>
            <div className="formControl" style={{ marginTop: '0' }}>
              <EditableField field="name" value={product.name} edit={inEditMode()} onChange={onInfoChange} >
                <div>{product.name}</div>
              </EditableField>
            </div>
            <div className="formControl">
              <EditableField field="description" value={product.description} edit={inEditMode()} onChange={onInfoChange} type={'textfield'} >
                <div>{product.description}</div>
              </EditableField>
            </div>
            {inEditMode() ? <Select
              components={animatedComponents}
              value={product.categories}
              isMulti
              options={categoryOptions}
              closeMenuOnSelect={false}
              onChange={(categories) => setProduct({ ...product, categories })}
            /> : (        <div className="categories">
              {product.categories.map((category) => (
                <div key={category.value} className="category">
                  {category.label}
                </div>
              ))}
            </div>)}

            <div className="formControl">
              <button onClick={editSaveBtn} className="btn-dark">
                {inEditMode() ? 'Išsaugoti': 'Koreguoti'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
