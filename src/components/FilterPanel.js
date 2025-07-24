import React from "react";

const FilterPanel = ({ filters, setFilters }) => {
  const categories = ["All", "Electronics", "Clothing", "Footwear"];
  const brands = ["Apple", "Nike", "Samsung", "Levi's", "Puma", "Adidas"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    const updatedBrands = checked
      ? [...filters.brands, value]
      : filters.brands.filter((brand) => brand !== value);

    setFilters((prev) => ({
      ...prev,
      brands: updatedBrands,
    }));
  };

  return (
    <div className="filters">
      {/* Category Dropdown */}
      <label>
        Category:
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </label>

      {/* Price Range Slider */}
      <label>
        Price: ≤ ${filters.price}
        <input
          type="range"
          name="price"
          min="0"
          max="1000"
          step="10"
          value={filters.price}
          onChange={handleChange}
        />
      </label>

      {/* Search Input */}
      <label>
        Search:
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by name"
        />
      </label>

      {/* Brand Filters */}
      <div className="brand-filters">
        <span>Brands:</span>
        {brands.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              value={brand}
              checked={filters.brands.includes(brand)}
              onChange={handleBrandChange}
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
