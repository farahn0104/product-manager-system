import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="card-header">
        <h3>{product.name}</h3>
        <span className="product-id">#{product.id}</span>
      </div>
      
      <div className="card-body">
        <div className="card-info">
          <div className="info-row">
            <span className="label">Price:</span>
            <span className="value">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Category:</span>
            <span className="category">{product.category}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Stock:</span>
            <span className={`stock ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
              {product.stock} units
            </span>
          </div>
          
          {product.description && (
            <div className="info-row description">
              <span className="label">Description:</span>
              <p className="value">{product.description}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-footer">
        <button 
          className="card-btn edit-btn"
          onClick={() => onEdit(product)}
        >
          <FaEdit /> Edit
        </button>
        <button 
          className="card-btn delete-btn"
          onClick={() => onDelete(product.id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;