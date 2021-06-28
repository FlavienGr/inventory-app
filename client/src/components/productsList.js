import React from "react";
import ProductsListItems from "./ProductsListItems";

const ProductsList = ({ products, handleAddProduct }) => {
  return (
    <div className="row p-2">
      {products.map((product) => {
        return (
          <ProductsListItems
            key={product._id}
            name={product.name}
            description={product.description}
            handleAddProduct={handleAddProduct}
            idProduct={product._id}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
