import { useState } from "react";
import ProductModal from "./ProductModal";

const Product = ({ product, setProducts }) => {
  const [showProductPopup, setShowProductPopup] = useState(false);
  return (
    <div>
      {showProductPopup && (
        <ProductModal
          product={product}
          setShow={setShowProductPopup}
          setProducts={setProducts}
        />
      )}
      <div
        key={product.id}
        className="product"
        onClick={() => {
          setShowProductPopup(!showProductPopup);
        }}
      >
        <h3 className="product-name">{product.name}</h3>
        <div className="categories">
          {typeof product.categories === "object" &&
            product.categories.map((category) => {
              return (
                <div key={category.id} className="category">
                  {category.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Product;
