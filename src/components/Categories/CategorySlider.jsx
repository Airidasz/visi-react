import React, { useEffect } from 'react';
import './Categories.scss';
import Category2 from './Category2';

import { useStore } from '../useStore';
import reactDom from 'react-dom';

const CategorySlider = ({setCategories = () => {},clearFilter=() => {},showFilterClear, className = ''}) => {
  // useEffect(() => {
  //   document.title = 'Parduotuvė';
  // }, []);

  const {store, loadCategories} = useStore();

  useEffect(() => {
    const getCategories = async () => {
      if (store.categories) {
        return;
      }

      await loadCategories();
    };

    getCategories();
  }, [store.categories]);

  if (!store.categories) return <div className="pageView"></div>;

  return (
    <React.Fragment>
      <div className={`category-slider ${className}`}>
        {store.categories.map(c => (<Category2 key={c.name} category={c} setCategories={setCategories}/>))}
      </div>
      {showFilterClear && 
     <button onClick={clearFilter} className="mt-2">Clear filter</button>}
    </React.Fragment>

  );
};

export default CategorySlider;
