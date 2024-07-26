import React from "react";
import "../styles/ListGames.css"; // Asegúrate de incluir el CSS si es necesario

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="category-select">Categoría:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={onCategoryChange}
      >
        <option value="">Todas</option>
        <option value="gratis">Gratis</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
