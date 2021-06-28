import React, { useEffect, useState } from "react";
import ProductsList from "../components/productsList";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const URL_INVENTORY = "http://localhost:8000/api/v1/inventory/";
const URL_PRODUCT = "http://localhost:8000/api/v1/products/";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productSelected, setProductSelected] = useState({
    id: null,
    name: null,
  });
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await fetch(URL_PRODUCT);
    const productsListResp = await response.json();
    setProducts(productsListResp.data);
  };

  const handleAddProduct = (product) => {
    setProductSelected(product);
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const addProductToInventory = async (product) => {
    const urlAndQuantity = `${URL_INVENTORY}${product.id}?quantity=${quantity}`;

    const response = await fetch(urlAndQuantity, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  // const addProductToList = async (product) => {
  //   const response = await fetch(URL_PRODUCT, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(product),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };
  const sendProduct = (e) => {
    e.preventDefault();
    console.log(productSelected);
    addProductToInventory(productSelected);
    closeModal();
    setQuantity(0);
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const renderProductsList = () => {
    if (products.length < 1) {
      return <div>No products</div>;
    } else {
      return (
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add a product"
            style={customStyles}
          >
            <h2>{productSelected.name}</h2>
            <button onClick={closeModal}>close</button>
            <div>Add quantity</div>
            <form>
              <input onChange={handleQuantity} value={quantity} />
              <button onClick={sendProduct}>Register</button>
            </form>
          </Modal>
          <ProductsList
            products={products}
            handleAddProduct={handleAddProduct}
          />
        </div>
      );
    }
  };
  return (
    <div>
      <div className="my-5">
        <h3 className="title-product">Products list</h3>
      </div>
      <div>{renderProductsList()}</div>
    </div>
  );
};

export default Products;
