import React, { useState, useEffect } from 'react';
// import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import { FaList, FaTh } from 'react-icons/fa';

function App() {
  // Initial products data
  const initialProducts = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 15, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics', stock: 50, description: 'Wireless mouse' },
    { id: 3, name: 'Desk Chair', price: 199.99, category: 'Furniture', stock: 10, description: 'Ergonomic office chair' },
    { id: 4, name: 'Notebook', price: 9.99, category: 'Stationery', stock: 100, description: 'Premium quality notebook' },
    { id: 5, name: 'Coffee Mug', price: 14.99, category: 'Kitchen', stock: 75, description: 'Ceramic coffee mug' },
    { id: 6, name: 'Backpack', price: 49.99, category: 'Accessories', stock: 30, description: 'Water-resistant backpack' },
    { id: 7, name: 'Headphones', price: 89.99, category: 'Electronics', stock: 25, description: 'Noise-cancelling headphones' },
    { id: 8, name: 'Desk Lamp', price: 34.99, category: 'Furniture', stock: 40, description: 'LED desk lamp' },
    { id: 9, name: 'Water Bottle', price: 24.99, category: 'Fitness', stock: 60, description: 'Insulated water bottle' },
    { id: 10, name: 'Keyboard', price: 79.99, category: 'Electronics', stock: 35, description: 'Mechanical keyboard' },
    { id: 11, name: "iPhone 9", price: 549, category: 'Mobile', stock: 94, description: "An apple mobile which is nothing like apple"},
  ];

  // State management
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Pagination settings
  const productsPerPage = 6;

  // Filter products based on search
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, products]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Add new product
  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([productWithId, ...products]);
    setShowForm(false);
  };

  // Update existing product
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
    setShowForm(false);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Start editing product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Product Management System</h1>
        <p>Manage your products efficiently</p>
      </header>

      <div className="container">
        {/* Search and Controls */}
        <div className="controls-section">
          <div className="search-toggle-container">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="view-toggle">
              <button
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FaList /> List
              </button>
              <button
                className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                title="Grid View"
              >
                <FaTh /> Grid
              </button>
            </div>
          </div>

          {/* Add Product Button */}
          <button
            className="add-product-btn"
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? 'X Close Form' : '+ Add New Product'}
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}

        {/* Product List/Cards */}
        <ProductList
          products={currentProducts}
          viewMode={viewMode}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
        />

        {/* Products Count */}
        <div className="products-count">
          Showing {currentProducts.length} of {filteredProducts.length} products
          {searchTerm && <span> for "{searchTerm}"</span>}
        </div>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  className={`page-btn ${currentPage === number ? 'active' : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}

            </div>


            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}

      </div>

      <footer className="footer">
        <p>Product Management System © 2024 | Built with React</p>
      </footer>
    </div>
  );
}

export default App;