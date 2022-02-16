import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useStore } from './useStore';
import useApi from './useApi';

const CreateProduct = () => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const { shopid } = useParams();
  const { productid } = useParams();

  const { store, loadCategories } = useStore();
  const { GetRequest, PutRequest, PostRequest} = useApi();

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    categories: []
  });

  useEffect(() => {
    const getProductInfo = async () => {
      if(!productid || !shopid)
        return; 

      const getShopResponse = await GetRequest(`shop/${shopid}`);
      if(!getShopResponse)
        return;

      const shopJson = await getShopResponse.json();
      if (shopJson.userID != localStorage.getItem('userID'))
        navigate('/');

      const getProductResponse = await GetRequest(`shop/${shopid}/product/${productid}`);
      if(!getProductResponse)
        return;

      const productJson = await getProductResponse.json();

      product.name = productJson.name;
      product.description = productJson.description;
      product.categories = productJson.categories.map((category) => ({value: category.id,label: category.name,}));

      setProduct({...product});
    };

    getProductInfo();
  }, []);

  
  useEffect(() => {
    const getCategories = async () => {
      if(store.categories){
        const categoryOptions = store.categories.map((category) => ({value: category.id, label: category.name}));
        setCategoryOptions([...categoryOptions]);
        return;
      }

      await loadCategories();
    };

    getCategories();
  }, [store.categories]);

  const addEditProduct = async () => {
    const selectedCategoryIDs = product.categories.map(cc => cc.value);

    const body = JSON.stringify({
      name: product.name,
      description: product.description,
      categories: selectedCategoryIDs,
    });
    
    let response = null;
    if(!productid)
      response = await PostRequest(`shop/${shopid}/products`, body);
    else 
      response = await PutRequest(`shop/${shopid}/product/${productid}`, body);

    if(response)
      navigate(-1);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addEditProduct();
  };

  return (
    <div className="pageView">
      <div className="container" style={{ marginTop: '59px' }}>
        <div className="createShopGrid">
          <div>
            <form onSubmit={handleSubmit} className="form">
              <div className="formControl" style={{ marginTop: '0' }}>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                />
              </div>
              <div className="formControl">
                <label>Aprašymas</label>

                <textarea
                  style={{ resize: 'vertical', minHeight: '120px' }}
                  value={product.description}
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                />
              </div>

              <div className="formControl">
                <input type="submit" className="btn-dark" value={!productid ? 'Kurti prekę' : 'Koreguoti prekę'} />
              </div>
            </form>
          </div>
          <div>
            <Select
              components={animatedComponents}
              value={product.categories}
              isMulti
              options={categoryOptions}
              closeMenuOnSelect={false}
              onChange={(categories) => setProduct({...product, categories})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
