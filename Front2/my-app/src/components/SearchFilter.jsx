import React from "react";
import "../styles/ListGames.css";

const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={searchTerm}
        onChange={onSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
