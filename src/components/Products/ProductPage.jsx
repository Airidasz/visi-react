import React, { useState, useEffect } from 'react';
import './ProductStyles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import { useAuth } from '../useAuth';
import { useStore } from '../useStore';
import useApi from '../useApi';

import { productModel } from '../Models';

import { AddToBody, getImage, useSkeleton, formatPrice } from '../Extras';
import EditableField from './components/EditableField';
import QuantityPicker from '../Extras/QuantityPicker';
import AddToCartBtn from '../Cart/AddToCartBtn';
import Form from '../Extras/Form';
import Status404Page from '../Status404Page';

const Product = ({ isNew }) => {
  const { productName } = useParams();
  const navigate = useNavigate();

  const { GetRequest, PutRequest, PostRequest } = useApi();
  const { auth, isShopOwner } = useAuth();
  const { store } = useStore();

  const [product, setProduct] = useState(null);

  const [editing, setEditing] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [file, setFile] = useState(null);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    return () => {
      setLoad(true);
      setProduct(null);
      setNotFound(false);
    };
  });

  useEffect(() => {
    const getProductInfo = async () => {
      if (!productName) return;

      const getProductResponse = await GetRequest(
        `product/${productName}`,
        null,
        false
      );
      if (!getProductResponse) return;

      const productJson = await getProductResponse.json();
      productJson.categories = productJson.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));

      setProduct({ ...productJson });
    };

    if (!load) return;
    if (isNew) setProduct(productModel);
    else getProductInfo();

    setLoad(false);
  }, [load]);

  useEffect(() => {
    const getCategories = async () => {
      if (!store.categories) {
        return;
      }
      const categoryOptions = store.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategoryOptions([...categoryOptions]);
    };

    getCategories();
  }, [store.categories]);

  const addEditProduct = async () => {
    const selectedCategoryIDs = product.categories.map((cc) => cc.value);

    var body = new FormData();
    body = AddToBody(body, 'name', product.name);
    body = AddToBody(body, 'description', product.description);
    body = AddToBody(body, 'price', product.price);
    body = AddToBody(body, 'quantity', product.quantity);
    body = AddToBody(body, 'public', product.public);
    body = AddToBody(body, 'categories', selectedCategoryIDs);
    body = AddToBody(body, 'file', file);

    let response = null;
    if (!productName) response = await PostRequest('products', body);
    else response = await PutRequest(`product/${productName}`, body);

    if (response) {
      const data = await response.json();
      navigate(`/${data.codename}`, { replace: true });
      setEditing(false);
    }
  };

  const inEditMode = () => {
    return isNew || editing;
  };

  const editSaveBtn = () => {
    if (inEditMode()) addEditProduct();
    else setEditing(true);
  };

  const onInfoChange = (field, value) => {
    if (field == 'file') {
      setFile(value);
    } else {
      product[field] = value;
      setProduct({ ...product });
    }
  };

  if (notFound) return <Status404Page />;

  return (
    <div className="container">
      <Form onSubmit={editSaveBtn}>
        <div id="product-layout">
          <div className="aspect-1">
            <div className="product-image">
              <EditableField
                editClassname="w-100 h-100"
                field="file"
                type="file"
                edit={inEditMode()}
                onChange={onInfoChange}
              >
                <img
                  src={getImage(product, 'image')}
                  style={{ width: '100%', height: 'auto' }}
                />
              </EditableField>
            </div>
          </div>
          <div id="product-info">
            <div className="title">
              <EditableField
                field="name"
                editClassname="py-2 me-3 w-100"
                value={product?.name}
                edit={inEditMode()}
                onChange={onInfoChange}
                inputProps={{ maxLength: '80' }}
              >
                <h1>{useSkeleton(product?.name)}</h1>
              </EditableField>
              {(isShopOwner(product?.shop?.codename) || isNew) && (
                <input
                  type="submit"
                  className="btn-dark"
                  value={inEditMode() ? 'Išsaugoti' : 'Koreguoti'}
                />
              )}
            </div>
            <div className="price mt-2">
              <div className="amount">
                <div className="label-3">Kaina</div>
                <EditableField
                  field="price"
                  editClassname="py-1"
                  value={product?.price}
                  edit={inEditMode()}
                  onChange={onInfoChange}
                  type="number"
                  inputProps={{ step: '.01', min: '0' }}
                >
                  {useSkeleton(formatPrice(product?.price, true))}
                  <span className="label-3"> /vnt</span>
                </EditableField>
              </div>
              {inEditMode() && (
                <>
                  <div className="ms-4">
                    <div className="label-3">Kiekis</div>
                    <EditableField
                      field="quantity"
                      editClassname="py-1"
                      value={product?.quantity}
                      edit={inEditMode()}
                      onChange={onInfoChange}
                      type="number"
                      inputProps={{ min: '0' }}
                    />
                  </div>
                  <div className="ms-4">
                    <label className="label-3 me-1" htmlFor="is-public">
                      Viešas
                    </label>
                    <input
                      id="is-public"
                      type="checkbox"
                      checked={product?.public}
                      onChange={(e) =>
                        setProduct({ ...product, public: e.target.checked })
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <div className="description">
              <div className="label-3 mb-1">Aprašymas</div>
              <EditableField
                field="description"
                value={product?.description}
                edit={inEditMode()}
                onChange={onInfoChange}
                type={'textfield'}
                required={false}
              >
                <div>
                  {useSkeleton(product?.description, { height: '7rem' })}
                </div>
              </EditableField>
            </div>
            <div className="product-info-footer">
              {auth.permissions?.isBuyer && (
                <div className="add-to-cart">
                  <QuantityPicker
                    className="quantity"
                    max={product?.quantity}
                    onChange={setQuantity}
                    value={quantity}
                    disabled={product?.quantity === 0}
                  />
                  <AddToCartBtn
                    className="btn-dark mt-2"
                    product={product}
                    quantity={quantity}
                  />
                </div>
              )}
              <div className="categories">
                <div className="categories-absolute">
                  <div className="label-3 mb-1">
                    Kategorijos
                    <br />
                    {!inEditMode() &&
                      product?.categories?.length == 0 &&
                      'nėra'}
                  </div>

                  {inEditMode() ? (
                    <Select
                      className="w-100"
                      value={product?.categories ?? []}
                      isMulti
                      options={categoryOptions}
                      closeMenuOnSelect={false}
                      onChange={(categories) =>
                        setProduct({ ...product, categories })
                      }
                    />
                  ) : (
                    <>
                      {Array.isArray(product?.categories) &&
                        product.categories.map((category) => (
                          <div key={category.value} className="category">
                            {category.label}
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Product;
