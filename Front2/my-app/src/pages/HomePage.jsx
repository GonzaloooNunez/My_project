import React, { useEffect, useState } from "react";
import GameItem from "../components/GameItem";
import CategoryFilter from "../components/CategoryFilter";
import SearchFilter from "../components/SearchFilter";
import { fetchGames } from "../Api";
import "../styles/ListGames.css";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
        setFilteredGames(response.data);

        const gameCategories = response.data.map((game) =>
          game.categoria.toLowerCase()
        );
        const uniqueCategories = [...new Set(gameCategories)];

        setCategories(uniqueCategories);
      } catch (error) {
        setError("Error fetching games");
        console.error("Error fetching games:", error);
      }
    };
    getGames();
  }, []);

  useEffect(() => {
    let updatedGames = games;

    if (selectedCategory.toLowerCase() === "gratis") {
      updatedGames = updatedGames.filter((game) => game.precio === 0);
    } else if (selectedCategory) {
      updatedGames = updatedGames.filter(
        (game) =>
          game.categoria.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      updatedGames = updatedGames.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGames(updatedGames);
  }, [selectedCategory, searchTerm, games]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <img
          src="/Zelda-ocarina.png" 
          alt="Zelda Ocarina"
          className="zelda-image"
        />
        <h1 className="homepage-titulo">
          <img
            src="https://images.emojiterra.com/twitter/v13.1/512px/1f3ae.png"
            alt="Game Controller"
            className="title-image"
          />
          <img src="/logo.png" alt="Logo" className="title-image-2" />
        </h1>
        <div className="designer-offer-container">
          <p>
            Encuentra las mejoras ofertas en juegos clásicos y los mejores
            estrenos{" "}
          </p>{" "}
          <img src="/Designer.jpeg" alt="Designer" className="designer-image" />
        </div>
      </div>
      {error && <p>{error}</p>}
      <div className="filter-search-container">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>
      <ul className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameItem key={game._id} game={game} />)
        ) : (
          <p>No games available.</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
