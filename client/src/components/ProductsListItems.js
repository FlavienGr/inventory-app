import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductsListItems = ({
  name,
  description,
  handleAddProduct,
  idProduct,
}) => {
  const location = useLocation();
  const [showButtonAdd, setShowButtonAdd] = useState(false);

  useEffect(() => {
    if (location.pathname === "/products/") {
      setShowButtonAdd(true);
    }
  }, [location]);

  const renderButtonAdd = showButtonAdd ? (
    <div className="mt-4">
      <button
        onClick={() => handleAddProduct({ id: idProduct, name })}
        className="btn custom_btn"
      >
        Add
      </button>
    </div>
  ) : undefined;

  return (
    <div className="col-3 py-3 m-1 product_items">
      <div className="mb-2">
        <strong>{name}</strong>
      </div>
      <div className="text-truncate">{description}</div>
      {renderButtonAdd}
    </div>
  );
};

export default ProductsListItems;
