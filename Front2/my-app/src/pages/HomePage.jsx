import React, { useEffect, useState } from "react";
import GameItem from "../components/GameItem";
import CategoryFilter from "../components/CategoryFilter";
import { fetchGames } from "../Api";
import "../styles/ListGames.css";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
        setFilteredGames(response.data);
        // Extract categories from games
        const gameCategories = [
          ...new Set(response.data.map((game) => game.categoria)),
        ];
        setCategories(gameCategories);
      } catch (error) {
        setError("Error fetching games");
        console.error("Error fetching games:", error);
      }
    };
    getGames();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredGames(
        games.filter((game) => game.categoria === selectedCategory)
      );
    } else {
      setFilteredGames(games);
    }
  }, [selectedCategory, games]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-titulo">Tu tIendA dE Ju€go$</h1>
      {error && <p>{error}</p>}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
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
