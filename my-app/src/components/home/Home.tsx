import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Product } from '../../models/product';
import Login from '../login/Login';

const Home: React.FC = () => {
  /**
   * useState
   */
  const [data, setData] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product>({
    title: '',
    price: 0,
    content: '',
    id: 0,
  });

  /**
   * First check user is login
   */
  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  /**
   * Get all products for api
   */
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/product');
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  /**
   * Check user is login
   */
  const checkLoginStatus = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        setShowLogin(false);
        setIsLoggedIn(true);
      } else {
        setShowLogin(true);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  /**
   * Logout
   */
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProductId(null);
    setEditingProduct({
      title: '',
      price: 0,
      content: '',
      id: 0,
    });
  };

  /**
   * Add product
   * @param event 
   */
  const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/product',
        editingProduct,
        config
      );

      console.log(response);

      window.location.reload();
    } catch (error) {
      console.log(config);
      console.log('Error al agregar producto:', error);
    }

    closeModal();
  };

  /**
   * Edit product handle
   * @param productId 
   */
  const handleEditProduct = async (productId: number) => {
    const productToUpdate = data.find((product) => product.id === productId);

    if (productToUpdate) {
      setEditingProductId(productId);
      setEditingProduct(productToUpdate);
      setShowModal(true);
    }
  };

  /**
   * Update product by id api
   * @param event 
   */
  const handleUpdateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/api/product/${editingProductId}`,
        editingProduct,
        config
      );

      console.log(response);

      window.location.reload();
    } catch (error) {
      console.log('Error al editar producto:', error);
    }

    closeModal();
  };

  /**
   * Delete product by Id
   * @param productId 
   */
  const handleDeleteProduct = async (productId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:3001/api/product/${productId}`,
        config
      );

      console.log(response);

      window.location.reload();
    } catch (error) {
      console.log('Error al borrar producto:', error);
    }
  };

  /**
   * If user is not register
   */
  if (showLogin) {
    return <Login />;
  }

  /**
   * HTML
   */
  return (
    <div className="home-container">
      <h1 className="page-title">Bienvenido a la API de productos</h1>

      {isLoggedIn && (
        <>
          <button className="button-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <button className="button-add-product" onClick={openModal}>
            Agregar Producto
          </button>
        </>
      )}

      <div className="card-container">
        {data.map((product: Product) => (
          <div className="card" key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.content}</p>
            <button
              className="button-edit"
              onClick={() => handleEditProduct(product.id)}
            >
              Editar
            </button>
            <button
              className="button-delete"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingProductId ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form
              onSubmit={editingProductId ? handleUpdateProduct : handleAddProduct}
            >
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={editingProduct.title}
                onChange={(e) =>
                  setEditingProduct((prevProduct) => ({
                    ...prevProduct,
                    title: e.target.value,
                  }))
                }
                required
              />

              <label htmlFor="price">Precio:</label>
              <input
                type="number"
                id="price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct((prevProduct) => ({
                    ...prevProduct,
                    price: parseFloat(e.target.value),
                  }))
                }
                required
              />

              <label htmlFor="content">Contenido:</label>
              <textarea
                id="content"
                value={editingProduct.content}
                onChange={(e) =>
                  setEditingProduct((prevProduct) => ({
                    ...prevProduct,
                    content: e.target.value,
                  }))
                }
                required
              ></textarea>

              <button type="submit">
                {editingProductId ? 'Guardar cambios' : 'Agregar'}
              </button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

};

export default Home;
