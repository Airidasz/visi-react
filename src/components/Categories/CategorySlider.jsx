import React, { useEffect } from 'react';
import './Categories.scss';
import Category2 from './Category2';

import { useStore } from '../useStore';
import reactDom from 'react-dom';

const CategorySlider = ({setCategories = () => {},clearFilter=() => {},showFilterClear, className = ''}) => {
  // useEffect(() => {
  //   document.title = 'Parduotuvė';
  // }, []);

  const {store} = useStore();

  if (!store.categories) return <div className="page-view"></div>;

  return (
    <React.Fragment>
      <div className={`category-slider ${className}`}>
        {store.categories.map(c => (<Category2 key={c.name} category={c} setCategories={setCategories}/>))}
      </div>
      {showFilterClear && 
     <button onClick={clearFilter} className="mt-2 btn-dark">Išvalyti</button>}
    </React.Fragment>

  );
};

export default CategorySlider;
