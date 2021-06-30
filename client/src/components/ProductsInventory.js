import React from "react";
import ProductsInventoryItems from "./ProductsInventoryItems";

const ProductsInventory = ({ products }) => {
  // console.log(products[0], "product");
  const renderProductsItem =
    products.length > 0 ? (
      products.map((product) => {
        const { productItem } = product;
        return (
          <ProductsInventoryItems
            key={product._id}
            productItem={productItem}
            quantity={product.quantity}
          />
        );
      })
    ) : (
      <div>No inventory</div>
    );

  return <div className="row p-2">{renderProductsItem}</div>;
};

export default ProductsInventory;
