import React from 'react';
import './Categories.scss';
import { useStore } from '../useStore';
import SliderCategory from './SliderCategory';

const CategorySlider = ({
  categories = [],
  setCategories = () => {},
  clearFilter = () => {},
  showFilterClear,
  className = '',
}) => {
  const { store } = useStore();

  if (!store.categories) return <></>;

  return (
    <>
      <div className={`category-slider ${className}`}>
        {store.categories.map((c) => (
          <SliderCategory
            active={categories.find((s) => s === c.codename)}
            key={c.name}
            category={c}
            setCategories={setCategories}
          />
        ))}
      </div>
      {showFilterClear && store.categories.length > 0 && (
        <button onClick={clearFilter} className="mt-2 btn-dark">
          Išvalyti
        </button>
      )}
    </>
  );
};

export default CategorySlider;
