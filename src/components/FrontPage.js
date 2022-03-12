import Products from './Products/Products';
import React, { useEffect, useState } from 'react';
import './FrontPage.scss';
import CategorySlider from './Categories/CategorySlider';

const FrontPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = 'Pagrindinis';
  }, []);

  const clearFilter = () => {
    if(categories.length > 0)
      setCategories([]);
  };
  return (
    <div className="pageView">
      {/* <div className="intro"/> */}
      <div className="container">
        <CategorySlider setCategories={setCategories} className={'mt-4'} showFilterClear={true} clearFilter={clearFilter}/>

        <Products categories={categories} className={'mt-4'}/>
      </div>
    </div>
  );
};

export default FrontPage;
