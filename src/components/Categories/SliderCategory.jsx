import React from 'react';
import { getImage } from '../Extras';

const SliderCategory = ({
  category,
  setCategories = () => {},
  active = false,
}) => {
  return (
    <div
      onClick={() => setCategories([category.codename])}
      className={`slider-category${active ? ' active' : ''}`}
    >
      <div className="category-img aspect-1">{getImage(category, 'file')}</div>

      <div className="title">
        <h4>{category.name}</h4>
      </div>
      <div className="indicator"></div>
    </div>
  );
};

export default SliderCategory;
