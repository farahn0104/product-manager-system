import React from 'react';
import ProductCard from './ProductCard';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductList = ({ products, viewMode, onEdit, onDelete }) => {
    if (viewMode === 'list') {
        return (
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price ($)</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>#{product.id}</td>
                                <td className="product-name">{product.name}</td>
                                <td className="product-price">${product.price.toFixed(2)}</td>
                                <td>
                                    <span className="category-badge">{product.category}</span>
                                </td>
                                <td>
                                    <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                                        {product.stock} units
                                    </span>
                                </td>
                                <td className="product-description">{product.description}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="action-btn edit-btn"
                                            onClick={() => onEdit(product)}
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => onDelete(product.id)}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="no-products">
                        <p>No products found. Try a different search or add a new product.</p>
                    </div>
                )}
            </div>
        );
    }

    // Card View
    return (
        <div className="card-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            {products.length === 0 && (
                <div className="no-products-card">
                    <p>No products found. Try a different search or add a new product.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;