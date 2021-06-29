import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ProductsList from "../components/productsList";
import FlashMessages from "../components/FlashMessages";

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
  const [modalProductIsOpen, setProductModalIsOpen] = useState(false);

  const [productSelected, setProductSelected] = useState({
    id: null,
    name: null,
  });
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState([]);
  const [msgSuccess, setMsgSuccess] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
  });

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
  const openModalProduct = () => {
    setProductModalIsOpen(true);
  };

  const closeModalProduct = () => {
    setProductModalIsOpen(false);
  };
  const handlePostResponseMessage = (response, message) => {
    if (response.success) {
      setMsgSuccess(message);
    } else {
      setErrors(response.errors);
    }
  };
  const addProductToInventory = async (product) => {
    const urlAndQuantity = `${URL_INVENTORY}${product.id}?quantity=${quantity}`;

    try {
      const response = await fetch(urlAndQuantity, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      handlePostResponseMessage(data, "Product added to your inventory");
    } catch (error) {
      console.log(error);
    }
  };
  const addProductToList = async (product) => {
    try {
      const response = await fetch(URL_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      handlePostResponseMessage(data, "Product added to your list");
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleaAdProductToList = (e) => {
    e.preventDefault();
    if (newProduct.name.length > 0 && newProduct.description.length > 0) {
      console.log(newProduct);
      addProductToList(newProduct);
      setNewProduct({
        name: "",
        description: "",
      });
      closeModalProduct();
    } else {
      closeModalProduct();
      setErrors([{ message: "Name or description cannot be empty" }]);
    }
  };
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
  const handleNewProduct = (e) => {
    const newProductItem = { ...newProduct };
    newProductItem[e.target.name] = e.target.value;
    setNewProduct(newProductItem);
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
            contentLabel="Add a product to the inventory"
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
          <Modal
            isOpen={modalProductIsOpen}
            onRequestClose={closeModalProduct}
            contentLabel="Add a product to the list"
            style={customStyles}
          >
            <h2>New Product</h2>
            <button className="mb-5" onClick={closeModalProduct}>
              close
            </button>

            <form>
              <label htmlFor="name">Name:</label>
              <input
                className="d-flex"
                onChange={handleNewProduct}
                value={newProduct.name}
                name="name"
              />
              <label htmlFor="description">Description:</label>
              <textarea
                className="d-flex"
                onChange={handleNewProduct}
                value={newProduct.description}
                name="description"
              />
              <button onClick={handleaAdProductToList}>Send</button>
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
  const handleCloseFlash = () => {
    setErrors([]);
    setMsgSuccess("");
  };
  return (
    <div>
      <div className="d-flex justify-content-between my-5">
        <div>
          <h3 className="title-product">Products list</h3>
        </div>
        <div>
          <button onClick={openModalProduct} className="btn custom_btn">
            Add Product
          </button>
        </div>
      </div>
      <FlashMessages
        errors={errors}
        msgSuccess={msgSuccess}
        handleCloseFlash={handleCloseFlash}
      />
      <div>{renderProductsList()}</div>
    </div>
  );
};

export default Products;
