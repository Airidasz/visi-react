
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
import AddToCartBtn from '../Cart/AddToCartBtn';

const Product = ({isNew}) => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const { productName } = useParams();

  const { store, isMobile } = useStore();
  const { GetRequest, PutRequest, PostRequest } = useApi();

  const [editing, setEditing] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    codename:'',
    description: '',
    categories: [],
    shop:{}
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
      productJson.categories = productJson.categories.map((category) => ({ value: category.id, label: category.name, }));

      setProduct({ ...productJson });
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
    };

    getCategories();
  }, [store.categories]);

  const isProductOwner = () => store.user && store.user.shop && store.user.shop == product.shop.codename;

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
    <div className="page-view">
      <div className="container">
        <div id="product-layout">
          <EditableField field="file" type="file" edit={inEditMode()} onChange={onInfoChange} >
            <img src={getImage(product, 'image')} style={{width:'100%', height:'auto'}}/>
          </EditableField>
          <div id="product-info">
            <div className='title'>
              <EditableField field="name" value={product.name} edit={inEditMode()} onChange={onInfoChange} >
                <h1>{product.name}</h1>
              </EditableField>
              {isProductOwner() && (
                <button onClick={editSaveBtn} className="btn-dark">
                  {inEditMode() ? 'Išsaugoti': 'Koreguoti'}
                </button>)}
            </div>
            <AddToCartBtn className='btn-dark w-25 me-2' product={product} quantity={1}/>

            <div className='quantity'>Kiekis: {product.quantity}</div>
            <div className='price'>Kaina: {product.amount} €</div>




          </div>

        </div>
        <div id="description">
          <div className='description'>
            <EditableField field="description" value={product.description} edit={inEditMode()} onChange={onInfoChange} type={'textfield'} >
              <div>{product.description}</div>
            </EditableField>
          </div>
          <div className='categories'>
            {inEditMode() ? <Select
              components={animatedComponents}
              value={product.categories}
              isMulti
              options={categoryOptions}
              closeMenuOnSelect={false}
              onChange={(categories) => setProduct({ ...product, categories })}
            /> : (        <React.Fragment>
              {product.categories.map((category) => (
                <div key={category.value} className="category">
                  {category.label}
                </div>
              ))}
            </React.Fragment>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
