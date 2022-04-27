import Products from './Products/Products';
import React, { useState } from 'react';
import './FrontPage.scss';
import CategorySlider from './Categories/CategorySlider';

const FrontPage = () => {
  const [categories, setCategories] = useState([]);
  const [shops] = useState([]);

  const clearFilter = () => {
    setCategories([]);
  };

  return (
    <>
      <div className="container">
        <CategorySlider
          categories={categories}
          setCategories={setCategories}
          className={'mt-4'}
          showFilterClear={true}
          clearFilter={clearFilter}
        />
        <Products
          shops={shops}
          categories={categories}
          className={'mt-4'}
          limit={true}
        />
      </div>
    </>
  );
};

export default FrontPage;
