import React from 'react';
import { getImage } from '../Extras';

const Category2 = ({ category, setCategories }) => {
  return (
    <div onClick={() => setCategories([category.codename])} className="slider-category">
      <div className='category-img aspect-1'>
        <img src={getImage(category, 'file')} />
      </div>
  
      <h4>{category.name}</h4>
      <div className='indicator'></div>
    </div>
  );
};

export default Category2;
