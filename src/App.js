// src/App.js

import React, { useState } from 'react';
import './App.css';
import products from './products';

function App() {
  const [category, setCategory] = useState('');
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(1500);
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const allCategories = [...new Set(products.map(p => p.category))];
  const allBrands = [...new Set(products.map(p => p.brand))];

  const handleBrandChange = (brand) => {
    setBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSearch = () => {
    const result = products.filter(product =>
      (!category || product.category === category) &&
      (brands.length === 0 || brands.includes(product.brand)) &&
      product.price <= priceRange &&
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFiltered(result);
    setShowResults(true);
  };

  return (
    <div className="App">
      <h1>🛒 Product Catalog Filter</h1>

      <div className="filters">
        <div>
          <label>Category:</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Brand:</label>
          {allBrands.map(brand => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              {brand}
            </label>
          ))}
        </div>

        <div>
          <label>Max Price: ${priceRange}</label>
          <input
            type="range"
            min="0"
            max="1500"
            step="10"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          />
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            value={searchText}
            placeholder="Enter product name"
            onChange={e => setSearchText(e.target.value)}
          />
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>

      <hr />

      {showResults ? (
        <div className="products">
          {filtered.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            filtered.map(p => (
              <div key={p.id} className="product-card">
                <h3>{p.name}</h3>
                <p>Category: {p.category}</p>
                <p>Brand: {p.brand}</p>
                <p>Price: ${p.price}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>🔍 Use the filters and click "Search" to display products</p>
      )}
    </div>
  );
}

export default App;
