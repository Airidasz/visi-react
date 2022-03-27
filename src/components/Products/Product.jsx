import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, getImage } from '../Extras';
import AddToCartBtn from '../Cart/AddToCartBtn';

const Products = ({ product, loading}) => {
  const [showAdd, setShowAdd] = useState(false);

  const changeShow = () => {
    setShowAdd(!showAdd);
  };

  if(loading) {
    return (<div className="product"></div>);
  }

  return (
    <div className="product" onMouseEnter={changeShow} onMouseLeave={changeShow}>

      <div className='product-image'>
        <Link to={`/preke/${product.codename}`}><img src={getImage(product, 'image')} /></Link>
      </div>
         
      <div className='product-info'>    
        <Link to={`/preke/${product.codename}`}>{product.name}</Link>
        <div className='price'>
          Kaina: {formatPrice(product.amount, true)}
        </div>
      </div>
      {showAdd && <div className='add-to-cart'>
        <div className='p-3'>
          <AddToCartBtn className='btn-dark w-100' product={product} quantity={1}/>
        </div>
      </div>}
    </div>
  );
};

export default Products;
