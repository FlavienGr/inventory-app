import React from "react";

const ProductsInventoryItems = ({ productItem, quantity }) => {
  return (
    <div className="col-3 py-3 m-1 product_items">
      <div className="mb-2">
        <strong>{productItem && productItem.name}</strong>
      </div>
      <div className="text-truncate">
        {productItem && productItem.description}
      </div>
      <div>{quantity}</div>
    </div>
  );
};

export default ProductsInventoryItems;
