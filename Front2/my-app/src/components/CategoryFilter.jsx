import React from "react";
import "../styles/CategoryFilter.css"; // Asegúrate de tener este archivo para los estilos

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleButtonClick = (category) => {
    onCategoryChange(category);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
            {capitalizeFirstLetter(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
