import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../Api";
import GameItem from "../components/GameItem";
import CategoryFilter from "../components/CategoryFilter";
import SearchFilter from "../components/SearchFilter";
import "../styles/UserLogedPage.css";

const UserLogedPage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name);
        setUserId(parsedUser._id);
      }
    };

    const getGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
        setFilteredGames(response.data);

        const gameCategories = [
          ...new Set(response.data.map((game) => game.categoria)),
        ];
        setCategories(gameCategories);
      } catch (error) {
        setError("Error fetching games");
        console.error("Error fetching games:", error);
      }
    };

    getUserInfo();
    getGames();
  }, []);

  useEffect(() => {
    let filtered = games;

    if (selectedCategory) {
      filtered = filtered.filter((game) => game.categoria === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGames(filtered);
  }, [selectedCategory, searchTerm, games]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="user-loged-page-container">
      <div className="navigation">
        <button
          onClick={() => navigate(`/user-profile/${userId}`)} // Utilizar el estado userId aquí
          className="profile-button"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
            alt="User Profile"
          />
        </button>
        <button
          onClick={() => navigate(`/cart/${userId}`)}
          className="cart-button"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9356/9356974.png"
            alt="Carrito"
          />
        </button>
      </div>
      <h1 className="homepage-titulo">EL VICIOTE.COM</h1>
      <h2>Bienvenido {userName}!</h2>
      {error && <p>{error}</p>}
      <div className="user-filter-container">
        <div className="user-category-filter-custom">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>
      <ul className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameItem key={game._id} game={game} />)
        ) : (
          <p>No se han encontrado juegos.</p>
        )}
      </ul>
    </div>
  );
};

export default UserLogedPage;
