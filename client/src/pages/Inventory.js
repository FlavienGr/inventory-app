import React, { useEffect, useState } from "react";
import ProductsInventory from "../components/ProductsInventory";

const URL_INVENTORY = "http://localhost:8000/api/v1/inventory";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const response = await fetch(URL_INVENTORY);
    const productsListResp = await response.json();
    setProducts(productsListResp.data[0].products);
  };
  return (
    <div>
      <ProductsInventory products={products} />
    </div>
  );
};

export default Inventory;
