import React from "react";

const ProductsListItems = ({
  name,
  description,
  handleAddProduct,
  idProduct,
}) => {
  return (
    <div className="col-3 py-3 m-1 product_items">
      <div className="mb-2">
        <strong>{name}</strong>
      </div>
      <div className="text-truncate">{description}</div>
      <div className="mt-4">
        <button
          onClick={() => handleAddProduct({ id: idProduct, name })}
          className="btn custom_btn"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductsListItems;
