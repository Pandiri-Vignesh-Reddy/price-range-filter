import React from "react";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <p>No products match the selected filters.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
