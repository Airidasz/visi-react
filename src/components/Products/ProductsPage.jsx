import React, { useEffect, useState } from 'react';
import './ProductStyles.scss';
import Products from './Products';
import { useStore } from '../useStore';
import { Icon } from '@iconify/react';

const ProductsPage = () => {
  const [checkboxOptions, setCheckboxOptions] = useState({
    categories: {},
    shops: {},
  });

  const [selected, setSelected] = useState({
    categories: [],
    shops: [],
  });

  const [show, setShow] = useState(true);

  const { store, isMobile } = useStore();

  useEffect(() => {
    setShow(!isMobile);
  }, [isMobile]);

  if (!store.categories || !store.shops) {
    return <></>;
  }

  const onCheckboxChange = (type, name, value) => {
    checkboxOptions[type][name] = value;
    setCheckboxOptions({ ...checkboxOptions });
  };

  const applyFilters = () => {
    selected.categories = Object.keys(checkboxOptions.categories).filter(
      (k) => checkboxOptions.categories[k]
    );
    selected.shops = Object.keys(checkboxOptions.shops).filter(
      (k) => checkboxOptions.shops[k]
    );

    setSelected({ ...selected });
  };

  return (
    <>
      <div className="page-title">
        <h4>Prekės</h4>
      </div>
      <div id="products-page" className="container">
        <div className="product-filter">
          <div className="filters card-style-1 card-sticky ">
            <div className="label" onClick={() => isMobile && setShow(!show)}>
              <span>Filtrai</span>
              <Icon
                className={`arrow${!show ? ' active' : ''}`}
                icon="dashicons:arrow-down-alt2"
                width="30"
                height="30"
              />
            </div>
            {show && (
              <>
                <div className="label-2">Kategorijos</div>
                <ul>
                  {store.categories.map((c) => (
                    <li key={c.codename}>
                      <input
                        type="checkbox"
                        id={`${c.codename}_checkbox`}
                        onChange={(e) =>
                          onCheckboxChange(
                            'categories',
                            c.codename,
                            e.target.checked
                          )
                        }
                      />
                      <label
                        htmlFor={`${c.codename}_checkbox`}
                        className="ellipsis"
                      >
                        {c.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="label-2">Parduotuvės</div>
                <ul>
                  {store.shops.map((c) => (
                    <li key={c.codename}>
                      <input
                        type="checkbox"
                        id={`${c.codename}_checkbox`}
                        onChange={(e) =>
                          onCheckboxChange(
                            'shops',
                            c.codename,
                            e.target.checked
                          )
                        }
                      />
                      <label
                        htmlFor={`${c.codename}_checkbox`}
                        className="ellipsis"
                      >
                        {c.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <button className="btn-dark w-100 mt-3" onClick={applyFilters}>
                  Pritaikyti
                </button>
              </>
            )}
          </div>
        </div>
        <Products categories={selected.categories} shops={selected.shops} />
      </div>
    </>
  );
};

export default ProductsPage;
