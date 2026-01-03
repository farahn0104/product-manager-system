import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name..."
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <button className="clear-search-btn" onClick={handleClear} title="Clear search">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;