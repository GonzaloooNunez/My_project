import React from "react";
import "../styles/CategoryFilter.css"; // Asegúrate de tener este archivo para los estilos

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleButtonClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="category-filter">
      <p className="filter-label">
        Encuentra los juegos que más se adapten a ti:
      </p>
      <div className="category-buttons">
        <button
          className={`category-button ${
            selectedCategory === "" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("")}
        >
          Todas
        </button>
        <button
          className={`category-button ${
            selectedCategory === "gratis" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("gratis")}
        >
          Gratis
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleButtonClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
