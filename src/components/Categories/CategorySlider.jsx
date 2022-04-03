import React from 'react';
import './Categories.scss';
import Category2 from './Category2';

import { useStore } from '../useStore';

const CategorySlider = ({setCategories = () => {},clearFilter=() => {},showFilterClear, className = ''}) => {
  // useEffect(() => {
  //   document.title = 'Parduotuvė';
  // }, []);

  const {store} = useStore();

  if (!store.categories) return <React.Fragment></React.Fragment>;

  return (
    <React.Fragment>
      <div className={`category-slider ${className}`}>
        {store.categories.map(c => (<Category2 key={c.name} category={c} setCategories={setCategories}/>))}
      </div>
      {(showFilterClear && store.categories.length > 0) &&
     <button onClick={clearFilter} className="mt-2 btn-dark">Išvalyti</button>}
    </React.Fragment>

  );
};

export default CategorySlider;
