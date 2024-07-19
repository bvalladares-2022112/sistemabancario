import { useState, useEffect, useRef } from 'react';
import './Product.css';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import { Toaster } from 'react-hot-toast';
import { useGetAllProducts } from '../../shared/hooks/product/useGetAllProducts.jsx';
import { useAddProduct } from '../../shared/hooks/product/useAddProduct.jsx';
import { useDeleteProduct } from '../../shared/hooks/product/useDeleteProduct.jsx';
import { useUpdateProduct } from '../../shared/hooks/product/useUpdateProduct.jsx';

import imgDelete from '../../assets/imgDelete.png';

const defaultProductImage = 'https://www.tiffincurry.ca/wp-content/uploads/2021/02/default-product.png';

const Product = () => {
  const { registerProduct } = useAddProduct();
  const { getProducts, isFetching, getAllProducts } = useGetAllProducts();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct } = useUpdateProduct();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [reloadComponent, setReloadComponent] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen del modal

  const formRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getAllProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [reloadComponent]);

  const handleRegisterProduct = async (event) => {
    event.preventDefault();
    const productData = {
      name,
      price,
      stock,
      image: image || defaultProductImage,
    };
    if (editingProductId) {
      await updateProduct(editingProductId, productData);
      setEditingProductId(null);
    } else {
      await registerProduct(productData);
    }
    await getAllProducts();
    formRef.current.reset();
    setName('');
    setPrice('');
    setStock('');
    setImage('');
    setReloadComponent(!reloadComponent);
    setShowForm(false); // Ocultar el formulario después de agregar el producto
  };

  const handleCancel = () => {
    setName('');
    setPrice('');
    setStock('');
    setImage('');
    setEditingProductId(null);
    setShowForm(false); // Ocultar el formulario al cancelar
  };

  const handlePriceInput = (e) => {
    const value = e.target.value;
    if (!value || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleStockInput = (e) => {
    const value = e.target.value;
    if (!value || /^[0-9]*$/.test(value)) {
      setStock(value);
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    await getAllProducts();
  };

  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setImage(product.image || defaultProductImage);
    setEditingProductId(product._id);
    setShowForm(true); // Mostrar el formulario al editar
  };

  const hasData = name || price || stock || image;

  const handleShowImage = (id) => {
    if (showImage === id) {
      setShowImage(null);
    } else {
      setShowImage(id);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = () => {
    const filteredProducts = getProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredProducts;
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    document.getElementById('imageModal').style.display = 'block';
  };

  const closeModal = () => {
    setModalImage(null);
    document.getElementById('imageModal').style.display = 'none';
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="product-summary">
        <h2 className="subtitle-product centered">Your Products</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          handleSearch().length > 0 ? (
            <div className="product-table-container">
              <table className="product-table centered-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {handleSearch().map(product => (
                    <tr key={product._id} onClick={() => handleEditProduct(product)}>
                      <td>{product.name}</td>
                      <td>Q{product.price}</td>
                      <td>{product.stock} productos</td>
                      <td>
                        <button onClick={(e) => { e.stopPropagation(); handleShowImage(product._id); }}>
                          {showImage === product._id ? 'Cerrar imagen' : 'Ver imagen'}
                        </button>
                        {showImage === product._id && (
                          <img
                            src={`${product.image || defaultProductImage}?${new Date().getTime()}`}
                            alt="Product"
                            onClick={(e) => { e.stopPropagation(); openModal(`${product.image || defaultProductImage}?${new Date().getTime()}`); }}
                          />
                        )}
                      </td>
                      <td>
                        <img
                          src={imgDelete}
                          alt="Delete"
                          className="delete-icon"
                          onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product._id); }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No products found.</div>
          )
        )}
      </div>
      <button onClick={toggleForm} className="toggle-form-button">
        {showForm ? 'Hide Form' : 'Add Product'}
      </button>
      {showForm && (
        <div className="product-container">
          <h2 className='subtitle-product centered'>Product</h2>
          <div className="product-form">
            <form ref={formRef} onSubmit={handleRegisterProduct}>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name of the Product"
                  style={{ marginTop: '20px' }} // Separar del título
                />
              </label>
              <label>
                Price
                <input
                  type="text"
                  value={price}
                  onChange={handlePriceInput}
                  placeholder="0.00"
                />
              </label>
              <label>
                Stock
                <input
                  type="text"
                  value={stock}
                  onChange={handleStockInput}
                  placeholder="0"
                  name="stock"
                />
              </label>
              <label>
                Image URL
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image URL"
                />
              </label>
              <button type="submit">
                {editingProductId ? 'Update Product' : 'Make a product'}
              </button>
              {hasData && (
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
              )}
            </form>
          </div>
        </div>
      )}
      
      {/* Modal */}
      <div id="imageModal" className="modal" onClick={closeModal}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" id="img01" src={modalImage} />
      </div>
    </>
  );
};

export default Product;
